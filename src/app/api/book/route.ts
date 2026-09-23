import { NextResponse } from "next/server";
import { Resend } from "resend";
import { business } from "@/content/business";
import { OTHER_BRAND, OTHER_PROBLEM, PROBLEM_OPTIONS, SCREEN_SIZE_OPTIONS } from "@/content/booking-options";
import { bookingSchema, normalizePhone, type Booking } from "@/lib/booking-schema";

// Simple per-instance rate limit: 5 requests per 10 minutes per IP.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

function requestId() {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return `NYT-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
}

function summarize(b: Booking, id: string) {
  const size = SCREEN_SIZE_OPTIONS.find((o) => o.value === b.screen_size);
  const problem = PROBLEM_OPTIONS.find((p) => p.value === b.desc);
  const rows: [string, string][] = [
    ["Online request ID", id],
    ["First name", b.first_name],
    ["Last name", b.last_name],
    ["Phone number", normalizePhone(b.phone)],
    ["Alt. phone number", b.cell_phone ? normalizePhone(b.cell_phone) : "-"],
    ["Email", b.email],
    ["Street address", b.address],
    ["City", b.city],
    ["Zip code", b.zip],
    ["Product brand", b.brand === OTHER_BRAND ? `Other: ${b.new_brand}` : b.brand],
    ["TV screen size", size?.label ?? b.screen_size],
    ["Total charge (home service fee)", size ? `$${size.fee}.00` : "-"],
    ["Product model", b.model],
    ["Problem description", b.desc === OTHER_PROBLEM ? `Other: ${b.desc_other}` : problem?.label ?? b.desc],
    ["Preferred service date", b.service_date || "Not specified"],
  ];
  return rows;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a few minutes or call us." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (json && typeof json === "object" && "company" in json && (json as { company?: string }).company) {
    return NextResponse.json({ ok: true, requestId: requestId() });
  }

  const parsed = bookingSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Some fields are missing or invalid.", issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })) },
      { status: 422 },
    );
  }

  const booking = parsed.data;
  const id = requestId();
  const rows = summarize(booking, id);
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[booking] RESEND_API_KEY not set. Request logged instead of emailed:\n${text}`);
      return NextResponse.json({ ok: true, requestId: id });
    }
    console.error("[booking] RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { ok: false, error: `Online booking is temporarily unavailable. Please call ${business.phones.main.display}.` },
      { status: 503 },
    );
  }

  const html = `<h2 style="font-family:sans-serif">New TV repair request ${escapeHtml(id)}</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#45516e;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;color:#0a1633"><strong>${escapeHtml(v)}</strong></td></tr>`,
    )
    .join("")}</table>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.BOOKING_FROM_EMAIL || "NY Tech Booking <onboarding@resend.dev>",
      to: process.env.BOOKING_TO_EMAIL || business.email,
      replyTo: booking.email,
      subject: `TV repair request ${id}: ${booking.brand === OTHER_BRAND ? booking.new_brand : booking.brand}, ${booking.city}`,
      text,
      html,
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error("[booking] Email delivery failed", e);
    return NextResponse.json(
      { ok: false, error: `We could not send your request. Please call ${business.phones.main.display}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, requestId: id });
}

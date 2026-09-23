/**
 * Verifies that the business facts in src/content still match the original site
 * (nytechtvrepair.com), and that no em/en dashes slipped into the source.
 * Run: npm run verify:content
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { business } from "../src/content/business";
import { BOOKING_BRANDS, PROBLEM_OPTIONS, SCREEN_SIZE_OPTIONS } from "../src/content/booking-options";
import { brands } from "../src/content/brands";
import { appliancePricing, estimateRules, extraTechnician, priceTiers } from "../src/content/pricing";

const ORIGIN = "https://nytechtvrepair.com";
const failures: string[] = [];
let checks = 0;

function check(ok: boolean, message: string) {
  checks++;
  if (!ok) failures.push(message);
}

async function get(page: string) {
  const res = await fetch(`${ORIGIN}/${page}`, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${page}: HTTP ${res.status}`);
  return res.text();
}

const text = (html: string) =>
  html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");

async function verifyPriceTable() {
  const html = await get("");
  // Rows of the "Price list flat rate" table: label cell followed by five cells.
  const table = html.slice(html.indexOf("Home service fee</td>"));
  const rows = [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) =>
    [...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((c) => text(c[1]).trim()),
  );
  const priceRows = rows.filter((r) => r.length === 6 && !/APPLIANCE/i.test(r[0]));
  check(priceRows.length === priceTiers.length, `price rows: original ${priceRows.length}, site ${priceTiers.length}`);

  const nums = (s: string) => (s.match(/\d+/g) ?? []).map(Number);
  priceRows.forEach((r, i) => {
    const t = priceTiers[i];
    if (!t) return;
    const fee = nums(r[1])[0] ?? null;
    check((t.homeServiceFee ?? null) === fee, `${t.id}: home service fee ${t.homeServiceFee} vs original "${r[1]}"`);
    const [minor, intermediate, major] = [nums(r[2])[0], nums(r[3])[0], nums(r[4])[0]];
    check(
      t.labor.minor === minor && t.labor.intermediate === intermediate && t.labor.major === major,
      `${t.id}: labor ${JSON.stringify(t.labor)} vs original ${minor}/${intermediate}/${major}`,
    );
    check(!!t.laborUnit === /\/hr/i.test(r[2]), `${t.id}: hourly unit mismatch`);
  });

  const appliance = rows.find((r) => /APPLIANCE/i.test(r[0]));
  check(!!appliance && appliance.join(" ").includes(`$${appliancePricing.laborFrom}`), "appliance labor from price");

  const page = text(html);
  for (const n of ["$25", "$50", "$100"]) check(page.includes(n), `estimate amount ${n} present on original`);
  check(estimateRules.length === 7, "7 estimate rules");
  check(extraTechnician.price === 75, "extra technician $75");
}

async function verifyBookingForm() {
  const html = await get("service.html");
  const select = (name: string) => {
    const m = html.match(new RegExp(`<select[^>]*name=["']${name}["'][\\s\\S]*?</select>`, "i"));
    return m ? [...m[0].matchAll(/<option[^>]*value=['"]?([^'">]*)['"]?[^>]*>([^<]*)/gi)].map((o) => ({ value: o[1], label: o[2].trim() })) : [];
  };

  const brandOpts = select("brand")
    .map((o) => o.label)
    .filter((l) => l && !/select|other/i.test(l));
  check(
    JSON.stringify(brandOpts) === JSON.stringify([...BOOKING_BRANDS]),
    `booking brands differ: missing ${brandOpts.filter((b) => !(BOOKING_BRANDS as readonly string[]).includes(b)).join(", ") || "-"}`,
  );

  const sizes = select("screen_size").filter((o) => o.value !== "0");
  check(sizes.length === SCREEN_SIZE_OPTIONS.length, `screen sizes: original ${sizes.length}, site ${SCREEN_SIZE_OPTIONS.length}`);
  sizes.forEach((o, i) => {
    const s = SCREEN_SIZE_OPTIONS[i];
    check(!!s && Number(o.value) === s.fee, `screen size ${i} (${o.label}): fee ${s?.fee} vs original ${o.value}`);
  });

  const problems = select("desc")
    .map((o) => o.label)
    .filter((l) => l && !/select/i.test(l));
  check(
    JSON.stringify(problems) === JSON.stringify(PROBLEM_OPTIONS.map((p) => p.value)),
    `problem options differ: ${problems.join(" | ")}`,
  );

  for (const field of ["first_name", "last_name", "address", "zip", "model", "email", "service_date"]) {
    check(html.includes(`name="${field}"`), `original has field ${field}`);
  }
}

async function verifyContact() {
  const html = await get("contact.html");
  const page = text(html);
  const digits = (s: string) => s.replace(/\D/g, "");
  const pageDigits = digits(page);
  for (const [label, value] of [
    ["main phone", business.phones.main.display],
    ["manhattan phone", business.phones.manhattan.display],
    ["fax", business.fax.display],
  ] as const) {
    check(pageDigits.includes(digits(value)), `${label} ${value} not on original contact page`);
  }
  check(html.includes(`mailto:${business.email}`), "email");
  check(page.includes(business.address.street), "street address");
  check(page.includes(business.address.postalCode), "postal code");
  check(/Mon-Fri 10am-6pm/i.test(page) && /Sat 10am-4pm/i.test(page) && /Sun CLOSED/i.test(page), "hours");
}

async function verifyBrands() {
  const html = await get("");
  const original = [...new Set([...html.matchAll(/href='\/([a-z]+)_tv_repair\.html'/g)].map((m) => m[1]))];
  const slugs = brands.map((b) => b.slug);
  for (const s of original) check(slugs.includes(s), `brand ${s} from original is missing`);
  const required = [
    "Aiwa", "Akai", "Apex", "Audiovox", "Daewoo", "Emerson", "Fujitsu", "Funai", "GE", "Haier", "Hitachi",
    "Insignia", "JVC", "LG", "Loewe", "Magnavox", "Mitsubishi", "Olevia", "Panasonic", "Philips", "Pioneer",
    "Polaroid", "ProScan", "RCA", "Samsung", "Sanyo", "Sharp", "Sony", "Sylvania", "Symphonic", "Syntax",
    "Toshiba", "Viore", "Vizio",
  ];
  for (const name of required) check(brands.some((b) => b.name === name), `required brand ${name} missing`);
}

async function verifyNoDashes() {
  const root = path.resolve(process.cwd(), "src");
  const walk = async (dir: string): Promise<string[]> => {
    const entries = await readdir(dir, { withFileTypes: true });
    const nested = await Promise.all(
      entries.map((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : Promise.resolve([path.join(dir, d.name)]))),
    );
    return nested.flat();
  };
  for (const file of (await walk(root)).filter((f) => /\.(tsx?|css|json)$/.test(f))) {
    const src = await readFile(file, "utf8");
    const line = src.split("\n").findIndex((l) => /[\u2013\u2014]/.test(l));
    check(line === -1, `em/en dash in ${path.relative(root, file)}:${line + 1}`);
  }
}

const steps: [string, () => Promise<void>][] = [
  ["price table", verifyPriceTable],
  ["booking form", verifyBookingForm],
  ["contact details", verifyContact],
  ["brands", verifyBrands],
  ["no em/en dashes", verifyNoDashes],
];

async function main() {
  for (const [name, fn] of steps) {
    const before = failures.length;
    try {
      await fn();
    } catch (e) {
      failures.push(`${name}: ${(e as Error).message}`);
    }
    console.log(`${failures.length === before ? "PASS" : "FAIL"}  ${name}`);
  }

  if (failures.length) {
    console.error(`\n${failures.length} of ${checks} checks failed:\n- ${failures.join("\n- ")}`);
    process.exit(1);
  }
  console.log(`\nAll ${checks} checks passed.`);
}

void main();

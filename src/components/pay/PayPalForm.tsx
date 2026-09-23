"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { Lock, Tag } from "@phosphor-icons/react";
import { Field, Select, TextInput } from "@/components/forms/Field";
import { buttonClass } from "@/components/ui/Button";
import { SITE_URL, business, links } from "@/content/business";
import { SCREEN_SIZE_OPTIONS } from "@/content/booking-options";
import { pricingNotes } from "@/content/pricing";

// PayPal Payments Standard ("Buy Now" / _xclick), same account and item formats as the original payment page.
const PAYPAL_URL = "https://www.paypal.com/cgi-bin/webscr";
const APPLIANCE = "appliance";

type Mode = "fee" | "repair" | "deposit";
const MODES: { id: Mode; label: string }[] = [
  { id: "fee", label: "Home service fee" },
  { id: "repair", label: "TV repair" },
  { id: "deposit", label: "Other deposit" },
];

function parseAmount(v: string) {
  const n = Number(v.replace(/[$,\s]/g, ""));
  return Number.isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : null;
}

export function PayPalForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [mode, setMode] = useState<Mode>("fee");
  // Pre-filled from the booking confirmation link: /pay?request=NYT-XXXX&size=...
  const params = useSearchParams();
  const [size, setSize] = useState(() => {
    const s = params.get("size") ?? "";
    return SCREEN_SIZE_OPTIONS.some((o) => o.value === s) ? s : "";
  });
  const [requestId, setRequestId] = useState(() => (params.get("request") ?? "").slice(0, 40));
  const [ticket, setTicket] = useState("");
  const [depositDesc, setDepositDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paypal, setPaypal] = useState<{ item_name: string; item_number: string; amount: string } | null>(null);

  // Submit to PayPal once the hidden fields are rendered.
  useEffect(() => {
    if (paypal) formRef.current?.submit();
  }, [paypal]);

  // Coming back from PayPal with the Back button restores this page from the cache: re-enable the form.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) setPaypal(null);
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  const sizeOption = SCREEN_SIZE_OPTIONS.find((o) => o.value === size);
  const feeAmount = sizeOption ? sizeOption.fee.toFixed(2) : "";

  const id = (n: string) => `${uid}-${n}`;
  const inv = (n: string) => ({
    id: id(n),
    "aria-invalid": errors[n] ? (true as const) : undefined,
    "aria-describedby": errors[n] ? `${id(n)}-error` : undefined,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    let item_name = "";
    let item_number = "";
    let total: number | null = null;

    if (mode === "fee") {
      if (!size) errs.size = "Please select the size of your screen.";
      else if (size === APPLIANCE) errs.size = `For appliance repair, please call ${business.phones.main.display}.`;
      if (!requestId.trim()) errs.requestId = "Please enter your online request ID.";
      item_name = "Home service fee for TV Repair Service";
      item_number = requestId.trim();
      total = sizeOption ? sizeOption.fee : null;
    } else if (mode === "repair") {
      if (!ticket.trim()) errs.ticket = "Please enter your ticket number.";
      total = parseAmount(amount);
      if (total === null) errs.amount = "Please enter the amount.";
      item_name = "Payment for TV Repair";
      item_number = `Ticket #: ${ticket.trim()}`;
    } else {
      if (!depositDesc.trim()) errs.depositDesc = "Please enter a deposit description.";
      total = parseAmount(amount);
      if (total === null) errs.amount = "Please enter the amount.";
      item_name = "Other deposit";
      item_number = depositDesc.trim();
    }
    if (!agreed) errs.agreed = "You must agree with the terms and conditions.";

    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }
    setPaypal({ item_name, item_number: item_number.slice(0, 127), amount: total!.toFixed(2) });
  };

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-surface shadow-card">
      <div role="tablist" aria-label="What are you paying for?" className="flex gap-1 overflow-x-auto border-b border-line p-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            id={id(`tab-${m.id}`)}
            aria-selected={mode === m.id}
            aria-controls={id("panel")}
            onClick={() => {
              setMode(m.id);
              setErrors({});
              setAmount("");
            }}
            className={clsx(
              "h-11 flex-1 whitespace-nowrap rounded-[4px] px-4 text-sm font-semibold transition-colors",
              mode === m.id ? "bg-ink text-bg" : "text-ink-2 hover:bg-surface-2 hover:text-ink",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <form onSubmit={submit} noValidate className="p-6 md:p-10" id={id("panel")} role="tabpanel" aria-labelledby={id(`tab-${mode}`)}>
        {mode === "fee" && (
          <div className="grid gap-5">
            <div className="flex gap-3 rounded-[var(--radius-field)] border border-accent/30 bg-accent-soft p-4 text-ink">
              <Tag size={20} weight="bold" className="mt-0.5 shrink-0 text-accent-text" aria-hidden />
              <p className="text-[0.95rem]">Pay a home service fee in advance and get 10% off the labor.</p>
            </div>
            <Field id={id("size")} label="Choose your screen size" required error={errors.size}>
              <Select value={size} onChange={(e) => setSize(e.target.value)} {...inv("size")}>
                <option value="">Select type and size</option>
                {SCREEN_SIZE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}: ${o.fee}
                  </option>
                ))}
                <option value={APPLIANCE}>Appliance repair: any question, please call</option>
              </Select>
            </Field>
            <Field
              id={id("requestId")}
              label="Enter your online request ID"
              required
              error={errors.requestId}
              hint={
                <>
                  You receive it after you <Link href="/book" className="font-semibold text-accent-text underline underline-offset-4">book online</Link>.
                </>
              }
            >
              <TextInput
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                autoComplete="off"
                autoCapitalize="characters"
                className="font-mono"
                {...inv("requestId")}
                aria-describedby={errors.requestId ? `${id("requestId")}-error` : `${id("requestId")}-hint`}
              />
            </Field>
            <div className="flex items-baseline justify-between rounded-[var(--radius-field)] bg-surface-2 p-5">
              <span className="text-sm font-semibold text-ink">Amount</span>
              <span className="font-mono text-3xl font-semibold text-ink tabular" aria-live="polite">
                {feeAmount ? `$${feeAmount}` : size === APPLIANCE ? "Call us" : "-"}
              </span>
            </div>
          </div>
        )}

        {mode === "repair" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={id("ticket")} label="Enter your ticket number" required error={errors.ticket}>
              <TextInput value={ticket} onChange={(e) => setTicket(e.target.value)} autoComplete="off" className="font-mono" {...inv("ticket")} />
            </Field>
            <Field id={id("amount")} label="Amount (USD)" required error={errors.amount}>
              <TextInput value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" placeholder="0.00" className="font-mono" {...inv("amount")} />
            </Field>
          </div>
        )}

        {mode === "deposit" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={id("depositDesc")} label="Deposit description" required error={errors.depositDesc}>
              <TextInput value={depositDesc} onChange={(e) => setDepositDesc(e.target.value)} {...inv("depositDesc")} />
            </Field>
            <Field id={id("amount")} label="Amount (USD)" required error={errors.amount}>
              <TextInput value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" placeholder="0.00" className="font-mono" {...inv("amount")} />
            </Field>
          </div>
        )}

        <div className="mt-8 border-t border-line pt-6">
          <label htmlFor={id("agreed")} className="flex cursor-pointer items-start gap-3 text-[0.95rem] text-ink">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--accent)]"
              {...inv("agreed")}
            />
            <span>
              Making a payment, I agree with the{" "}
              <Link href="/terms" className="font-semibold text-accent-text underline underline-offset-4">
                terms and conditions
              </Link>
              .
            </span>
          </label>
          {errors.agreed && (
            <p id={`${id("agreed")}-error`} className="mt-2 text-[0.85rem] font-medium text-danger">
              {errors.agreed}
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-[0.82rem] text-ink-2">
            <Lock size={16} weight="bold" className="mt-px shrink-0" aria-hidden />
            <span>
              You will be taken to PayPal to pay by card or PayPal balance. {business.paymentsAccepted}
            </span>
          </p>
          <button type="submit" disabled={paypal !== null} className={buttonClass("primary", "lg", "shrink-0")}>
            {paypal ? "Opening PayPal" : "Pay with PayPal"}
          </button>
        </div>
        <p className="mt-4 text-[0.82rem] text-ink-3">
          {pricingNotes.tax} Questions about a charge? Call{" "}
          <a href={links.call} className="underline underline-offset-4">
            {business.phones.main.display}
          </a>
          .
        </p>
      </form>

      {paypal && (
        <form ref={formRef} action={PAYPAL_URL} method="post" className="hidden" aria-hidden>
          <input type="hidden" name="cmd" value="_xclick" />
          <input type="hidden" name="business" value={business.email} />
          <input type="hidden" name="item_name" value={paypal.item_name} />
          <input type="hidden" name="item_number" value={paypal.item_number} />
          <input type="hidden" name="amount" value={paypal.amount} />
          <input type="hidden" name="currency_code" value="USD" />
          <input type="hidden" name="return" value={`${SITE_URL}/payment-complete`} />
          <input type="hidden" name="cancel_return" value={`${SITE_URL}/pay`} />
          <input type="hidden" name="rm" value="2" />
          <input type="hidden" name="undefined_quantity" value="0" />
          <input type="hidden" name="no_shipping" value="1" />
          <input type="hidden" name="no_note" value="1" />
        </form>
      )}
    </div>
  );
}

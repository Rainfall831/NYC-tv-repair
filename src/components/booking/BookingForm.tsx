"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CircleNotch,
  Info,
  Phone,
  WarningCircle,
} from "@phosphor-icons/react";
import { Field, Select, TextArea, TextInput, describedBy } from "@/components/forms/Field";
import { buttonClass } from "@/components/ui/Button";
import { BOROUGHS, business, links } from "@/content/business";
import {
  BOOKING_BRANDS,
  OTHER_BRAND,
  OTHER_PROBLEM,
  PROBLEM_OPTIONS,
  SCREEN_SIZE_OPTIONS,
  bookingNotes,
} from "@/content/booking-options";
import { brands } from "@/content/brands";
import { pricingNotes, priceTiers } from "@/content/pricing";
import { boroughForZip } from "@/content/zips";
import {
  BOOKING_STEPS,
  EMPTY_BOOKING,
  bookingSchema,
  formatPhone,
  todayISO,
  type BookingInput,
} from "@/lib/booking-schema";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; requestId: string; screenSize: string }
  | { kind: "error"; message: string };

const titleCase = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

/** Map a brand page slug (e.g. "samsung", "syntax") to the booking dropdown value. */
function brandFromSlug(slug: string): { brand: string; newBrand: string } | null {
  const b = brands.find((x) => x.slug === slug.toLowerCase());
  const name = (b?.name ?? slug).toUpperCase();
  if ((BOOKING_BRANDS as readonly string[]).includes(name)) return { brand: name, newBrand: "" };
  if (b) return { brand: OTHER_BRAND, newBrand: b.name };
  return null;
}

export function BookingForm({ headingLevel = "h3", translucent = false }: { headingLevel?: "h2" | "h3"; translucent?: boolean }) {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [announcement, setAnnouncement] = useState("");
  const topRef = useRef<HTMLDivElement>(null);
  const movedRef = useRef(false);
  const focusPendingRef = useRef(false);

  const {
    register,
    control,
    trigger,
    setValue,
    getValues,
    getFieldState,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: EMPTY_BOOKING,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const [brand, desc, screenSize, zip, city] = useWatch({ control, name: ["brand", "desc", "screen_size", "zip", "city"] });

  // Pre-fill the brand from ?brand=slug (brand pages link here).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("brand");
    if (!slug) return;
    const match = brandFromSlug(slug);
    if (match) {
      setValue("brand", match.brand as BookingInput["brand"]);
      setValue("new_brand", match.newBrand);
    }
  }, [setValue]);

  // Fill in the borough from the ZIP code.
  const zipBorough = useMemo(() => (zip && /^\d{5}$/.test(zip) ? boroughForZip(zip) : null), [zip]);
  useEffect(() => {
    if (zipBorough && city !== zipBorough) {
      setValue("city", zipBorough, { shouldValidate: true });
    }
    // Only react to ZIP changes; the user can still change the borough afterwards.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipBorough]);

  // Bring the form back into view after navigating between steps.
  useEffect(() => {
    if (!movedRef.current) return;
    topRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
  }, [step, status.kind]);

  // Focus the new step's heading once it mounts (after the exit animation of the previous step).
  const focusHeading = (el: HTMLHeadingElement | null) => {
    if (el && focusPendingRef.current) {
      focusPendingRef.current = false;
      el.focus({ preventScroll: true });
    }
  };

  const sizeOption = SCREEN_SIZE_OPTIONS.find((o) => o.value === screenSize);
  const sizeTier = sizeOption ? priceTiers.find((t) => t.id === sizeOption.tierId) : undefined;

  const current = BOOKING_STEPS[step];
  const isLast = step === BOOKING_STEPS.length - 1;

  const next = async () => {
    const fields = current.fields as unknown as FieldPath<BookingInput>[];
    // shouldFocus moves focus to the first invalid field.
    const ok = await trigger(fields, { shouldFocus: true });
    if (!ok) {
      const count = fields.filter((f) => getFieldState(f).error).length;
      setAnnouncement(`${count} ${count === 1 ? "field needs" : "fields need"} attention.`);
      return;
    }
    movedRef.current = true;
    focusPendingRef.current = true;
    setStep((s) => s + 1);
    setAnnouncement(`Step ${step + 2} of ${BOOKING_STEPS.length}: ${BOOKING_STEPS[step + 1].label}`);
  };

  const back = () => {
    movedRef.current = true;
    focusPendingRef.current = true;
    setStep((s) => Math.max(0, s - 1));
    setAnnouncement(`Step ${step} of ${BOOKING_STEPS.length}: ${BOOKING_STEPS[step - 1].label}`);
  };

  // handleSubmit is called inside the event handler so the callbacks never run during render.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    handleSubmit(
      async (data) => {
        setStatus({ kind: "submitting" });
        try {
          const res = await fetch("/api/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          const body = (await res.json().catch(() => ({}))) as { ok?: boolean; requestId?: string; error?: string };
          if (!res.ok || !body.ok || !body.requestId) {
            throw new Error(body.error ?? "We could not send your request.");
          }
          setStatus({ kind: "success", requestId: body.requestId, screenSize: data.screen_size });
          setAnnouncement(`Request received. Your online request ID is ${body.requestId}.`);
          movedRef.current = true;
          focusPendingRef.current = true;
        } catch (e) {
          const message = e instanceof Error ? e.message : "We could not send your request.";
          setStatus({ kind: "error", message });
          setAnnouncement(`Error: ${message}`);
        }
      },
      (errs) => {
        // Jump back to the first step with an error.
        const idx = BOOKING_STEPS.findIndex((s) => s.fields.some((f) => f in errs));
        if (idx >= 0 && idx !== step) {
          movedRef.current = true;
          focusPendingRef.current = true;
          setStep(idx);
        }
        setAnnouncement("Some fields need attention.");
      },
    )(e);

  const idFor = (name: string) => `${uid}-${name}`;
  const err = (name: FieldPath<BookingInput>) => (errors as Record<string, { message?: string } | undefined>)[name]?.message;
  const a11y = (name: FieldPath<BookingInput>, hint = false) => ({
    id: idFor(name),
    "aria-invalid": err(name) ? (true as const) : undefined,
    "aria-describedby": describedBy(idFor(name), err(name), hint),
  });

  const StepHeading = headingLevel;

  if (status.kind === "success") {
    const payHref = `/pay?request=${encodeURIComponent(status.requestId)}&size=${encodeURIComponent(status.screenSize)}`;
    return (
      <div ref={topRef} className={clsx("rounded-[var(--radius-card)] p-6 md:p-10", translucent ? "bg-transparent" : "border border-line bg-surface shadow-card")}>
        <p className="sr-only" role="status" aria-live="polite">
          {announcement}
        </p>
        <CheckCircle size={44} weight="duotone" className="text-success" aria-hidden />
        <StepHeading ref={focusHeading} tabIndex={-1} className="mt-4 section-title outline-none">
          Request received
        </StepHeading>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-2">
          Thank you. We respond to online requests in under one hour during business hours to confirm your appointment.
        </p>
        <div className="mt-8 rounded-[var(--radius-field)] bg-surface-2 p-5">
          <p className="text-sm text-ink-2">Your online request ID</p>
          <p className="mt-1 font-mono text-2xl font-semibold tracking-wide text-ink">{status.requestId}</p>
          <p className="mt-2 text-sm text-ink-2">Keep this ID. You need it to pay the home service fee online.</p>
        </div>
        <div className="mt-8 rounded-[var(--radius-field)] border border-accent/30 bg-accent-soft p-5">
          <p className="font-semibold text-ink">Pay the home service fee in advance and get 10% off the labor.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href={payHref} className={buttonClass("primary", "md")}>
              Pay home service fee
              <ArrowRight size={18} weight="bold" aria-hidden />
            </Link>
            <a href={links.call} className={buttonClass("secondary", "md")}>
              <Phone size={18} weight="bold" aria-hidden />
              Call {business.phones.main.display}
            </a>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            reset(EMPTY_BOOKING);
            setStep(0);
            setStatus({ kind: "idle" });
          }}
          className="mt-8 text-sm font-semibold text-accent-text underline underline-offset-4"
        >
          Book another repair
        </button>
      </div>
    );
  }

  return (
    <div ref={topRef} className={clsx("scroll-mt-28 rounded-[var(--radius-card)]", translucent ? "bg-transparent" : "border border-line bg-surface shadow-card")}>
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      {/* Progress */}
      <div className="border-b border-line px-4 pt-3 md:px-6">
        <ol className="grid grid-cols-4 gap-2" aria-label="Booking steps">
          {BOOKING_STEPS.map((s, i) => (
            <li key={s.id} aria-current={i === step ? "step" : undefined} className="min-w-0">
              <span
                className={clsx(
                  "block h-1 rounded-[4px] transition-colors duration-300",
                  i <= step ? "bg-accent" : "book-progress-empty bg-line",
                )}
              />
              <span
                className={clsx(
                  "mt-1.5 block truncate pb-2 text-[0.8rem] font-semibold md:text-sm",
                  i === step ? "text-ink" : "text-ink-3",
                )}
              >
                <span className="font-mono tabular">{i + 1}</span>
                <span className="hidden sm:inline"> {s.label}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <form onSubmit={onSubmit} noValidate className="px-4 pt-4 pb-3 md:px-6 md:pb-4">
        {/* Honeypot */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Company
            <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
          </label>
        </div>

            <fieldset key={current.id} className="min-w-0 booking-step-enter">
              <legend className="sr-only">
                Step {step + 1} of {BOOKING_STEPS.length}: {current.label}
              </legend>
              <StepHeading
                ref={focusHeading}
                tabIndex={-1}
                className="section-title outline-none"
              >
                {step === 0 && "Your details"}
                {step === 1 && "Where is the TV?"}
                {step === 2 && "About your TV"}
                {step === 3 && "Review"}
              </StepHeading>

              {step === 0 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field id={idFor("first_name")} label="First name" required error={err("first_name")}>
                    <TextInput autoComplete="given-name" maxLength={35} {...register("first_name")} {...a11y("first_name")} />
                  </Field>
                  <Field id={idFor("last_name")} label="Last name" required error={err("last_name")}>
                    <TextInput autoComplete="family-name" maxLength={35} {...register("last_name")} {...a11y("last_name")} />
                  </Field>
                  <Field id={idFor("phone")} label="Phone number" required error={err("phone")}>
                    <TextInput
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="(718) 555-0142"
                      {...register("phone", { onChange: (e) => setValue("phone", formatPhone(e.target.value)) })}
                      {...a11y("phone")}
                    />
                  </Field>
                  <Field id={idFor("cell_phone")} label="Alt. phone number" error={err("cell_phone")}>
                    <TextInput
                      type="tel"
                      inputMode="tel"
                      autoComplete="off"
                      {...register("cell_phone", { onChange: (e) => setValue("cell_phone", formatPhone(e.target.value)) })}
                      {...a11y("cell_phone")}
                    />
                  </Field>
                  <Field id={idFor("email")} label="Email" required error={err("email")} className="sm:col-span-2">
                    <TextInput type="email" inputMode="email" autoComplete="email" {...register("email")} {...a11y("email")} />
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-6">
                  <Field id={idFor("address")} label="Street address" required error={err("address")} className="sm:col-span-6">
                    <TextInput autoComplete="street-address" maxLength={120} {...register("address")} {...a11y("address")} />
                  </Field>
                  <Field
                    id={idFor("zip")}
                    label="ZIP code"
                    required
                    error={err("zip")}
                    hint={zipBorough ? `${zipBorough}. We service your area.` : "We service all five NYC boroughs."}
                    className="sm:col-span-2"
                  >
                    <TextInput
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={5}
                      {...register("zip", {
                        onChange: (e) => setValue("zip", e.target.value.replace(/\D/g, "").slice(0, 5)),
                      })}
                      {...a11y("zip", true)}
                    />
                  </Field>
                  <Field id={idFor("city")} label="Borough" required error={err("city")} className="sm:col-span-4">
                    <Select {...register("city")} {...a11y("city")}>
                      <option value="">Select your borough</option>
                      {BOROUGHS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </Select>
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field id={idFor("brand")} label="Product brand" required error={err("brand")}>
                    <Select {...register("brand")} {...a11y("brand")}>
                      <option value="">Select a brand</option>
                      {BOOKING_BRANDS.map((b) => (
                        <option key={b} value={b}>
                          {b === "GE" || b === "LG" || b === "JVC" || b === "RCA" || b === "NEC" || b === "ESA" || b === "KTV" || b === "ILO"
                            ? b
                            : titleCase(b)}
                        </option>
                      ))}
                      <option value={OTHER_BRAND}>Other brand</option>
                    </Select>
                  </Field>
                  {brand === OTHER_BRAND ? (
                    <Field id={idFor("new_brand")} label="Brand name" required error={err("new_brand")}>
                      <TextInput maxLength={35} {...register("new_brand")} {...a11y("new_brand")} />
                    </Field>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  <Field
                    id={idFor("screen_size")}
                    label="TV type and screen size"
                    required
                    error={err("screen_size")}
                    className="sm:col-span-2"
                  >
                    <Select {...register("screen_size")} {...a11y("screen_size")}>
                      <option value="">Select type and size</option>
                      {SCREEN_SIZE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  {sizeOption && (
                    <div className="rounded-[var(--radius-field)] bg-surface-2 p-5 sm:col-span-2" aria-live="polite">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <p className="text-sm font-semibold text-ink">Home service fee</p>
                        <p className="font-mono text-3xl font-semibold text-ink tabular">${sizeOption.fee}</p>
                      </div>
                      {sizeTier && (
                        <p className="mt-2 text-sm text-ink-2">
                          Labor for this size: {sizeTier.laborUnit ? `$${sizeTier.labor.minor}/hr` : `$${sizeTier.labor.minor} - $${sizeTier.labor.major}`}
                          {sizeOption.hint ? `. ${sizeOption.hint}` : "."}
                        </p>
                      )}
                      <p className="mt-2 text-[0.82rem] leading-snug text-ink-3">
                        Parts not included. {pricingNotes.tax} The home service fee is paid in advance when the technician arrives.
                      </p>
                    </div>
                  )}

                  <Field
                    id={idFor("model")}
                    label="Product model"
                    required
                    error={err("model")}
                    hint={
                      <details className="group">
                        <summary className="cursor-pointer list-none font-medium text-accent-text underline underline-offset-4 [&::-webkit-details-marker]:hidden">
                          Where do I find the model number?
                        </summary>
                        <span className="mt-2 block">{bookingNotes.modelHint}</span>
                      </details>
                    }
                  >
                    <TextInput autoComplete="off" autoCapitalize="characters" maxLength={40} {...register("model")} {...a11y("model", true)} />
                  </Field>
                  <Field id={idFor("desc")} label="Problem description" required error={err("desc")}>
                    <Select {...register("desc")} {...a11y("desc")}>
                      <option value="">Select the problem</option>
                      {PROBLEM_OPTIONS.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  {desc === OTHER_PROBLEM && (
                    <Field id={idFor("desc_other")} label="Describe the problem" required error={err("desc_other")} className="sm:col-span-2">
                      <TextArea maxLength={500} {...register("desc_other")} {...a11y("desc_other")} />
                    </Field>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="mt-4 grid gap-4">
                  <Field
                    id={idFor("service_date")}
                    label="Preferred service date"
                    error={err("service_date")}
                    hint="Mon-Fri 10am-6pm, Sat 10am-4pm. Closed Sundays. We will confirm the time window with you."
                    className="max-w-xs"
                  >
                    <TextInput type="date" min={todayISO()} {...register("service_date")} {...a11y("service_date", true)} />
                  </Field>
                  <Review values={getValues()} />
                </div>
              )}
            </fieldset>

        {status.kind === "error" && (
          <div role="alert" className="mt-8 flex gap-3 rounded-[var(--radius-field)] border border-danger/40 bg-danger-soft p-4 text-ink">
            <WarningCircle size={22} weight="bold" className="mt-0.5 shrink-0 text-danger" aria-hidden />
            <div>
              <p className="font-semibold">{status.message}</p>
              <p className="mt-1 text-sm text-ink-2">
                Please try again, or call us at{" "}
                <a href={links.call} className="font-semibold text-accent-text underline underline-offset-4">
                  {business.phones.main.display}
                </a>
                .
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-col-reverse gap-3 border-t border-line pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-[0.82rem] leading-snug text-ink-2">
            <Info size={16} weight="bold" className="mt-px shrink-0" aria-hidden />
            <span>
              {bookingNotes.required} {bookingNotes.privacy}
            </span>
          </p>
          <div className="flex shrink-0 gap-3">
            {step > 0 && (
              <button type="button" onClick={back} className={buttonClass("secondary", "md")}>
                <ArrowLeft size={18} weight="bold" aria-hidden />
                Back
              </button>
            )}
            {isLast ? (
              <button type="submit" disabled={status.kind === "submitting"} className={buttonClass("primary", "md", "min-w-44")}>
                {status.kind === "submitting" ? (
                  <>
                    <CircleNotch size={18} weight="bold" className="animate-spin" aria-hidden />
                    Sending
                  </>
                ) : (
                  <>
                    Submit request
                    <ArrowRight size={18} weight="bold" aria-hidden />
                  </>
                )}
              </button>
            ) : (
              <button type="button" onClick={next} className={buttonClass("primary", "md", "min-w-32")}>
                Continue
                <ArrowRight size={18} weight="bold" aria-hidden />
              </button>
            )}
          </div>
        </div>
        <p className="mt-4 text-[0.82rem] text-ink-3">
          By submitting you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-ink">
            terms and conditions
          </Link>
          .
        </p>
      </form>
    </div>
  );
}

function Review({ values }: { values: BookingInput }) {
  const size = SCREEN_SIZE_OPTIONS.find((o) => o.value === values.screen_size);
  const problem = PROBLEM_OPTIONS.find((p) => p.value === values.desc);
  const rows: [string, string][] = [
    ["Name", `${values.first_name} ${values.last_name}`],
    ["Phone", [values.phone, values.cell_phone].filter(Boolean).join(", ")],
    ["Email", values.email],
    ["Address", `${values.address}, ${values.city} ${values.zip}`],
    ["TV", `${values.brand === OTHER_BRAND ? values.new_brand : titleCase(values.brand)}, ${size?.label ?? ""}`],
    ["Model", values.model],
    ["Problem", values.desc === OTHER_PROBLEM ? values.desc_other : problem?.label ?? ""],
  ];
  return (
    <div className="rounded-[var(--radius-field)] bg-surface-2 p-5 md:p-6">
      <p className="text-sm font-semibold text-ink">Review your request</p>
      <dl className="mt-4 grid gap-x-8 gap-y-3 text-[0.95rem] sm:grid-cols-[8rem_1fr]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-ink-3">{k}</dt>
            <dd className="break-words text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      {size && (
        <p className="mt-5 border-t border-line pt-4 text-[0.95rem] text-ink">
          Home service fee: <span className="font-mono font-semibold tabular">${size.fee}</span>
          <span className="text-ink-2"> (parts not included, excluding tax)</span>
        </p>
      )}
    </div>
  );
}

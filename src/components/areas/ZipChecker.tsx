"use client";

import { useId, useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import clsx from "clsx";
import { BookLink } from "@/components/actions/BookLink";
import { fieldControl } from "@/components/forms/Field";
import { buttonClass } from "@/components/ui/Button";
import { serviceAreaNotice } from "@/content/business";
import { boroughForZip } from "@/content/zips";

export function ZipChecker({ onBorough }: { onBorough?: (b: string | null) => void }) {
  const id = useId();
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState<string | null>(null);

  const borough = checked ? boroughForZip(checked) : null;
  const invalid = checked !== null && !/^\d{5}$/.test(checked);

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        setChecked(zip);
        onBorough?.(boroughForZip(zip));
      }}
    >
      <label htmlFor={id} className="text-[0.92rem] font-semibold text-ink">
        Check your ZIP code
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id={id}
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
            setChecked(null);
          }}
          aria-describedby={checked ? `${id}-result` : undefined}
          aria-invalid={invalid || (checked !== null && !borough) ? true : undefined}
          className={clsx(fieldControl, "h-9 max-w-[12rem] font-mono tracking-wider tabular")}
          placeholder="11229"
        />
        <button type="submit" className={buttonClass("primary", "md", "h-9")}>
          Check
        </button>
      </div>
      <div id={`${id}-result`} aria-live="polite" className="mt-3 min-h-[3rem]">
        {checked !== null &&
          (invalid ? (
            <p className="flex items-start gap-2 text-sm font-medium text-danger">
              <WarningCircle size={18} weight="bold" className="shrink-0" aria-hidden />
              Enter a 5-digit ZIP code.
            </p>
          ) : borough ? (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="flex items-center gap-2 text-sm font-semibold text-success">
                <CheckCircle size={18} weight="bold" aria-hidden />
                {checked} is in {borough}. We service your area.
              </p>
              <BookLink className="text-sm font-semibold text-accent-text underline underline-offset-4">Book a repair</BookLink>
            </div>
          ) : (
            <p className="flex items-start gap-2 text-sm font-medium text-danger">
              <WarningCircle size={18} weight="bold" className="mt-px shrink-0" aria-hidden />
              {serviceAreaNotice}
            </p>
          ))}
      </div>
    </form>
  );
}

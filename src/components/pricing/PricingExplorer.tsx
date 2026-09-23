"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { House, Phone, Storefront, Television, Wrench } from "@phosphor-icons/react";
import {
  appliancePricing,
  pricingDirectoryTiers,
  type PriceTier,
} from "@/content/pricing";
import { PricingHeader } from "@/components/pricing/PricingHeader";

type NotePill = { label: string; icon: typeof Storefront; tone: "blue" | "slate" };

function money(n: number, unit?: "hr") {
  return `$${n}${unit ? "/hr" : ""}`;
}

function notePill(t: PriceTier): NotePill {
  switch (t.carryIn) {
    case "only":
      return { label: "Carry in only", icon: Storefront, tone: "blue" };
    case "yes":
      return { label: "Carry in: Yes", icon: Storefront, tone: "blue" };
    case "no":
      return { label: "In home only", icon: House, tone: "slate" };
    case "project":
      return { label: "Project based", icon: Wrench, tone: "slate" };
  }
}

function laborFlat(t: PriceTier) {
  return t.labor.minor === t.labor.intermediate && t.labor.intermediate === t.labor.major;
}

function PriceCell({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span className={clsx("text-[18px] font-semibold tabular-nums", accent ? "text-accent-text" : "text-ink")}>
      {children}
    </span>
  );
}

function NoteBadge({ pill }: { pill: NotePill }) {
  const Icon = pill.icon;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 text-[11px] font-semibold leading-none",
        pill.tone === "blue" ? "bg-accent-soft text-accent-text" : "bg-surface-2 text-ink-2",
      )}
    >
      <Icon size={13} weight="regular" aria-hidden />
      {pill.label}
    </span>
  );
}

function TypeCell({ type, size, featured }: { type: string; size: string; featured?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-card)] border border-line bg-surface text-accent-text">
        <Television size={20} weight="regular" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[14px] font-semibold leading-tight text-ink">{type}</p>
        <p className="mt-0.5 text-[13px] leading-snug text-ink-2">{size}</p>
        {featured && (
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-accent-text">Best value carry-in</p>
        )}
      </div>
    </div>
  );
}

function DesktopRow({ t, index }: { t: PriceTier; index: number }) {
  const pill = notePill(t);
  const flat = laborFlat(t);
  const stripe = index % 2 === 1;

  return (
    <tr
      className={clsx(
        "border-b border-line transition-colors duration-200 last:border-b-0 hover:bg-accent-soft/40",
        stripe ? "bg-surface-2/60" : "bg-surface",
      )}
    >
      <td className="px-4 py-3 align-middle md:px-5">
        <TypeCell type={t.display.type} size={t.display.size} featured={t.featured} />
      </td>
      <td className="px-3 py-3 align-middle text-center">
        <PriceCell accent={t.homeServiceFee !== null}>
          {t.homeServiceFee === null ? "—" : money(t.homeServiceFee)}
        </PriceCell>
      </td>
      {flat ? (
        <td colSpan={3} className="px-3 py-3 align-middle text-center">
          <PriceCell>{money(t.labor.minor, t.laborUnit)}</PriceCell>
          <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-wide text-ink-3">
            {t.laborUnit === "hr" ? "Labor rate" : "Flat labor"}
          </span>
        </td>
      ) : (
        (["minor", "intermediate", "major"] as const).map((k) => (
          <td key={k} className="px-3 py-3 align-middle text-center">
            <PriceCell>{money(t.labor[k], t.laborUnit)}</PriceCell>
          </td>
        ))
      )}
      <td className="px-4 py-3 align-middle md:px-5">
        <NoteBadge pill={pill} />
      </td>
    </tr>
  );
}

function MobileRow({ t, index }: { t: PriceTier; index: number }) {
  const pill = notePill(t);
  const flat = laborFlat(t);
  const stripe = index % 2 === 1;

  const priceItems: { label: string; value: string; accent?: boolean }[] = [];
  if (t.homeServiceFee !== null) {
    priceItems.push({ label: "Home service fee", value: money(t.homeServiceFee), accent: true });
  }
  if (flat) {
    priceItems.push({ label: t.laborUnit === "hr" ? "Labor rate" : "Flat labor", value: money(t.labor.minor, t.laborUnit) });
  } else {
    priceItems.push(
      { label: "Minor labor", value: money(t.labor.minor) },
      { label: "Intermediate labor", value: money(t.labor.intermediate) },
      { label: "Major labor", value: money(t.labor.major) },
    );
  }

  return (
    <div className={clsx("border-b border-line px-4 py-4 last:border-b-0", stripe ? "bg-surface-2/60" : "bg-surface")}>
      <TypeCell type={t.display.type} size={t.display.size} featured={t.featured} />
      <div className="mt-3">
        <NoteBadge pill={pill} />
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
        {priceItems.map((p) => (
          <div key={p.label}>
            <dt className="text-[11px] font-medium uppercase tracking-wide text-ink-3">{p.label}</dt>
            <dd className={clsx("mt-0.5 text-[18px] font-semibold tabular-nums", p.accent ? "text-accent-text" : "text-ink")}>
              {p.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ApplianceDesktopRow({ index }: { index: number }) {
  const stripe = index % 2 === 1;
  const pill: NotePill = { label: "In-home repair service", icon: Phone, tone: "blue" };

  return (
    <tr
      className={clsx(
        "border-b border-line transition-colors duration-200 last:border-b-0 hover:bg-accent-soft/40",
        stripe ? "bg-surface-2/60" : "bg-surface",
      )}
    >
      <td className="px-4 py-3 align-middle md:px-5">
        <TypeCell type={appliancePricing.label} size="Call for quote" />
      </td>
      <td colSpan={4} className="px-3 py-3 align-middle text-center">
        <PriceCell accent>(718) 787-1301</PriceCell>
      </td>
      <td className="px-4 py-3 align-middle md:px-5">
        <NoteBadge pill={pill} />
      </td>
    </tr>
  );
}

function ApplianceMobileRow({ index }: { index: number }) {
  const stripe = index % 2 === 1;
  const pill: NotePill = { label: "In-home repair service", icon: Phone, tone: "blue" };

  return (
    <div className={clsx("border-b border-line px-4 py-4 last:border-b-0", stripe ? "bg-surface-2/60" : "bg-surface")}>
      <TypeCell type={appliancePricing.label} size="Call for quote" />
      <div className="mt-3">
        <NoteBadge pill={pill} />
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
        <div className="col-span-2">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-ink-3">Phone</dt>
          <dd className="mt-0.5 text-[18px] font-semibold tabular-nums text-accent-text">(718) 787-1301</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-ink-3">Flat labor</dt>
          <dd className="mt-0.5 text-[18px] font-semibold tabular-nums text-ink">${appliancePricing.laborFrom} and up</dd>
        </div>
      </dl>
      <Link href="/appliance-repair" className="mt-3 inline-block text-[12px] font-semibold text-accent-text underline underline-offset-2">
        Appliance repair details
      </Link>
    </div>
  );
}

export function PricingExplorer({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const tiers = pricingDirectoryTiers();

  return (
    <div>
      <PricingHeader headingLevel={headingLevel} />

      <div className="mt-6 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-card">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[920px] border-collapse text-left">
            <thead>
              <tr className="bg-navy text-on-navy">
                {[
                  "TV type / size",
                  "Home service fee",
                  "Minor labor",
                  "Intermediate labor",
                  "Major labor",
                  "Estimate / notes",
                ].map((label, i) => (
                  <th
                    key={label}
                    scope="col"
                    className={clsx(
                      "px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] md:px-4",
                      i === 0 ? "rounded-tl-[4px] pl-5 text-left" : "text-center",
                      i === 5 && "rounded-tr-[4px] pr-5 text-left",
                    )}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tiers.map((t, i) => (
                <DesktopRow key={t.id} t={t} index={i} />
              ))}
              <ApplianceDesktopRow index={tiers.length} />
            </tbody>
          </table>
        </div>

        <div className="md:hidden">
          {tiers.map((t, i) => (
            <MobileRow key={t.id} t={t} index={i} />
          ))}
          <ApplianceMobileRow index={tiers.length} />
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {tiers.length + 1} pricing rows including appliance repair.
      </p>
    </div>
  );
}

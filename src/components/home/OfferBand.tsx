import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { offers } from "@/content/offers";
import { extraTechnician, pricingHeadline, pricingNotes } from "@/content/pricing";
import { tvServices } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** The original site's three offers, stacked in one column under the hero. */
export function OfferBand() {
  return (
    <section aria-labelledby="offers-title" className="defer-section border-b border-line bg-bg text-ink">
      <div className="container-x section-y">
        <h2 id="offers-title" className="sr-only">
          Special offers
        </h2>
        <div className="grid items-start gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          {offers.map((o, i) => (
            <div key={o.id} className={i === 0 ? "reveal" : "reveal border-t border-line pt-6"}>
              <p className={i === 0 ? "section-title uppercase leading-none text-accent-text" : "section-title leading-none"}>
                {o.figure}
              </p>
              <p className="mt-2 section-title">{o.title}</p>
              <p className="mt-1 text-[14px] text-ink-2">{o.detail}</p>
              <Link
                href={o.cta.href}
                className="mt-2 inline-flex items-center gap-2 text-[14px] font-semibold text-accent-text underline decoration-accent-text/30 underline-offset-4 transition-colors hover:decoration-accent-text"
              >
                {o.cta.label}
                <ArrowRight size={14} weight="bold" aria-hidden />
              </Link>
            </div>
          ))}
          <div className="reveal border-t border-line pt-6">
            <h3 className="section-title">Good to know</h3>
            <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-ink-2">
              <li>
                <strong className="font-semibold text-ink">{pricingHeadline.title}</strong> {pricingHeadline.warranty}
              </li>
              <li>{pricingHeadline.homeServiceIncludes}</li>
              <li>{pricingNotes.advanceAndTolls}</li>
              <li>{pricingNotes.tax}</li>
              <li>
                {extraTechnician.text} Only for televisions over 38&quot;.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <SectionHeading
            id="services-title"
            title={
              <>
                Every screen.
                <br />
                Every size.
              </>
            }
            intro='From a 21" LCD to a 90" OLED, CRT and projection sets included. Flat-rate labor by size, parts extra.'
          />
          <ul className="mt-6 flex flex-col gap-3">
            {tvServices.map((s) => (
              <li key={s.id} className="reveal">
                <Link
                  href={`/tv-repair#${s.id}`}
                  className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="section-title">{s.name}</h3>
                    <ArrowUpRight
                      size={22}
                      weight="bold"
                      className="mt-1 shrink-0 text-ink-3 transition-colors group-hover:text-accent-text"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{s.id === "lcd-led" ? s.detail : s.short}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </section>
  );
}

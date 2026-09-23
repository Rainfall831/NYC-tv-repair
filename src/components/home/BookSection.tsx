import clsx from "clsx";
import { Clock, Phone } from "@phosphor-icons/react/ssr";
import { BookingForm } from "@/components/booking/BookingForm";
import { business, links } from "@/content/business";
import { pricingHeadline } from "@/content/pricing";

export function BookSection({
  embedded = false,
  panelClassName,
}: {
  embedded?: boolean;
  panelClassName?: string;
}) {
  return (
    <section id="book" aria-labelledby="book-title" className={embedded ? "book-dark scroll-mt-24" : "book-dark scroll-mt-20"}>
      <div
        className={clsx(
          embedded
            ? "grid min-w-0 gap-4 overflow-hidden rounded-[var(--radius-card)] border border-white/30 bg-surface/92 px-4 py-3 text-ink shadow-card lg:grid-cols-12"
            : "container-x grid gap-6 py-6 lg:grid-cols-12",
          embedded && panelClassName,
        )}
      >
        <div className="min-w-0 lg:col-span-4 lg:self-start">
          <h2 id="book-title" className="section-title">
            Book a repair
          </h2>
          <p className="mt-2 max-w-[40ch] text-[14px] leading-relaxed text-ink-2">
            Tell us about your TV and pick a day. Online response time is under one hour during business hours.
          </p>

          <div className="mt-3 space-y-3 border-t border-line pt-3">
            <div className="flex gap-3">
              <Phone size={22} weight="duotone" className="mt-0.5 shrink-0 text-accent-text" aria-hidden />
              <div>
                <p className="font-semibold text-ink">Prefer the phone?</p>
                <a href={links.call} className="mt-1 block font-mono text-[14px] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink tabular">
                  {business.phones.main.display}
                </a>
                <a href={links.callManhattan} className="block font-mono text-ink-2 underline decoration-line-strong underline-offset-4 hover:decoration-ink tabular">
                  {business.phones.manhattan.display}
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock size={22} weight="duotone" className="mt-0.5 shrink-0 text-accent-text" aria-hidden />
              <div>
                <p className="font-semibold text-ink">Hours</p>
                <dl className="mt-1 text-ink-2">
                  {business.hours.map((h) => (
                    <div key={h.label} className="flex gap-2">
                      <dt>{h.label}:</dt>
                      <dd>{h.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <p className={embedded ? "rounded-[var(--radius-field)] bg-surface/50 px-3 py-2 text-sm leading-relaxed text-ink-2" : "rounded-[var(--radius-field)] bg-surface-2 px-3 py-2 text-sm leading-relaxed text-ink-2"}>
              {pricingHeadline.payInAdvance} {pricingHeadline.homeServiceIncludes}
            </p>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-8">
          <BookingForm translucent={embedded} />
        </div>
      </div>
    </section>
  );
}

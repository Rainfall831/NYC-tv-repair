import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { offers } from "@/content/offers";
import { estimateRules } from "@/content/pricing";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Special Offers",
  description:
    "Free estimate for TVs under 42 inches for carry in. Pay a home service fee in advance and get 10% off the labor. $79 flat rate carry-in labor for LCD/LED 21\"-40\".",
  path: "/special-offers",
});

export default function SpecialOffersPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Special offers", path: "/special-offers" }]}
        title="Special offers"
        intro="Ways to save on your TV repair. Prices exclude tax; parts are not included."
      />
      <section aria-label="Offers" className="container-x section-y">
        <ul className="grid gap-4 lg:grid-cols-12">
          {offers.map((o, i) => (
            <li
              key={o.id}
              id={o.id}
              className={
                i === 0
                  ? "flex flex-col justify-between gap-4 rounded-[var(--radius-card)] bg-navy p-5 text-on-navy lg:col-span-7 lg:row-span-2"
                  : "flex flex-col justify-between gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-5 lg:col-span-5"
              }
            >
              <p className={i === 0 ? "section-title leading-none text-on-navy" : "section-title leading-none text-accent-text"}>
                {o.figure}
              </p>
              <div>
                <h2 className={i === 0 ? "section-title text-on-navy" : "section-title"}>{o.title}</h2>
                <p className={i === 0 ? "mt-3 max-w-[48ch] text-on-navy-2" : "mt-2 text-ink-2"}>{o.detail}</p>
                <Link
                  href={o.cta.href}
                  className={
                    i === 0
                      ? "mt-6 inline-flex items-center gap-2 font-semibold underline decoration-on-navy/40 underline-offset-[6px] hover:decoration-on-navy"
                      : "mt-5 inline-flex items-center gap-2 font-semibold text-accent-text underline decoration-accent-text/30 underline-offset-[6px] hover:decoration-accent-text"
                  }
                >
                  {o.cta.label}
                  <ArrowRight size={16} weight="bold" aria-hidden />
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 max-w-3xl">
          <h2 className="section-title">Estimate terms</h2>
          <ul className="mt-6 space-y-3">
            {estimateRules.map((r) => (
              <li key={r.text} className="grid grid-cols-[2rem_1fr] gap-2 leading-relaxed text-ink-2">
                <span className="font-mono text-accent-text" aria-hidden>
                  {r.tier}
                </span>
                <span>{r.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

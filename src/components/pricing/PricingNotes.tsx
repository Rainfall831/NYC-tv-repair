import { extraTechnician, pricingHeadline, pricingNotes } from "@/content/pricing";

/** Fine print below the pricing directory. */
export function PricingNotes({ showGoodToKnow = true }: { showGoodToKnow?: boolean }) {
  if (!showGoodToKnow) return null;

  return (
    <div className="mt-10">
      <div className="rounded-[var(--radius-card)] bg-surface-2 p-6 md:p-7">
        <h3 className="section-title">Good to know</h3>
        <ul className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-ink-2">
          <li>
            <strong className="text-ink">{pricingHeadline.title}</strong> {pricingHeadline.warranty}
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
  );
}

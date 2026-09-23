import { PricingExplorer } from "@/components/pricing/PricingExplorer";

export function PricingSection() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="defer-section border-t border-line bg-bg">
      <div className="container-x section-y">
        <PricingExplorer headingLevel="h2" />
      </div>
    </section>
  );
}

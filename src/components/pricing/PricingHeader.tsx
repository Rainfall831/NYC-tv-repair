export function PricingHeader({
  headingLevel = "h2",
  id = "pricing-title",
}: {
  headingLevel?: "h1" | "h2";
  id?: string;
}) {
  const Heading = headingLevel;

  return (
    <div>
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-accent-text">Service pricing</p>
      <Heading
        id={id}
        className={headingLevel === "h1" ? "page-title mt-2" : "section-title mt-2 text-[clamp(1.35rem,3vw,1.75rem)]"}
      >
        TV Repair Service Prices
      </Heading>
      <p className="mt-2 max-w-[42ch] text-[14px] leading-relaxed text-ink-2">
        Transparent pricing for professional TV repair. Final cost may vary based on model, size, and issue.
      </p>
    </div>
  );
}

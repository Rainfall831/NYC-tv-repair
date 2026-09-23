// Special offers. Source of truth: the header banner and price table on nytechtvrepair.com.

export const offers = [
  {
    id: "free-estimate",
    figure: "Free",
    title: "Free estimate for TVs under 42 inches, for carry in.",
    detail: 'Bring your TV to our Brooklyn service center. Estimate terms by size are listed in full on the pricing page.',
    cta: { label: "See estimate terms", href: "/special-offers" },
  },
  {
    id: "prepay-10",
    figure: "10%",
    title: "Pay a home service fee in advance and get 10% off the labor.",
    detail: "Book online, then pay the home service fee for your request before the visit.",
    cta: { label: "Pay for repair", href: "/pay" },
  },
  {
    id: "carry-in-79",
    figure: "$79",
    title: 'Flat rate labor for LCD/LED 21" - 40", carry in only.',
    detail: "Best choice and good price. Parts not included.",
    cta: { label: "View pricing", href: "/pricing" },
  },
] as const;

/** The two lines from the original site-wide banner. */
export const announcement = [
  "Free estimate for TVs under 42 inches for carry in.",
  "Pay a home service fee in advance and get 10% off the labor.",
] as const;

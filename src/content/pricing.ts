// Price list. Source of truth: the "Price list flat rate" table on nytechtvrepair.com
// (index, service.html, payment.html, tos.html). DO NOT change any value without the owner.

export type PriceGroup = "carry-in" | "in-home" | "crt";

export type PriceTier = {
  id: string;
  /** Label exactly as the original table / booking form lists it. */
  originalLabel: string;
  display: {
    type: string;
    size: string;
  };
  group: PriceGroup;
  /** Home service fee in dollars. null = not a home-service tier (carry-in flat rate). */
  homeServiceFee: number | null;
  labor: { minor: number; intermediate: number; major: number };
  laborUnit?: "hr";
  carryIn: "only" | "yes" | "no" | "project";
  /** The original "ESTIMATE" column text, cleaned for display. */
  note: string;
  featured?: boolean;
};

export const priceTiers: PriceTier[] = [
  {
    id: "lcd-led-21-40-carry-in-flat",
    originalLabel: 'LCD/LED 21 > 40"',
    display: { type: "LCD / LED", size: '21" - 40"' },
    group: "carry-in",
    homeServiceFee: null,
    labor: { minor: 79, intermediate: 79, major: 79 },
    carryIn: "only",
    note: "Flat rate labor $79 for carry in only. Best choice and good price.",
    featured: true,
  },
  {
    id: "lcd-led-71-90",
    originalLabel: 'LCD/LED 71 > 90"',
    display: { type: "LCD / LED", size: '71" - 90"' },
    group: "in-home",
    homeServiceFee: 200,
    labor: { minor: 255, intermediate: 255, major: 255 },
    carryIn: "no",
    note: "In home only. No carry in.",
  },
  {
    id: "lcd-led-21-40",
    originalLabel: 'LCD/LED 21 > 40"',
    display: { type: "LCD / LED", size: '21" - 40"' },
    group: "carry-in",
    homeServiceFee: 65,
    labor: { minor: 115, intermediate: 125, major: 135 },
    carryIn: "yes",
    note: "Carry in: yes.",
  },
  {
    id: "lcd-led-41-49",
    originalLabel: 'LCD/LED 41 > 49"',
    display: { type: "LCD / LED", size: '41" - 49"' },
    group: "carry-in",
    homeServiceFee: 65,
    labor: { minor: 115, intermediate: 135, major: 155 },
    carryIn: "yes",
    note: "Carry in: yes.",
  },
  {
    id: "lcd-led-50-60",
    originalLabel: 'LCD/LED 50 > 60"',
    display: { type: "LCD / LED", size: '50" - 60"' },
    group: "carry-in",
    homeServiceFee: 65,
    labor: { minor: 145, intermediate: 155, major: 165 },
    carryIn: "yes",
    note: "Carry in: yes.",
  },
  {
    id: "plasma-42-49",
    originalLabel: 'PLASMA 42 > 49"',
    display: { type: "Plasma", size: '42" - 49"' },
    group: "carry-in",
    homeServiceFee: 65,
    labor: { minor: 175, intermediate: 175, major: 185 },
    carryIn: "yes",
    note: "Carry in: yes.",
  },
  {
    id: "plasma-oled-50-70",
    originalLabel: 'PLASMA/OLED 50>70"',
    display: { type: "Plasma / OLED", size: '50" - 70"' },
    group: "in-home",
    homeServiceFee: 100,
    labor: { minor: 215, intermediate: 215, major: 245 },
    carryIn: "no",
    note: "In home only. No carry in.",
  },
  {
    id: "lcd-led-61-70",
    originalLabel: 'LCD/LED 61 > 70"',
    display: { type: "LCD / LED", size: '61" - 70"' },
    group: "in-home",
    homeServiceFee: 100,
    labor: { minor: 215, intermediate: 215, major: 245 },
    carryIn: "no",
    note: "In home only. No carry in.",
  },
  {
    id: "oled-qled-plasma-71-90",
    originalLabel: 'Home Service: OLED/QLED/Plasma 71" > 90"',
    display: { type: "OLED / QLED / Plasma", size: '71" - 90"' },
    group: "in-home",
    homeServiceFee: 250,
    labor: { minor: 300, intermediate: 300, major: 300 },
    carryIn: "no",
    note: "Home service. In home only. No carry in.",
  },
  {
    id: "crt-home-service",
    originalLabel: "CRT Home Service",
    display: { type: "CRT", size: "Home service" },
    group: "crt",
    homeServiceFee: 100,
    labor: { minor: 75, intermediate: 75, major: 75 },
    laborUnit: "hr",
    carryIn: "project",
    note: "Project based.",
  },
  {
    id: "crt",
    originalLabel: "CRT",
    display: { type: "CRT", size: "All sizes" },
    group: "crt",
    homeServiceFee: 100,
    labor: { minor: 75, intermediate: 75, major: 75 },
    carryIn: "no",
    note: "In home only. No carry in.",
  },
];

export const appliancePricing = {
  label: "Appliance repair",
  laborFrom: 175,
  text: "Flat labor starting $175 and up. In home repair service.",
  callText: "Any question, please call (718) 787-1301.",
} as const;

export const extraTechnician = {
  price: 75,
  text: "If an extra technician is required: $75 each.",
  detail:
    "If the customer cannot provide access to the television set, or cannot aid the technician in moving it to a reasonable working space, the extra technician charge will be applicable. Only in the case of televisions over 38\" will the extra technician charge be considered. Dismounting the television is solely the customer's responsibility, and is not included in the labor charge. If the customer does not wish to personally remove the television, the appointment may be rescheduled, and the extra technician charge may apply.",
} as const;

export const pricingHeadline = {
  title: "Price list flat rate. Parts not included.",
  warranty: "Warranty: 30-days labor & 90-days parts.",
  homeServiceIncludes:
    "A home service fee charge includes: a trip to your home as many times as needed with no extra charge, or pickup & delivery.",
  payInAdvance: "Upon the technician's arrival, the home service fee must be paid in advance.",
} as const;

export const pricingNotes = {
  tax: "Prices are shown excluding tax. Tax will be included in the price upon checkout.",
  advanceAndTolls: "Upon the technician's arrival, the home service fee must be paid in advance. Customer covers tolls when applicable.",
} as const;

/** In-shop estimate rules, in the original order. */
export const estimateRules: { text: string; tier: "*" | "**" | "***" }[] = [
  { tier: "*", text: 'The in-shop estimate for an LCD/LED TV up to 40" is free.' },
  { tier: "*", text: 'For LCD/LED TVs between 40" and 49" it is $25 (it applies to the repair cost if the estimate is approved).' },
  { tier: "*", text: 'For LCD/LED TVs between 50" and 60" it is $50 ($25 out of $50 is deductible).' },
  { tier: "*", text: 'For LCD/LED TVs between 61" and 65" it is $100 ($50 out of $100 is deductible).' },
  { tier: "*", text: "The estimate for LED/LCD TVs up to 40 inches, 5 years old or less, is free. Otherwise it is $25." },
  { tier: "**", text: 'The in-shop estimate for an OLED/QLED/Plasma TV up to 65" is $100 (with a $50 deductible if the estimate is approved).' },
  { tier: "***", text: "The in-shop estimate for any monitor of any size is $100." },
];

/** Row order for the pricing directory table (homepage + /pricing). */
export const pricingDirectoryOrder = [
  "lcd-led-21-40-carry-in-flat",
  "lcd-led-21-40",
  "lcd-led-41-49",
  "lcd-led-50-60",
  "lcd-led-61-70",
  "lcd-led-71-90",
  "plasma-42-49",
  "plasma-oled-50-70",
  "oled-qled-plasma-71-90",
  "crt-home-service",
  "crt",
] as const;

export function pricingDirectoryTiers(): PriceTier[] {
  const byId = new Map(priceTiers.map((t) => [t.id, t]));
  return pricingDirectoryOrder.map((id) => byId.get(id)).filter((t): t is PriceTier => Boolean(t));
}

export const PRICE_GROUP_LABELS: Record<PriceGroup | "appliance", string> = {
  "carry-in": "Carry-in eligible",
  "in-home": "In-home only",
  crt: "CRT",
  appliance: "Appliance",
};

export const lowestHomeServiceFee = Math.min(
  ...priceTiers.flatMap((t) => (t.homeServiceFee === null ? [] : [t.homeServiceFee])),
);

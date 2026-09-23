// Booking form options. Source of truth: the "Book Online appointment for TV repair" form
// on nytechtvrepair.com (service.html). Values keep the original option values; labels are cleaned for display.

import { priceTiers } from "./pricing";

/** The original "Product Brand" dropdown, in original order. "OTHER" reveals a free-text field. */
export const BOOKING_BRANDS = [
  "ADVENT", "AIWA", "AKAI", "APEX", "ASTAR", "AUDIOVOX", "BOSS", "CANON", "CITIZEN", "DAEWOO",
  "EMERSON", "ESA", "FISHER", "FUJITSU", "FUNAI", "GE", "GOLDSTAR", "HAIER", "HITACHI", "ILO",
  "INSIGNIA", "JENSEN", "JVC", "KTV", "LG", "LOEWE", "MAGNAVOX", "MITSUBISHI", "NAKAMICHI", "NEC",
  "OLEVIA", "ORION", "PANASONIC", "PHILIPS", "PIONEER", "POLAROID", "PRIMA", "PROSCAN", "PROTRON", "QUASAR",
  "RADIO SHACK", "RCA", "SAMPO", "SAMSUNG", "SANYO", "SCOTT", "SHARP", "SONY", "SYLVANIA", "SYMPHONIC",
  "SYNTECH", "SYNTEX", "TOSHIBA", "ULTRA", "VIORE", "VIZIO", "WESTINGHOUSE", "YAMAHA", "ZENITH",
] as const;

export const OTHER_BRAND = "OTHER";

export type ScreenSizeOption = {
  value: string;
  label: string;
  /** Home service fee shown as the original "Total charge". */
  fee: number;
  tierId: string;
  hint?: string;
};

const tier = (id: string) => {
  const t = priceTiers.find((p) => p.id === id);
  if (!t) throw new Error(`Unknown price tier ${id}`);
  return t;
};

/** The original "Your TV Screen Size" dropdown (11 options, original order and fee values). */
export const SCREEN_SIZE_OPTIONS: ScreenSizeOption[] = [
  { value: "lcd-led-21-40-carry-in", label: 'LCD/LED 21" - 40" (carry-in, $79 flat labor)', fee: 65, tierId: "lcd-led-21-40-carry-in-flat", hint: "Carry in for $79 flat rate labor. If we come to you, the home service fee applies." },
  { value: "lcd-led-71-90", label: 'LCD/LED 71" - 90"', fee: tier("lcd-led-71-90").homeServiceFee!, tierId: "lcd-led-71-90", hint: "In home only." },
  { value: "lcd-led-21-40", label: 'LCD/LED 21" - 40"', fee: tier("lcd-led-21-40").homeServiceFee!, tierId: "lcd-led-21-40" },
  { value: "lcd-led-41-49", label: 'LCD/LED 41" - 49"', fee: tier("lcd-led-41-49").homeServiceFee!, tierId: "lcd-led-41-49" },
  { value: "lcd-led-50-60", label: 'LCD/LED 50" - 60"', fee: tier("lcd-led-50-60").homeServiceFee!, tierId: "lcd-led-50-60" },
  { value: "plasma-42-49", label: 'Plasma 42" - 49"', fee: tier("plasma-42-49").homeServiceFee!, tierId: "plasma-42-49" },
  { value: "plasma-oled-50-70", label: 'Plasma/OLED 50" - 70"', fee: tier("plasma-oled-50-70").homeServiceFee!, tierId: "plasma-oled-50-70", hint: "In home only." },
  { value: "lcd-led-61-70", label: 'LCD/LED 61" - 70"', fee: tier("lcd-led-61-70").homeServiceFee!, tierId: "lcd-led-61-70", hint: "In home only." },
  { value: "oled-qled-plasma-71-90", label: 'Home service: OLED/QLED/Plasma 71" - 90"', fee: tier("oled-qled-plasma-71-90").homeServiceFee!, tierId: "oled-qled-plasma-71-90", hint: "In home only." },
  { value: "crt-home-service", label: "CRT home service", fee: tier("crt-home-service").homeServiceFee!, tierId: "crt-home-service", hint: "Project based, $75/hr labor." },
  { value: "crt", label: "CRT", fee: tier("crt").homeServiceFee!, tierId: "crt", hint: "In home only." },
];

/** The original "Problem Description" dropdown. "other.." reveals a free-text field. */
export const PROBLEM_OPTIONS = [
  { value: "no power", label: "No power" },
  { value: "no picture", label: "No picture" },
  { value: "no sound", label: "No sound" },
  { value: "distorted picture", label: "Distorted picture" },
  { value: "distorted sound", label: "Distorted sound" },
  { value: "distorted colors", label: "Distorted colors" },
  { value: "lines on screen", label: "Lines on screen" },
  { value: "no power,light blinking", label: "No power, light blinking" },
  { value: "cable/HDMI/antenna connections failed", label: "Cable / HDMI / antenna connections failed" },
  { value: "screen cracked", label: "Screen cracked" },
  { value: "unit shuts on/off himself", label: "Unit shuts on / off by itself" },
  { value: "burning smell", label: "Burning smell" },
  { value: "no pict/sound ok", label: "No picture, sound OK" },
  { value: "no sound/pict ok", label: "No sound, picture OK" },
  { value: "buttons malfunction", label: "Buttons malfunction" },
  { value: "other..", label: "Other" },
] as const;

export const OTHER_PROBLEM = "other..";

export const bookingNotes = {
  required: "Fields marked * are required.",
  privacy: "We do not share this information with third parties.",
  modelHint:
    "The model number is printed on the label on the back of your TV, usually next to the serial number. You can also find it in the TV's settings menu under About or Support.",
} as const;

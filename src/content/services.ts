// Services. Source of truth: nytechtvrepair.com price table, about.html, brand pages and
// the appliance division at nytechappliance.com (same company and phone number).

export type TvService = {
  id: string;
  name: string;
  short: string;
  detail: string;
};

export const tvServices: TvService[] = [
  {
    id: "lcd-led",
    name: "LCD & LED",
    short: 'From 21" to 90".',
    detail: 'Flat-rate labor tiers for every size from 21" to 90". Sets up to 60" can be carried in; 61" and up are repaired in your home.',
  },
  {
    id: "oled-qled",
    name: "OLED & QLED",
    short: 'Up to 90", repaired in home.',
    detail: 'OLED from 50" and OLED/QLED from 71" to 90" are serviced in your home. In-shop estimates for OLED/QLED up to 65" are available.',
  },
  {
    id: "plasma",
    name: "Plasma",
    short: 'From 42" to 90".',
    detail: 'Plasma 42" - 49" can be carried in. Larger plasma sets are repaired in your home.',
  },
  {
    id: "crt",
    name: "CRT",
    short: "Direct view tube TVs.",
    detail: "CRT televisions are repaired in home, with project-based home service at $75/hr labor.",
  },
  {
    id: "projection",
    name: "DLP & CRT projection",
    short: "Big screen projection sets.",
    detail: "We repair DLP and CRT projection televisions, including big screen sets, in your home or at our service center.",
  },
  {
    id: "monitors",
    name: "Monitors",
    short: "Any size.",
    detail: "Monitors of any size can be brought in for an in-shop estimate ($100).",
  },
];

export const applianceTypes = [
  "Refrigerators",
  "Microwaves",
  "Dishwashers",
  "Air conditioners",
  "Ranges",
  "Stoves",
  "Washers",
  "Dryers",
  "Dehumidifiers",
  "Humidifiers",
  "Freezers",
  "Wine coolers",
  "Cooktops",
  "Trash compactors",
  "Water coolers",
  "Icemakers",
] as const;

/** How a repair works. Every step is taken from the original terms and about pages. */
export const processSteps = [
  {
    id: "book",
    title: "Book",
    body: "Request online or call. Online response time is under one hour during business hours.",
  },
  {
    id: "diagnose",
    title: "Diagnose",
    body: "The technician comes to you. Complex cases go to our service center and are usually diagnosed within 1-2 business days.",
  },
  {
    id: "approve",
    title: "Approve",
    body: "You get an estimate and can accept or decline the charges. Labor is a flat rate by size; parts are extra.",
  },
  {
    id: "repair",
    title: "Repair",
    body: "Most repairs are done the same day in your home. Parts, if needed, take 3-5 business days. 30-day labor, 90-day parts warranty.",
  },
] as const;

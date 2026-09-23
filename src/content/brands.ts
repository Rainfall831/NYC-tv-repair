// Brands. Source of truth: the "We Repair All Major Brands" list and the individual
// {brand}_tv_repair.html pages on nytechtvrepair.com. Per-brand facts were imported by
// scripts/scrape-brand-models.mjs into brand-facts.generated.json.

import facts from "./brand-facts.generated.json";

export type Brand = {
  slug: string;
  name: string;
  factoryAuthorized: boolean;
  officialUrl: string | null;
  modelCount: number;
};

const NAMES: Record<string, string> = {
  aiwa: "Aiwa",
  akai: "Akai",
  apex: "Apex",
  audiovox: "Audiovox",
  daewoo: "Daewoo",
  emerson: "Emerson",
  fujitsu: "Fujitsu",
  funai: "Funai",
  ge: "GE",
  haier: "Haier",
  hitachi: "Hitachi",
  insignia: "Insignia",
  jvc: "JVC",
  lg: "LG",
  loewe: "Loewe",
  magnavox: "Magnavox",
  mitsubishi: "Mitsubishi",
  olevia: "Olevia",
  panasonic: "Panasonic",
  philips: "Philips",
  pioneer: "Pioneer",
  polaroid: "Polaroid",
  proscan: "ProScan",
  rca: "RCA",
  samsung: "Samsung",
  sanyo: "Sanyo",
  sharp: "Sharp",
  sony: "Sony",
  sylvania: "Sylvania",
  symphonic: "Symphonic",
  syntax: "Syntax",
  toshiba: "Toshiba",
  viore: "Viore",
  vizio: "Vizio",
  zenith: "Zenith",
};

type Facts = Record<string, { factoryAuthorized: boolean; officialUrl: string | null; modelCount: number }>;

/**
 * Manufacturer links from the original brand pages, checked 2026-09-23. Links that no longer
 * resolve (or now point at a parked domain) are removed; LG and Loewe moved to new domains.
 */
const OFFICIAL_URL_OVERRIDES: Record<string, string | null> = {
  aiwa: null,
  akai: null,
  apex: null,
  audiovox: null,
  funai: null,
  proscan: null,
  sanyo: null,
  syntax: null,
  daewoo: "http://www.daewoo.com",
  lg: "https://www.lg.com/us",
  loewe: "https://www.loewe.tv",
};

const httpsUrl = (url: string | null) => (url ? url.replace(/^http:\/\//, "https://") : null);

export const brands: Brand[] = Object.entries(NAMES).map(([slug, name]) => {
  const f = (facts as Facts)[slug];
  return {
    slug,
    name,
    factoryAuthorized: f?.factoryAuthorized ?? false,
    officialUrl: slug in OFFICIAL_URL_OVERRIDES ? OFFICIAL_URL_OVERRIDES[slug] : httpsUrl(f?.officialUrl ?? null),
    modelCount: f?.modelCount ?? 0,
  };
});

export function getBrand(slug: string) {
  return brands.find((b) => b.slug === slug);
}

/** Paragraphs from the original brand page template. */
export function brandCopy(b: Brand) {
  const n = b.name;
  return {
    authorized: b.factoryAuthorized ? `Our company is factory authorized in repairing ${n} TVs.` : null,
    specialty: `Our company specializes in repair of ${n} televisions of all types: DLP and CRT projection, plasma, LCD and direct view ${n} televisions.`,
    parts: `Thanks to our suppliers we are able to find any original parts for ${n} televisions. We have access to a complete library of service manuals for any model. Most importantly, all of our technicians are fully qualified and have many years of experience in the repair of ${n} televisions.`,
    facts: [
      "All work is guaranteed.",
      "Most repairs are completed on the spot, without the TV leaving your house.",
      "If the problem cannot be fixed in-house, the TV is taken to our base, repaired, delivered, and installed.",
    ],
  };
}

export const MODEL_PREVIEW_COUNT = 120;

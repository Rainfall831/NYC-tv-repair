// NYC ZIP code lookup for the five boroughs served.
// The original site shipped a partial ZIP list (css_js/zips.js) that left out large parts of
// Manhattan and Queens and filed Long Island City under Brooklyn. These ranges follow the
// USPS ZIP allocation for each borough so every NYC address resolves correctly.

import type { Borough } from "./business";

const RANGES: { borough: Borough; from: number; to: number }[] = [
  { borough: "Manhattan", from: 10001, to: 10299 },
  { borough: "Staten Island", from: 10301, to: 10314 },
  { borough: "Bronx", from: 10451, to: 10499 },
  { borough: "Queens", from: 11004, to: 11005 },
  { borough: "Queens", from: 11101, to: 11120 },
  { borough: "Brooklyn", from: 11201, to: 11256 },
  { borough: "Queens", from: 11351, to: 11499 },
  { borough: "Queens", from: 11690, to: 11697 },
];

/** Residential ZIP codes per borough, used for the service-area pages. */
export const BOROUGH_ZIPS: Record<Borough, string[]> = {
  Manhattan: [
    "10001", "10002", "10003", "10004", "10005", "10006", "10007", "10009", "10010", "10011", "10012", "10013",
    "10014", "10016", "10017", "10018", "10019", "10021", "10022", "10023", "10024", "10025", "10026", "10027",
    "10028", "10029", "10030", "10031", "10032", "10033", "10034", "10035", "10036", "10037", "10038", "10039",
    "10040", "10044", "10065", "10069", "10075", "10128", "10280", "10282",
  ],
  Brooklyn: [
    "11201", "11203", "11204", "11205", "11206", "11207", "11208", "11209", "11210", "11211", "11212", "11213",
    "11214", "11215", "11216", "11217", "11218", "11219", "11220", "11221", "11222", "11223", "11224", "11225",
    "11226", "11228", "11229", "11230", "11231", "11232", "11233", "11234", "11235", "11236", "11237", "11238",
    "11239", "11249",
  ],
  Queens: [
    "11004", "11005", "11101", "11102", "11103", "11104", "11105", "11106", "11109", "11354", "11355", "11356",
    "11357", "11358", "11360", "11361", "11362", "11363", "11364", "11365", "11366", "11367", "11368", "11369",
    "11370", "11372", "11373", "11374", "11375", "11377", "11378", "11379", "11385", "11411", "11412", "11413",
    "11414", "11415", "11416", "11417", "11418", "11419", "11420", "11421", "11422", "11423", "11426", "11427",
    "11428", "11429", "11432", "11433", "11434", "11435", "11436", "11691", "11692", "11693", "11694", "11697",
  ],
  Bronx: [
    "10451", "10452", "10453", "10454", "10455", "10456", "10457", "10458", "10459", "10460", "10461", "10462",
    "10463", "10464", "10465", "10466", "10467", "10468", "10469", "10470", "10471", "10472", "10473", "10474",
    "10475",
  ],
  "Staten Island": ["10301", "10302", "10303", "10304", "10305", "10306", "10307", "10308", "10309", "10310", "10312", "10314"],
};

export function boroughForZip(zip: string): Borough | null {
  const five = zip.trim().slice(0, 5);
  if (!/^\d{5}$/.test(five)) return null;
  const n = Number(five);
  return RANGES.find((r) => n >= r.from && n <= r.to)?.borough ?? null;
}

export const BOROUGH_SLUGS: Record<Borough, string> = {
  Brooklyn: "brooklyn",
  Queens: "queens",
  Manhattan: "manhattan",
  Bronx: "bronx",
  "Staten Island": "staten-island",
};

export function boroughFromSlug(slug: string): Borough | null {
  const entry = Object.entries(BOROUGH_SLUGS).find(([, s]) => s === slug);
  return entry ? (entry[0] as Borough) : null;
}

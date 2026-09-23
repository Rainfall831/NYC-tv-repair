// One-time import of the brand pages from the original nytechtvrepair.com site.
// Writes the model lists to public/data/models/{slug}.json and per-brand facts
// (official site, "factory authorized" wording) to src/content/brand-facts.generated.json.
// The output is committed so production builds never depend on the old site.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ORIGIN = "https://nytechtvrepair.com";
const SLUGS = [
  "aiwa", "akai", "apex", "audiovox", "daewoo", "emerson", "fujitsu", "funai", "ge",
  "haier", "hitachi", "insignia", "jvc", "lg", "loewe", "magnavox", "mitsubishi",
  "olevia", "panasonic", "philips", "pioneer", "polaroid", "proscan", "rca", "samsung",
  "sanyo", "sharp", "sony", "sylvania", "symphonic", "syntax", "toshiba", "viore",
  "vizio", "zenith",
];

const root = path.resolve(import.meta.dirname, "..");
const modelsDir = path.join(root, "public", "data", "models");

function decode(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function toText(html) {
  return decode(
    html
      .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<(br|\/p|\/tr|\/div|\/h\d|\/li|\/td)[^>]*>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  )
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

async function scrape(slug) {
  const res = await fetch(`${ORIGIN}/${slug}_tv_repair.html`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
  const html = await res.text();
  const lines = toText(html);

  const text = lines.join("\n");
  const factoryAuthorized = /factory authorized/i.test(text);

  const officialIdx = html.search(/Official Web Site/i);
  const officialMatch = officialIdx >= 0 ? html.slice(officialIdx).match(/href=["']([^"']+)["']/i) : null;
  const officialUrl = officialMatch ? officialMatch[1] : null;

  const start = lines.findIndex((l) => /Models:\s*$/i.test(l));
  const end = lines.findIndex((l, i) => i > start && /We serve the following/i.test(l));
  const models = [];
  if (start >= 0) {
    for (const l of lines.slice(start + 1, end > 0 ? end : undefined)) {
      const m = l.trim();
      if (/^[A-Z0-9][A-Z0-9\-./ ]{1,40}$/i.test(m) && !models.includes(m)) models.push(m);
    }
  }
  return { slug, factoryAuthorized, officialUrl, modelCount: models.length, models };
}

await mkdir(modelsDir, { recursive: true });
const facts = {};
for (const slug of SLUGS) {
  const r = await scrape(slug);
  await writeFile(path.join(modelsDir, `${slug}.json`), JSON.stringify(r.models));
  facts[slug] = { factoryAuthorized: r.factoryAuthorized, officialUrl: r.officialUrl, modelCount: r.modelCount };
  console.log(`${slug.padEnd(11)} models=${String(r.modelCount).padStart(5)} factory=${r.factoryAuthorized} site=${r.officialUrl}`);
}
await writeFile(
  path.join(root, "src", "content", "brand-facts.generated.json"),
  JSON.stringify(facts, null, 2) + "\n",
);

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/ssr";
import { BookButton, CallButton } from "@/components/actions/Actions";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROBLEM_OPTIONS } from "@/content/booking-options";
import { brands } from "@/content/brands";
import { priceTiers } from "@/content/pricing";
import { processSteps, tvServices } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";
import tconBoard from "@/assets/images/tcon-board.jpg";
import technician from "@/assets/images/technician.jpg";

export const metadata = pageMetadata({
  title: "TV Repair Services in NYC",
  description:
    "LCD, LED, OLED, QLED, plasma, CRT, DLP and projection TV repair in Brooklyn, Queens, Manhattan, Bronx and Staten Island. In-home service or carry-in, flat-rate labor.",
  path: "/tv-repair",
});

/** Labor range for a service, from the price list. */
function laborRange(id: string) {
  const match: Record<string, (t: (typeof priceTiers)[number]) => boolean> = {
    "lcd-led": (t) => t.display.type === "LCD / LED",
    "oled-qled": (t) => t.display.type.includes("OLED"),
    plasma: (t) => t.display.type.includes("Plasma"),
    crt: (t) => t.display.type === "CRT",
  };
  const tiers = priceTiers.filter(match[id] ?? (() => false));
  if (!tiers.length) return null;
  const min = Math.min(...tiers.map((t) => t.labor.minor));
  const max = Math.max(...tiers.map((t) => t.labor.major));
  const flat = min === max ? `$${min}` : `$${min} - $${max}`;
  const hourly = tiers.find((t) => t.laborUnit);
  return hourly ? `${flat}, or $${hourly.labor.minor}/hr` : flat;
}

export default function TvRepairPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "TV repair",
          description: "In-home and carry-in repair for LCD, LED, OLED, QLED, plasma, CRT and projection televisions.",
          path: "/tv-repair",
        })}
      />
      <PageHeader
        crumbs={[{ name: "TV repair", path: "/tv-repair" }]}
        title="TV repair services"
        intro="We repair all major brands and models, in your home or at our Brooklyn service center. Labor is a flat rate by TV type and size."
        actions={
          <>
            <BookButton size="lg" />
            <CallButton size="lg" />
          </>
        }
      />

      <section aria-label="Types of TV we repair" className="container-x section-y">
        <ul className="grid gap-4 md:grid-cols-2">
          {tvServices.map((s) => {
            const range = laborRange(s.id);
            return (
              <li
                key={s.id}
                id={s.id}
                className="reveal scroll-mt-28 rounded-[var(--radius-card)] border border-line bg-surface p-7 md:p-9 target:border-accent target:shadow-card"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="section-title">{s.name}</h2>
                  {range && (
                    <p className="font-mono text-sm text-ink-2">
                      Labor <span className="text-base font-semibold text-ink">{range}</span>
                    </p>
                  )}
                </div>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-2">{s.detail}</p>
              </li>
            );
          })}
        </ul>
        <Link
          href="/pricing"
          className="mt-8 inline-flex items-center gap-2 font-semibold text-accent-text underline decoration-accent-text/30 underline-offset-[6px] hover:decoration-accent-text"
        >
          Full price list
          <ArrowRight size={16} weight="bold" aria-hidden />
        </Link>
      </section>

      <section aria-labelledby="problems-title" className="bg-surface-2">
        <div className="container-x section-y grid gap-8 lg:grid-cols-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] lg:col-span-5">
            <Image
              src={technician}
              alt="A technician's hands working on electronics with a precision screwdriver"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading id="problems-title" title="Problems we fix" intro="Pick the one that fits when you book. Not listed? Choose Other and describe it." />
            <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {PROBLEM_OPTIONS.filter((p) => p.value !== "other..").map((p) => (
                <li key={p.value} className="flex items-start gap-3 text-ink">
                  <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent-text" aria-hidden />
                  {p.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="container-x section-y">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="steps-title" title="In your home first" intro="The technician comes to you and repairs most problems on site. Complex cases are taken to our service center and brought back repaired." />
            <div className="relative mt-10 aspect-[3/2] overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src={tconBoard}
                alt="Close-up of a TV control board with capacitors and chips"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>
          <ol className="grid content-start gap-10 lg:col-span-6 lg:col-start-7">
            {processSteps.map((step, i) => (
              <li key={step.id} className="reveal grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-6">
                <span className="font-mono text-sm text-accent-text tabular">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="section-title">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="brands-list-title" className="border-t border-line">
        <div className="container-x section-y">
          <h2 id="brands-list-title" className="text-sm font-semibold text-ink">
            Brands we repair
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {brands.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/brands/${b.slug}`}
                  className="inline-flex h-9 items-center rounded-[4px] border border-line-strong px-4 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

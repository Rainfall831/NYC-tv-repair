import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookButton, CallButton } from "@/components/actions/Actions";
import { ZipChecker } from "@/components/areas/ZipChecker";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { BOROUGHS } from "@/content/business";
import { lowestHomeServiceFee } from "@/content/pricing";
import { tvServices } from "@/content/services";
import { BOROUGH_SLUGS, BOROUGH_ZIPS, boroughFromSlug } from "@/content/zips";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";
import brownstone from "@/assets/images/brownstone-portrait.jpg";

type Props = { params: Promise<{ borough: string }> };

export function generateStaticParams() {
  return BOROUGHS.map((b) => ({ borough: BOROUGH_SLUGS[b] }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const borough = boroughFromSlug((await params).borough);
  if (!borough) return {};
  return pageMetadata({
    title: `TV Repair in ${borough}`,
    description: `In-home and carry-in TV repair in ${borough}, NY. LCD, LED, OLED, QLED, plasma and CRT. Flat-rate labor, 30-day labor and 90-day parts warranty.`,
    path: `/service-areas/${BOROUGH_SLUGS[borough]}`,
  });
}

export default async function BoroughPage({ params }: Props) {
  const borough = boroughFromSlug((await params).borough);
  if (!borough) notFound();
  const slug = BOROUGH_SLUGS[borough];
  const others = BOROUGHS.filter((b) => b !== borough);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `TV repair in ${borough}`,
          description: `In-home and carry-in TV repair in ${borough}, New York.`,
          path: `/service-areas/${slug}`,
        })}
      />
      <PageHeader
        crumbs={[
          { name: "Service areas", path: "/service-areas" },
          { name: borough, path: `/service-areas/${slug}` },
        ]}
        title={`TV repair in ${borough}`}
        intro={`The technician comes to your home in ${borough} and repairs most problems on site. Home service fees start at $${lowestHomeServiceFee}, depending on TV size.`}
        actions={
          <>
            <BookButton size="lg" />
            <CallButton size="lg" />
          </>
        }
      />
      <section aria-label={`${borough} details`} className="container-x grid gap-12 section-y lg:grid-cols-12">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] lg:col-span-4">
          <Image src={brownstone} alt="Brownstone row houses in New York City" fill sizes="(min-width: 1024px) 32vw, 100vw" placeholder="blur" className="object-cover" />
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <h2 className="section-title">What we repair in {borough}</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {tvServices.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/tv-repair#${s.id}`}
                  className="inline-flex h-10 items-center rounded-[4px] border border-line-strong px-4 text-sm font-semibold text-ink hover:border-ink"
                >
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/appliance-repair"
                className="inline-flex h-10 items-center rounded-[4px] border border-line-strong px-4 text-sm font-semibold text-ink hover:border-ink"
              >
                Appliance repair
              </Link>
            </li>
          </ul>

          <h2 className="mt-8 section-title">{borough} ZIP codes we serve</h2>
          <ul className="mt-6 grid grid-cols-4 gap-2 font-mono text-sm text-ink-2 sm:grid-cols-6 md:grid-cols-8">
            {BOROUGH_ZIPS[borough].map((z) => (
              <li key={z} className="rounded-[4px] bg-surface-2 px-2 py-1.5 text-center tabular">
                {z}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-3">Not listed? Every ZIP code in {borough} is in our service area. Check yours below.</p>
          <div className="mt-8 max-w-md">
            <ZipChecker />
          </div>

          <p className="mt-12 text-sm text-ink-2">
            Also serving{" "}
            {others.map((b, i) => (
              <span key={b}>
                <Link href={`/service-areas/${BOROUGH_SLUGS[b]}`} className="font-semibold text-accent-text underline underline-offset-4">
                  {b}
                </Link>
                {i < others.length - 2 ? ", " : i === others.length - 2 ? " and " : "."}
              </span>
            ))}
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

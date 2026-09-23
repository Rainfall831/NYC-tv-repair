import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, SealCheck } from "@phosphor-icons/react/ssr";
import { BookButton, CallButton } from "@/components/actions/Actions";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { ModelSearch } from "@/components/brands/ModelSearch";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { MODEL_PREVIEW_COUNT, brandCopy, brands, getBrand } from "@/content/brands";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const brand = getBrand((await params).slug);
  if (!brand) return {};
  return pageMetadata({
    title: `${brand.name} TV Repair in NYC`,
    description: `${brand.name} TV repair in Brooklyn, Queens, Manhattan, Bronx and Staten Island. ${
      brand.factoryAuthorized ? `Factory authorized for ${brand.name}. ` : ""
    }LCD, LED, plasma, DLP and CRT projection. Most repairs done in your home.`,
    path: `/brands/${brand.slug}`,
  });
}

async function modelPreview(slug: string) {
  try {
    const file = path.join(process.cwd(), "public", "data", "models", `${slug}.json`);
    const all = JSON.parse(await readFile(file, "utf8")) as string[];
    return all.slice(0, MODEL_PREVIEW_COUNT);
  } catch {
    return [];
  }
}

export default async function BrandPage({ params }: Props) {
  const brand = getBrand((await params).slug);
  if (!brand) notFound();
  const copy = brandCopy(brand);
  const preview = await modelPreview(brand.slug);
  const idx = brands.findIndex((b) => b.slug === brand.slug);
  const neighbors = [brands[(idx - 1 + brands.length) % brands.length], brands[(idx + 1) % brands.length]];

  return (
    <>
      <JsonLd
        data={{
          ...serviceSchema({ name: `${brand.name} TV repair`, description: copy.specialty, path: `/brands/${brand.slug}` }),
          brand: { "@type": "Brand", name: brand.name },
        }}
      />
      <PageHeader
        crumbs={[
          { name: "Brands", path: "/brands" },
          { name: brand.name, path: `/brands/${brand.slug}` },
        ]}
        title={`${brand.name} TV repair`}
        intro={copy.specialty}
        actions={
          <>
            <BookButton size="lg" brand={brand.slug} />
            <CallButton size="lg" />
          </>
        }
        aside={
          <div className="flex aspect-[4/3] flex-col justify-between rounded-[var(--radius-card)] border border-line bg-surface p-7">
            {copy.authorized ? (
              <p className="inline-flex items-center gap-2 self-start rounded-[4px] bg-accent-soft px-3 py-1 text-sm font-semibold text-accent-text">
                <SealCheck size={16} weight="bold" aria-hidden />
                Factory authorized
              </p>
            ) : (
              <span />
            )}
            <BrandLogo slug={brand.slug} name={brand.name} large className="mx-auto text-ink" />
            <p className="text-sm text-ink-2">{copy.authorized ?? "All work is guaranteed."}</p>
          </div>
        }
      />

      <section aria-labelledby="brand-about" className="container-x section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="brand-about" className="section-title">
            What you need to know about us
          </h2>
          <ul className="mt-6 space-y-4">
            {copy.facts.map((f) => (
              <li key={f} className="flex gap-3 text-lg text-ink">
                <Check size={22} weight="bold" className="mt-1 shrink-0 text-accent-text" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="leading-relaxed text-ink-2">{copy.parts}</p>
          <ul className="mt-8 space-y-3 border-t border-line pt-6 text-[0.95rem]">
            {brand.officialUrl && (
              <li>
                <a
                  href={brand.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 font-semibold text-accent-text underline underline-offset-4"
                >
                  {brand.name} official website
                  <ArrowUpRight size={14} weight="bold" aria-hidden />
                </a>
              </li>
            )}
            <li>
              <span className="text-ink-2">If you need parts, </span>
              <a
                href={business.sisterSites.parts.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-accent-text underline underline-offset-4"
              >
                visit tv-part.com
                <ArrowUpRight size={14} weight="bold" aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="models-title" className="bg-surface-2">
        <div className="container-x section-y">
          <h2 id="models-title" className="section-title">
            {brand.name} models
          </h2>
          <div className="mt-8">
            {brand.modelCount > 0 ? (
              <ModelSearch slug={brand.slug} brand={brand.name} preview={preview} total={brand.modelCount} />
            ) : (
              <p className="max-w-[56ch] text-lg text-ink-2">
                We repair {brand.name} televisions of all types. Book a repair and enter your model number, and we will confirm the details with you.
              </p>
            )}
          </div>
        </div>
      </section>

      <nav aria-label="More brands" className="container-x section-y flex flex-wrap items-center justify-between gap-4 text-sm">
        <Link href={`/brands/${neighbors[0].slug}`} className="font-semibold text-ink-2 hover:text-ink">
          <span aria-hidden>&larr;</span> {neighbors[0].name} TV repair
        </Link>
        <Link href="/brands" className="font-semibold text-accent-text underline underline-offset-4">
          All brands
        </Link>
        <Link href={`/brands/${neighbors[1].slug}`} className="font-semibold text-ink-2 hover:text-ink">
          {neighbors[1].name} TV repair <span aria-hidden>&rarr;</span>
        </Link>
      </nav>

      <CtaBand title={`Book ${brand.name} repair`} brand={brand.slug} />
    </>
  );
}

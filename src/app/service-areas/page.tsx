import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { BoroughMap } from "@/components/areas/BoroughMap";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { BOROUGHS, serviceAreaNotice } from "@/content/business";
import { BOROUGH_SLUGS, BOROUGH_ZIPS } from "@/content/zips";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Service Areas: Brooklyn, Queens, Manhattan, Bronx & Staten Island",
  description:
    "NY Tech TV Repair serves all five New York City boroughs: Brooklyn, Queens, Manhattan, the Bronx and Staten Island. Check your ZIP code.",
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Service areas", path: "/service-areas" }]}
        title="Five boroughs"
        intro={serviceAreaNotice}
      />
      <section aria-label="Map" className="container-x section-y">
        <BoroughMap />
      </section>
      <section aria-labelledby="boroughs-title" className="border-t border-line">
        <div className="container-x section-y">
          <h2 id="boroughs-title" className="sr-only">
            Boroughs
          </h2>
          <ul className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-5">
            {BOROUGHS.map((b) => (
              <li key={b}>
                <Link href={`/service-areas/${BOROUGH_SLUGS[b]}`} className="group block">
                  <span className="flex items-center justify-between gap-2 border-t border-line pt-3 section-title">
                    {b}
                    <ArrowRight size={20} weight="bold" className="text-ink-3 transition-colors group-hover:text-accent-text" aria-hidden />
                  </span>
                  <span className="mt-2 block text-sm text-ink-2">
                    {BOROUGH_ZIPS[b].length} residential ZIP codes
                  </span>
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

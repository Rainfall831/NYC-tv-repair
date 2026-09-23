import Link from "next/link";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { repairTimeline, warranty } from "@/content/terms";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Warranty",
  description: "30-day labor and 90-day parts warranty on TV repairs by NY Tech TV Repair. What is covered and what is excluded.",
  path: "/warranty",
});

export default function WarrantyPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Warranty", path: "/warranty" }]}
        title="30-day labor. 90-day parts."
        intro={warranty.intro}
      />
      <section aria-label="Warranty terms" className="container-x grid gap-12 section-y lg:grid-cols-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
          <div className="rounded-[var(--radius-card)] bg-accent p-7 text-on-accent">
            <p className="display text-7xl">90</p>
            <p className="mt-3 font-semibold">day parts warranty</p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
            <p className="display text-7xl text-ink">30</p>
            <p className="mt-3 font-semibold text-ink">day labor warranty</p>
          </div>
        </div>
        <Prose className="lg:col-span-6 lg:col-start-7">
          <h2>Parts warranty</h2>
          <p>{warranty.parts}</p>
          <h2>Labor warranty</h2>
          <p>{warranty.labor}</p>
          <h2>Exclusions</h2>
          <p>{warranty.exclusionsIntro}</p>
          <ul>
            {warranty.exclusions.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <h2>{repairTimeline.title}</h2>
          <p>{repairTimeline.body}</p>
          <p>
            Read the full <Link href="/terms">terms and conditions</Link>.
          </p>
        </Prose>
      </section>
      <CtaBand />
    </>
  );
}

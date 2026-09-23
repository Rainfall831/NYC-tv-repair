import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CreditCard } from "@phosphor-icons/react/ssr";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { aboutStory, warrantyPromises, whyNyTech } from "@/content/about";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/metadata";
import technician from "@/assets/images/technician.jpg";
import brownstones from "@/assets/images/brownstones.jpg";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "NY Tech TV Repair is a professional TV repair service serving all five New York City boroughs, with qualified technicians and 80+ years of combined experience.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "About us", path: "/about" }]}
        title="Welcome to NY Tech TV Repair"
        intro={aboutStory[0]}
      />

      <section aria-label="Our story" className="container-x pb-10">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] md:col-span-7 md:aspect-auto md:min-h-48">
            <Image src={brownstones} alt="A row of Brooklyn brownstones with stoops" fill sizes="(min-width: 768px) 58vw, 100vw" placeholder="blur" className="object-cover" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] md:col-span-5">
            <Image src={technician} alt="A technician working on electronics with a precision screwdriver" fill sizes="(min-width: 768px) 40vw, 100vw" placeholder="blur" className="object-cover" />
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <p className="section-title lg:col-span-6">
            There is nothing that could stop us from successfully repairing your television.
          </p>
          <div className="prose-body text-[14px] leading-relaxed text-ink-2 lg:col-span-5 lg:col-start-8">
            <p>{aboutStory[1]}</p>
            <p>{aboutStory[2]}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="why-title" className="bg-surface-2">
        <div className="container-x section-y">
          <h2 id="why-title" className="section-title">
            Why NY Tech?
          </h2>
          <ol className="mt-6 grid gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
            {whyNyTech.map((w, i) => (
              <li key={w.id} className={i === 0 ? "reveal md:col-span-2" : i === whyNyTech.length - 1 ? "reveal lg:col-span-2" : "reveal"}>
                <span className="font-mono text-sm text-accent-text tabular">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 section-title">{w.title}</h3>
                <p className="mt-2 max-w-[48ch] leading-relaxed text-ink-2">{w.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="promise-title" className="container-x section-y grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="promise-title" className="section-title">
            Our warranty
          </h2>
          <ul className="mt-8 space-y-4">
            {warrantyPromises.map((w) => (
              <li key={w} className="border-t border-line pt-3 section-title">
                {w}
              </li>
            ))}
          </ul>
          <Link href="/warranty" className="mt-8 inline-flex items-center gap-2 font-semibold text-accent-text underline decoration-accent-text/30 underline-offset-[6px] hover:decoration-accent-text">
            Warranty details
            <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
        </div>
        <div className="grid content-start gap-6 lg:col-span-5 lg:col-start-8">
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
            <CreditCard size={28} weight="duotone" className="text-accent-text" aria-hidden />
            <p className="mt-3 section-title">{business.paymentsAccepted}</p>
            <Link href="/pay" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent-text">
              Pay for repair online
              <ArrowRight size={14} weight="bold" aria-hidden />
            </Link>
          </div>
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
            <p className="section-title">Industry association</p>
            <a href={business.nesda.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent-text">
              NESDA, National Electronics Service Dealers Association
              <ArrowUpRight size={14} weight="bold" aria-hidden />
            </a>
          </div>
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
            <p className="section-title">Job opportunity</p>
            <p className="mt-2 text-ink-2">We are hiring a field service TV technician.</p>
            <Link href="/careers" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent-text">
              See the opening
              <ArrowRight size={14} weight="bold" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

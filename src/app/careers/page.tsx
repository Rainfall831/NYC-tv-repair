import { Check, EnvelopeSimple } from "@phosphor-icons/react/ssr";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { career } from "@/content/about";
import { business, links } from "@/content/business";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Job Opportunity: Field Service TV Technician",
  description:
    "NY Tech TV Repair is hiring a field service TV technician. Base pay, incentive plan and use of a company van. Send your CV to nytech@nytechtvrepair.com.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Careers", path: "/careers" }]}
        title={career.title.replace(" - ", ": ")}
        intro={career.status}
        actions={
          <ButtonLink href={links.careers} size="lg" icon={<EnvelopeSimple size={18} weight="bold" aria-hidden />}>
            Email your CV
          </ButtonLink>
        }
      />
      <section aria-label="Job details" className="container-x grid gap-8 pb-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="section-title">{career.intro}</h2>
          <ul className="mt-6 space-y-4 text-lg leading-relaxed text-ink-2">
            {career.description.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7 md:p-9 lg:col-span-5 lg:col-start-8">
          <h2 className="section-title">Candidate requirements</h2>
          <ul className="mt-6 space-y-4">
            {career.requirements.map((r) => (
              <li key={r.text} className="flex gap-3 text-ink">
                <Check size={20} weight="bold" className="mt-0.5 shrink-0 text-accent-text" aria-hidden />
                <span>
                  {r.text}
                  {r.required && <span className="text-ink-3"> (required)</span>}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-line pt-6 text-ink-2">
            {career.apply}{" "}
            <a href={links.careers} className="font-semibold text-accent-text underline underline-offset-4">
              {business.careersEmail}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

import { PageHeader } from "@/components/layout/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { business, links, serviceAreaNotice } from "@/content/business";
import { extraTechnician, pricingNotes } from "@/content/pricing";
import {
  cancellationExample,
  confirmationCall,
  homeServiceFeeRules,
  homeServiceIncludes,
  paymentInfo,
  repairTimeline,
  termsClosing,
  warranty,
} from "@/content/terms";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Repair, warranty, home service fee, cancellation and payment terms for NY Tech TV Repair, Inc.",
  path: "/terms",
});

const toc = [
  ["repair", "Repair & parts"],
  ["warranty", "Warranty"],
  ["payment", "Payment information"],
  ["home-service-fee", "Home service fee"],
  ["extra-technician", "Extra technician"],
  ["service-area", "Service area"],
] as const;

export default function TermsPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Terms and conditions", path: "/terms" }]} title="Terms and conditions" />
      <div className="container-x grid gap-12 section-y lg:grid-cols-12">
        <nav aria-label="On this page" className="lg:col-span-3">
          <ul className="space-y-2 text-sm lg:sticky lg:top-28">
            {toc.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-ink-2 hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Prose className="lg:col-span-8 lg:col-start-5">
          <section id="repair" className="scroll-mt-28">
            <h2>{repairTimeline.title}</h2>
            <p>{repairTimeline.body}</p>
          </section>

          <section id="warranty" className="scroll-mt-28">
            <h2>Warranty</h2>
            <p>{warranty.intro}</p>
            <h3>Parts warranty</h3>
            <p>{warranty.parts}</p>
            <h3>Labor warranty</h3>
            <p>{warranty.labor}</p>
            <p>{warranty.exclusionsIntro}</p>
            <ul>
              {warranty.exclusions.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </section>

          <section id="payment" className="scroll-mt-28">
            <h2>Payment information</h2>
            <p>{paymentInfo}</p>
            <p>{pricingNotes.tax}</p>
          </section>

          <section id="home-service-fee" className="scroll-mt-28">
            <h2>Home service fee information</h2>
            <ul>
              {homeServiceFeeRules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p>{cancellationExample}</p>
            <p>{confirmationCall}</p>
            <h3>Home service fee charges include</h3>
            <ul>
              {homeServiceIncludes.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>

          <section id="extra-technician" className="scroll-mt-28">
            <h2>Extra technician</h2>
            <p>
              <strong>{extraTechnician.text}</strong>
            </p>
            <p>{extraTechnician.detail}</p>
          </section>

          <section id="service-area" className="scroll-mt-28">
            <h2>Service area</h2>
            <p>{serviceAreaNotice}</p>
            <p>
              {termsClosing} Phone: <a href={links.call}>{business.phones.main.display}</a>
            </p>
          </section>
        </Prose>
      </div>
    </>
  );
}

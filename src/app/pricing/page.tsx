import { BookButton, CallButton } from "@/components/actions/Actions";
import { CtaBand } from "@/components/layout/CtaBand";
import { Breadcrumbs } from "@/components/layout/PageHeader";
import { PricingExplorer } from "@/components/pricing/PricingExplorer";
import { PricingNotes } from "@/components/pricing/PricingNotes";
import { Prose } from "@/components/ui/Prose";
import { extraTechnician, pricingHeadline } from "@/content/pricing";
import { homeServiceIncludes } from "@/content/terms";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "TV Repair Pricing",
  description:
    "Flat-rate TV repair prices by type and size: home service fee, minor, intermediate and major labor, carry-in options and in-shop estimates. Parts not included.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <header className="container-x pt-6 pb-2">
        <Breadcrumbs items={[{ name: "Pricing", path: "/pricing" }]} />
        <div className="mt-4 flex flex-wrap gap-3">
          <BookButton size="lg" />
          <CallButton size="lg" />
        </div>
      </header>
      <section aria-label="Price list" className="border-t border-line bg-bg">
        <div className="container-x section-y">
          <PricingExplorer headingLevel="h1" />
          <PricingNotes />
        </div>
      </section>
      <section aria-labelledby="fee-title" className="bg-surface-2">
        <div className="container-x section-y grid gap-8 lg:grid-cols-2">
          <Prose>
            <h2 id="fee-title">The home service fee</h2>
            <p>{pricingHeadline.payInAdvance}</p>
            <p>The home service fee charge includes:</p>
            <ul>
              {homeServiceIncludes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </Prose>
          <Prose>
            <h2>Extra technician</h2>
            <p>
              <strong>{extraTechnician.text}</strong>
            </p>
            <p>{extraTechnician.detail}</p>
          </Prose>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

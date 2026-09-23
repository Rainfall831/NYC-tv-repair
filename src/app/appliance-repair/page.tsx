import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { CallButton } from "@/components/actions/Actions";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BOROUGHS, business } from "@/content/business";
import { appliancePricing } from "@/content/pricing";
import { applianceTypes } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";
import kitchen from "@/assets/images/kitchen.jpg";

export const metadata = pageMetadata({
  title: "Appliance Repair in NYC",
  description:
    "In-home appliance repair in Brooklyn, Queens, Manhattan, Bronx and Staten Island. Flat labor starting at $175. Refrigerators, washers, dryers, ranges, dishwashers and more.",
  path: "/appliance-repair",
});

export default function ApplianceRepairPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Appliance repair",
          description: appliancePricing.text,
          path: "/appliance-repair",
        })}
      />
      <PageHeader
        crumbs={[{ name: "Appliance repair", path: "/appliance-repair" }]}
        title="Appliance repair"
        intro="In-home repair for household appliances across the five boroughs. Any questions, please call."
        actions={
          <>
            <CallButton variant="primary" size="lg" />
            <ButtonLink
              href={business.sisterSites.appliance.url}
              variant="secondary"
              size="lg"
              iconRight={<ArrowUpRight size={18} weight="bold" aria-hidden />}
            >
              NY Tech Appliance site
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
            <p className="text-sm font-semibold text-ink-2">Flat labor starting at</p>
            <p className="mt-1 section-title text-accent-text">${appliancePricing.laborFrom}</p>
            <p className="mt-2 text-ink">and up. In home repair service.</p>
            <p className="mt-4 border-t border-line pt-4 text-sm text-ink-2">
              30-day labor and 90-day parts warranty. Parts not included; prices exclude tax.
            </p>
          </div>
        }
      />

      <section aria-labelledby="appliances-title" className="container-x section-y">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius-card)]">
          <Image
            src={kitchen}
            alt="A modern kitchen with a stainless steel refrigerator, range and microwave"
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="appliances-title"
            className="lg:col-span-4"
            title="What we fix"
            intro="Any brand, shape or size."
          />
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 lg:col-span-7 lg:col-start-6 lg:grid-cols-4">
            {applianceTypes.map((a) => (
              <li key={a} className="border-t border-line pt-3 text-lg font-medium text-ink">
                {a}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-16 max-w-[60ch] text-ink-2">
          Appliance repair is an in-home service available in {BOROUGHS.join(", ")}. The home service fee is paid in advance when the technician arrives, and the customer covers tolls when applicable.
        </p>
      </section>

      <CtaBand title="Tell us what broke" body={appliancePricing.callText} />
    </>
  );
}

import Image from "next/image";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { Breadcrumbs } from "@/components/layout/PageHeader";
import { BOROUGHS, serviceAreaNotice } from "@/content/business";
import { pageMetadata } from "@/lib/metadata";
import skyline from "@/assets/images/skyline.jpg";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "NY Tech TV Repair, Inc., 3130 Nostrand Ave, Brooklyn, NY 11229. Call (718) 787-1301 or (212) 348-5858. Mon-Fri 10am-6pm, Sat 10am-4pm.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="contact-title" className="container-x section-y">
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
        <div className="mt-10 md:mt-14">
          <ContactPanel headingLevel="h1" title="Contact us" />
        </div>
      </section>
      <section aria-label="Service area" className="container-x section-y">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius-card)]">
          <Image
            src={skyline}
            alt="The Manhattan skyline and Brooklyn Bridge at dusk"
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-12">
          <p className="section-title md:col-span-5">We serve the following areas in New York</p>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lg text-ink">{BOROUGHS.join(", ")}.</p>
            <p className="mt-3 text-ink-2">{serviceAreaNotice}</p>
          </div>
        </div>
      </section>
    </>
  );
}

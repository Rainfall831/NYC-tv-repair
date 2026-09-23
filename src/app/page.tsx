import { ContactPanel } from "@/components/contact/ContactPanel";
import { Hero } from "@/components/home/Hero";
import { BrandsSection } from "@/components/home/MoreSections";
import { OfferBand } from "@/components/home/OfferBand";
import { PricingSection } from "@/components/home/PricingSection";
import { ServicesBento } from "@/components/home/ServicesBento";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PricingSection />
      <ServicesBento />
      <OfferBand />
      <BrandsSection />
      <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-surface">
        <div className="container-x pt-8 pb-6 md:pt-10 md:pb-6">
          <ContactPanel />
        </div>
      </section>
    </>
  );
}

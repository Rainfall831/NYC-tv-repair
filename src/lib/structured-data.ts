import { BOROUGHS, SITE_URL, business } from "@/content/business";
import { appliancePricing, priceTiers } from "@/content/pricing";

const BUSINESS_ID = `${SITE_URL}/#business`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": BUSINESS_ID,
    name: business.legalName,
    alternateName: business.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/images/og.jpg`,
    description:
      "TV repair service for LCD, LED, OLED, QLED, plasma, CRT and projection televisions, in home or at our Brooklyn service center. Serving Brooklyn, Queens, Manhattan, Bronx and Staten Island.",
    telephone: business.phones.main.e164,
    faxNumber: business.fax.e164,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    contactPoint: [
      { "@type": "ContactPoint", telephone: business.phones.main.e164, contactType: "customer service", areaServed: "US-NY" },
      { "@type": "ContactPoint", telephone: business.phones.manhattan.e164, contactType: "customer service", areaServed: "US-NY" },
    ],
    openingHoursSpecification: business.hours
      .filter((h) => h.opens)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    areaServed: BOROUGHS.map((b) => ({ "@type": "City", name: `${b}, New York` })),
    paymentAccepted: "Credit Card",
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "TV repair flat rate price list (parts not included, tax excluded)",
      itemListElement: [
        ...priceTiers.map((t) => ({
          "@type": "Offer",
          name: `${t.display.type} ${t.display.size}`,
          description: t.note,
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: t.labor.minor,
            maxPrice: t.labor.major,
            priceCurrency: "USD",
            valueAddedTaxIncluded: false,
            ...(t.laborUnit ? { unitText: "hour" } : {}),
          },
          itemOffered: { "@type": "Service", name: `${t.display.type} TV repair labor, ${t.display.size}` },
        })),
        {
          "@type": "Offer",
          name: appliancePricing.label,
          description: appliancePricing.text,
          priceSpecification: { "@type": "PriceSpecification", minPrice: appliancePricing.laborFrom, priceCurrency: "USD" },
          itemOffered: { "@type": "Service", name: "In-home appliance repair" },
        },
      ],
    },
  };
}

export function serviceSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: BOROUGHS.map((b) => ({ "@type": "City", name: `${b}, New York` })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

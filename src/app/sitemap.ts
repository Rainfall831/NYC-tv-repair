import type { MetadataRoute } from "next";
import { BOROUGHS, SITE_URL } from "@/content/business";
import { brands } from "@/content/brands";
import { BOROUGH_SLUGS } from "@/content/zips";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["/", 1],
    ["/tv-repair", 0.9],
    ["/pricing", 0.9],
    ["/book", 0.9],
    ["/appliance-repair", 0.7],
    ["/special-offers", 0.7],
    ["/service-areas", 0.7],
    ["/brands", 0.7],
    ["/about", 0.6],
    ["/contact", 0.8],
    ["/pay", 0.5],
    ["/warranty", 0.5],
    ["/careers", 0.4],
    ["/terms", 0.3],
    ["/privacy", 0.3],
  ];
  return [
    ...pages.map(([p, priority]) => ({ url: `${SITE_URL}${p}`, priority })),
    ...BOROUGHS.map((b) => ({ url: `${SITE_URL}/service-areas/${BOROUGH_SLUGS[b]}`, priority: 0.6 })),
    ...brands.map((b) => ({ url: `${SITE_URL}/brands/${b.slug}`, priority: 0.5 })),
  ];
}

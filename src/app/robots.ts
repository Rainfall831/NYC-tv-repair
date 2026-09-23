import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/payment-complete"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

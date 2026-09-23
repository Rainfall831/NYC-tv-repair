import type { NextConfig } from "next";
import { brands } from "./src/content/brands";

const legacyPages: [string, string][] = [
  ["/index.html", "/"],
  ["/about.html", "/about"],
  ["/service.html", "/book"],
  ["/payment.html", "/pay"],
  ["/payment_complete.html", "/payment-complete"],
  ["/contact.html", "/contact"],
  ["/tos.html", "/terms"],
  ["/job.html", "/careers"],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  async redirects() {
    return [
      ...legacyPages.map(([source, destination]) => ({ source, destination, permanent: true })),
      ...brands.map((b) => ({
        source: `/${b.slug}_tv_repair.html`,
        destination: `/brands/${b.slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;

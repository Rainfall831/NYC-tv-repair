import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { MobileCallBookBar } from "@/components/layout/MobileCallBookBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { themeInitScript } from "@/components/layout/ThemeToggle";
import { SITE_URL } from "@/content/business";
import { localBusinessSchema } from "@/lib/structured-data";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NY Tech TV Repair | TV Repair in Brooklyn, Queens, Manhattan, Bronx & Staten Island",
    template: "%s | NY Tech TV Repair",
  },
  description:
    "Flat-rate TV repair for LCD, LED, OLED, QLED, plasma and CRT TVs, in your home or at our Brooklyn service center. All five NYC boroughs. 30-day labor, 90-day parts warranty.",
  applicationName: "NY Tech TV Repair",
  openGraph: {
    type: "website",
    siteName: "NY Tech TV Repair, Inc.",
    locale: "en_US",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Flat screen TV mounted on a wood panel wall" }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a1633",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the theme script may set data-theme before React hydrates.
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 rounded-[4px] bg-accent px-4 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileCallBookBar />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}

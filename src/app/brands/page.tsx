import { BrandWall } from "@/components/brands/BrandWall";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { brands } from "@/content/brands";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "TV Brands We Repair",
  description: `We repair all major TV brands, including ${brands
    .slice(0, 12)
    .map((b) => b.name)
    .join(", ")} and more, across all five NYC boroughs.`,
  path: "/brands",
});

export default function BrandsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Brands", path: "/brands" }]}
        title="We repair all major brands"
        intro="Choose your brand for details and the models we service. Don't see yours? Choose Other brand when you book."
      />
      <section aria-label="Brands" className="container-x section-y">
        <BrandWall extra={{ label: "Other brand", href: "/book" }} />
      </section>
      <CtaBand />
    </>
  );
}

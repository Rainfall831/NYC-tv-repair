import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { BrandWall } from "@/components/brands/BrandWall";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands } from "@/content/brands";

export function BrandsSection() {
  return (
    <section aria-labelledby="brands-title" className="container-x defer-section border-t border-line section-y">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="brands-title"
          title="We repair all major brands"
          intro={`${brands.length} brands, from Samsung, LG and Sony to Loewe and Olevia. Pick yours for models we service.`}
        />
        <Link
          href="/brands"
          className="inline-flex shrink-0 items-center gap-2 text-[14px] font-semibold text-accent-text underline decoration-accent-text/30 underline-offset-4 hover:decoration-accent-text"
        >
          All brands
          <ArrowRight size={16} weight="bold" aria-hidden />
        </Link>
      </div>
      <BrandWall className="mt-6" />
    </section>
  );
}

import Link from "next/link";
import clsx from "clsx";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { brands } from "@/content/brands";

/** Logo wall. Each tile is the brand SVG and links to that brand's repair page. */
export function BrandWall({
  className,
  extra = { label: "All brands", href: "/brands" },
}: {
  className?: string;
  /** A 36th tile shown below md so the 2- and 3-column grids have no empty cell (35 brands). */
  extra?: { label: string; href: string };
}) {
  return (
    <ul
      className={clsx(
        "grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7",
        className,
      )}
    >
      {brands.map((b) => (
        <li key={b.slug} className="bg-surface">
          <Link
            href={`/brands/${b.slug}`}
            className="group flex h-14 items-center justify-center px-3 transition-colors hover:bg-accent-soft focus-visible:bg-accent-soft md:h-16"
          >
            <BrandLogo slug={b.slug} name={b.name} />
            <span className="sr-only">
              {b.name} TV repair
            </span>
          </Link>
        </li>
      ))}
      <li className="bg-accent md:hidden">
        <Link href={extra.href} className="flex h-24 items-center justify-center px-3 font-semibold text-on-accent">
          {extra.label}
        </Link>
      </li>
    </ul>
  );
}

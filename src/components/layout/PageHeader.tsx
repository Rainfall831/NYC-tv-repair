import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-2">
          <li>
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          {items.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1.5">
              <CaretRight size={12} weight="bold" className="text-ink-3" aria-hidden />
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="hover:text-ink">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}

type PageHeaderProps = {
  crumbs: Crumb[];
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
};

/** Inner-page header: breadcrumb, oversized title, short intro, optional actions and aside. */
export function PageHeader({ crumbs, title, intro, actions, aside }: PageHeaderProps) {
  return (
    <header className="container-x pt-6 pb-8">
      <Breadcrumbs items={crumbs} />
      <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
          <h1 className="enter page-title">{title}</h1>
          {intro && <p className="enter mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-2 md:text-xl" style={{ ["--d" as string]: "120ms" }}>{intro}</p>}
          {actions && <div className="enter mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: "200ms" }}>{actions}</div>}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </header>
  );
}

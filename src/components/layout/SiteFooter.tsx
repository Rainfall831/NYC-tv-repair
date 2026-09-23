import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { BOROUGHS, addressOneLine, business, links } from "@/content/business";
import { footerNav } from "@/content/nav";
import { BOROUGH_SLUGS } from "@/content/zips";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[14px] font-semibold text-ink">{title}</h2>
      <div className="mt-2 text-[14px] text-ink-2">{children}</div>
    </div>
  );
}

const linkCls = "transition-colors hover:text-ink";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface pb-24 md:pb-0">
      <div className="container-x grid gap-8 py-8 md:grid-cols-5 md:gap-6 lg:gap-8">
        <div className="md:col-span-1">
          <Link href="/" aria-label="NY Tech TV Repair home" className="inline-block rounded-[4px]">
            <Logo />
          </Link>
          <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-ink-2">
            TV repair in your home or at our Brooklyn service center. Serving all five boroughs of New York City.
          </p>
          <address className="mt-3 not-italic text-[14px] leading-relaxed text-ink-2">
            <a href={links.map} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {business.address.street}
              <br />
              {business.address.city}, {business.address.region} {business.address.postalCode}
            </a>
          </address>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-4 md:grid-cols-4 md:gap-6 lg:gap-8">
          <Column title="Services">
            <ul className="space-y-1.5">
              {footerNav.services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>
          <Column title="Company">
            <ul className="space-y-1.5">
              {footerNav.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>
          <Column title="Service areas">
            <ul className="space-y-1.5">
              {BOROUGHS.map((b) => (
                <li key={b}>
                  <Link href={`/service-areas/${BOROUGH_SLUGS[b]}`} className={linkCls}>
                    {b}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>
          <Column title="Contact">
            <ul className="space-y-1.5">
              <li>
                <a href={links.call} className={linkCls}>
                  {business.phones.main.display}
                </a>
              </li>
              <li>
                <a href={links.callManhattan} className={linkCls}>
                  {business.phones.manhattan.display}
                </a>
              </li>
              <li>Fax {business.fax.display}</li>
              <li>
                <a href={links.email} className={linkCls}>
                  {business.email.replace("@", "\u200b@")}
                </a>
              </li>
              {business.hours.map((h) => (
                <li key={h.label}>
                  {h.label.replace("Monday - Friday", "Mon-Fri").replace("Saturday", "Sat").replace("Sunday", "Sun")} {h.value}
                </li>
              ))}
            </ul>
          </Column>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-3 text-[14px] text-ink-2 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {business.legalName} All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={business.sisterSites.appliance.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {business.sisterSites.appliance.label}
              </a>
            </li>
            <li>
              <a href={business.sisterSites.tvRepairService.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {business.sisterSites.tvRepairService.label}
              </a>
            </li>
            <li>
              <a href={business.nesda.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {business.nesda.label}
              </a>
            </li>
          </ul>
        </div>
        <p className="sr-only">{addressOneLine}</p>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { CallButton, DirectionsButton, EmailButton, TextButton } from "@/components/actions/Actions";
import { business, links } from "@/content/business";

const labelCls = "text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-3";
const valueCls = "mt-1 text-[14px] leading-snug text-ink";

export function ContactPanel({ headingLevel = "h2", title = "Talk to a technician" }: { headingLevel?: "h1" | "h2"; title?: string }) {
  const H = headingLevel;
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-10">
      <div>
        <H id="contact-title" className="page-title">
          {title}
        </H>
        <a
          href={links.call}
          className="mt-1 block whitespace-nowrap text-[28px] font-semibold leading-tight text-accent-text transition-colors hover:text-accent-hover tabular"
        >
          {business.phones.main.display}
        </a>
        <div className="mt-3 flex flex-wrap gap-2">
          <CallButton variant="primary" size="md" label="Call now" />
          <TextButton size="md" />
          <EmailButton size="md" />
          <DirectionsButton size="md" />
        </div>
        <Link
          href="/careers"
          className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent-text underline decoration-accent-text/30 underline-offset-[4px] hover:decoration-accent-text"
        >
          Job opportunity: field service TV technician
          <ArrowRight size={14} weight="bold" aria-hidden />
        </Link>
      </div>

      <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <div>
          <dt className={labelCls}>Address</dt>
          <dd className={valueCls}>
            <address className="not-italic">
              {business.legalName}
              <br />
              {business.address.street}
              <br />
              {business.address.city}, {business.address.region} {business.address.postalCode}
            </address>
          </dd>
        </div>
        <div>
          <dt className={labelCls}>Hours</dt>
          <dd className={valueCls}>
            <ul>
              {business.hours.map((h) => (
                <li key={h.label}>
                  {h.label}: {h.value}
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className={labelCls}>Office</dt>
          <dd className={valueCls}>
            <a href={links.call} className="block transition-colors hover:text-accent-text tabular">
              {business.phones.main.display}
            </a>
            <a href={links.callManhattan} className="block transition-colors hover:text-accent-text tabular">
              {business.phones.manhattan.display}
            </a>
            <span className="block text-ink-2">Fax {business.fax.display}</span>
          </dd>
        </div>
        <div>
          <dt className={labelCls}>Email</dt>
          <dd className={valueCls}>
            <a href={links.email} className="break-all transition-colors hover:text-accent-text">
              {business.email}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
}

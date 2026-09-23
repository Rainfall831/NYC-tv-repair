import { Clock, Phone, ShieldCheck } from "@phosphor-icons/react/ssr";
import { BookingForm } from "@/components/booking/BookingForm";
import { Breadcrumbs } from "@/components/layout/PageHeader";
import { business, links, serviceAreaNotice } from "@/content/business";
import { pricingHeadline } from "@/content/pricing";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Book a TV Repair",
  description:
    "Book an online appointment for TV repair in Brooklyn, Queens, Manhattan, Bronx or Staten Island. Online response time is under one hour during business hours.",
  path: "/book",
});

export default function BookPage() {
  return (
    <div className="container-x section-y">
      <Breadcrumbs items={[{ name: "Book a repair", path: "/book" }]} />
      <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h1 className="enter page-title">Book a repair</h1>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-ink-2">
              Book an online appointment for TV repair. Online response time is under one hour during business hours.
            </p>
            <ul className="mt-10 space-y-6 border-t border-line pt-8">
              <li className="flex gap-3">
                <Phone size={22} weight="duotone" className="mt-0.5 shrink-0 text-accent-text" aria-hidden />
                <div>
                  <p className="font-semibold text-ink">Contact us by phone</p>
                  <a href={links.call} className="mt-1 block font-mono text-lg text-ink underline decoration-line-strong underline-offset-4 tabular hover:decoration-ink">
                    {business.phones.main.display}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock size={22} weight="duotone" className="mt-0.5 shrink-0 text-accent-text" aria-hidden />
                <div>
                  <p className="font-semibold text-ink">Hours</p>
                  <p className="mt-1 text-ink-2">Mon-Fri 10am-6pm, Sat 10am-4pm. Sun closed.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <ShieldCheck size={22} weight="duotone" className="mt-0.5 shrink-0 text-accent-text" aria-hidden />
                <div>
                  <p className="font-semibold text-ink">{pricingHeadline.warranty}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{pricingHeadline.payInAdvance}</p>
                </div>
              </li>
            </ul>
            <p className="mt-8 rounded-[var(--radius-field)] bg-surface-2 p-4 text-sm leading-relaxed text-ink-2">{serviceAreaNotice}</p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <BookingForm headingLevel="h2" />
        </div>
      </div>
    </div>
  );
}

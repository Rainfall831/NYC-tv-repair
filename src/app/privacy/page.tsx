import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { business, links } from "@/content/business";
import { bookingNotes } from "@/content/booking-options";
import { paymentInfo } from "@/content/terms";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How NY Tech TV Repair handles the information you give us when you book a repair or pay online.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Privacy", path: "/privacy" }]} title="Privacy" intro={paymentInfo} />
      <section className="container-x section-y">
        <Prose>
          <h2>What we collect</h2>
          <p>
            When you <Link href="/book">book a repair</Link>, we ask for your name, phone numbers, email, street address, borough, ZIP code, TV brand, screen size, model, a description of the problem and a preferred service date. We use this only to schedule and carry out your repair and to contact you about it.
          </p>
          <p>{bookingNotes.privacy}</p>
          <h2>Online payments</h2>
          <p>
            Payments on our <Link href="/pay">pay for repair</Link> page are processed by PayPal. Card details are entered on PayPal and are never sent to or stored by this website. We receive the payment amount and the request ID, ticket number or description you enter.
          </p>
          <h2>Questions</h2>
          <p>
            Call <a href={links.call}>{business.phones.main.display}</a> or email <a href={links.email}>{business.email}</a>.
          </p>
        </Prose>
      </section>
    </>
  );
}

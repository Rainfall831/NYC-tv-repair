import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PayPalForm } from "@/components/pay/PayPalForm";
import { business } from "@/content/business";
import { pricingHeadline } from "@/content/pricing";
import { homeServiceFeeRules } from "@/content/terms";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Pay for Repair",
  description:
    "Pay your home service fee, TV repair ticket or other deposit online. Pay the home service fee in advance and get 10% off the labor.",
  path: "/pay",
});

export default function PayPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Pay for repair", path: "/pay" }]}
        title="Pay for repair"
        intro="Make a payment for a home service fee or a TV repair. We accept all major cards."
      />
      <section aria-label="Payment" className="container-x grid gap-12 section-y lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Suspense fallback={<div className="h-[34rem] animate-pulse rounded-[var(--radius-card)] bg-surface-2" />}>
            <PayPalForm />
          </Suspense>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <h2 className="section-title">Before you pay</h2>
          <ul className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-ink-2">
            <li>{pricingHeadline.homeServiceIncludes}</li>
            <li>{homeServiceFeeRules[4]}</li>
            <li>{homeServiceFeeRules[8]}</li>
            <li>
              Questions? Call {business.phones.main.display} or email {business.email}.
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}

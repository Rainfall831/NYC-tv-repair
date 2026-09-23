import type { Metadata } from "next";
import { CheckCircle } from "@phosphor-icons/react/ssr";
import { CallButton } from "@/components/actions/Actions";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Payment Complete",
  robots: { index: false },
};

export default function PaymentCompletePage() {
  return (
    <section className="container-x section-y">
      <CheckCircle size={56} weight="duotone" className="text-success" aria-hidden />
      <h1 className="mt-4 page-title">Thank you</h1>
      <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-2">
        Your payment was sent. PayPal emails you a receipt. If you have any questions, please feel free to call us. We will be glad to help.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="secondary" size="lg">
          Back to home
        </ButtonLink>
        <CallButton size="lg" />
      </div>
    </section>
  );
}

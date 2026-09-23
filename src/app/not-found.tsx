import Link from "next/link";
import { BookButton, CallButton } from "@/components/actions/Actions";

export default function NotFound() {
  return (
    <section className="container-x section-y">
      <p className="font-mono text-sm text-accent-text">404</p>
      <h1 className="mt-2 page-title">No signal</h1>
      <p className="mt-6 max-w-[48ch] text-lg text-ink-2">
        We could not find that page. It may have moved when we rebuilt the site.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <BookButton size="lg" />
        <CallButton size="lg" />
      </div>
      <p className="mt-10 text-ink-2">
        Or go to the{" "}
        <Link href="/" className="font-semibold text-accent-text underline underline-offset-4">
          home page
        </Link>
        .
      </p>
    </section>
  );
}

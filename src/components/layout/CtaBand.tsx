import { BookButton, CallButton } from "@/components/actions/Actions";

/** Closing call to action for inner pages. */
export function CtaBand({
  title = "Ready when you are",
  body = "Book online in a few minutes, or call and talk to a technician.",
  brand,
}: {
  title?: string;
  body?: string;
  brand?: string;
}) {
  return (
    <section aria-label="Book a repair" className="border-t border-line">
      <div className="container-x flex flex-col gap-4 py-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-title">{title}</p>
          <p className="mt-1 max-w-[48ch] text-[14px] text-ink-2">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <BookButton size="lg" brand={brand} />
          <CallButton size="lg" />
        </div>
      </div>
    </section>
  );
}

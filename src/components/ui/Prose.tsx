import clsx from "clsx";
import type { ReactNode } from "react";

/** Long-form reading column for terms, warranty and privacy text. */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "max-w-[68ch] text-[14px] leading-relaxed text-ink-2",
        "[&_h2]:section-title [&_h2]:mt-8 [&_h2]:mb-2 first:[&_h2]:mt-0",
        "[&_h3]:section-title [&_h3]:mt-6 [&_h3]:mb-1.5",
        "[&_p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:marker:text-accent-text",
        "[&_a]:font-semibold [&_a]:text-accent-text [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:text-ink",
        className,
      )}
    >
      {children}
    </div>
  );
}

import clsx from "clsx";

/** The NY Tech mark: a screen framed by viewfinder corners, set on the cobalt tile. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={clsx("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="40" height="40" rx="4" fill="var(--accent)" />
      <g fill="none" stroke="var(--on-accent)" strokeWidth="3" strokeLinecap="square">
        <path d="M9 15V10h6" />
        <path d="M25 10h6v5" />
        <path d="M31 23v5h-6" />
        <path d="M15 28H9v-5" />
      </g>
      <rect x="15" y="17" width="10" height="6" rx="1" fill="var(--on-accent)" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** "stacked" shows the TV REPAIR, INC. line under the wordmark. */
  variant?: "stacked" | "compact";
  tone?: "default" | "on-navy";
};

export function Logo({ className, variant = "stacked", tone = "default" }: LogoProps) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span
          className={clsx(
            "wordmark text-[1.35rem] uppercase",
            tone === "on-navy" ? "text-on-navy" : "text-ink",
          )}
        >
          NY Tech
        </span>
        {variant === "stacked" && (
          <span
            className={clsx(
              "mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.28em]",
              tone === "on-navy" ? "text-on-navy-2" : "text-ink-2",
            )}
          >
            TV Repair, Inc.
          </span>
        )}
      </span>
      <span className="sr-only">NY Tech TV Repair, Inc.</span>
    </span>
  );
}

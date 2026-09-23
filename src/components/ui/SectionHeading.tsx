import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  eyebrow?: string;
  as?: "h1" | "h2";
  size?: "lg" | "xl";
  tone?: "default" | "on-navy";
  className?: string;
};

/** Headline stacked over an optional short intro. Eyebrows are rationed; pass one only where it earns its place. */
export function SectionHeading({ id, title, intro, eyebrow, as: Tag = "h2", tone = "default", className }: Props) {
  const onNavy = tone === "on-navy";
  return (
    <div className={clsx("max-w-4xl", className)}>
      {eyebrow && (
        <p className={clsx("mb-1.5 text-[14px] font-semibold", onNavy ? "text-on-navy-2" : "text-accent-text")}>{eyebrow}</p>
      )}
      <Tag
        id={id}
        className={clsx("section-title", onNavy && "text-on-navy")}
      >
        {title}
      </Tag>
      {intro && (
        <p className={clsx("mt-2 max-w-[60ch] text-[14px] leading-relaxed", onNavy ? "text-on-navy-2" : "text-ink-2")}>{intro}</p>
      )}
    </div>
  );
}

import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "on-navy" | "on-navy-outline";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] font-semibold transition-[background-color,color,border-color,transform] duration-200 ease-(--ease-out-expo) active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  secondary: "border border-line-strong text-ink hover:border-ink bg-transparent",
  ghost: "text-ink hover:bg-surface-2",
  "on-navy": "bg-on-navy text-navy hover:bg-white/90",
  "on-navy-outline": "border border-on-navy/35 text-on-navy hover:border-on-navy",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-11 px-5 text-[0.95rem]",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return clsx(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href">;

/** Link styled as a button. Uses next/link for internal routes, a plain anchor for tel:, sms:, mailto: and external URLs. */
export function ButtonLink({ href, variant, size, icon, iconRight, className, children, ...rest }: ButtonLinkProps) {
  const cls = buttonClass(variant, size, className);
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {iconRight}
    </>
  );
  const internal = href.startsWith("/") || href.startsWith("#");
  if (internal) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {inner}
    </a>
  );
}

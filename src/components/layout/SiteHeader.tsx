"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowRight, CaretDown, List, Phone, X } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { BookLink } from "@/components/actions/BookLink";
import { buttonClass } from "@/components/ui/Button";
import { business, links } from "@/content/business";
import { primaryNav, servicesMenu } from "@/content/nav";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ServicesMenu({ pathname, onDark }: { pathname: string; onDark: boolean }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const active = servicesMenu.some((i) => isActive(pathname, i.href));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "inline-flex h-10 items-center gap-1 rounded-[4px] px-3.5 text-[0.94rem] font-medium transition-colors",
          onDark
            ? active || open
              ? "text-on-navy"
              : "text-on-navy/90 hover:text-on-navy"
            : active || open
              ? "text-ink"
              : "text-ink-2 hover:text-ink",
        )}
      >
        Services
        <CaretDown size={14} weight="bold" className={clsx("transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-1/2 top-full z-20 mt-3 w-[34rem] -translate-x-1/2 rounded-[var(--radius-card)] border border-line bg-surface p-2 shadow-card"
      >
        <ul className="grid grid-cols-2 gap-1">
          {servicesMenu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className="group block rounded-[4px] px-4 py-3 transition-colors hover:bg-surface-2 aria-[current=page]:bg-accent-soft"
              >
                <span className="flex items-center justify-between font-semibold text-ink">
                  {item.label}
                  <ArrowRight size={14} weight="bold" className="opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </span>
                <span className="mt-0.5 block text-[0.82rem] leading-snug text-ink-2">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileMenu({ pathname, onDark }: { pathname: string; onDark: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close when the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const all = [primaryNav[0], ...servicesMenu, ...primaryNav.slice(1)];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={clsx(
          "inline-flex h-11 w-11 items-center justify-center rounded-[4px] border transition-colors lg:hidden",
          onDark ? "border-on-navy/30 text-on-navy hover:border-on-navy" : "border-line-strong text-ink hover:border-ink",
        )}
      >
        <List size={20} weight="bold" aria-hidden />
        <span className="sr-only">Open menu</span>
      </button>
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label="Site menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-ink backdrop:bg-navy/40 open:flex open:flex-col"
      >
        <div className="container-x flex h-[68px] shrink-0 items-center justify-between border-b border-line">
          <Link href="/" onClick={() => setOpen(false)} aria-label="NY Tech TV Repair home">
            <Logo />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-line-strong"
          >
            <X size={20} weight="bold" aria-hidden />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto py-6">
          <ul className="flex flex-col">
            {all.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="display-tight flex items-center justify-between py-3 text-[1.7rem] text-ink aria-[current=page]:text-accent-text"
                >
                  {item.label}
                  <ArrowRight size={20} weight="bold" className="text-ink-3" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-x grid shrink-0 grid-cols-2 gap-3 border-t border-line py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a href={links.call} className={buttonClass("secondary", "lg", "w-full")}>
            <Phone size={18} weight="bold" aria-hidden />
            Call now
          </a>
          <BookLink onClick={() => setOpen(false)} className={buttonClass("primary", "lg", "w-full")}>
            Book a repair
          </BookLink>
        </div>
      </dialog>
    </>
  );
}

/** Elements marked with this attribute sit behind the header on a dark photo (the home hero). */
const DARK_BACKDROP = "[data-header-dark]";

export function SiteHeader() {
  const pathname = usePathname();
  // Tagged with the pathname it was measured on, so a stale value never carries over to another page.
  const [backdrop, setBackdrop] = useState<{ path: string; dark: boolean }>(() => ({ path: pathname, dark: pathname === "/" }));
  const onDark = backdrop.path === pathname && backdrop.dark;

  // Untinted glass with light text while a dark hero is behind the header; light frosted glass everywhere else.
  useEffect(() => {
    const target = document.querySelector(DARK_BACKDROP);
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setBackdrop({ path: pathname, dark: entry.isIntersecting }), {
      // Watch the top band of the viewport, where the header sits (below the announcement strip at first).
      rootMargin: "0px 0px -90% 0px",
      threshold: 0,
    });
    io.observe(target);
    return () => io.disconnect();
  }, [pathname]);

  const link = clsx(
    "inline-flex h-10 items-center rounded-[4px] px-3.5 text-[0.94rem] font-medium transition-colors",
    onDark
      ? "text-on-navy/90 hover:text-on-navy aria-[current=page]:text-on-navy"
      : "text-ink-2 hover:text-ink aria-[current=page]:text-ink",
  );

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300",
        onDark
          ? "border-white/10 bg-navy/95"
          : "border-line bg-bg",
      )}
    >
      <div className="container-x flex h-[68px] items-center justify-between gap-4">
        <Link href="/" aria-label="NY Tech TV Repair home" className="rounded-[4px]">
          <Logo tone={onDark ? "on-navy" : "default"} />
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={link}>
            Home
          </Link>
          <ServicesMenu pathname={pathname} onDark={onDark} />
          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={link}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle onDark={onDark} />
          <a
            href={links.call}
            className={buttonClass(onDark ? "on-navy-outline" : "secondary", "sm", "max-md:hidden")}
            aria-label={`Call now, ${business.phones.main.display}`}
          >
            <Phone size={16} weight="bold" aria-hidden />
            Call now
          </a>
          <BookLink className={buttonClass("primary", "sm", "max-md:hidden")}>Book a repair</BookLink>
          <MobileMenu pathname={pathname} onDark={onDark} />
        </div>
      </div>
    </header>
  );
}

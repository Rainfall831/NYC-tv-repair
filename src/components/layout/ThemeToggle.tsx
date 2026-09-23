"use client";

import { useSyncExternalStore } from "react";
import clsx from "clsx";
import { Moon, Sun } from "@phosphor-icons/react";

export const THEME_STORAGE_KEY = "nytech-theme";

/**
 * Runs in <head> before first paint: applies a saved "dark" choice so there is no flash.
 * Light is the default; the visitor's OS setting is intentionally ignored.
 */
export const themeInitScript = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

export function ThemeToggle({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const dark = theme === "dark";

  const toggle = () => {
    const next: Theme = dark ? "light" : "dark";
    if (next === "dark") document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the choice then lasts for this page view only.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={clsx(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border transition-colors active:scale-[0.96]",
        onDark ? "border-on-navy/30 text-on-navy hover:border-on-navy" : "border-line-strong text-ink hover:border-ink",
        className,
      )}
    >
      {dark ? <Sun size={17} weight="bold" aria-hidden /> : <Moon size={17} weight="bold" aria-hidden />}
    </button>
  );
}

"use client";

import { useDeferredValue, useId, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import clsx from "clsx";
import { BookLink } from "@/components/actions/BookLink";
import { fieldControl } from "@/components/forms/Field";
import { buttonClass } from "@/components/ui/Button";

const MAX_SHOWN = 300;

type Props = { slug: string; brand: string; preview: string[]; total: number };

export function ModelSearch({ slug, brand, preview, total }: Props) {
  const id = useId();
  const [all, setAll] = useState<string[] | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);

  const load = async () => {
    if (all || state === "loading") return;
    setState("loading");
    try {
      const res = await fetch(`/data/models/${slug}.json`);
      if (!res.ok) throw new Error(String(res.status));
      setAll((await res.json()) as string[]);
      setState("idle");
    } catch {
      setState("error");
    }
  };

  const source = all ?? preview;
  const q = deferred.trim().toLowerCase().replace(/[\s-]/g, "");
  const matches = q ? source.filter((m) => m.toLowerCase().replace(/[\s-]/g, "").includes(q)) : source;
  const shown = matches.slice(0, MAX_SHOWN);
  const searchingPreviewOnly = q.length > 0 && !all;

  return (
    <div>
      <label htmlFor={id} className="text-[0.92rem] font-semibold text-ink">
        Search {total.toLocaleString()} {brand} models
      </label>
      <div className="relative mt-2 max-w-md">
        <MagnifyingGlass size={18} weight="bold" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden />
        <input
          id={id}
          type="search"
          value={query}
          onFocus={load}
          onChange={(e) => {
            setQuery(e.target.value);
            load();
          }}
          placeholder="Type a model number"
          autoComplete="off"
          aria-describedby={`${id}-status`}
          className={clsx(fieldControl, "h-9 pl-11 font-mono uppercase placeholder:normal-case placeholder:font-sans")}
        />
      </div>

      <p id={`${id}-status`} aria-live="polite" className="mt-4 text-sm text-ink-2">
        {state === "loading" && "Loading all models..."}
        {state === "error" && "Could not load the full model list. Showing a preview."}
        {state === "idle" &&
          (q
            ? `${matches.length.toLocaleString()} ${matches.length === 1 ? "match" : "matches"}${matches.length > MAX_SHOWN ? `, showing the first ${MAX_SHOWN}` : ""}.`
            : all
              ? `Showing ${shown.length.toLocaleString()} of ${all.length.toLocaleString()} models.`
              : `Showing ${preview.length} of ${total.toLocaleString()} models.`)}
      </p>

      {state === "loading" ? (
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6" aria-hidden>
          {Array.from({ length: 18 }).map((_, i) => (
            <li key={i} className="h-9 animate-pulse rounded-[4px] bg-surface-2" />
          ))}
        </ul>
      ) : shown.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-2 font-mono text-sm sm:grid-cols-4 lg:grid-cols-6">
          {shown.map((m) => (
            <li key={m} className="truncate rounded-[4px] bg-surface-2 px-3 py-2 text-ink" title={m}>
              {m}
            </li>
          ))}
        </ul>
      ) : (
        !searchingPreviewOnly && (
          <div className="mt-4 rounded-[var(--radius-card)] border border-dashed border-line-strong p-6">
            <p className="font-semibold text-ink">No listed model matches &ldquo;{query}&rdquo;.</p>
            <p className="mt-1 text-ink-2">
              We repair all major brands and models. Book a repair and enter your model number, or call us.
            </p>
            <BookLink brand={slug} className={buttonClass("primary", "sm", "mt-4")}>
              Book a repair
            </BookLink>
          </div>
        )
      )}

      {!all && !q && total > preview.length && state !== "loading" && (
        <button type="button" onClick={load} className={buttonClass("secondary", "md", "mt-6")}>
          Show all {total.toLocaleString()} models
        </button>
      )}
    </div>
  );
}

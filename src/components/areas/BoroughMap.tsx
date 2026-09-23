"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { ArrowRight } from "@phosphor-icons/react";
import { BOROUGH_PATHS, MAP_VIEWBOX } from "@/content/borough-paths.generated";
import { BOROUGHS, type Borough } from "@/content/business";
import { BOROUGH_SLUGS, BOROUGH_ZIPS } from "@/content/zips";
import { ZipChecker } from "./ZipChecker";

// Nudge labels off the centroid where the shapes are narrow.
const LABEL_OFFSET: Partial<Record<Borough, [number, number]>> = {
  "Staten Island": [0, 10],
};

export function BoroughMap() {
  const [active, setActive] = useState<Borough>("Brooklyn");

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <svg
          viewBox={MAP_VIEWBOX}
          className="h-auto w-full"
          role="img"
          aria-labelledby="nyc-map-title"
        >
          <title id="nyc-map-title">Map of the five New York City boroughs we service</title>
          {BOROUGH_PATHS.map((b) => {
            const isActive = b.name === active;
            return (
              <path
                key={b.slug}
                d={b.d}
                fillRule="evenodd"
                onPointerEnter={() => setActive(b.name as Borough)}
                onClick={() => setActive(b.name as Borough)}
                className={clsx(
                  "cursor-pointer stroke-bg transition-[fill] duration-300",
                  isActive ? "fill-accent" : "fill-line-strong hover:fill-ink-3",
                )}
                strokeWidth={2}
              />
            );
          })}
          {BOROUGH_PATHS.map((b) => {
            const [dx, dy] = LABEL_OFFSET[b.name as Borough] ?? [0, 0];
            const isActive = b.name === active;
            return (
              <text
                key={`${b.slug}-label`}
                x={b.label[0] + dx}
                y={b.label[1] + dy}
                textAnchor="middle"
                className={clsx(
                  "pointer-events-none select-none font-sans text-[20px] font-semibold [paint-order:stroke] [stroke-linejoin:round]",
                  isActive ? "fill-on-accent stroke-accent" : "fill-ink stroke-bg",
                )}
                strokeWidth={5}
                aria-hidden
              >
                {b.name}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-col lg:col-span-5">
        <div role="group" aria-label="Choose a borough" className="flex flex-wrap gap-2">
          {BOROUGHS.map((b) => (
            <button
              key={b}
              type="button"
              aria-pressed={b === active}
              onClick={() => setActive(b)}
              className={clsx(
                "h-10 rounded-[4px] border px-4 text-sm font-semibold transition-colors",
                b === active ? "border-accent bg-accent text-on-accent" : "border-line-strong text-ink hover:border-ink",
              )}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="mt-8 border-t border-line pt-8" aria-live="polite">
          <p className="section-title">{active}</p>
          <p className="mt-3 text-ink-2">
            In-home TV repair across {active}, with pickup and delivery to our service center when a repair needs the bench.
            Residential ZIP codes include {BOROUGH_ZIPS[active].slice(0, 6).join(", ")} and more.
          </p>
          <Link
            href={`/service-areas/${BOROUGH_SLUGS[active]}`}
            className="mt-5 inline-flex items-center gap-2 font-semibold text-accent-text underline decoration-accent-text/30 underline-offset-[6px] hover:decoration-accent-text"
          >
            TV repair in {active}
            <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 lg:mt-auto">
          <ZipChecker onBorough={(b) => b && setActive(b as Borough)} />
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { MapPin, ShieldCheck } from "@phosphor-icons/react/ssr";
import { BookSection } from "@/components/home/BookSection";
import { BOROUGHS } from "@/content/business";
import heroImg from "@/assets/images/hero-landing.jpg";

/** Shared width for the hero booking card and boroughs/warranty strip. */
export const heroPanelWidth = "w-[calc(100%-90px)] max-w-[48rem] min-w-0";

/**
 * Full-bleed hero on the landing photo (TV with its back panel open on the right).
 * Copy sits on the open left side of the frame.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      // Pulled up by the header height (68px + 1px border) so the photo runs behind the translucent header.
      // Min height matches the full portrait (plus the 40px downward shift) so the photo is not cropped.
      className="relative isolate -mt-[69px] bg-navy text-on-navy"
      style={{ minHeight: `calc(100vw * ${heroImg.height} / ${heroImg.width} + 40px)` }}
      data-header-dark
    >
      <Image
        src={heroImg}
        alt=""
        priority
        sizes="100vw"
        placeholder="blur"
        className="enter-image pointer-events-none absolute inset-x-0 top-10 -z-20 h-auto w-full max-w-none"
      />

      <div className="container-x relative flex flex-col gap-8 pt-[calc(69px+2rem+30px)] pb-8">
        <h1 id="hero-title" className="display whitespace-nowrap text-[50px] uppercase text-on-navy [text-shadow:0_1px_2px_rgb(0_0_0/0.9),0_6px_28px_rgb(0_0_0/0.75)]">
          <span className="enter" style={{ ["--d" as string]: "40ms" }}>
            TV repair.
          </span>{" "}
          <span className="enter text-accent-on-dark" style={{ ["--d" as string]: "140ms" }}>
            Done right.
          </span>
        </h1>
        <div className="flex flex-col gap-3">
          <BookSection embedded panelClassName={heroPanelWidth} />

          <div
            className={`enter book-dark ${heroPanelWidth} rounded-[var(--radius-card)] border border-white/30 bg-surface/92 px-4 py-3 shadow-card`}
            style={{ ["--d" as string]: "420ms" }}
          >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <MapPin size={22} weight="duotone" className="mt-0.5 shrink-0 text-accent-text" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-ink">All five boroughs</p>
                <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-ink-2" aria-label="Boroughs served">
                  {BOROUGHS.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-3">
              <ShieldCheck size={22} weight="duotone" className="mt-0.5 shrink-0 text-accent-text" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-ink">Warranty on every repair</p>
                <p className="mt-1 text-sm text-ink-2">30-day labor and 90-day parts</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

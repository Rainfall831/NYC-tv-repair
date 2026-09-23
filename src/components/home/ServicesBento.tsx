import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { appliancePricing } from "@/content/pricing";
import kitchen from "@/assets/images/kitchen.jpg";

export function ServicesBento() {
  return (
    <section aria-label="Appliance repair" className="container-x defer-section section-y">
      <ul>
        <li className="reveal">
          <Link
            href="/appliance-repair"
            className="group grid overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface md:grid-cols-12"
          >
            <div className="relative h-32 md:col-span-5 md:h-auto">
              <Image
                src={kitchen}
                alt="A kitchen with a stainless steel refrigerator, range and microwave"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-2 p-4 md:col-span-7">
              <div className="flex items-start justify-between gap-3">
                <h3 className="section-title">Appliance repair</h3>
                <ArrowUpRight size={22} weight="bold" className="mt-1 shrink-0 text-ink-3 transition-colors group-hover:text-accent-text" aria-hidden />
              </div>
              <p className="max-w-[52ch] text-ink-2">
                Refrigerators, washers, dryers, ranges, dishwashers and more, repaired in your home.
              </p>
              <p className="font-mono text-[14px] text-ink">
                Flat labor from <span className="font-semibold text-accent-text">${appliancePricing.laborFrom}</span> and up
              </p>
            </div>
          </Link>
        </li>
      </ul>
    </section>
  );
}

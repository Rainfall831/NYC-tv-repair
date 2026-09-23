import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { announcement } from "@/content/offers";

export function AnnouncementBar() {
  return (
    <Link
      href="/special-offers"
      className="group block bg-success text-on-accent transition-colors duration-200 hover:bg-[#15965c]"
    >
      <span className="container-x flex min-h-10 items-center justify-center gap-x-6 gap-y-0.5 py-2 text-center text-[0.8rem] font-medium sm:text-[0.85rem]">
        <span className="flex flex-col gap-x-6 sm:flex-row">
          <span className="transition-colors group-hover:text-white">{announcement[0]}</span>
          <span className="hidden text-on-accent/80 transition-colors group-hover:text-white md:inline">{announcement[1]}</span>
        </span>
        <ArrowRight size={14} weight="bold" className="shrink-0 transition-[transform,opacity] duration-200 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden />
        <span className="sr-only">See special offers</span>
      </span>
    </Link>
  );
}

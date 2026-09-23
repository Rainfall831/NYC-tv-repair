import { Phone } from "@phosphor-icons/react/ssr";
import { BookLink } from "@/components/actions/BookLink";
import { buttonClass } from "@/components/ui/Button";
import { links } from "@/content/business";

/** Sticky Call / Book bar for phones. Hidden from md up, where the header carries both actions. */
export function MobileCallBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg md:hidden">
      <div className="grid grid-cols-2 gap-2.5 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a href={links.call} className={buttonClass("secondary", "md", "w-full")}>
          <Phone size={18} weight="bold" aria-hidden />
          Call
        </a>
        <BookLink className={buttonClass("primary", "md", "w-full")}>Book</BookLink>
      </div>
    </div>
  );
}

import clsx from "clsx";
import { brandIconMarkup } from "./brand-icon-markup";

/**
 * Brand marks. Fujitsu, GE, Hitachi, LG, Mitsubishi, Panasonic, Samsung, Sony, and Toshiba
 * use the CC0 Simple Icons paths. The other brands use an original wordmark, because no
 * freely licensed logo SVG exists for them.
 */
export function BrandLogo({
  slug,
  name,
  large = false,
  className,
}: {
  slug: string;
  name: string;
  large?: boolean;
  className?: string;
}) {
  const markup = brandIconMarkup[slug];
  if (markup) {
    const wide = slug === "hitachi" || slug === "panasonic" || slug === "samsung" || slug === "sony" || slug === "toshiba";
    const viewBox =
      slug === "fujitsu"
        ? "0 3 24 18"
        : slug === "hitachi"
          ? "0 10 24 4"
          : slug === "lg"
            ? "0 6.5 24 11"
            : slug === "mitsubishi"
              ? "0 1.5 24 21"
              : slug === "panasonic" || slug === "samsung" || slug === "toshiba"
                ? "0 10 24 4"
                : slug === "sony"
                  ? "0 9.7 24 4.6"
                  : "0 0 24 24";
    return (
      <svg
        viewBox={viewBox}
        role="img"
        aria-hidden
        className={clsx(
          "fill-current text-ink-2 transition-colors group-hover:text-ink",
          large
            ? wide
              ? "h-auto w-full max-w-[18rem]"
              : "h-24 w-auto"
            : wide
              ? "h-6 w-auto max-w-[92%]"
              : "h-9 w-auto",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    );
  }

  const size = name.length > 9 ? 18 : name.length > 6 ? 22 : 28;
  return (
    <svg
      viewBox="0 0 160 40"
      role="img"
      aria-hidden
      className={clsx(
        "text-ink-2 transition-colors group-hover:text-ink",
        large ? "h-16 w-full max-w-[16rem]" : "h-8 w-[7.2rem]",
        className,
      )}
    >
      <text
        x="80"
        y="28"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-manrope), Manrope, sans-serif"
        fontWeight={700}
        fontSize={size}
      >
        {name}
      </text>
    </svg>
  );
}

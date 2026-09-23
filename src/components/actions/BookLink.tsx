"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * Link to the booking form. On the home page it jumps to the in-page form (#book);
 * everywhere else it opens /book. `brand` pre-fills the brand field.
 */
export function BookLink({ brand, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { brand?: string }) {
  const pathname = usePathname();
  const query = brand ? `?brand=${encodeURIComponent(brand)}` : "";
  const href = pathname === "/" && !brand ? "#book" : `/book${query}`;
  return <Link href={href} {...props} />;
}

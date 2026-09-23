import type { Metadata } from "next";

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/og.jpg",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: [{ url: image, width: 1200, height: 630 }],
    },
  };
}

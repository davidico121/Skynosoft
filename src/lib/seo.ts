import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/content";

export const DEFAULT_OG_IMAGE = {
  url: "/brand/og-default.png",
  width: 1200,
  height: 630,
  alt: "Skynosoft: websites that convert, email that brings customers back",
};

/** Page metadata with matching canonical, Open Graph and Twitter tags, so shared links preview correctly. */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

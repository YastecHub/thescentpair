import type { Metadata } from "next";

const siteUrl = "https://www.thescentpair.com";

export function createPageMetadata({
  title,
  description,
  path,
  ogImage = "/brand/logo-lockup.png",
  type = "website",
}: Readonly<{
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
}>): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

import type { Metadata } from "next";

const siteUrl = "https://www.thescentpair.com";
const title = "His & Her's Scents - Signature Scents, Made for Two";
const description =
  "A cinematic fragrance house for paired signature scents, crafted for two people to share one scent experience.";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "His & Her's Scents",
  keywords: [
    "His and Her's Scents",
    "paired fragrances",
    "couples perfume",
    "luxury fragrance Nigeria",
    "signature scents",
  ],
  authors: [{ name: "His & Her's Scents", url: siteUrl }],
  creator: "His & Her's Scents",
  publisher: "His & Her's Scents",
  title: {
    default: title,
    template: "%s | His & Her's Scents",
  },
  description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "His & Her's Scents",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

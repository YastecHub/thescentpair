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
    images: [
      {
        url: "/brand/logo-lockup.png",
        width: 914,
        height: 914,
        alt: "His & Her's Scents signature perfume house",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/logo-lockup.png"],
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

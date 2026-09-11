import type { Metadata } from "next";

const siteUrl = "https://thescentpair.com";
const title = "His & Her's Scents - Signature Scents, Made for Two";
const description =
  "A cinematic fragrance house for paired signature scents, crafted for two people to share one scent experience.";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | His & Her's Scents",
  },
  description,
  applicationName: "His & Her's Scents",
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
  },
};

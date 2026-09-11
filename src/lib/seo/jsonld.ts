/**
 * JSON-LD Structured Data Generators for Rich Snippets (Schema.org)
 * Implements Organization, Product, and Offer schemas for His & Her's Scents.
 */

import type { Fragrance, Pair } from "@/lib/content/schemas";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "His & Her's Scents",
    url: "https://www.thescentpair.com",
    logo: "https://www.thescentpair.com/brand/logo.png",
    description:
      "Signature scents, made for two. Cinematic luxury fragrance house built around paired identities.",
    sameAs: [
      "https://www.instagram.com/the_sent_pair",
      "https://tiktok.com/@thescentpair",
      "https://x.com/thescentpair",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+2349162773137",
      email: "thescentpair@gmail.com",
      availableLanguage: ["English"],
    },
  };
}

export function getProductJsonLd(fragrance: Fragrance) {
  const minPrice = Math.min(...fragrance.variants.map((v) => v.price));
  const maxPrice = Math.max(...fragrance.variants.map((v) => v.price));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: fragrance.name,
    description: fragrance.description,
    image: `https://www.thescentpair.com/brand/logo.png`,
    brand: {
      "@type": "Brand",
      name: "His & Her's Scents",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: fragrance.variants[0]?.currency || "NGN",
      lowPrice: minPrice,
      highPrice: maxPrice,
      offerCount: fragrance.variants.length,
      availability: fragrance.variants.some((v) => v.inStock)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://www.thescentpair.com/fragrance/${fragrance.slug}`,
    },
  };
}

export function getPairJsonLd(pair: Pair) {
  const minPrice = Math.min(...pair.setVariants.map((v) => v.price));
  const maxPrice = Math.max(...pair.setVariants.map((v) => v.price));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pair.name,
    description: pair.story,
    image: `https://www.thescentpair.com/brand/logo.png`,
    brand: {
      "@type": "Brand",
      name: "His & Her's Scents",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: pair.setVariants[0]?.currency || "NGN",
      lowPrice: minPrice,
      highPrice: maxPrice,
      offerCount: pair.setVariants.length,
      availability: pair.setVariants.some((v) => v.inStock)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://www.thescentpair.com/pairs/${pair.slug}`,
    },
  };
}

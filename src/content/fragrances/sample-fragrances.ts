import { fragranceSchema, type Fragrance } from "@/lib/content/schemas";
import { parseContentCollection } from "@/lib/content/validation";

const demoFragrances = [
  {
    slug: "midnight-oath",
    name: "Midnight Oath",
    audience: "his",
    pairId: "the-first-night",
    family: "woody-oriental",
    tagline: "Smoke, oud and a promise kept close.",
    description:
      "Demonstration fragrance content for proving the content model. Replace before launch with client-approved copy and pricing.",
    notes: {
      top: ["bergamot", "pink-pepper"],
      heart: ["oud", "amber"],
      base: ["musk"],
    },
    performance: { longevity: 4, sillage: 3, projection: 4 },
    variants: [
      {
        sku: "MO-50",
        size: 50,
        unit: "ml",
        price: 45000,
        currency: "NGN",
        inStock: true,
      },
      {
        sku: "MO-100",
        size: 100,
        unit: "ml",
        price: 72000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "hhs/fragrance/midnight-oath/hero-dark",
      heroLight: "hhs/fragrance/midnight-oath/hero-light",
      gallery: [
        "hhs/fragrance/midnight-oath/detail-cap",
        "hhs/fragrance/midnight-oath/detail-label",
      ],
      turntable: {
        publicIdBase: "hhs/turntable/midnight-oath/frame",
        frameCount: 36,
        startIndex: 1,
        pad: 3,
      },
    },
    seo: {
      title: "Midnight Oath Eau de Parfum",
      description:
        "Demonstration metadata for a His fragrance in the His & Her's Scents foundation.",
      ogImage: "hhs/og/midnight-oath",
    },
    featured: true,
    order: 10,
  },
  {
    slug: "velvet-vow",
    name: "Velvet Vow",
    audience: "hers",
    pairId: "the-first-night",
    family: "floral-amber",
    tagline: "Rose, amber and the warmth after dusk.",
    description:
      "Demonstration companion fragrance content for validating pair relationships and shared accord logic.",
    notes: {
      top: ["bergamot"],
      heart: ["rose", "amber"],
      base: ["musk"],
    },
    performance: { longevity: 4, sillage: 4, projection: 3 },
    variants: [
      {
        sku: "VV-50",
        size: 50,
        unit: "ml",
        price: 45000,
        currency: "NGN",
        inStock: true,
      },
      {
        sku: "VV-100",
        size: 100,
        unit: "ml",
        price: 72000,
        currency: "NGN",
        inStock: false,
      },
    ],
    media: {
      heroDark: "hhs/fragrance/velvet-vow/hero-dark",
      heroLight: "hhs/fragrance/velvet-vow/hero-light",
      gallery: [
        "hhs/fragrance/velvet-vow/detail-cap",
        "hhs/fragrance/velvet-vow/detail-label",
      ],
      turntable: {
        publicIdBase: "hhs/turntable/velvet-vow/frame",
        frameCount: 36,
        startIndex: 1,
        pad: 3,
      },
    },
    seo: {
      title: "Velvet Vow Eau de Parfum",
      description:
        "Demonstration metadata for a Her's fragrance in the His & Her's Scents foundation.",
      ogImage: "hhs/og/velvet-vow",
    },
    featured: true,
    order: 20,
  },
  {
    slug: "amber-room",
    name: "Amber Room",
    audience: "unisex",
    family: "warm-spiced",
    tagline: "A shared room of gold, skin and memory.",
    description:
      "Demonstration unisex fragrance content used to exercise collection filtering without inventing a full catalogue.",
    notes: {
      top: ["pink-pepper"],
      heart: ["rose", "oud"],
      base: ["amber", "musk"],
    },
    performance: { longevity: 5, sillage: 3, projection: 3 },
    variants: [
      {
        sku: "AR-50",
        size: 50,
        unit: "ml",
        price: 48000,
        currency: "NGN",
        inStock: true,
      },
      {
        sku: "AR-100",
        size: 100,
        unit: "ml",
        price: 76000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "hhs/fragrance/amber-room/hero-dark",
      heroLight: "hhs/fragrance/amber-room/hero-light",
      gallery: ["hhs/fragrance/amber-room/detail-cap"],
    },
    seo: {
      title: "Amber Room Eau de Parfum",
      description:
        "Demonstration metadata for a unisex fragrance in the His & Her's Scents foundation.",
      ogImage: "hhs/og/amber-room",
    },
    featured: false,
    order: 30,
  },
] satisfies Fragrance[];

export const fragrances = parseContentCollection(
  fragranceSchema,
  demoFragrances,
  "fragrances",
);

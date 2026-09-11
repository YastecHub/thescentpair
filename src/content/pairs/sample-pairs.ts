import { pairSchema, type Pair } from "@/lib/content/schemas";
import { parseContentCollection } from "@/lib/content/validation";

const demoPairs = [
  {
    slug: "the-first-night",
    name: "The First Night",
    story:
      "Demonstration pair content for the shared signature concept: one darker, one warmer, both joined by amber and musk.",
    hisFragranceSlug: "midnight-oath",
    hersFragranceSlug: "velvet-vow",
    sharedAccords: ["amber", "musk"],
    setVariants: [
      {
        sku: "TFN-SET-50",
        contents: ["MO-50", "VV-50"],
        price: 82000,
        currency: "NGN",
        inStock: true,
      },
      {
        sku: "TFN-SET-100",
        contents: ["MO-100", "VV-100"],
        price: 132000,
        currency: "NGN",
        inStock: false,
      },
    ],
    media: {
      heroPair: "hhs/pairs/the-first-night/hero",
      hisWorld: "hhs/pairs/the-first-night/his",
      hersWorld: "hhs/pairs/the-first-night/hers",
    },
    seo: {
      title: "The First Night His and Her's Pair",
      description:
        "Demonstration metadata for a paired fragrance set in the His & Her's Scents foundation.",
      ogImage: "hhs/og/the-first-night",
    },
  },
] satisfies Pair[];

export const pairs = parseContentCollection(pairSchema, demoPairs, "pairs");

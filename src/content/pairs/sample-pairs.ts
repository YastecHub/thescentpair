import { pairSchema, type Pair } from "@/lib/content/schemas";
import { parseContentCollection } from "@/lib/content/validation";

const demoPairs = [
  {
    slug: "the-first-night",
    name: "The First Night",
    story:
      "Two people. Two signatures. One thread of amber and musk that runs between them. Midnight Oath is darker, more resinous — the kind of scent that lingers on a collar. Velvet Vow is warmer, closer to the skin. Together they tell the same story from two different sides.",
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
        "Two signatures designed to be worn together. Midnight Oath and Velvet Vow share a base of amber and musk, keeping their own character while remaining unmistakably a pair.",
      ogImage: "hhs/og/the-first-night",
    },
  },
] satisfies Pair[];

export const pairs = parseContentCollection(pairSchema, demoPairs, "pairs");

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
      "Midnight Oath opens with an incisive burst of bergamot and pink pepper before settling into a heart of rich oud and smoked amber. The base is a clean, commanding musk that lingers with quiet authority. A fragrance for the man who says more by saying less.",
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
        inStock: false,
      },
      {
        sku: "MO-100",
        size: 100,
        unit: "ml",
        price: 72000,
        currency: "NGN",
        inStock: false,
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
        "Smoke, oud and a promise kept close. Midnight Oath is a woody oriental fragrance built for presence — bergamot and pink pepper over rich oud and musk.",
      ogImage: "hhs/og/midnight-oath",
    },
    featured: true,
    order: 100,
  },
  {
    slug: "velvet-vow",
    name: "Velvet Vow",
    audience: "hers",
    pairId: "the-first-night",
    family: "floral-amber",
    tagline: "Rose, amber and the warmth after dusk.",
    description:
      "Velvet Vow opens with a breath of bergamot before unfolding into a warm heart of rose and amber. The musk base softens everything it touches, leaving a fragrance that is both present and intimate — something to be noticed close.",
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
        inStock: false,
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
        "Rose, amber and the warmth after dusk. Velvet Vow is a floral amber fragrance built for intimacy — bergamot and rose over a lingering musk base.",
      ogImage: "hhs/og/velvet-vow",
    },
    featured: true,
    order: 110,
  },
  {
    slug: "amber-room",
    name: "Amber Room",
    audience: "unisex",
    family: "warm-spiced",
    tagline: "A shared room of gold, skin and memory.",
    description:
      "Amber Room opens with a sharp pink pepper before giving way to a heart of rose and oud — two notes that rarely agree but find something true together here. The base of amber and musk settles into a warmth that belongs equally to anyone who wears it.",
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
        inStock: false,
      },
      {
        sku: "AR-100",
        size: 100,
        unit: "ml",
        price: 76000,
        currency: "NGN",
        inStock: false,
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
        "A shared room of gold, skin and memory. Amber Room is a warm, unisex fragrance — pink pepper and oud over a deep amber and musk base.",
      ogImage: "hhs/og/amber-room",
    },
    featured: false,
    order: 120,
  },
  {
    slug: "club-de-nuit-intense-man",
    name: "Club de Nuit Intense Man",
    audience: "his",
    family: "woody-spicy",
    tagline: "A sharp citrus fruity burst settling into a smoky floral heart and warm musky base.",
    description:
      "A bold, woody spicy fragrance that opens with a sharp citrus fruity burst, settles into a smoky floral heart, and finishes with a warm, musky base. Confident and long lasting built for the man who commands attention.",
    notes: {
      top: ["lemon", "pineapple", "blackcurrant", "apple", "bergamot"],
      heart: ["birch", "jasmine", "rose"],
      base: ["ambergris", "musk", "patchouli", "vanilla"],
    },
    performance: { longevity: 5, sillage: 5, projection: 4 },
    variants: [
      {
        sku: "CDNIM-105",
        size: 105,
        unit: "ml",
        price: 65000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "thescentpair/products/club-de-nuit-intense-man",
      heroLight: "thescentpair/products/club-de-nuit-intense-man",
      gallery: ["thescentpair/products/club-de-nuit-intense-man"],
    },
    seo: {
      title: "Club de Nuit Intense Man Eau de Parfum",
      description:
        "A bold, woody spicy fragrance that opens with sharp citrus and settles into smoky birch and musk. 105ml.",
      ogImage: "thescentpair/products/club-de-nuit-intense-man",
    },
    featured: false,
    order: 10,
  },
  {
    slug: "afnan-9-pm",
    name: "Afnan 9 PM",
    audience: "his",
    family: "amber-vanilla",
    tagline: "Fresh bergamot and cinnamon opening into warm orange blossom and a rich, spicy amber base.",
    description:
      "An amber vanilla fragrance built for evening wear. Fresh bergamot and cinnamon open into warm orange blossom, settling into a rich, spicy amber base confident and memorable after dark.",
    notes: {
      top: ["apple", "cinnamon", "lavender", "bergamot"],
      heart: ["orange-blossom"],
      base: ["vanilla", "tonka-bean", "amber", "patchouli"],
    },
    performance: { longevity: 5, sillage: 4, projection: 4 },
    variants: [
      {
        sku: "A9PM-100",
        size: 100,
        unit: "ml",
        price: 10000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "thescentpair/products/afnan-9-pm",
      heroLight: "thescentpair/products/afnan-9-pm",
      gallery: ["thescentpair/products/afnan-9-pm"],
    },
    seo: {
      title: "Afnan 9 PM Eau de Parfum",
      description:
        "An amber vanilla fragrance built for evening wear. Fresh bergamot and cinnamon over rich amber. 100ml.",
      ogImage: "thescentpair/products/afnan-9-pm",
    },
    featured: false,
    order: 20,
  },
  {
    slug: "riggs-london",
    name: "Riggs London",
    audience: "his",
    family: "amber-vanilla",
    tagline: "Warm orange blossom and cinnamon settling into a rich, spicy amber base.",
    description:
      "An amber vanilla fragrance built for evening wear. Fresh bergamot and cinnamon open into warm orange blossom, settling into a rich, spicy amber base confident and memorable after dark.",
    notes: {
      top: ["bergamot", "cinnamon"],
      heart: ["orange-blossom"],
      base: ["amber", "vanilla"],
    },
    performance: { longevity: 4, sillage: 3, projection: 3 },
    variants: [
      {
        sku: "RIGGS-100",
        size: 100,
        unit: "ml",
        price: 10000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "thescentpair/products/riggs-london",
      heroLight: "thescentpair/products/riggs-london",
      gallery: ["thescentpair/products/riggs-london"],
    },
    seo: {
      title: "Riggs London Fragrance",
      description:
        "An amber vanilla fragrance built for evening wear. Bergamot, cinnamon, and warm orange blossom. 100ml.",
      ogImage: "thescentpair/products/riggs-london",
    },
    featured: false,
    order: 30,
  },
  {
    slug: "rave-now-men",
    name: "Rave NOW (Men)",
    audience: "his",
    family: "woody-aromatic",
    tagline: "Fruity top notes giving way to a floral, smoky heart and a warm, musky base.",
    description:
      "A woody aromatic fragrance built for presence. Fruity top notes give way to a floral, smoky heart, settling into a warm, musky base bold and confident for the man who stands out.",
    notes: {
      top: ["pineapple", "blackcurrant", "apple", "bergamot"],
      heart: ["birch", "jasmine", "patchouli"],
      base: ["ambergris", "musk", "oakmoss", "vanilla"],
    },
    performance: { longevity: 5, sillage: 4, projection: 4 },
    variants: [
      {
        sku: "RN-100",
        size: 100,
        unit: "ml",
        price: 45000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "thescentpair/products/rave-now-men",
      heroLight: "thescentpair/products/rave-now-men",
      gallery: ["thescentpair/products/rave-now-men"],
    },
    seo: {
      title: "Rave NOW (Men) Eau de Parfum",
      description:
        "A woody aromatic fragrance built for presence. Fruity pineapple, smoky birch and warm musk. 100ml.",
      ogImage: "thescentpair/products/rave-now-men",
    },
    featured: false,
    order: 40,
  },
  {
    slug: "naseem-perfume-oils",
    name: "Naseem Perfume Oils",
    audience: "unisex",
    family: "oriental-amber",
    tagline: "A curated selection of premium alcohol-free concentrated perfume oils.",
    description:
      "A curated selection of premium perfume oils, offering a range of scents from sweet and fruity to rich and woody. Alcohol free and long lasting, suited for everyday wear or special occasions. Over 15 varieties available, including Be Sugar, Golden Woods, Amani, Mukhallat, Mufaddal, Oud Bushra, Lamsa, Jazi, Red Coral, Burhan, Romeo, Bushra, and Jazeelah.",
    notes: {
      top: ["sweet-orange", "saffron"],
      heart: ["rose", "jasmine", "praline"],
      base: ["oud", "amber", "cedarwood", "musk"],
    },
    performance: { longevity: 5, sillage: 4, projection: 4 },
    variants: [
      {
        sku: "NAS-24",
        size: 24,
        unit: "ml",
        price: 5000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "thescentpair/products/naseem-perfume-oils",
      heroLight: "thescentpair/products/naseem-perfume-oils",
      gallery: ["thescentpair/products/naseem-perfume-oils"],
    },
    seo: {
      title: "Naseem Concentrated Perfume Oils (Roll-On)",
      description:
        "Alcohol-free premium perfume oils in over 15 varieties. Long lasting roll-on bottle (24ml).",
      ogImage: "thescentpair/products/naseem-perfume-oils",
    },
    featured: false,
    order: 50,
  },
  {
    slug: "lattafa-hayaati",
    name: "Lattafa Hayaati",
    audience: "his",
    family: "woody-aromatic",
    tagline: "Crisp apple and bergamot opening into a spiced heart and warm ambergris base.",
    description:
      "A fresh, woody aromatic fragrance built for commanding presence. Crisp apple and zesty bergamot open with vibrant energy, evolving into a spiced heart of cinnamon, lavender, and cardamom, before settling into a warm, lingering base of vanilla, cedarwood, and ambergris.",
    notes: {
      top: ["apple", "bergamot", "cinnamon"],
      heart: ["lavender", "cardamom"],
      base: ["vanilla", "ambergris", "cedarwood", "musk"],
    },
    performance: { longevity: 5, sillage: 4, projection: 4 },
    variants: [
      {
        sku: "LH-100",
        size: 100,
        unit: "ml",
        price: 25000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "thescentpair/products/lattafa-hayaati",
      heroLight: "thescentpair/products/lattafa-hayaati",
      gallery: ["thescentpair/products/lattafa-hayaati"],
    },
    seo: {
      title: "Lattafa Hayaati Eau de Parfum",
      description:
        "A fresh, woody aromatic fragrance with apple, bergamot, spiced cardamom, and warm ambergris. 100ml in Nigeria.",
      ogImage: "thescentpair/products/lattafa-hayaati",
    },
    featured: false,
    order: 60,
  },
] satisfies Fragrance[];

export const fragrances = parseContentCollection(
  fragranceSchema,
  demoFragrances,
  "fragrances",
);

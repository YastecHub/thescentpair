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
        "Smoke, oud and a promise kept close. Midnight Oath is a woody oriental fragrance built for presence â€” bergamot and pink pepper over rich oud and musk.",
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
      "Velvet Vow opens with a breath of bergamot before unfolding into a warm heart of rose and amber. The musk base softens everything it touches, leaving a fragrance that is both present and intimate â€” something to be noticed close.",
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
        "Rose, amber and the warmth after dusk. Velvet Vow is a floral amber fragrance built for intimacy â€” bergamot and rose over a lingering musk base.",
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
      "Amber Room opens with a sharp pink pepper before giving way to a heart of rose and oud â€” two notes that rarely agree but find something true together here. The base of amber and musk settles into a warmth that belongs equally to anyone who wears it.",
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
        "A shared room of gold, skin and memory. Amber Room is a warm, unisex fragrance â€” pink pepper and oud over a deep amber and musk base.",
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
        price: 18000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "/products/naseem.png",
      heroLight: "/products/naseem.png",
      gallery: [
        "/products/naseem.png",
        "/brand/products/naseem-perfume-oils.jpg",
      ],
    },
    seo: {
      title: "Naseem Concentrated Perfume Oils (Roll-On)",
      description:
        "Alcohol-free premium perfume oils in over 15 varieties. Long lasting roll-on bottle (24ml).",
      ogImage: "/products/naseem.png",
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

  {
    slug: "ur-revolution",
    name: "UR Revolution",
    audience: "his",
    family: "woody-spicy",
    tagline: "Bold citrus and spice opening into a warm, woody finish.",
    description:
      "UR Revolution Eau de Toilette opens with a sharp citrus burst before settling into a spiced woody heart and a clean, lasting base. A confident everyday fragrance built for the man who moves with purpose.",
    notes: {
      top: ["bergamot", "lemon"],
      heart: ["cedarwood", "patchouli"],
      base: ["musk", "amber"],
    },
    performance: { longevity: 3, sillage: 3, projection: 3 },
    variants: [
      {
        sku: "URR-100",
        size: 100,
        unit: "ml",
        price: 10000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "/products/ur-revolution.png",
      heroLight: "/products/ur-revolution.png",
      gallery: [
        "/products/ur-revolution.png",
        "/products/ur-revolution.jpg",
      ],
    },
    seo: {
      title: "UR Revolution Eau de Toilette 100ml",
      description:
        "UR Revolution EDT — bold citrus and spice opening into a warm woody finish. 100ml natural spray.",
      ogImage: "/products/ur-revolution.png",
    },
    featured: false,
    order: 70,
  },
  {
    slug: "24k",
    name: "24K",
    audience: "unisex",
    family: "oriental-amber",
    tagline: "Pure luxury in five distinctive expressions — bold, refined, and captivating.",
    description:
      "The 24K Collection by Copaci brings together five signature fragrances: 24K Homme, 24K Bleu Nuit, 24K Rose Pink, 24K White, and 24K Rouge. Each bottle offers a distinct, long-lasting aroma crafted for presence and prestige.",
    notes: {
      top: ["bergamot", "apple"],
      heart: ["rose", "jasmine", "lavender"],
      base: ["amber", "musk", "cedarwood"],
    },
    performance: { longevity: 4, sillage: 4, projection: 4 },
    variants: [
      {
        sku: "24K-100",
        size: 100,
        unit: "ml",
        price: 10000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "/products/24k.png",
      heroLight: "/products/24k.png",
      gallery: [
        "/products/24k.png",
        "/products/24-heures-deluxe-silver.jpg",
      ],
    },
    seo: {
      title: "24K Eau de Parfum Collection 100ml",
      description:
        "24K by Copaci — five iconic expressions including Homme, Bleu Nuit, Rose Pink, White, and Rouge. 100ml.",
      ogImage: "/products/24k.png",
    },
    featured: false,
    order: 80,
  },
  {
    slug: "boos-set",
    name: "Boos Set",
    audience: "unisex",
    family: "fresh-floral",
    tagline: "Light, fresh and everyday — a complete spray and roll-on set.",
    description:
      "The Boos Set pairs a natural spray with a matching roll-on deodorant in a clean, fresh floral profile. Easy to wear and long-lasting for anyone who prefers a lighter, effortless signature.",
    notes: {
      top: ["sweet-orange", "bergamot"],
      heart: ["rose", "jasmine"],
      base: ["musk", "vanilla"],
    },
    performance: { longevity: 3, sillage: 2, projection: 2 },
    variants: [
      {
        sku: "BOOS-SET",
        size: 50,
        unit: "ml",
        price: 10000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "/products/boos-set.png",
      heroLight: "/products/boos-set.png",
      gallery: [
        "/products/boos-set.png",
        "/products/boos-set.jpg",
      ],
    },
    seo: {
      title: "Boos Fragrance Set — Natural Spray and Roll-On",
      description:
        "Boos Set — a fresh floral natural spray and roll-on deodorant. Light, easy and everyday. 50ml.",
      ogImage: "/products/boos-set.png",
    },
    featured: false,
    order: 90,
  },
  {
    slug: "9pm-night-out",
    name: "9PM Night Out",
    audience: "his",
    family: "fresh-aromatic",
    tagline: "Made for after dark — a confident, long-lasting body spray.",
    description:
      "9PM Night Out by Smart World is a perfumed deodorant body spray built for evening presence. Fresh, aromatic and bold — it projects well and lasts through the night. Ideal for going out or layering over your main fragrance.",
    notes: {
      top: ["bergamot", "blackcurrant"],
      heart: ["lavender", "patchouli"],
      base: ["musk", "amber"],
    },
    performance: { longevity: 3, sillage: 4, projection: 4 },
    variants: [
      {
        sku: "9PMNO-200",
        size: 200,
        unit: "ml",
        price: 6000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "/products/9pm-night-out.jpg",
      heroLight: "/products/9pm-night-out.jpg",
      gallery: ["/products/9pm-night-out.jpg"],
    },
    seo: {
      title: "9PM Night Out Perfumed Body Spray 200ml",
      description:
        "9PM Night Out by Smart World — a bold, fresh aromatic body spray built for the evening. 200ml.",
      ogImage: "/products/9pm-night-out.jpg",
    },
    featured: false,
    order: 100,
  },
  {
    slug: "mousuf",
    name: "Mousuf",
    audience: "his",
    family: "oriental-amber",
    tagline: "Rich oriental warmth in a long-lasting perfumed body spray.",
    description:
      "Mousuf by Smart World is a perfumed deodorant body spray with a rich oriental character — warm amber, saffron and oud layered over a musky base. Long-lasting and commanding, it works as a standalone statement or alongside your signature.",
    notes: {
      top: ["saffron", "sweet-orange"],
      heart: ["rose", "oud"],
      base: ["amber", "musk", "cedarwood"],
    },
    performance: { longevity: 4, sillage: 4, projection: 4 },
    variants: [
      {
        sku: "MOUSUF-200",
        size: 200,
        unit: "ml",
        price: 1,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "/products/mousuf.jpg",
      heroLight: "/products/mousuf.jpg",
      gallery: ["/products/mousuf.jpg"],
    },
    seo: {
      title: "Mousuf Perfumed Body Spray 200ml",
      description:
        "Mousuf by Smart World — rich oriental warmth with saffron, oud and amber. A long-lasting perfumed body spray. 200ml.",
      ogImage: "/products/mousuf.jpg",
    },
    featured: false,
    order: 110,
  },
  {
    slug: "silver-oud",
    name: "Silver Oud",
    audience: "unisex",
    family: "oriental-amber",
    tagline: "Resinous oud meets sparkling spices and silver elegance.",
    description:
      "Silver Oud by HIA is an opulent Eau de Parfum built around precious oud wood, warm amber, and lingering musk, accented with a crystalline silver freshness. A regal fragrance designed to leave a lasting aura of prestige.",
    notes: {
      top: ["bergamot", "pink-pepper"],
      heart: ["rose", "saffron", "oud"],
      base: ["amber", "musk", "cedarwood"],
    },
    performance: { longevity: 5, sillage: 4, projection: 4 },
    variants: [
      {
        sku: "SO-100",
        size: 100,
        unit: "ml",
        price: 8000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "/products/silver-oud.png",
      heroLight: "/products/silver-oud.png",
      gallery: ["/products/silver-oud.png"],
    },
    seo: {
      title: "Silver Oud Eau de Parfum 100ml",
      description:
        "Silver Oud by HIA — an opulent oriental oud fragrance with amber, saffron, and musk. 100ml in Nigeria.",
      ogImage: "/products/silver-oud.png",
    },
    featured: false,
    order: 120,
  },
  {
    slug: "nivea-men",
    name: "Nivea Men Deodorant Spray",
    audience: "his",
    family: "fresh-aromatic",
    tagline: "72-hour fresh protection in Cool Kick, Derma Control, and Dry Impact.",
    description:
      "Nivea Men Deodorant Body Spray delivers long-lasting 72-hour freshness and sweat protection. Available in Cool Kick, Derma Control, and Dry Impact formulations — reliable everyday confidence for the active modern man.",
    notes: {
      top: ["bergamot", "lemon"],
      heart: ["lavender"],
      base: ["musk", "cedarwood"],
    },
    performance: { longevity: 4, sillage: 3, projection: 3 },
    variants: [
      {
        sku: "NM-150",
        size: 150,
        unit: "ml",
        price: 6000,
        currency: "NGN",
        inStock: true,
      },
      {
        sku: "NM-200",
        size: 200,
        unit: "ml",
        price: 8000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "/products/nivea-men.png",
      heroLight: "/products/nivea-men.png",
      gallery: ["/products/nivea-men.png"],
    },
    seo: {
      title: "Nivea Men Deodorant Spray 150ml - 200ml",
      description:
        "Nivea Men 72h Deodorant Body Spray — Cool Kick, Derma Control, and Dry Impact. 150ml and 200ml.",
      ogImage: "/products/nivea-men.png",
    },
    featured: false,
    order: 130,
  },
  {
    slug: "1-million-set",
    name: "1 Million Fragrance Set",
    audience: "his",
    family: "warm-spiced",
    tagline: "The golden duo — 50ml Eau de Parfum and matching 50ml roll-on.",
    description:
      "The 1 Million luxury gift set pairs an Eau de Parfum Natural Spray with a matching Roll-On Deodorant in a striking gold presentation box. Rich spiced sweetness, vibrant citrus, and warm amber create an unforgettable statement of charisma.",
    notes: {
      top: ["sweet-orange", "cinnamon"],
      heart: ["rose", "cardamom"],
      base: ["amber", "patchouli", "cedarwood"],
    },
    performance: { longevity: 4, sillage: 4, projection: 4 },
    variants: [
      {
        sku: "1M-SET",
        size: 50,
        unit: "ml",
        price: 10000,
        currency: "NGN",
        inStock: true,
      },
    ],
    media: {
      heroDark: "/products/1-million-set.png",
      heroLight: "/products/1-million-set.png",
      gallery: ["/products/1-million-set.png"],
    },
    seo: {
      title: "1 Million EDP & Roll-On Fragrance Set 50ml",
      description:
        "1 Million luxury fragrance set — 50ml EDP natural spray and 50ml roll-on deodorant in gold presentation box.",
      ogImage: "/products/1-million-set.png",
    },
    featured: false,
    order: 140,
  },
] satisfies Fragrance[];

export const fragrances = parseContentCollection(
  fragranceSchema,
  demoFragrances,
  "fragrances",
);

# Content Editing Guide — HIS & HER'S SCENTS

All product content is stored as typed TypeScript arrays under `src/content/`. Every field is validated by Zod schemas at startup — if a value is wrong, the build fails with a clear error message telling you exactly which field and why.

---

## Where Everything Lives

| Content type | File |
|---|---|
| Fragrances | `src/content/fragrances/sample-fragrances.ts` |
| Pairs | `src/content/pairs/sample-pairs.ts` |
| Notes (ingredients) | `src/content/notes/sample-notes.ts` |
| Stories | `src/content/stories/sample-stories.ts` |

The word "sample" in the filenames is intentional — these files contain demonstration data. Replace the objects inside them with real client-approved content before launch. Do not rename the files or change the export names (`fragrances`, `pairs`, `notes`, `stories`).

---

## How to Add a Fragrance

Open `src/content/fragrances/sample-fragrances.ts` and add a new object to the `demoFragrances` array. Every field is required unless marked optional.

```ts
{
  slug: "cedar-promise",          // URL-safe, lowercase, hyphenated. Used in /fragrance/[slug]
  name: "Cedar Promise",          // Display name shown on cards and pages
  audience: "his",                // "his" | "hers" | "unisex"
  pairId: "the-first-night",      // Optional. Slug of the Pair this fragrance belongs to
  family: "woody-aromatic",       // Scent family slug. Lowercase hyphenated
  tagline: "Cedar, smoke and a quiet resolve.",
  description: "Full editorial description shown on the fragrance page.",
  notes: {
    top: ["bergamot", "pink-pepper"],   // Note IDs — must exist in sample-notes.ts
    heart: ["oud"],
    base: ["amber", "musk"],
  },
  performance: {
    longevity: 4,    // 1–5 integer
    sillage: 3,      // 1–5 integer
    projection: 4,   // 1–5 integer
  },
  variants: [
    {
      sku: "CP-50",           // See SKU rules below
      size: 50,
      unit: "ml",
      price: 45000,           // Integer in NGN — no decimals, no formatting
      currency: "NGN",
      inStock: true,
    },
  ],
  media: {
    heroDark: "hhs/fragrance/cedar-promise/hero-dark",    // Cloudinary public ID
    heroLight: "hhs/fragrance/cedar-promise/hero-light",
    gallery: [
      "hhs/fragrance/cedar-promise/detail-cap",
    ],
    turntable: {                                          // Optional — omit if no turntable
      publicIdBase: "hhs/turntable/cedar-promise/frame",
      frameCount: 36,
      startIndex: 1,
      pad: 3,                                            // Zero-padding digits: frame001, frame002…
    },
  },
  seo: {
    title: "Cedar Promise Eau de Parfum | His & Her's Scents",
    description: "Up to 160 characters for search results.",
    ogImage: "hhs/og/cedar-promise",                     // Optional Cloudinary public ID
  },
  featured: true,    // true = appears on homepage featured section
  order: 40,         // Lower numbers appear first in the collection
}
```

After saving, run `pnpm type-check` to confirm the schema passes.

---

## How to Add a Pair

Open `src/content/pairs/sample-pairs.ts` and add a new object to the `demoPairs` array.

```ts
{
  slug: "the-golden-hour",
  name: "The Golden Hour",
  story: "Editorial paragraph describing the emotional story of this pair.",
  hisFragranceSlug: "cedar-promise",    // Must match a fragrance slug
  hersFragranceSlug: "velvet-vow",      // Must match a fragrance slug
  sharedAccords: ["amber", "musk"],     // Note IDs shared between both fragrances
  setVariants: [
    {
      sku: "TGH-SET-50",
      contents: ["CP-50", "VV-50"],     // Must be real fragrance variant SKUs
      price: 82000,
      currency: "NGN",
      inStock: true,
    },
  ],
  media: {
    heroPair: "hhs/pairs/the-golden-hour/hero",
    hisWorld: "hhs/pairs/the-golden-hour/his",
    hersWorld: "hhs/pairs/the-golden-hour/hers",
  },
  seo: {
    title: "The Golden Hour Pair | His & Her's Scents",
    description: "Up to 160 characters.",
    ogImage: "hhs/og/the-golden-hour",
  },
}
```

The `hisFragranceSlug`, `hersFragranceSlug`, `sharedAccords`, and `contents` fields are all cross-validated at startup. If any reference is broken, the build fails.

---

## How to Change a Price

Find the fragrance or pair in its content file. Locate the `variants` or `setVariants` array. Change the `price` integer.

```ts
// Before
{ sku: "MO-100", size: 100, unit: "ml", price: 72000, currency: "NGN", inStock: true }

// After
{ sku: "MO-100", size: 100, unit: "ml", price: 85000, currency: "NGN", inStock: true }
```

Prices are always integers in NGN (Nigerian Naira). No decimal points, no currency symbols, no formatted strings. The site formats them for display automatically.

---

## How to Add a Size

Add a new object to the `variants` array of the fragrance. Give it a new unique SKU.

```ts
variants: [
  { sku: "MO-50",  size: 50,  unit: "ml", price: 45000, currency: "NGN", inStock: true },
  { sku: "MO-100", size: 100, unit: "ml", price: 72000, currency: "NGN", inStock: true },
  { sku: "MO-200", size: 200, unit: "ml", price: 120000, currency: "NGN", inStock: true }, // new
],
```

If the new size is part of a pair set, add a corresponding pair variant in `sample-pairs.ts` and include the new SKU in its `contents` array.

---

## How to Mark an Item Unavailable

Set `inStock: false` on the specific variant. The order panel will show it as unavailable and disable ordering for that size. Other variants remain orderable.

```ts
{ sku: "VV-100", size: 100, unit: "ml", price: 72000, currency: "NGN", inStock: false }
```

To mark an entire fragrance as unavailable, set `inStock: false` on all its variants.

---

## How to Add a Story

Open `src/content/stories/sample-stories.ts` and add a new object to the `demoStories` array.

```ts
{
  slug: "the-art-of-layering",
  title: "The Art of Layering",
  excerpt: "One sentence shown on the stories listing page.",
  publishedAt: "2026-11-15",    // ISO date string YYYY-MM-DD
  published: true,              // false = draft, hidden from all listings
  coverMedia: "hhs/stories/the-art-of-layering/cover",
  relatedFragrances: ["midnight-oath"],   // Optional. Must be real fragrance slugs
  body: "Full story text. Use \\n\\n for paragraph breaks.",
  seo: {
    title: "The Art of Layering | His & Her's Scents",
    description: "Up to 160 characters.",
    ogImage: "hhs/og/the-art-of-layering",
  },
}
```

Set `published: false` to save a draft without it appearing on the site.

---

## How to Add or Replace Cloudinary Media

All media fields store Cloudinary **public IDs** — not full URLs. The site builds the URL automatically using your cloud name.

A public ID looks like: `hhs/fragrance/midnight-oath/hero-dark`

The full URL becomes: `https://res.cloudinary.com/u7scxp7o/image/upload/f_auto,q_auto:good,c_limit,w_1200/hhs/fragrance/midnight-oath/hero-dark`

**To replace an image:**
1. Upload the new image to Cloudinary using the exact same public ID as the old one. Cloudinary will overwrite it.
2. No code changes needed — the URL is built from the public ID already in the content file.

**To add a new image:**
1. Upload to Cloudinary with a public ID following the folder structure in `docs/CLOUDINARY.md`.
2. Add the public ID string to the relevant `media` field in the content file.

See `docs/MEDIA.md` for required dimensions and naming conventions.

---

## How to Add Turntable Frames

Turntable frames are a sequence of numbered images uploaded to Cloudinary.

1. Upload 36 images named `frame001.webp` through `frame036.webp` to the path `hhs/turntable/[fragrance-slug]/`.
2. In the fragrance's `media` object, add or update the `turntable` field:

```ts
turntable: {
  publicIdBase: "hhs/turntable/cedar-promise/frame",
  frameCount: 36,
  startIndex: 1,
  pad: 3,   // Produces frame001, frame002 … frame036
}
```

The `BottleUnveiling` component reads these fields and builds the frame URLs automatically. On Tier A it loads all 36 frames; on Tier B it loads every other frame (18 total) for performance.

If no turntable is provided, the component falls back to the SVG bottle silhouette.

---

## How SKUs Should Be Created

SKUs identify specific orderable variants. They are used in WhatsApp order messages, analytics events, and pair set contents.

**Rules:**
- Uppercase letters and numbers only, separated by hyphens.
- Format: `[FRAGRANCE-CODE]-[SIZE]` for individual fragrances, `[PAIR-CODE]-SET-[SIZE]` for pair sets.
- Must be globally unique across all fragrances and pairs.
- Never reuse a SKU, even if a product is discontinued.

**Examples:**
```
MO-50        Midnight Oath 50ml
MO-100       Midnight Oath 100ml
VV-50        Velvet Vow 50ml
TFN-SET-50   The First Night pair set (2 × 50ml)
TFN-SET-100  The First Night pair set (2 × 100ml)
```

The content repository validates that all SKUs referenced in pair `contents` arrays exist as real fragrance variant SKUs. A broken reference fails the build.

---

## How to Add a Note (Ingredient)

Open `src/content/notes/sample-notes.ts` and add a new object to the `demoNotes` array.

```ts
{
  id: "cedarwood",                          // Lowercase hyphenated. Used as reference in fragrance notes arrays
  name: "Cedarwood",                        // Display name
  family: "woody",                          // Scent family slug
  shortDescription: "Dry, pencil-shaving cedar with a clean mineral edge.",
  cloudinaryImageId: "hhs/notes/cedarwood", // Cloudinary public ID for the note image
  accentColor: "#7A6040",                   // Hex colour used in the notes graph UI
}
```

Once added, you can reference the note by its `id` in any fragrance's `notes.top`, `notes.heart`, or `notes.base` arrays.

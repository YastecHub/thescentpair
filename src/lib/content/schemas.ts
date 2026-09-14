import { z } from "zod";

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase hyphenated slugs.");
export const skuSchema = z
  .string()
  .regex(/^[A-Z0-9]+(?:-[A-Z0-9]+)*$/, "Use stable uppercase SKU segments.");
export const currencySchema = z.literal("NGN");
export const cloudinaryPublicIdSchema = z
  .string()
  .min(1)
  .regex(/^[a-zA-Z0-9/_.-]+$/);
export const hexColorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/);

export const seoSchema = z.object({
  title: z.string().min(1).max(70),
  description: z.string().min(1).max(180),
  ogImage: cloudinaryPublicIdSchema.optional(),
});

export const fragranceVariantSchema = z.object({
  sku: skuSchema,
  size: z.number().int().positive(),
  unit: z.enum(["ml"]),
  price: z.number().int().positive(),
  currency: currencySchema,
  inStock: z.boolean(),
});

export const pairVariantSchema = z.object({
  sku: skuSchema,
  contents: z.array(skuSchema).min(2),
  price: z.number().int().positive(),
  currency: currencySchema,
  inStock: z.boolean(),
});

const performanceScoreSchema = z.number().int().min(1).max(5);

export const fragranceSchema = z.object({
  slug: slugSchema,
  name: z.string().min(1),
  audience: z.enum(["his", "hers", "unisex"]),
  pairId: slugSchema.optional(),
  family: slugSchema,
  tagline: z.string().min(1),
  description: z.string().min(1),
  notes: z.object({
    top: z.array(slugSchema).min(1),
    heart: z.array(slugSchema).min(1),
    base: z.array(slugSchema).min(1),
  }),
  performance: z.object({
    longevity: performanceScoreSchema,
    sillage: performanceScoreSchema,
    projection: performanceScoreSchema,
  }),
  variants: z.array(fragranceVariantSchema).min(1),
  media: z.object({
    heroDark: cloudinaryPublicIdSchema,
    heroLight: cloudinaryPublicIdSchema,
    gallery: z.array(cloudinaryPublicIdSchema),
    turntable: z
      .object({
        publicIdBase: cloudinaryPublicIdSchema,
        frameCount: z.number().int().positive(),
        startIndex: z.number().int().nonnegative(),
        pad: z.number().int().min(1).max(4),
      })
      .optional(),
  }),
  seo: seoSchema,
  featured: z.boolean(),
  order: z.number().int().nonnegative(),
});

export const pairSchema = z.object({
  slug: slugSchema,
  name: z.string().min(1),
  story: z.string().min(1),
  hisFragranceSlug: slugSchema,
  hersFragranceSlug: slugSchema,
  sharedAccords: z.array(slugSchema).min(1),
  setVariants: z.array(pairVariantSchema).min(1),
  media: z.object({
    heroPair: cloudinaryPublicIdSchema,
    hisWorld: cloudinaryPublicIdSchema,
    hersWorld: cloudinaryPublicIdSchema,
  }),
  seo: seoSchema,
});

export const noteSchema = z.object({
  id: slugSchema,
  name: z.string().min(1),
  family: slugSchema,
  shortDescription: z.string().min(1),
  cloudinaryImageId: cloudinaryPublicIdSchema,
  accentColor: hexColorSchema,
});

export const storySchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  excerpt: z.string().min(1),
  publishedAt: z.string().date(),
  published: z.boolean(),
  coverMedia: cloudinaryPublicIdSchema,
  relatedFragrances: z.array(slugSchema),
  body: z.string().min(1),
  seo: seoSchema,
});

export type SeoMetadata = z.infer<typeof seoSchema>;
export type FragranceVariant = z.infer<typeof fragranceVariantSchema>;
export type Fragrance = z.infer<typeof fragranceSchema>;
export type PairVariant = z.infer<typeof pairVariantSchema>;
export type Pair = z.infer<typeof pairSchema>;
export type Note = z.infer<typeof noteSchema>;
export type Story = z.infer<typeof storySchema>;

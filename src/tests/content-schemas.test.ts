import { describe, expect, it } from "vitest";
import { fragrances } from "@/content/fragrances/sample-fragrances";
import { notes } from "@/content/notes/sample-notes";
import { pairs } from "@/content/pairs/sample-pairs";
import { stories } from "@/content/stories/sample-stories";
import {
  fragranceSchema,
  fragranceVariantSchema,
  noteSchema,
  pairSchema,
  slugSchema,
  storySchema,
} from "@/lib/content/schemas";

describe("content schemas", () => {
  it("accepts labelled sample content", () => {
    expect(fragrances).toHaveLength(17);
    expect(pairs).toHaveLength(1);
    expect(notes).toHaveLength(25);
    expect(stories).toHaveLength(3);
  });

  it("accepts pair, note and story schemas", () => {
    expect(pairSchema.safeParse(pairs[0]).success).toBe(true);
    expect(noteSchema.safeParse(notes[0]).success).toBe(true);
    expect(storySchema.safeParse(stories[0]).success).toBe(true);
  });

  it("rejects invalid fragrance data", () => {
    const invalid = {
      ...fragrances[0],
      performance: { longevity: 6, sillage: 3, projection: 4 },
    };

    expect(fragranceSchema.safeParse(invalid).success).toBe(false);
  });

  it("rejects invalid SKU data", () => {
    const invalid = { ...fragrances[0].variants[0], sku: "mo 50" };

    expect(fragranceVariantSchema.safeParse(invalid).success).toBe(false);
  });

  it("requires integer prices", () => {
    const invalid = { ...fragrances[0].variants[0], price: 45000.5 };

    expect(fragranceVariantSchema.safeParse(invalid).success).toBe(false);
  });

  it("rejects non-hyphenated slugs", () => {
    expect(slugSchema.safeParse("Midnight Oath").success).toBe(false);
    expect(slugSchema.safeParse("midnight-oath").success).toBe(true);
  });
});

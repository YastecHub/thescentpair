import { describe, expect, it } from "vitest";
import { fragrances } from "@/content/fragrances/sample-fragrances";
import { notes } from "@/content/notes/sample-notes";
import { pairs } from "@/content/pairs/sample-pairs";
import { stories } from "@/content/stories/sample-stories";
import {
  formatPrice,
  getFeaturedFragrances,
  getPartnerFragrance,
  getRelatedFragrances,
  getSharedNotes,
  validateCatalogIntegrity,
} from "@/lib/content/repository";

const catalog = { fragrances, pairs, notes, stories };

describe("content repository", () => {
  it("formats integer NGN prices for display", () => {
    expect(formatPrice(45000)).toBe("₦45,000");
  });

  it("retrieves featured fragrances predictably", () => {
    expect(getFeaturedFragrances().map((fragrance) => fragrance.slug)).toEqual([
      "midnight-oath",
      "velvet-vow",
    ]);
  });

  it("retrieves a partner fragrance", () => {
    expect(getPartnerFragrance(fragrances[0])?.slug).toBe("velvet-vow");
  });

  it("resolves shared notes for a pair", () => {
    expect(getSharedNotes(pairs[0]).map((note) => note.id)).toEqual([
      "amber",
      "musk",
    ]);
  });

  it("retrieves related fragrances for a story", () => {
    expect(
      getRelatedFragrances(stories[0]).map((fragrance) => fragrance.slug),
    ).toEqual(["midnight-oath", "velvet-vow"]);
  });

  it("detects duplicate fragrance slugs", () => {
    expect(() =>
      validateCatalogIntegrity({
        ...catalog,
        fragrances: [fragrances[0], fragrances[0]],
      }),
    ).toThrow("fragrance slug");
  });

  it("detects duplicate SKUs", () => {
    const duplicateSkuFragrance = {
      ...fragrances[1],
      slug: "velvet-vow-copy",
      variants: [
        { ...fragrances[1].variants[0], sku: fragrances[0].variants[0].sku },
      ],
    };

    expect(() =>
      validateCatalogIntegrity({
        ...catalog,
        fragrances: [fragrances[0], duplicateSkuFragrance],
      }),
    ).toThrow("SKU");
  });

  it("detects invalid note references", () => {
    const invalid = {
      ...fragrances[0],
      notes: { ...fragrances[0].notes, top: ["missing-note"] },
    };

    expect(() =>
      validateCatalogIntegrity({ ...catalog, fragrances: [invalid] }),
    ).toThrow("missing note");
  });

  it("detects invalid pair fragrance references", () => {
    const invalid = { ...pairs[0], hisFragranceSlug: "missing-fragrance" };

    expect(() =>
      validateCatalogIntegrity({ ...catalog, pairs: [invalid] }),
    ).toThrow("missing His fragrance");
  });

  it("detects invalid related-story references", () => {
    const invalid = { ...stories[0], relatedFragrances: ["missing-fragrance"] };

    expect(() =>
      validateCatalogIntegrity({ ...catalog, stories: [invalid] }),
    ).toThrow("references missing fragrance");
  });
});

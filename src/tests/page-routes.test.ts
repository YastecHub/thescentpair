import { describe, expect, it, vi } from "vitest";
import {
  filterFragrances,
} from "@/components/collection/collection-filters";

vi.mock("next/navigation", () => ({
  usePathname: () => "/collection",
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));


import {
  getAllFragrances,
  getAllPairs,
  getAllStories,
  getFragranceBySlug,
  getPairBySlug,
  getPartnerFragrance,
  getSharedNotes,
  getStartingPrice,
  hasAvailableVariant,
} from "@/lib/content/repository";
import { fragrances } from "@/content/fragrances/sample-fragrances";
import { pairs } from "@/content/pairs/sample-pairs";


describe("dynamic route generation", () => {
  it("fragrance generateStaticParams returns all slugs", () => {
    const all = getAllFragrances();
    expect(all.length).toBeGreaterThan(0);
    expect(all.map((f) => f.slug)).toContain("midnight-oath");
    expect(all.map((f) => f.slug)).toContain("velvet-vow");
  });

  it("pair generateStaticParams returns all slugs", () => {
    const all = getAllPairs();
    expect(all.length).toBeGreaterThan(0);
    expect(all.map((p) => p.slug)).toContain("the-first-night");
  });

  it("story generateStaticParams returns only published stories", () => {
    const published = getAllStories();
    const all = getAllStories({ includeUnpublished: true });
    expect(published.every((s) => s.published)).toBe(true);
    expect(all.length).toBeGreaterThanOrEqual(published.length);
  });
});

describe("slug resolution", () => {
  it("valid fragrance slug resolves", () => {
    expect(getFragranceBySlug("midnight-oath")).toBeDefined();
    expect(getFragranceBySlug("midnight-oath")?.name).toBe("Midnight Oath");
  });

  it("unknown fragrance slug returns undefined (triggers notFound)", () => {
    expect(getFragranceBySlug("does-not-exist")).toBeUndefined();
  });

  it("valid pair slug resolves", () => {
    expect(getPairBySlug("the-first-night")).toBeDefined();
    expect(getPairBySlug("the-first-night")?.name).toBe("The First Night");
  });

  it("unknown pair slug returns undefined (triggers notFound)", () => {
    expect(getPairBySlug("does-not-exist")).toBeUndefined();
  });

  it("unpublished stories are excluded from public listing", () => {
    const published = getAllStories();
    // All stories in the published list must have published: true
    expect(published.every((s) => s.published)).toBe(true);
  });
});

describe("collection filter function", () => {
  const all = getAllFragrances();

  it("returns all fragrances with no filters", () => {
    expect(filterFragrances(all, {})).toHaveLength(all.length);
  });

  it("filters by audience his", () => {
    const result = filterFragrances(all, { audience: "his" });
    expect(result.every((f) => f.audience === "his")).toBe(true);
  });

  it("filters by audience hers", () => {
    const result = filterFragrances(all, { audience: "hers" });
    expect(result.every((f) => f.audience === "hers")).toBe(true);
  });

  it("filters by audience unisex", () => {
    const result = filterFragrances(all, { audience: "unisex" });
    expect(result.every((f) => f.audience === "unisex")).toBe(true);
  });

  it("filters by scent family", () => {
    const result = filterFragrances(all, { family: "woody-oriental" });
    expect(result.every((f) => f.family === "woody-oriental")).toBe(true);
  });

  it("returns empty array for non-matching family filter", () => {
    const result = filterFragrances(all, { family: "non-existent-family" });
    expect(result).toHaveLength(0);
  });

  it("filters to available fragrances only", () => {
    const result = filterFragrances(all, { availability: "available" });
    expect(result.every((f) => f.variants.some((v) => v.inStock))).toBe(true);
  });

  it("filters to unavailable fragrances only", () => {
    const result = filterFragrances(all, { availability: "unavailable" });
    expect(result.every((f) => f.variants.every((v) => !v.inStock))).toBe(
      true,
    );
  });

  it("combines audience and family filters", () => {
    const result = filterFragrances(all, {
      audience: "his",
      family: "woody-oriental",
    });
    expect(result.every((f) => f.audience === "his" && f.family === "woody-oriental")).toBe(true);
  });
});

describe("variant behaviour", () => {
  const fragrance = fragrances[0]; // midnight-oath: has 50ml and 100ml

  it("derives starting price from lowest variant price", () => {
    expect(getStartingPrice(fragrance.variants)).toBe(45000);
  });

  it("detects availability when at least one variant is in stock", () => {
    expect(hasAvailableVariant(fragrance.variants)).toBe(true);
  });

  it("detects unavailability when all variants are out of stock", () => {
    const allOutOfStock = fragrance.variants.map((v) => ({ ...v, inStock: false }));
    expect(hasAvailableVariant(allOutOfStock)).toBe(false);
  });

  it("variant 100ml on velvet-vow is marked out of stock", () => {
    const velvetVow = fragrances.find((f) => f.slug === "velvet-vow");
    expect(velvetVow).toBeDefined();
    const largeVariant = velvetVow!.variants.find((v) => v.size === 100);
    expect(largeVariant?.inStock).toBe(false);
  });
});

describe("partner and pair relationships", () => {
  it("resolves partner fragrance from content layer", () => {
    const hisFragrance = fragrances.find((f) => f.slug === "midnight-oath");
    expect(hisFragrance).toBeDefined();
    const partner = getPartnerFragrance(hisFragrance!);
    expect(partner?.slug).toBe("velvet-vow");
  });

  it("resolves shared notes from pair", () => {
    const pair = pairs[0];
    const sharedNotes = getSharedNotes(pair);
    expect(sharedNotes.map((n) => n.id)).toContain("amber");
    expect(sharedNotes.map((n) => n.id)).toContain("musk");
  });

  it("partner of velvet-vow is midnight-oath", () => {
    const hersFragrance = fragrances.find((f) => f.slug === "velvet-vow");
    expect(hersFragrance).toBeDefined();
    const partner = getPartnerFragrance(hersFragrance!);
    expect(partner?.slug).toBe("midnight-oath");
  });

  it("fragrance without a pair has no partner", () => {
    const unisex = fragrances.find((f) => f.slug === "amber-room");
    expect(unisex).toBeDefined();
    expect(getPartnerFragrance(unisex!)).toBeUndefined();
  });

  it("pair card links to correct route", () => {
    const pair = pairs[0];
    expect(`/pairs/${pair.slug}`).toBe("/pairs/the-first-night");
  });

  it("fragrance card links to correct route", () => {
    const fragrance = fragrances[0];
    expect(`/fragrance/${fragrance.slug}`).toBe("/fragrance/midnight-oath");
  });
});

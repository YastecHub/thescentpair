import { fragrances } from "@/content/fragrances/sample-fragrances";
import { notes } from "@/content/notes/sample-notes";
import { pairs } from "@/content/pairs/sample-pairs";
import { stories } from "@/content/stories/sample-stories";
import type {
  Fragrance,
  FragranceVariant,
  Note,
  Pair,
  PairVariant,
  Story,
} from "@/lib/content/schemas";

type CatalogInput = Readonly<{
  fragrances: readonly Fragrance[];
  pairs: readonly Pair[];
  notes: readonly Note[];
  stories: readonly Story[];
}>;

function findDuplicates(values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }

    seen.add(value);
  }

  return [...duplicates];
}

export function validateCatalogIntegrity(catalog: CatalogInput) {
  const fragranceSlugs = catalog.fragrances.map((fragrance) => fragrance.slug);
  const pairSlugs = catalog.pairs.map((pair) => pair.slug);
  const storySlugs = catalog.stories.map((story) => story.slug);
  const noteIds = catalog.notes.map((note) => note.id);
  const fragranceSkuValues = catalog.fragrances.flatMap((fragrance) =>
    fragrance.variants.map((variant) => variant.sku),
  );
  const pairSkuValues = catalog.pairs.flatMap((pair) =>
    pair.setVariants.map((variant) => variant.sku),
  );
  const allVariantSkus = [...fragranceSkuValues, ...pairSkuValues];

  const duplicateGroups = [
    ...findDuplicates(fragranceSlugs).map(
      (value) => `fragrance slug: ${value}`,
    ),
    ...findDuplicates(pairSlugs).map((value) => `pair slug: ${value}`),
    ...findDuplicates(storySlugs).map((value) => `story slug: ${value}`),
    ...findDuplicates(noteIds).map((value) => `note id: ${value}`),
    ...findDuplicates(allVariantSkus).map((value) => `SKU: ${value}`),
  ];

  if (duplicateGroups.length > 0) {
    throw new Error(
      `Duplicate content identifiers found: ${duplicateGroups.join(", ")}`,
    );
  }

  const fragranceSlugSet = new Set(fragranceSlugs);
  const pairSlugSet = new Set(pairSlugs);
  const noteIdSet = new Set(noteIds);
  const fragranceSkuSet = new Set(fragranceSkuValues);

  for (const fragrance of catalog.fragrances) {
    if (fragrance.pairId && !pairSlugSet.has(fragrance.pairId)) {
      throw new Error(
        `Fragrance "${fragrance.slug}" references missing pair "${fragrance.pairId}".`,
      );
    }

    const referencedNotes = [
      ...fragrance.notes.top,
      ...fragrance.notes.heart,
      ...fragrance.notes.base,
    ];
    for (const noteId of referencedNotes) {
      if (!noteIdSet.has(noteId)) {
        throw new Error(
          `Fragrance "${fragrance.slug}" references missing note "${noteId}".`,
        );
      }
    }
  }

  for (const pair of catalog.pairs) {
    if (!fragranceSlugSet.has(pair.hisFragranceSlug)) {
      throw new Error(
        `Pair "${pair.slug}" references missing His fragrance "${pair.hisFragranceSlug}".`,
      );
    }

    if (!fragranceSlugSet.has(pair.hersFragranceSlug)) {
      throw new Error(
        `Pair "${pair.slug}" references missing Her's fragrance "${pair.hersFragranceSlug}".`,
      );
    }

    for (const noteId of pair.sharedAccords) {
      if (!noteIdSet.has(noteId)) {
        throw new Error(
          `Pair "${pair.slug}" references missing shared note "${noteId}".`,
        );
      }
    }

    for (const variant of pair.setVariants) {
      for (const sku of variant.contents) {
        if (!fragranceSkuSet.has(sku)) {
          throw new Error(
            `Pair variant "${variant.sku}" references missing fragrance SKU "${sku}".`,
          );
        }
      }
    }
  }

  for (const story of catalog.stories) {
    for (const fragranceSlug of story.relatedFragrances) {
      if (!fragranceSlugSet.has(fragranceSlug)) {
        throw new Error(
          `Story "${story.slug}" references missing fragrance "${fragranceSlug}".`,
        );
      }
    }
  }

  return true;
}

validateCatalogIntegrity({ fragrances, pairs, notes, stories });

export function getAllFragrances() {
  return [...fragrances].sort((a, b) => a.order - b.order);
}

export function getFeaturedFragrances() {
  return getAllFragrances().filter((fragrance) => fragrance.featured);
}

export function getFragranceBySlug(slug: string) {
  return fragrances.find((fragrance) => fragrance.slug === slug);
}

export function getFragrancesByAudience(audience: Fragrance["audience"]) {
  return getAllFragrances().filter(
    (fragrance) => fragrance.audience === audience,
  );
}

export function getFragrancesByScentFamily(family: string) {
  return getAllFragrances().filter((fragrance) => fragrance.family === family);
}

export function getAllPairs() {
  return [...pairs].sort((a, b) => a.name.localeCompare(b.name));
}

export function getPairBySlug(slug: string) {
  return pairs.find((pair) => pair.slug === slug);
}

export function getPartnerFragrance(fragrance: Fragrance) {
  if (!fragrance.pairId) {
    return undefined;
  }

  const pair = getPairBySlug(fragrance.pairId);

  if (!pair) {
    return undefined;
  }

  const partnerSlug =
    pair.hisFragranceSlug === fragrance.slug
      ? pair.hersFragranceSlug
      : pair.hisFragranceSlug;

  return getFragranceBySlug(partnerSlug);
}

export function getSharedNotes(pair: Pair) {
  return pair.sharedAccords
    .map((noteId) => resolveNoteById(noteId))
    .filter((note): note is Note => Boolean(note));
}

export function getAllStories(options: { includeUnpublished?: boolean } = {}) {
  return [...stories]
    .filter((story) => options.includeUnpublished || story.published)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getStoryBySlug(
  slug: string,
  options: { includeUnpublished?: boolean } = {},
) {
  return stories.find(
    (story) => story.slug === slug && (options.includeUnpublished || story.published),
  );
}

export function getRelatedFragrances(story: Story) {
  return story.relatedFragrances
    .map((slug) => getFragranceBySlug(slug))
    .filter((fragrance): fragrance is Fragrance => Boolean(fragrance));
}

export function resolveNoteById(id: string) {
  return notes.find((note) => note.id === id);
}

export function formatPrice(
  price: number,
  currency: FragranceVariant["currency"] | PairVariant["currency"] = "NGN",
) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getStartingPrice(
  variants: readonly (FragranceVariant | PairVariant)[],
) {
  return Math.min(...variants.map((variant) => variant.price));
}

export function hasAvailableVariant(
  variants: readonly (FragranceVariant | PairVariant)[],
) {
  return variants.some((variant) => variant.inStock);
}

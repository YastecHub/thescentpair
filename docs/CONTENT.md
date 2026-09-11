# Content Editing Foundation

Product content is stored as typed data under `src/content` and validated with Zod schemas in `src/lib/content/schemas.ts`.

## Rules

- Prices are integers in NGN, for example `45000`, not formatted strings.
- Every orderable variant must have a stable uppercase SKU.
- Slugs are lowercase and hyphenated.
- Cloudinary media fields store public IDs, not full transformed URLs.
- Demonstration content is labelled as demo/sample data and must be replaced with client-approved catalogue data before launch.

## Where Content Lives

- Fragrances: `src/content/fragrances/sample-fragrances.ts`
- Pairs: `src/content/pairs/sample-pairs.ts`
- Notes: `src/content/notes/sample-notes.ts`
- Stories: `src/content/stories/sample-stories.ts`
- Repository helpers and cross-reference validation: `src/lib/content/repository.ts`

## References

Pairs reference fragrances by slug. Fragrances and pairs reference notes by note ID. Stories reference related fragrances by slug. These relationships are validated before content is consumed.

Duplicate slugs, duplicate note IDs, duplicate story slugs and duplicate SKUs fail validation. Pair set contents must reference real fragrance variant SKUs.

## Phase 2 Readiness

The current variant fields are intentionally commerce-ready: SKU, integer price, currency and availability can be read by a future cart without reshaping product data.

## Replacing Demonstration Content

Replace the demonstration objects with client-approved product names, prices, notes, media public IDs and SEO metadata. Keep field names stable so Phase 2 commerce can read the same SKU and pricing structure.

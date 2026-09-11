# Batch 1 Architecture Notes

## Current Scope

This batch establishes the project foundation only. It does not implement the finished homepage, product pages, cart, payments, accounts, CMS, reviews or the ten animated moments.

## Boundaries

- App Router routes are prepared with temporary semantic placeholders.
- Animation code is isolated for later batches; heavy motion dependencies are not installed yet.
- Environment validation allows optional Phase 1 integrations to be unset during local development.
- Cloudinary and WhatsApp helpers are prepared without exposing server credentials.

## Batch 2 Additions

- Reusable layout, typography, UI, media and product primitives are established.
- Content repository helpers sit between routes/components and raw content arrays.
- Cross-content references are validated centrally so invalid product relationships fail early.
- Static product cards and media placeholders are the reduced-motion foundation for later animation enhancement.

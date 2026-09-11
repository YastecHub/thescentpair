# Design System Foundation

## Colours

Colours live as CSS custom properties in `src/styles/globals.css` and are mapped into Tailwind in `tailwind.config.ts`. Do not hardcode random hex values in components.

Gold is used as reflected light: hairlines, focus rings, labels, small accents and foil display text. It should not become a large flat fill for body copy or backgrounds.

## Typography

Display typography uses Cormorant Garamond. Body and UI text use Outfit. Font weights are intentionally limited to keep the payload lean.

Reusable typography primitives live in `src/components/typography/typography.tsx` and cover display headings, section headings, eyebrow labels, body copy, editorial quotes, prices and foil text.

## Spacing And Layout

The spacing scale is `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192px`. Standard section spacing is `clamp(6rem, 12vh, 12rem)`. Page gutter is `clamp(1.25rem, 5vw, 6rem)`. Standard content max width is `1440px`; readable copy is capped at `68ch`; editorial quotes are capped at `44ch`.

## Surfaces

Dark surfaces use onyx tokens with one-pixel borders and low-opacity gold detail. Light surfaces use parchment/paper with ink text. Avoid shadows on black; depth should come from borders, lighting and controlled gradients.

## Radius And Borders

Luxury surfaces stay sharp: no radius or `2px` radius. Pill shapes are reserved for deliberate buttons and small controls.

## Focus Styles

All interactive elements inherit the global `2px` gold focus ring with offset. Do not remove outlines unless replacing them with an equally visible indicator on black and parchment.

## Components

Layout primitives live under `src/components/layout`. UI primitives live under `src/components/ui`. Product primitives live under `src/components/product`.

Product cards reserve media space, work without animation and are prepared for the later Reveal moment. Pair cards present two fragrances as one set, not two unrelated products.

## Reduced Motion

The static components in Batch 2 are the Tier C fallback. Content is visible by default and no essential information depends on JavaScript-only animation.

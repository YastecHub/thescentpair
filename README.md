# HIS & HER'S SCENTS — Cinematic Luxury E-Commerce Experience

> *"Two people can share one signature. A fragrance can hold a relationship inside it."*  
> **Brand Promise:** Signature scents, made for two.  
> **Primary Domain:** `https://thescentpair.com` (with permanent 301 from `https://thescentpair.com.ng`)

---

## 1. Project Overview

**HIS & HER'S SCENTS** is a cinematic, mobile-first luxury fragrance brand experience inspired by the architectural restraint of grand French perfume houses (e.g. *Maison Francis Kurkdjian*) and high-impact couple gifting (*Riggs London*).

The platform is structured into:
- **Phase 1 (Current)**: Cinematic brand storytelling, 10 Signature Animated Moments, capability-based motion tiers (A, B, C), and direct WhatsApp concierge order conversations.
- **Phase 2 (Commerce Ready)**: Typed product schemas with integer prices, SKUs, inventory status, and variant tracking prepared for direct gateway integration (Paystack/Flutterwave).

---

## 2. The Ten Signature Moments

1. **Moment 01: The Overture** (`overture-preloader.tsx`) — Hairline monogram stroke draw with 2.2s timeout, bottle resolve, and curtain lift.
2. **Moment 02: The Meeting** (`meeting-hero.tsx`) — Dual-bottle convergence on black, gold seam light ignition.
3. **Moment 03: The Unveiling** (`bottle-unveiling.tsx`) — Interactive 36/18-frame scroll-scrubbed turntable with static fallback.
4. **Moment 04: The Sillage** (`sillage-ambient.tsx`) — Ambient gold dust canvas particle trail responding to cursor & scroll momentum.
5. **Moment 05: The Notes** (`fragrance-notes-graph.tsx`) — Radiating gold hairlines connecting bottle to notes with ingredient spotlight drawer.
6. **Moment 06: The Ritual** (`ritual-film.tsx`) — Full-bleed slow-motion fragrance ceremony, scroll-scrubbed on Tier A, muted loop on Tier B.
7. **Moment 07: Two Halves** (`two-halves-split.tsx`) — Vertical gold seam dividing His and Her's worlds with interactive dragging and keyboard controls.
8. **Moment 08: The Reveal** (`collection-reveal.tsx`) — Staggered gold wipes across fragrance collection cards with gold "Discover" indicator.
9. **Moment 09: The Letter** (`editorial-letter.tsx`) — Line-by-line editorial narrative reveal on scroll, highlighting designated gold keywords.
10. **Moment 10: The Close** (`footer-close.tsx`) — Liquid gold hairline filling across the footer, breathing gold monogram pulsing softly above the tagline.

---

## 3. Technology Stack & Design System

- **Framework**: Next.js 16 (Turbopack, App Router), React 19, TypeScript strict mode.
- **Styling**: Tailwind CSS v3 with custom brand tokens:
  - **Surfaces**: Onyx 900 (`#080706`), Onyx 800 (`#12100e`), Onyx 700 (`#1e1b18`).
  - **Accents**: Gold 700, 500 (`#d9bc6a`), 300 (`#f0e2b8`), 100 (`#fbf7ee`).
  - **Light Mode**: Parchment (`#f7f4ed`), Ink 900 (`#121110`), Ink 600 (`#474440`).
  - **Couples**: His Blue (`#2c3848`), Her Rose (`#8a4b56`).
  - **Typography**: *Cormorant Garamond* (Display) and *Outfit* (Body/UI).
- **Motion**:
  - `gsap` + `ScrollTrigger` for scroll scrubbing, canvas sequences, and pinned timelines.
  - `framer-motion` for layout transitions and micro-interactions.
  - Central `MotionProvider` managing `tier-a`, `tier-b`, and `tier-c` capabilities.
- **Conversion & Telemetry**:
  - WhatsApp order generator (`wa.me`) with pre-filled SKU, quantity, customer blanks, and fallback copy modal.
  - Event dispatch taxonomy (`order_intent`, `turntable_engage`, `split_drag`, `note_explore`, `ritual_watch`).
  - Schema.org JSON-LD structured data (Organization, Product, AggregateOffer).

---

## 4. Commands & Verification

```bash
# Start development server
pnpm dev

# Run unit and integration tests (76 passing tests)
pnpm test

# Verify production build & static pre-rendering across 17 routes
pnpm build

# TypeScript strict type checking
pnpm type-check

# Code formatting & linting
pnpm format
pnpm lint
```

---

## 5. Documentation Directory

- [`docs/DESIGN_SYSTEM.md`](file:///C:/Projects/thescentpair/docs/DESIGN_SYSTEM.md): Colors, typography, spacing, surfaces, and accessibility rules.
- [`docs/ANIMATION.md`](file:///C:/Projects/thescentpair/docs/ANIMATION.md): Complete animation mechanics and capability tier specifications.
- [`docs/MEDIA.md`](file:///C:/Projects/thescentpair/docs/MEDIA.md): Photography shot list, turntable frames, video encoding, and handover guide.
- [`docs/CONTENT.md`](file:///C:/Projects/thescentpair/docs/CONTENT.md): Typed content schemas, sample datasets, and editorial voice.
- `03_HHS_Master_Document.pdf`: Master project source of truth.

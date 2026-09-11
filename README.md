# HIS & HER'S SCENTS

> _"Two people can share one signature. A fragrance can hold a relationship inside it."_

A cinematic, mobile-first luxury fragrance brand experience built for WhatsApp-based ordering, Cloudinary media delivery, and Phase 2 commerce readiness.

**Primary domain:** `https://thescentpair.com`
**Redirect:** `https://thescentpair.com.ng` → permanent 301 to primary domain

---

## Project Overview

HIS & HER'S SCENTS is a paired fragrance brand. The platform presents two complementary fragrances as a shared signature one for him, one for her united by shared accords. The experience is structured around ten named cinematic moments that unfold as the visitor scrolls.

**Phase 1 (current):** Cinematic brand storytelling, WhatsApp concierge ordering, Cloudinary media delivery, capability-based motion tiers.

**Phase 2 (prepared):** Typed product schemas with integer prices, SKUs, inventory status, and variant tracking are already in place for direct payment gateway integration (Paystack / Flutterwave).

---

## Technology Stack

| Layer           | Choice                                         |
| --------------- | ---------------------------------------------- |
| Framework       | Next.js 16 (App Router, Turbopack)             |
| Language        | TypeScript (strict mode)                       |
| Styling         | Tailwind CSS v3 with custom brand tokens       |
| Animation       | GSAP + ScrollTrigger, Framer Motion            |
| Fonts           | Cormorant Garamond (display), Outfit (body/UI) |
| Media           | Cloudinary (image + video delivery)            |
| Validation      | Zod (content schemas + environment)            |
| Testing         | Vitest (unit/integration), Playwright (E2E)    |
| Package manager | pnpm                                           |

---

## Installation

**Prerequisites:** Node.js 20+, pnpm 9+

```bash
# Clone the repository
git clone <repo-url>
cd thescentpair

# Install dependencies
pnpm install
```

---

## Local Development

```bash
# Start the development server (Turbopack)
pnpm dev
```

Open `http://localhost:3000`.

The site runs fully without any environment variables configured. Media placeholders are shown wherever Cloudinary assets are not yet uploaded. WhatsApp ordering works as long as `NEXT_PUBLIC_WHATSAPP_PHONE` is set.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values you need.

```bash
cp .env.example .env.local
```

| Variable                            | Required           | Description                                                                              |
| ----------------------------------- | ------------------ | ---------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`              | No                 | Full site URL. Defaults to `https://thescentpair.com`.                                   |
| `NEXT_PUBLIC_WHATSAPP_PHONE`        | Yes (for ordering) | WhatsApp Business number, digits only, including country code. Example: `2348012345678`. |
| `NEXT_PUBLIC_TWITTER_URL`           | No                 | Full Twitter / X profile URL.                                                            |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Yes (for media)    | Cloudinary cloud name. Currently `u7scxp7o`.                                             |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN`      | No                 | Domain string for Plausible Analytics. Example: `thescentpair.com`.                      |
| `NEXT_PUBLIC_ANALYTICS_SRC`         | No                 | Override Plausible script URL for self-hosted instances.                                 |
| `NEXT_PUBLIC_GTM_ID`                | No                 | Google Tag Manager container ID. Example: `GTM-XXXXXXX`.                                 |
| `CLOUDINARY_API_KEY`                | No                 | Server-side Cloudinary API key (never exposed to browser).                               |
| `CLOUDINARY_API_SECRET`             | No                 | Server-side Cloudinary API secret (never exposed to browser).                            |
| `FORM_ENDPOINT`                     | No                 | Generic form endpoint URL (Formspree, Basin, etc.) for enquiry and newsletter.           |
| `CONTACT_RECIPIENT_EMAIL`           | No                 | Email address for Resend-delivered enquiry notifications.                                |
| `RESEND_API_KEY`                    | No                 | Resend API key for transactional email delivery.                                         |
| `NEWSLETTER_API_KEY`                | No                 | Optional auth token for newsletter endpoint.                                             |

Environment validation runs at startup via Zod (`src/lib/environment/env.ts`). Invalid values throw with a descriptive message.

---

## Tests

```bash
# Run all unit and integration tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run E2E tests (requires dev server running)
pnpm exec playwright test
```

Tests live in `src/tests/`. The suite covers:

- Content schema validation
- Content repository integrity (duplicate slugs, broken cross-references)
- WhatsApp order URL and message generation
- Analytics event dispatch
- Motion tier detection
- Environment variable validation
- Page route rendering
- Key component rendering (product cards, shell, signature moments)

---

## Production Build

```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Format
pnpm format

# Build
pnpm build

# Start production server locally
pnpm start
```

The build statically pre-renders all content pages. Dynamic routes (`/fragrance/[slug]`, `/pairs/[slug]`, `/stories/[slug]`) are pre-rendered from the content arrays at build time.

---

## Deployment

The project is a standard Next.js App Router application. Deploy to any platform that supports Node.js 20+:

- **Vercel** (recommended): connect the repository, set environment variables in the dashboard, deploy.
- **Other platforms**: run `pnpm build` and serve the `.next` output with `pnpm start`, or export to a static host if all pages are static.

Set all production environment variables in the platform dashboard. Never commit `.env.local`.

The `next.config.ts` includes:

- Permanent 301 redirect from `thescentpair.com.ng` to `thescentpair.com`
- Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- Cloudinary remote image pattern allowlist

---

## Important Dependency Notes

- **GSAP**: Used for scroll-scrubbed timelines and canvas sequences. All GSAP contexts are scoped and reverted in `useEffect` cleanup. Never animate the same CSS property on the same element with both GSAP and Framer Motion.
- **Framer Motion**: Used for layout transitions and drawer micro-interactions only.
- **Lenis**: Smooth scroll provider wrapping the entire layout. Registered with GSAP ScrollTrigger so scrub timelines stay in sync.
- **Zod v4**: Content schemas and environment validation. The `zod/v4/classic` import path is used for compatibility with the current Next.js version.
- **pnpm**: The lockfile is committed. Do not switch to npm or yarn without regenerating it.

---

## Documentation

| File                         | Contents                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------- |
| `docs/CONTENT.md`            | How to add and edit fragrances, pairs, prices, stories, and notes             |
| `docs/ANIMATION.md`          | All ten signature moments, their components, triggers, and tier behaviour     |
| `docs/MEDIA.md`              | Cloudinary folder structure, naming conventions, dimensions, and upload guide |
| `docs/DESIGN_SYSTEM.md`      | Colours, typography, spacing, surfaces, and accessibility rules               |
| `docs/CLOUDINARY.md`         | Full asset inventory with public IDs and required dimensions                  |
| `03_HHS_Master_Document.pdf` | Master project source of truth                                                |

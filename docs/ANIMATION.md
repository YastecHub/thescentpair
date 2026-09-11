# The Ten Signature Moments — Animation Engineering Specification

HIS & HER'S SCENTS features ten named, cinematic motion set pieces engineered across three capability tiers (Tier A, Tier B, Tier C).

---

## 1. Capability-Based Motion Tiers

The site operates on a strict capability model (`src/lib/motion/motion-tier.ts` & `motion-store.ts`):
- **Tier C (Baseline & SSR)**:
  - Instant high-resolution stills, poster frames, standard document flow.
  - Zero pinning, zero continuous RAF loops, zero layout shifts.
  - Active for: SSR HTML, `prefers-reduced-motion: reduce`, `Save-Data` header, slow 2G/3G connections, low CPU/memory devices.
- **Tier B (Reduced Motion)**:
  - Lightweight transforms, CSS transitions, muted looping media.
  - Pinning and heavy particle systems disabled.
- **Tier A (Full Experience)**:
  - 36-frame interactive bottle turntable, ambient gold sillage particle system, scroll-scrubbed ritual video, custom gold pointer cursor, dual-bottle split world.

---

## 2. The Ten Signature Moments

### Moment 01: The Overture
- **Location**: Initial load overlay (`src/components/motion/overture-preloader.tsx`).
- **Mechanic**: Black screen. A single gold hairline travels across and draws the interlocked H&H monogram in one stroke. The bottle silhouette resolves from darkness, followed by a smooth curtain lift.
- **Constraints**: Hard timeout of 2.2s. Stored in `sessionStorage` (`hhs_overture_seen`) so repeat navigation skips immediately. Bypassed in Tier C.

### Moment 02: The Meeting
- **Location**: Homepage Hero (`src/components/motion/meeting-hero.tsx`).
- **Mechanic**: Dual bottles drift in from opposite edges across a black background, catching traveling highlights. They rest almost touching, and a seam of gold light ignites between them, revealing the brand wordmark.

### Moment 03: The Unveiling
- **Location**: Home & Fragrance pages (`src/components/motion/bottle-unveiling.tsx`).
- **Mechanic**: Interactive 36-frame (Tier A) or 18-frame (Tier B) canvas turntable linked to scroll and touch drag. Light travels the glass and engraving as it rotates. Static silhouette in Tier C.

### Moment 04: The Sillage
- **Location**: Ambient throughout the site (`src/components/motion/sillage-ambient.tsx`).
- **Mechanic**: Fine drift of gold particles on HTML5 Canvas following cursor coordinates and scroll velocity.
- **Engineering**: Strictly capped at 36 micro-particles. Passive listeners. Pauses automatically when page is hidden or user is idle for > 4 seconds. Tier A only.

### Moment 05: The Notes
- **Location**: Fragrance pages & Homepage notes (`src/components/motion/fragrance-notes-graph.tsx`).
- **Mechanic**: Gold hairlines radiate from the central bottle out to Top, Heart, and Base notes. Touching or clicking an individual note blooms an editorial spotlight drawer with olfactory family and sensory mood.

### Moment 06: The Ritual
- **Location**: Homepage (`src/components/motion/ritual-film.tsx`).
- **Mechanic**: Edge-to-edge slow-motion fragrance ceremony (wrist application, atomiser press, golden mist, neck gesture). Scroll-scrubbed on Tier A, muted loop on Tier B, still poster on Tier C. Always 100% muted.

### Moment 07: Two Halves
- **Location**: Signature split mechanic (`src/components/motion/two-halves-split.tsx`).
- **Mechanic**: Vertical seam dividing His (midnight/cool) and Her's (warm/rosewood) worlds. Draggable with pointer or keyboard (5% arrow key increments). Rebounds smoothly to 50/50 center.

### Moment 08: The Reveal
- **Location**: Collection & Pairs grids (`src/components/motion/collection-reveal.tsx`).
- **Mechanic**: Staggered gold hairline wipes sweep horizontally across product cards as they scroll into view. Cards elevate slightly on hover with a gold "Discover" badge.

### Moment 09: The Letter
- **Location**: Our Story & Homepage teaser (`src/components/motion/editorial-letter.tsx`).
- **Mechanic**: Line-by-line editorial reveal on scroll. Designated words (*personal*, *connection*, *two*, *story*, *signature*) catch shimmering gold foil lighting.

### Moment 10: The Close
- **Location**: Footer (`src/components/motion/footer-close.tsx`).
- **Mechanic**: A thin line of gold fills across the page width like liquid finding its level. Above it, the gold crest gently breathes with a slow 4-second pulsing glow.

---

## 3. Engineering Rules & Best Practices

1. **Separation of Concerns**:
   - GSAP + ScrollTrigger handles scroll scrubbing, canvas sequences, and pinned timelines.
   - Framer Motion handles route transitions, drawer mounts, and layout micro-interactions.
   - *Never animate the same CSS property on the same element with both GSAP and Framer Motion.*
2. **Memory & Cleanup**:
   - Every GSAP animation is scoped inside `gsap.context()` and reverted in `useEffect` cleanup.
   - RAF particle loops cancel immediately on unmount and pause when `document.hidden`.
3. **Accessibility**:
   - Full compliance with WCAG 2.2 AA. All interactive components support keyboard navigation and ARIA attributes (`aria-valuenow`, `aria-expanded`, `aria-live`).

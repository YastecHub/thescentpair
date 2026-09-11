# Animation Engineering HIS & HER'S SCENTS

The site is built around ten named cinematic moments. Each moment has a defined component, trigger, timing, and behaviour across three capability tiers. This document is the authoritative reference for anyone modifying animation code.

---

## Capability Tiers

The central `MotionProvider` (`src/components/motion/motion-provider.tsx`) detects device capability on mount and assigns one of three tiers. The detection logic lives in `src/lib/motion/motion-tier.ts`.

| Tier       | Condition                                                          | Experience                                                                                    |
| ---------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| **Tier C** | SSR default, `prefers-reduced-motion: reduce`, `Save-Data` header  | Static content only. No GSAP, no canvas loops, no pinning. All content visible immediately.   |
| **Tier B** | Slow/3G connection, device memory < 4 GB, hardware concurrency ≤ 4 | CSS transitions, lightweight transforms, muted looping video. No pinned scroll sequences.     |
| **Tier A** | All other capable devices                                          | Full experience: scroll-scrubbed sequences, canvas turntable, particle system, custom cursor. |

The tier can be downgraded at runtime if FPS drops below threshold. This is handled by `downgradeMotionStore` in `src/lib/motion/motion-store.ts` and fires a `perf_degrade` analytics event.

The tier is read in components via the `useMotionTier()` hook from `motion-provider.tsx`.

**Rule:** Every animated component must check the tier before running any GSAP or canvas code. Tier C must always render readable, accessible content without JavaScript.

---

## Engineering Rules

1. **GSAP context scope:** Every GSAP animation must be created inside `gsap.context()` scoped to the component's root ref. The context must be reverted in the `useEffect` cleanup: `return () => ctx.revert()`.
2. **No dual animation:** Never animate the same CSS property on the same element with both GSAP and Framer Motion simultaneously.
3. **RAF cleanup:** All `requestAnimationFrame` loops must store the frame ID and call `cancelAnimationFrame` on unmount.
4. **Passive listeners:** All scroll and pointer event listeners must use `{ passive: true }`.
5. **ScrollTrigger registration:** Register `ScrollTrigger` inside the component or in a `typeof window !== "undefined"` guard, never at module level.
6. **Lenis sync:** The `LenisProvider` registers Lenis with GSAP's ticker so ScrollTrigger scrub stays in sync with smooth scroll. Do not bypass Lenis with `window.scrollTo` in animated sections.

---

## Moment 01 The Overture

**Component:** `src/components/motion/overture-preloader.tsx`
**Trigger:** Mounts on first page load. Checks `sessionStorage` for `hhs_overture_seen`.
**Active tiers:** Tier A and Tier B. Skipped entirely on Tier C.

### Sequence

| Time    | Stage       | What happens                                                                                                                                       |
| ------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0 ms    | `drawing`   | Black overlay appears. Gold hairline SVG path animates via `strokeDashoffset` from 400 to 0 over 1.2 s, drawing the interlocked H&H monogram.      |
| 800 ms  | `resolving` | Brand crest image fades and scales in from `opacity-0 scale-90 blur-sm` to `opacity-90 scale-100 blur-0`. Radial gold gradient fades in behind it. |
| 1600 ms | `lifting`   | Overlay translates `-translate-y-full` with `opacity-0` over 700 ms the curtain lift.                                                              |
| 2200 ms | `done`      | Component unmounts. `sessionStorage.setItem("hhs_overture_seen", "true")` is written so repeat navigation skips immediately.                       |

### Reduced-motion fallback

Tier C: component returns `null` immediately. No overlay is shown.

### Cleanup

Three `setTimeout` handles are cleared in the `useEffect` return function.

### Adjusting timing safely

Change the three timeout values (`800`, `1600`, `2200`) proportionally. The CSS transition on the curtain lift is `duration-700` if you extend the lift stage, increase this value to match. The SVG stroke animation duration (`1.2s`) is set inline in the `style` prop and must be updated separately.

---

## Moment 02 The Meeting

**Component:** `src/components/motion/meeting-hero.tsx`
**Trigger:** Mounts on the homepage. GSAP timeline runs once on mount (no scroll trigger).
**Active tiers:** Tier A and Tier B. On Tier C, content is visible at full opacity from the start.

### Sequence

| Step | Duration                         | What happens                                                                                                            |
| ---- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 1    | 1.2 s (desktop) / 0.9 s (mobile) | His and Her's bottle SVGs enter from opposite edges (`x: ±90px` desktop, `y: ±40px` mobile) and settle to `x: 0, y: 0`. |
| 2    | 0.9 s                            | Specular highlight rect sweeps across each bottle from `x: -80` to `x: 260`.                                            |
| 3    | 0.7 s                            | Gold seam divider scales in from `scaleY: 0` to `scaleY: 1`.                                                            |
| 4    | 0.8 s                            | Brand wordmark and CTA block fades up from `y: 24, opacity: 0`.                                                         |
| 5    | 0.6 s                            | Scroll cue fades in.                                                                                                    |

### Reduced-motion fallback

Tier C: all elements render at their final visible state. No GSAP runs.

### Cleanup

`gsap.context()` is reverted in the `useEffect` return.

### Adjusting timing safely

All durations are inside the `gsap.timeline()` call. Adjust individual `duration` values. The `stagger: 0.1` on the bottle entrance controls the offset between His and Her's bottles increase it for a more dramatic sequential feel.

---

## Moment 03 The Unveiling

**Component:** `src/components/motion/bottle-unveiling.tsx`
**Trigger:** ScrollTrigger pinned section. Starts when the section reaches the top of the viewport, ends after 120% of viewport height scrolled.
**Active tiers:** Tier A (36 frames), Tier B (18 frames). Tier C shows a static SVG silhouette.

### Mechanic

A `<canvas>` element renders a procedurally drawn bottle. The bottle is redrawn on each scroll update via `ScrollTrigger.onUpdate`. The drawing function (`drawBottleFrame`) renders glass gradients, a liquid fill, a label, a collar ring, and a cap that lifts at the end of the rotation.

Frame index is calculated as `Math.floor(progress * (totalFrames - 1))`. The canvas is only redrawn when the frame index changes, preventing unnecessary work.

### Reduced-motion fallback

Tier C: `<BottleSilhouette>` SVG component is rendered instead of the canvas. No ScrollTrigger is created.

### Cleanup

`gsap.context()` is reverted in the `useEffect` return, which kills the ScrollTrigger and unpins the section.

### Adjusting timing safely

- To change the scroll distance of the pin, adjust the `end: "+=120%"` value. `+=200%` gives a slower, more deliberate rotation.
- To change scrub responsiveness, adjust `scrub: 0.3`. Higher values add more lag/smoothness.
- The cap lift begins at `progress > 0.75` in `drawBottleFrame`. Change `0.75` to adjust when the cap starts lifting.

---

## Moment 04 The Sillage

**Component:** `src/components/motion/sillage-ambient.tsx`
**Trigger:** Continuous RAF loop. Responds to `mousemove`, `touchmove`, and `scroll` events.
**Active tiers:** Tier A only. Returns `null` on Tier B and Tier C.

### Mechanic

A fixed full-viewport `<canvas>` renders 36 gold micro-particles. Each particle has its own position, velocity, life cycle, and opacity curve. Particles drift toward the cursor when within 265px. Scroll velocity displaces particles vertically. The loop pauses when `document.hidden` is true and when the user has been idle for more than 4 seconds.

### Reduced-motion fallback

Component returns `null` on Tier B and Tier C. No canvas is mounted.

### Cleanup

All event listeners are removed and `cancelAnimationFrame` is called in the `useEffect` return. The idle `setTimeout` is also cleared.

### Adjusting timing safely

- `MAX_PARTICLES` (36): increase for a denser trail, decrease for lighter performance impact.
- `maxAlpha` range (`0.12–0.40`): controls how visible the particles are.
- Idle timeout (4000 ms): change the `setTimeout` value in `resetIdleTimer`.
- Attraction force (`0.0004`): increase for stronger cursor magnetism.

---

## Moment 05 The Notes

**Component:** `src/components/motion/fragrance-notes-graph.tsx`
**Trigger:** IntersectionObserver at 20% visibility threshold. Clicking a note button opens the spotlight drawer.
**Active tiers:** All tiers. The interactive drawer works on all tiers. The entrance animation (scale/opacity) is suppressed on Tier C by setting `inView: true` immediately.

### Mechanic

Three rows of note buttons (Top, Heart, Base) surround a central brand crest. Clicking a note sets `activeNote` state, which renders the editorial spotlight drawer with the note's role, description, and mood. The `INGREDIENT_DETAILS` map in the component provides editorial copy for known notes; unknown notes receive a generic fallback.

### Reduced-motion fallback

Tier C: `inView` is set to `true` immediately so the entrance scale animation is skipped. The interactive drawer still works.

### Cleanup

IntersectionObserver is disconnected in the `useEffect` return.

### Adjusting timing safely

The entrance transition is a CSS `transition-all duration-slow` class. Adjust the Tailwind `duration-slow` token in `tailwind.config.ts` to change it globally, or override with an inline style on the specific element.

---

## Moment 06 The Ritual

**Component:** `src/components/motion/ritual-film.tsx`
**Trigger (Tier A):** ScrollTrigger from `top bottom` to `bottom top` scrubs `video.currentTime`.
**Trigger (Tier B):** IntersectionObserver at 25% threshold starts/stops autoplay loop.
**Trigger (Tier C):** Static poster image with manual play button.
**Active tiers:** All tiers with different behaviour.

### Tier A behaviour

The video is paused. `video.currentTime` is set directly from `ScrollTrigger.progress * video.duration` inside a rAF loop. A separate ScrollTrigger handles the scale-in entrance and text reveal. Progress milestones (25%, 50%, 75%, 100%) fire `ritual_progress` analytics events.

### Tier B behaviour

The video autoplays as a muted loop when 25% visible. It pauses when scrolled out of view. If autoplay is blocked by the browser, a play button appears.

### Tier C behaviour

A poster image is shown. A play/pause button allows manual playback.

### Reduced-motion fallback

Tier C shows the poster frame. No video plays automatically.

### Cleanup

Tier A: `gsap.context()` reverted, `cancelAnimationFrame` called, `loadedmetadata` listener removed.
Tier B: IntersectionObserver disconnected, `timeupdate` listener removed.

### Adjusting timing safely

- Tier A entrance: adjust `start: "top 85%"` and `end: "top 30%"` on the scale-in ScrollTrigger.
- Tier A text reveal: adjust `start: "top 65%"` and `end: "top 30%"` on the text ScrollTrigger.
- Tier B intersection threshold: change `{ threshold: 0.25 }` in the IntersectionObserver options.

---

## Moment 07 Two Halves

**Component:** `src/components/motion/two-halves-split.tsx`
**Trigger:** Pointer events (drag) and keyboard events on the slider handle.
**Active tiers:** Tier A and Tier B (interactive). Tier C renders `<StaticSplitWorld>`.

### Mechanic

A CSS `clipPath` on the His World layer is updated in real time as the user drags. The split position is clamped between 15% and 85% to keep both sides readable. On pointer release, a GSAP tween smoothly returns the divider to 50%. Keyboard users can move the divider in 5% increments with arrow keys; it returns to 50% after a 1.2 s delay.

The slider handle has full ARIA attributes: `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`.

### Reduced-motion fallback

Tier C: `<StaticSplitWorld>` renders a static 50/50 layout with both fragrances visible side by side. No dragging, no GSAP.

### Cleanup

The return tween ref (`returnTweenRef`) is killed before starting a new one. No persistent effects to clean up.

### Adjusting timing safely

- Return tween duration: `duration: 0.6` on pointer release, `duration: 0.8` on keyboard release.
- Return tween easing: `ease: "power3.out"` (pointer), `ease: "power2.out"` (keyboard).
- Clamp range: change `Math.min(Math.max(rawPct, 15), 85)` to widen or narrow the draggable range.

---

## Moment 08 The Reveal

**Component:** `src/components/motion/collection-reveal.tsx`
**Trigger:** IntersectionObserver at 15% threshold per card. Staggered by `(index % 4) * 120ms`.
**Active tiers:** All tiers. Tier C sets `revealed: true` immediately with no transition.

### Mechanic

Each card is wrapped in `<CollectionReveal>`. Before reveal, a gold shimmer overlay (`translate-x: -100%`) sits on top of the card content (which is `opacity-0`). When the card enters the viewport, the shimmer sweeps to `translate-x: 100%` and the content fades to `opacity-100`. A gold "Discover" badge appears on hover via CSS group hover.

### Reduced-motion fallback

Tier C: `revealed` is set to `true` immediately. No shimmer overlay is rendered. Cards are visible from the start.

### Cleanup

IntersectionObserver is disconnected after the first intersection.

### Adjusting timing safely

- Shimmer sweep duration: `duration-1000` Tailwind class on the shimmer div.
- Content fade duration: `duration-700` on the content wrapper.
- Stagger delay: `(index % 4) * 120` change `120` to increase or decrease the stagger interval.

---

## Moment 09 The Letter

**Component:** `src/components/motion/editorial-letter.tsx`
**Trigger:** ScrollTrigger per line element. Each `.letter-line` has its own scrubbed animation.
**Active tiers:** Tier A (scroll-scrubbed). Tier B and Tier C show lines at full opacity.

### Mechanic

Each paragraph line starts at `y: 36, opacity: 0.15`. As it scrolls from 85% to 60% of the viewport height, it animates to `y: 0, opacity: 1`. Gold keywords are wrapped in `<span>` elements with a foil text class and a gold drop shadow.

### Reduced-motion fallback

Tier B and Tier C: no GSAP runs. Lines render at full opacity. Gold keyword highlighting still applies.

### Cleanup

`gsap.context()` is reverted in the `useEffect` return.

### Adjusting timing safely

- Per-line trigger: `start: "top 85%"`, `end: "top 60%"`. Move `end` closer to `start` for a snappier reveal; further apart for a slower scrub.
- Scrub responsiveness: `scrub: 0.5`. Increase for more lag.
- Starting opacity: `opacity: 0.15`. Increase toward `0` for a harder fade-in.

---

## Moment 10 The Close

**Component:** `src/components/motion/footer-close.tsx`
**Trigger:** IntersectionObserver at 10% threshold on the container div.
**Active tiers:** All tiers. Tier C sets `filled: true` immediately.

### Mechanic

A 1.5px horizontal line fills from the centre outward via `scale-x-0` → `scale-x-100` with `transform-origin: center`. Above it, the brand crest pulses with a 4-second CSS `animate-pulse` on Tier A and Tier B.

### Reduced-motion fallback

Tier C: `filled` is set to `true` immediately. The line appears at full width. The crest is shown without the pulse animation.

### Cleanup

IntersectionObserver is disconnected after the first intersection.

### Adjusting timing safely

- Fill duration: `duration-[1600ms]` inline Tailwind class on the fill div. Change the ms value.
- Pulse duration: the `animate-pulse` class uses the default Tailwind pulse (2 s). The `duration-[4000ms]` class alongside it overrides the animation duration change this value.
- Intersection threshold: `{ threshold: 0.1 }` increase to trigger later as more of the footer is visible.

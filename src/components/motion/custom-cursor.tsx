"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMotionCapabilities } from "@/components/motion/motion-provider";

type CursorState = "default" | "discover" | "drag" | "rotate";

const LABELS: Record<CursorState, string> = {
  default: "",
  discover: "Discover",
  drag: "Drag",
  rotate: "Rotate",
};

export function CustomCursor() {
  const { canCustomCursor, tier } = useMotionCapabilities();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!canCustomCursor || tier !== "tier-a") return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Show cursor elements
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    let rafId: number;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let currentState: CursorState = "default";

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Read cursor intent from the hovered element or its ancestors
      const target = e.target as HTMLElement | null;
      const cursorAttr = target?.closest("[data-cursor]")?.getAttribute("data-cursor");
      const next = (cursorAttr as CursorState | null) ?? "default";

      if (next !== currentState) {
        currentState = next;
        const hasLabel = next !== "default";
        gsap.to(ring, {
          scale: hasLabel ? 2.2 : 1,
          duration: 0.35,
          ease: "power2.out",
        });
        label.textContent = LABELS[next];
        label.style.opacity = hasLabel ? "1" : "0";
      }
    };

    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const onEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });
    document.addEventListener("mouseenter", onEnter, { passive: true });

    // Lerp ring towards dot position each frame
    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      gsap.set(dot, { x: mouseX, y: mouseY });
      gsap.set(ring, { x: ringX, y: ringY });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      // Restore native cursor
      document.documentElement.style.cursor = "";
    };
  }, [canCustomCursor, tier]);

  // Hide native cursor globally only when custom cursor is active
  useEffect(() => {
    if (!canCustomCursor || tier !== "tier-a") return;
    document.documentElement.style.cursor = "none";
    return () => {
      document.documentElement.style.cursor = "";
    };
  }, [canCustomCursor, tier]);

  // Don't render on SSR or non-qualifying devices
  if (!canCustomCursor || tier !== "tier-a") return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-cursor">
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-gold-300"
        style={{ opacity: 0, willChange: "transform" }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gold-300/70"
        style={{ opacity: 0, willChange: "transform" }}
      >
        <span
          ref={labelRef}
          className="select-none font-sans text-[8px] font-semibold tracking-[0.2em] text-gold-300 uppercase transition-opacity duration-fast"
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  );
}

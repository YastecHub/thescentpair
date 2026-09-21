"use client";

import React, { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { useMotionTier } from "@/components/motion/motion-provider";
import { StaticSplitWorld } from "@/components/sections/static-split-world";
import { ProductImage } from "@/components/media/responsive-media";
import { ButtonLink } from "@/components/ui/button-link";
import { getFragranceBySlug, getSharedNotes } from "@/lib/content/repository";
import type { Pair } from "@/lib/content/schemas";

interface TwoHalvesSplitProps {
  pair: Pair;
}

export function TwoHalvesSplit({ pair }: TwoHalvesSplitProps) {
  const tier = useMotionTier();
  const his = getFragranceBySlug(pair.hisFragranceSlug);
  const hers = getFragranceBySlug(pair.hersFragranceSlug);
  const sharedNotes = getSharedNotes(pair);

  const [splitPos, setSplitPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const returnTweenRef = useRef<gsap.core.Tween | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawPct = ((clientX - rect.left) / rect.width) * 100;
    // Clamp between 15% and 85% to preserve readable copy on both sides
    const clamped = Math.min(Math.max(rawPct, 15), 85);
    setSplitPos(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Kill any active return tween
    if (returnTweenRef.current) {
      returnTweenRef.current.kill();
    }
    setIsDragging(true);
    setShowHint(false);
    updatePosition(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    // Smoothly rebound divider to 50% on release
    const targetObj = { pos: splitPos };
    returnTweenRef.current = gsap.to(targetObj, {
      pos: 50,
      duration: 0.6,
      ease: "power3.out",
      onUpdate: () => {
        setSplitPos(targetObj.pos);
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newPos = splitPos;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      newPos = Math.max(splitPos - 5, 15);
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      newPos = Math.min(splitPos + 5, 85);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      newPos = 50;
    } else {
      return;
    }

    setShowHint(false);
    if (returnTweenRef.current) returnTweenRef.current.kill();

    setSplitPos(newPos);

    // After keyboard interaction, gently return after a 1.2s delay
    const targetObj = { pos: newPos };
    returnTweenRef.current = gsap.to(targetObj, {
      pos: 50,
      duration: 0.8,
      delay: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        setSplitPos(targetObj.pos);
      },
    });
  };

  // If Tier C, render the static accessible 50/50 world directly
  if (tier === "tier-c") {
    return <StaticSplitWorld pair={pair} useCollectionImages />;
  }

  return (
    <section
      className="relative my-8 overflow-hidden border border-onyx-700 bg-onyx-900"
      aria-labelledby="split-world-title"
      data-motion="two-halves"
    >
      {/* Interactive Container */}
      <div
        ref={containerRef}
        className="relative min-h-[580px] w-full select-none md:min-h-[640px]"
        data-cursor="drag"
        style={{ touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Layer 1: Her World (Base Background) */}
        <div
          className="absolute inset-0 flex items-center justify-end bg-[#221316] p-4 text-right sm:p-6 md:p-12"
          aria-hidden={splitPos > 80}
        >
          {/* Her's ambient tint & pattern */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(124,74,69,0.35),transparent_70%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 flex w-[calc(50%-1.25rem)] max-w-[420px] flex-col items-end md:w-auto">
            <span className="type-eyebrow text-[#D9BC6A] text-[10px] sm:text-xs">
              Her World
            </span>
            <h3 className="mt-1 font-display text-xl text-parchment sm:text-2xl md:mt-2 md:text-5xl">
              {hers?.name}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-parchment/75 sm:mt-2 sm:text-sm md:mt-3 md:text-base">
              {hers?.tagline}
            </p>
            {hers ? (
              <ProductImage
                media={{
                  publicId: hers.media.heroLight,
                  alt: `${hers.name} fragrance bottle`,
                }}
                ratio="4 / 5"
                className="mt-3 h-40 w-28 max-w-full sm:mt-6 sm:h-56 sm:w-36 md:h-72 md:w-44"
              />
            ) : null}
            <p className="mt-2 text-[10px] tracking-wider uppercase text-gold-300 sm:mt-4 sm:text-xs">
              {hers?.family.replace("-", " ")}
            </p>
          </div>
        </div>

        {/* Layer 2: His World (Clipped Overlay via clipPath) */}
        <div
          className="absolute inset-0 flex items-center justify-start bg-[#121A24] p-4 text-left sm:p-6 md:p-12"
          style={{
            clipPath: `polygon(0 0, ${splitPos}% 0, ${splitPos}% 100%, 0 100%)`,
          }}
          aria-hidden={splitPos < 20}
        >
          {/* His ambient tint & pattern */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(27,36,48,0.55),transparent_70%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 flex w-[calc(50%-1.25rem)] max-w-[420px] flex-col items-start md:w-auto">
            <span className="type-eyebrow text-gold-300 text-[10px] sm:text-xs">
              His World
            </span>
            <h3 className="mt-1 font-display text-xl text-parchment sm:text-2xl md:mt-2 md:text-5xl">
              {his?.name}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-parchment/75 sm:mt-2 sm:text-sm md:mt-3 md:text-base">
              {his?.tagline}
            </p>
            {his ? (
              <ProductImage
                media={{
                  publicId: his.media.heroLight,
                  alt: `${his.name} fragrance bottle`,
                }}
                ratio="4 / 5"
                className="mt-3 h-40 w-28 max-w-full sm:mt-6 sm:h-56 sm:w-36 md:h-72 md:w-44"
              />
            ) : null}
            <p className="mt-2 text-[10px] tracking-wider uppercase text-gold-300 sm:mt-4 sm:text-xs">
              {his?.family.replace("-", " ")}
            </p>
          </div>
        </div>

        {/* Center Shared Accord Banner (Always readable in DOM) */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center rounded-none border border-gold-300/40 bg-onyx-900/90 px-4 py-2.5 text-center backdrop-blur-md sm:bottom-6 sm:px-6 sm:py-3">
          <p
            id="split-world-title"
            className="type-eyebrow text-gold-300 text-[10px] sm:text-xs"
          >
            Shared Accord
          </p>
          <p className="mt-0.5 font-display text-base text-parchment sm:mt-1 sm:text-xl md:text-2xl">
            {sharedNotes.map((note) => note.name).join(" + ")}
          </p>
          <div className="pointer-events-auto mt-2 sm:mt-3">
            <ButtonLink href={`/pairs/${pair.slug}`} variant="secondary">
              Explore Pair
            </ButtonLink>
          </div>
        </div>

        {/* Gold Divider Line & Accessible Slider Thumb */}
        <div
          className="absolute inset-y-0 z-40 w-1 -translate-x-1/2 cursor-ew-resize bg-[var(--foil)] shadow-[0_0_15px_rgba(217,188,106,0.6)]"
          style={{ left: `${splitPos}%` }}
        >
          {/* Focusable Slider Handle */}
          <div
            role="slider"
            tabIndex={0}
            aria-label="His and Her's scent balance slider"
            aria-valuenow={Math.round(splitPos)}
            aria-valuemin={15}
            aria-valuemax={85}
            aria-valuetext={`${Math.round(splitPos)}% His, ${Math.round(100 - splitPos)}% Her's`}
            onKeyDown={handleKeyDown}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-gold-300 bg-onyx-900 shadow-[0_0_12px_rgba(240,226,184,0.6)] transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2 focus:ring-offset-onyx-900"
          >
            {/* Handle icon (two arrows) */}
            <svg
              className="h-5 w-5 text-gold-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 3 12 9 6" />
            </svg>
          </div>
        </div>

        {/* Visual Hint for touch/first-time visitors */}
        {showHint ? (
          <div
            className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 z-30 rounded border border-onyx-700 bg-onyx-900/80 px-4 py-1.5 text-xs tracking-wider text-parchment/80 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          >
            Drag or use arrow keys to balance
          </div>
        ) : null}
      </div>
    </section>
  );
}

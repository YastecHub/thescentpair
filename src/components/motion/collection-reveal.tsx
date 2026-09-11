"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMotionTier } from "./motion-provider";

interface CollectionRevealProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
}

export function CollectionReveal({
  children,
  index = 0,
  className = "",
}: CollectionRevealProps) {
  const tier = useMotionTier();
  const [revealed, setRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tier === "tier-c") {
      setRevealed(true);
      return;
    }

    const el = cardRef.current;
    if (!el) return;

    const delay = (index % 4) * 120; // Staggered reveal

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setRevealed(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [tier, index]);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-transform duration-slow hover:-translate-y-1.5 ${className}`}
      data-testid="collection-reveal"
    >
      {/* Gold Wipe Effect (Only on Tier A & B before reveal) */}
      {tier !== "tier-c" ? (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-1000 ${
            revealed ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Shimmer sweep */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-gold-300/40 to-transparent transition-transform duration-1000 ease-out ${
              revealed ? "translate-x-full" : "-translate-x-full"
            }`}
          />
        </div>
      ) : null}

      {/* Child Card Content */}
      <div
        className={`transition-opacity duration-700 ${
          revealed || tier === "tier-c" ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>

      {/* Discover Gold Badge on Hover */}
      <div className="pointer-events-none absolute bottom-4 right-4 z-20 translate-y-2 opacity-0 transition-all duration-fast group-hover:translate-y-0 group-hover:opacity-100">
        <span className="rounded-full border border-gold-300 bg-onyx-900/90 px-3 py-1 font-display text-[10px] tracking-[0.25em] text-gold-200 uppercase shadow-[0_0_12px_rgba(217,188,106,0.35)] backdrop-blur-sm">
          Discover
        </span>
      </div>
    </div>
  );
}

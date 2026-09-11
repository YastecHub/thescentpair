"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMotionTier } from "./motion-provider";

export function FooterClose() {
  const tier = useMotionTier();
  const [filled, setFilled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tier === "tier-c") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Tier-c fallback: reveal immediately without intersection observer
      setFilled(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setFilled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [tier]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center pt-16 pb-8 text-center"
      data-testid="footer-close"
    >
      {/* Liquid gold hairline filling across the width */}
      <div className="relative h-[1.5px] w-full max-w-5xl overflow-hidden bg-onyx-800">
        <div
          className={`h-full bg-gradient-to-r from-transparent via-gold-300 to-transparent transition-all duration-[1600ms] ease-out ${
            filled || tier === "tier-c"
              ? "scale-x-100 opacity-100"
              : "scale-x-0 opacity-0"
          }`}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Breathing Gold Monogram / Crest */}
      <div className="mt-12 flex flex-col items-center">
        <div
          className={`relative h-14 w-14 transition-transform duration-slow ${
            tier === "tier-a" || tier === "tier-b"
              ? "animate-pulse duration-[4000ms] drop-shadow-[0_0_20px_rgba(217,188,106,0.45)]"
              : "drop-shadow-[0_0_12px_rgba(217,188,106,0.3)]"
          }`}
        >
          <Image
            src="/brand/logo-crest.png"
            alt="His & Her's Scents Crest"
            fill
            sizes="56px"
            className="object-contain"
          />
        </div>

        {/* Wordmark */}
        <span className="mt-4 font-display text-lg font-semibold tracking-[0.25em] text-foil uppercase block">
          His &amp; Her&apos;s
        </span>

        {/* Tagline */}
        <p className="mt-1 text-xs font-sans tracking-[0.35em] text-gold-300 uppercase">
          Signature scents, made for two.
        </p>
      </div>
    </div>
  );
}

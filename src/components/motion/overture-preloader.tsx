"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { buildCloudinaryImageUrl } from "@/lib/cloudinary/url";
import { useMotionTier } from "./motion-provider";

const bottleImages = [
  {
    publicId: "hhs/fragrance/midnight-oath/hero-light",
    liquid: "from-amber-300 via-amber-500 to-orange-700",
  },
  {
    publicId: "hhs/fragrance/velvet-vow/hero-light",
    liquid: "from-rose-200 via-rose-400 to-fuchsia-700",
  },
] as const;

export function OverturePreloader() {
  const tier = useMotionTier();
  const [active, setActive] = useState(false);
  const [stage, setStage] = useState<
    "drawing" | "resolving" | "lifting" | "done"
  >("drawing");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on Tier A or Tier B; instantly bypass on Tier C or SSR
    if (tier === "tier-c") {
      return;
    }

    // Activate the overture
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Animation activation: standard mount-based state initialization
    setActive(true);

    // Sequence timing (total 5 seconds)
    // 0ms: Hairline draws monogram
    // 1200ms: Bottles resolve out of darkness
    // 2400ms: Liquid reaches its presentation level
    // 3900ms: Curtain lifts
    // 5000ms: Complete and unmount
    const tResolve = setTimeout(() => {
      setStage("resolving");
    }, 1200);

    const tLift = setTimeout(() => {
      setStage("lifting");
    }, 3900);

    const tDone = setTimeout(() => {
      setStage("done");
      setActive(false);
    }, 5000);

    return () => {
      clearTimeout(tResolve);
      clearTimeout(tLift);
      clearTimeout(tDone);
    };
  }, [tier]);

  if (!active || stage === "done") {
    return null;
  }

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="His & Her's Scents Loading Experience"
      className={`pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        stage === "lifting"
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* His and Hers bottles fill with liquid before the reveal. */}
      <div
        className={`relative z-[1] flex items-end gap-5 sm:gap-8 transition-all duration-1000 ease-out ${
          stage === "resolving" || stage === "lifting"
            ? "scale-100 opacity-100 blur-0"
            : "scale-90 opacity-0 blur-sm"
        }`}
      >
        {bottleImages.map((bottle) => (
          <div key={bottle.publicId} className="flex flex-col items-center">
            <div className="relative aspect-[4/5] w-28 overflow-hidden sm:w-36">
              <Image
                src={
                  buildCloudinaryImageUrl(
                    bottle.publicId,
                    "f_auto,q_auto:good,c_limit,w_480",
                  ) ?? "/brand/logo-lockup.png"
                }
                alt="Perfume bottle"
                fill
                sizes="(min-width: 640px) 144px, 112px"
                className="z-0 object-contain mix-blend-screen"
                priority
                unoptimized
              />
              <div
                className={`pointer-events-none absolute inset-x-[18%] bottom-[8%] z-[1] overflow-hidden rounded-[35%_35%_24%_24%] border-t-2 border-gold-100 bg-gradient-to-t shadow-[0_0_24px_rgba(245,158,11,0.8)] transition-[height] duration-[1800ms] ease-out ${
                  stage === "drawing"
                    ? "h-0"
                    : stage === "resolving"
                      ? "h-[34%]"
                      : "h-[68%]"
                } ${bottle.liquid}`}
              />
              <div
                className={`pointer-events-none absolute inset-x-[17%] z-[2] h-3 -translate-y-1/2 rounded-[50%] border-2 border-gold-50 bg-gold-100 shadow-[0_0_18px_rgba(255,244,190,0.95)] transition-[bottom] duration-[1800ms] ease-out ${
                  stage === "drawing"
                    ? "bottom-0 opacity-0"
                    : stage === "resolving"
                      ? "bottom-[42%] opacity-100"
                      : "bottom-[76%] opacity-100"
                }`}
              />
              <div className="pointer-events-none absolute inset-y-2 left-2 z-[3] w-px bg-white/35" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

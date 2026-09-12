"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useMotionTier } from "./motion-provider";

const bottleImages = [
  {
    label: "His",
    src: "/brand/bottles/midnight-oath.png",
    boxClass: "w-24 h-52 sm:w-28 sm:h-60",
    liquidGradient: "from-amber-950 via-amber-500 to-amber-200",
    midFill: "h-[36%]",
    maxFill: "h-[68%]",
  },
  {
    label: "Hers",
    src: "/brand/bottles/velvet-vow.png",
    boxClass: "w-28 h-44 sm:w-32 sm:h-52",
    liquidGradient: "from-rose-950 via-rose-500 to-rose-200",
    midFill: "h-[34%]",
    maxFill: "h-[68%]",
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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-onyx-900 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        stage === "lifting"
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* Split curtains give the reveal a physical, theatrical finish. */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-1/2 origin-left bg-onyx-900 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          stage === "lifting" ? "-translate-x-full" : "translate-x-0"
        }`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-1/2 origin-right bg-onyx-900 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          stage === "lifting" ? "translate-x-full" : "translate-x-0"
        }`}
        aria-hidden="true"
      />

      {/* Background radial gold warmth */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,188,106,0.12)_0%,rgba(8,7,6,0)_70%)] transition-opacity duration-1000 ${
          stage === "resolving" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* His and Hers bottles fill with liquid before the reveal. */}
      <div
        className={`relative z-[1] flex items-end gap-6 sm:gap-10 transition-all duration-1000 ease-out ${
          stage === "resolving" || stage === "lifting"
            ? "scale-100 opacity-100 blur-0"
            : "scale-90 opacity-0 blur-sm"
        }`}
      >
        {bottleImages.map((bottle) => (
          <div key={bottle.label} className="flex flex-col items-center">
            {/* The exact bottle flacon — no background card, no photo scene */}
            <div className={`relative ${bottle.boxClass} select-none`}>
              {/* Soft ambient contact shadow under the bottle base */}
              <div
                className="pointer-events-none absolute -bottom-2 inset-x-2 h-4 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,188,106,0.3)_0%,rgba(0,0,0,0.85)_60%,transparent_80%)] blur-[2px]"
                aria-hidden="true"
              />

              {/* 1. Base translucent bottle silhouette */}
              <Image
                src={bottle.src}
                alt={`${bottle.label} perfume bottle`}
                fill
                sizes="(min-width: 640px) 144px, 112px"
                className="z-0 object-contain brightness-75 contrast-125 opacity-40 transition-opacity duration-1000"
                priority
                unoptimized
              />

              {/* 2. Liquid fill strictly masked to the exact bottle silhouette */}
              <div
                className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
                style={{
                  WebkitMaskImage: `url(${bottle.src})`,
                  maskImage: `url(${bottle.src})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center bottom",
                  maskPosition: "center bottom",
                }}
                aria-hidden="true"
              >
                {/* Rising luminous liquid volume */}
                <div
                  className={`absolute inset-x-0 bottom-0 bg-gradient-to-t ${bottle.liquidGradient} transition-[height] duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    stage === "drawing"
                      ? "h-0"
                      : stage === "resolving"
                        ? bottle.midFill
                        : bottle.maxFill
                  }`}
                  style={{
                    mixBlendMode: "screen",
                  }}
                >
                  {/* Glowing liquid surface meniscus */}
                  <div
                    className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_12px_2px_rgba(255,255,255,0.95)] transition-opacity duration-700 ${
                      stage === "drawing" ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </div>
              </div>

              {/* 3. Front bottle overlay for crisp metallic cap, label typography, and crystal highlights */}
              <Image
                src={bottle.src}
                alt=""
                aria-hidden="true"
                fill
                sizes="(min-width: 640px) 144px, 112px"
                className="pointer-events-none z-[2] object-contain opacity-90 transition-opacity duration-1000"
                style={{
                  mixBlendMode: "screen",
                }}
                unoptimized
              />
            </div>
            <span className="mt-4 font-display text-sm tracking-[0.28em] text-gold-300 uppercase">
              {bottle.label}
            </span>
          </div>
        ))}
      </div>

      {/* Gold hairline monogram floats above the filling bottles. */}
      <div className="absolute z-[2] flex -translate-y-28 flex-col items-center sm:-translate-y-36">
        <svg
          viewBox="0 0 160 160"
          className="h-28 w-28 sm:h-36 sm:w-36 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="gold-hairline"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f0e2b8" />
              <stop offset="50%" stopColor="#d9bc6a" />
              <stop offset="100%" stopColor="#997a2d" />
            </linearGradient>
            <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Interlocked H&H Monogram Hairline Path */}
          <path
            d="M40 30 L40 130 M40 80 L80 80 M80 30 L80 130 M80 80 L120 80 M120 30 L120 130"
            stroke="url(#gold-hairline)"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#gold-glow)"
            className="animate-overture-stroke"
            style={{
              strokeDasharray: 400,
              strokeDashoffset: 400,
              animation:
                "overtureStroke 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards",
            }}
          />
        </svg>

        <span
          className={`mt-6 font-display text-sm tracking-[0.35em] text-gold-300 uppercase transition-opacity duration-700 ${
            stage === "resolving" || stage === "lifting"
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          His &amp; Her&apos;s
        </span>
      </div>

      {/* Liquid gold bottom progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-onyx-800">
        <div
          className="h-full bg-gradient-to-r from-transparent via-gold-300 to-gold-100 transition-all duration-[2000ms] ease-out"
          style={{
            width:
              stage === "lifting"
                ? "95%"
                : stage === "resolving"
                  ? "75%"
                  : "40%",
          }}
        />
      </div>

    </div>
  );
}

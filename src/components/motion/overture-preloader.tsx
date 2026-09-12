"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { buildCloudinaryImageUrl } from "@/lib/cloudinary/url";
import { useMotionTier } from "./motion-provider";

const bottleImages = [
  {
    label: "His",
    publicId: "hhs/fragrance/midnight-oath/hero-light",
  },
  {
    label: "Hers",
    publicId: "hhs/fragrance/velvet-vow/hero-light",
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
        className={`relative z-[1] flex items-end gap-5 sm:gap-8 transition-all duration-1000 ease-out ${
          stage === "resolving" || stage === "lifting"
            ? "scale-100 opacity-100 blur-0"
            : "scale-90 opacity-0 blur-sm"
        }`}
      >
        {bottleImages.map((bottle) => (
          <div key={bottle.label} className="flex flex-col items-center">
            <div className="relative aspect-[4/5] w-28 overflow-hidden bg-onyx-800 shadow-[0_16px_40px_rgba(0,0,0,0.38)] sm:w-36">
              <Image
                src={
                  buildCloudinaryImageUrl(
                    bottle.publicId,
                    "f_auto,q_auto:good,c_limit,w_480",
                  ) ?? "/brand/logo-lockup.png"
                }
                alt={`${bottle.label} perfume bottle`}
                fill
                sizes="(min-width: 640px) 144px, 112px"
                className="z-0 object-cover"
                priority
                unoptimized
              />
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-gold-300/25 via-gold-200/5 to-transparent transition-[height] duration-[1800ms] ease-out ${
                  stage === "drawing"
                    ? "h-0"
                    : stage === "resolving"
                      ? "h-[28%]"
                      : "h-[52%]"
                }`}
              />
            </div>
            <span className="mt-3 font-display text-sm tracking-[0.28em] text-gold-300 uppercase">
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

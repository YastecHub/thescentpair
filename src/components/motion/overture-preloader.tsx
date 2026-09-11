"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useMotionTier } from "./motion-provider";

const SESSION_KEY = "hhs_overture_seen";

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

    // Check if previously played in this browser session
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        return;
      }
    } catch {
      // Storage unavailable fallback
      return;
    }

    // Activate the overture
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Animation activation: standard mount-based state initialization
    setActive(true);

    // Sequence timing (total <= 2.3 seconds)
    // 0ms: Hairline draws monogram
    // 800ms: Bottle resolves out of darkness
    // 1600ms: Curtain lifts
    // 2200ms: Complete and unmount
    const tResolve = setTimeout(() => {
      setStage("resolving");
    }, 800);

    const tLift = setTimeout(() => {
      setStage("lifting");
    }, 1600);

    const tDone = setTimeout(() => {
      setStage("done");
      setActive(false);
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // Ignore
      }
    }, 2200);

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
      {/* Background radial gold warmth */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,188,106,0.12)_0%,rgba(8,7,6,0)_70%)] transition-opacity duration-1000 ${
          stage === "resolving" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Bottle resolving out of the darkness */}
      <div
        className={`relative h-40 w-40 sm:h-52 sm:w-52 transition-all duration-1000 ease-out ${
          stage === "resolving" || stage === "lifting"
            ? "scale-100 opacity-90 blur-0"
            : "scale-90 opacity-0 blur-sm"
        }`}
      >
        <Image
          src="/brand/logo-crest.png"
          alt="His & Her's Scents Crest"
          fill
          sizes="208px"
          className="object-contain drop-shadow-[0_0_35px_rgba(217,188,106,0.45)]"
          priority
        />
      </div>

      {/* Single gold hairline traveling across and drawing monogram */}
      <div className="absolute flex flex-col items-center">
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

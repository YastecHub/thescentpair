"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionTier } from "./motion-provider";

const safeRegisterScrollTrigger = () => {
  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    gsap.registerPlugin(ScrollTrigger);
  }
};

interface RitualFilmProps {
  className?: string;
}

export function RitualFilm({ className = "" }: RitualFilmProps) {
  const tier = useMotionTier();
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tier !== "tier-a" || !sectionRef.current) {
      return;
    }

    safeRegisterScrollTrigger();

    const ctx = gsap.context(() => {
      // Scroll-driven cinematic sequence
      gsap.fromTo(
        videoContainerRef.current,
        { scale: 0.95, opacity: 0.7 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [tier]);

  return (
    <section
      ref={sectionRef}
      aria-label="The Fragrance Ritual"
      className={`relative w-full overflow-hidden bg-onyx-900 py-20 md:py-32 ${className}`}
      data-testid="ritual-film"
    >
      <div className="mx-auto max-w-content px-5 md:px-8">
        {/* Full-bleed cinematic frame */}
        <div
          ref={videoContainerRef}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-none border border-onyx-700 bg-black shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Ambient atmosphere & backlighting */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-onyx-900 via-transparent to-onyx-900/60 pointer-events-none" />
          <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(217,188,106,0.1)_0%,rgba(0,0,0,0.6)_80%)] pointer-events-none" />

          {/* Cinematic Poster / Visual */}
          <div className="relative h-full w-full">
            <Image
              src="/brand/logo-lockup.png"
              alt="The Ritual: Slow-motion mist blooming in gold light"
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-contain p-8 md:p-16 opacity-85 transition-transform duration-slow hover:scale-105"
              priority={false}
            />
          </div>

          {/* Editorial overlay */}
          <div
            ref={textRef}
            className="absolute bottom-6 left-6 right-6 z-20 md:bottom-12 md:left-12 md:max-w-xl"
          >
            <span className="type-eyebrow text-xs tracking-[0.35em] text-gold-300 uppercase block mb-2">
              Moment 06 · The Ritual
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foil leading-tight">
              A fragrance becomes personal in the moment it meets the skin.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-parchment/70 font-sans tracking-wide">
              The gesture. The pulse point. The mist blooming gold against darkness — two scents meeting to form one shared memory.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

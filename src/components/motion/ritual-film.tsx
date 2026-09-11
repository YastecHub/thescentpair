"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useMotionTier } from "./motion-provider";
import { buildCloudinaryImageUrl } from "@/lib/cloudinary/url";

/**
 * RitualFilm — Cinematic editorial section
 *
 * Since no video is available yet, this renders the ritual cinematic still
 * with a slow Ken Burns zoom + parallax scroll effect that feels like a
 * premium fragrance commercial freeze-frame.
 *
 * When a real video is uploaded to Cloudinary at `hhs/video/ritual-film`,
 * uncomment the video path below to switch to the scroll-scrubbed video mode.
 */

const RITUAL_IMAGE_ID = "hhs/hero/ritual-cinematic";
// const VIDEO_PUBLIC_ID = "hhs/video/ritual-film"; // Uncomment when video is ready

interface RitualFilmProps {
  className?: string;
}

export function RitualFilm({ className = "" }: RitualFilmProps) {
  const tier = useMotionTier();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const ritualSrc = buildCloudinaryImageUrl(
    RITUAL_IMAGE_ID,
    "f_auto,q_auto:good,c_fill,w_1600,h_900,g_auto",
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── GSAP Scroll Animations ──
  useEffect(() => {
    if (tier === "tier-c" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Container scale-in entrance
      gsap.fromTo(
        containerRef.current,
        { scale: 0.94, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 30%",
            scrub: 1,
          },
        },
      );

      // Ken Burns zoom on the image
      gsap.fromTo(
        imageRef.current,
        { scale: 1 },
        {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // Text reveal
      gsap.fromTo(
        textRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "top 30%",
            scrub: 1,
          },
        },
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
        <div
          ref={containerRef}
          className="relative aspect-[16/9] w-full overflow-hidden border border-onyx-700 bg-black shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Cinematic overlays */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-onyx-900 via-transparent to-onyx-900/50" />
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(217,188,106,0.08)_0%,rgba(0,0,0,0.55)_80%)]" />

          {/* Cinematic film grain overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            }}
            aria-hidden="true"
          />

          {/* The ritual image with Ken Burns zoom */}
          <div
            ref={imageRef}
            className="absolute inset-0"
          >
            {/* Always render gradient as SSR-safe base */}
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(217,188,106,0.12),transparent_70%)]" />

            {/* Real image overlaid after mount */}
            {mounted && ritualSrc ? (
              <Image
                src={ritualSrc}
                alt="The fragrance ritual — a mist of gold against darkness"
                fill
                className="object-cover opacity-80"
                sizes="(min-width: 1024px) 80vw, 100vw"
                unoptimized
              />
            ) : null}
          </div>

          {/* Letterbox bars for cinematic feel */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[6%] bg-black/60" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[6%] bg-black/60" />

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

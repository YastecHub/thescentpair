"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useMotionTier } from "@/components/motion/motion-provider";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow, BodyText } from "@/components/typography/typography";
import { buildCloudinaryImageUrl } from "@/lib/cloudinary/url";

interface MeetingHeroProps {
  hisName?: string;
  hersName?: string;
}

export function MeetingHero({
  hisName = "Midnight Oath",
  hersName = "Velvet Vow",
}: MeetingHeroProps) {
  const tier = useMotionTier();
  const rootRef = useRef<HTMLDivElement>(null);
  const hisImgRef = useRef<HTMLDivElement>(null);
  const hersImgRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  const hisHeroSrc = buildCloudinaryImageUrl(
    "hhs/fragrance/midnight-oath/hero-dark",
    "f_auto,q_auto:good,c_fill,w_600,h_800,g_center",
  );
  const hersHeroSrc = buildCloudinaryImageUrl(
    "hhs/fragrance/velvet-vow/hero-dark",
    "f_auto,q_auto:good,c_fill,w_600,h_800,g_center",
  );
  const pairCompositionSrc = buildCloudinaryImageUrl(
    "hhs/hero/pair-composition",
    "f_auto,q_auto:good,c_fill,w_1200,h_1200,g_center",
  );

  useEffect(() => {
    if (tier === "tier-c") return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const bottleOffset = isMobile ? 40 : 90;

      gsap.set(hisImgRef.current, {
        x: isMobile ? 0 : -bottleOffset,
        y: isMobile ? -bottleOffset : 0,
        opacity: 0,
      });
      gsap.set(hersImgRef.current, {
        x: isMobile ? 0 : bottleOffset,
        y: isMobile ? bottleOffset : 0,
        opacity: 0,
      });
      gsap.set(seamRef.current, { scaleY: 0, opacity: 0 });
      gsap.set(contentRef.current, { y: 24, opacity: 0 });
      gsap.set(scrollCueRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      tl.to(hisImgRef.current, { x: 0, y: 0, opacity: 1, duration: 1.4 }, 0)
        .to(
          hersImgRef.current,
          { x: 0, y: 0, opacity: 1, duration: 1.4 },
          0.15,
        )
        .to(
          seamRef.current,
          { scaleY: 1, opacity: 1, duration: 0.8, ease: "power2.inOut" },
          0.7,
        )
        .to(
          contentRef.current,
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          0.6,
        )
        .to(
          scrollCueRef.current,
          { opacity: 1, duration: 0.6 },
          1.4,
        );
    }, rootRef);

    return () => ctx.revert();
  }, [tier]);

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-onyx-900 py-20 md:py-28"
      aria-labelledby="home-title"
      data-testid="meeting-hero"
    >
      {/* Background ambient layer */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(176,141,58,0.08),transparent_70%),radial-gradient(ellipse_at_60%_60%,rgba(217,188,106,0.05),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="grid w-full max-w-content grid-cols-1 items-center gap-10 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        {/* Left Column: Brand Typography & Call to Action */}
        <div
          ref={contentRef}
          className="opacity-100"
        >
          <Eyebrow>His &amp; Her&apos;s Scents</Eyebrow>
          <h1
            id="home-title"
            className="type-display mt-4 max-w-[12ch] text-foil"
          >
            Signature scents, made for two.
          </h1>
          <BodyText className="mt-5 max-w-readable type-supporting">
            Two distinct fragrances. Two complementary identities. One shared
            signature held inside a relationship.
          </BodyText>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/collection" variant="primary">
              Explore collection
            </ButtonLink>
            <ButtonLink href="/pairs">Explore pairs</ButtonLink>
          </div>
        </div>

        {/* Right Column: Real Product Photo Composition */}
        <div className="relative flex w-full items-center justify-center p-2 sm:p-6">
          {/* Use the pair composition image if available, fallback to side-by-side */}
          {pairCompositionSrc ? (
            <div className="relative w-full max-w-[560px] overflow-hidden border border-onyx-700/80 bg-onyx-800/60 backdrop-blur-sm">
              {/* Ambient inner glow */}
              <div
                className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-onyx-900/30 to-onyx-900/80"
                aria-hidden="true"
              />
              {/* Corner hairlines */}
              <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
                <div className="absolute top-0 left-0 h-6 w-px bg-gold-300/40" />
                <div className="absolute top-0 left-0 h-px w-6 bg-gold-300/40" />
                <div className="absolute top-0 right-0 h-6 w-px bg-gold-300/40" />
                <div className="absolute top-0 right-0 h-px w-6 bg-gold-300/40" />
                <div className="absolute bottom-0 left-0 h-6 w-px bg-gold-300/40" />
                <div className="absolute bottom-0 left-0 h-px w-6 bg-gold-300/40" />
                <div className="absolute bottom-0 right-0 h-6 w-px bg-gold-300/40" />
                <div className="absolute bottom-0 right-0 h-px w-6 bg-gold-300/40" />
              </div>

              <Image
                src={pairCompositionSrc}
                alt={`${hisName} and ${hersName} bottles — The Meeting`}
                width={1024}
                height={1024}
                className="w-full object-cover"
                priority
                unoptimized
              />

              {/* Labels overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-between px-6 pb-5">
                <span className="type-eyebrow text-xs tracking-[0.3em] text-gold-300/80 uppercase">His</span>
                <span className="type-eyebrow text-xs tracking-[0.3em] text-gold-300/80 uppercase">Her&apos;s</span>
              </div>

              <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 text-center">
                <p className="type-eyebrow text-[8px] tracking-[0.4em] text-gold-300/50 uppercase">
                  The&nbsp;Pair
                </p>
              </div>
            </div>
          ) : (
            /* Fallback: side-by-side product images */
            <div className="relative flex w-full max-w-[560px] items-end justify-between gap-4 border border-onyx-700/80 bg-onyx-800/60 p-4 backdrop-blur-sm sm:p-8">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-onyx-900/40 to-onyx-900/90"
                aria-hidden="true"
              />
              {/* His bottle */}
              <div ref={hisImgRef} className="relative z-10 w-[44%]">
                <div className="mb-2 text-center">
                  <span className="type-eyebrow text-gold-300">His</span>
                </div>
                {hisHeroSrc ? (
                  <Image
                    src={hisHeroSrc}
                    alt={`${hisName} bottle`}
                    width={300}
                    height={400}
                    className="w-full object-cover"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="aspect-[3/4] w-full bg-onyx-700" />
                )}
              </div>

              {/* Gold Seam */}
              <div
                ref={seamRef}
                className="relative z-20 flex h-[78%] w-px origin-center flex-col items-center justify-center bg-[var(--foil)] shadow-[0_0_10px_rgba(217,188,106,0.5)]"
                aria-hidden="true"
              >
                <div className="h-2 w-2 rounded-full border border-gold-300 bg-onyx-900 shadow-[0_0_6px_rgba(240,226,184,0.8)]" />
              </div>

              {/* Her's bottle */}
              <div ref={hersImgRef} className="relative z-10 w-[44%]">
                <div className="mb-2 text-center">
                  <span className="type-eyebrow text-gold-300">Her&apos;s</span>
                </div>
                {hersHeroSrc ? (
                  <Image
                    src={hersHeroSrc}
                    alt={`${hersName} bottle`}
                    width={300}
                    height={400}
                    className="w-full object-cover"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="aspect-[3/4] w-full bg-onyx-700" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div
        ref={scrollCueRef}
        className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-center"
      >
        <p className="type-eyebrow text-xs tracking-widest text-parchment/40">
          Scroll to explore
        </p>
        <div
          className="h-6 w-px bg-gradient-to-b from-gold-300/60 to-transparent"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

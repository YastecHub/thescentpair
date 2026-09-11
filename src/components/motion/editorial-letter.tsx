"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionTier } from "./motion-provider";

const safeRegisterScrollTrigger = () => {
  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    gsap.registerPlugin(ScrollTrigger);
  }
};

interface EditorialLine {
  text: string;
  goldWords?: string[];
}

interface EditorialLetterProps {
  lines: EditorialLine[];
  eyebrow?: string;
  className?: string;
}

export function EditorialLetter({
  lines,
  eyebrow = "The Letter",
  className = "",
}: EditorialLetterProps) {
  const tier = useMotionTier();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tier !== "tier-a" || !containerRef.current) {
      return;
    }

    safeRegisterScrollTrigger();

    const ctx = gsap.context(() => {
      const lineElements = containerRef.current?.querySelectorAll(".letter-line");
      if (!lineElements || lineElements.length === 0) return;

      lineElements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 60%",
              scrub: 0.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [tier]);

  const renderHighlightedText = (text: string, goldWords: string[] = []) => {
    if (!goldWords.length) return text;

    const regex = new RegExp(`(${goldWords.join("|")})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) => {
      const isGold = goldWords.some((w) => w.toLowerCase() === part.toLowerCase());
      if (isGold) {
        return (
          <span
            key={i}
            className="text-foil font-medium tracking-wide drop-shadow-[0_0_12px_rgba(217,188,106,0.3)]"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div
      ref={containerRef}
      className={`mx-auto max-w-4xl py-12 md:py-20 ${className}`}
      data-testid="editorial-letter"
    >
      {eyebrow ? (
        <span className="type-eyebrow text-xs tracking-[0.4em] text-gold-300 uppercase block mb-8">
          {eyebrow}
        </span>
      ) : null}

      <div className="space-y-6 sm:space-y-8">
        {lines.map((line, idx) => (
          <p
            key={idx}
            className="letter-line font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed text-parchment/90"
          >
            {renderHighlightedText(line.text, line.goldWords)}
          </p>
        ))}
      </div>
    </div>
  );
}

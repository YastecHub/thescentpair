"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useMotionTier } from "./motion-provider";

interface NotesStructure {
  top: string[];
  heart: string[];
  base: string[];
}

interface FragranceNotesGraphProps {
  notes: NotesStructure;
  fragranceName?: string;
  className?: string;
}

// Editorial descriptors for key ingredients
const INGREDIENT_DETAILS: Record<string, { role: string; description: string; mood: string }> = {
  "pink-pepper": {
    role: "Top Note",
    description: "Dry, sparkling piquancy that provides an effervescent top before the deeper resins arrive.",
    mood: "Bright · Peppery · Intrigued",
  },
  bergamot: {
    role: "Top Note",
    description: "Cold-pressed Calabrian citrus offering sharp, luminous vitality that cuts through darkness.",
    mood: "Luminous · Crisp · Awakening",
  },
  cardamom: {
    role: "Top Note",
    description: "Crushed green pods with an aromatic, spicy heat that immediately quickens the pulse.",
    mood: "Warm · Resinous · Electric",
  },
  rose: {
    role: "Heart Note",
    description: "Velvety Damask rose petals picked at dusk, rich with honeyed dew and deep romantic gravity.",
    mood: "Intimate · Velvety · Seductive",
  },
  jasmine: {
    role: "Heart Note",
    description: "Night-blooming white florals suspended in the midnight air, opulent and hauntingly memorable.",
    mood: "Sensual · Opulent · Lingering",
  },
  oud: {
    role: "Base Note",
    description: "Aged agarwood smoked over embers, giving profound timber structure and indelible presence.",
    mood: "Smoky · Sacred · Enduring",
  },
  amber: {
    role: "Base Note",
    description: "Golden molten resin melted close to warm skin, radiating comfort, luxury, and magnetic warmth.",
    mood: "Golden · Enveloping · Close",
  },
  vanilla: {
    role: "Base Note",
    description: "Dark Bourbon vanilla bean with smoky wood accents rather than confectionary sweetness.",
    mood: "Dark · Hypnotic · Intimate",
  },
  sandalwood: {
    role: "Base Note",
    description: "Creamy Mysore wood providing a serene, grounded architecture that stays with you until morning.",
    mood: "Creamy · Architectural · Serene",
  },
};

export function FragranceNotesGraph({
  notes,
  fragranceName = "Signature Scent",
  className = "",
}: FragranceNotesGraphProps) {
  const tier = useMotionTier();
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (tier === "tier-c") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [tier]);

  const allNotes = [
    ...notes.top.map((n) => ({ name: n, stage: "Top" as const })),
    ...notes.heart.map((n) => ({ name: n, stage: "Heart" as const })),
    ...notes.base.map((n) => ({ name: n, stage: "Base" as const })),
  ];

  const getDetail = (name: string) => {
    const key = name.toLowerCase();
    for (const [k, v] of Object.entries(INGREDIENT_DETAILS)) {
      if (key.includes(k)) return v;
    }
    return {
      role: `${name} Accord`,
      description: "Carefully sourced botanical essence chosen to harmonise perfectly between both partners.",
      mood: "Subtle · Refined · Harmonious",
    };
  };

  const selectedDetail = activeNote ? getDetail(activeNote) : null;

  return (
    <div
      ref={containerRef}
      className={`relative rounded-none border border-onyx-700 bg-onyx-800/90 p-6 md:p-10 ${className}`}
      data-testid="fragrance-notes-graph"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
        {/* Notes Diagram & Interactive Constellation */}
        <div className="relative flex flex-col items-center">
          {/* Constellation Canvas / Connectors */}
          <div className="relative flex w-full max-w-lg flex-col items-center justify-between gap-8 py-6">
            {/* Top Stage */}
            <div className="w-full text-center">
              <span className="type-eyebrow text-[10px] tracking-[0.35em] text-gold-300 uppercase block mb-3">
                Top Notes · First Impression (0–30 mins)
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {notes.top.map((note) => {
                  const isSelected = activeNote === note;
                  return (
                    <button
                      key={note}
                      type="button"
                      onClick={() => setActiveNote(isSelected ? null : note)}
                      aria-expanded={isSelected}
                      className={`group relative rounded-full border px-4 py-1.5 text-xs font-sans tracking-wider transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-gold-300 ${
                        isSelected
                          ? "border-gold-300 bg-gold-500/20 text-gold-100 shadow-[0_0_15px_rgba(217,188,106,0.4)]"
                          : "border-onyx-700 bg-onyx-900/80 text-parchment hover:border-gold-500/70 hover:text-gold-200"
                      }`}
                    >
                      {note}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Central Radiant Bottle Symbol */}
            <div className="relative my-2 flex flex-col items-center">
              <div
                className={`relative h-24 w-24 sm:h-28 sm:w-28 transition-all duration-slow ${
                  inView ? "scale-100 opacity-100" : "scale-95 opacity-60"
                }`}
              >
                <Image
                  src="/brand/logo-crest.png"
                  alt={fragranceName}
                  fill
                  sizes="112px"
                  className="object-contain drop-shadow-[0_0_20px_rgba(217,188,106,0.35)]"
                />
              </div>

              {/* Radiant hairline glow */}
              <div
                className={`h-[1px] w-48 bg-gradient-to-r from-transparent via-gold-300/60 to-transparent transition-all duration-1000 ${
                  inView ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                }`}
              />
            </div>

            {/* Heart Stage */}
            <div className="w-full text-center">
              <span className="type-eyebrow text-[10px] tracking-[0.35em] text-gold-300 uppercase block mb-3">
                Heart Notes · Character &amp; Soul (1–4 hours)
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {notes.heart.map((note) => {
                  const isSelected = activeNote === note;
                  return (
                    <button
                      key={note}
                      type="button"
                      onClick={() => setActiveNote(isSelected ? null : note)}
                      aria-expanded={isSelected}
                      className={`group relative rounded-full border px-4 py-1.5 text-xs font-sans tracking-wider transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-gold-300 ${
                        isSelected
                          ? "border-gold-300 bg-gold-500/20 text-gold-100 shadow-[0_0_15px_rgba(217,188,106,0.4)]"
                          : "border-onyx-700 bg-onyx-900/80 text-parchment hover:border-gold-500/70 hover:text-gold-200"
                      }`}
                    >
                      {note}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Base Stage */}
            <div className="w-full text-center">
              <span className="type-eyebrow text-[10px] tracking-[0.35em] text-gold-300 uppercase block mb-3">
                Base Notes · Skin &amp; Memory (6–12+ hours)
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {notes.base.map((note) => {
                  const isSelected = activeNote === note;
                  return (
                    <button
                      key={note}
                      type="button"
                      onClick={() => setActiveNote(isSelected ? null : note)}
                      aria-expanded={isSelected}
                      className={`group relative rounded-full border px-4 py-1.5 text-xs font-sans tracking-wider transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-gold-300 ${
                        isSelected
                          ? "border-gold-300 bg-gold-500/20 text-gold-100 shadow-[0_0_15px_rgba(217,188,106,0.4)]"
                          : "border-onyx-700 bg-onyx-900/80 text-parchment hover:border-gold-500/70 hover:text-gold-200"
                      }`}
                    >
                      {note}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Note Editorial Spotlight Drawer */}
        <div className="flex flex-col justify-center border-t border-onyx-700 pt-6 lg:border-t-0 lg:border-l lg:pl-8">
          {activeNote && selectedDetail ? (
            <div className="animate-fade-in">
              <span className="type-eyebrow text-[10px] tracking-[0.3em] text-gold-300 uppercase block">
                {selectedDetail.role}
              </span>
              <h3 className="font-display text-2xl font-semibold text-foil mt-1.5">
                {activeNote}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-parchment/80">
                {selectedDetail.description}
              </p>
              <div className="mt-4 inline-block border-l border-gold-300/50 pl-3">
                <span className="text-xs italic text-gold-200">
                  {selectedDetail.mood}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center lg:text-left">
              <span className="type-eyebrow text-[10px] tracking-[0.3em] text-gold-300/80 uppercase block">
                The Anatomy
              </span>
              <h3 className="font-display text-xl font-medium text-parchment mt-2">
                Touch a note to reveal its essence.
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-parchment/60">
                Each fragrance evolves from first spray through drydown, creating a living scent signature that interacts uniquely with your skin.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

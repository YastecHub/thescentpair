import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  variant?: "header" | "footer" | "crest" | "mark" | "lockup";
  className?: string;
  showWordmark?: boolean;
  priority?: boolean;
}

export function BrandLogo({
  variant = "header",
  className = "",
  showWordmark = true,
  priority = false,
}: BrandLogoProps) {
  if (variant === "crest") {
    return (
      <div
        className={`relative flex flex-col items-center text-center ${className}`}
      >
        <div className="relative h-28 w-28 md:h-36 md:w-36 drop-shadow-[0_0_25px_rgba(217,188,106,0.4)] transition-transform duration-slow hover:scale-105">
          <Image
            src="/brand/logo-crest.png"
            alt="His & Her's Scents Official Crest"
            fill
            sizes="(max-width: 768px) 112px, 144px"
            className="object-contain"
            priority={priority}
          />
        </div>
        {showWordmark ? (
          <div className="mt-4">
            <span className="font-display text-2xl md:text-3xl font-semibold tracking-[0.25em] text-foil uppercase block">
              His &amp; Her&apos;s
            </span>
            <span className="type-eyebrow text-xs tracking-[0.4em] text-gold-300 block mt-0.5">
              Scents
            </span>
          </div>
        ) : null}
      </div>
    );
  }

  if (variant === "lockup") {
    return (
      <div
        className={`relative flex flex-col items-center text-center ${className}`}
      >
        <div className="relative w-48 sm:w-60 md:w-72 aspect-[924/820] drop-shadow-[0_0_30px_rgba(217,188,106,0.35)]">
          <Image
            src="/brand/logo-lockup.png"
            alt="His & Her's Scents"
            fill
            sizes="(max-width: 768px) 240px, 288px"
            className="object-contain"
            priority={priority}
          />
        </div>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="relative h-14 w-14 shrink-0 drop-shadow-[0_0_16px_rgba(217,188,106,0.35)]">
          <Image
            src="/brand/logo-crest.png"
            alt="His & Her's Scents Logo"
            fill
            sizes="56px"
            className="object-contain"
            priority={priority}
          />
        </div>
        {showWordmark ? (
          <div>
            <span className="font-display text-xl font-semibold tracking-[0.22em] text-foil uppercase block">
              His &amp; Her&apos;s
            </span>
            <span className="type-eyebrow text-[10px] tracking-[0.35em] text-gold-300 block -mt-0.5">
              Scents
            </span>
          </div>
        ) : null}
      </div>
    );
  }

  if (variant === "mark") {
    return (
      <div
        className={`relative h-11 w-11 shrink-0 drop-shadow-[0_0_12px_rgba(217,188,106,0.4)] transition-transform duration-fast hover:scale-105 ${className}`}
      >
        <Image
          src="/brand/logo-crest.png"
          alt="His & Her's Scents"
          fill
          sizes="44px"
          className="object-contain"
          priority={priority}
        />
      </div>
    );
  }

  // Default: variant === "header"
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <div className="relative h-11 w-11 shrink-0 drop-shadow-[0_0_14px_rgba(217,188,106,0.45)] transition-all duration-fast group-hover:drop-shadow-[0_0_20px_rgba(240,226,184,0.7)] group-hover:scale-105">
        <Image
          src="/brand/logo-crest.png"
          alt="His & Her's Scents Crest"
          fill
          sizes="44px"
          className="object-contain"
          priority={priority}
        />
      </div>
      {showWordmark ? (
        <div className="flex flex-col">
          <span className="font-display text-base sm:text-lg font-semibold tracking-[0.2em] text-foil uppercase transition-colors group-hover:text-gold-100">
            His &amp; Her&apos;s
          </span>
          <span className="type-eyebrow text-[9px] tracking-[0.35em] text-gold-300 block -mt-1">
            Scents
          </span>
        </div>
      ) : null}
    </div>
  );
}

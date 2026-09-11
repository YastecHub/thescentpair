import React from "react";

interface BottleSilhouetteProps {
  type: "his" | "hers";
  name?: string;
  className?: string;
  highlightRef?: React.RefObject<SVGRectElement | null>;
  bottleRef?: React.RefObject<SVGSVGElement | null>;
  id?: string;
}

export function BottleSilhouette({
  type,
  name,
  className = "w-full h-full max-h-[540px]",
  highlightRef,
  bottleRef,
  id,
}: BottleSilhouetteProps) {
  const isHis = type === "his";
  const primaryTint = isHis ? "#131922" : "#28171B";
  const glassGradId = `glassGrad-${type}-${id || "def"}`;
  const liquidGradId = `liquidGrad-${type}-${id || "def"}`;
  const highlightGradId = `highlightGrad-${type}-${id || "def"}`;
  const capGradId = `capGrad-${type}-${id || "def"}`;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        ref={bottleRef}
        viewBox="0 0 240 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
        aria-label={`${isHis ? "His" : "Her's"} fragrance bottle ${name ? `(${name})` : ""}`}
        role="img"
      >
        <defs>
          {/* Cap gold gradient */}
          <linearGradient id={capGradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8A6C22" />
            <stop offset="30%" stopColor="#E8CE86" />
            <stop offset="50%" stopColor="#FFF3CE" />
            <stop offset="70%" stopColor="#D9BC6A" />
            <stop offset="100%" stopColor="#8A6C22" />
          </linearGradient>

          {/* Glass body gradient */}
          <linearGradient id={glassGradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2A241C" stopOpacity="0.9" />
            <stop offset="15%" stopColor={primaryTint} stopOpacity="0.95" />
            <stop offset="50%" stopColor="#0B0A09" stopOpacity="0.98" />
            <stop offset="85%" stopColor={primaryTint} stopOpacity="0.95" />
            <stop offset="100%" stopColor="#2A241C" stopOpacity="0.9" />
          </linearGradient>

          {/* Liquid depth gradient */}
          <linearGradient id={liquidGradId} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={isHis ? "#0F1A24" : "#241014"} />
            <stop offset="100%" stopColor="#0B0A09" stopOpacity="0.3" />
          </linearGradient>

          {/* Travelling highlight beam */}
          <linearGradient id={highlightGradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFF3CE" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFF3CE" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FFF3CE" stopOpacity="0" />
          </linearGradient>

          {/* Clip path for the bottle glass interior */}
          <clipPath id={`bottleClip-${type}-${id || "def"}`}>
            <path d="M60 90 H180 V370 C180 376 176 380 170 380 H70 C64 380 60 376 60 370 Z" />
          </clipPath>
        </defs>

        {/* Ambient glow behind bottle */}
        <ellipse
          cx="120"
          cy="370"
          rx="70"
          ry="15"
          fill="rgba(176,141,58,0.12)"
          filter="blur(10px)"
        />

        {/* Heavy glass base */}
        <path
          d="M58 88 H182 V372 C182 380 176 386 168 386 H72 C64 386 58 380 58 372 Z"
          fill="#16130F"
          stroke="#B08D3A"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Bottle main body (clipped to receive highlight) */}
        <g clipPath={`url(#bottleClip-${type}-${id || "def"})`}>
          <rect x="60" y="90" width="120" height="290" fill={`url(#${glassGradId})`} />
          {/* Internal fragrance liquid volume */}
          <rect x="66" y="140" width="108" height="234" fill={`url(#${liquidGradId})`} />

          {/* Facet internal reflections */}
          <line x1="72" y1="90" x2="72" y2="370" stroke="#D9BC6A" strokeWidth="0.5" strokeOpacity="0.25" />
          <line x1="168" y1="90" x2="168" y2="370" stroke="#D9BC6A" strokeWidth="0.5" strokeOpacity="0.25" />

          {/* Travelling highlight beam (controlled via GSAP or CSS transform) */}
          <rect
            ref={highlightRef}
            x="-60"
            y="90"
            width="60"
            height="290"
            fill={`url(#${highlightGradId})`}
            transform="skewX(-20)"
            className="highlight-beam"
            aria-hidden="true"
          />
        </g>

        {/* Label plate */}
        <g>
          <rect
            x="76"
            y="190"
            width="88"
            height="110"
            fill="#0B0A09"
            stroke="#B08D3A"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />
          {/* Inner label border */}
          <rect
            x="80"
            y="194"
            width="80"
            height="102"
            fill="none"
            stroke="#D9BC6A"
            strokeWidth="0.4"
            strokeOpacity="0.4"
          />
          {/* Label Brand Monogram */}
          <text
            x="120"
            y="222"
            textAnchor="middle"
            fill="#D9BC6A"
            fontSize="10"
            fontFamily="var(--font-display), serif"
            letterSpacing="2"
          >
            H &amp; H
          </text>
          <line x1="95" y1="232" x2="145" y2="232" stroke="#8A6C22" strokeWidth="0.5" />
          {/* Label Fragrance Name */}
          <text
            x="120"
            y="252"
            textAnchor="middle"
            fill="#F6F2EA"
            fontSize="9"
            fontFamily="var(--font-sans), sans-serif"
            fontWeight="500"
            letterSpacing="1.5"
          >
            {name ? name.toUpperCase() : isHis ? "MIDNIGHT OATH" : "VELVET VOW"}
          </text>
          <text
            x="120"
            y="268"
            textAnchor="middle"
            fill="#B08D3A"
            fontSize="6.5"
            fontFamily="var(--font-sans), sans-serif"
            letterSpacing="1"
          >
            {isHis ? "POUR HOMME" : "POUR FEMME"}
          </text>
          <text
            x="120"
            y="285"
            textAnchor="middle"
            fill="#8A6C22"
            fontSize="6"
            letterSpacing="0.5"
          >
            EXTRAIT DE PARFUM
          </text>
        </g>

        {/* Collar ring */}
        <rect
          x="96"
          y="72"
          width="48"
          height="18"
          fill={`url(#${capGradId})`}
          stroke="#8A6C22"
          strokeWidth="0.5"
        />

        {/* Heavy weighted cap */}
        <rect
          x="90"
          y="26"
          width="60"
          height="48"
          rx="1"
          fill={`url(#${capGradId})`}
          stroke="#B08D3A"
          strokeWidth="0.5"
        />
        {/* Cap bevel detailing */}
        <line x1="94" y1="32" x2="146" y2="32" stroke="#FFF3CE" strokeWidth="0.5" strokeOpacity="0.7" />
        <line x1="94" y1="68" x2="146" y2="68" stroke="#8A6C22" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

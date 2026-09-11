"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionTier } from "@/components/motion/motion-provider";
import { BottleSilhouette } from "@/components/media/bottle-silhouette";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow, BodyText } from "@/components/typography/typography";
import { formatPrice, getStartingPrice } from "@/lib/content/repository";
import type { Fragrance } from "@/lib/content/schemas";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BottleUnveilingProps {
  fragrance: Fragrance;
  partnerName?: string;
}

export function BottleUnveiling({
  fragrance,
  partnerName,
}: BottleUnveilingProps) {
  const tier = useMotionTier();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef<number>(0);
  const [framesReady, setFramesReady] = useState<boolean>(false);

  const isTierA = tier === "tier-a";
  const totalFrames = isTierA ? 36 : 18;

  // Render a specific frame of the rotating bottle onto the canvas
  const drawBottleFrame = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      frameIndex: number,
      width: number,
      height: number,
    ) => {
      ctx.clearRect(0, 0, width, height);

    const progress = frameIndex / (totalFrames - 1); // 0 to 1
    const angle = progress * Math.PI * 2; // Full 360 degree rotation

    const centerX = width / 2;
    const baseY = height * 0.85;
    const bottleWidth = width * 0.45;
    const bottleHeight = height * 0.6;
    const topY = baseY - bottleHeight;

    // Cap lift near end of rotation (progress > 0.75)
    const capLift = progress > 0.75 ? (progress - 0.75) * 4 * (height * 0.08) : 0;

    ctx.save();

    // 1. Ambient shadow under bottle
    const shadowGrad = ctx.createRadialGradient(
      centerX,
      baseY + 10,
      10,
      centerX,
      baseY + 10,
      bottleWidth * 0.7,
    );
    shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.8)");
    shadowGrad.addColorStop(0.5, "rgba(176, 141, 58, 0.15)");
    shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(centerX, baseY + 10, bottleWidth * 0.7, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Glass bottle body
    const bodyX = centerX - bottleWidth / 2;
    const bodyY = topY + bottleHeight * 0.18;
    const bodyH = bottleHeight * 0.82;

    // Perspective depth based on rotation angle cosine
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    // Body glass gradient with dynamic specular reflection
    const glassGrad = ctx.createLinearGradient(bodyX, bodyY, bodyX + bottleWidth, bodyY);
    const highlightPos = 0.5 + 0.4 * sinAngle;
    glassGrad.addColorStop(0, "#1F1B15");
    glassGrad.addColorStop(Math.max(0, highlightPos - 0.15), "#0B0A09");
    glassGrad.addColorStop(highlightPos, "#F0E2B8");
    glassGrad.addColorStop(Math.min(1, highlightPos + 0.15), "#16130F");
    glassGrad.addColorStop(1, "#1F1B15");

    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = "#B08D3A";
    ctx.lineWidth = 1.5;

    // Rounded bottle base
    ctx.beginPath();
    ctx.roundRect(bodyX, bodyY, bottleWidth, bodyH, [2, 2, 8, 8]);
    ctx.fill();
    ctx.stroke();

    // 3. Liquid volume inside
    const liquidY = bodyY + bodyH * 0.15;
    const liquidH = bodyH * 0.82;
    const liquidGrad = ctx.createLinearGradient(bodyX, liquidY, bodyX, liquidY + liquidH);
    const isHis = fragrance.audience === "his";
    liquidGrad.addColorStop(0, isHis ? "rgba(27, 36, 48, 0.4)" : "rgba(124, 74, 69, 0.4)");
    liquidGrad.addColorStop(1, isHis ? "rgba(11, 10, 9, 0.95)" : "rgba(18, 12, 14, 0.95)");
    ctx.fillStyle = liquidGrad;
    ctx.beginPath();
    ctx.roundRect(bodyX + 8, liquidY, bottleWidth - 16, liquidH, [0, 0, 6, 6]);
    ctx.fill();

    // 4. Label (visible when front-facing: cosAngle > 0)
    if (cosAngle > -0.2) {
      const labelAlpha = Math.max(0, Math.min(1, (cosAngle + 0.2) * 1.5));
      ctx.save();
      ctx.globalAlpha = labelAlpha;

      const labelW = bottleWidth * 0.68 * Math.max(0.2, cosAngle);
      const labelH = bodyH * 0.45;
      const labelX = centerX - labelW / 2 + sinAngle * (bottleWidth * 0.1);
      const labelY = bodyY + bodyH * 0.25;

      ctx.fillStyle = "#0B0A09";
      ctx.strokeStyle = "#B08D3A";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.rect(labelX, labelY, labelW, labelH);
      ctx.fill();
      ctx.stroke();

      if (labelW > bottleWidth * 0.35) {
        ctx.fillStyle = "#D9BC6A";
        ctx.font = "bold 12px var(--font-display), serif";
        ctx.textAlign = "center";
        ctx.fillText("H & H", centerX, labelY + 24);

        ctx.fillStyle = "#F6F2EA";
        ctx.font = "500 10px var(--font-sans), sans-serif";
        ctx.fillText(fragrance.name.toUpperCase(), centerX, labelY + 44);

        ctx.fillStyle = "#8A6C22";
        ctx.font = "8px var(--font-sans), sans-serif";
        ctx.fillText("EXTRAIT DE PARFUM", centerX, labelY + 60);
      }
      ctx.restore();
    }

    // 5. Collar ring
    const collarW = bottleWidth * 0.36;
    const collarH = bottleHeight * 0.08;
    const collarX = centerX - collarW / 2;
    const collarY = topY + bottleHeight * 0.1;
    ctx.fillStyle = "#B08D3A";
    ctx.fillRect(collarX, collarY, collarW, collarH);

    // 6. Cap (lifts when capLift > 0)
    const capW = bottleWidth * 0.48;
    const capH = bottleHeight * 0.18;
    const capX = centerX - capW / 2;
    const capY = topY - capLift;

    const capGrad = ctx.createLinearGradient(capX, capY, capX + capW, capY);
    capGrad.addColorStop(0, "#8A6C22");
    capGrad.addColorStop(0.35, "#FFF3CE");
    capGrad.addColorStop(0.7, "#D9BC6A");
    capGrad.addColorStop(1, "#8A6C22");

    ctx.fillStyle = capGrad;
    ctx.strokeStyle = "#8A6C22";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(capX, capY, capW, capH, [2, 2, 1, 1]);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }, [totalFrames, fragrance.audience, fragrance.name]);

  useEffect(() => {
    if (tier === "tier-c") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw initial frame
    drawBottleFrame(ctx, 0, canvas.width, canvas.height);
    setFramesReady(true);

    const scrollCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 0.3,
        onUpdate: (self) => {
          const rawFrame = Math.floor(self.progress * (totalFrames - 1));
          const frameIndex = Math.min(Math.max(rawFrame, 0), totalFrames - 1);

          // Only redraw when calculated frame changes
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            drawBottleFrame(ctx, frameIndex, canvas.width, canvas.height);
          }
        },
      });
    }, sectionRef);

    return () => {
      scrollCtx.revert();
    };
  }, [tier, totalFrames, drawBottleFrame]);

  return (
    <section
      ref={sectionRef}
      className={`relative my-12 flex w-full items-center justify-center border-y border-onyx-700 bg-onyx-900 py-12 ${
        tier === "tier-c" ? "" : "min-h-screen"
      }`}
      data-motion="unveiling"
      aria-labelledby="unveiling-title"
    >
      <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-8 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Left Column: Bottle Presentation (Static for Tier C, Canvas Turntable for Tier A/B) */}
        <div className="relative flex items-center justify-center p-4">
          {tier === "tier-c" ? (
            <div className="w-full max-w-[340px]">
              <BottleSilhouette
                type={fragrance.audience === "his" ? "his" : "hers"}
                name={fragrance.name}
                id="unveiling-static"
              />
            </div>
          ) : (
            <>
              <canvas
                ref={canvasRef}
                width={480}
                height={680}
                className="h-auto max-h-[560px] w-full max-w-[380px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
                aria-label={`${fragrance.name} interactive rotating bottle presentation`}
                role="img"
              />
              {!framesReady ? (
                <div className="absolute inset-0 flex items-center justify-center bg-onyx-900">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold-300 border-t-transparent" />
                </div>
              ) : null}
              <div className="pointer-events-none absolute bottom-2 flex items-center gap-2 rounded border border-onyx-700 bg-onyx-800/80 px-3 py-1 text-xs text-gold-300">
                <span>Scroll to rotate bottle</span>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Editorial Story Column */}
        <div className="flex flex-col justify-center">
          <Eyebrow>The Unveiling</Eyebrow>
          <h2
            id="unveiling-title"
            className="type-section-heading mt-4 text-foil"
          >
            {fragrance.name}
          </h2>
          <p className="mt-4 font-display text-2xl text-parchment">
            {fragrance.tagline}
          </p>
          <BodyText className="mt-5 type-supporting">
            {fragrance.description}
          </BodyText>

          <dl className="mt-6 grid gap-2 text-sm text-parchment/70">
            <div>
              <dt className="inline text-gold-300">Family: </dt>
              <dd className="inline capitalize">
                {fragrance.family.replaceAll("-", " ")}
              </dd>
            </div>
            <div>
              <dt className="inline text-gold-300">Starting price: </dt>
              <dd className="inline">
                {formatPrice(getStartingPrice(fragrance.variants))}
              </dd>
            </div>
            {partnerName ? (
              <div>
                <dt className="inline text-gold-300">Partner: </dt>
                <dd className="inline">{partnerName}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-8">
            <ButtonLink href={`/fragrance/${fragrance.slug}`} variant="primary">
              View fragrance details
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

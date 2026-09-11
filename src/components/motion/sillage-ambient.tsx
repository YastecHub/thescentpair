"use client";

import React, { useEffect, useRef } from "react";
import { useMotionTier } from "./motion-provider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  color: string;
  life: number;
  maxLife: number;
}

const GOLD_PALETTE = ["#f0e2b8", "#d9bc6a", "#e6c875", "#c29b38"];
const MAX_PARTICLES = 36;

export function SillageAmbient() {
  const tier = useMotionTier();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only active on Tier A
    if (tier !== "tier-a") {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationFrameId: number;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let pointerX = width / 2;
    let pointerY = height / 2;
    let hasPointer = false;
    let isIdle = false;
    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      isIdle = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isIdle = true;
      }, 4000);
    };

    resetIdleTimer();

    // Spawn initial particles
    const particles: Particle[] = Array.from({ length: MAX_PARTICLES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.2, // faint upward drift
      radius: Math.random() * 1.4 + 0.6,
      alpha: 0,
      maxAlpha: Math.random() * 0.28 + 0.12,
      color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
      life: Math.random() * 180,
      maxLife: Math.random() * 240 + 180,
    }));

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      resetIdleTimer();
      hasPointer = true;
      if ("touches" in e && e.touches.length > 0) {
        pointerX = e.touches[0].clientX;
        pointerY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        pointerX = (e as MouseEvent).clientX;
        pointerY = (e as MouseEvent).clientY;
      }
    };

    const onScroll = () => {
      resetIdleTimer();
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.min(Math.max((currentScrollY - lastScrollY) * 0.15, -6), 6);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Render loop
    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Decelerate scroll velocity impact
      scrollVelocity *= 0.94;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Increment life
        p.life++;
        if (p.life > p.maxLife) {
          // Re-seed particle
          p.life = 0;
          p.x = hasPointer ? pointerX + (Math.random() - 0.5) * 120 : Math.random() * width;
          p.y = hasPointer ? pointerY + (Math.random() - 0.5) * 120 : Math.random() * height;
          p.vx = (Math.random() - 0.5) * 0.4;
          p.vy = (Math.random() - 0.5) * 0.4 - 0.2;
        }

        // Gentle attraction towards pointer if near
        if (hasPointer && !isIdle) {
          const dx = pointerX - p.x;
          const dy = pointerY - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 70000 && distSq > 400) {
            const force = 0.0004;
            p.vx += dx * force;
            p.vy += dy * force;
          }
        }

        // Apply scroll drift
        p.y -= scrollVelocity;

        // Apply velocity with air resistance
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Screen wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Calculate opacity curve (fade in, hold, fade out)
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * p.maxAlpha;
        } else if (progress > 0.8) {
          p.alpha = ((1 - progress) / 0.2) * p.maxAlpha;
        } else {
          p.alpha = p.maxAlpha;
        }

        // Draw particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = "#f0e2b8";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [tier]);

  if (tier !== "tier-a") {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 h-full w-full opacity-70"
    />
  );
}

"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionCapabilities } from "@/components/motion/motion-provider";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const { isCoarsePointer, hasReducedMotion } = useMotionCapabilities();

  useEffect(() => {
    // Desktop-only: skip on touch/coarse-pointer devices and reduced motion
    if (isCoarsePointer || hasReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0,
    });

    // Stable ticker function reference so we can remove it cleanly
    const onTick = (time: number) => lenis.raf(time * 1000);

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [isCoarsePointer, hasReducedMotion]);

  return <>{children}</>;
}

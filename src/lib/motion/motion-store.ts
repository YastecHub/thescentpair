import {
  type MotionCapabilities,
  type MotionTier,
  DEFAULT_MOTION_CAPABILITIES,
  detectMotionCapabilities,
} from "@/lib/motion/motion-tier";
import { trackEvent } from "@/lib/analytics/analytics";

let cachedCapabilities: MotionCapabilities | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeMotionStore(callback: () => void): () => void {
  listeners.add(callback);

  if (typeof window === "undefined") {
    return () => {
      listeners.delete(callback);
    };
  }

  const reducedMotionMedia = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  const handleMediaChange = () => {
    cachedCapabilities = detectMotionCapabilities();
    notify();
  };

  reducedMotionMedia.addEventListener?.("change", handleMediaChange);

  return () => {
    listeners.delete(callback);
    reducedMotionMedia.removeEventListener?.("change", handleMediaChange);
  };
}

export function getMotionSnapshot(): MotionCapabilities {
  if (typeof window === "undefined") {
    return DEFAULT_MOTION_CAPABILITIES;
  }
  if (!cachedCapabilities) {
    cachedCapabilities = detectMotionCapabilities();
  }
  return cachedCapabilities;
}

export function getMotionServerSnapshot(): MotionCapabilities {
  return DEFAULT_MOTION_CAPABILITIES;
}

export function downgradeMotionStore(newTier: MotionTier, reason: string, avgFps = 0): void {
  const current = getMotionSnapshot();
  if (current.tier === "tier-c") return;

  trackEvent("perf_degrade", {
    startingTier: current.tier,
    newTier,
    avgFps,
  });

  cachedCapabilities = {
    ...current,
    tier: newTier,
    reason: `downgraded:${reason}`,
    canCustomCursor: newTier === "tier-a" && !current.isCoarsePointer,
  };
  notify();
}

export function setMotionCapability(newTier: MotionTier): void {
  const current = getMotionSnapshot();
  cachedCapabilities = {
    ...current,
    tier: newTier,
    reason: `manual:${newTier}`,
    canCustomCursor: newTier === "tier-a" && !current.isCoarsePointer,
  };
  notify();
}

export function resetMotionStore(): void {
  cachedCapabilities = null;
  listeners.clear();
}

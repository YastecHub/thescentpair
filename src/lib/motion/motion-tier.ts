export type MotionTier = "tier-a" | "tier-b" | "tier-c";

export interface MotionCapabilities {
  tier: MotionTier;
  reason: string;
  hasReducedMotion: boolean;
  hasSaveData: boolean;
  isSlowConnection: boolean;
  hasLowMemory: boolean;
  hasLowCpu: boolean;
  isCoarsePointer: boolean;
  canCustomCursor: boolean;
}

export const DEFAULT_MOTION_CAPABILITIES: MotionCapabilities = {
  tier: "tier-c",
  reason: "ssr-default",
  hasReducedMotion: false,
  hasSaveData: false,
  isSlowConnection: false,
  hasLowMemory: false,
  hasLowCpu: false,
  isCoarsePointer: false,
  canCustomCursor: false,
};

export function detectMotionCapabilities(): MotionCapabilities {
  if (typeof window === "undefined") {
    return DEFAULT_MOTION_CAPABILITIES;
  }

  // 1. Reduced Motion -> Tier C
  const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hasReducedMotion = reducedMotionMedia.matches;
  if (hasReducedMotion) {
    return {
      tier: "tier-c",
      reason: "prefers-reduced-motion",
      hasReducedMotion: true,
      hasSaveData: false,
      isSlowConnection: false,
      hasLowMemory: false,
      hasLowCpu: false,
      isCoarsePointer: false,
      canCustomCursor: false,
    };
  }

  // 2. Data-saver enabled -> Tier C
  const nav = navigator as unknown as {
    connection?: {
      saveData?: boolean;
      effectiveType?: string;
    };
    deviceMemory?: number;
  };

  const hasSaveData = Boolean(nav.connection?.saveData);
  if (hasSaveData) {
    return {
      tier: "tier-c",
      reason: "save-data",
      hasReducedMotion: false,
      hasSaveData: true,
      isSlowConnection: false,
      hasLowMemory: false,
      hasLowCpu: false,
      isCoarsePointer: false,
      canCustomCursor: false,
    };
  }

  // 3. Slow 2G, 2G, or 3G connection -> Tier B
  const effectiveType = nav.connection?.effectiveType;
  const isSlowConnection =
    effectiveType === "slow-2g" ||
    effectiveType === "2g" ||
    effectiveType === "3g";

  // 4. Device memory below 4GB -> Tier B
  const hasLowMemory =
    typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;

  // 5. Four or fewer logical processors -> Tier B
  const hasLowCpu =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  // 6. Pointer check
  const coarsePointerMedia = window.matchMedia("(pointer: coarse)");
  const isCoarsePointer = coarsePointerMedia.matches;
  const canCustomCursor = !isCoarsePointer;

  if (isSlowConnection) {
    return {
      tier: "tier-b",
      reason: "slow-connection",
      hasReducedMotion: false,
      hasSaveData: false,
      isSlowConnection: true,
      hasLowMemory,
      hasLowCpu,
      isCoarsePointer,
      canCustomCursor,
    };
  }

  if (hasLowMemory) {
    return {
      tier: "tier-b",
      reason: "low-memory",
      hasReducedMotion: false,
      hasSaveData: false,
      isSlowConnection: false,
      hasLowMemory: true,
      hasLowCpu,
      isCoarsePointer,
      canCustomCursor,
    };
  }

  if (hasLowCpu) {
    return {
      tier: "tier-b",
      reason: "low-cpu",
      hasReducedMotion: false,
      hasSaveData: false,
      isSlowConnection: false,
      hasLowMemory: false,
      hasLowCpu: true,
      isCoarsePointer,
      canCustomCursor,
    };
  }

  // 7. Capable device -> Tier A
  return {
    tier: "tier-a",
    reason: "capable-device",
    hasReducedMotion: false,
    hasSaveData: false,
    isSlowConnection: false,
    hasLowMemory: false,
    hasLowCpu: false,
    isCoarsePointer,
    canCustomCursor,
  };
}

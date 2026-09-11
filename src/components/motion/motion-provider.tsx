"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
  useCallback,
} from "react";
import {
  type MotionCapabilities,
  type MotionTier,
  DEFAULT_MOTION_CAPABILITIES,
} from "@/lib/motion/motion-tier";
import {
  subscribeMotionStore,
  getMotionSnapshot,
  getMotionServerSnapshot,
  downgradeMotionStore,
} from "@/lib/motion/motion-store";
import { trackEvent } from "@/lib/analytics/analytics";

interface MotionContextValue {
  capabilities: MotionCapabilities;
  tier: MotionTier;
  downgradeTier: (newTier: MotionTier, reason: string, avgFps?: number) => void;
}

const MotionContext = createContext<MotionContextValue>({
  capabilities: DEFAULT_MOTION_CAPABILITIES,
  tier: DEFAULT_MOTION_CAPABILITIES.tier,
  downgradeTier: () => {},
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const capabilities = useSyncExternalStore(
    subscribeMotionStore,
    getMotionSnapshot,
    getMotionServerSnapshot,
  );

  const downgradeTier = useCallback((newTier: MotionTier, reason: string, avgFps?: number) => {
    downgradeMotionStore(newTier, reason, avgFps);
  }, []);

  // Fire tier_assigned once after hydration (capabilities will differ from SSR default)
  const assignedRef = useRef(false);
  useEffect(() => {
    if (assignedRef.current) return;
    assignedRef.current = true;
    trackEvent("tier_assigned", {
      tier: capabilities.tier,
      reason: capabilities.reason,
    });
  }, [capabilities.tier, capabilities.reason]);

  return (
    <MotionContext.Provider
      value={{
        capabilities,
        tier: capabilities.tier,
        downgradeTier,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionCapabilities(): MotionCapabilities {
  return useContext(MotionContext).capabilities;
}

export function useMotionTier(): MotionTier {
  return useContext(MotionContext).tier;
}

export function useDowngradeTier() {
  return useContext(MotionContext).downgradeTier;
}

"use client";

import React, {
  createContext,
  useContext,
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

interface MotionContextValue {
  capabilities: MotionCapabilities;
  tier: MotionTier;
  downgradeTier: (newTier: MotionTier, reason: string) => void;
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

  const downgradeTier = useCallback((newTier: MotionTier, reason: string) => {
    downgradeMotionStore(newTier, reason);
  }, []);

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

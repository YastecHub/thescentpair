import { describe, expect, it, vi, beforeEach } from "vitest";
import { detectMotionCapabilities } from "@/lib/motion/motion-tier";

describe("detectMotionCapabilities", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns tier-c when prefers-reduced-motion is reduce", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => {
      return {
        matches: query.includes("prefers-reduced-motion: reduce"),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    const result = detectMotionCapabilities();
    expect(result.tier).toBe("tier-c");
    expect(result.reason).toBe("prefers-reduced-motion");
    expect(result.hasReducedMotion).toBe(true);
  });

  it("returns tier-c when navigator.connection.saveData is enabled", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(navigator, "connection", {
      value: { saveData: true },
      configurable: true,
    });

    const result = detectMotionCapabilities();
    expect(result.tier).toBe("tier-c");
    expect(result.reason).toBe("save-data");
  });

  it("returns tier-b when connection is slow-2g, 2g or 3g", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(navigator, "connection", {
      value: { saveData: false, effectiveType: "3g" },
      configurable: true,
    });

    const result = detectMotionCapabilities();
    expect(result.tier).toBe("tier-b");
    expect(result.reason).toBe("slow-connection");
  });

  it("returns tier-b when deviceMemory < 4", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(navigator, "connection", {
      value: { saveData: false, effectiveType: "4g" },
      configurable: true,
    });
    Object.defineProperty(navigator, "deviceMemory", {
      value: 2,
      configurable: true,
    });

    const result = detectMotionCapabilities();
    expect(result.tier).toBe("tier-b");
    expect(result.reason).toBe("low-memory");
  });

  it("returns tier-b when hardwareConcurrency <= 4", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(navigator, "connection", {
      value: { saveData: false, effectiveType: "4g" },
      configurable: true,
    });
    Object.defineProperty(navigator, "deviceMemory", {
      value: 8,
      configurable: true,
    });
    Object.defineProperty(navigator, "hardwareConcurrency", {
      value: 4,
      configurable: true,
    });

    const result = detectMotionCapabilities();
    expect(result.tier).toBe("tier-b");
    expect(result.reason).toBe("low-cpu");
  });

  it("returns tier-a for high-spec device without data-saver or reduced motion", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(navigator, "connection", {
      value: { saveData: false, effectiveType: "4g" },
      configurable: true,
    });
    Object.defineProperty(navigator, "deviceMemory", {
      value: 16,
      configurable: true,
    });
    Object.defineProperty(navigator, "hardwareConcurrency", {
      value: 8,
      configurable: true,
    });

    const result = detectMotionCapabilities();
    expect(result.tier).toBe("tier-a");
    expect(result.reason).toBe("capable-device");
    expect(result.canCustomCursor).toBe(true);
  });
});

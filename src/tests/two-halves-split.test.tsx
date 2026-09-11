import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TwoHalvesSplit } from "@/components/motion/two-halves-split";
import { MotionProvider } from "@/components/motion/motion-provider";
import { pairs } from "@/content/pairs/sample-pairs";
import { resetMotionStore } from "@/lib/motion/motion-store";

function createMatchMediaMock(matchesReducedMotion = false) {
  return vi.fn().mockImplementation((query: string) => ({
    matches: matchesReducedMotion && query.includes("prefers-reduced-motion: reduce"),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("TwoHalvesSplit Component", () => {
  const samplePair = pairs[0];

  beforeEach(() => {
    resetMotionStore();
    window.matchMedia = createMatchMediaMock(false);
  });

  it("renders with slider control and accessibility attributes in tier-a/b", () => {
    render(
      <MotionProvider>
        <TwoHalvesSplit pair={samplePair} />
      </MotionProvider>,
    );

    // Verify slider exists and has correct initial value
    const slider = screen.getByRole("slider", {
      name: /his and her's scent balance slider/i,
    });
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    expect(slider).toHaveAttribute("aria-valuetext", "50% His, 50% Her's");
    expect(slider).toHaveAttribute("tabindex", "0");

    // Verify both worlds exist in DOM
    expect(screen.getByText("His World")).toBeInTheDocument();
    expect(screen.getByText("Her's World")).toBeInTheDocument();
  });

  it("supports keyboard 5% step increments on slider", () => {
    render(
      <MotionProvider>
        <TwoHalvesSplit pair={samplePair} />
      </MotionProvider>,
    );

    const slider = screen.getByRole("slider");

    // Press ArrowRight -> increases by 5% to 55
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "55");

    // Press ArrowLeft -> decreases by 5% back to 50
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(slider).toHaveAttribute("aria-valuenow", "50");
  });

  it("renders static 50/50 fallback in tier-c (prefers-reduced-motion)", () => {
    resetMotionStore();
    window.matchMedia = createMatchMediaMock(true);

    render(
      <MotionProvider>
        <TwoHalvesSplit pair={samplePair} />
      </MotionProvider>,
    );

    // In Tier C, no interactive slider handle is rendered
    const slider = screen.queryByRole("slider");
    expect(slider).not.toBeInTheDocument();

    // But static content and shared accord remain accessible
    expect(screen.getByText("Shared accord")).toBeInTheDocument();
  });
});

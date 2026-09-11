import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MeetingHero } from "@/components/motion/meeting-hero";
import { MotionProvider } from "@/components/motion/motion-provider";

describe("MeetingHero Component", () => {
  it("renders the hero title, eyebrow, and dual bottles", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <MotionProvider>
        <MeetingHero hisName="Midnight Oath" hersName="Velvet Vow" />
      </MotionProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /signature scents, made for two\./i }),
    ).toBeInTheDocument();
    expect(screen.getByText("His & Her's Scents")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore collection/i })).toHaveAttribute(
      "href",
      "/collection",
    );
    expect(screen.getByRole("link", { name: /explore pairs/i })).toHaveAttribute(
      "href",
      "/pairs",
    );

    // Verify the pair composition image or fallback labels are present
    expect(screen.getByText("His")).toBeInTheDocument();
    expect(screen.getByText("Her\u2019s")).toBeInTheDocument();
  });

  it("renders cleanly in tier-c (reduced motion)", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion: reduce"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <MotionProvider>
        <MeetingHero hisName="Midnight Oath" hersName="Velvet Vow" />
      </MotionProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /signature scents, made for two\./i }),
    ).toBeInTheDocument();
  });
});

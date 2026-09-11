import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MotionProvider } from "@/components/motion/motion-provider";
import { OverturePreloader } from "@/components/motion/overture-preloader";
import { FooterClose } from "@/components/motion/footer-close";
import { CollectionReveal } from "@/components/motion/collection-reveal";
import { EditorialLetter } from "@/components/motion/editorial-letter";
import { FragranceNotesGraph } from "@/components/motion/fragrance-notes-graph";
import { RitualFilm } from "@/components/motion/ritual-film";
import { setMotionCapability } from "@/lib/motion/motion-store";

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

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

describe("Signature Animated Moments", () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.matchMedia = createMatchMediaMock(false);
    window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it("OverturePreloader bypasses in tier-c (accessible baseline)", () => {
    setMotionCapability("tier-c");
    const { container } = render(
      <MotionProvider>
        <OverturePreloader />
      </MotionProvider>
    );
    expect(container.firstChild).toBeNull();
  });

  it("FooterClose renders liquid fill line and brand tagline", () => {
    setMotionCapability("tier-c");
    render(
      <MotionProvider>
        <FooterClose />
      </MotionProvider>
    );

    expect(screen.getByTestId("footer-close")).toBeDefined();
    expect(screen.getByText(/Signature scents, made for two/i)).toBeDefined();
  });

  it("CollectionReveal renders children immediately in tier-c", () => {
    setMotionCapability("tier-c");
    render(
      <MotionProvider>
        <CollectionReveal>
          <div>Card Content</div>
        </CollectionReveal>
      </MotionProvider>
    );

    expect(screen.getByText("Card Content")).toBeDefined();
    expect(screen.getByText("Discover")).toBeDefined();
  });

  it("EditorialLetter highlights designated gold words", () => {
    render(
      <MotionProvider>
        <EditorialLetter
          lines={[
            {
              text: "A scent is personal and creates connection.",
              goldWords: ["personal", "connection"],
            },
          ]}
        />
      </MotionProvider>
    );

    expect(screen.getByText("personal")).toBeDefined();
    expect(screen.getByText("connection")).toBeDefined();
  });

  it("FragranceNotesGraph displays Top, Heart, and Base notes", () => {
    setMotionCapability("tier-c");
    render(
      <MotionProvider>
        <FragranceNotesGraph
          notes={{
            top: ["Bergamot", "Cardamom"],
            heart: ["Rose", "Jasmine"],
            base: ["Oud", "Amber"],
          }}
          fragranceName="Midnight Oath"
        />
      </MotionProvider>
    );

    expect(screen.getByText("Bergamot")).toBeDefined();
    expect(screen.getByText("Rose")).toBeDefined();
    expect(screen.getByText("Oud")).toBeDefined();
  });

  it("RitualFilm renders play button in tier-c", () => {
    setMotionCapability("tier-c");
    render(
      <MotionProvider>
        <RitualFilm />
      </MotionProvider>
    );
    expect(screen.getByTestId("ritual-film")).toBeDefined();
    expect(screen.getByLabelText(/play ritual film/i)).toBeDefined();
  });

  it("RitualFilm renders editorial overlay in all tiers", () => {
    setMotionCapability("tier-b");
    render(
      <MotionProvider>
        <RitualFilm />
      </MotionProvider>
    );
    expect(screen.getByText(/A fragrance becomes personal/i)).toBeDefined();
  });
});

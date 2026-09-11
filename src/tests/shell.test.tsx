import { fireEvent, render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { Footer } from "@/components/footer/footer";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { SiteNavigation } from "@/components/navigation/site-navigation";

vi.mock("next/navigation", () => ({
  usePathname: () => "/collection",
}));

describe("application shell", () => {
  it("renders semantic navigation links", () => {
    render(createElement(SiteNavigation));

    expect(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeInTheDocument();
    const primaryNavigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    expect(
      within(primaryNavigation).getByRole("link", { name: "Collection" }),
    ).toHaveAttribute("href", "/collection");
    expect(
      screen.getByRole("button", { name: "Open navigation menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu with Escape and returns focus", () => {
    render(createElement(SiteNavigation));

    const trigger = screen.getByRole("button", {
      name: "Open navigation menu",
    });
    fireEvent.click(trigger);

    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });

    expect(
      screen.getByRole("button", { name: "Open navigation menu" }),
    ).toHaveFocus();
  });

  it("renders the page heading foundation", () => {
    render(
      createElement(PagePlaceholder, {
        eyebrow: "Test",
        title: "Signature scents",
        description: "Foundation copy.",
      }),
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Signature scents" }),
    ).toBeInTheDocument();
  });

  it("renders footer landmarks and legal links", () => {
    render(createElement(Footer));

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      "/legal/privacy",
    );
  });
});

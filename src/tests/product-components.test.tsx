import { fireEvent, render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { ProductImage } from "@/components/media/responsive-media";
import { FragranceCard } from "@/components/product/fragrance-card";
import { FragranceNotesSummary } from "@/components/product/fragrance-notes-summary";
import { PairCard } from "@/components/product/pair-card";
import { PerformanceMeters } from "@/components/product/performance-meters";
import { VariantSelector } from "@/components/product/variant-selector";
import { fragrances } from "@/content/fragrances/sample-fragrances";
import { pairs } from "@/content/pairs/sample-pairs";

describe("product components", () => {
  it("renders a fragrance card with price and availability", () => {
    const inStockFragrance = fragrances.find((f) =>
      f.variants.some((v) => v.inStock),
    )!;
    render(createElement(FragranceCard, { fragrance: inStockFragrance }));

    expect(
      screen.getByRole("link", {
        name: new RegExp(inStockFragrance.name, "i"),
      }),
    ).toHaveAttribute("href", `/fragrance/${inStockFragrance.slug}`);
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("renders an unavailable fragrance card indicator correctly", () => {
    render(createElement(FragranceCard, { fragrance: fragrances[0] }));
    expect(screen.getByText("Unavailable")).toBeInTheDocument();
  });

  it("renders a pair card as one set", () => {
    render(createElement(PairCard, { pair: pairs[0] }));

    expect(
      screen.getByRole("link", { name: /The First Night/i }),
    ).toHaveAttribute("href", "/pairs/the-first-night");
    expect(screen.getByText(/Midnight Oath \+ Velvet Vow/)).toBeInTheDocument();
    expect(screen.getByText(/Shared accord: Amber, Musk/)).toBeInTheDocument();
  });

  it("renders accessible performance text", () => {
    render(
      createElement(PerformanceMeters, {
        performance: fragrances[0].performance,
      }),
    );

    expect(
      screen.getByLabelText("Fragrance performance ratings"),
    ).toBeInTheDocument();
    expect(screen.getAllByText("4 out of 5")).toHaveLength(2);
  });

  it("supports keyboard variant changes", () => {
    const variants = [
      {
        sku: "TEST-50",
        size: 50,
        unit: "ml" as const,
        price: 45000,
        currency: "NGN" as const,
        inStock: true,
      },
      {
        sku: "TEST-100",
        size: 100,
        unit: "ml" as const,
        price: 72000,
        currency: "NGN" as const,
        inStock: true,
      },
    ];
    render(createElement(VariantSelector, { variants }));

    const group = screen.getByRole("radiogroup", {
      name: "Fragrance variants",
    });
    fireEvent.keyDown(group, { key: "ArrowDown" });

    expect(within(group).getByRole("radio", { name: /100ml/i })).toBeChecked();
  });

  it("renders static fragrance note groups", () => {
    render(
      createElement(FragranceNotesSummary, { notes: fragrances[0].notes }),
    );

    expect(
      screen.getByLabelText("Fragrance notes summary"),
    ).toBeInTheDocument();
    expect(screen.getByText("Bergamot, Pink Pepper")).toBeInTheDocument();
  });

  it("renders an intentional placeholder when media is missing", () => {
    render(createElement(ProductImage, { media: { alt: "Missing product" } }));

    expect(screen.getByText("Product media pending")).toBeInTheDocument();
  });
});

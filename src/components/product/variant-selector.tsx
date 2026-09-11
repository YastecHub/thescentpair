"use client";

import { useId, useState } from "react";
import { clsx } from "clsx";
import { formatPrice } from "@/lib/content/repository";
import type { FragranceVariant } from "@/lib/content/schemas";

export function VariantSelector({
  variants,
  name = "variant",
}: Readonly<{ variants: readonly FragranceVariant[]; name?: string }>) {
  const id = useId();
  const [selectedSku, setSelectedSku] = useState(variants[0]?.sku);
  const availableVariants = variants.filter((variant) => variant.inStock);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (
      !["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(
        event.key,
      ) ||
      availableVariants.length === 0
    ) {
      return;
    }

    event.preventDefault();
    const currentIndex = availableVariants.findIndex(
      (variant) => variant.sku === selectedSku,
    );
    const direction =
      event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const nextIndex =
      (currentIndex + direction + availableVariants.length) %
      availableVariants.length;
    setSelectedSku(availableVariants[nextIndex].sku);
  }

  return (
    <fieldset className="grid gap-3">
      <legend className="type-eyebrow text-gold-300">Choose size</legend>
      <div
        className="grid gap-3"
        role="radiogroup"
        aria-label="Fragrance variants"
        onKeyDown={handleKeyDown}
      >
        {variants.map((variant) => {
          const optionId = `${id}-${variant.sku}`;
          return (
            <label
              key={variant.sku}
              htmlFor={optionId}
              className={clsx(
                "flex min-h-11 cursor-pointer items-center justify-between gap-4 border p-4 transition-colors",
                selectedSku === variant.sku
                  ? "border-gold-300 bg-onyx-800"
                  : "border-onyx-700 bg-onyx-900 hover:border-gold-300/60",
                !variant.inStock && "cursor-not-allowed opacity-55",
              )}
            >
              <span>
                <span className="block font-semibold text-parchment">
                  {variant.size}
                  {variant.unit}
                </span>
                <span className="block text-sm text-parchment/55">
                  SKU {variant.sku}
                </span>
              </span>
              <span className="text-right">
                <span className="block type-price">
                  {formatPrice(variant.price, variant.currency)}
                </span>
                <span className="block text-sm text-parchment/55">
                  {variant.inStock ? "Available" : "Unavailable"}
                </span>
              </span>
              <input
                id={optionId}
                className="sr-only"
                type="radio"
                name={name}
                value={variant.sku}
                checked={selectedSku === variant.sku}
                disabled={!variant.inStock}
                onChange={() => setSelectedSku(variant.sku)}
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

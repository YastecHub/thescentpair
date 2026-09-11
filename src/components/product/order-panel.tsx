"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { formatPrice } from "@/lib/content/repository";
import type { FragranceVariant, PairVariant } from "@/lib/content/schemas";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp/whatsapp-order";
import { trackEvent } from "@/lib/analytics/analytics";

type OrderVariant = FragranceVariant | PairVariant;

function variantLabel(variant: OrderVariant) {
  return "size" in variant
    ? `${variant.size}${variant.unit}`
    : `Set: ${variant.contents.join(" + ")}`;
}

export function OrderPanel({
  itemName,
  itemType,
  variants,
  pagePath,
  supportingText = "Orders are confirmed personally via WhatsApp. Delivery and payment details will be coordinated in chat.",
}: Readonly<{
  itemName: string;
  itemType: "fragrance" | "pair";
  variants: readonly OrderVariant[];
  pagePath: string;
  supportingText?: string;
}>) {
  const [selectedSku, setSelectedSku] = useState(
    variants.find((variant) => variant.inStock)?.sku ?? variants[0]?.sku,
  );
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedVariant = useMemo(
    () =>
      variants.find((variant) => variant.sku === selectedSku) ?? variants[0],
    [selectedSku, variants],
  );
  const canOrder = Boolean(selectedVariant?.inStock);

  const orderData = useMemo(() => {
    if (!selectedVariant) return null;
    return buildWhatsAppOrderUrl({
      itemName,
      itemType,
      sku: selectedVariant.sku,
      variantLabel: variantLabel(selectedVariant),
      price: selectedVariant.price,
      currency: selectedVariant.currency,
      quantity,
      pagePath,
    });
  }, [itemName, itemType, selectedVariant, quantity, pagePath]);

  const handleWhatsAppClick = () => {
    if (!orderData || !selectedVariant) return;

    trackEvent("order_intent", {
      sku: selectedVariant.sku,
      itemName,
      itemType,
      price: selectedVariant.price,
      currency: selectedVariant.currency,
      quantity,
      refCode: orderData.refCode,
      method: "whatsapp_direct",
    });

    window.open(orderData.url, "_blank", "noopener,noreferrer");
  };

  const handleCopy = () => {
    if (!orderData || !selectedVariant) return;
    navigator.clipboard.writeText(orderData.message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);

      trackEvent("order_intent", {
        sku: selectedVariant.sku,
        itemName,
        itemType,
        price: selectedVariant.price,
        currency: selectedVariant.currency,
        quantity,
        refCode: orderData.refCode,
        method: "clipboard_copy",
      });
    });
  };

  return (
    <section
      className="border border-onyx-700 bg-onyx-800 p-5 md:p-6"
      aria-labelledby="order-panel-title"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="type-eyebrow text-gold-300">Order via WhatsApp</p>
          <h2
            id="order-panel-title"
            className="mt-2 font-display text-3xl leading-none text-parchment"
          >
            Reserve Your Signature
          </h2>
        </div>
        <span className="rounded-full border border-gold-300/35 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gold-300">
          Direct Concierge
        </span>
      </div>

      <fieldset className="mt-6 grid gap-3">
        <legend className="sr-only">Select {itemName} variant</legend>
        {variants.map((variant) => {
          const checked = selectedVariant?.sku === variant.sku;
          return (
            <label
              key={variant.sku}
              className={clsx(
                "grid min-h-11 cursor-pointer gap-2 border p-4 transition-colors sm:grid-cols-[1fr_auto] sm:items-center",
                checked
                  ? "border-gold-300 bg-onyx-900"
                  : "border-onyx-700 hover:border-gold-300/55",
                !variant.inStock && "cursor-not-allowed opacity-55",
              )}
            >
              <span>
                <span className="block font-semibold text-parchment">
                  {variantLabel(variant)}
                </span>
                <span className="block text-sm text-parchment/55">
                  SKU {variant.sku}
                </span>
              </span>
              <span className="type-price">
                {formatPrice(variant.price, variant.currency)}
              </span>
              <input
                className="sr-only"
                type="radio"
                name={`${itemType}-order-variant`}
                value={variant.sku}
                checked={checked}
                disabled={!variant.inStock}
                onChange={() => setSelectedSku(variant.sku)}
              />
            </label>
          );
        })}
      </fieldset>

      <label
        className="mt-5 grid gap-2 text-sm font-semibold text-parchment"
        htmlFor={`${itemType}-quantity`}
      >
        Quantity
        <select
          id={`${itemType}-quantity`}
          className="min-h-11 border border-onyx-700 bg-onyx-900 px-4 text-parchment"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      {selectedVariant ? (
        <dl className="mt-5 grid gap-2 border-t border-onyx-700 pt-5 text-sm text-parchment/68">
          <div className="flex justify-between gap-4">
            <dt>Selected SKU</dt>
            <dd className="font-semibold text-gold-300">
              {selectedVariant.sku}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Unit price</dt>
            <dd className="font-semibold text-gold-300">
              {formatPrice(selectedVariant.price, selectedVariant.currency)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>
              Total ({quantity} item{quantity > 1 ? "s" : ""})
            </dt>
            <dd className="font-semibold text-foil text-base">
              {formatPrice(
                selectedVariant.price * quantity,
                selectedVariant.currency,
              )}
            </dd>
          </div>
        </dl>
      ) : null}

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-gold-300 bg-gold-300 px-6 py-3 font-sans text-sm font-semibold tracking-wider text-ink-900 shadow-[0_0_20px_rgba(217,188,106,0.3)] transition-all hover:bg-gold-100 hover:shadow-[0_0_30px_rgba(240,226,184,0.5)] disabled:border-parchment/25 disabled:bg-transparent disabled:text-parchment/45"
          disabled={!canOrder}
        >
          {canOrder ? "Order on WhatsApp" : "Unavailable"}
        </button>

        {canOrder ? (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-xs text-parchment/60 underline underline-offset-4 hover:text-gold-300"
          >
            Review or copy message manually
          </button>
        ) : null}
      </div>

      <p className="mt-3 text-xs text-parchment/58">{supportingText}</p>

      {/* Clipboard Fallback Modal */}
      {showModal && orderData ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg border border-onyx-700 bg-onyx-900 p-6 md:p-8 shadow-2xl">
            <h3
              id="order-modal-title"
              className="font-display text-2xl font-semibold text-foil"
            >
              Your WhatsApp Order Message
            </h3>
            <p className="mt-2 text-xs text-parchment/70">
              Reference code:{" "}
              <span className="font-mono text-gold-300">
                {orderData.refCode}
              </span>
            </p>

            <pre className="mt-4 max-h-56 overflow-y-auto whitespace-pre-wrap rounded border border-onyx-700 bg-onyx-800 p-4 font-mono text-xs text-parchment/90">
              {orderData.message}
            </pre>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-gold-300 px-5 text-xs font-semibold tracking-wider text-gold-300 hover:bg-gold-300 hover:text-ink-900"
              >
                {copied ? "Copied to clipboard!" : "Copy message"}
              </button>
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="inline-flex min-h-10 items-center justify-center rounded-full bg-gold-300 px-5 text-xs font-semibold tracking-wider text-ink-900 hover:bg-gold-100"
              >
                Open WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-onyx-700 px-4 text-xs text-parchment/70 hover:text-parchment"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

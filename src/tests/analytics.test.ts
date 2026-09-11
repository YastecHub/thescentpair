import { describe, it, expect, vi } from "vitest";
import { trackEvent } from "@/lib/analytics/analytics";

describe("Analytics Event Dispatcher", () => {
  it("pushes order_intent to dataLayer", () => {
    const dataLayer: unknown[] = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = dataLayer;

    trackEvent("order_intent", {
      sku: "MO-100",
      itemName: "Midnight Oath",
      itemType: "fragrance",
      price: 72000,
      currency: "NGN",
      quantity: 1,
      refCode: "HHS-123456",
      method: "whatsapp_direct",
    });

    expect(dataLayer.length).toBe(1);
    expect(dataLayer[0]).toMatchObject({
      event: "order_intent",
      sku: "MO-100",
      method: "whatsapp_direct",
    });
  });

  it("calls window.gtag for turntable_engage", () => {
    delete (window as unknown as { dataLayer?: unknown }).dataLayer;
    const gtagMock = vi.fn();
    (window as unknown as { gtag: typeof gtagMock }).gtag = gtagMock;

    trackEvent("turntable_engage", {
      fragranceSlug: "midnight-oath",
      rotationPct: 45,
      motionTier: "tier-a",
    });

    expect(gtagMock).toHaveBeenCalledWith("event", "turntable_engage", {
      fragranceSlug: "midnight-oath",
      rotationPct: 45,
      motionTier: "tier-a",
    });
  });

  it("pushes filter_apply with result count", () => {
    const dataLayer: unknown[] = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = dataLayer;

    trackEvent("filter_apply", {
      facet: "audience",
      value: "his",
      resultCount: 1,
    });

    expect(dataLayer[0]).toMatchObject({
      event: "filter_apply",
      facet: "audience",
      value: "his",
      resultCount: 1,
    });
  });

  it("pushes list_signup with source", () => {
    const dataLayer: unknown[] = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = dataLayer;

    trackEvent("list_signup", { source: "footer" });

    expect(dataLayer[0]).toMatchObject({
      event: "list_signup",
      source: "footer",
    });
  });
});

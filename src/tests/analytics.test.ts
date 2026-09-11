import { describe, it, expect, vi } from "vitest";
import { trackEvent } from "@/lib/analytics/analytics";

describe("Analytics Event Dispatcher", () => {
  it("pushes events to dataLayer when available", () => {
    const dataLayer: unknown[] = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = dataLayer;

    trackEvent("order_intent", {
      sku: "MO-100",
      itemName: "Midnight Oath",
      itemType: "fragrance",
      price: 185000,
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

  it("calls window.gtag when dataLayer is not an array but gtag is a function", () => {
    delete (window as unknown as { dataLayer?: unknown }).dataLayer;
    const gtagMock = vi.fn();
    (window as unknown as { gtag: typeof gtagMock }).gtag = gtagMock;

    trackEvent("turntable_engage", {
      fragranceSlug: "midnight-oath",
      trigger: "scroll",
      framesLoaded: 36,
    });

    expect(gtagMock).toHaveBeenCalledWith("event", "turntable_engage", {
      fragranceSlug: "midnight-oath",
      trigger: "scroll",
      framesLoaded: 36,
    });
  });
});

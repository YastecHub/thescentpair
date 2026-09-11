/**
 * Client & Server-Safe Analytics Dispatcher
 * Tracks signature brand moments and conversion events.
 */

export type AnalyticsEventType =
  | "order_intent"
  | "turntable_engage"
  | "split_drag"
  | "note_explore"
  | "ritual_watch"
  | "collection_filter"
  | "page_view";

export interface AnalyticsPayload {
  order_intent: {
    sku: string;
    itemName: string;
    itemType: "fragrance" | "pair";
    price: number;
    currency: string;
    quantity: number;
    refCode: string;
    method: "whatsapp_direct" | "clipboard_copy";
  };
  turntable_engage: {
    fragranceSlug: string;
    trigger: "scroll" | "drag";
    framesLoaded: number;
  };
  split_drag: {
    pairSlug: string;
    ratio: number;
  };
  note_explore: {
    noteName: string;
    stage: "Top" | "Heart" | "Base";
    fragranceName?: string;
  };
  ritual_watch: {
    scrollProgress: number;
    completed: boolean;
  };
  collection_filter: {
    audience?: string;
    family?: string;
    count: number;
  };
  page_view: {
    path: string;
    tier: string;
  };
}

/**
 * Dispatches an event to the dataLayer or window.gtag if available,
 * and logs to console in development mode.
 */
export function trackEvent<E extends AnalyticsEventType>(
  event: E,
  data: AnalyticsPayload[E]
) {
  if (typeof window === "undefined") return;

  // Development telemetry logging
  if (process.env.NODE_ENV === "development") {
    console.debug(`[Analytics] ${event}:`, data);
  }

  try {
    // Standard Google Tag Manager dataLayer
    const win = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({ event, ...data });
    } else if (typeof win.gtag === "function") {
      win.gtag("event", event, data);
    }
  } catch {
    // Non-blocking telemetry
  }
}

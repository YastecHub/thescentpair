/**
 * Client & Server-Safe Analytics Dispatcher
 * Event taxonomy per 03_HHS_Master_Document.pdf Section 19.
 */

export type AnalyticsEventType =
  | "order_intent"
  | "fragrance_view"
  | "turntable_engage"
  | "split_drag"
  | "note_open"
  | "ritual_progress"
  | "filter_apply"
  | "pair_upsell_click"
  | "list_signup"
  | "enquiry_submit"
  | "tier_assigned"
  | "perf_degrade";

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
  fragrance_view: {
    slug: string;
    audience: string;
    family: string;
    referrerType: string;
  };
  turntable_engage: {
    fragranceSlug: string;
    rotationPct: number;
    motionTier: string;
  };
  split_drag: {
    pairSlug: string;
    maxOffset: number;
    inputType: "pointer" | "touch" | "keyboard";
  };
  note_open: {
    noteId: string;
    fragranceSlug: string;
  };
  ritual_progress: {
    progress: 25 | 50 | 75 | 100;
    motionTier: string;
  };
  filter_apply: {
    facet: string;
    value: string;
    resultCount: number;
  };
  pair_upsell_click: {
    startingFragrance: string;
    pairSlug: string;
  };
  list_signup: {
    source: string;
  };
  enquiry_submit: {
    topic: string;
  };
  tier_assigned: {
    tier: string;
    reason: string;
  };
  perf_degrade: {
    startingTier: string;
    newTier: string;
    avgFps: number;
  };
}

export function trackEvent<E extends AnalyticsEventType>(
  event: E,
  data: AnalyticsPayload[E],
) {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV === "development") {
    console.debug(`[Analytics] ${event}:`, data);
  }

  try {
    const win = window as unknown as {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({ event, ...data });
    } else if (typeof win.gtag === "function") {
      win.gtag("event", event, data);
    }
  } catch {
    // Non-blocking
  }
}

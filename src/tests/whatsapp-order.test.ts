import { describe, it, expect } from "vitest";
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
} from "@/lib/whatsapp/whatsapp-order";

describe("WhatsApp Order URL & Message Generation", () => {
  const sampleDetails = {
    itemName: "Midnight Oath",
    itemType: "fragrance" as const,
    sku: "MO-100",
    variantLabel: "100ml",
    price: 185000,
    currency: "NGN",
    quantity: 2,
    pagePath: "/fragrance/midnight-oath",
  };

  it("generates a structured message with all required brand details", () => {
    const message = buildWhatsAppOrderMessage(sampleDetails, "TEST-REF-99");

    expect(message).toContain("*HIS & HER'S SCENTS — Order Inquiry*");
    expect(message).toContain("#TEST-REF-99");
    expect(message).toContain("Midnight Oath");
    expect(message).toContain("Individual Fragrance");
    expect(message).toContain("SKU: MO-100");
    expect(message).toContain("Quantity:* 2");
    expect(message).toContain("Total Value:* ₦370,000");
    expect(message).toContain(
      "https://thescentpair.com/fragrance/midnight-oath",
    );
  });

  it("builds a valid wa.me URL with clean phone number and encoded payload", () => {
    const { url, refCode } = buildWhatsAppOrderUrl(
      sampleDetails,
      "+234 801 234 5678",
    );

    expect(url).toMatch(/^https:\/\/wa\.me\/2348012345678\?text=/);
    expect(url).toContain(encodeURIComponent(`Order Reference: #${refCode}`));
  });
});

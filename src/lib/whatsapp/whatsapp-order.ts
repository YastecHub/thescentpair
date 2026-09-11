/**
 * WhatsApp Order Generation & Payload Formatting
 * Follows 03_HHS_Master_Document.pdf Section 05: How Customers Order.
 */

export interface WhatsAppOrderDetails {
  itemName: string;
  itemType: "fragrance" | "pair";
  sku: string;
  variantLabel: string;
  price: number;
  currency: string;
  quantity: number;
  pagePath: string;
}

// Configurable WhatsApp Business Number (default fallback or env var)
export const DEFAULT_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "2348000000000";

/**
 * Generates an elegant, structured WhatsApp message payload for the customer.
 */
export function buildWhatsAppOrderMessage(
  details: WhatsAppOrderDetails,
  refCode?: string
): string {
  const reference =
    refCode || `HHS-${Math.floor(100000 + Math.random() * 900000)}`;
  const totalAmount = details.price * details.quantity;
  const formattedTotal = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: details.currency,
    maximumFractionDigits: 0,
  }).format(totalAmount);

  return [
    `*HIS & HER'S SCENTS — Order Inquiry*`,
    `Order Reference: #${reference}`,
    `----------------------------------------`,
    `*Item:* ${details.itemName}`,
    `*Type:* ${details.itemType === "pair" ? "Pair Set" : "Individual Fragrance"}`,
    `*Selection:* ${details.variantLabel} (SKU: ${details.sku})`,
    `*Quantity:* ${details.quantity}`,
    `*Total Value:* ${formattedTotal}`,
    `----------------------------------------`,
    `*Customer Details:*`,
    `Name: [Please enter your name]`,
    `Delivery Address / City: [Please enter destination]`,
    `Gift Note (Optional): [Leave blank or add note]`,
    `----------------------------------------`,
    `Origin: https://thescentpair.com${details.pagePath}`,
  ].join("\n");
}

/**
 * Generates the direct WhatsApp click-to-chat URL.
 */
export function buildWhatsAppOrderUrl(
  details: WhatsAppOrderDetails,
  phone: string = DEFAULT_WHATSAPP_NUMBER
): { url: string; message: string; refCode: string } {
  const refCode = `HHS-${Math.floor(100000 + Math.random() * 900000)}`;
  const message = buildWhatsAppOrderMessage(details, refCode);
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  return { url, message, refCode };
}

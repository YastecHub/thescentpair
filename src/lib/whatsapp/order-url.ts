import type {
  Fragrance,
  FragranceVariant,
  Pair,
  PairVariant,
} from "@/lib/content/schemas";

type OrderItem = Fragrance | Pair;
type OrderVariant = FragranceVariant | PairVariant;

export function buildWhatsAppOrderUrl({
  phone,
  item,
  variant,
  quantity,
  pageUrl,
}: {
  phone: string;
  item: OrderItem;
  variant: OrderVariant;
  quantity: number;
  pageUrl: string;
}) {
  const reference = variant.sku;
  const price = variant.price.toLocaleString("en-NG");
  const lines = [
    "Hello His & Her's Scents",
    "",
    "I'd like to order:",
    `- ${item.name}`,
    "size" in variant
      ? `- Size: ${variant.size}${variant.unit}`
      : `- Set: ${variant.contents.join(", ")}`,
    `- Quantity: ${quantity}`,
    `- Price: NGN ${price}`,
    `- Ref: ${reference}`,
    "",
    `Page: ${pageUrl}`,
    "",
    "My name:",
    "Delivery address:",
    "Preferred delivery date:",
  ];

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

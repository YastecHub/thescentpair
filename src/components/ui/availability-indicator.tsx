import { clsx } from "clsx";

export function AvailabilityIndicator({
  inStock,
  className,
}: Readonly<{ inStock: boolean; className?: string }>) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 text-sm",
        inStock ? "text-gold-300" : "text-parchment/55",
        className,
      )}
    >
      <span
        className={clsx(
          "h-2 w-2 rounded-full",
          inStock ? "bg-gold-300" : "bg-parchment/35",
        )}
        aria-hidden="true"
      />
      {inStock ? "Available" : "Unavailable"}
    </span>
  );
}

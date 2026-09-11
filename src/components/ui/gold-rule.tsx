import { clsx } from "clsx";

export function GoldRule({ className }: Readonly<{ className?: string }>) {
  return (
    <div
      className={clsx("h-px w-full bg-[var(--foil)]", className)}
      aria-hidden="true"
    />
  );
}

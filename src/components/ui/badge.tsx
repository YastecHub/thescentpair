import { clsx } from "clsx";

export function Badge({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full border border-gold-300/35 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-300",
        className,
      )}
    >
      {children}
    </span>
  );
}

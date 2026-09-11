import { clsx } from "clsx";

export function Container({
  className,
  children,
}: Readonly<{ className?: string; children: React.ReactNode }>) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

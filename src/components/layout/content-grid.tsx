import { clsx } from "clsx";

export function ContentGrid({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div
      className={clsx("grid gap-6 md:grid-cols-2 xl:grid-cols-3", className)}
    >
      {children}
    </div>
  );
}

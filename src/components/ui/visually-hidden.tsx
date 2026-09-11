import { clsx } from "clsx";

export function VisuallyHidden({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <span className={clsx("sr-only", className)}>{children}</span>;
}

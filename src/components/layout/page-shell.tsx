import { clsx } from "clsx";

export function PageShell({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div className={clsx("bg-onyx-900 text-parchment", className)}>
      {children}
    </div>
  );
}

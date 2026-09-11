import { clsx } from "clsx";

export function EditorialColumn({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div className={clsx("max-w-readable space-y-6 text-body", className)}>
      {children}
    </div>
  );
}

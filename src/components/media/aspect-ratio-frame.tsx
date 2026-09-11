import { clsx } from "clsx";

export function AspectRatioFrame({
  children,
  ratio = "4 / 5",
  className,
}: Readonly<{
  children: React.ReactNode;
  ratio?: string;
  className?: string;
}>) {
  return (
    <div
      className={clsx("relative overflow-hidden bg-onyx-800", className)}
      style={{ aspectRatio: ratio }}
    >
      {children}
    </div>
  );
}

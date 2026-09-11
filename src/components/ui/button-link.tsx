import Link from "next/link";
import { clsx } from "clsx";

export function ButtonLink({
  href,
  children,
  className,
  variant = "secondary",
}: Readonly<{
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}>) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex min-h-11 items-center justify-center rounded-full border px-6 py-3 type-button transition-colors duration-fast ease-out-soft",
        isPrimary
          ? "border-gold-300 bg-gold-300 text-ink-900 hover:bg-gold-100 active:bg-gold-500"
          : "border-gold-300 text-gold-300 hover:bg-gold-300 hover:text-ink-900 active:border-gold-500 active:bg-gold-500",
        className,
      )}
    >
      {children}
    </Link>
  );
}

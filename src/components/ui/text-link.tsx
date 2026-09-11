import Link from "next/link";
import { clsx } from "clsx";

export function TextLink({
  href,
  children,
  className,
}: Readonly<{ href: string; children: React.ReactNode; className?: string }>) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex min-h-11 items-center text-gold-300 underline decoration-gold-300/50 underline-offset-4 transition-colors hover:text-gold-100 active:text-gold-500",
        className,
      )}
    >
      {children}
    </Link>
  );
}

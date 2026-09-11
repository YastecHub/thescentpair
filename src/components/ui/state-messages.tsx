import { clsx } from "clsx";
import { ButtonLink } from "@/components/ui/button-link";

export function EmptyState({
  title,
  message,
  actionHref,
  actionLabel,
}: Readonly<{
  title: string;
  message: string;
  actionHref?: string;
  actionLabel?: string;
}>) {
  return (
    <section
      className="border border-onyx-700 bg-onyx-800 p-6 text-parchment md:p-8"
      aria-labelledby="empty-state-title"
    >
      <h2 id="empty-state-title" className="font-display text-2xl">
        {title}
      </h2>
      <p className="mt-3 max-w-readable text-sm text-parchment/70">{message}</p>
      {actionHref && actionLabel ? (
        <ButtonLink className="mt-6" href={actionHref}>
          {actionLabel}
        </ButtonLink>
      ) : null}
    </section>
  );
}

export function ErrorState({
  title,
  message,
  className,
}: Readonly<{ title: string; message: string; className?: string }>) {
  return (
    <section
      className={clsx(
        "border border-gold-700 bg-onyx-800 p-6 text-parchment",
        className,
      )}
      aria-live="polite"
    >
      <h2 className="font-display text-2xl text-gold-300">{title}</h2>
      <p className="mt-3 max-w-readable text-sm text-parchment/70">{message}</p>
    </section>
  );
}

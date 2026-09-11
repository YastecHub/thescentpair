import { clsx } from "clsx";

export function MediaPlaceholder({
  label = "Media pending",
  className,
}: Readonly<{ label?: string; className?: string }>) {
  return (
    <div
      className={clsx(
        "flex h-full w-full items-center justify-center border border-onyx-700 bg-[radial-gradient(circle_at_50%_35%,rgba(217,188,106,0.16),transparent_34%),linear-gradient(145deg,var(--onyx-800),var(--onyx-900))] p-6 text-center",
        className,
      )}
    >
      <div>
        <div
          className="mx-auto mb-4 h-px w-16 bg-[var(--foil)]"
          aria-hidden="true"
        />
        <p className="type-eyebrow text-gold-300">{label}</p>
      </div>
    </div>
  );
}

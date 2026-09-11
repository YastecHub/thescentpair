import { clsx } from "clsx";

export function FormField({
  id,
  label,
  hint,
  error,
  children,
}: Readonly<{
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}>) {
  const describedBy =
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-parchment">
        {label}
      </label>
      <div
        className={clsx(
          "[&>input]:min-h-11 [&>input]:w-full [&>input]:border [&>input]:border-onyx-700 [&>input]:bg-onyx-800 [&>input]:text-parchment [&>input]:placeholder:text-parchment/45",
          error && "[&>input]:border-gold-700",
        )}
        aria-describedby={describedBy}
      >
        {children}
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-parchment/60">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-semibold text-gold-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

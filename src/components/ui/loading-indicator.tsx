export function LoadingIndicator({
  label = "Loading",
}: Readonly<{ label?: string }>) {
  return (
    <div
      className="inline-flex min-h-11 items-center gap-3 text-sm text-parchment/72"
      role="status"
    >
      <span className="h-2 w-8 bg-[var(--foil)]" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

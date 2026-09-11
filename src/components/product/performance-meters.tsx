import type { Fragrance } from "@/lib/content/schemas";

const labels = [
  ["longevity", "Longevity"],
  ["sillage", "Sillage"],
  ["projection", "Projection"],
] as const;

export function PerformanceMeters({
  performance,
}: Readonly<{ performance: Fragrance["performance"] }>) {
  return (
    <dl className="grid gap-4" aria-label="Fragrance performance ratings">
      {labels.map(([key, label]) => (
        <div key={key} className="grid gap-2">
          <div className="flex items-center justify-between gap-4 text-sm">
            <dt className="text-parchment/72">{label}</dt>
            <dd className="font-semibold text-gold-300">
              {performance[key]} out of 5
            </dd>
          </div>
          <div className="grid grid-cols-5 gap-1" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={
                  index < performance[key]
                    ? "h-1 bg-gold-300"
                    : "h-1 bg-onyx-700"
                }
              />
            ))}
          </div>
        </div>
      ))}
    </dl>
  );
}

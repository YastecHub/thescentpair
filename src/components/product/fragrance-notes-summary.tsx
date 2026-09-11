import { resolveNoteById } from "@/lib/content/repository";
import type { Fragrance } from "@/lib/content/schemas";

const groups = [
  ["top", "Top"],
  ["heart", "Heart"],
  ["base", "Base"],
] as const;

export function FragranceNotesSummary({
  notes,
}: Readonly<{ notes: Fragrance["notes"] }>) {
  return (
    <div className="grid gap-4" aria-label="Fragrance notes summary">
      {groups.map(([key, label]) => (
        <div key={key} className="border-l border-gold-300/35 pl-4">
          <h3 className="type-eyebrow text-gold-300">{label}</h3>
          <p className="mt-2 text-sm text-parchment/72">
            {notes[key]
              .map((noteId) => resolveNoteById(noteId)?.name ?? noteId)
              .join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}

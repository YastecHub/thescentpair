import { resolveNoteById } from "@/lib/content/repository";
import { MediaPlaceholder } from "@/components/media/media-placeholder";
import type { Fragrance } from "@/lib/content/schemas";

const groups = [
  ["top", "Top notes", "The opening. First impression."],
  ["heart", "Heart notes", "The character. What defines the scent."],
  ["base", "Base notes", "The memory. What lingers closest to skin."],
] as const;

export function NotesDetail({
  notes,
}: Readonly<{ notes: Fragrance["notes"] }>) {
  return (
    <div
      className="grid gap-12 lg:grid-cols-3"
      aria-label="Fragrance note groups"
    >
      {groups.map(([key, label, description]) => {
        const noteItems = notes[key].map((id) => ({
          id,
          note: resolveNoteById(id),
        }));

        return (
          <div key={key} className="border-t border-gold-300/35 pt-6">
            <h3 className="type-eyebrow text-gold-300">{label}</h3>
            <p className="mt-2 text-sm text-parchment/62">{description}</p>

            <ul className="mt-6 grid gap-5" role="list">
              {noteItems.map(({ id, note }) => (
                <li key={id} className="grid gap-3 sm:grid-cols-[3rem_1fr]">
                  <div
                    className="relative h-12 w-12 overflow-hidden border border-onyx-700 bg-onyx-800"
                    aria-hidden="true"
                  >
                    {note ? (
                      <div
                        className="h-full w-full"
                        style={{ background: `${note.accentColor}22` }}
                      >
                        <MediaPlaceholder label="" />
                      </div>
                    ) : (
                      <MediaPlaceholder label="" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-parchment">
                      {note?.name ?? id.replaceAll("-", " ")}
                    </p>
                    {note?.shortDescription ? (
                      <p className="mt-1 text-sm text-parchment/62">
                        {note.shortDescription}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

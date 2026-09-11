import Link from "next/link";
import { ProductImage } from "@/components/media/responsive-media";
import { getRelatedFragrances } from "@/lib/content/repository";
import type { Story } from "@/lib/content/schemas";

export function StoryCard({ story }: Readonly<{ story: Story }>) {
  const related = getRelatedFragrances(story);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(story.publishedAt));

  return (
    <article className="group relative border border-onyx-700 bg-onyx-800 text-parchment overflow-hidden transition-colors hover:border-gold-300/50">
      <Link
        href={`/stories/${story.slug}`}
        className="block focus-visible:outline-offset-4"
      >
        {/* Cover image */}
        <div className="overflow-hidden">
          <ProductImage
            media={{
              publicId: story.coverMedia,
              alt: `${story.title} cover image`,
            }}
            ratio="16 / 10"
            className="transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Content */}
        <div className="p-5 grid gap-3">
          {/* Dateline with gold dot */}
          <div className="flex items-center gap-2">
            <div
              className="h-1.5 w-1.5 rounded-full bg-gold-300/70"
              aria-hidden="true"
            />
            <time
              className="type-eyebrow text-gold-300 text-xs"
              dateTime={story.publishedAt}
            >
              {formattedDate}
            </time>
          </div>

          <h2 className="font-display text-2xl leading-snug text-parchment group-hover:text-gold-100 transition-colors sm:text-3xl">
            {story.title}
          </h2>

          <p className="text-sm text-parchment/68 leading-relaxed line-clamp-3">
            {story.excerpt}
          </p>

          {/* Footer: related fragrances + read arrow */}
          <div className="flex items-center justify-between gap-4 border-t border-onyx-700/60 pt-3 mt-1">
            {related.length > 0 ? (
              <p className="text-xs text-parchment/45">
                {related.map((f) => f.name).join(" · ")}
              </p>
            ) : (
              <span />
            )}
            <span
              className="text-xs text-gold-300 opacity-0 transition-opacity duration-fast group-hover:opacity-100"
              aria-hidden="true"
            >
              Read →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

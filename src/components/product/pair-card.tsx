import Link from "next/link";
import { ProductImage } from "@/components/media/responsive-media";
import { AvailabilityIndicator } from "@/components/ui/availability-indicator";
import { Badge } from "@/components/ui/badge";
import {
  formatPrice,
  getFragranceBySlug,
  getSharedNotes,
  getStartingPrice,
  hasAvailableVariant,
} from "@/lib/content/repository";
import type { Pair } from "@/lib/content/schemas";

export function PairCard({
  pair,
  useFragranceImages = false,
}: Readonly<{ pair: Pair; useFragranceImages?: boolean }>) {
  const his = getFragranceBySlug(pair.hisFragranceSlug);
  const hers = getFragranceBySlug(pair.hersFragranceSlug);
  const sharedNotes = getSharedNotes(pair);
  const startingPrice = getStartingPrice(pair.setVariants);
  const inStock = hasAvailableVariant(pair.setVariants);

  return (
    <article className="group overflow-hidden border border-onyx-700 bg-onyx-800 text-parchment transition-colors hover:border-gold-300/50" data-cursor="discover">
      <Link
        href={`/pairs/${pair.slug}`}
        className="block focus-visible:outline-offset-4"
      >
        {/* Dual world imagery */}
        <div className="grid grid-cols-2 overflow-hidden">
          <div className="overflow-hidden">
            <ProductImage
              media={{
                publicId: useFragranceImages ? his?.media.heroLight : pair.media.hisWorld,
                alt: `${his?.name ?? "His fragrance"} world`,
              }}
              ratio="4 / 5"
              className="bg-his-500 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
          <div className="overflow-hidden">
            <ProductImage
              media={{
                publicId: useFragranceImages ? hers?.media.heroLight : pair.media.hersWorld,
                alt: `${hers?.name ?? "Her's fragrance"} world`,
              }}
              ratio="4 / 5"
              className="bg-hers-500 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>

        <div className="grid gap-4 p-5 md:p-6">
          <Badge>Pair</Badge>

          <div>
            <h3 className="font-display text-3xl leading-none text-parchment transition-colors group-hover:text-gold-100">
              {pair.name}
            </h3>
            <p className="mt-2 text-sm text-parchment/55">
              {his?.name} + {hers?.name}
            </p>
          </div>

          {/* Shared accord note */}
          {sharedNotes.length > 0 ? (
            <div className="flex items-center gap-2">
              <div
                className="h-px w-4 bg-gold-300/50 shrink-0"
                aria-hidden="true"
              />
              <p className="text-xs text-parchment/62">
                Shared accord: {sharedNotes.map((note) => note.name).join(", ")}
              </p>
            </div>
          ) : null}

          {/* Price + availability */}
          <div className="flex items-center justify-between gap-4 border-t border-onyx-700/60 pt-4">
            <p className="type-price">Set from {formatPrice(startingPrice)}</p>
            <div className="flex items-center gap-3">
              <AvailabilityIndicator inStock={inStock} />
              <span
                className="text-xs text-gold-300 opacity-0 transition-opacity duration-fast group-hover:opacity-100"
                aria-hidden="true"
              >
                Discover →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

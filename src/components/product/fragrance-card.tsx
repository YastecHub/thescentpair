import Link from "next/link";
import { ProductImage } from "@/components/media/responsive-media";
import { AvailabilityIndicator } from "@/components/ui/availability-indicator";
import { Badge } from "@/components/ui/badge";
import {
  formatPrice,
  getStartingPrice,
  hasAvailableVariant,
} from "@/lib/content/repository";
import type { Fragrance } from "@/lib/content/schemas";

const audienceLabel = (audience: Fragrance["audience"]) => {
  if (audience === "his") return "His";
  if (audience === "hers") return "Her's";
  return "Unisex";
};

export function FragranceCard({
  fragrance,
}: Readonly<{ fragrance: Fragrance }>) {
  const startingPrice = getStartingPrice(fragrance.variants);
  const inStock = hasAvailableVariant(fragrance.variants);

  return (
    <article
      className="group border border-onyx-700 bg-onyx-800 text-parchment overflow-hidden transition-colors hover:border-gold-300/50"
      data-cursor="discover"
    >
      <Link
        href={`/fragrance/${fragrance.slug}`}
        className="block focus-visible:outline-offset-4"
      >
        {/* Image with hover zoom */}
        <div className="overflow-hidden">
          <ProductImage
            media={{
              publicId: fragrance.media.heroLight,
              alt: `${fragrance.name} fragrance bottle`,
            }}
            ratio="4 / 5"
            className="transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
          />
        </div>

        <div className="grid gap-4 p-5">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {fragrance.featured ? <Badge>Featured</Badge> : null}
            <Badge>{audienceLabel(fragrance.audience)}</Badge>
          </div>

          {/* Name + family */}
          <div>
            <h3 className="font-display text-3xl leading-none text-parchment transition-colors group-hover:text-gold-100">
              {fragrance.name}
            </h3>
            <p className="mt-2 text-xs tracking-[0.15em] text-parchment/50 uppercase">
              {fragrance.family.replaceAll("-", " ")}
            </p>
          </div>

          {/* Tagline */}
          <p className="line-clamp-2 text-sm text-parchment/72 leading-relaxed">
            {fragrance.tagline}
          </p>

          {/* Pricing footer */}
          <div className="flex items-center justify-between gap-4 border-t border-onyx-700/60 pt-4">
            <p className="type-price text-sm">
              From {formatPrice(startingPrice)}
            </p>
            <div className="flex items-center gap-3">
              <AvailabilityIndicator inStock={inStock} />
              <span
                className="text-xs text-gold-300 opacity-0 transition-opacity duration-fast group-hover:opacity-100"
                aria-hidden="true"
              >
                Explore →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

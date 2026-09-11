import Link from "next/link";
import { ProductImage } from "@/components/media/responsive-media";
import { AvailabilityIndicator } from "@/components/ui/availability-indicator";
import { ButtonLink } from "@/components/ui/button-link";
import {
  formatPrice,
  getPairBySlug,
  getSharedNotes,
  getStartingPrice,
  hasAvailableVariant,
} from "@/lib/content/repository";
import type { Fragrance } from "@/lib/content/schemas";

export function PartnerModule({
  fragrance,
  partner,
}: Readonly<{
  fragrance: Fragrance;
  partner: Fragrance;
}>) {
  const pairId = fragrance.pairId;
  const pair = pairId ? getPairBySlug(pairId) : undefined;
  const sharedNotes = pair ? getSharedNotes(pair) : [];
  const pairPrice = pair ? getStartingPrice(pair.setVariants) : undefined;
  const pairInStock = pair ? hasAvailableVariant(pair.setVariants) : false;

  return (
    <div className="border border-onyx-700 bg-onyx-800">
      <div className="grid lg:grid-cols-[1fr_1fr]">
        {/* His side */}
        <div
          className="relative p-6 md:p-8"
          style={{ background: "var(--his-500)" }}
        >
          <p className="type-eyebrow text-gold-300">His</p>
          <Link
            href={`/fragrance/${fragrance.slug}`}
            className="mt-4 block group"
          >
            <ProductImage
              media={{
                publicId: fragrance.media.heroDark,
                alt: `${fragrance.name} bottle`,
              }}
              ratio="3 / 4"
            />
            <h3 className="mt-4 font-display text-3xl leading-none text-parchment group-hover:text-gold-300 transition-colors">
              {fragrance.name}
            </h3>
            <p className="mt-2 text-sm text-parchment/68">
              {fragrance.tagline}
            </p>
          </Link>
        </div>

        {/* Her's side */}
        <div
          className="relative p-6 md:p-8"
          style={{ background: "var(--hers-500)" }}
        >
          <p className="type-eyebrow text-gold-300">Her&apos;s</p>
          <Link
            href={`/fragrance/${partner.slug}`}
            className="mt-4 block group"
          >
            <ProductImage
              media={{
                publicId: partner.media.heroDark,
                alt: `${partner.name} bottle`,
              }}
              ratio="3 / 4"
            />
            <h3 className="mt-4 font-display text-3xl leading-none text-parchment group-hover:text-gold-300 transition-colors">
              {partner.name}
            </h3>
            <p className="mt-2 text-sm text-parchment/68">{partner.tagline}</p>
          </Link>
        </div>
      </div>

      {/* Shared accord and pair action */}
      {pair ? (
        <div className="border-t border-onyx-700 p-6 md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="type-eyebrow text-gold-300">Shared accord</p>
              <p className="mt-2 font-display text-2xl leading-none text-parchment">
                {sharedNotes.map((n) => n.name).join(" + ")}
              </p>
              <p className="mt-2 text-sm text-parchment/62">
                {fragrance.name} and {partner.name} meet here  different
                characters, one thread of accord.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {pairPrice !== undefined ? (
                <p className="type-price text-xl">
                  Set from {formatPrice(pairPrice)}
                </p>
              ) : null}
              <AvailabilityIndicator inStock={pairInStock} />
              <ButtonLink href={`/pairs/${pair.slug}`} variant="primary">
                Explore the pair
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

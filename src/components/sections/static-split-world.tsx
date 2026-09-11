import { ProductImage } from "@/components/media/responsive-media";
import { ButtonLink } from "@/components/ui/button-link";
import { getFragranceBySlug, getSharedNotes } from "@/lib/content/repository";
import type { Pair } from "@/lib/content/schemas";

export function StaticSplitWorld({
  pair,
  useCollectionImages = false,
}: Readonly<{ pair: Pair; useCollectionImages?: boolean }>) {
  const his = getFragranceBySlug(pair.hisFragranceSlug);
  const hers = getFragranceBySlug(pair.hersFragranceSlug);
  const sharedNotes = getSharedNotes(pair);

  return (
    <section className="relative overflow-hidden border border-onyx-700 bg-onyx-800" data-motion="two-halves" aria-labelledby="split-world-title">
      <div className="grid lg:grid-cols-[1fr_auto_1fr]">
        <div className="bg-his-500/45 p-5 md:p-8">
          <p className="type-eyebrow text-gold-300">His</p>
          {his ? <ProductImage media={{ publicId: useCollectionImages ? his.media.heroLight : his.media.heroDark, alt: `${his.name} bottle` }} ratio="4 / 3" className="mt-5" /> : null}
          <h3 className="mt-6 font-display text-4xl leading-none text-parchment">{his?.name}</h3>
          <p className="mt-3 text-sm text-parchment/72">{his?.tagline}</p>
        </div>
        <div className="flex min-h-32 flex-col items-center justify-center border-y border-gold-300/35 bg-onyx-900 p-5 text-center lg:border-x lg:border-y-0">
          <p id="split-world-title" className="type-eyebrow text-gold-300">Shared accord</p>
          <p className="mt-3 font-display text-3xl leading-none text-parchment">{sharedNotes.map((note) => note.name).join(" + ")}</p>
          <ButtonLink href={`/pairs/${pair.slug}`} className="mt-6">Explore pair</ButtonLink>
        </div>
        <div className="bg-hers-500/45 p-5 md:p-8">
          <p className="type-eyebrow text-gold-300">Her&apos;s</p>
          {hers ? <ProductImage media={{ publicId: useCollectionImages ? hers.media.heroLight : hers.media.heroDark, alt: `${hers.name} bottle` }} ratio="4 / 3" className="mt-5" /> : null}
          <h3 className="mt-6 font-display text-4xl leading-none text-parchment">{hers?.name}</h3>
          <p className="mt-3 text-sm text-parchment/72">{hers?.tagline}</p>
        </div>
      </div>
    </section>
  );
}

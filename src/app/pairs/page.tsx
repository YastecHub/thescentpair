import { Section } from "@/components/layout/section";
import { StaticSplitWorld } from "@/components/sections/static-split-world";
import { ArtOfGifting } from "@/components/sections/art-of-gifting";
import { PairCard } from "@/components/product/pair-card";
import { CollectionReveal } from "@/components/motion/collection-reveal";
import { BodyText, Eyebrow } from "@/components/typography/typography";
import { GoldRule } from "@/components/ui/gold-rule";
import { getAllPairs } from "@/lib/content/repository";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: "Pairs — Two Signatures, Made for Two",
  description:
    "Fragrance pairs from His & Her's Scents. Two complementary scents — distinct identities, one shared accord.",
  path: "/pairs",
});

export default function PairsPage() {
  const pairs = getAllPairs();

  return (
    <>
      <Section labelledBy="pairs-title">
        <div className="mb-12 max-w-readable">
          <Eyebrow>Pairs</Eyebrow>
          <h1 id="pairs-title" className="type-page-heading mt-4 text-foil">
            Two signatures, chosen to belong together.
          </h1>
          <BodyText className="mt-5 type-supporting">
            Each pair keeps its own identity while sharing a note, a mood or a
            memory. Two fragrances. Two people. One story told between them.
          </BodyText>
        </div>

        <GoldRule />

        <div className="mt-12 grid gap-8 lg:gap-12">
          {pairs.map((pair, index) => (
            <CollectionReveal key={pair.slug} index={index}>
              <PairCard pair={pair} useFragranceImages />

              {/* Preview the split world for each pair on the index */}
              <div className="mt-4">
                <StaticSplitWorld pair={pair} />
              </div>
            </CollectionReveal>
          ))}
        </div>

        {pairs.length === 0 ? (
          <div className="border border-onyx-700 bg-onyx-800 p-10 text-center">
            <Eyebrow>Coming soon</Eyebrow>
            <p className="mt-4 font-display text-2xl text-parchment">
              The pairs are being prepared.
            </p>
          </div>
        ) : null}
      </Section>

      {/* The Art of Gifting (MFK & Riggs London Inspiration) */}
      <ArtOfGifting />
    </>
  );
}

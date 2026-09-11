import { NewsletterForm } from "@/components/forms/newsletter-form";
import { ContentGrid } from "@/components/layout/content-grid";
import { Section } from "@/components/layout/section";
import { FragranceCard } from "@/components/product/fragrance-card";
import { PairCard } from "@/components/product/pair-card";
import { MeetingHero } from "@/components/motion/meeting-hero";
import { BottleUnveiling } from "@/components/motion/bottle-unveiling";
import { TwoHalvesSplit } from "@/components/motion/two-halves-split";
import { OverturePreloader } from "@/components/motion/overture-preloader";
import { FragranceNotesGraph } from "@/components/motion/fragrance-notes-graph";
import { RitualFilm } from "@/components/motion/ritual-film";
import { CollectionReveal } from "@/components/motion/collection-reveal";
import { EditorialLetter } from "@/components/motion/editorial-letter";
import { ArtOfGifting } from "@/components/sections/art-of-gifting";
import { BodyText, Eyebrow } from "@/components/typography/typography";
import { ButtonLink } from "@/components/ui/button-link";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import { getFeaturedFragrances, getAllPairs, getPartnerFragrance } from "@/lib/content/repository";

export const metadata = createPageMetadata({
  title: "His & Her's Scents - Signature Scents, Made for Two",
  description: "A cinematic fragrance experience for two people sharing one signature scent story.",
  path: "/",
});

export default function HomePage() {
  const featuredFragrances = getFeaturedFragrances();
  const featuredFragrance = featuredFragrances[0];
  const featuredPair = getAllPairs()[0];
  const partner = featuredFragrance ? getPartnerFragrance(featuredFragrance) : undefined;

  return (
    <>
      {/* Moment 01: The Overture */}
      <OverturePreloader />

      {/* Moment 02: The Meeting */}
      <MeetingHero
        hisName={featuredFragrance?.name}
        hersName={partner?.name}
      />

      <Section labelledBy="premise-title" className="bg-parchment text-ink-900 light-surface">
        <div data-motion="letter" className="max-w-readable">
          <Eyebrow className="text-gold-700">The premise</Eyebrow>
          <h2 id="premise-title" className="type-section-heading mt-4">Fragrance as identity, connection and memory.</h2>
          <div className="mt-6 grid gap-5 text-body text-ink-600">
            <p>We created HIS &amp; HER&apos;S to make fragrance feel more personal: something that reflects who you are and the connections that matter to you.</p>
            <p>Inspired by the beauty of two people sharing something special, our scents are made to complement, connect and create lasting memories.</p>
            <p>Because sometimes, a scent is more than a fragrance. It becomes part of your story.</p>
          </div>
          <ButtonLink href="/story" className="mt-8">Read our story</ButtonLink>
        </div>
      </Section>

      {/* Moment 03: The Unveiling */}
      {featuredFragrance ? (
        <BottleUnveiling
          fragrance={featuredFragrance}
          partnerName={partner?.name}
        />
      ) : null}

      {/* Moment 05: The Notes */}
      {featuredFragrance ? (
        <Section labelledBy="notes-title" className="bg-onyx-800" data-motion="notes">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Eyebrow>Notes</Eyebrow>
              <h2 id="notes-title" className="type-section-heading mt-4">How a scent unfolds.</h2>
              <BodyText className="mt-5 type-supporting">Top notes introduce the first impression. Heart notes carry the character. Base notes remain close to skin and memory.</BodyText>
              <ButtonLink href={`/fragrance/${featuredFragrance.slug}`} className="mt-8">Explore the notes</ButtonLink>
            </div>
            <FragranceNotesGraph notes={featuredFragrance.notes} fragranceName={featuredFragrance.name} />
          </div>
        </Section>
      ) : null}

      {/* Moment 06: The Ritual */}
      <RitualFilm />

      {/* Moment 07: Two Halves */}
      {featuredPair ? (
        <div className="mx-auto max-w-content px-5 md:px-8">
          <TwoHalvesSplit pair={featuredPair} />
        </div>
      ) : null}

      {/* Moment 08: The Reveal (Pairs) */}
      <Section labelledBy="featured-pairs-title" className="bg-parchment text-ink-900 light-surface">
        <Eyebrow className="text-gold-700">Featured pairs</Eyebrow>
        <h2 id="featured-pairs-title" className="type-section-heading mt-4">Two signatures, chosen to belong together.</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {getAllPairs().map((pair, index) => (
            <CollectionReveal key={pair.slug} index={index}>
              <PairCard pair={pair} />
            </CollectionReveal>
          ))}
        </div>
      </Section>

      {/* Moment 08: The Reveal (Fragrances) */}
      <Section labelledBy="featured-fragrances-title">
        <Eyebrow>Featured fragrances</Eyebrow>
        <h2 id="featured-fragrances-title" className="type-section-heading mt-4 text-foil">Individual scents with a shared world.</h2>
        <ContentGrid className="mt-8">
          {featuredFragrances.slice(0, 2).map((fragrance, index) => (
            <CollectionReveal key={fragrance.slug} index={index}>
              <FragranceCard fragrance={fragrance} />
            </CollectionReveal>
          ))}
        </ContentGrid>
        <ButtonLink href="/collection" className="mt-8">View full collection</ButtonLink>
      </Section>

      {/* Moment 09: The Letter (Teaser) */}
      <Section labelledBy="story-teaser-title" className="bg-onyx-800" data-motion="letter">
        <EditorialLetter
          eyebrow="Our Story"
          lines={[
            {
              text: "A scent is not merely a composition of notes, but a vessel for personal connection.",
              goldWords: ["personal", "connection"],
            },
            {
              text: "Designed around two people who choose to share one unspoken signature.",
              goldWords: ["two", "signature"],
            },
            {
              text: "Because in the end, every fragrance becomes part of your story.",
              goldWords: ["story"],
            },
          ]}
        />
        <div className="text-center mt-6">
          <ButtonLink href="/story">Read the letter</ButtonLink>
        </div>
      </Section>

      {/* The Art of Gifting (MFK & Riggs London Inspiration) */}
      <ArtOfGifting />

      <Section labelledBy="newsletter-title">
        <div className="grid gap-8 border border-onyx-700 bg-onyx-800 p-6 md:p-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Stay close</Eyebrow>
            <h2 id="newsletter-title" className="type-section-heading mt-4 text-foil">First access to new pairs and scent stories.</h2>
          </div>
          <NewsletterForm />
        </div>
      </Section>
    </>
  );
}

import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ProductImage } from "@/components/media/responsive-media";
import { Section } from "@/components/layout/section";
import { OrderPanel } from "@/components/product/order-panel";
import { TwoHalvesSplit } from "@/components/motion/two-halves-split";
import { BodyText, Eyebrow } from "@/components/typography/typography";
import { AvailabilityIndicator } from "@/components/ui/availability-indicator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  formatPrice,
  getAllPairs,
  getFragranceBySlug,
  getPairBySlug,
  getSharedNotes,
  getStartingPrice,
  hasAvailableVariant,
} from "@/lib/content/repository";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPairs().map((pair) => ({ slug: pair.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pair = getPairBySlug(slug);

  if (!pair) {
    return createPageMetadata({
      title: "Pair Not Found",
      description: "This pair could not be found.",
      path: `/pairs/${slug}`,
    });
  }

  return createPageMetadata({
    title: pair.seo.title,
    description: pair.seo.description,
    path: `/pairs/${pair.slug}`,
    ogImage: pair.seo.ogImage,
  });
}

import { getPairJsonLd } from "@/lib/seo/jsonld";

export default async function PairPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pair = getPairBySlug(slug);

  if (!pair) {
    notFound();
  }

  const his = getFragranceBySlug(pair.hisFragranceSlug);
  const hers = getFragranceBySlug(pair.hersFragranceSlug);
  const sharedNotes = getSharedNotes(pair);
  const startingPrice = getStartingPrice(pair.setVariants);
  const inStock = hasAvailableVariant(pair.setVariants);
  const jsonLd = getPairJsonLd(pair);

  // Show the notes from both fragrances that are shared
  const sharedNoteLabels = sharedNotes.map((n) => n.name).join(" + ");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section labelledBy="pair-title">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/pairs", label: "Pairs" },
            { label: pair.name },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Pair hero image */}
          <div>
            <ProductImage
              media={{
                publicId: pair.media.heroPair,
                alt: `${pair.name} — the pair together`,
              }}
              ratio="1 / 1"
            />
          </div>

          {/* Pair info */}
          <div className="grid gap-8">
            <div>
              <Badge>Pair</Badge>

              <h1
                id="pair-title"
                className="mt-5 type-display text-foil max-w-[14ch]"
              >
                {pair.name}
              </h1>

              <p className="mt-4 text-sm text-parchment/62">
                {his?.name} + {hers?.name}
              </p>

              <BodyText className="mt-5 type-supporting">{pair.story}</BodyText>

              <div className="mt-6 border-l border-gold-300/35 pl-4">
                <p className="type-eyebrow text-gold-300">Shared accord</p>
                <p className="mt-2 font-display text-2xl leading-none text-parchment">
                  {sharedNoteLabels}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <p className="type-price text-2xl">
                  Set from {formatPrice(startingPrice)}
                </p>
                <AvailabilityIndicator inStock={inStock} />
              </div>
            </div>

            {/* Set variant selection */}
            <fieldset className="grid gap-3">
              <legend className="type-eyebrow text-gold-300">
                Choose set size
              </legend>
              {pair.setVariants.map((variant) => {
                const hisFragrance = his;
                const hisVariant = hisFragrance?.variants.find(
                  (v) => variant.contents.includes(v.sku),
                );

                return (
                  <div
                    key={variant.sku}
                    className={`border p-4 text-sm ${variant.inStock ? "border-onyx-700 bg-onyx-800" : "border-onyx-700/50 bg-onyx-900 opacity-55"}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-parchment">
                          {hisVariant
                            ? `${hisVariant.size}${hisVariant.unit}`
                            : "—"}{" "}
                          each
                        </p>
                        <p className="mt-1 text-parchment/55">
                          SKU {variant.sku}
                        </p>
                        <p className="mt-1 text-parchment/55">
                          {variant.contents.join(" + ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="type-price">
                          {formatPrice(variant.price, variant.currency)}
                        </p>
                        <p className="mt-1 text-parchment/55">
                          {variant.inStock ? "Available" : "Out of stock"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </fieldset>

            <OrderPanel
              itemName={pair.name}
              itemType="pair"
              variants={pair.setVariants}
              pagePath={`/pairs/${pair.slug}`}
            />
          </div>
        </div>
      </Section>

      {/* Split world */}
      <Section data-motion="two-halves">
        <Eyebrow>Two halves, one story</Eyebrow>
        <p className="mt-4 type-section-heading font-display text-foil max-w-[18ch]">
          Two signatures, chosen to belong together.
        </p>
        <div className="mt-10">
          <TwoHalvesSplit pair={pair} />
        </div>
      </Section>

      {/* Individual fragrance summaries */}
      <Section
        labelledBy="individual-fragrances-title"
        className="bg-onyx-800"
      >
        <Eyebrow>The individual scents</Eyebrow>
        <h2
          id="individual-fragrances-title"
          className="type-section-heading mt-4 text-foil"
        >
          Each one complete on its own.
        </h2>
        <BodyText className="mt-5 type-supporting">
          While {pair.name} is best experienced together, each fragrance stands
          fully on its own terms.
        </BodyText>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            { fragrance: his, side: "His" },
            { fragrance: hers, side: "Her's" },
          ].map(({ fragrance: f, side }) =>
            f ? (
              <div
                key={f.slug}
                className="border border-onyx-700 bg-onyx-900 p-6"
              >
                <p className="type-eyebrow text-gold-300">{side}</p>
                <ProductImage
                  media={{
                    publicId: f.media.heroLight,
                    alt: `${f.name} bottle`,
                  }}
                  ratio="4 / 3"
                  className="mt-4"
                />
                <h3 className="mt-5 font-display text-3xl leading-none text-parchment">
                  {f.name}
                </h3>
                <p className="mt-2 text-sm text-parchment/68">{f.tagline}</p>
                <p className="mt-3 text-sm text-parchment/55">
                  {f.family.replaceAll("-", " ")}
                </p>
                <Link
                  href={`/fragrance/${f.slug}`}
                  className="mt-5 inline-flex min-h-11 items-center text-sm text-gold-300 underline underline-offset-4 hover:text-gold-100"
                >
                  Explore {f.name} →
                </Link>
              </div>
            ) : null,
          )}
        </div>
      </Section>

      {/* Shared notes */}
      <Section labelledBy="shared-notes-title" data-motion="notes">
        <Eyebrow>The shared accord</Eyebrow>
        <h2
          id="shared-notes-title"
          className="type-section-heading mt-4 text-foil"
        >
          Where the two scents meet.
        </h2>
        <BodyText className="mt-5 type-supporting">
          {pair.name} is united by a shared thread — a note or accord present in
          both fragrances that creates continuity without making them identical.
        </BodyText>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sharedNotes.map((note) => (
            <div
              key={note.id}
              className="border-l-2 pl-5"
              style={{ borderColor: note.accentColor }}
            >
              <p className="font-semibold text-parchment">{note.name}</p>
              <p className="mt-2 text-sm text-parchment/62">
                {note.shortDescription}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

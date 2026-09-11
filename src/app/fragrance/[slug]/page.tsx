import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ProductImage } from "@/components/media/responsive-media";
import { Section } from "@/components/layout/section";
import { NotesDetail } from "@/components/product/notes-detail";
import { FragranceNotesGraph } from "@/components/motion/fragrance-notes-graph";
import { OrderPanel } from "@/components/product/order-panel";
import { PartnerModule } from "@/components/product/partner-module";
import { PerformanceMeters } from "@/components/product/performance-meters";
import { UsageGuidance } from "@/components/product/usage-guidance";
import { VariantSelector } from "@/components/product/variant-selector";
import { BodyText, Eyebrow } from "@/components/typography/typography";
import { Badge } from "@/components/ui/badge";
import {
  formatPrice,
  getAllFragrances,
  getFragranceBySlug,
  getPartnerFragrance,
  getStartingPrice,
  hasAvailableVariant,
} from "@/lib/content/repository";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllFragrances().map((fragrance) => ({ slug: fragrance.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fragrance = getFragranceBySlug(slug);

  if (!fragrance) {
    return createPageMetadata({
      title: "Fragrance Not Found",
      description: "This fragrance could not be found.",
      path: `/fragrance/${slug}`,
    });
  }

  return createPageMetadata({
    title: fragrance.seo.title,
    description: fragrance.seo.description,
    path: `/fragrance/${fragrance.slug}`,
    ogImage: fragrance.seo.ogImage,
  });
}

import { getProductJsonLd } from "@/lib/seo/jsonld";

export default async function FragrancePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fragrance = getFragranceBySlug(slug);

  if (!fragrance) {
    notFound();
  }

  const partner = getPartnerFragrance(fragrance);
  const startingPrice = getStartingPrice(fragrance.variants);
  const inStock = hasAvailableVariant(fragrance.variants);
  const audienceLabel =
    fragrance.audience === "his"
      ? "His"
      : fragrance.audience === "hers"
        ? "Her's"
        : "Unisex";
  const jsonLd = getProductJsonLd(fragrance);

  const galleryImages = [
    {
      publicId: fragrance.media.heroLight,
      alt: `${fragrance.name}  light presentation`,
    },
    {
      publicId: fragrance.media.heroDark,
      alt: `${fragrance.name}  dark presentation`,
    },
    ...fragrance.media.gallery.map((publicId, index) => ({
      publicId,
      alt: `${fragrance.name}  detail view ${index + 1}`,
    })),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section labelledBy="fragrance-title">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/collection", label: "Collection" },
            { label: fragrance.name },
          ]}
        />

        <div
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
          data-motion="unveiling"
        >
          {/* Gallery */}
          <div className="grid gap-3">
            <ProductImage
              media={galleryImages[0]}
              ratio="4 / 5"
              className="lg:sticky lg:top-24"
            />
            {galleryImages.length > 1 ? (
              <div className="grid grid-cols-3 gap-3">
                {galleryImages.slice(1, 4).map((img) => (
                  <ProductImage
                    key={img.publicId ?? img.alt}
                    media={img}
                    ratio="1 / 1"
                  />
                ))}
              </div>
            ) : null}
          </div>

          {/* Product detail */}
          <div className="grid gap-8">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{audienceLabel}</Badge>
                <Badge className="border-parchment/25 text-parchment/68">
                  {fragrance.family.replaceAll("-", " ")}
                </Badge>
                {!inStock ? (
                  <Badge className="border-hers-500 text-hers-500">
                    Limited
                  </Badge>
                ) : null}
              </div>

              <h1
                id="fragrance-title"
                className="mt-5 type-display text-foil max-w-[14ch]"
              >
                {fragrance.name}
              </h1>

              <p className="mt-4 font-display text-2xl text-parchment leading-tight">
                {fragrance.tagline}
              </p>

              <BodyText className="mt-5 type-supporting">
                {fragrance.description}
              </BodyText>

              <p className="mt-5 type-price text-2xl">
                From {formatPrice(startingPrice)}
              </p>
            </div>

            <VariantSelector
              variants={fragrance.variants}
              name={`${fragrance.slug}-variant`}
            />

            <OrderPanel
              itemName={fragrance.name}
              itemType="fragrance"
              variants={fragrance.variants}
              pagePath={`/fragrance/${fragrance.slug}`}
            />

            <p className="text-sm text-parchment/55">
              Delivery information will be available on the contact page.
              Authenticity is guaranteed.
            </p>
          </div>
        </div>
      </Section>

      <Section
        labelledBy="performance-title"
        className="bg-onyx-800"
        data-motion="sillage"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Performance</Eyebrow>
            <h2
              id="performance-title"
              className="type-section-heading mt-4 text-foil"
            >
              How it wears.
            </h2>
            <BodyText className="mt-5 type-supporting">
              Longevity measures how long the scent remains on skin. Sillage
              describes the trail left in the air. Projection refers to how far
              the fragrance radiates from the wearer.
            </BodyText>
          </div>
          <PerformanceMeters performance={fragrance.performance} />
        </div>
      </Section>

      <Section labelledBy="notes-title" data-motion="notes">
        <Eyebrow>Fragrance notes</Eyebrow>
        <h2 id="notes-title" className="type-section-heading mt-4 text-foil">
          The composition.
        </h2>
        <BodyText className="mt-5 type-supporting">
          Top notes open the first impression. Heart notes emerge as the
          fragrance settles. Base notes remain closest to the skin and linger
          longest in memory.
        </BodyText>
        <div className="mt-10">
          <FragranceNotesGraph
            notes={fragrance.notes}
            fragranceName={fragrance.name}
          />
        </div>
        <div className="mt-8">
          <NotesDetail notes={fragrance.notes} />
        </div>
      </Section>

      <Section labelledBy="usage-title" className="bg-onyx-800">
        <Eyebrow>How to wear it</Eyebrow>
        <h2 id="usage-title" className="type-section-heading mt-4 text-foil">
          The application.
        </h2>
        <div className="mt-10">
          <UsageGuidance />
        </div>
      </Section>

      {partner ? (
        <Section labelledBy="partner-title" data-motion="two-halves">
          <Eyebrow>Made for two</Eyebrow>
          <h2
            id="partner-title"
            className="type-section-heading mt-4 text-foil"
          >
            Meet its partner.
          </h2>
          <BodyText className="mt-5 type-supporting">
            {fragrance.name} belongs to a pair. Its partner fragrance shares a
            common accord while keeping its own character.
          </BodyText>
          <div className="mt-10">
            <PartnerModule fragrance={fragrance} partner={partner} />
          </div>
        </Section>
      ) : null}
    </>
  );
}

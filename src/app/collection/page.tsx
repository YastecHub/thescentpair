import { Suspense } from "react";
import { CollectionFilters } from "@/components/collection/collection-filters";
import { Section } from "@/components/layout/section";
import { BodyText, Eyebrow } from "@/components/typography/typography";
import { getAllFragrances } from "@/lib/content/repository";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: "Collection",
  description: "Explore His, Her's and unisex demonstration fragrances prepared for paired scent discovery.",
  path: "/collection",
});

// Filtered URLs (/collection?for=his etc.) canonicalise back to /collection
export const alternates = { canonical: "https://thescentpair.com/collection" };

export default function CollectionPage() {
  const fragrances = getAllFragrances();

  return (
    <Section labelledBy="collection-title">
      <div className="mb-12 max-w-readable">
        <Eyebrow>Collection</Eyebrow>
        <h1 id="collection-title" className="type-page-heading mt-4 text-foil">
          Discover the scents that carry the story.
        </h1>
        <BodyText className="mt-5 type-supporting">
          Explore individual signatures by mood, audience and availability. Pair sets remain the heart of the brand.
        </BodyText>
      </div>
      <Suspense fallback={<p className="mt-8 text-parchment/68">Loading filters...</p>}>
        <CollectionFilters fragrances={fragrances} />
      </Suspense>
    </Section>
  );
}

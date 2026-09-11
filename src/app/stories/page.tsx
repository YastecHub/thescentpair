import { Section } from "@/components/layout/section";
import { ContentGrid } from "@/components/layout/content-grid";
import { StoryCard } from "@/components/stories/story-card";
import { BodyText, Eyebrow } from "@/components/typography/typography";
import { getAllStories } from "@/lib/content/repository";
import { createPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = createPageMetadata({
  title: "Stories  Scent, Memory and Connection",
  description:
    "Editorial stories exploring fragrance, identity and what it means to share a scent with someone.",
  path: "/stories",
});

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <Section labelledBy="stories-title">
      <div className="mb-12 max-w-readable">
        <Eyebrow>Stories</Eyebrow>
        <h1 id="stories-title" className="type-page-heading mt-4 text-foil">
          Fragrance, memory and the people we carry with us.
        </h1>
        <BodyText className="mt-5 type-supporting">
          Editorial pieces on the nature of scent  how it marks moments, holds
          memories and connects two people to something shared.
        </BodyText>
      </div>

      {stories.length > 0 ? (
        <ContentGrid className="md:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </ContentGrid>
      ) : (
        <div className="border border-onyx-700 bg-onyx-800 p-10 text-center">
          <Eyebrow>Coming soon</Eyebrow>
          <p className="mt-4 font-display text-2xl text-parchment">
            The first stories are being prepared.
          </p>
          <p className="mt-3 text-sm text-parchment/62">
            Check back soon for editorial pieces on fragrance, memory and
            connection.
          </p>
        </div>
      )}
    </Section>
  );
}

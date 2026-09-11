import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ProductImage } from "@/components/media/responsive-media";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/typography/typography";
import { ButtonLink } from "@/components/ui/button-link";
import Link from "next/link";
import {
  getAllStories,
  getRelatedFragrances,
  getStoryBySlug,
} from "@/lib/content/repository";
import { createPageMetadata } from "@/lib/seo/page-metadata";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllStories().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return createPageMetadata({
      title: "Story Not Found",
      description: "This story could not be found.",
      path: `/stories/${slug}`,
    });
  }

  return createPageMetadata({
    title: story.seo.title,
    description: story.seo.description,
    path: `/stories/${story.slug}`,
    ogImage: story.seo.ogImage,
    type: "article",
  });
}

export default async function StoryArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const relatedFragrances = getRelatedFragrances(story);

  const formattedDate = new Date(story.publishedAt).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <article aria-labelledby="story-title">
      <Section className="pb-0">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/stories", label: "Stories" },
            { label: story.title },
          ]}
        />
      </Section>

      {/* Cover image */}
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--page-gutter)]">
        <ProductImage
          media={{
            publicId: story.coverMedia,
            alt: `Cover image for ${story.title}`,
          }}
          ratio="16 / 7"
        />
      </div>

      <Section labelledBy="story-title">
        <div className="mx-auto max-w-readable">
          <Eyebrow>Stories</Eyebrow>
          <h1 id="story-title" className="mt-4 type-section-heading text-foil">
            {story.title}
          </h1>

          <p className="mt-3 text-sm text-parchment/55">
            <time dateTime={story.publishedAt}>{formattedDate}</time>
          </p>

          {/* Lead / excerpt */}
          <p className="mt-8 font-display text-xl leading-relaxed italic text-parchment/85 sm:text-2xl">
            {story.excerpt}
          </p>

          {/* Body: split on double-newlines into paragraphs */}
          <div className="mt-10 space-y-6">
            {story.body.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className={`text-body leading-[1.85] text-parchment/78 ${index === 0 ? "text-lg" : ""}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Related fragrances */}
        {relatedFragrances.length > 0 ? (
          <div className="mt-16 border-t border-onyx-700 pt-10">
            <Eyebrow>Referenced fragrances</Eyebrow>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedFragrances.map((fragrance) => (
                <Link
                  key={fragrance.slug}
                  href={`/fragrance/${fragrance.slug}`}
                  className="group border border-onyx-700 bg-onyx-800 p-5 hover:border-gold-300/50 transition-colors"
                >
                  <p className="type-eyebrow text-gold-300">
                    {fragrance.audience}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-none text-parchment group-hover:text-gold-300 transition-colors">
                    {fragrance.name}
                  </h3>
                  <p className="mt-2 text-sm text-parchment/62">
                    {fragrance.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12 border-t border-onyx-700 pt-8">
          <ButtonLink href="/stories">← Back to stories</ButtonLink>
        </div>
      </Section>
    </article>
  );
}

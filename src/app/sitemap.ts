import type { MetadataRoute } from "next";
import {
  getAllFragrances,
  getAllPairs,
  getAllStories,
} from "@/lib/content/repository";

const routes = [
  "",
  "/collection",
  "/pairs",
  "/story",
  "/stories",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = routes.map((route) => ({
    url: `https://www.thescentpair.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : 0.7,
  }));

  const fragranceEntries = getAllFragrances().map((fragrance) => ({
    url: `https://www.thescentpair.com/fragrance/${fragrance.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const pairEntries = getAllPairs().map((pair) => ({
    url: `https://www.thescentpair.com/pairs/${pair.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const storyEntries = getAllStories().map((story) => ({
    url: `https://www.thescentpair.com/stories/${story.slug}`,
    lastModified: new Date(story.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...fragranceEntries, ...pairEntries, ...storyEntries];
}

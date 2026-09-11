import type { MetadataRoute } from "next";

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
  return routes.map((route) => ({
    url: `https://thescentpair.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

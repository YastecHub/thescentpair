import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://thescentpair.com/sitemap.xml",
    host: "https://thescentpair.com",
  };
}

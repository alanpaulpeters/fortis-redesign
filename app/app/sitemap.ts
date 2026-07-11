import type { MetadataRoute } from "next";
import { allPosts } from "@/content/blog";

const base = "https://fortis-inkasso.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const basePaths = [
    "",
    "/inkassobeauftragung",
    "/mahnbescheid",
    "/auslandsinkasso",
    "/schuldner",
    "/kontakt",
  ];
  const localized = basePaths.flatMap((path) =>
    ["", "/en", "/es"].map((prefix) => `${prefix}${path}`)
  );
  const pages = [...localized, "/blog"].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const posts = allPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}

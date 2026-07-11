import type { MetadataRoute } from "next";
import { allPosts } from "@/content/blog";

const base = "https://fortis-inkasso.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/inkassobeauftragung",
    "/mahnbescheid",
    "/auslandsinkasso",
    "/schuldner",
    "/kontakt",
    "/blog",
  ].map((path) => ({
    url: `${base}${path}`,
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

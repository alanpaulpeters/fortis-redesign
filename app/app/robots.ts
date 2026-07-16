import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/portal" },
    sitemap: "https://fortis-inkasso.de/sitemap.xml",
  };
}

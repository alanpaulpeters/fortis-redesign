import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const base = "https://fortis-inkasso.de";

const paths = [
  "",
  "/inkassobeauftragung",
  "/mahnbescheid",
  "/auslandsinkasso",
  "/schuldner",
  "/kontakt",
];

function url(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${base}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: url(locale, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, url(l, path)])
        ),
      },
    }))
  );
}

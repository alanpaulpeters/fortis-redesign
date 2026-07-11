import { de, type Dict } from "./de";
import { en } from "./en";
import { es } from "./es";

export type { Dict };
export type Locale = "de" | "en" | "es";

export const locales: Record<Locale, Dict> = { de, en, es };

export const localePrefix: Record<Locale, string> = {
  de: "",
  en: "/en",
  es: "/es",
};

// Seiten, die in allen Sprachen existieren (Basis-Pfade ohne Präfix)
export const translatedPaths = [
  "/",
  "/inkassobeauftragung",
  "/mahnbescheid",
  "/auslandsinkasso",
  "/schuldner",
  "/kontakt",
];

export function getDict(locale: Locale): Dict {
  return locales[locale];
}

// hreflang-Alternates für eine übersetzte Seite
export function langAlternates(basePath: string) {
  return {
    "de-DE": basePath === "/" ? "/" : basePath,
    "en": `/en${basePath === "/" ? "" : basePath}`,
    "es": `/es${basePath === "/" ? "" : basePath}`,
    "x-default": basePath === "/" ? "/" : basePath,
  };
}

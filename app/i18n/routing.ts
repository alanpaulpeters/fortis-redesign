import { defineRouting } from "next-intl/routing";

export const locales = ["de", "en", "es"] as const;
export type Locale = (typeof locales)[number];

// Native language names for the language switcher.
export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  es: "Español",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "de",
  // German stays at "/", English at "/en", Spanish at "/es".
  localePrefix: "as-needed",
});

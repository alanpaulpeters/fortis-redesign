import type { Locale } from "@/i18n/routing";
import type { LegalContent } from "./types";
import * as de from "./de";
import * as en from "./en";
import * as es from "./es";

export type { LegalSection, LegalContent } from "./types";

const byLocale: Record<Locale, LegalContent> = { de, en, es };

export function getLegal(locale: Locale): LegalContent {
  return byLocale[locale] ?? byLocale.de;
}

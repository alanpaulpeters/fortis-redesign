import type { Locale } from "@/i18n/routing";
import type { FaqContent } from "./types";
import * as de from "./de";
import * as en from "./en";
import * as es from "./es";

export type { FaqItem, FaqContent } from "./types";

const byLocale: Record<Locale, FaqContent> = { de, en, es };

export function getFaqs(locale: Locale): FaqContent {
  return byLocale[locale] ?? byLocale.de;
}

import type { Metadata } from "next";
import { MahnbescheidPage } from "@/components/pages/MahnbescheidPage";

import { en } from "@/content/locales/en";

const t = en.pages.mahnbescheid;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    canonical: "/en/mahnbescheid",
    languages: {
      "de-DE": "/mahnbescheid",
      en: "/en/mahnbescheid",
      es: "/es/mahnbescheid",
      "x-default": "/mahnbescheid",
    },
  },
};

export default function Page() {
  return <MahnbescheidPage locale="en" />;
}

import type { Metadata } from "next";
import { MahnbescheidPage } from "@/components/pages/MahnbescheidPage";

import { es } from "@/content/locales/es";

const t = es.pages.mahnbescheid;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    canonical: "/es/mahnbescheid",
    languages: {
      "de-DE": "/mahnbescheid",
      en: "/en/mahnbescheid",
      es: "/es/mahnbescheid",
      "x-default": "/mahnbescheid",
    },
  },
};

export default function Page() {
  return <MahnbescheidPage locale="es" />;
}

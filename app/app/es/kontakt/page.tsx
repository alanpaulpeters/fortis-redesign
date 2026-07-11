import type { Metadata } from "next";
import { KontaktPage } from "@/components/pages/KontaktPage";

import { es } from "@/content/locales/es";

const t = es.pages.kontakt;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    canonical: "/es/kontakt",
    languages: {
      "de-DE": "/kontakt",
      en: "/en/kontakt",
      es: "/es/kontakt",
      "x-default": "/kontakt",
    },
  },
};

export default function Page() {
  return <KontaktPage locale="es" />;
}

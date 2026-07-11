import type { Metadata } from "next";
import { AuslandPage } from "@/components/pages/AuslandPage";

import { es } from "@/content/locales/es";

const t = es.pages.ausland;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    canonical: "/es/auslandsinkasso",
    languages: {
      "de-DE": "/auslandsinkasso",
      en: "/en/auslandsinkasso",
      es: "/es/auslandsinkasso",
      "x-default": "/auslandsinkasso",
    },
  },
};

export default function Page() {
  return <AuslandPage locale="es" />;
}

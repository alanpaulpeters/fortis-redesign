import type { Metadata } from "next";
import { InkassoPage } from "@/components/pages/InkassoPage";

import { es } from "@/content/locales/es";

const t = es.pages.inkasso;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    canonical: "/es/inkassobeauftragung",
    languages: {
      "de-DE": "/inkassobeauftragung",
      en: "/en/inkassobeauftragung",
      es: "/es/inkassobeauftragung",
      "x-default": "/inkassobeauftragung",
    },
  },
};

export default function Page() {
  return <InkassoPage locale="es" />;
}

import type { Metadata } from "next";
import { KontaktPage } from "@/components/pages/KontaktPage";

import { en } from "@/content/locales/en";

const t = en.pages.kontakt;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    canonical: "/en/kontakt",
    languages: {
      "de-DE": "/kontakt",
      en: "/en/kontakt",
      es: "/es/kontakt",
      "x-default": "/kontakt",
    },
  },
};

export default function Page() {
  return <KontaktPage locale="en" />;
}

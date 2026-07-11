import type { Metadata } from "next";
import { AuslandPage } from "@/components/pages/AuslandPage";

import { en } from "@/content/locales/en";

const t = en.pages.ausland;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    canonical: "/en/auslandsinkasso",
    languages: {
      "de-DE": "/auslandsinkasso",
      en: "/en/auslandsinkasso",
      es: "/es/auslandsinkasso",
      "x-default": "/auslandsinkasso",
    },
  },
};

export default function Page() {
  return <AuslandPage locale="en" />;
}

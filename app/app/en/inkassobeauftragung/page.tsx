import type { Metadata } from "next";
import { InkassoPage } from "@/components/pages/InkassoPage";

import { en } from "@/content/locales/en";

const t = en.pages.inkasso;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    canonical: "/en/inkassobeauftragung",
    languages: {
      "de-DE": "/inkassobeauftragung",
      en: "/en/inkassobeauftragung",
      es: "/es/inkassobeauftragung",
      "x-default": "/inkassobeauftragung",
    },
  },
};

export default function Page() {
  return <InkassoPage locale="en" />;
}

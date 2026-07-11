import type { Metadata } from "next";
import { SchuldnerPage } from "@/components/pages/SchuldnerPage";

import { es } from "@/content/locales/es";

const t = es.pages.schuldner;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    canonical: "/es/schuldner",
    languages: {
      "de-DE": "/schuldner",
      en: "/en/schuldner",
      es: "/es/schuldner",
      "x-default": "/schuldner",
    },
  },
};

export default function Page() {
  return <SchuldnerPage locale="es" />;
}

import type { Metadata } from "next";
import { SchuldnerPage } from "@/components/pages/SchuldnerPage";

import { en } from "@/content/locales/en";

const t = en.pages.schuldner;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDesc,
  alternates: {
    canonical: "/en/schuldner",
    languages: {
      "de-DE": "/schuldner",
      en: "/en/schuldner",
      es: "/es/schuldner",
      "x-default": "/schuldner",
    },
  },
};

export default function Page() {
  return <SchuldnerPage locale="en" />;
}

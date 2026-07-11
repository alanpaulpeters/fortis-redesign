import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { agb } from "@/content/legal";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  description:
    "Allgemeine Geschäftsbedingungen der Fortis Inkasso GmbH & Co. KG für Inkassoaufträge und Forderungsmanagement.",
  alternates: { canonical: "/allgemeine-geschaftsbedingungen" },
  robots: { index: false },
};

export default function Agb() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen" sections={agb} />
  );
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { impressum } from "@/content/legal";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum der Fortis Inkasso GmbH & Co. KG, Gehrtsstraße 16, 40235 Düsseldorf. Registergericht Düsseldorf, HRA 27149.",
  alternates: { canonical: "/impressum" },
  robots: { index: false },
};

export default function Impressum() {
  return <LegalPage title="Impressum" sections={impressum} />;
}

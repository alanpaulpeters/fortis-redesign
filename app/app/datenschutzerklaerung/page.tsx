import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { datenschutz } from "@/content/legal";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung der Fortis Inkasso GmbH & Co. KG: Informationen zur Verarbeitung personenbezogener Daten nach DSGVO.",
  alternates: { canonical: "/datenschutzerklaerung" },
  robots: { index: false },
};

export default function Datenschutzerklaerung() {
  return <LegalPage title="Datenschutzerklärung" sections={datenschutz} />;
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { widerruf } from "@/content/legal";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung",
  description:
    "Widerrufsbelehrung der Fortis Inkasso GmbH & Co. KG: Informationen zu Ihrem Widerrufsrecht bei Vertragsabschluss.",
  alternates: { canonical: "/widerrufsbelehrung" },
  robots: { index: false },
};

export default function Widerrufsbelehrung() {
  return <LegalPage title="Widerrufsbelehrung" sections={widerruf} />;
}

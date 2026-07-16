import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: { absolute: "Fortis Inkasso | Konsequent in der Sache. Persönlich im Kontakt." },
  description:
    "Forderungsmanagement auf Erfolgsbasis. Für Gläubiger kostenlos, 100% Ihrer Forderung bei Erfolg. Digital per WhatsApp und QR-Code, persönlich am Telefon und vor Ort.",
  alternates: {
    canonical: "/",
    languages: {
      "de-DE": "/",
      en: "/en",
      es: "/es",
      "x-default": "/",
    },
  },
};

export default function Page() {
  return <HomePage locale="de" />;
}

import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: { absolute: "Fortis Inkasso | Su dinero. De vuelta, seguro." },
  description:
    "Gestión de cobros a éxito. Gratis para acreedores, el 100% de su reclamación en caso de éxito. Digital por WhatsApp y código QR, personal por teléfono y presencial.",
  alternates: {
    canonical: "/es",
    languages: {
      "de-DE": "/",
      en: "/en",
      es: "/es",
      "x-default": "/",
    },
  },
};

export default function Page() {
  return <HomePage locale="es" />;
}

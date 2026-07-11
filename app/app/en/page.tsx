import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: { absolute: "Fortis Inkasso | Your money. Safely back." },
  description:
    "Success-based receivables management. Free for creditors, 100% of your claim on success. Digital via WhatsApp and QR code, personal by phone and on site.",
  alternates: {
    canonical: "/en",
    languages: {
      "de-DE": "/",
      en: "/en",
      es: "/es",
      "x-default": "/",
    },
  },
};

export default function Page() {
  return <HomePage locale="en" />;
}

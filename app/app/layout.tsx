import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fortis-inkasso.de"),
  title: {
    default: "Fortis Inkasso | Ihr Geld. Sicher zurück.",
    template: "%s | Fortis Inkasso",
  },
  description:
    "Forderungsmanagement auf Erfolgsbasis. Für Gläubiger kostenlos, 100% Ihrer Forderung bei Erfolg. Digital per WhatsApp und QR-Code, persönlich am Telefon und vor Ort.",
  openGraph: {
    siteName: "Fortis Inkasso",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${sora.variable} h-full`}>
      <body className="min-h-full font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("fortis-theme")==="light")document.documentElement.classList.add("light")}catch(e){}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}

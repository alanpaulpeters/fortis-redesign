import type { Metadata, Viewport } from "next";
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
  twitter: {
    card: "summary_large_image",
  },
};

// themeColor: passt zum Dark-Default aus globals.css (light/dark je Präferenz)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060b16" },
    { media: "(prefers-color-scheme: light)", color: "#f4f6fa" },
  ],
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

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sora } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { TopProgressBar } from "@/components/TopProgressBar";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL("https://fortis-inkasso.de"),
    title: {
      default: t("titleDefault"),
      template: "%s | Fortis Inkasso",
    },
    description: t("description"),
    icons: {
      icon: "/media/favicon.png",
      shortcut: "/media/favicon.png",
      apple: "/media/favicon.png",
    },
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: {
        de: "/",
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      siteName: "Fortis Inkasso",
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = params;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${sora.variable} h-full`}>
      <body className="min-h-full font-sans">
        <TopProgressBar />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

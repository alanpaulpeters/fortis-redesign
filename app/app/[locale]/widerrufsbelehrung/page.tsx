import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/LegalPage";
import { getLegal } from "@/content/legal";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pages.legal" });
  return {
    title: t("widerrufMetaTitle"),
    description: t("widerrufMetaDescription"),
    alternates: {
      canonical: locale === "de" ? "/widerrufsbelehrung" : `/${locale}/widerrufsbelehrung`,
    },
    robots: { index: false },
  };
}

export default async function Widerrufsbelehrung({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("pages.legal");
  return <LegalPage title={t("widerrufTitle")} sections={getLegal(locale).widerruf} />;
}

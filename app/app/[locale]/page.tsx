import { setRequestLocale, getTranslations } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Process } from "@/components/Process";
import { Channels } from "@/components/Channels";
import { Services } from "@/components/Services";
import { Trust } from "@/components/Trust";
import { Human } from "@/components/Human";
import { Consultation } from "@/components/Consultation";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { getFaqs } from "@/content/faqs";
import type { Locale } from "@/i18n/routing";

export default async function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const faqs = getFaqs(locale).general;

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Process />
        <Channels />
        <Services />
        <Trust />
        <Human />
        <Consultation />
        <Faq items={faqs} title={t("titleHome")} />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

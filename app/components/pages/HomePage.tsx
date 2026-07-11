import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Process } from "@/components/Process";
import { Channels } from "@/components/Channels";
import { Services } from "@/components/Services";
import { Trust } from "@/components/Trust";
import { Human } from "@/components/Human";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { getDict, type Locale } from "@/content/locales";

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  return (
    <div lang={locale}>
      <Nav locale={locale} />
      <main>
        <Hero locale={locale} />
        <Problem locale={locale} />
        <Process locale={locale} />
        <Channels locale={locale} />
        <Services locale={locale} />
        <Trust locale={locale} />
        <Human locale={locale} />
        <Faq items={dict.faq.items} title={dict.faq.title} />
        <CtaSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}

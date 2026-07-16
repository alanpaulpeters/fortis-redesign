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

const SITE = "https://fortis-inkasso.de";

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Fortis Inkasso",
        legalName: "Fortis Inkasso GmbH & Co. KG",
        url: SITE,
        logo: `${SITE}/media/logo-navy.png`,
        email: "info@fortis-inkasso.de",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Gehrtsstraße 16",
          postalCode: "40235",
          addressLocality: "Düsseldorf",
          addressCountry: "DE",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE}/#localbusiness`,
        name: "Fortis Inkasso",
        image: `${SITE}/media/logo-navy.png`,
        url: SITE,
        email: "info@fortis-inkasso.de",
        priceRange: "Erfolgsbasis",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Gehrtsstraße 16",
          postalCode: "40235",
          addressLocality: "Düsseldorf",
          addressCountry: "DE",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "Fortis Inkasso",
        publisher: { "@id": `${SITE}/#organization` },
        inLanguage: locale,
      },
      {
        "@type": "FAQPage",
        mainEntity: dict.faq.items.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
  return (
    <div lang={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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

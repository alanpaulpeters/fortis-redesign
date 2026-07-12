import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { ContactForm } from "@/components/ContactForm";
import { getFaqs } from "@/content/faqs";
import type { Locale } from "@/i18n/routing";
import { Phone, EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pages.kontakt" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: locale === "de" ? "/kontakt" : `/${locale}/kontakt` },
  };
}

export default async function Kontakt({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("pages.kontakt");
  const tFaq = await getTranslations("faq");
  const faqs = getFaqs(locale).general;

  const contacts = [
    { icon: Phone, label: "+49 211 15856110", href: "tel:+4921115856110" },
    {
      icon: EnvelopeSimple,
      label: "info@fortis-inkasso.de",
      href: "mailto:info@fortis-inkasso.de",
    },
    {
      icon: MapPin,
      label: t("addressLabel"),
      href: "https://maps.google.com/?q=Gehrtsstra%C3%9Fe+16,+40235+D%C3%BCsseldorf",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Fortis Inkasso GmbH & Co. KG",
            url: "https://fortis-inkasso.de",
            telephone: "+49 211 15856110",
            email: "info@fortis-inkasso.de",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Gehrtsstraße 16",
              postalCode: "40235",
              addressLocality: "Düsseldorf",
              addressCountry: "DE",
            },
          }),
        }}
      />
      <Nav />
      <main>
        <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col gap-4">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-surface/60 p-5 transition-colors hover:bg-surface"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint/10 text-mint">
                    <c.icon size={22} />
                  </div>
                  <span className="text-[15px] font-medium text-frost/85">
                    {c.label}
                  </span>
                </a>
              ))}
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                {t("formHeading")}
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>

        <Faq items={faqs} title={tFaq("titleKontakt")} />
      </main>
      <Footer />
    </>
  );
}

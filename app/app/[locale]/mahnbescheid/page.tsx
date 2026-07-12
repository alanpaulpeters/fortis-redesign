import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { getFaqs } from "@/content/faqs";
import type { Locale } from "@/i18n/routing";
import { CALENDLY_URL } from "@/lib/site";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pages.mahnbescheid" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === "de" ? "/mahnbescheid" : `/${locale}/mahnbescheid`,
    },
  };
}

export default async function Mahnbescheid({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("pages.mahnbescheid");
  const tFaq = await getTranslations("faq");
  const faqs = getFaqs(locale).general;
  const steps = t.raw("steps") as string[];

  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
          primary={{ label: t("primary"), href: "/kontakt" }}
          secondary={{ label: t("secondary"), href: CALENDLY_URL }}
        />

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("sectionTitle")}
            </h2>
            <div className="mt-6 grid gap-10 lg:grid-cols-2">
              <p className="text-[15px] font-light leading-relaxed text-frost/60">
                {t("intro1")}
              </p>
              <p className="text-[15px] font-light leading-relaxed text-frost/60">
                {t("intro2")}
              </p>
            </div>

            <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-white/[0.07] bg-surface/60 p-6"
                >
                  <span className="text-3xl font-semibold text-mint">
                    {i + 1}.
                  </span>
                  <p className="mt-3 text-[14px] font-light leading-relaxed text-frost/60">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("zvTitle")}
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed text-frost/60">
                {t("zvText")}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("widerspruchTitle")}
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed text-frost/60">
                {t("widerspruchText")}
              </p>
            </div>
          </div>
        </section>

        <Faq items={faqs} title={tFaq("titleHome")} />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

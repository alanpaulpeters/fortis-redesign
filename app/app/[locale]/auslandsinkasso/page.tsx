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
import {
  ClipboardText,
  FileArrowUp,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

const stepIcons = [ClipboardText, FileArrowUp, CheckCircle];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pages.ausland" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === "de" ? "/auslandsinkasso" : `/${locale}/auslandsinkasso`,
    },
  };
}

export default async function Auslandsinkasso({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("pages.ausland");
  const tFaq = await getTranslations("faq");
  const faqs = getFaqs(locale).general;
  const paragraphs = t.raw("paragraphs") as string[];
  const steps = t.raw("steps") as { title: string; text: string }[];

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
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("achtenTitle")}
            </h2>
            <div className="mt-8 flex flex-col gap-5 text-[15px] font-light leading-relaxed text-frost/60">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("beauftragungTitle")}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {steps.map((step, i) => {
                const Icon = stepIcons[i];
                return (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-white/[0.07] bg-surface/60 p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/10 text-mint">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-4 text-[16px] font-semibold text-frost/90">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] font-light leading-relaxed text-frost/55">
                      {step.text}
                    </p>
                  </div>
                );
              })}
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

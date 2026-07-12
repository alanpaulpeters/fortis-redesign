import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { getFaqs } from "@/content/faqs";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { CALENDLY_URL } from "@/lib/site";
import {
  QrCode,
  ArrowsClockwise,
  ChartPieSlice,
  Bank,
  CreditCard,
  Repeat,
  HandCoins,
} from "@phosphor-icons/react/dist/ssr";

const featureIcons = [QrCode, ArrowsClockwise, ChartPieSlice];
const paymentIcons = [Bank, HandCoins, CreditCard, Repeat];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pages.schuldner" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: locale === "de" ? "/schuldner" : `/${locale}/schuldner` },
  };
}

export default async function Schuldner({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("pages.schuldner");
  const tFaq = await getTranslations("faq");
  const schuldnerFaqs = getFaqs(locale).schuldner;
  const features = t.raw("features") as { title: string; text: string }[];
  const payments = t.raw("payments") as { title: string; text: string }[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: schuldnerFaqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
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
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("digitalHeading")}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {features.map((f, i) => {
                const Icon = featureIcons[i];
                return (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-white/[0.07] bg-surface/60 p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/10 text-mint">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-4 text-[16px] font-semibold text-frost/90">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] font-light leading-relaxed text-frost/55">
                      {f.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-frost/90">
                  {t("qrScanTitle")}
                </h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-frost/60">
                  {t("qrScanText")}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-frost/90">
                  {t("noPhoneTitle")}
                </h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-frost/60">
                  {t("noPhoneText")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("paymentsHeading")}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {payments.map((p, i) => {
                const Icon = paymentIcons[i];
                return (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-white/[0.07] bg-surface/60 p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/10 text-mint">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-4 text-[16px] font-semibold text-frost/90">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] font-light leading-relaxed text-frost/55">
                      {p.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 grid gap-10 rounded-2xl border border-white/[0.07] bg-surface/60 p-8 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-frost/90">
                  {t("payClaimTitle")}
                </h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-frost/60">
                  {t("payClaimText")}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-frost/90">
                  {t("sideTitle")}
                </h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-frost/60">
                  {t("sideText")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <Faq items={schuldnerFaqs} title={tFaq("titleSchuldner")} />
        <section className="border-t border-white/[0.06] py-20 text-center">
          <p className="mx-auto max-w-xl px-6 text-[15px] font-light text-frost/60">
            {t.rich("notFound", {
              link: (chunks) => (
                <Link
                  href="/kontakt"
                  className="text-mint underline-offset-4 hover:underline"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { getDict, localePrefix, type Locale } from "@/content/locales";
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

export function SchuldnerPage({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const t = dict.pages.schuldner;
  const kontakt = `${localePrefix[locale]}/kontakt`;

  return (
    <div lang={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: locale,
            mainEntity: t.faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
      <Nav locale={locale} />
      <main>
        <PageHero
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.lead}
          primary={{ label: t.ctaPrimary, href: "/portal" }}
          secondary={{ label: t.ctaSecondary, href: kontakt }}
        />

        <section className="border-t border-line/[0.06] py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.digitalTitle}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {t.features.map((f, i) => {
                const Icon = featureIcons[i];
                return (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-line/[0.07] bg-surface/60 p-6"
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
                  {t.qrTitle}
                </h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-frost/60">
                  {t.qrBody}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-frost/90">
                  {t.noPhoneTitle}
                </h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-frost/60">
                  {t.noPhoneBody}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-line/[0.06] py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.paymentTitle}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.payments.map((p, i) => {
                const Icon = paymentIcons[i];
                return (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-line/[0.07] bg-surface/60 p-6"
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

            <div className="mt-16 grid gap-10 rounded-2xl border border-line/[0.07] bg-surface/60 p-8 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-frost/90">
                  {t.payTitle}
                </h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-frost/60">
                  {t.payBody}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-frost/90">
                  {t.helpTitle}
                </h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-frost/60">
                  {t.helpBody}
                </p>
              </div>
            </div>
          </div>
        </section>

        <Faq items={t.faqs} title={t.faqTitle} />
        <section className="border-t border-line/[0.06] py-20 text-center">
          <p className="mx-auto max-w-xl px-6 text-[15px] font-light text-frost/60">
            {t.moreHelp}{" "}
            <a href={kontakt} className="text-mint underline-offset-4 hover:underline">
              {t.moreHelpLink}
            </a>
            .
          </p>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}

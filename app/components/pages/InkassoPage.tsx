import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { getDict, localePrefix, type Locale } from "@/content/locales";
import {
  FileArrowUp,
  MagnifyingGlass,
  PaperPlaneTilt,
  Scales,
} from "@phosphor-icons/react/dist/ssr";

const stepIcons = [FileArrowUp, MagnifyingGlass, PaperPlaneTilt, Scales];

export function InkassoPage({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const t = dict.pages.inkasso;
  const kontakt = `${localePrefix[locale]}/kontakt`;

  return (
    <div lang={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: dict.faq.items.map((f) => ({
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
          primary={{ label: t.ctaPrimary, href: kontakt }}
          secondary={{ label: t.ctaSecondary, href: kontakt }}
        />

        <section className="border-t border-line/[0.06] py-24 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {t.sectionTitle}
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed text-frost/60">
                {t.sectionP1}
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed text-frost/60">
                {t.sectionP2}
              </p>
            </div>

            <ol className="flex flex-col gap-6">
              {t.steps.map((step, i) => {
                const Icon = stepIcons[i];
                return (
                  <li
                    key={step.title}
                    className="flex gap-5 rounded-2xl border border-line/[0.07] bg-surface/60 p-6"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint/10 text-mint">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-semibold text-frost/90">
                        {i + 1}. {step.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] font-light leading-relaxed text-frost/55">
                        {step.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <Faq items={dict.faq.items} title={dict.faq.title} />
        <CtaSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}

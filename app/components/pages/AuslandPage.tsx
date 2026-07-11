import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { getDict, localePrefix, type Locale } from "@/content/locales";
import {
  ClipboardText,
  FileArrowUp,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

const stepIcons = [ClipboardText, FileArrowUp, CheckCircle];

export function AuslandPage({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const t = dict.pages.ausland;
  const kontakt = `${localePrefix[locale]}/kontakt`;

  return (
    <div lang={locale}>
      <Nav locale={locale} />
      <main>
        <PageHero
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.lead}
          primary={{ label: t.ctaPrimary, href: kontakt }}
          secondary={{ label: t.ctaSecondary, href: kontakt }}
        />

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.sectionTitle}
            </h2>
            <div className="mt-8 flex flex-col gap-5 text-[15px] font-light leading-relaxed text-frost/60">
              {t.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.stepsTitle}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {t.steps.map((step, i) => {
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

        <Faq items={dict.faq.items} title={dict.faq.title} />
        <CtaSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}

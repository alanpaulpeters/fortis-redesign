import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { getDict, localePrefix, type Locale } from "@/content/locales";

export function MahnbescheidPage({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const t = dict.pages.mahnbescheid;
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
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.side1Title}
            </h2>
            <div className="mt-6 grid gap-10 lg:grid-cols-2">
              <p className="text-[15px] font-light leading-relaxed text-frost/60">
                {t.side1P1}
              </p>
              <p className="text-[15px] font-light leading-relaxed text-frost/60">
                {t.side1P2}
              </p>
            </div>

            <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.steps.map((step, i) => (
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
                {t.block1Title}
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed text-frost/60">
                {t.block1Body}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {t.block2Title}
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed text-frost/60">
                {t.block2Body}
              </p>
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

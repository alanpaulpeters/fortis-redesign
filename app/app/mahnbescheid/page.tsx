import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Mahnbescheid & gerichtliches Mahnverfahren",
  description:
    "Schnell und kostengünstig zum Vollstreckungstitel: Fortis Inkasso beantragt für Sie den Mahnbescheid, überwacht Fristen und leitet bei Bedarf die Zwangsvollstreckung ein. 30 Jahre vollstreckbar.",
  alternates: { canonical: "/mahnbescheid" },
};

const steps = [
  "Wir beantragen beim zuständigen Mahngericht einen Mahnbescheid – die meisten Bundesländer haben zentrale Mahngerichte, auch elektronische Mahnverfahren sind möglich.",
  "Dem Antragsgegner, Ihrem Schuldner, wird der Mahnbescheid zugestellt. Er kann Widerspruch einlegen.",
  "Bleibt der Widerspruch aus, beantragen wir den Vollstreckungsbescheid.",
  "Mit Rechtskraft des Vollstreckungsbescheids halten Sie einen Titel in der Hand – vollstreckbar sofort und innerhalb der nächsten 30 Jahre.",
];

export default function Mahnbescheid() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Mahnverfahren"
          title="Mahnverfahren durch Fortis Inkasso."
          lead="Das gerichtliche Mahnverfahren ist ein schneller und kostengünstiger Weg zum Vollstreckungstitel – für Unternehmer und Privatpersonen mit unbestrittenen Geldforderungen. Voraussetzung sind Rechnungsstellung und Mahnung durch den Gläubiger."
          primary={{ label: "Mahnverfahren beantragen", href: "/kontakt" }}
          secondary={{ label: "Beratungsgespräch", href: "/kontakt" }}
        />

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Wir sind an Ihrer Seite.
            </h2>
            <div className="mt-6 grid gap-10 lg:grid-cols-2">
              <p className="text-[15px] font-light leading-relaxed text-frost/60">
                Wenn Sie als Unternehmer oder Privatperson eine Geldforderung
                haben, kann das gerichtliche Mahnverfahren ein schneller und
                kostengünstiger Weg sein, um an einen Vollstreckungstitel zu
                kommen. Es bietet sich an, soweit die Geldforderung nicht
                bestritten wurde und keine Unzulässigkeitsgründe vorliegen. Mit
                dem Vollstreckungsbescheid kann direkt vollstreckt werden –
                oder innerhalb der nächsten 30 Jahre. Dieser lange Zeitraum
                erhöht die Chance auf eine erfolgreiche Pfändung erheblich.
              </p>
              <p className="text-[15px] font-light leading-relaxed text-frost/60">
                Wir behalten Ihre Schuldner im Auge und prüfen, ob ein aktuell
                nicht zahlungsfähiger Schuldner zu einem späteren Zeitpunkt
                über liquide Mittel verfügt – etwa durch eine Erbschaft, eine
                Trauung oder einen neuen Job. Mit unserem Service kommen Sie zu
                Ihrem Vollstreckungsbescheid, soweit Ihr Schuldner keinen
                Widerspruch einlegt.
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
                Beginn der Zwangsvollstreckung.
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed text-frost/60">
                Oftmals begleicht der Schuldner nach Zustellung des
                Mahnbescheids die offene Forderung, um ein kostenpflichtiges
                gerichtliches Verfahren zu verhindern – das Mahnverfahren ist
                dann beendet. Für Mahn- und Vollstreckungsbescheid fallen
                Rechtsanwalts- und Gerichtskosten an; lediglich für die
                geringen Gerichtskosten müssen Sie in Vorkasse gehen.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Wenn Ihr Schuldner Widerspruch einlegt.
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed text-frost/60">
                Legt Ihr Schuldner Widerspruch gegen den Mahnbescheid oder
                Einspruch gegen den Vollstreckungsbescheid ein, muss die
                Forderung im Gerichtsverfahren geltend gemacht werden. Unsere
                Anwälte beraten Sie und übernehmen die Fortsetzung des
                Forderungseinzugs. Ist Ihre Forderung berechtigt, trägt der
                Schuldner auch diese Kosten. Ob die Voraussetzungen für den
                Mahnbescheid vorliegen, prüfen wir gerne für Sie – inklusive
                Ihrer AGB und des mitgeteilten Sachverhalts.
              </p>
            </div>
          </div>
        </section>

        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

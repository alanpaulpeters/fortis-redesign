import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import {
  ClipboardText,
  FileArrowUp,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Auslandsinkasso – Forderungen international durchsetzen",
  description:
    "Rechtssicherer Forderungseinzug im Ausland: außergerichtliche Geltendmachung in der Landessprache, Europäischer Zahlungsbefehl und Zwangsvollstreckung. Fortis Inkasso setzt Ihre grenzüberschreitenden Forderungen durch.",
  alternates: { canonical: "/auslandsinkasso" },
};

const steps = [
  {
    icon: ClipboardText,
    title: "Fragebogen ausfüllen",
    text: "Registrieren Sie sich und füllen Sie die erforderlichen Felder aus.",
  },
  {
    icon: FileArrowUp,
    title: "Dokument hochladen",
    text: "Ganz simpel als PDF oder Bild-Datei.",
  },
  {
    icon: CheckCircle,
    title: "Und schon fertig!",
    text: "Wir erhalten Ihr Formular und die Rechnung und melden uns schnellstmöglich zurück, ob wir Ihren Auftrag annehmen.",
  },
];

export default function Auslandsinkasso() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Auslandsinkasso"
          title="Auslandsinkasso von Fortis Inkasso."
          lead="Auch im Ausland machen wir Ihre Forderungen rechtssicher für Sie geltend – vom außergerichtlichen Verfahren in der Landessprache bis zum Europäischen Zahlungsbefehl."
          primary={{ label: "Jetzt beauftragen", href: "/kontakt" }}
          secondary={{ label: "Beratungsgespräch", href: "/kontakt" }}
        />

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Worauf geachtet werden muss.
            </h2>
            <div className="mt-8 flex flex-col gap-5 text-[15px] font-light leading-relaxed text-frost/60">
              <p>
                Auslandsinkasso birgt nicht nur höhere Risiken, sondern bedarf
                auch wesentlich umfassenderen rechtlichen Aufwands und
                Recherchen zum Schuldner. Im Einzelfall ist festzustellen, ob
                inländisches oder ausländisches Inkassorecht gilt. Auch wenn
                sich die Geltendmachung schwieriger gestaltet, weil der
                Schuldner seinen Wohn- oder Firmensitz im Ausland hat, helfen
                wir Ihnen weiter.
              </p>
              <p>
                Zunächst raten wir auch hier zu einem außergerichtlichen
                Verfahren. Wir wenden uns direkt an Ihren Schuldner – nach
                Möglichkeit in der Sprache des Landes, in dem er seinen Wohn-
                oder Firmensitz hat, oder auf Englisch.
              </p>
              <p>
                Da sich Schuldner im Ausland beim Nichtbegleichen von
                Rechnungen oft sicherer fühlen, bietet sich bei Erfolglosigkeit
                der außergerichtlichen Geltendmachung für grenzüberschreitende
                Forderungen der Antrag auf Erlass eines Europäischen
                Zahlungsbefehls an. In Fällen, in denen das Anerkennungs- und
                Vollstreckungsausführungsgesetz (AVAG) Anwendung findet, kann
                auch die Zustellung eines Mahnbescheids im Ausland sinnvoll
                sein. Voraussetzung ist ein fälliger, unbestrittener Anspruch
                aus dem Zivil- oder Handelsrecht mit grenzüberschreitendem
                Zusammenhang.
              </p>
              <p>
                Wir stellen für Sie den Antrag beim Europäischen Mahngericht.
                Nach Prüfung erlässt das Gericht den Europäischen
                Zahlungsbefehl, der dem Schuldner zugestellt wird. Der
                Schuldner kann innerhalb von 30 Tagen Widerspruch erheben.
                Reagiert er nicht, erhalten Sie einen vollstreckbaren Titel und
                können die Zwangsvollstreckung einleiten. Bei Widerspruch gehen
                wir in den Zivilprozess über.
              </p>
              <p>
                Aus den genannten Gründen gilt beim Auslandsinkasso eine andere
                Vergütungsregelung als beim Inlandsinkasso. Füllen Sie gerne
                unseren kurzen Anfragebogen aus – wir beraten Sie umfassend.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Einfache Beauftragung, auch im Ausland.
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/[0.07] bg-surface/60 p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/10 text-mint">
                    <step.icon size={22} />
                  </div>
                  <h3 className="mt-4 text-[16px] font-semibold text-frost/90">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] font-light leading-relaxed text-frost/55">
                    {step.text}
                  </p>
                </div>
              ))}
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

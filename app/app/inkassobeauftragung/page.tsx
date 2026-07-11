import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { faqs } from "@/content/faqs";
import { CtaSection } from "@/components/CtaSection";
import {
  FileArrowUp,
  MagnifyingGlass,
  PaperPlaneTilt,
  Scales,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Inkassobeauftragung – Forderungen effizient eintreiben",
  description:
    "Beauftragen Sie Fortis Inkasso mit Ihrer Forderung: kosten- und zeiteffizient, auf Erfolgsbasis, digital oder persönlich. Bei Bedarf nahtloser Übergang zur gerichtlichen Geltendmachung durch unsere Partnerkanzlei.",
  alternates: { canonical: "/inkassobeauftragung" },
};

const steps = [
  {
    icon: FileArrowUp,
    title: "Forderung einreichen",
    text: "Registrieren Sie sich, füllen Sie die erforderlichen Felder aus und laden Sie Ihre Rechnung als PDF oder Bild hoch – in wenigen Minuten erledigt.",
  },
  {
    icon: MagnifyingGlass,
    title: "Prüfung durch uns",
    text: "Wir prüfen Ihre Forderung und melden uns schnellstmöglich zurück, ob wir Ihren Auftrag annehmen.",
  },
  {
    icon: PaperPlaneTilt,
    title: "Außergerichtliche Geltendmachung",
    text: "Wir versenden die Inkassomahnungen, ermitteln bei Bedarf die aktuelle Adresse und zeigen dem Schuldner Konsequenzen und Lösungswege auf.",
  },
  {
    icon: Scales,
    title: "Gerichtliche Durchsetzung",
    text: "Bleibt die außergerichtliche Geltendmachung erfolglos, übernimmt unsere Partnerkanzlei nahtlos die gerichtliche Durchsetzung – ohne Zeitverlust, alle Informationen liegen bereits vor.",
  },
];

export default function Inkassobeauftragung() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
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
          eyebrow="Inkassobeauftragung"
          title="Ihre effiziente Lösung für erfolgreiche Forderungsbeitreibung."
          lead="Fortis Inkasso ermöglicht Unternehmen und Privatpersonen, ihre Forderungen kosten- und zeiteffizient geltend zu machen – digital über WhatsApp und QR-Code oder persönlich per Telefon und Hausbesuch."
          primary={{ label: "Jetzt beauftragen", href: "/kontakt" }}
          secondary={{ label: "Beratungsgespräch", href: "/kontakt" }}
        />

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Vom ersten Schreiben bis zum Titel.
              </h2>
              <p className="mt-6 text-[15px] font-light leading-relaxed text-frost/60">
                Unser Service bietet Unternehmen sowie Privatpersonen die
                Möglichkeit, kosten- und zeiteffizient ihre Forderungen durch
                uns geltend zu machen. Bei erfolgloser außergerichtlicher
                Geltendmachung haben wir als Rechtsanwälte sofort die
                Möglichkeit, eine gerichtliche Geltendmachung durch unsere
                Partnerkanzlei zu verfolgen – ein fließender Übergang, bei dem
                keine weitere Zeit verloren geht.
              </p>
              <p className="mt-4 text-[15px] font-light leading-relaxed text-frost/60">
                Wir arbeiten auf Erfolgsbasis: Im Erfolgsfall trägt Ihr
                Schuldner die Inkassogebühren, Sie erhalten 100&nbsp;% Ihrer
                Forderung.
              </p>
            </div>

            <ol className="flex flex-col gap-6">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-5 rounded-2xl border border-white/[0.07] bg-surface/60 p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint/10 text-mint">
                    <step.icon size={22} />
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
              ))}
            </ol>
          </div>
        </section>

        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

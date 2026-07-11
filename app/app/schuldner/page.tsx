import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Faq, type FaqItem } from "@/components/Faq";
import {
  QrCode,
  ArrowsClockwise,
  ChartPieSlice,
  Bank,
  CreditCard,
  Repeat,
  HandCoins,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Informationen für Schuldner – Rechnung einfach bezahlen",
  description:
    "Sie haben ein Schreiben von Fortis Inkasso erhalten? Bezahlen Sie einfach per QR-Code, Überweisung, Ratenzahlung oder Lastschrift. Alle Antworten auf häufige Fragen und Hilfe bei Zahlungsschwierigkeiten.",
  alternates: { canonical: "/schuldner" },
};

const features = [
  {
    icon: QrCode,
    title: "Direkt online bezahlen",
    text: "Scannen Sie den QR-Code auf der Rechnung und bezahlen Sie direkt online im Schuldner-Dashboard.",
  },
  {
    icon: ArrowsClockwise,
    title: "Wiederkehrende Zahlungen",
    text: "Teilen Sie Ihre Zahlung je nach Verfügbarkeit in monatliche Raten auf und richten Sie ein Lastschriftmandat ein.",
  },
  {
    icon: ChartPieSlice,
    title: "Alle Kosten im Blick",
    text: "Ihre Verbindlichkeiten werden transparent in unserem Dashboard für Sie aufgezeigt.",
  },
];

const payments = [
  { icon: Bank, title: "Überweisung", text: "Ganz klassisch per Banküberweisung – Aktenzeichen in den Verwendungszweck." },
  { icon: HandCoins, title: "Ratenzahlung", text: "Begleichen Sie die Forderung in monatlichen Raten nach Ihren Möglichkeiten." },
  { icon: CreditCard, title: "Kreditkarte", text: "Schnelle und sichere Zahlung per Kreditkarte." },
  { icon: Repeat, title: "Lastschrift", text: "Wiederkehrende Zahlungen problemlos abbuchen lassen." },
];

const schuldnerFaqs: FaqItem[] = [
  {
    question: "Ich habe ein Schreiben erhalten, was muss ich tun?",
    answer:
      "Prüfen Sie die Forderung und zahlen Sie bei Richtigkeit der Hauptforderung. Mit Ihrem Aktenzeichen können Sie direkt online bezahlen – per PayPal, Klarna, Banküberweisung, Lastschrift, Kreditkarte, Sofortüberweisung oder Apple Pay.",
  },
  {
    question: "An wen muss ich zahlen?",
    answer:
      "Die Zahlung richten Sie bitte an Fortis. Nach der Beauftragung sind allein wir für den Forderungseinzug zuständig. Bei einer Zahlung an den Gläubiger riskieren Sie, dass die Zahlung nicht zugeordnet werden kann, Sie nicht von Ihrer Zahlungsschuld frei werden und die Inkassomaßnahmen fortgeführt werden.",
  },
  {
    question: "Was sind Inkasso-Kosten?",
    answer:
      "Ihr Gläubiger hat uns beauftragt, weil Sie trotz Rechnung und Mahnung nicht gezahlt haben. Gemäß §§ 280, 286 BGB können die durch Ihre Nichtzahlung entstandenen Kosten samt gesetzlicher Verzugszinsen als Schadensersatz eingefordert werden. Sie sind daher verpflichtet, neben der Hauptforderung auch Verzugszinsen und die Inkassokosten zu begleichen – begrenzt auf die gesetzlich vorgesehene Höhe.",
  },
  {
    question: "Ich bin mir nicht sicher, ob die Hauptforderung gegen mich besteht?",
    answer:
      "Die Angaben zu Ihrer Person stammen vom Gläubiger. Halten Sie die Daten für falsch oder sind Sie nicht Schuldner der Forderung – insbesondere bei Identitätsdiebstahl – informieren Sie uns bitte umgehend. Loggen Sie sich mit Ihrem Aktenzeichen ein und schreiben Sie uns eine Nachricht.",
  },
  {
    question: "Ich kann die Forderung derzeit nicht begleichen. Was kann ich tun?",
    answer:
      "Wir bieten Ihnen Teil- oder Ratenzahlungen gemäß Ihren finanziellen Möglichkeiten an. Nutzen Sie die beigefügte Ratenzahlungsvereinbarung oder stellen Sie im Serviceportal einen Antrag auf Ratenzahlung/Stundung und schildern Sie Ihr Anliegen. Wir kommen auf Sie zurück und helfen Ihnen gerne.",
  },
  {
    question: "Was passiert, wenn ich nicht zahle?",
    answer:
      "Zunächst erhalten Sie Zeit, auf unser Schreiben zu reagieren. Bleibt eine Reaktion aus, leiten wir ein Mahnverfahren ein. Je früher Sie zahlen, desto geringer die Inkassokosten. Möglich sind außerdem eine negative Schufa-Eintragung, eine Vermögensauskunft beim Gerichtsvollzieher sowie Konto- oder Lohnpfändung im Rahmen der Zwangsvollstreckung. Soweit ein Anspruch besteht, raten wir dringend zur Zahlung.",
  },
];

export default function Schuldner() {
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
          eyebrow="Für Schuldner"
          title="Sie haben ein Schreiben von uns erhalten?"
          lead="Dann besteht eine unbestrittene Forderung gegen Sie. Das ist kein Problem und kann passieren. Wichtig ist jetzt, dass Sie handeln und die Forderung begleichen, um weitere Kosten zu vermeiden."
          primary={{ label: "Jetzt Kontakt aufnehmen", href: "/kontakt" }}
          secondary={{ label: "Beratungsgespräch vereinbaren", href: "/kontakt" }}
        />

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Digitale Zahlungsmöglichkeiten.
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/[0.07] bg-surface/60 p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/10 text-mint">
                    <f.icon size={22} />
                  </div>
                  <h3 className="mt-4 text-[16px] font-semibold text-frost/90">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] font-light leading-relaxed text-frost/55">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-frost/90">
                  QR-Code am Handy scannen
                </h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-frost/60">
                  Um Ihre Rechnung zu bezahlen, scannen Sie einfach den QR-Code
                  oben auf der Ihnen zugeschickten Rechnung mit dem Handy.
                  Danach werden Sie auf das Zahlungsportal weitergeleitet und
                  wählen aus verschiedenen Zahlungsmethoden.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-frost/90">
                  Kein Handy? Kein Problem!
                </h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-frost/60">
                  Sie können auch klassisch per Banküberweisung zahlen.
                  Schreiben Sie unbedingt das Aktenzeichen / die
                  Rechnungsnummer (Bsp: #FI-2023-000001) in den
                  Verwendungszweck, damit wir Ihre Zahlung zuordnen können.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Wählen Sie aus verschiedenen Zahlungsmitteln.
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {payments.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-white/[0.07] bg-surface/60 p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/10 text-mint">
                    <p.icon size={22} />
                  </div>
                  <h3 className="mt-4 text-[16px] font-semibold text-frost/90">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] font-light leading-relaxed text-frost/55">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 grid gap-10 rounded-2xl border border-white/[0.07] bg-surface/60 p-8 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-frost/90">
                  Forderung bezahlen
                </h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-frost/60">
                  Im Falle der Nichtzahlung drohen weitere Verzugskosten sowie
                  ein Mahnverfahren. In weiteren Schritten kann ein negativer
                  Schufa-Eintrag folgen; auch Konto, Lohn oder Gehalt können im
                  Rahmen einer Zwangsvollstreckung gepfändet werden.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-frost/90">
                  Wir stehen Ihnen zur Seite
                </h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-frost/60">
                  Haben Sie Schwierigkeiten, die Rechnung zu begleichen? Kein
                  Problem: Nach Öffnung der Rechnung finden Sie unter der
                  Zahlungsart auf Sie angepasste Lösungen. Für individuelle
                  Beratung schildern Sie uns Ihr Anliegen im Serviceportal.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Faq items={schuldnerFaqs} title="Häufige Fragen von Schuldnern." />
        <section className="border-t border-white/[0.06] py-20 text-center">
          <p className="mx-auto max-w-xl px-6 text-[15px] font-light text-frost/60">
            Ihre Frage ist nicht dabei? Wir helfen Ihnen gerne weiter –{" "}
            <a href="/kontakt" className="text-mint underline-offset-4 hover:underline">
              Kontakt aufnehmen
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

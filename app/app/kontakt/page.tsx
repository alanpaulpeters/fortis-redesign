import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { ContactForm } from "@/components/ContactForm";
import { Phone, EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Kontakt – Beratungsgespräch vereinbaren",
  description:
    "Kontaktieren Sie Fortis Inkasso in Düsseldorf: telefonisch unter +49 211 15856110, per E-Mail an info@fortis-inkasso.de oder über unser Kontaktformular. Wir melden uns schnellstmöglich zurück.",
  alternates: { canonical: "/kontakt" },
};

const contacts = [
  { icon: Phone, label: "+49 211 15856110", href: "tel:+4921115856110" },
  {
    icon: EnvelopeSimple,
    label: "info@fortis-inkasso.de",
    href: "mailto:info@fortis-inkasso.de",
  },
  {
    icon: MapPin,
    label: "Gehrtsstraße 16, 40235 Düsseldorf",
    href: "https://maps.google.com/?q=Gehrtsstra%C3%9Fe+16,+40235+D%C3%BCsseldorf",
  },
];

export default function Kontakt() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Fortis Inkasso GmbH & Co. KG",
            url: "https://fortis-inkasso.de",
            telephone: "+49 211 15856110",
            email: "info@fortis-inkasso.de",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Gehrtsstraße 16",
              postalCode: "40235",
              addressLocality: "Düsseldorf",
              addressCountry: "DE",
            },
          }),
        }}
      />
      <Nav />
      <main>
        <PageHero
          eyebrow="Kontakt"
          title="Wie können wir helfen?"
          lead="Schicken Sie uns Ihre Anfrage und wir melden uns schnellstmöglich bei Ihnen zurück – oder vereinbaren Sie direkt ein unverbindliches Beratungsgespräch."
        />

        <section className="border-t border-white/[0.06] py-24 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col gap-4">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-surface/60 p-5 transition-colors hover:bg-surface"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint/10 text-mint">
                    <c.icon size={22} />
                  </div>
                  <span className="text-[15px] font-medium text-frost/85">
                    {c.label}
                  </span>
                </a>
              ))}
              <p className="mt-4 text-[14px] font-light leading-relaxed text-frost/50">
                Fortis Inkasso GmbH &amp; Co. KG
                <br />
                Gehrtsstraße 16
                <br />
                40235 Düsseldorf / Germany
              </p>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                Nachricht senden.
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>

        <Faq title="FAQ's – Sie haben die Fragen, wir die Antworten." />
      </main>
      <Footer />
    </>
  );
}

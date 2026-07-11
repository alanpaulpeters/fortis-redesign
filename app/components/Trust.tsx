"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Counter } from "@/components/Counter";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const testimonials = [
  {
    name: "Natalie A.",
    quote: "Zuverlässige Lösung für unbezahlte Rechnungen. Exzellente Arbeit, sehr zufrieden.",
    avatar: "/media/avatar-natalie.jpg",
  },
  {
    name: "Daniel N.",
    quote: "Professionelle Unterstützung, das Anwaltsteam hat alles effektiv geregelt.",
    avatar: "/media/avatar-daniel.jpg",
  },
  {
    name: "Moritz S.",
    quote: "Meine unbezahlten Rechnungen wurden erfolgreich eingefordert. Sehr zufrieden.",
    avatar: "/media/avatar-moritz.jpg",
  },
  {
    name: "Vilja W.",
    quote: "Schnelle und kompetente Hilfe. Exzellente Arbeit, empfehlenswert.",
    avatar: "/media/avatar-vilja.jpg",
  },
];

export function Trust() {
  return (
    <section id="vertrauen" className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="flex max-w-2xl flex-col gap-5"
        >
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Vertrauen verkauft. Nicht Druck.
          </h2>
          <p className="text-lg font-light leading-relaxed text-frost/60">
            Ein außenstehender Dritter, der objektiv vermittelt, schont Ihre
            Kundenbeziehung. Und bringt Ihr Geld zurück.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mt-16 grid gap-10 border-y border-white/[0.06] py-12 sm:grid-cols-3"
        >
          <div className="flex flex-col gap-2">
            <span className="text-5xl font-semibold tracking-tight text-mint">
              <Counter value={100} suffix="%" />
            </span>
            <span className="text-sm text-frost/55">
              Ihrer Forderung bei Erfolg, die Gebühren trägt der Schuldner
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-5xl font-semibold tracking-tight">
              <Counter value={0} suffix=" €" />
            </span>
            <span className="text-sm text-frost/55">
              Vorkosten und Grundgebühren für Gläubiger
            </span>
          </div>
          <div className="flex flex-col items-start gap-3">
            <span className="rounded-xl bg-frost px-4 py-2.5">
              <Image
                src="/media/schufa-badge.png"
                alt="SCHUFA"
                width={110}
                height={21}
                className="h-[20px] w-auto"
              />
            </span>
            <span className="text-sm text-frost/55">
              Offizieller SCHUFA-Vertragspartner
            </span>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col justify-between gap-6 rounded-3xl border border-white/[0.07] bg-surface/50 p-6"
            >
              <blockquote className="text-[14.5px] font-light leading-relaxed text-frost/75">
                &bdquo;{t.quote}&ldquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="flex flex-col">
                  <span className="text-[13px] font-medium text-frost/90">{t.name}</span>
                  <span className="text-[11.5px] text-mint" aria-label="5 von 5 Sternen">
                    ★★★★★
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

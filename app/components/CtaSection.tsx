"use client";

import { motion } from "framer-motion";
import { ArrowRight, EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { getDict, type Locale } from "@/content/locales";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function CtaSection({ locale = "de" }: { locale?: Locale }) {
  const t = getDict(locale).ctaSection;
  return (
    <section id="kontakt" className="relative overflow-hidden py-32 sm:py-44">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[10%] top-[15%] h-[420px] w-[420px] animate-drift rounded-full bg-mint/[0.08] blur-3xl" />
        <div className="absolute bottom-[10%] right-[8%] h-[380px] w-[380px] animate-drift-slow rounded-full bg-navy2/50 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center"
      >
        <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          {t.title}
        </h2>
        <p className="max-w-md text-lg font-light leading-relaxed text-frost/60">
          {t.lead}
        </p>

        <a
          href="mailto:info@fortis-inkasso.de"
          className="inline-flex items-center gap-2 rounded-full bg-mint px-8 py-4 text-[16px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98]"
        >
          {t.button} <ArrowRight size={18} weight="bold" />
        </a>

        <div className="mt-2 flex flex-col items-center gap-2 text-[14px] text-frost/50 sm:flex-row sm:gap-8">
          <a
            href="tel:+4921115856110"
            className="flex items-center gap-2 transition-colors hover:text-frost"
          >
            <Phone size={16} /> +49 211 15856110
          </a>
          <a
            href="mailto:info@fortis-inkasso.de"
            className="flex items-center gap-2 transition-colors hover:text-frost"
          >
            <EnvelopeSimple size={16} /> info@fortis-inkasso.de
          </a>
        </div>
      </motion.div>
    </section>
  );
}

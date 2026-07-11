"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  CurrencyEur,
  FileText,
  Phone,
  QrCode,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Counter } from "@/components/Counter";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const events = [
  { icon: WhatsappLogo, label: "WhatsApp zugestellt", meta: "Müller GmbH", color: "#25d366" },
  { icon: QrCode, label: "QR-Code geöffnet", meta: "115,95 €", color: "#06d6a0" },
  { icon: CurrencyEur, label: "Teilzahlung eingegangen", meta: "Auto Weber KG", color: "#06d6a0" },
  { icon: CheckCircle, label: "Fall abgeschlossen", meta: "4.220 € ausgezahlt", color: "#06d6a0" },
  { icon: FileText, label: "Neue Forderung eingereicht", meta: "Praxis Dr. Meier", color: "#8fa3c8" },
  { icon: Phone, label: "Rückruf vereinbart", meta: "Nordwind Logistik", color: "#8fa3c8" },
];

const VISIBLE = 4;

export function Hero() {
  const reduce = useReducedMotion();
  // Startzustand deterministisch halten (SSR = Client), erst danach rotieren
  const [head, setHead] = useState(VISIBLE - 1);

  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setHead((h) => h + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [reduce]);

  const visible = Array.from({ length: VISIBLE }, (_, i) => {
    const idx = (((head - i) % events.length) + events.length) % events.length;
    return { ...events[idx], key: head - i };
  });

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/media/hero-video-web.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink" />
      <div className="pointer-events-none absolute -top-40 right-[-15%] h-[640px] w-[640px] animate-drift rounded-full bg-mint/[0.07] blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-6 pb-28 pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
        >
          <div className="flex flex-col items-start gap-7">
            <motion.span
              variants={fadeUp}
              className="text-[13px] font-medium tracking-wide text-frost/50"
            >
              Forderungsmanagement auf Erfolgsbasis
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-[46px] font-bold leading-[1.04] tracking-[-0.035em] sm:text-[62px] lg:text-[72px]"
            >
              Ihr Geld.
              <br />
              <span className="text-mint">Sicher zurück.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-md text-[17px] font-light leading-relaxed text-frost/65"
            >
              Fortis treibt Ihre offenen Forderungen ein. Kostenlos für Sie,
              wir verdienen nur bei Erfolg.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5">
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-mint px-7 py-3.5 text-[15px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98]"
              >
                Forderung einreichen <ArrowRight size={17} weight="bold" />
              </a>
              <a
                href="#ablauf"
                className="group inline-flex items-center gap-1 text-[15px] font-medium text-frost/80 transition-colors hover:text-frost"
              >
                So funktioniert&apos;s
                <span className="transition-transform group-hover:translate-x-0.5">›</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="relative mx-auto w-full max-w-sm rounded-3xl border border-white/[0.10] bg-white/[0.05] p-6 backdrop-blur-2xl"
          >
            <div className="mb-5 flex items-center gap-2.5 text-sm font-medium text-frost/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Live-Aktivität
            </div>

            <div className="flex flex-col gap-1">
              <AnimatePresence initial={false} mode="popLayout">
                {visible.map((event) => (
                  <motion.div
                    key={event.key}
                    layout
                    initial={{ opacity: 0, y: -14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 rounded-2xl px-3 py-3"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]"
                      style={{ color: event.color }}
                    >
                      <event.icon size={18} weight="fill" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[13.5px] font-medium text-frost/90">
                        {event.label}
                      </span>
                      <span className="text-[12px] text-frost/45">{event.meta}</span>
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/[0.07]">
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-4 px-6 py-7 text-center">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
              <Counter value={2847} />
            </span>
            <span className="text-xs text-frost/50">Forderungen 2026</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
              <Counter value={98} suffix="%" />
            </span>
            <span className="text-xs text-frost/50">Erfolgsquote</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
              <Counter value={0} suffix=" €" />
            </span>
            <span className="text-xs text-frost/50">Vorkosten für Sie</span>
          </div>
        </div>
      </div>
    </section>
  );
}

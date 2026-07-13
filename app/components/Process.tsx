"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import {
  CheckCircle,
  EnvelopeSimple,
  Phone,
  QrCode,
  Scales,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Counter } from "@/components/Counter";
import { getDict, type Locale, type Dict } from "@/content/locales";

type ProcessDict = Dict["process"];

const channelIcons = [WhatsappLogo, QrCode, Phone, EnvelopeSimple];
const channelColors = ["#25d366", "#06d6a0", "#8fa3c8", "#8fa3c8"];

function StageVisual({ stage, t }: { stage: number; t: ProcessDict }) {
  if (stage === 0) {
    return (
      <div className="flex w-full max-w-[300px] flex-col gap-3">
        {t.visualLines.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}
            className="rounded-xl border border-line/[0.08] bg-line/[0.04] px-4 py-3 text-[13px] text-frost/70"
          >
            {line}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="mt-1 rounded-full bg-mint py-3 text-center text-[13px] font-semibold text-navy"
        >
          {t.submit}
        </motion.div>
      </div>
    );
  }

  if (stage === 1) {
    return (
      <div className="flex flex-col items-center gap-5">
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex h-24 w-24 items-center justify-center rounded-full border border-mint/30 bg-mint/[0.08] text-mint"
        >
          <span className="absolute inset-0 animate-ping rounded-full border border-mint/20" />
          <Scales size={40} weight="light" />
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-frost/60"
        >
          {t.serving}
        </motion.p>
      </div>
    );
  }

  if (stage === 2) {
    return (
      <div className="grid w-full max-w-[300px] grid-cols-2 gap-3">
        {t.channels.map((label, i) => {
          const Icon = channelIcons[i];
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.1, duration: 0.4 }}
              className="flex flex-col items-center gap-2 rounded-2xl border border-line/[0.08] bg-line/[0.04] py-5"
            >
              <span style={{ color: channelColors[i] }}>
                <Icon size={26} weight="fill" />
              </span>
              <span className="text-[12px] text-frost/70">{label}</span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="text-mint"
      >
        <CheckCircle size={44} weight="fill" />
      </motion.span>
      <span className="text-[40px] font-semibold tracking-tight text-frost">
        <Counter value={4320} suffix=" €" duration={1.2} />
      </span>
      <span className="text-sm text-frost/55">{t.payout}</span>
    </div>
  );
}

function StageText({ stage, t }: { stage: number; t: ProcessDict }) {
  const s = t.stages[stage];
  return (
    <div className="flex flex-col items-start gap-4">
      <span className="rounded-full border border-mint/25 bg-mint/[0.08] px-3 py-1 text-[12px] font-medium text-mint">
        {s.badge}
      </span>
      <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.title}</h3>
      <p className="max-w-sm text-[16px] font-light leading-relaxed text-frost/60">
        {s.body}
      </p>
    </div>
  );
}

export function Process({ locale = "de" }: { locale?: Locale }) {
  const t = getDict(locale).process;
  const stages = t.stages;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStage(Math.min(stages.length - 1, Math.floor(v * stages.length)));
  });

  const pinned = !reduce;

  return (
    <section id="ablauf" ref={ref} className={pinned ? "relative h-[400vh]" : ""}>
      {pinned ? (
        <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="mb-12 text-[13px] font-medium tracking-wide text-frost/40">
              {t.heading}
            </p>

            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div className="relative flex items-start gap-8">
                <div className="mt-1 hidden flex-col gap-2 sm:flex" aria-hidden>
                  {stages.map((_, i) => (
                    <span
                      key={i}
                      className={`h-9 w-[3px] rounded-full transition-colors duration-500 ${
                        i <= stage ? "bg-mint" : "bg-line/[0.10]"
                      }`}
                    />
                  ))}
                </div>
                <div className="min-h-[220px] flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={stage}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <StageText stage={stage} t={t} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex min-h-[340px] items-center justify-center rounded-3xl border border-line/[0.07] bg-surface/60 p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex w-full items-center justify-center"
                  >
                    <StageVisual stage={stage} t={t} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-6 py-28">
          <p className="mb-12 text-[13px] font-medium tracking-wide text-frost/40">
            {t.heading}
          </p>
          <div className="flex flex-col gap-20">
            {stages.map((_, i) => (
              <div key={i} className="grid items-center gap-10 md:grid-cols-2">
                <StageText stage={i} t={t} />
                <div className="flex min-h-[280px] items-center justify-center rounded-3xl border border-line/[0.07] bg-surface/60 p-8">
                  <StageVisual stage={i} t={t} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

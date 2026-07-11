"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  HouseLine,
  QrCode,
  Scales,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { getDict, type Locale, type Dict } from "@/content/locales";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function WhatsAppDemo({ t }: { t: Dict["channels"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const show = inView || reduce;

  const bubble = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10, scale: 0.96 },
          animate: show ? { opacity: 1, y: 0, scale: 1 } : {},
          transition: { delay, duration: 0.4, ease: "easeOut" as const },
        };

  return (
    <div ref={ref} className="flex w-full max-w-[320px] flex-col gap-2.5">
      <motion.div
        {...bubble(0.2)}
        className="max-w-[90%] self-start rounded-2xl rounded-tl-md border border-white/[0.08] bg-white/[0.06] p-3.5 text-[13px] leading-snug text-frost/85"
      >
        {t.waMsg1}
        <span className="mt-2 block rounded-lg bg-mint/10 px-3 py-2 text-[12px] text-mint">
          fortis-portal.de/pay/468789164
        </span>
      </motion.div>
      <motion.div
        {...bubble(1.1)}
        className="max-w-[70%] self-end rounded-2xl rounded-tr-md bg-wa/[0.16] p-3.5 text-[13px] text-frost/90"
      >
        {t.waMsg2}
      </motion.div>
      <motion.div
        {...bubble(1.8)}
        className="max-w-[70%] self-start rounded-2xl rounded-tl-md border border-white/[0.08] bg-white/[0.06] p-3.5 text-[13px] text-frost/85"
      >
        {t.waMsg3}
      </motion.div>
    </div>
  );
}

export function Channels({ locale = "de" }: { locale?: Locale }) {
  const t = getDict(locale).channels;
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="mb-14 flex max-w-2xl flex-col gap-5"
        >
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {t.title}
          </h2>
          <p className="text-lg font-light leading-relaxed text-frost/60">
            {t.lead}
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="flex flex-col gap-8 rounded-3xl border border-white/[0.07] bg-surface/70 p-8 md:col-span-2 md:flex-row md:items-center md:justify-between md:p-10"
          >
            <div className="flex max-w-xs flex-col gap-3">
              <span className="text-wa">
                <WhatsappLogo size={30} weight="fill" />
              </span>
              <h3 className="text-2xl font-semibold tracking-tight">
                {t.waTitle}
              </h3>
              <p className="text-[15px] font-light leading-relaxed text-frost/60">
                {t.waBody}
              </p>
            </div>
            <WhatsAppDemo t={t} />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ delay: 0.08 }}
            className="flex flex-col justify-between gap-10 rounded-3xl border border-mint/20 bg-gradient-to-b from-mint/[0.10] to-transparent p-8"
          >
            <span className="text-mint">
              <QrCode size={30} weight="regular" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold tracking-tight">{t.qrTitle}</h3>
              <p className="text-[14px] font-light leading-relaxed text-frost/60">
                {t.qrBody}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-3xl border border-white/[0.07] p-8 md:col-span-2"
          >
            <Image
              src="/media/building.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
            <div className="relative flex flex-col gap-2">
              <span className="text-frost/80">
                <HouseLine size={28} weight="light" />
              </span>
              <h3 className="text-xl font-semibold tracking-tight">
                {t.phoneTitle}
              </h3>
              <p className="max-w-md text-[14px] font-light leading-relaxed text-frost/60">
                {t.phoneBody}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ delay: 0.08 }}
            className="flex flex-col justify-between gap-10 rounded-3xl border border-white/[0.07] bg-surface/70 p-8"
          >
            <span className="text-frost/80">
              <Scales size={30} weight="light" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold tracking-tight">
                {t.lawTitle}
              </h3>
              <p className="text-[14px] font-light leading-relaxed text-frost/60">
                {t.lawBody}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

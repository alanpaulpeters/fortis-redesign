"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Counter } from "@/components/Counter";
import { getDict, type Locale } from "@/content/locales";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const testimonialMeta = [
  { name: "Natalie A.", avatar: "/media/avatar-natalie.jpg" },
  { name: "Daniel N.", avatar: "/media/avatar-daniel.jpg" },
  { name: "Moritz S.", avatar: "/media/avatar-moritz.jpg" },
  { name: "Vilja W.", avatar: "/media/avatar-vilja.jpg" },
];

export function Trust({ locale = "de" }: { locale?: Locale }) {
  const t = getDict(locale).trust;
  const testimonials = testimonialMeta.map((m, i) => ({
    ...m,
    quote: t.testimonials[i],
  }));
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
            {t.title}
          </h2>
          <p className="text-lg font-light leading-relaxed text-frost/60">
            {t.lead}
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
            <span className="text-sm text-frost/55">{t.stat1}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-5xl font-semibold tracking-tight">
              <Counter value={0} suffix=" €" />
            </span>
            <span className="text-sm text-frost/55">{t.stat2}</span>
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
            <span className="text-sm text-frost/55">{t.stat3}</span>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item, i) => (
            <motion.figure
              key={item.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col justify-between gap-6 rounded-3xl border border-white/[0.07] bg-surface/50 p-6"
            >
              <blockquote className="text-[14.5px] font-light leading-relaxed text-frost/75">
                &bdquo;{item.quote}&ldquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <Image
                  src={item.avatar}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="flex flex-col">
                  <span className="text-[13px] font-medium text-frost/90">{item.name}</span>
                  <span className="text-[11.5px] text-mint" aria-label={t.stars}>
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

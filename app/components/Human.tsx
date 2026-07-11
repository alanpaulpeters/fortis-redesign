"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Human() {
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="relative order-2 lg:order-1"
        >
          <div className="pointer-events-none absolute -inset-8 -z-10 animate-drift-slow rounded-full bg-mint/[0.06] blur-3xl" />
          <Image
            src="/media/office-photo.jpg"
            alt="Das Fortis-Team im Gespräch"
            width={880}
            height={660}
            className="rounded-3xl border border-white/[0.07] object-cover"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="order-1 flex flex-col items-start gap-6 lg:order-2"
        >
          <h2 className="max-w-md text-4xl font-semibold tracking-tight sm:text-5xl">
            Hinter jedem Fall steht ein Mensch.
          </h2>
          <p className="max-w-md text-lg font-light leading-relaxed text-frost/60">
            Bei uns landen Sie nicht in der Warteschleife. Ein festes Team
            kennt Ihren Fall, ist telefonisch erreichbar und kommt nach
            Abstimmung auch persönlich vorbei.
          </p>
          <a
            href="#kontakt"
            className="group inline-flex items-center gap-1 text-[15px] font-medium text-mint transition-opacity hover:opacity-80"
          >
            Beratungsgespräch vereinbaren
            <span className="transition-transform group-hover:translate-x-0.5">›</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { getDict, type Locale } from "@/content/locales";

export function Services({ locale = "de" }: { locale?: Locale }) {
  const services = getDict(locale).services.items;
  return (
    <section id="leistungen" className="border-t border-white/[0.06] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col divide-y divide-white/[0.06]">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-3 py-9 md:grid-cols-[280px_1fr] md:gap-12"
            >
              <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
              <p className="max-w-xl text-[15px] font-light leading-relaxed text-frost/55">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

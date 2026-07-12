"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import type { FaqItem } from "@/content/faqs";

export type { FaqItem };

export function Faq({
  items,
  title,
}: {
  items: FaqItem[];
  title: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-white/[0.06] py-28 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-12 text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h2>

        <div className="flex flex-col divide-y divide-white/[0.07]">
          {items.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[16px] font-medium text-frost/90">
                    {faq.question}
                  </span>
                  <CaretDown
                    size={18}
                    className={`shrink-0 text-frost/40 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-[15px] font-light leading-relaxed text-frost/60">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

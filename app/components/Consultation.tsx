"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CALENDLY_EMBED_URL } from "@/lib/site";

const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

type Calendly = {
  initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
};

declare global {
  interface Window {
    Calendly?: Calendly;
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Consultation() {
  const t = useTranslations("consultation");
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function initWidget() {
      const el = widgetRef.current;
      if (!el || !window.Calendly || el.querySelector("iframe")) return;
      window.Calendly.initInlineWidget({ url: CALENDLY_EMBED_URL, parentElement: el });
    }

    if (window.Calendly) {
      initWidget();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGET_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", initWidget);
      return () => existing.removeEventListener("load", initWidget);
    }

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.addEventListener("load", initWidget);
    document.body.appendChild(script);
  }, []);

  return (
    <section id="beratung" className="py-28 sm:py-36">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center"
      >
        <p className="rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-[12px] font-medium uppercase tracking-widest text-mint">
          {t("eyebrow")}
        </p>
        <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {t("heading")}
        </h2>
        <p className="max-w-md text-lg font-light leading-relaxed text-frost/60">
          {t("lead")}
        </p>

        <div
          ref={widgetRef}
          className="mt-8 w-full overflow-hidden rounded-[20px] border border-white/[0.07]"
          style={{ minWidth: "100%", height: 600 }}
        />
      </motion.div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { List, X, Globe, CaretDown } from "@phosphor-icons/react/dist/ssr";
import {
  getDict,
  localePrefix,
  translatedPaths,
  type Locale,
} from "@/content/locales";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Basis-Pfad ohne Sprachpräfix ermitteln
  let base = pathname;
  for (const prefix of ["/en", "/es"]) {
    if (base === prefix) base = "/";
    else if (base.startsWith(`${prefix}/`)) base = base.slice(prefix.length);
  }
  const hasTranslation = translatedPaths.includes(base);

  function target(code: Locale) {
    if (code === "de") return hasTranslation ? base : "/";
    const path = hasTranslation ? base : "/";
    return `${localePrefix[code]}${path === "/" ? "" : path}` || localePrefix[code];
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Sprache wählen / Choose language"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] font-medium text-frost/60 transition-colors hover:text-frost"
      >
        <Globe size={16} />
        <span className="uppercase">{locale}</span>
        <CaretDown size={10} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-10 w-40 rounded-2xl border border-line/[0.1] bg-surface p-1.5 shadow-2xl">
          {languages.map((lang) => (
            <a
              key={lang.code}
              href={target(lang.code)}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] transition-colors hover:bg-line/[0.05] ${
                lang.code === locale ? "text-mint" : "text-frost/75"
              }`}
            >
              <span>{lang.flag}</span> {lang.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function Nav({ locale = "de" }: { locale?: Locale }) {
  const t = getDict(locale).nav;
  const home = localePrefix[locale] || "/";
  const kontakt = `${localePrefix[locale]}/kontakt`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          className={`flex h-[52px] w-full max-w-[980px] items-center justify-between rounded-2xl border px-5 backdrop-blur-2xl transition-colors duration-300 ${
            scrolled
              ? "border-line/[0.08] bg-surface/85"
              : "border-line/[0.10] bg-line/[0.05]"
          }`}
        >
          <Link href={home} aria-label="Fortis" className="flex items-center">
            <Logo priority />
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {t.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-medium text-frost/60 transition-colors hover:text-frost"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <div className="hidden lg:block">
              <LanguageSwitcher locale={locale} />
            </div>
            <a
              href={kontakt}
              className="hidden rounded-full bg-mint px-5 py-2 text-[13px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98] lg:inline-flex"
            >
              {t.cta}
            </a>
            <button
              type="button"
              aria-label={t.menuOpen}
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center text-frost lg:hidden"
            >
              <List size={22} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink px-8 py-8 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                aria-label={t.menuClose}
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center text-frost"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mt-14 flex flex-1 flex-col items-start gap-6">
              {t.links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: "easeOut" }}
                  className="text-2xl font-semibold text-frost"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="mt-2">
                <LanguageSwitcher locale={locale} />
              </div>
            </div>

            <a
              href={kontakt}
              onClick={() => setOpen(false)}
              className="w-full rounded-full bg-mint px-5 py-3.5 text-center text-[15px] font-semibold text-navy"
            >
              {t.cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

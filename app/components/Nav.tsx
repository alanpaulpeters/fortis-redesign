"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { List, X } from "@phosphor-icons/react/dist/ssr";

const links = [
  { name: "Inkassobeauftragung", href: "/inkassobeauftragung" },
  { name: "Mahnbescheid", href: "/mahnbescheid" },
  { name: "Auslandsinkasso", href: "/auslandsinkasso" },
  { name: "Schuldner", href: "/schuldner" },
  { name: "Blog", href: "/blog" },
  { name: "Login", href: "/portal" },
];

export function Nav() {
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
          className={`flex h-[52px] w-full max-w-[920px] items-center justify-between rounded-2xl border px-5 backdrop-blur-2xl transition-colors duration-300 ${
            scrolled
              ? "border-white/[0.08] bg-surface/85"
              : "border-white/[0.10] bg-white/[0.05]"
          }`}
        >
          <Link href="/" aria-label="Fortis Startseite" className="flex items-center">
            <Image
              src="/media/logo-white.png"
              alt="Fortis"
              width={92}
              height={26}
              priority
              className="h-[22px] w-auto"
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-medium text-frost/60 transition-colors hover:text-frost"
              >
                {link.name}
              </a>
            ))}
          </div>

          <a
            href="/kontakt"
            className="hidden rounded-full bg-mint px-5 py-2 text-[13px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98] lg:inline-flex"
          >
            Forderung einreichen
          </a>

          <button
            type="button"
            aria-label="Menü öffnen"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center text-frost lg:hidden"
          >
            <List size={22} />
          </button>
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
              <Image
                src="/media/logo-white.png"
                alt="Fortis"
                width={92}
                height={26}
                className="h-[22px] w-auto"
              />
              <button
                type="button"
                aria-label="Menü schließen"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center text-frost"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mt-16 flex flex-1 flex-col items-start gap-7">
              {links.map((link, i) => (
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
            </div>

            <a
              href="/kontakt"
              onClick={() => setOpen(false)}
              className="w-full rounded-full bg-mint px-5 py-3.5 text-center text-[15px] font-semibold text-navy"
            >
              Forderung einreichen
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

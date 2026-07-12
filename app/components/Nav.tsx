"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { List, X, CaretDown, Globe } from "@phosphor-icons/react/dist/ssr";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeNames, type Locale } from "@/i18n/routing";
import { CALENDLY_URL } from "@/lib/site";

type NavItem = { name: string; href: string };

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  const homeItems: NavItem[] = [
    { name: t("glaeubiger"), href: "/" },
    { name: t("schuldner"), href: "/schuldner" },
  ];

  const leistungenItems: NavItem[] = [
    { name: t("inkassobeauftragung"), href: "/inkassobeauftragung" },
    { name: t("mahnbescheid"), href: "/mahnbescheid" },
    { name: t("auslandsinkasso"), href: "/auslandsinkasso" },
  ];

  function switchLocale(next: Locale) {
    router.replace(pathname, { locale: next });
    setActiveDropdown(null);
    setOpen(false);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          className={`flex h-[60px] w-full max-w-[1040px] items-center justify-between rounded-2xl border px-5 backdrop-blur-2xl transition-colors duration-300 ${
            scrolled
              ? "border-white/[0.08] bg-surface/85"
              : "border-white/[0.10] bg-white/[0.05]"
          }`}
        >
          <Link
            href="/"
            aria-label={t("homeAria")}
            className="flex items-center"
          >
            <Image
              src="/media/logo-white.png"
              alt="Fortis"
              width={126}
              height={36}
              priority
              className="h-[30px] w-auto"
            />
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            <Dropdown
              label={t("home")}
              items={homeItems}
              isOpen={activeDropdown === "Home"}
              onOpen={() => setActiveDropdown("Home")}
              onClose={() => setActiveDropdown(null)}
            />
            <Dropdown
              label={t("leistungen")}
              items={leistungenItems}
              isOpen={activeDropdown === "Leistungen"}
              onOpen={() => setActiveDropdown("Leistungen")}
              onClose={() => setActiveDropdown(null)}
            />
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-frost/60 transition-colors hover:text-frost"
            >
              {t("beratung")}
            </a>
            <Link
              href="/kontakt"
              className="text-[13px] font-medium text-frost/60 transition-colors hover:text-frost"
            >
              {t("kontakt")}
            </Link>
            <LanguageDropdown
              current={locale as Locale}
              isOpen={activeDropdown === "Language"}
              onOpen={() => setActiveDropdown("Language")}
              onClose={() => setActiveDropdown(null)}
              onSelect={switchLocale}
            />
          </div>

          <Link
            href="https://fortis-portal.de/"
            target="_blank"
            className="hidden rounded-full bg-mint px-5 py-2 text-[13px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98] lg:inline-flex"
          >
            {t("login")}
          </Link>

          <button
            type="button"
            aria-label={t("openMenu")}
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
                width={126}
                height={36}
                className="h-[30px] w-auto"
              />
              <button
                type="button"
                aria-label={t("closeMenu")}
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center text-frost"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mt-14 flex flex-1 flex-col items-start gap-8 overflow-y-auto">
              <MobileGroup
                label={t("home")}
                items={homeItems}
                delay={0}
                onNavigate={() => setOpen(false)}
              />
              <MobileGroup
                label={t("leistungen")}
                items={leistungenItems}
                delay={0.05}
                onNavigate={() => setOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
              >
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold text-frost"
                >
                  {t("beratung")}
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125, duration: 0.35, ease: "easeOut" }}
              >
                <Link
                  href="/kontakt"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold text-frost"
                >
                  {t("kontakt")}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35, ease: "easeOut" }}
                className="flex flex-col gap-4"
              >
                <span className="text-2xl font-semibold text-frost">
                  {localeNames[locale as Locale]}
                </span>
                <div className="flex flex-col gap-3 pl-4">
                  {routing.locales.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => switchLocale(loc)}
                      className={`text-left text-lg font-medium transition-colors hover:text-frost ${
                        loc === locale ? "text-mint" : "text-frost/60"
                      }`}
                    >
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            <Link
              href="https://fortis-portal.de/"
              onClick={() => setOpen(false)}
              className="w-full rounded-full bg-mint px-5 py-3.5 text-center text-[15px] font-semibold text-navy"
            >
              {t("login")}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Dropdown({
  label,
  items,
  isOpen,
  onOpen,
  onClose,
}: {
  label: string;
  items: NavItem[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => (isOpen ? onClose() : onOpen())}
        className="flex items-center gap-1.5 text-[13px] font-medium text-frost/60 transition-colors hover:text-frost"
      >
        {label}
        <CaretDown
          size={12}
          weight="bold"
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
          >
            <div className="flex min-w-[190px] flex-col rounded-xl border border-white/[0.08] bg-surface/95 p-1.5 shadow-2xl backdrop-blur-2xl">
              {items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="rounded-lg px-3.5 py-2.5 text-[13px] font-medium text-frost/70 transition-colors hover:bg-white/[0.06] hover:text-frost"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LanguageDropdown({
  current,
  isOpen,
  onOpen,
  onClose,
  onSelect,
}: {
  current: Locale;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (locale: Locale) => void;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => (isOpen ? onClose() : onOpen())}
        className="flex items-center gap-1.5 text-[13px] font-medium text-frost/60 transition-colors hover:text-frost"
      >
        <Globe size={15} weight="regular" />
        {localeNames[current]}
        <CaretDown
          size={12}
          weight="bold"
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
          >
            <div className="flex min-w-[160px] flex-col rounded-xl border border-white/[0.08] bg-surface/95 p-1.5 shadow-2xl backdrop-blur-2xl">
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => onSelect(loc)}
                  className={`rounded-lg px-3.5 py-2.5 text-left text-[13px] font-medium transition-colors hover:bg-white/[0.06] hover:text-frost ${
                    loc === current ? "text-mint" : "text-frost/70"
                  }`}
                >
                  {localeNames[loc]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileGroup({
  label,
  items,
  delay,
  onNavigate,
}: {
  label: string;
  items: NavItem[];
  delay: number;
  onNavigate: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      <span className="text-2xl font-semibold text-frost">{label}</span>
      <div className="flex flex-col gap-3 pl-4">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={onNavigate}
            className="text-lg font-medium text-frost/60 transition-colors hover:text-frost"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

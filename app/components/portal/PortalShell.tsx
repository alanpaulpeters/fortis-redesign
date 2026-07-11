"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  MagnifyingGlass,
  CaretDown,
  SignOut,
  GearSix,
  UserCircle,
  Globe,
  ChatCircleDots,
  Sun,
  MoonStars,
} from "@phosphor-icons/react/dist/ssr";
import { demoUser, demoNotifications, demoConversations } from "@/content/portal-demo";
import { ThemeProvider, useTheme } from "@/components/portal/theme";

const tabs = [
  { name: "Forderungen", href: "/portal" },
  { name: "Forderungsbestand", href: "/portal/bestand" },
  { name: "Inbox", href: "/portal/inbox" },
  { name: "Einstellungen", href: "/portal/einstellungen" },
];

const dropdownMotion = {
  initial: { opacity: 0, y: -6, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -4, scale: 0.98 },
  transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const },
};

function useClickOutside(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      aria-label={theme === "light" ? "Dunkles Design" : "Helles Design"}
      onClick={toggle}
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-ptext/60 transition-colors hover:bg-pline/[0.06] hover:text-ptext"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex"
        >
          {theme === "light" ? <MoonStars size={19} /> : <Sun size={19} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [bellOpen, setBellOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [read, setRead] = useState<number[]>([]);

  const bellRef = useClickOutside(() => setBellOpen(false));
  const userRef = useClickOutside(() => setUserOpen(false));

  const unreadCount = demoNotifications.filter(
    (n) => n.unread && !read.includes(n.id)
  ).length;
  const inboxUnread = demoConversations.reduce((s, c) => s + c.unread, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-pline/10 bg-pcard/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
          <Link
            href="/portal"
            aria-label="Portal-Startseite"
            className="shrink-0 transition-transform active:scale-95"
          >
            <Image
              src="/media/logo-white.png"
              alt="Fortis"
              width={92}
              height={26}
              priority
              className="h-[20px] w-auto [.portal:not(.dark)_&]:invert"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {tabs.map((tab) => {
              const active =
                tab.href === "/portal"
                  ? pathname === "/portal"
                  : pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                    active ? "text-ptext" : "text-ptext/55 hover:text-ptext"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="portal-tab"
                      className="absolute inset-0 rounded-full bg-pline/[0.07]"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{tab.name}</span>
                  {tab.name === "Inbox" && inboxUnread > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-mint px-1 text-[10px] font-bold text-navy">
                      {inboxUnread}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <div className="relative hidden lg:block">
              <MagnifyingGlass
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ptext/40"
              />
              <input
                placeholder="Suchen…"
                aria-label="Suchen"
                className="h-9 w-44 rounded-full border border-pline/15 bg-pline/[0.03] pl-9 pr-4 text-[13px] text-ptext transition-all duration-300 placeholder:text-ptext/35 focus:w-56 focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/20"
              />
            </div>

            <ThemeToggle />

            <Link
              href="/portal/inbox"
              aria-label="Inbox"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-ptext/60 transition-colors hover:bg-pline/[0.06] hover:text-ptext md:hidden"
            >
              <ChatCircleDots size={19} />
            </Link>

            <div className="relative" ref={bellRef}>
              <button
                type="button"
                aria-label="Benachrichtigungen"
                aria-expanded={bellOpen}
                onClick={() => setBellOpen(!bellOpen)}
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-ptext/60 transition-colors hover:bg-pline/[0.06] hover:text-ptext"
              >
                <Bell size={19} />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                    className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-mint px-1 text-[10px] font-bold text-navy"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </button>

              <AnimatePresence>
                {bellOpen && (
                  <motion.div
                    {...dropdownMotion}
                    className="p-card absolute right-0 top-12 w-[340px] rounded-2xl border border-pline/10 bg-pcard p-2"
                  >
                    <div className="flex items-center justify-between px-3 py-2">
                      <p className="text-[14px] font-semibold text-ptext">
                        Benachrichtigungen
                      </p>
                      <button
                        type="button"
                        onClick={() => setRead(demoNotifications.map((n) => n.id))}
                        className="text-[12px] text-mint2 transition-opacity hover:opacity-70"
                      >
                        Alle als gelesen markieren
                      </button>
                    </div>
                    <div className="flex max-h-[380px] flex-col overflow-y-auto">
                      {demoNotifications.map((n, i) => {
                        const isUnread = n.unread && !read.includes(n.id);
                        return (
                          <motion.button
                            type="button"
                            key={n.id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.04 * i, duration: 0.25 }}
                            onClick={() => setRead((r) => [...r, n.id])}
                            className="flex gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-pline/[0.04]"
                          >
                            <span
                              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full transition-colors ${
                                isUnread ? "bg-mint" : "bg-pline/20"
                              }`}
                            />
                            <span>
                              <span className="block text-[13px] font-medium text-ptext/90">
                                {n.title}
                              </span>
                              <span className="block text-[12px] font-light leading-snug text-ptext/55">
                                {n.text}
                              </span>
                              <span className="mt-0.5 block text-[11px] text-ptext/35">
                                {n.time}
                              </span>
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative" ref={userRef}>
              <button
                type="button"
                aria-label="Benutzermenü"
                aria-expanded={userOpen}
                onClick={() => setUserOpen(!userOpen)}
                className="flex items-center gap-2 rounded-full border border-pline/15 bg-pline/[0.03] py-1 pl-1 pr-2.5 transition-all hover:border-pline/25 active:scale-95"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint/15 text-[11px] font-bold text-mint2">
                  {demoUser.initials}
                </span>
                <CaretDown
                  size={12}
                  className={`text-ptext/50 transition-transform duration-200 ${userOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {userOpen && (
                  <motion.div
                    {...dropdownMotion}
                    className="p-card absolute right-0 top-12 w-64 rounded-2xl border border-pline/10 bg-pcard p-2"
                  >
                    <div className="flex items-center gap-3 px-3 py-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint/15 text-[12px] font-bold text-mint2">
                        {demoUser.initials}
                      </span>
                      <div>
                        <p className="text-[13px] font-semibold text-ptext">
                          {demoUser.name}{" "}
                          <span className="ml-1 rounded-full bg-mint/10 px-2 py-0.5 text-[10px] font-medium text-mint2">
                            {demoUser.role}
                          </span>
                        </p>
                        <p className="text-[12px] text-ptext/50">{demoUser.email}</p>
                      </div>
                    </div>
                    <div className="my-1 h-px bg-pline/10" />
                    {[
                      { icon: UserCircle, label: "Mein Profil", href: "/portal/einstellungen" },
                      { icon: GearSix, label: "Einstellungen", href: "/portal/einstellungen" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setUserOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] text-ptext/75 transition-colors hover:bg-pline/[0.04] hover:text-ptext"
                      >
                        <item.icon size={17} /> {item.label}
                      </Link>
                    ))}
                    <div className="flex items-center justify-between rounded-xl px-3 py-2 text-[13px] text-ptext/75">
                      <span className="flex items-center gap-3">
                        <Globe size={17} /> Sprache
                      </span>
                      <span className="text-ptext/45">Deutsch 🇩🇪</span>
                    </div>
                    <div className="my-1 h-px bg-pline/10" />
                    <Link
                      href="/"
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] text-ptext/75 transition-colors hover:bg-pline/[0.04] hover:text-ptext"
                    >
                      <SignOut size={17} /> Abmelden
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto border-t border-pline/[0.06] px-4 py-2 md:hidden">
          {tabs.map((tab) => {
            const active =
              tab.href === "/portal"
                ? pathname === "/portal"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-medium ${
                  active ? "bg-pline/[0.07] text-ptext" : "text-ptext/55"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </header>

      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-7xl flex-1 px-6 py-10"
      >
        {children}
      </motion.main>

      <footer className="border-t border-pline/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[12px] text-ptext/40">
          <p>© {new Date().getFullYear()} Fortis Inkasso GmbH &amp; Co. KG</p>
          <div className="flex gap-5">
            <Link href="/impressum" className="transition-colors hover:text-ptext">Legal</Link>
            <Link href="/datenschutzerklaerung" className="transition-colors hover:text-ptext">Privatsphäre</Link>
            <Link href="/kontakt" className="transition-colors hover:text-ptext">Kontakt</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PortalShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Shell>{children}</Shell>
    </ThemeProvider>
  );
}

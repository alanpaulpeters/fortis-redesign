"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Bell,
  MagnifyingGlass,
  CaretDown,
  SignOut,
  GearSix,
  UserCircle,
  Globe,
  ChatCircleDots,
} from "@phosphor-icons/react/dist/ssr";
import { demoUser, demoNotifications, demoConversations } from "@/content/portal-demo";

const tabs = [
  { name: "Forderungen", href: "/portal" },
  { name: "Forderungsbestand", href: "/portal/bestand" },
  { name: "Inbox", href: "/portal/inbox" },
  { name: "Einstellungen", href: "/portal/einstellungen" },
];

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

export function PortalShell({ children }: { children: React.ReactNode }) {
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
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
          <Link href="/portal" aria-label="Portal-Startseite" className="shrink-0">
            <Image
              src="/media/logo-white.png"
              alt="Fortis"
              width={92}
              height={26}
              priority
              className="h-[20px] w-auto"
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
                    active
                      ? "bg-white/[0.08] text-frost"
                      : "text-frost/55 hover:text-frost"
                  }`}
                >
                  {tab.name}
                  {tab.name === "Inbox" && inboxUnread > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-mint px-1 text-[10px] font-bold text-navy">
                      {inboxUnread}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden lg:block">
              <MagnifyingGlass
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-frost/40"
              />
              <input
                placeholder="Suchen…"
                aria-label="Suchen"
                className="h-9 w-52 rounded-full border border-white/[0.1] bg-white/[0.04] pl-9 pr-4 text-[13px] text-frost placeholder:text-frost/35 focus:border-mint/60 focus:outline-none"
              />
            </div>

            <Link
              href="/portal/inbox"
              aria-label="Inbox"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-frost/70 transition-colors hover:bg-white/[0.06] hover:text-frost md:hidden"
            >
              <ChatCircleDots size={19} />
            </Link>

            <div className="relative" ref={bellRef}>
              <button
                type="button"
                aria-label="Benachrichtigungen"
                aria-expanded={bellOpen}
                onClick={() => setBellOpen(!bellOpen)}
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-frost/70 transition-colors hover:bg-white/[0.06] hover:text-frost"
              >
                <Bell size={19} />
                {unreadCount > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-mint px-1 text-[10px] font-bold text-navy">
                    {unreadCount}
                  </span>
                )}
              </button>

              {bellOpen && (
                <div className="absolute right-0 top-12 w-[340px] rounded-2xl border border-white/[0.1] bg-surface p-2 shadow-2xl">
                  <div className="flex items-center justify-between px-3 py-2">
                    <p className="text-[14px] font-semibold text-frost">
                      Benachrichtigungen
                    </p>
                    <button
                      type="button"
                      onClick={() => setRead(demoNotifications.map((n) => n.id))}
                      className="text-[12px] text-mint hover:underline"
                    >
                      Alle als gelesen markieren
                    </button>
                  </div>
                  <div className="flex max-h-[380px] flex-col overflow-y-auto">
                    {demoNotifications.map((n) => {
                      const isUnread = n.unread && !read.includes(n.id);
                      return (
                        <button
                          type="button"
                          key={n.id}
                          onClick={() => setRead((r) => [...r, n.id])}
                          className="flex gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/[0.05]"
                        >
                          <span
                            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                              isUnread ? "bg-mint" : "bg-white/[0.12]"
                            }`}
                          />
                          <span>
                            <span className="block text-[13px] font-medium text-frost/90">
                              {n.title}
                            </span>
                            <span className="block text-[12px] font-light leading-snug text-frost/55">
                              {n.text}
                            </span>
                            <span className="mt-0.5 block text-[11px] text-frost/35">
                              {n.time}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={userRef}>
              <button
                type="button"
                aria-label="Benutzermenü"
                aria-expanded={userOpen}
                onClick={() => setUserOpen(!userOpen)}
                className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] py-1 pl-1 pr-2.5 transition-colors hover:bg-white/[0.08]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint/15 text-[11px] font-bold text-mint">
                  {demoUser.initials}
                </span>
                <CaretDown size={12} className="text-frost/50" />
              </button>

              {userOpen && (
                <div className="absolute right-0 top-12 w-64 rounded-2xl border border-white/[0.1] bg-surface p-2 shadow-2xl">
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint/15 text-[12px] font-bold text-mint">
                      {demoUser.initials}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-frost">
                        {demoUser.name}{" "}
                        <span className="ml-1 rounded-full bg-mint/10 px-2 py-0.5 text-[10px] font-medium text-mint">
                          {demoUser.role}
                        </span>
                      </p>
                      <p className="text-[12px] text-frost/50">{demoUser.email}</p>
                    </div>
                  </div>
                  <div className="my-1 h-px bg-white/[0.07]" />
                  {[
                    { icon: UserCircle, label: "Mein Profil", href: "/portal/einstellungen" },
                    { icon: GearSix, label: "Einstellungen", href: "/portal/einstellungen" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] text-frost/75 transition-colors hover:bg-white/[0.05] hover:text-frost"
                    >
                      <item.icon size={17} /> {item.label}
                    </Link>
                  ))}
                  <div className="flex items-center justify-between rounded-xl px-3 py-2 text-[13px] text-frost/75">
                    <span className="flex items-center gap-3">
                      <Globe size={17} /> Sprache
                    </span>
                    <span className="text-frost/45">Deutsch 🇩🇪</span>
                  </div>
                  <div className="my-1 h-px bg-white/[0.07]" />
                  <Link
                    href="/"
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] text-frost/75 transition-colors hover:bg-white/[0.05] hover:text-frost"
                  >
                    <SignOut size={17} /> Abmelden
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto border-t border-white/[0.05] px-4 py-2 md:hidden">
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
                  active ? "bg-white/[0.08] text-frost" : "text-frost/55"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>

      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[12px] text-frost/40">
          <p>© {new Date().getFullYear()} Fortis Inkasso GmbH &amp; Co. KG</p>
          <div className="flex gap-5">
            <Link href="/impressum" className="hover:text-frost">Legal</Link>
            <Link href="/datenschutzerklaerung" className="hover:text-frost">Privatsphäre</Link>
            <Link href="/kontakt" className="hover:text-frost">Kontakt</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

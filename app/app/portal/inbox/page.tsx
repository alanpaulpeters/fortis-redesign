"use client";

import { useState } from "react";
import {
  MagnifyingGlass,
  PaperPlaneRight,
  Phone,
  Info,
} from "@phosphor-icons/react/dist/ssr";
import {
  demoConversations,
  type Conversation,
  type Message,
} from "@/content/portal-demo";

export default function Inbox() {
  const [activeId, setActiveId] = useState(demoConversations[0].id);
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [extra, setExtra] = useState<Record<number, Message[]>>({});
  const [readIds, setReadIds] = useState<number[]>([demoConversations[0].id]);

  const active = demoConversations.find(
    (c) => c.id === activeId
  ) as Conversation;
  const messages = [...active.messages, ...(extra[activeId] ?? [])];

  function send() {
    const text = (drafts[activeId] ?? "").trim();
    if (!text) return;
    setExtra((e) => ({
      ...e,
      [activeId]: [
        ...(e[activeId] ?? []),
        {
          from: "me",
          text,
          time: new Date().toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    }));
    setDrafts((d) => ({ ...d, [activeId]: "" }));
  }

  return (
    <>
      <div className="mb-6">
        <p className="text-[11px] font-medium uppercase tracking-widest text-ptext/40">
          Arbeitsbereich
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Inbox</h1>
        <p className="mt-1 text-[14px] font-light text-ptext/55">
          Direkter Draht zu Ihrem Sachbearbeiter – alle Unterhaltungen an einem
          Ort.
        </p>
      </div>

      <div className="grid overflow-hidden rounded-3xl border border-pline/10 bg-pcard p-card lg:grid-cols-[320px_1fr]">
        {/* Konversationsliste */}
        <aside className="border-b border-pline/10 lg:border-b-0 lg:border-r">
          <div className="p-4">
            <div className="relative">
              <MagnifyingGlass
                size={14}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ptext/40"
              />
              <input
                placeholder="Unterhaltungen durchsuchen"
                aria-label="Unterhaltungen durchsuchen"
                className="h-9 w-full rounded-full border border-pline/15 bg-pline/[0.03] pl-9 pr-4 text-[13px] text-ptext placeholder:text-ptext/40 focus:border-mint focus:outline-none"
              />
            </div>
          </div>
          <ul className="flex flex-row gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
            {demoConversations.map((c) => {
              const isActive = c.id === activeId;
              const showUnread = c.unread > 0 && !readIds.includes(c.id);
              const last = c.messages[c.messages.length - 1];
              return (
                <li key={c.id} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveId(c.id);
                      setReadIds((r) =>
                        r.includes(c.id) ? r : [...r, c.id]
                      );
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors ${
                      isActive ? "bg-pline/[0.06]" : "hover:bg-pline/[0.03]"
                    }`}
                  >
                    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint/15 text-[13px] font-bold text-mint2">
                      {c.initials}
                      {c.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-pcard bg-mint" />
                      )}
                    </span>
                    <span className="hidden min-w-0 flex-1 lg:block">
                      <span className="flex items-center justify-between gap-2">
                        <span
                          className={`truncate text-[13px] ${
                            showUnread
                              ? "font-semibold text-ptext"
                              : "font-medium text-ptext/80"
                          }`}
                        >
                          {c.name}
                        </span>
                        {showUnread && (
                          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-mint px-1 text-[10px] font-bold text-navy">
                            {c.unread}
                          </span>
                        )}
                      </span>
                      <span
                        className={`block truncate text-[12px] ${
                          showUnread ? "text-ptext/70" : "font-light text-ptext/45"
                        }`}
                      >
                        {last.from === "me" ? "Sie: " : ""}
                        {last.text}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Chat */}
        <section className="flex min-h-[560px] flex-col">
          <header className="flex items-center gap-3 border-b border-pline/10 px-6 py-4">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-mint/15 text-[12px] font-bold text-mint2">
              {active.initials}
              {active.online && (
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-pcard bg-mint" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-ptext">{active.name}</p>
              <p className="text-[12px] text-ptext/45">
                {active.role} · {active.online ? "online" : "offline"}
              </p>
            </div>
            <button
              type="button"
              aria-label="Anrufen"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ptext/60 transition-colors hover:bg-pline/[0.05] hover:text-ptext"
            >
              <Phone size={18} />
            </button>
            <button
              type="button"
              aria-label="Details"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ptext/60 transition-colors hover:bg-pline/[0.05] hover:text-ptext"
            >
              <Info size={18} />
            </button>
          </header>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-6 py-6">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    m.from === "me"
                      ? "rounded-br-md bg-mint text-navy"
                      : "rounded-bl-md bg-pline/[0.05] text-ptext/85"
                  }`}
                >
                  <p className="text-[14px] leading-relaxed">{m.text}</p>
                  <p
                    className={`mt-1 text-right text-[10px] ${
                      m.from === "me" ? "text-navy/60" : "text-ptext/40"
                    }`}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <footer className="border-t border-pline/10 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-3"
            >
              <input
                value={drafts[activeId] ?? ""}
                onChange={(e) =>
                  setDrafts((d) => ({ ...d, [activeId]: e.target.value }))
                }
                placeholder="Nachricht schreiben…"
                aria-label="Nachricht schreiben"
                className="h-11 flex-1 rounded-full border border-pline/15 bg-pline/[0.03] px-5 text-[14px] text-ptext placeholder:text-ptext/40 focus:border-mint focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Senden"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint text-navy transition-transform hover:brightness-95 active:scale-[0.95]"
              >
                <PaperPlaneRight size={18} weight="fill" />
              </button>
            </form>
          </footer>
        </section>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";

const inputClass =
  "w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-[15px] text-frost placeholder:text-frost/35 focus:border-mint/60 focus:outline-none";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(String(data.get("subject") || "Anfrage über fortis-inkasso.de"));
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nE-Mail: ${data.get("email")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:info@fortis-inkasso.de?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Name" aria-label="Name" className={inputClass} />
        <input
          name="email"
          type="email"
          required
          placeholder="E-Mail"
          aria-label="E-Mail"
          className={inputClass}
        />
      </div>
      <input name="subject" required placeholder="Betreff" aria-label="Betreff" className={inputClass} />
      <textarea
        name="message"
        required
        rows={6}
        placeholder="Nachricht"
        aria-label="Nachricht"
        className={inputClass}
      />
      <label className="flex items-start gap-3 text-[13px] font-light text-frost/55">
        <input type="checkbox" required className="mt-0.5 accent-mint" />
        <span>
          Ich habe die{" "}
          <a href="/datenschutzerklaerung" className="text-mint underline-offset-4 hover:underline">
            Datenschutzerklärung
          </a>{" "}
          gelesen und stimme dieser zu.
        </span>
      </label>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-mint px-8 py-3.5 text-[15px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98]"
      >
        Absenden <PaperPlaneTilt size={17} weight="bold" />
      </button>
      {sent && (
        <p className="text-[14px] text-mint" role="status">
          Ihr E-Mail-Programm wurde geöffnet. Alternativ erreichen Sie uns direkt unter
          info@fortis-inkasso.de.
        </p>
      )}
    </form>
  );
}

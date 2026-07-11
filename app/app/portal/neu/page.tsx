"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  CaretLeft,
  CaretRight,
  UploadSimple,
  FilePdf,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

const steps = [
  { title: "Datei hochladen", sub: "Unbezahlte Rechnung oder Mahnung hochladen" },
  { title: "Extrahierte Daten überprüfen", sub: "Erfassung der Angaben aus dem hochgeladenen Dokument" },
  { title: "Schuldnerangaben", sub: "Informationen über Schuldner" },
  { title: "Forderungsdetails", sub: "Ereignis, Anspruchsinformationen" },
  { title: "Vollständige Angaben", sub: "Erfassung weiterer Angaben zur Forderung" },
  { title: "Abgeschlossen", sub: "Ihre Forderung wurde erfolgreich eingereicht" },
];

const inputClass =
  "w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-[14px] text-frost placeholder:text-frost/35 focus:border-mint/60 focus:outline-none";
const labelClass = "mb-2 block text-[13px] font-medium text-frost/70";

export default function NeueForderung() {
  const [step, setStep] = useState(0);
  const [fileChosen, setFileChosen] = useState(false);
  const [showOptional, setShowOptional] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="grid gap-10 lg:grid-cols-[340px_1fr]">
      {/* Stepper */}
      <aside className="h-fit rounded-3xl border border-white/[0.08] bg-gradient-to-b from-navy2/60 to-surface p-8">
        <h1 className="mb-8 text-xl font-semibold">Forderung einreichen</h1>
        <ol className="flex flex-col gap-7">
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={s.title} className="relative flex gap-4">
                {i < steps.length - 1 && (
                  <span className="absolute left-[15px] top-9 h-[calc(100%-4px)] w-px border-l border-dashed border-white/[0.15]" />
                )}
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[13px] font-semibold ${
                    done
                      ? "bg-mint text-navy"
                      : active
                        ? "bg-white/[0.12] text-frost ring-1 ring-mint/60"
                        : "border border-dashed border-white/[0.2] text-frost/50"
                  }`}
                >
                  {done ? <Check size={15} weight="bold" /> : i + 1}
                </span>
                <div>
                  <p
                    className={`text-[14px] font-semibold ${
                      active ? "text-frost" : done ? "text-frost/80" : "text-frost/45"
                    }`}
                  >
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-[12px] font-light leading-snug text-frost/40">
                    {s.sub}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Inhalt */}
      <section className="rounded-3xl border border-white/[0.08] bg-surface/60 p-8 sm:p-10">
        {step === 0 && (
          <>
            <h2 className="text-xl font-semibold">
              Forderung einreichen <span className="text-red-400">*</span>
            </h2>
            <p className="mt-1 text-[13px] text-frost/50">
              Mögliche Dateiformate: PDF.
            </p>
            <button
              type="button"
              onClick={() => setFileChosen(true)}
              className={`mt-8 flex w-full items-center gap-4 rounded-2xl border-2 border-dashed p-8 text-left transition-colors ${
                fileChosen
                  ? "border-mint/50 bg-mint/[0.05]"
                  : "border-white/[0.15] hover:border-mint/40 hover:bg-white/[0.02]"
              }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] text-mint">
                {fileChosen ? <FilePdf size={24} /> : <UploadSimple size={24} />}
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-frost/90">
                  {fileChosen
                    ? "rechnung_2026_204.pdf ausgewählt"
                    : "Dokument hier ablegen oder zum Hochladen klicken."}
                </span>
                <span className="block text-[13px] font-light text-frost/50">
                  {fileChosen
                    ? "Klicken Sie auf Weiter, um fortzufahren."
                    : "Sie werden anschließend automatisch weitergeleitet!"}
                </span>
              </span>
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold">Extrahierte Daten überprüfen.</h2>
            <p className="mt-1 text-[13px] text-frost/50">
              Wir haben folgende Angaben aus Ihrem Dokument erkannt – bitte prüfen
              und bei Bedarf korrigieren.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Rechnungsnummer</label>
                <input defaultValue="2026-204" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Rechnungsdatum</label>
                <input type="date" defaultValue="2026-05-28" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Betrag (EUR)</label>
                <input defaultValue="560,00" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Fälligkeit</label>
                <input type="date" defaultValue="2026-06-11" className={inputClass} />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold">Informationen über Schuldner.</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Anrede <span className="text-red-400">*</span>
                </label>
                <input placeholder="Herr, Frau oder Unternehmen" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>
                  Länderkennzeichen <span className="text-red-400">*</span>
                </label>
                <select className={inputClass} defaultValue="DE - Deutschland">
                  {["DE - Deutschland", "AT - Österreich", "CH - Schweiz", "NL - Niederlande", "FR - Frankreich"].map(
                    (c) => (
                      <option key={c} className="bg-surface">
                        {c}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className={labelClass}>
                  Straße <span className="text-red-400">*</span>
                </label>
                <input placeholder="Straße" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>
                  PLZ <span className="text-red-400">*</span>
                </label>
                <input placeholder="PLZ" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>
                  Ort des Schuldners <span className="text-red-400">*</span>
                </label>
                <input placeholder="Ort des Schuldners" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Hinweis zum Schuldner</label>
                <textarea rows={4} placeholder="Hinweis zum Schuldner" className={inputClass} />
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold">Sachverhalt und Forderungsangaben.</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Aktenzeichen <span className="text-red-400">*</span>
                </label>
                <input placeholder="Aktenzeichen der Akte" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>
                  Hauptforderung / Kosten / Zahlung <span className="text-red-400">*</span>
                </label>
                <select className={inputClass} defaultValue="H00 - Hauptforderung">
                  {["H00 - Hauptforderung", "K01 - Mahnkosten", "K02 - Verzugszinsen", "Z01 - Teilzahlung"].map(
                    (o) => (
                      <option key={o} className="bg-surface">
                        {o}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Verfahrenshinweis</label>
                <input placeholder="Verfahrenshinweis" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Beschreibung des Forderungsgrunds</label>
                <textarea
                  rows={4}
                  placeholder="Beschreibung des Forderungsgrunds"
                  className={inputClass}
                />
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-xl font-semibold">Vollständige Angaben.</h2>
            <p className="mt-1 text-[13px] text-frost/50">
              Letzte Angaben zur Forderung und rechtliche Bestätigungen.
            </p>
            <div className="mt-8 flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Betrag (EUR)</label>
                  <input defaultValue="560,00" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Nebenkosten (optional)</label>
                  <input placeholder="z. B. Mahnkosten" className={inputClass} />
                </div>
              </div>
              {[
                "Hiermit erteile ich Vollmacht zur Geltendmachung der Forderung.",
                "Die Forderung ist unbestritten und besteht. Ich habe die Voraussetzungen gelesen und verstanden.",
                "Ich bestätige die Widerrufsbelehrung gelesen zu haben und willige ein, dass mit der Ausführung sofort begonnen wird.",
              ].map((text) => (
                <label
                  key={text}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-[13px] font-light leading-relaxed text-frost/65"
                >
                  <input type="checkbox" className="mt-0.5 accent-mint" />
                  {text} <span className="text-red-400">*</span>
                </label>
              ))}
            </div>
          </>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center py-14 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-mint/10">
              <CheckCircle size={44} weight="fill" className="text-mint" />
            </span>
            <h2 className="mt-6 text-2xl font-semibold">
              Ihre Forderung wurde erfolgreich eingereicht.
            </h2>
            <p className="mt-2 max-w-md text-[14px] font-light leading-relaxed text-frost/55">
              Wir prüfen Ihre Unterlagen und melden uns schnellstmöglich zurück,
              ob wir Ihren Auftrag annehmen. Den Status verfolgen Sie jederzeit
              in Ihrer Forderungsübersicht.
            </p>
            <Link
              href="/portal"
              className="mt-8 rounded-full bg-mint px-7 py-3 text-[14px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98]"
            >
              Zur Übersicht
            </Link>
          </div>
        )}

        {step < 5 && (
          <div className="mt-10 flex items-center justify-between border-t border-white/[0.06] pt-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={back}
                className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-6 py-2.5 text-[13px] font-medium text-frost/75 transition-colors hover:bg-white/[0.08]"
              >
                <CaretLeft size={14} /> Zurück
              </button>
            ) : (
              <Link
                href="/portal"
                className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-6 py-2.5 text-[13px] font-medium text-frost/75 transition-colors hover:bg-white/[0.08]"
              >
                Übersicht
              </Link>
            )}
            {(step === 2 || step === 3) && (
              <button
                type="button"
                onClick={() => setShowOptional(!showOptional)}
                className="hidden rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-[13px] text-frost/60 hover:bg-white/[0.08] sm:block"
              >
                Optionale Felder
              </button>
            )}
            <button
              type="button"
              onClick={next}
              disabled={step === 0 && !fileChosen}
              className="flex items-center gap-2 rounded-full bg-mint px-7 py-2.5 text-[13px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Weiter <CaretRight size={14} weight="bold" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  UploadSimple,
  FileXls,
  DownloadSimple,
  PlayCircle,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

export default function Forderungsbestand() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-frost/40">
            Arbeitsbereich
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Forderungsbestand
          </h1>
          <p className="mt-1 text-[14px] font-light text-frost/55">
            Neue Forderungsstapel aus strukturierten Vorlagen hochladen.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-frost/80 transition-colors hover:bg-white/[0.08]"
        >
          <PlayCircle size={17} className="text-mint" /> Tutorial ansehen
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="rounded-3xl border border-white/[0.08] bg-surface/60 p-8">
          <h2 className="text-lg font-semibold">Excel-Datei hochladen</h2>
          <p className="mt-2 text-[13px] font-light leading-relaxed text-frost/55">
            Überprüfen Sie vor dem Hochladen, ob Ihre Informationen dem
            Beispieldokument entsprechen.
          </p>

          <button
            type="button"
            onClick={() => setUploaded(true)}
            className={`mt-6 flex w-full items-center gap-4 rounded-2xl border-2 border-dashed p-8 text-left transition-colors ${
              uploaded
                ? "border-mint/50 bg-mint/[0.05]"
                : "border-white/[0.15] hover:border-mint/40 hover:bg-white/[0.02]"
            }`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] text-mint">
              {uploaded ? <CheckCircle size={24} weight="fill" /> : <UploadSimple size={24} />}
            </span>
            <span>
              <span className="block text-[15px] font-semibold text-frost/90">
                {uploaded
                  ? "forderungen_juli.xlsx hochgeladen"
                  : "Datei hier ablegen oder zum Hochladen klicken."}
              </span>
              <span className="block text-[13px] font-light text-frost/50">
                {uploaded
                  ? "24 Forderungen erkannt – Verarbeitung gestartet."
                  : "Unterstützte Formate: XLSX, CSV"}
              </span>
            </span>
          </button>

          {uploaded && (
            <div className="mt-5 rounded-xl border border-mint/20 bg-mint/[0.06] px-5 py-4 text-[13px] text-frost/70">
              Ihr Forderungsstapel wird geprüft. Sie erhalten eine
              Benachrichtigung, sobald alle Positionen übernommen wurden.
            </div>
          )}
        </section>

        <section className="h-fit rounded-3xl border border-white/[0.08] bg-surface/60 p-8">
          <h2 className="text-lg font-semibold">Musterdatei</h2>
          <p className="mt-2 text-[13px] font-light leading-relaxed text-frost/55">
            Laden Sie die Demo-Datei herunter. Ihre Datei sollte derselben
            Struktur entsprechen.
          </p>
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <FileXls size={28} className="text-mint" />
            <div>
              <p className="text-[13px] font-medium text-frost/85">
                fortis_muster_forderungen.xlsx
              </p>
              <p className="text-[12px] text-frost/45">12 KB · Vorlage</p>
            </div>
          </div>
          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-3 text-[13px] font-medium text-frost/85 transition-colors hover:bg-white/[0.08]"
          >
            <DownloadSimple size={16} /> Muster herunterladen
          </button>
        </section>
      </div>
    </>
  );
}

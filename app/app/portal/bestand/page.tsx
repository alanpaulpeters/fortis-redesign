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
          <p className="text-[11px] font-medium uppercase tracking-widest text-ptext/40">
            Arbeitsbereich
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Forderungsbestand
          </h1>
          <p className="mt-1 text-[14px] font-light text-ptext/55">
            Neue Forderungsstapel aus strukturierten Vorlagen hochladen.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-pline/15 bg-pline/[0.03] px-5 py-2.5 text-[13px] font-medium text-ptext/80 transition-colors hover:bg-pline/[0.06]"
        >
          <PlayCircle size={17} className="text-mint2" /> Tutorial ansehen
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="rounded-3xl border border-pline/10 bg-pcard p-card p-8">
          <h2 className="text-lg font-semibold">Excel-Datei hochladen</h2>
          <p className="mt-2 text-[13px] font-light leading-relaxed text-ptext/55">
            Überprüfen Sie vor dem Hochladen, ob Ihre Informationen dem
            Beispieldokument entsprechen.
          </p>

          <button
            type="button"
            onClick={() => setUploaded(true)}
            className={`mt-6 flex w-full items-center gap-4 rounded-2xl border-2 border-dashed p-8 text-left transition-colors ${
              uploaded
                ? "border-mint/50 bg-mint/[0.05]"
                : "border-pline/20 hover:border-mint/40 hover:bg-pline/[0.02]"
            }`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pline/[0.05] text-mint2">
              {uploaded ? <CheckCircle size={24} weight="fill" /> : <UploadSimple size={24} />}
            </span>
            <span>
              <span className="block text-[15px] font-semibold text-ptext/90">
                {uploaded
                  ? "forderungen_juli.xlsx hochgeladen"
                  : "Datei hier ablegen oder zum Hochladen klicken."}
              </span>
              <span className="block text-[13px] font-light text-ptext/50">
                {uploaded
                  ? "24 Forderungen erkannt – Verarbeitung gestartet."
                  : "Unterstützte Formate: XLSX, CSV"}
              </span>
            </span>
          </button>

          {uploaded && (
            <div className="mt-5 rounded-xl border border-mint/20 bg-mint/[0.06] px-5 py-4 text-[13px] text-ptext/70">
              Ihr Forderungsstapel wird geprüft. Sie erhalten eine
              Benachrichtigung, sobald alle Positionen übernommen wurden.
            </div>
          )}
        </section>

        <section className="h-fit rounded-3xl border border-pline/10 bg-pcard p-card p-8">
          <h2 className="text-lg font-semibold">Musterdatei</h2>
          <p className="mt-2 text-[13px] font-light leading-relaxed text-ptext/55">
            Laden Sie die Demo-Datei herunter. Ihre Datei sollte derselben
            Struktur entsprechen.
          </p>
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-pline/10 bg-pline/[0.02] p-4">
            <FileXls size={28} className="text-mint2" />
            <div>
              <p className="text-[13px] font-medium text-ptext/85">
                fortis_muster_forderungen.xlsx
              </p>
              <p className="text-[12px] text-ptext/45">12 KB · Vorlage</p>
            </div>
          </div>
          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-pline/15 bg-pline/[0.03] px-5 py-3 text-[13px] font-medium text-ptext/85 transition-colors hover:bg-pline/[0.06]"
          >
            <DownloadSimple size={16} /> Muster herunterladen
          </button>
        </section>
      </div>
    </>
  );
}

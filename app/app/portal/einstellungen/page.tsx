"use client";

import { useState } from "react";
import {
  PencilSimple,
  ShieldCheck,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import { demoUser } from "@/content/portal-demo";

const inputClass =
  "w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-[14px] text-frost placeholder:text-frost/35 focus:border-mint/60 focus:outline-none";
const labelClass = "text-[13px] font-medium text-frost/70";

function Card({
  title,
  children,
  footer,
}: {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/[0.08] bg-surface/60">
      <h2 className="border-b border-white/[0.06] px-8 py-5 text-[15px] font-semibold">
        {title}
      </h2>
      <div className="px-8 py-6">{children}</div>
      {footer && (
        <div className="flex justify-end border-t border-white/[0.06] px-8 py-4">
          {footer}
        </div>
      )}
    </section>
  );
}

function SaveButton() {
  const [saved, setSaved] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        setSaved(true);
        setTimeout(() => setSaved(false), 1800);
      }}
      className="rounded-full bg-mint px-6 py-2.5 text-[13px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98]"
    >
      {saved ? "Gespeichert ✓" : "Speichern"}
    </button>
  );
}

export default function Einstellungen() {
  const [twoFa, setTwoFa] = useState(false);
  const [confirmDeactivate, setConfirmDeactivate] = useState(false);

  return (
    <>
      <div className="mb-8">
        <p className="text-[11px] font-medium uppercase tracking-widest text-frost/40">
          Arbeitsbereich
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Einstellungen
        </h1>
        <p className="mt-1 text-[14px] font-light text-frost/55">
          Kontodetails, Sicherheit und Profileinstellungen verwalten.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <Card title="Profildetails" footer={<SaveButton />}>
          <div className="grid gap-6 sm:grid-cols-[180px_1fr]">
            <p className={labelClass}>Avatar</p>
            <div>
              <div className="relative h-24 w-24">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-mint/10 text-2xl font-bold text-mint">
                  {demoUser.initials}
                </div>
                <button
                  type="button"
                  aria-label="Avatar ändern"
                  className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] bg-surface text-frost/70 hover:text-frost"
                >
                  <PencilSimple size={14} />
                </button>
              </div>
              <p className="mt-2 text-[12px] text-frost/40">
                Erlaubte Dateitypen: PNG, JPG, JPEG.
              </p>
            </div>

            <p className={labelClass}>
              Vollständiger Name <span className="text-red-400">*</span>
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input defaultValue="Alan Paul" className={inputClass} />
              <input defaultValue="Peters" className={inputClass} />
            </div>
          </div>
        </Card>

        <Card title="Rechnungs- & Adressdaten" footer={<SaveButton />}>
          <div className="grid items-center gap-x-6 gap-y-5 sm:grid-cols-[180px_1fr]">
            <p className={labelClass}>
              IBAN <span className="text-red-400">*</span>
            </p>
            <input defaultValue="DE89 3704 0044 0532 0130 00" className={inputClass} />
            <p className={labelClass}>
              Postleitzahl <span className="text-red-400">*</span>
            </p>
            <input placeholder="z. B. 10115" className={inputClass} />
            <p className={labelClass}>Ort (optional)</p>
            <input placeholder="z. B. Berlin" className={inputClass} />
            <p className={labelClass}>Straße und Hausnummer (optional)</p>
            <input
              defaultValue="Heidenkampsweg 81, 20097 Hamburg"
              className={inputClass}
            />
          </div>
        </Card>

        <Card title="Anmeldemethode">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[14px] font-medium text-frost/85">
                  Verknüpfte E-Mail-Adressen
                </p>
                <p className="text-[13px] text-frost/50">{demoUser.email}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2 text-[13px] font-medium text-frost/80 hover:bg-white/[0.08]"
              >
                Verwalten
              </button>
            </div>

            <div className="h-px bg-white/[0.06]" />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[14px] font-medium text-frost/85">Passwort</p>
                <p className="text-[13px] tracking-widest text-frost/50">
                  ••••••••••••
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2 text-[13px] font-medium text-frost/80 hover:bg-white/[0.08]"
              >
                Kennwort ändern
              </button>
            </div>

            <div
              className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-5 ${
                twoFa
                  ? "border-mint/30 bg-mint/[0.06]"
                  : "border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={22}
                  weight={twoFa ? "fill" : "regular"}
                  className="mt-0.5 text-mint"
                />
                <div>
                  <p className="text-[14px] font-medium text-frost/85">
                    Konto absichern
                  </p>
                  <p className="max-w-xl text-[13px] font-light leading-relaxed text-frost/55">
                    Die Zwei-Faktor-Authentifizierung fügt Ihrem Konto eine
                    zusätzliche Sicherheitsebene hinzu. Um sich anzumelden,
                    müssen Sie außerdem einen 6-stelligen Code bereitstellen.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTwoFa(!twoFa)}
                className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-colors ${
                  twoFa
                    ? "border border-mint/40 text-mint"
                    : "bg-mint text-navy hover:brightness-95"
                }`}
              >
                {twoFa ? "Aktiviert ✓" : "Aktivieren"}
              </button>
            </div>
          </div>
        </Card>

        <Card
          title="Konto deaktivieren"
          footer={
            <button
              type="button"
              disabled={!confirmDeactivate}
              className="rounded-full bg-red-400/90 px-6 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Konto deaktivieren
            </button>
          }
        >
          <div className="rounded-2xl border border-dashed border-yellow-400/30 bg-yellow-400/[0.05] p-5">
            <div className="flex items-start gap-3">
              <Warning size={20} className="mt-0.5 text-yellow-400" />
              <div>
                <p className="text-[14px] font-medium text-frost/85">
                  Hier können Sie Ihr Konto deaktivieren
                </p>
                <p className="text-[13px] font-light text-frost/55">
                  Für zusätzliche Sicherheit müssen Sie die Deaktivierung
                  bestätigen. Laufende Forderungen werden weiterhin bearbeitet.
                </p>
              </div>
            </div>
          </div>
          <label className="mt-4 flex items-center gap-3 text-[13px] text-frost/65">
            <input
              type="checkbox"
              checked={confirmDeactivate}
              onChange={(e) => setConfirmDeactivate(e.target.checked)}
              className="accent-mint"
            />
            Ich bestätige die Deaktivierung meines Kontos
          </label>
        </Card>
      </div>
    </>
  );
}

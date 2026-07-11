"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlass,
  Plus,
  SealCheck,
  User,
  MapPin,
  EnvelopeSimple,
  TrendUp,
  TrendDown,
  CheckCircle,
  FilePdf,
  PlayCircle,
} from "@phosphor-icons/react/dist/ssr";
import {
  demoUser,
  demoClaims,
  statusColor,
  type ClaimStatus,
} from "@/content/portal-demo";

const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});
const dateFormat = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const statusOrder: ClaimStatus[] = [
  "Eingereicht",
  "Geprüft",
  "Geltend gemacht",
  "Abgeschlossen",
  "Abgewiesen",
];

function StatusDonut() {
  const counts = statusOrder.map((s) => ({
    status: s,
    count: demoClaims.filter((c) => c.status === s).length,
  }));
  const total = demoClaims.length;
  const r = 56;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-8">
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        role="img"
        aria-label={`Statusverteilung von ${total} Forderungen`}
      >
        {counts.map(({ status, count }) => {
          if (count === 0) return null;
          const frac = count / total;
          const seg = (
            <circle
              key={status}
              cx="75"
              cy="75"
              r={r}
              fill="none"
              stroke={statusColor[status]}
              strokeWidth="16"
              strokeDasharray={`${frac * circumference} ${circumference}`}
              strokeDashoffset={-offset * circumference}
              transform="rotate(-90 75 75)"
            >
              <title>{`${status}: ${count}`}</title>
            </circle>
          );
          offset += frac;
          return seg;
        })}
        {/* 2px-Gaps zwischen Segmenten (Sekundär-Encoding für CVD-Floor) */}
        {(() => {
          let acc = 0;
          return counts
            .filter((c) => c.count > 0)
            .map(({ status, count }) => {
              const angle = acc * 360 - 90;
              acc += count / total;
              return (
                <line
                  key={`gap-${status}`}
                  x1="75"
                  y1="75"
                  x2={75 + 70 * Math.cos((angle * Math.PI) / 180)}
                  y2={75 + 70 * Math.sin((angle * Math.PI) / 180)}
                  stroke="#0c1526"
                  strokeWidth="2.5"
                />
              );
            });
        })()}
        <circle cx="75" cy="75" r="40" fill="#0c1526" />
        <text
          x="75"
          y="71"
          textAnchor="middle"
          fill="#f4f7fb"
          fontSize="26"
          fontWeight="600"
        >
          {total}
        </text>
        <text
          x="75"
          y="90"
          textAnchor="middle"
          fill="rgba(244,247,251,0.5)"
          fontSize="10"
        >
          Forderungen
        </text>
      </svg>

      <ul className="flex flex-col gap-2">
        {counts.map(({ status, count }) => (
          <li key={status} className="flex items-center gap-2.5 text-[13px]">
            <span
              className="h-3 w-3 rounded-[3px]"
              style={{ background: statusColor[status] }}
            />
            <span className="text-frost/70">{status}</span>
            <span className="ml-auto pl-4 font-semibold text-frost/90">
              {count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PortalDashboard() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | "Alle">("Alle");

  const open = demoClaims.filter(
    (c) => c.status !== "Abgeschlossen" && c.status !== "Abgewiesen"
  ).length;
  const success = demoClaims.filter((c) => c.status === "Abgeschlossen").length;
  const rate = Math.round((success / demoClaims.length) * 100);

  const filtered = useMemo(
    () =>
      demoClaims.filter((c) => {
        const q = query.toLowerCase();
        const matchesQuery =
          !q ||
          c.debtor.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q);
        const matchesStatus =
          statusFilter === "Alle" || c.status === statusFilter;
        return matchesQuery && matchesStatus;
      }),
    [query, statusFilter]
  );

  return (
    <>
      {/* Profilkarte */}
      <section className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-navy to-surface p-8">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex items-start gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-mint/10 text-3xl font-bold text-mint">
              {demoUser.initials}
            </div>
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-semibold text-frost">
                {demoUser.name}
                <SealCheck size={20} weight="fill" className="text-mint" />
              </h1>
              <div className="mt-1.5 flex flex-wrap gap-4 text-[13px] text-frost/55">
                <span className="flex items-center gap-1.5">
                  <User size={14} /> {demoUser.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} /> {demoUser.country}
                </span>
                <span className="flex items-center gap-1.5">
                  <EnvelopeSimple size={14} /> {demoUser.email}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                {[
                  { icon: TrendDown, value: open, label: "Offene Ford." },
                  { icon: CheckCircle, value: success, label: "Erfolgreiche Ford." },
                  { icon: TrendUp, value: `${rate}%`, label: "Erfolgsrate" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2.5 sm:px-5 sm:py-3"
                  >
                    <p className="flex items-center gap-1.5 text-lg font-semibold text-frost sm:text-xl">
                      <stat.icon size={16} className="shrink-0 text-mint" />
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-frost/50 sm:text-[12px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <StatusDonut />
        </div>
      </section>

      {/* Arbeitsbereich */}
      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-frost/40">
              Arbeitsbereich
            </p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight">
              Forderungen
            </h2>
            <p className="mt-1 text-[14px] font-light text-frost/55">
              Forderungen verfolgen, suchen und verwalten – in einer
              übersichtlichen Ansicht.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-frost/80 transition-colors hover:bg-white/[0.08]"
          >
            <PlayCircle size={17} className="text-mint" /> Tutorial ansehen
          </button>
        </div>

        <div className="mt-6 rounded-3xl border border-white/[0.08] bg-surface/60 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <MagnifyingGlass
                size={15}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-frost/40"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Forderungen suchen"
                aria-label="Forderungen suchen"
                className="h-10 w-full rounded-full border border-white/[0.1] bg-white/[0.04] pl-10 pr-4 text-[13px] text-frost placeholder:text-frost/35 focus:border-mint/60 focus:outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as ClaimStatus | "Alle")
              }
              aria-label="Nach Status filtern"
              className="h-10 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 text-[13px] text-frost focus:border-mint/60 focus:outline-none"
            >
              <option className="bg-surface">Alle</option>
              {statusOrder.map((s) => (
                <option key={s} className="bg-surface">
                  {s}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="rounded-full border border-red-400/20 bg-red-400/10 px-5 py-2.5 text-[13px] font-medium text-red-300 transition-colors hover:bg-red-400/15"
            >
              Vertrag widerrufen
            </button>
            <Link
              href="/portal/neu"
              className="flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-[13px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98]"
            >
              <Plus size={15} weight="bold" /> Forderung erstellen
            </Link>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[820px] text-left">
              <thead>
                <tr className="text-[11px] font-medium uppercase tracking-wider text-frost/40">
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Schuldner</th>
                  <th className="pb-3 pr-4 text-right">Betrag</th>
                  <th className="pb-3 pl-8 pr-4">Kontaktdaten</th>
                  <th className="pb-3 pr-4">Erstellt am</th>
                  <th className="pb-3">Hauptdokument</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {filtered.map((claim) => (
                  <tr
                    key={claim.id}
                    className="group transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="py-4 pr-4">
                      <span
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-medium"
                        style={{
                          color: statusColor[claim.status],
                          background: `${statusColor[claim.status]}1a`,
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: statusColor[claim.status] }}
                        />
                        {claim.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="text-[14px] font-medium text-frost/90">
                        {claim.debtor}
                      </p>
                      <p className="text-[12px] text-frost/45">{claim.address}</p>
                    </td>
                    <td className="py-4 pr-4 text-right text-[14px] font-semibold text-frost/90">
                      {euro.format(claim.amount)}
                    </td>
                    <td className="py-4 pl-8 pr-4 text-[13px] text-frost/60">
                      {claim.contact}
                    </td>
                    <td className="py-4 pr-4 text-[13px] text-frost/60">
                      {dateFormat.format(new Date(claim.created))}
                    </td>
                    <td className="py-4">
                      <span className="flex items-center gap-1.5 text-[13px] text-frost/60">
                        <FilePdf size={16} className="text-red-300" />
                        {claim.document}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-[14px] text-frost/45"
                    >
                      Keine Forderungen gefunden.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

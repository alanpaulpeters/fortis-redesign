"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  statusColors,
  type ClaimStatus,
} from "@/content/portal-demo";
import { useTheme } from "@/components/portal/theme";
import { Counter } from "@/components/Counter";

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

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  }),
};

function StatusDonut() {
  const { theme } = useTheme();
  const statusColor = statusColors[theme];
  const counts = statusOrder.map((s) => ({
    status: s,
    count: demoClaims.filter((c) => c.status === s).length,
  }));
  const total = demoClaims.length;
  const r = 56;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  const gapColor = theme === "dark" ? "#0c1526" : "#ffffff";

  return (
    <div className="flex items-center gap-8">
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        role="img"
        aria-label={`Statusverteilung von ${total} Forderungen`}
      >
        {counts.map(({ status, count }, i) => {
          if (count === 0) return null;
          const frac = count / total;
          const seg = (
            <motion.circle
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
            >
              <title>{`${status}: ${count}`}</title>
            </motion.circle>
          );
          offset += frac;
          return seg;
        })}
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
                  stroke={gapColor}
                  strokeWidth="2.5"
                />
              );
            });
        })()}
        <circle cx="75" cy="75" r="40" fill={gapColor} />
        <text
          x="75"
          y="71"
          textAnchor="middle"
          fill="currentColor"
          fontSize="26"
          fontWeight="600"
        >
          {total}
        </text>
        <text
          x="75"
          y="90"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.5"
          fontSize="10"
        >
          Forderungen
        </text>
      </svg>

      <ul className="flex flex-col gap-2">
        {counts.map(({ status, count }, i) => (
          <motion.li
            key={status}
            custom={i}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex items-center gap-2.5 text-[13px]"
          >
            <span
              className="h-3 w-3 rounded-[3px]"
              style={{ background: statusColor[status] }}
            />
            <span className="text-ptext/70">{status}</span>
            <span className="ml-auto pl-4 font-semibold text-ptext/90">
              {count}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default function PortalDashboard() {
  const { theme } = useTheme();
  const statusColor = statusColors[theme];
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
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="p-card rounded-3xl border border-pline/10 bg-pcard p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex items-start gap-6">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
              className="flex h-24 w-24 items-center justify-center rounded-2xl bg-mint/10 text-3xl font-bold text-mint2"
            >
              {demoUser.initials}
            </motion.div>
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-semibold text-ptext">
                {demoUser.name}
                <motion.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
                >
                  <SealCheck size={20} weight="fill" className="text-mint2" />
                </motion.span>
              </h1>
              <div className="mt-1.5 flex flex-wrap gap-4 text-[13px] text-ptext/55">
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
                  { icon: TrendDown, value: open, suffix: "", label: "Offene Ford." },
                  { icon: CheckCircle, value: success, suffix: "", label: "Erfolgreiche Ford." },
                  { icon: TrendUp, value: rate, suffix: "%", label: "Erfolgsrate" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    custom={i + 2}
                    initial="hidden"
                    animate="show"
                    variants={fadeUp}
                    whileHover={{ y: -2 }}
                    className="rounded-xl border border-pline/10 bg-pline/[0.02] px-3 py-2.5 sm:px-5 sm:py-3"
                  >
                    <p className="flex items-center gap-1.5 text-lg font-semibold text-ptext sm:text-xl">
                      <stat.icon size={16} className="shrink-0 text-mint2" />
                      <Counter value={stat.value} suffix={stat.suffix} duration={1} />
                    </p>
                    <p className="text-[11px] text-ptext/50 sm:text-[12px]">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <StatusDonut />
        </div>
      </motion.section>

      {/* Arbeitsbereich */}
      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-ptext/40">
              Arbeitsbereich
            </p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight">
              Forderungen
            </h2>
            <p className="mt-1 text-[14px] font-light text-ptext/55">
              Forderungen verfolgen, suchen und verwalten – in einer
              übersichtlichen Ansicht.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-pline/15 bg-pcard px-5 py-2.5 text-[13px] font-medium text-ptext/80 transition-all hover:border-pline/30 hover:shadow-sm active:scale-[0.97]"
          >
            <PlayCircle size={17} className="text-mint2" /> Tutorial ansehen
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="p-card mt-6 rounded-3xl border border-pline/10 bg-pcard p-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <MagnifyingGlass
                size={15}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ptext/40"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Forderungen suchen"
                aria-label="Forderungen suchen"
                className="h-10 w-full rounded-full border border-pline/15 bg-pline/[0.03] pl-10 pr-4 text-[13px] text-ptext transition-shadow placeholder:text-ptext/35 focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/20"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as ClaimStatus | "Alle")
              }
              aria-label="Nach Status filtern"
              className="h-10 rounded-full border border-pline/15 bg-pcard px-4 text-[13px] text-ptext focus:border-mint focus:outline-none"
            >
              <option>Alle</option>
              {statusOrder.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <button
              type="button"
              className="rounded-full border border-red-400/30 bg-red-400/10 px-5 py-2.5 text-[13px] font-medium text-red-500 transition-all hover:bg-red-400/20 active:scale-[0.97] [.dark_&]:text-red-300"
            >
              Vertrag widerrufen
            </button>
            <Link
              href="/portal/neu"
              className="flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-[13px] font-semibold text-navy shadow-lg shadow-mint/20 transition-all hover:shadow-mint/30 hover:brightness-95 active:scale-[0.97]"
            >
              <Plus size={15} weight="bold" /> Forderung erstellen
            </Link>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[820px] text-left">
              <thead>
                <tr className="text-[11px] font-medium uppercase tracking-wider text-ptext/40">
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Schuldner</th>
                  <th className="pb-3 pr-4 text-right">Betrag</th>
                  <th className="pb-3 pl-8 pr-4">Kontaktdaten</th>
                  <th className="pb-3 pr-4">Erstellt am</th>
                  <th className="pb-3">Hauptdokument</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pline/[0.06]">
                {filtered.map((claim, i) => (
                  <motion.tr
                    key={claim.id}
                    custom={i}
                    initial="hidden"
                    animate="show"
                    variants={fadeUp}
                    className="group transition-colors hover:bg-pline/[0.03]"
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
                      <p className="text-[14px] font-medium text-ptext/90">
                        {claim.debtor}
                      </p>
                      <p className="text-[12px] text-ptext/45">{claim.address}</p>
                    </td>
                    <td className="py-4 pr-4 text-right text-[14px] font-semibold text-ptext/90">
                      {euro.format(claim.amount)}
                    </td>
                    <td className="py-4 pl-8 pr-4 text-[13px] text-ptext/60">
                      {claim.contact}
                    </td>
                    <td className="py-4 pr-4 text-[13px] text-ptext/60">
                      {dateFormat.format(new Date(claim.created))}
                    </td>
                    <td className="py-4">
                      <span className="flex items-center gap-1.5 text-[13px] text-ptext/60 transition-colors group-hover:text-ptext/85">
                        <FilePdf size={16} className="text-red-400" />
                        {claim.document}
                      </span>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-[14px] text-ptext/45"
                    >
                      Keine Forderungen gefunden.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>
    </>
  );
}

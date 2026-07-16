import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="text-[13px] font-medium tracking-wide text-frost/50">
        Fehler 404
      </span>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Diese Seite gibt es nicht.
      </h1>
      <p className="max-w-md text-[17px] font-light leading-relaxed text-frost/60">
        Der Link ist womöglich veraltet oder falsch geschrieben. Zurück zur
        Startseite geht es hier.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-mint px-7 py-3.5 text-[15px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98]"
      >
        Zur Startseite
      </Link>
    </main>
  );
}

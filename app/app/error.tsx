"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="text-[13px] font-medium tracking-wide text-frost/50">
        Fehler
      </span>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Da ist etwas schiefgelaufen.
      </h1>
      <p className="max-w-md text-[17px] font-light leading-relaxed text-frost/60">
        Bitte versuchen Sie es erneut. Besteht das Problem weiter, erreichen Sie
        uns unter info@fortis-inkasso.de.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-mint px-7 py-3.5 text-[15px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98]"
      >
        Erneut versuchen
      </button>
    </main>
  );
}

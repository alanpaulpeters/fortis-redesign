import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function PageHero({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-40 sm:pb-24 sm:pt-48">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-[10%] left-[15%] h-[420px] w-[420px] animate-drift rounded-full bg-mint/[0.07] blur-3xl" />
        <div className="absolute -right-[5%] top-[30%] h-[380px] w-[380px] animate-drift-slow rounded-full bg-navy2/50 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-start gap-6 px-6">
        {eyebrow && (
          <p className="rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-[12px] font-medium uppercase tracking-widest text-mint">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-lg font-light leading-relaxed text-frost/60">
          {lead}
        </p>

        {(primary || secondary) && (
          <div className="mt-2 flex flex-wrap items-center gap-4">
            {primary && (
              <a
                href={primary.href}
                className="inline-flex items-center gap-2 rounded-full bg-mint px-7 py-3.5 text-[15px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98]"
              >
                {primary.label} <ArrowRight size={17} weight="bold" />
              </a>
            )}
            {secondary && (
              <a
                href={secondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-7 py-3.5 text-[15px] font-medium text-frost transition-colors hover:bg-white/[0.08]"
              >
                {secondary.label}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

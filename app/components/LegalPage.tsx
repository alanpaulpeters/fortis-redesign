import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { LegalSection } from "@/content/legal";

export function LegalPage({
  title,
  sections,
}: {
  title: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Nav />
      <main className="pb-24 pt-40 sm:pt-48">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <div className="mt-12 flex flex-col gap-10">
            {sections.map((section, i) => (
              <section key={i}>
                {section.h && (
                  <h2 className="mb-4 text-xl font-semibold text-frost/90">
                    {section.h}
                  </h2>
                )}
                <div className="flex flex-col gap-3">
                  {section.p.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-[14px] font-light leading-relaxed text-frost/60"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

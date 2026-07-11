import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { allPosts, categories } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog – Wissen rund um modernes Inkasso",
  description:
    "Der Fortis Inkasso Blog: über 100 Fachbeiträge zu Forderungsmanagement, digitalem Inkasso, Mahnverfahren, Rechtsfragen und Tipps für Gläubiger und Schuldner.",
  alternates: { canonical: "/blog" },
};

const dateFormat = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function Blog() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Blog"
          title="Wissen rund um modernes Inkasso."
          lead={`${allPosts.length} Fachbeiträge zu Forderungsmanagement, digitalem Inkasso, Rechtsfragen und praktischen Tipps – für Gläubiger und Schuldner.`}
        />

        <section className="border-t border-white/[0.06] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-[12px] font-medium text-frost/70"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-white/[0.07] bg-surface/60 p-6 transition-colors hover:bg-surface"
                >
                  <div className="mb-4 flex items-center gap-3 text-[12px] text-frost/45">
                    <span className="rounded-full bg-mint/10 px-3 py-1 font-medium text-mint">
                      {post.category}
                    </span>
                    <time dateTime={post.date}>
                      {dateFormat.format(new Date(post.date))}
                    </time>
                  </div>
                  <h2 className="text-[16px] font-semibold leading-snug text-frost/90 transition-colors group-hover:text-frost">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-[13px] font-light leading-relaxed text-frost/55">
                    {post.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

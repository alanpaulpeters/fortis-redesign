import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CtaSection } from "@/components/CtaSection";
import { allPosts, getPost, relatedPosts } from "@/content/blog";

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const dateFormat = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = relatedPosts(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            inLanguage: "de-DE",
            keywords: post.keywords.join(", "),
            author: {
              "@type": "Organization",
              name: "Fortis Inkasso GmbH & Co. KG",
              url: "https://fortis-inkasso.de",
            },
            publisher: {
              "@type": "Organization",
              name: "Fortis Inkasso GmbH & Co. KG",
            },
            mainEntityOfPage: `https://fortis-inkasso.de/blog/${post.slug}`,
          }),
        }}
      />
      <Nav />
      <main>
        <article className="pb-24 pt-40 sm:pt-48">
          <div className="mx-auto max-w-3xl px-6">
            <nav aria-label="Breadcrumb" className="mb-8 text-[13px] text-frost/45">
              <Link href="/blog" className="transition-colors hover:text-frost">
                Blog
              </Link>{" "}
              / <span className="text-frost/60">{post.category}</span>
            </nav>

            <div className="mb-6 flex items-center gap-3 text-[13px] text-frost/45">
              <span className="rounded-full bg-mint/10 px-3 py-1 font-medium text-mint">
                {post.category}
              </span>
              <time dateTime={post.date}>
                {dateFormat.format(new Date(post.date))}
              </time>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-8 text-lg font-light leading-relaxed text-frost/70">
              {post.intro}
            </p>

            <div className="mt-12 flex flex-col gap-12">
              {post.sections.map((section) => (
                <section key={section.h}>
                  <h2 className="mb-4 text-xl font-semibold text-frost/90 sm:text-2xl">
                    {section.h}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {section.p.map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-[15px] font-light leading-relaxed text-frost/60"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-mint/20 bg-mint/[0.06] p-7">
              <h2 className="text-lg font-semibold text-frost/90">
                Offene Forderung? Wir holen Ihr Geld zurück.
              </h2>
              <p className="mt-2 text-[14px] font-light leading-relaxed text-frost/60">
                Fortis Inkasso arbeitet auf Erfolgsbasis: Für Gläubiger
                kostenlos, im Erfolgsfall erhalten Sie 100&nbsp;% Ihrer
                Forderung. Digital per WhatsApp und QR-Code, persönlich am
                Telefon und vor Ort.
              </p>
              <Link
                href="/kontakt"
                className="mt-4 inline-flex rounded-full bg-mint px-6 py-2.5 text-[14px] font-semibold text-navy transition-transform hover:brightness-95 active:scale-[0.98]"
              >
                Jetzt beauftragen
              </Link>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="border-t border-line/[0.06] py-20">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="mb-10 text-2xl font-semibold tracking-tight">
                Weitere Beiträge aus {post.category}.
              </h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group rounded-2xl border border-line/[0.07] bg-surface/60 p-6 transition-colors hover:bg-surface"
                  >
                    <time
                      dateTime={r.date}
                      className="text-[12px] text-frost/45"
                    >
                      {dateFormat.format(new Date(r.date))}
                    </time>
                    <h3 className="mt-2 text-[15px] font-semibold leading-snug text-frost/90 transition-colors group-hover:text-frost">
                      {r.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

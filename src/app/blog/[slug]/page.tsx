import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_ARTICLES } from "@/data/blog-articles";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-dvh">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">&#127769;</span>
          <span
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Reverie
          </span>
        </Link>
        <Link href="/blog" className="text-sm" style={{ color: "var(--text-secondary)" }}>
          &larr; Blog
        </Link>
      </nav>

      <article className="max-w-2xl mx-auto px-6 py-12 space-y-6">
        <div>
          <time
            className="text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {new Date(article.date).toLocaleDateString("fr-CA", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <h1
            className="text-2xl font-bold mt-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {article.title}
          </h1>
          <div className="flex gap-2 mt-3">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(99,102,241,0.1)",
                  color: "var(--text-muted)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className="prose prose-invert prose-sm max-w-none leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {article.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return (
                <h2
                  key={i}
                  className="text-base font-semibold mt-6 mb-2"
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {paragraph.replace(/\*\*/g, "")}
                </h2>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} className="list-disc list-inside space-y-1 my-2">
                  {paragraph.split("\n").map((li, j) => (
                    <li key={j}>{li.replace(/^- /, "")}</li>
                  ))}
                </ul>
              );
            }
            if (paragraph.match(/^\d\./)) {
              return (
                <ol key={i} className="list-decimal list-inside space-y-1 my-2">
                  {paragraph.split("\n").map((li, j) => (
                    <li key={j}>{li.replace(/^\d\.\s?/, "")}</li>
                  ))}
                </ol>
              );
            }
            // Handle inline bold
            const parts = paragraph.split(/(\*\*[^*]+\*\*)/);
            return (
              <p key={i} className="my-3">
                {parts.map((part, j) =>
                  part.startsWith("**") ? (
                    <strong key={j} style={{ color: "var(--text-primary)" }}>
                      {part.replace(/\*\*/g, "")}
                    </strong>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="glass p-6 text-center space-y-3 mt-8">
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Explorez vos propres reves avec Reverie
          </p>
          <Link href="/app" className="btn-primary inline-block text-sm">
            Essayer gratuitement
          </Link>
        </div>
      </article>
    </div>
  );
}

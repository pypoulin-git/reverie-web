import Link from "next/link";
import { BLOG_ARTICLES } from "@/data/blog-articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Reverie",
  description:
    "Articles sur l'interpretation des reves, la neuroscience du sommeil, la psychologie jungienne et l'astrologie onirique.",
};

export default function BlogPage() {
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
        <Link href="/app" className="btn-primary text-sm">
          Commencer
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Blog
          </h1>
          <p
            className="text-sm mt-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Explorez le monde des reves : neuroscience, psychologie, symbolisme
            et astrologie.
          </p>
        </div>

        <div className="space-y-4">
          {BLOG_ARTICLES.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`}>
              <article className="glass p-5 space-y-2 hover:border-[rgba(99,102,241,0.3)] transition-colors cursor-pointer">
                <time
                  className="text-[10px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {new Date(article.date).toLocaleDateString("fr-CA", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h2
                  className="font-semibold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {article.title}
                </h2>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {article.excerpt}
                </p>
                <div className="flex gap-2">
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
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

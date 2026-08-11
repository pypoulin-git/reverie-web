import type { NextConfig } from "next";

// Headers sécurité — comble l'audit compliance 2026-06-17 (5 headers absents).
// Pattern aligné sur ordi-guide/next.config.ts.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://cdn.vercel-insights.com;
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  img-src 'self' data: blob: https:;
  media-src 'self' blob:;
  connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vitals.vercel-insights.com https://va.vercel-scripts.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=(self)",
  },
];

// Reverie a été rapatrié dans Natalune : le journal de rêves y est devenu une
// fonctionnalité à part entière (registre gratuit, interprétation IA en
// Premium, enrichie par la carte natale — ce que ce site-ci ne pouvait pas
// faire). Ce dépôt est archivé ; il ne reste en ligne que pour rediriger.
//
// Les quatre articles ont été portés dans Natalune AVEC LEURS SLUGS INTACTS,
// d'où le mapping un-pour-un. Ils sont vérifiés en 200 à la date de ce commit.
const NATALUNE = "https://natalune.com";

const ARTICLES = [
  "pourquoi-on-oublie-ses-reves",
  "reves-les-plus-courants",
  "jung-freud-deux-lectures-reve",
  "lune-natale-influence-reves",
];

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      // Les articles d'abord : ce sont eux qui portent le référencement.
      ...ARTICLES.map((slug) => ({
        source: `/blog/${slug}`,
        destination: `${NATALUNE}/blog/${slug}`,
        permanent: true,
      })),
      { source: "/blog", destination: `${NATALUNE}/blog`, permanent: true },
      // Tout le reste — accueil, /app, /login, pages légales — mène au
      // journal de rêves, qui est ce que les gens venaient chercher.
      { source: "/", destination: `${NATALUNE}/reves`, permanent: true },
      // robots.txt et sitemap.xml sont exclus à dessein : le sitemap continue
      // d'annoncer les anciennes URL, ce qui est précisément ce qui fait
      // repasser un crawler dessus pour qu'il découvre les 308. Rediriger le
      // robots.txt le priverait de ses directives au pire moment.
      {
        source: "/:path((?!robots\\.txt$|sitemap\\.xml$).*)",
        destination: `${NATALUNE}/reves`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

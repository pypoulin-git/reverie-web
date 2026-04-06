import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Reverie",
  description:
    "Journal de reves intelligent. Capturez, interpretez et illustrez vos reves avec l'intelligence artificielle.",
  url: "https://reverie-web.vercel.app",
  applicationCategory: "HealthApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CAD",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-dvh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl">&#127769;</span>
          <span
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Reverie
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/blog"
            className="text-sm hidden sm:block"
            style={{ color: "var(--text-secondary)" }}
          >
            Blog
          </Link>
          <Link href="/login" className="btn-secondary text-sm">
            Connexion
          </Link>
          <Link href="/app" className="btn-primary text-sm">
            Commencer
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-24 text-center space-y-6">
        <div className="text-6xl">&#127769;</div>
        <h1
          className="text-3xl sm:text-5xl font-bold leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Votre journal de reves
          <br />
          <span style={{ color: "var(--accent-indigo)" }}>intelligent</span>
        </h1>
        <p
          className="text-lg max-w-xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Capturez vos reves au reveil, laissez l'IA les structurer, les
          interpreter et les illustrer en aquarelle onirique.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link href="/app" className="btn-primary text-base px-8 py-3">
            Essayer gratuitement
          </Link>
          <Link
            href="#features"
            className="btn-secondary text-base px-6 py-3"
          >
            Decouvrir
          </Link>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-5xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <FeatureCard
          icon="&#9997;&#65039;"
          title="Capture express"
          description="Texte ou voix — l'IA structure votre recit en quelques secondes, extrait les themes, emotions et personnages."
        />
        <FeatureCard
          icon="&#128300;"
          title="Double interpretation"
          description="Ajustez la jauge entre approche scientifique (neurosciences) et spirituelle (archetypes jungiens)."
        />
        <FeatureCard
          icon="&#127912;"
          title="Images oniriques"
          description="Chaque reve genere une aquarelle unique : palette de nuit, contours flous, atmosphere etheree."
        />
        <FeatureCard
          icon="&#128197;"
          title="Journal calendrier"
          description="Visualisez vos reves par jour avec des marqueurs emotionnels colores. Detectez vos patterns."
        />
        <FeatureCard
          icon="&#9734;"
          title="Synergie astrologique"
          description="Liez votre theme natal depuis Ciel Natal pour enrichir les interpretations avec votre Lune et Ascendant."
        />
        <FeatureCard
          icon="&#128274;"
          title="Prive par defaut"
          description="Vos reves sont chiffres et prives. Aucune donnee n'est utilisee pour l'entrainement IA."
        />
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <h2
          className="text-2xl font-bold text-center"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Comment ca marche
        </h2>
        <div className="space-y-4">
          {[
            {
              step: "1",
              title: "Racontez",
              desc: "Au reveil, tapez ou dictez votre reve en quelques mots.",
            },
            {
              step: "2",
              title: "L'IA structure",
              desc: "Titrage, tags, emotions, personnages et lieux sont extraits automatiquement.",
            },
            {
              step: "3",
              title: "Interpretation",
              desc: "Choisissez votre angle : scientifique, spirituel, ou un melange des deux.",
            },
            {
              step: "4",
              title: "Image onirique",
              desc: "Une aquarelle unique est generee, fidele a l'atmosphere de votre reve.",
            },
          ].map((item) => (
            <div key={item.step} className="glass p-4 flex items-start gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                style={{
                  background: "rgba(99,102,241,0.2)",
                  color: "var(--accent-indigo)",
                }}
              >
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center space-y-4">
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Pret a explorer vos reves?
        </h2>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Gratuit pour commencer. Aucune carte requise.
        </p>
        <Link href="/app" className="btn-primary inline-block text-base px-8 py-3">
          Commencer maintenant
        </Link>
      </section>

      {/* Footer */}
      <footer
        className="border-t px-6 py-8"
        style={{ borderColor: "var(--glass-border)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <span>&#127769;</span> Reverie &copy; {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/blog">Blog</Link>
            <a
              href="https://ciel-natal.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ciel Natal &#9734;
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="glass p-5 space-y-3">
      <div className="text-2xl">{icon}</div>
      <h3
        className="font-semibold text-sm"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h3>
      <p
        className="text-xs leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>
    </div>
  );
}

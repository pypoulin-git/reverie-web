import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="text-center space-y-4 px-6">
        <div className="text-6xl">&#127769;</div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Ce reve n'existe pas... encore
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          La page que vous cherchez s'est envolee dans un autre reve.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/" className="btn-primary text-sm">
            Retour a l'accueil
          </Link>
          <Link href="/app" className="btn-secondary text-sm">
            Mon journal
          </Link>
        </div>
      </div>
    </div>
  );
}

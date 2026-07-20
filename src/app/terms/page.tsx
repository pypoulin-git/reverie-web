import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Conditions d'utilisation du service Reverie.",
};

export default function TermsPage() {
  return (
    <div className="min-h-dvh">
      <nav className="flex items-center justify-between px-6 py-4 max-w-3xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="text-xl">&#127769;</span>
          <span className="text-lg font-bold">Reverie</span>
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pb-24 space-y-8">
        <div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Conditions d&apos;utilisation
          </h1>
          <p className="text-sm italic" style={{ color: "var(--text-secondary)" }}>
            Derniere mise a jour : 13 juillet 2026
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">1. Le service</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Reverie est un journal de reves assiste par IA, actuellement en{" "}
            <strong className="text-white">mode demonstration</strong> et
            offert gratuitement. Il permet de capturer, structurer,
            interpreter et illustrer des reves a l&apos;aide de modeles
            d&apos;intelligence artificielle tiers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">2. Nature des interpretations</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Les interpretations, analyses et illustrations generees par IA
            sont fournies a titre de divertissement et de reflexion
            personnelle uniquement. Elles ne constituent en aucun cas un avis
            medical, psychologique ou therapeutique. Si tu vis une detresse
            psychologique, consulte un professionnel de la sante.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">3. Ton compte</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Tu es responsable de la confidentialite de tes identifiants de
            connexion. Tu peux supprimer ton compte et tes donnees a tout
            moment en ecrivant a{" "}
            <a href="mailto:py.poulin@gmail.com" className="underline">
              py.poulin@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">4. Contenu genere</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Le texte, les images et les interpretations generees a partir de
            tes reves t&apos;appartiennent. Reverie ne revendique aucun droit
            de propriete sur ce contenu et ne l&apos;utilise pas pour
            entrainer des modeles d&apos;IA.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">5. Disponibilite du service</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Reverie est en developpement actif et en mode demonstration. Le
            service, ses fonctionnalites et sa disponibilite peuvent changer
            ou etre interrompus sans preavis.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">6. Limitation de responsabilite</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Le service est fourni « tel quel », sans garantie. Dans la mesure
            permise par la loi, l&apos;operateur du service ne peut etre tenu
            responsable des decisions prises sur la base des interpretations
            generees par l&apos;IA.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">7. Contact</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Pour toute question sur ces conditions, ecris a{" "}
            <a href="mailto:py.poulin@gmail.com" className="underline">
              py.poulin@gmail.com
            </a>
            . Voir aussi notre{" "}
            <Link href="/privacy" className="underline">
              politique de confidentialite
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
}

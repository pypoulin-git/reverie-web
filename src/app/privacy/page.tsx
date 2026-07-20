import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialite",
  description:
    "Politique de confidentialite de Reverie - quelles donnees sont collectees, pourquoi, et vos droits.",
};

export default function PrivacyPage() {
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
            Politique de confidentialite
          </h1>
          <p className="text-sm italic" style={{ color: "var(--text-secondary)" }}>
            Derniere mise a jour : 13 juillet 2026
          </p>
          <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
            Reverie est actuellement en <strong>mode demonstration</strong> :
            le compte par defaut est un compte de demo partage, aucune
            inscription reelle n&apos;est requise pour explorer le produit.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">1. Qui sommes-nous</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Reverie est un journal de reves IA opere par{" "}
            <strong className="text-white">Pierre-Yann Poulin</strong>, base
            au Quebec (Canada). Pour toute question relative a tes donnees ou
            pour exercer tes droits (acces, suppression, portabilite), ecris
            a{" "}
            <a href="mailto:py.poulin@gmail.com" className="underline">
              py.poulin@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">2. Ce que nous collectons</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Si tu crees un compte reel (hors mode demo), nous stockons :
          </p>
          <ul
            className="list-disc list-inside space-y-1"
            style={{ color: "var(--text-secondary)" }}
          >
            <li>Ton adresse courriel (connexion Supabase Auth).</li>
            <li>
              Le contenu de tes reves : texte saisi ou transcrit, structuration
              et interpretation generees par IA, images generees.
            </li>
            <li>
              Si tu utilises la capture vocale : l&apos;enregistrement audio
              est envoye a Deepgram pour transcription puis n&apos;est pas
              conserve par ce sous-traitant au-dela du traitement.
            </li>
          </ul>
          <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
            <strong className="text-white">Base legale :</strong> execution
            du contrat (Loi 25 art. 12). Aucune donnee de paiement
            n&apos;est collectee — le service est gratuit.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">3. Sous-traitants</h2>
          <ul
            className="list-disc list-inside space-y-2"
            style={{ color: "var(--text-secondary)" }}
          >
            <li>
              <strong className="text-white">Supabase</strong> — base de
              donnees, authentification et stockage. Recoit : email, contenu
              des reves.{" "}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                supabase.com/privacy
              </a>
            </li>
            <li>
              <strong className="text-white">Anthropic (Claude)</strong> —
              structuration et interpretation des reves. Recoit : le texte de
              tes reves.{" "}
              <a
                href="https://www.anthropic.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                anthropic.com/legal/privacy
              </a>
            </li>
            <li>
              <strong className="text-white">fal.ai</strong> — generation
              d&apos;images illustrant tes reves. Recoit : le texte de tes
              reves (prompt d&apos;image).{" "}
              <a
                href="https://fal.ai/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                fal.ai/privacy
              </a>
            </li>
            <li>
              <strong className="text-white">Deepgram</strong> — transcription
              audio si tu utilises la capture vocale. Recoit :
              l&apos;enregistrement audio de ta voix.{" "}
              <a
                href="https://deepgram.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                deepgram.com/privacy-policy
              </a>
            </li>
            <li>
              <strong className="text-white">Vercel</strong> — hebergement du
              site et journaux serveur.{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                vercel.com/legal/privacy-policy
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">4. Cookies</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Uniquement des cookies de session Supabase, strictement
            necessaires a la connexion. Aucun cookie publicitaire, aucun
            traceur tiers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">5. Tes droits</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Sous la Loi 25 (Quebec), tu as le droit d&apos;acces, de
            rectification, de suppression et de portabilite de tes donnees.
            Pour exercer un droit, ecris a{" "}
            <a href="mailto:py.poulin@gmail.com" className="underline">
              py.poulin@gmail.com
            </a>
            . Reponse sous 30 jours. En cas de differend, tu peux porter
            plainte aupres de la{" "}
            <a
              href="https://www.cai.gouv.qc.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Commission d&apos;acces a l&apos;information du Quebec
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">6. Conservation</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Compte et reves : conserves tant que le compte est actif, effaces
            sous 30 jours apres une demande de suppression. Logs serveur
            Vercel : 30 jours.
          </p>
        </section>
      </main>
    </div>
  );
}

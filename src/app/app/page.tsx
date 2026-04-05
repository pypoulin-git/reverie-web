"use client";

import Link from "next/link";
import { useDreams } from "@/hooks/useDreams";
import { useAuth } from "@/hooks/useAuth";
import DreamCard from "@/components/DreamCard";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: dreams, isLoading } = useDreams();

  const today = format(new Date(), "EEEE d MMMM", { locale: fr });
  const displayName =
    user?.user_metadata?.display_name || user?.email?.split("@")[0] || "Reveur";

  const todayDream = dreams?.find(
    (d) => d.dream_date === new Date().toISOString().split("T")[0]
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1
          className="text-xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          &#127769; Reverie
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Bonjour {displayName} — {today}
        </p>
      </div>

      {/* Today CTA */}
      {!todayDream && (
        <Link href="/app/dream/new">
          <div className="glass p-6 text-center space-y-3 hover:border-[rgba(99,102,241,0.3)] transition-colors cursor-pointer accent-glow">
            <div className="text-3xl">&#9729;&#65039;</div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Votre nuit a des secrets a reveler...
            </p>
            <span className="btn-primary inline-block text-sm">
              Consigner mon reve
            </span>
          </div>
        </Link>
      )}

      {/* Recent dreams */}
      <div>
        <h2
          className="text-sm font-semibold mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          Reves recents
        </h2>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-4 animate-shimmer h-24" />
            ))}
          </div>
        ) : dreams && dreams.length > 0 ? (
          <div className="space-y-3">
            {dreams.slice(0, 5).map((dream) => (
              <DreamCard key={dream.id} dream={dream} />
            ))}
          </div>
        ) : (
          <div className="glass p-8 text-center">
            <p
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Aucun reve consigne. Commencez votre journal onirique!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

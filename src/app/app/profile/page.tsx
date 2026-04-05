"use client";

import { useAuth } from "@/hooks/useAuth";
import { useDreams } from "@/hooks/useDreams";
import { DEMO_MODE } from "@/lib/constants";

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { data: dreams } = useDreams();

  const displayName =
    user?.user_metadata?.display_name || user?.email?.split("@")[0] || "Reveur";
  const initial = displayName.charAt(0).toUpperCase();
  const dreamCount = dreams?.length || 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1
        className="text-lg font-bold"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Profil
      </h1>

      {/* Avatar + Info */}
      <div className="glass p-6 flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
          style={{
            background: "rgba(99,102,241,0.2)",
            color: "var(--accent-indigo)",
          }}
        >
          {initial}
        </div>
        <div>
          <h2
            className="font-semibold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {displayName}
          </h2>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {user?.email || "Mode demo"}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Reves consignes" value={String(dreamCount)} />
        <StatCard
          label="Depuis"
          value={
            dreams && dreams.length > 0
              ? new Date(dreams[dreams.length - 1].dream_date).toLocaleDateString("fr-CA", { month: "short", year: "numeric" })
              : "—"
          }
        />
      </div>

      {/* Ciel Natal link placeholder */}
      <div className="glass p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">&#9734;</span>
          <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
            Theme natal
          </h3>
        </div>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Liez votre theme natal depuis Ciel Natal pour enrichir vos
          interpretations oniriques avec le contexte astrologique de votre Lune,
          Soleil et Ascendant.
        </p>
        <a
          href="https://ciel-natal.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center gap-2 text-xs"
        >
          Calculer mon theme natal &rarr;
        </a>
      </div>

      {/* Settings */}
      {DEMO_MODE && (
        <div
          className="glass-subtle p-3 text-xs text-center"
          style={{ color: "var(--text-muted)" }}
        >
          Mode demo actif — connectez Supabase pour la version complete
        </div>
      )}

      {/* Sign out */}
      <button
        onClick={signOut}
        className="btn-secondary w-full text-sm"
        style={{ color: "#ef4444" }}
      >
        Se deconnecter
      </button>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-subtle p-4 text-center">
      <div
        className="text-xl font-bold font-mono"
        style={{ color: "var(--accent-indigo)" }}
      >
        {value}
      </div>
      <div
        className="text-[10px] mt-1"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
    </div>
  );
}

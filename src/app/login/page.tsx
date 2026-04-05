"use client";

import { createClient } from "@/lib/supabase-browser";
import { DEMO_MODE } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (DEMO_MODE) {
    router.replace("/app");
    return null;
  }

  const signInWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError("Une erreur est survenue. Reessayez.");
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <div className="glass w-full max-w-sm p-8 space-y-6 animate-fade-in">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="text-4xl">&#127769;</div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Reverie
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Votre journal de reves intelligent
          </p>
        </div>

        {/* Google OAuth */}
        <button
          onClick={signInWithGoogle}
          className="btn-secondary w-full flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continuer avec Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div
            className="flex-1 h-px"
            style={{ background: "var(--glass-border)" }}
          />
          <span
            className="text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            ou
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--glass-border)" }}
          />
        </div>

        {/* Magic Link */}
        {sent ? (
          <div className="text-center space-y-2">
            <div className="text-2xl">&#9993;&#65039;</div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Un lien magique a ete envoye a <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <form onSubmit={signInWithEmail} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="input-field"
            />
            <button type="submit" className="btn-primary w-full">
              Recevoir un lien magique
            </button>
          </form>
        )}

        {error && (
          <p className="text-sm text-center" style={{ color: "#ef4444" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

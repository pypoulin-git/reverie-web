"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Providers from "@/components/Providers";

const NAV_ITEMS = [
  { href: "/app", label: "Accueil", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/app/journal", label: "Journal", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { href: "/app/profile", label: "Profil", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Providers>
      <div className="flex flex-col min-h-dvh">
        {/* Main content */}
        <main className="flex-1 pb-20 md:pb-0 md:pl-64">
          <div className="max-w-2xl mx-auto px-4 py-6">{children}</div>
        </main>

        {/* Desktop sidebar */}
        <aside
          className="hidden md:flex fixed left-0 top-0 h-full w-64 flex-col p-6 gap-2 z-40"
          style={{
            background: "var(--bg-surface)",
            borderRight: "1px solid var(--glass-border)",
          }}
        >
          <Link href="/app" className="flex items-center gap-2 mb-8">
            <span className="text-2xl">&#127769;</span>
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Reverie
            </span>
          </Link>

          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors"
                style={{
                  background: active
                    ? "rgba(99, 102, 241, 0.15)"
                    : "transparent",
                  color: active
                    ? "var(--accent-indigo)"
                    : "var(--text-secondary)",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={item.icon}
                  />
                </svg>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}

          <div className="mt-auto">
            <Link
              href="/app/dream/new"
              className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
            >
              <span>+</span> Nouveau reve
            </Link>
          </div>
        </aside>

        {/* Mobile bottom nav */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around py-2 safe-area-bottom"
          style={{
            background: "rgba(10, 14, 26, 0.9)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid var(--glass-border)",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 px-4 py-1"
                style={{
                  color: active
                    ? "var(--accent-indigo)"
                    : "var(--text-muted)",
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={item.icon}
                  />
                </svg>
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}

          {/* Floating CTA */}
          <Link
            href="/app/dream/new"
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl accent-glow"
            style={{ background: "var(--accent-indigo)" }}
          >
            +
          </Link>
        </nav>
      </div>
    </Providers>
  );
}

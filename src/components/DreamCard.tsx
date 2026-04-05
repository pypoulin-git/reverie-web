"use client";

import Link from "next/link";
import type { Dream } from "@/types/dream";
import { EMOTIONS } from "@/lib/constants";
import type { EmotionKey } from "@/lib/constants";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function DreamCard({ dream }: { dream: Dream }) {
  const snippet = (dream.structured_text || dream.raw_text).slice(0, 120);

  return (
    <Link href={`/app/dream/${dream.id}`}>
      <article className="glass p-4 space-y-2 hover:border-[rgba(99,102,241,0.3)] transition-colors cursor-pointer">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-semibold text-sm leading-snug"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {dream.title || "Sans titre"}
          </h3>
          <time
            className="text-[10px] shrink-0"
            style={{ color: "var(--text-muted)" }}
          >
            {format(new Date(dream.dream_date), "d MMM", { locale: fr })}
          </time>
        </div>

        <p
          className="text-xs leading-relaxed line-clamp-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {snippet}...
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {dream.emotions.slice(0, 3).map((e) => {
            const emotion = EMOTIONS[e as EmotionKey];
            if (!emotion) return null;
            return (
              <span
                key={e}
                className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  background: `${emotion.color}20`,
                  color: emotion.color,
                }}
              >
                {emotion.icon} {emotion.label}
              </span>
            );
          })}

          {dream.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(99, 102, 241, 0.1)",
                color: "var(--text-muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}

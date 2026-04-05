"use client";

import { use, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDream } from "@/hooks/useDreams";
import { interpretDream, generateImage } from "@/lib/api";
import { EMOTIONS, DEMO_MODE } from "@/lib/constants";
import type { EmotionKey } from "@/lib/constants";
import type { InterpretationContent } from "@/types/dream";
import { DEMO_INTERPRETATIONS } from "@/lib/demo-data";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function DreamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: dream, isLoading } = useDream(id);

  const [gauge, setGauge] = useState(0.5);
  const [interpretation, setInterpretation] =
    useState<InterpretationContent | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingInterpretation, setLoadingInterpretation] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  // Load demo interpretation
  useEffect(() => {
    if (DEMO_MODE && id.startsWith("demo-")) {
      setInterpretation(DEMO_INTERPRETATIONS[id] || null);
    }
  }, [id]);

  const fetchInterpretation = useCallback(async () => {
    if (DEMO_MODE || !dream) return;
    setLoadingInterpretation(true);
    try {
      const result = await interpretDream(dream.id, gauge);
      setInterpretation(result);
    } catch (err) {
      console.error("Interpretation error:", err);
    } finally {
      setLoadingInterpretation(false);
    }
  }, [dream, gauge]);

  const fetchImage = useCallback(async () => {
    if (DEMO_MODE || !dream) return;
    setLoadingImage(true);
    try {
      const result = await generateImage(dream.id);
      setImageUrl(result.public_url);
    } catch (err) {
      console.error("Image generation error:", err);
    } finally {
      setLoadingImage(false);
    }
  }, [dream]);

  // Auto-fetch interpretation on first load
  useEffect(() => {
    if (dream && !interpretation && !DEMO_MODE) {
      fetchInterpretation();
    }
  }, [dream, interpretation, fetchInterpretation]);

  // Auto-generate image on first load
  useEffect(() => {
    if (dream && !imageUrl && !DEMO_MODE) {
      fetchImage();
    }
  }, [dream, imageUrl, fetchImage]);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="glass animate-shimmer h-64 rounded-2xl" />
        <div className="glass animate-shimmer h-8 w-48" />
        <div className="glass animate-shimmer h-32" />
      </div>
    );
  }

  if (!dream) {
    return (
      <div className="text-center py-16">
        <p style={{ color: "var(--text-muted)" }}>Reve introuvable.</p>
      </div>
    );
  }

  const displayText = (key: keyof InterpretationContent) => {
    if (!interpretation) return null;
    if (gauge < 0.33) return interpretation.factual;
    if (gauge > 0.66) return interpretation.spiritual;
    return interpretation[key] || interpretation.blended;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="text-sm flex items-center gap-1"
        style={{ color: "var(--text-muted)" }}
      >
        &larr; Retour
      </button>

      {/* Image */}
      {imageUrl ? (
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={imageUrl}
            alt={dream.title || "Image du reve"}
            className="w-full aspect-[3/4] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-transparent to-transparent" />
        </div>
      ) : loadingImage ? (
        <div className="glass animate-shimmer h-64 rounded-2xl flex items-center justify-center">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Generation de l'image...
          </p>
        </div>
      ) : DEMO_MODE ? (
        <div
          className="h-48 rounded-2xl flex items-center justify-center text-4xl"
          style={{
            background:
              "linear-gradient(135deg, var(--bg-card), var(--bg-elevated))",
          }}
        >
          &#127769;
        </div>
      ) : null}

      {/* Title + Date */}
      <div>
        <h1
          className="text-xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {dream.title || "Sans titre"}
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          {format(new Date(dream.dream_date), "EEEE d MMMM yyyy", {
            locale: fr,
          })}
        </p>
      </div>

      {/* Emotions + Tags */}
      <div className="flex gap-2 flex-wrap">
        {dream.emotions.map((e) => {
          const emotion = EMOTIONS[e as EmotionKey];
          if (!emotion) return null;
          return (
            <span
              key={e}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
              style={{
                background: `${emotion.color}20`,
                color: emotion.color,
              }}
            >
              {emotion.icon} {emotion.label}
            </span>
          );
        })}
        {dream.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(99,102,241,0.1)",
              color: "var(--text-muted)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Dream text */}
      <div className="glass p-4">
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {dream.structured_text || dream.raw_text}
        </p>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-3 gap-2">
        {dream.emotional_intensity && (
          <MetaChip
            label="Intensite"
            value={`${dream.emotional_intensity}/10`}
          />
        )}
        {dream.lucidity_level && (
          <MetaChip label="Lucidite" value={`${dream.lucidity_level}/5`} />
        )}
        {dream.sleep_quality && (
          <MetaChip label="Sommeil" value={`${dream.sleep_quality}/5`} />
        )}
      </div>

      {/* Interpretation Gauge */}
      <div className="space-y-3">
        <h2
          className="text-sm font-semibold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Interpretation
        </h2>

        <div className="space-y-1">
          <div className="flex justify-between text-[10px]">
            <span style={{ color: "var(--text-muted)" }}>Factuel</span>
            <span style={{ color: "var(--text-muted)" }}>Spirituel</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={gauge}
            onChange={(e) => setGauge(Number(e.target.value))}
            onMouseUp={fetchInterpretation}
            onTouchEnd={fetchInterpretation}
            className="w-full accent-[var(--accent-indigo)]"
          />
        </div>

        {loadingInterpretation ? (
          <div className="glass animate-shimmer h-24" />
        ) : interpretation ? (
          <div className="glass p-4">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {displayText("blended")}
            </p>
          </div>
        ) : null}
      </div>

      {/* Characters + Places */}
      {(dream.characters.length > 0 || dream.places.length > 0) && (
        <div className="grid grid-cols-2 gap-3">
          {dream.characters.length > 0 && (
            <div className="glass-subtle p-3">
              <h3
                className="text-[10px] font-medium mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                Personnages
              </h3>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {dream.characters.join(", ")}
              </p>
            </div>
          )}
          {dream.places.length > 0 && (
            <div className="glass-subtle p-3">
              <h3
                className="text-[10px] font-medium mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                Lieux
              </h3>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {dream.places.join(", ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-subtle p-2.5 text-center">
      <div
        className="text-[10px]"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
      <div
        className="text-sm font-mono font-medium"
        style={{ color: "var(--accent-indigo)" }}
      >
        {value}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateDream } from "@/hooks/useDreams";
import { processDream } from "@/lib/api";
import { DEMO_MODE, EMOTIONS } from "@/lib/constants";
import type { EmotionKey } from "@/lib/constants";

type Step = "input" | "clarify" | "metadata" | "processing" | "done";

interface ProcessedDream {
  title: string;
  structured_text: string;
  tags: string[];
  emotions: string[];
  characters: string[];
  places: string[];
  clarification_questions: string[];
}

export default function NewDreamPage() {
  const router = useRouter();
  const createDream = useCreateDream();

  const [step, setStep] = useState<Step>("input");
  const [rawText, setRawText] = useState("");
  const [processed, setProcessed] = useState<ProcessedDream | null>(null);
  const [clarificationAnswers, setClarificationAnswers] = useState<string[]>(
    []
  );
  const [emotionalIntensity, setEmotionalIntensity] = useState(5);
  const [lucidityLevel, setLucidityLevel] = useState(1);
  const [sleepQuality, setSleepQuality] = useState(3);
  const [error, setError] = useState("");

  const handleProcess = async () => {
    if (!rawText.trim()) return;
    setStep("processing");
    setError("");

    try {
      if (DEMO_MODE) {
        // Simulate processing
        await new Promise((r) => setTimeout(r, 1500));
        setProcessed({
          title: "Reve de demonstration",
          structured_text: rawText,
          tags: ["reve", "demo"],
          emotions: ["wonder"],
          characters: [],
          places: [],
          clarification_questions: [],
        });
        setStep("metadata");
        return;
      }

      const result = await processDream(rawText);
      setProcessed(result);

      if (
        result.clarification_questions &&
        result.clarification_questions.length > 0
      ) {
        setClarificationAnswers(
          new Array(result.clarification_questions.length).fill("")
        );
        setStep("clarify");
      } else {
        setStep("metadata");
      }
    } catch (err) {
      setError("Erreur lors du traitement. Reessayez.");
      setStep("input");
      console.error(err);
    }
  };

  const handleClarify = async () => {
    // Re-process with additional context
    const enrichedText =
      rawText +
      "\n\n" +
      (processed?.clarification_questions || [])
        .map((q, i) => `${q} ${clarificationAnswers[i]}`)
        .filter((_, i) => clarificationAnswers[i])
        .join("\n");

    setRawText(enrichedText);
    setStep("processing");

    try {
      if (DEMO_MODE) {
        await new Promise((r) => setTimeout(r, 1000));
        setStep("metadata");
        return;
      }
      const result = await processDream(enrichedText);
      setProcessed(result);
      setStep("metadata");
    } catch {
      setError("Erreur lors du traitement.");
      setStep("input");
    }
  };

  const handleSave = async () => {
    if (!processed) return;
    setStep("processing");

    try {
      const dream = await createDream.mutateAsync({
        raw_text: rawText,
        title: processed.title,
        structured_text: processed.structured_text,
        tags: processed.tags,
        emotions: processed.emotions,
        characters: processed.characters,
        places: processed.places,
        emotional_intensity: emotionalIntensity,
        lucidity_level: lucidityLevel,
        sleep_quality: sleepQuality,
        dream_date: new Date().toISOString().split("T")[0],
      });

      router.push(`/app/dream/${dream.id}`);
    } catch {
      setError("Erreur lors de la sauvegarde.");
      setStep("metadata");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1
          className="text-lg font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          &#9729;&#65039; Nouveau reve
        </h1>
        <button
          onClick={() => router.back()}
          className="text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Annuler
        </button>
      </div>

      {error && (
        <div
          className="glass-subtle p-3 text-sm"
          style={{ color: "#ef4444", borderColor: "rgba(239,68,68,0.3)" }}
        >
          {error}
        </div>
      )}

      {/* Step: Input */}
      {step === "input" && (
        <div className="space-y-4">
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Racontez votre reve... Pas besoin d'etre precis, l'IA vous aidera a
            structurer.
          </p>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="J'etais dans un endroit etrange..."
            rows={8}
            autoFocus
            className="input-field resize-none"
          />
          <button
            onClick={handleProcess}
            disabled={!rawText.trim()}
            className="btn-primary w-full disabled:opacity-40"
          >
            Analyser mon reve
          </button>
        </div>
      )}

      {/* Step: Clarify */}
      {step === "clarify" && processed && (
        <div className="space-y-4">
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            L'IA a quelques questions pour mieux comprendre votre reve :
          </p>
          {processed.clarification_questions.map((question, i) => (
            <div key={i} className="space-y-2">
              <label
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {question}
              </label>
              <input
                type="text"
                value={clarificationAnswers[i] || ""}
                onChange={(e) => {
                  const next = [...clarificationAnswers];
                  next[i] = e.target.value;
                  setClarificationAnswers(next);
                }}
                className="input-field"
                placeholder="(optionnel)"
              />
            </div>
          ))}
          <div className="flex gap-3">
            <button onClick={handleClarify} className="btn-primary flex-1">
              Continuer
            </button>
            <button
              onClick={() => setStep("metadata")}
              className="btn-secondary flex-1"
            >
              Passer
            </button>
          </div>
        </div>
      )}

      {/* Step: Metadata */}
      {step === "metadata" && processed && (
        <div className="space-y-5">
          {/* Preview */}
          <div className="glass p-4 space-y-2">
            <h3
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {processed.title}
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {processed.structured_text}
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {processed.emotions.map((e) => {
                const em = EMOTIONS[e as EmotionKey];
                if (!em) return null;
                return (
                  <span
                    key={e}
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: `${em.color}20`, color: em.color }}
                  >
                    {em.icon} {em.label}
                  </span>
                );
              })}
              {processed.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(99,102,241,0.1)",
                    color: "var(--text-muted)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <SliderField
            label="Intensite emotionnelle"
            value={emotionalIntensity}
            onChange={setEmotionalIntensity}
            min={1}
            max={10}
          />
          <SliderField
            label="Lucidite"
            value={lucidityLevel}
            onChange={setLucidityLevel}
            min={1}
            max={5}
          />
          <SliderField
            label="Qualite du sommeil"
            value={sleepQuality}
            onChange={setSleepQuality}
            min={1}
            max={5}
          />

          <button onClick={handleSave} className="btn-primary w-full">
            Sauvegarder et generer l'image
          </button>
        </div>
      )}

      {/* Step: Processing */}
      {step === "processing" && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-12 h-12 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "var(--accent-indigo)", borderTopColor: "transparent" }} />
          <p
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            L'IA explore votre reve...
          </p>
        </div>
      )}
    </div>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <label
          className="text-xs font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </label>
        <span
          className="text-xs font-mono"
          style={{ color: "var(--accent-indigo)" }}
        >
          {value}/{max}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--accent-indigo)]"
      />
    </div>
  );
}

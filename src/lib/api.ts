export async function processDream(rawText: string) {
  const res = await fetch("/api/process-dream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ raw_text: rawText }),
  });
  if (!res.ok) throw new Error("Failed to process dream");
  return res.json();
}

export async function interpretDream(dreamId: string, gaugeValue: number) {
  const res = await fetch("/api/interpret-dream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dream_id: dreamId, gauge_value: gaugeValue }),
  });
  if (!res.ok) throw new Error("Failed to interpret dream");
  return res.json();
}

export async function generateImage(dreamId: string) {
  const res = await fetch("/api/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dream_id: dreamId }),
  });
  if (!res.ok) throw new Error("Failed to generate image");
  return res.json();
}

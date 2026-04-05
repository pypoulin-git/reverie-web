const STYLE_PREFIX =
  "dreamy watercolor painting, soft blurry edges, ethereal atmosphere, night palette with deep blues violets and warm gold accents, vignette effect, depth of field, delicate brushstrokes, luminous highlights";

const NEGATIVE_PROMPT =
  "text, watermark, signature, logo, ugly, deformed, disfigured, blurry face, realistic photo, sharp edges, neon colors, bright daylight, cartoon, anime, 3d render";

const emotionToMood: Record<string, string> = {
  joy: "warm golden light, radiant",
  anxiety: "swirling shadows, tension",
  wonder: "sparkling stars, vast expanses",
  sadness: "gentle rain, melancholy blue tones",
  fear: "dark corridors, mysterious shadows",
  peace: "calm waters, soft moonlight",
  love: "warm rose tones, gentle embrace",
  anger: "stormy skies, intense warm tones",
};

export function buildImagePrompt(
  structuredText: string,
  tags: string[],
  emotions: string[],
  places: string[]
): { prompt: string; negative_prompt: string } {
  const visualElements: string[] = [];

  if (places.length > 0) {
    visualElements.push(places.slice(0, 2).join(" and "));
  }

  emotions.forEach((e) => {
    if (emotionToMood[e]) {
      visualElements.push(emotionToMood[e]);
    }
  });

  if (tags.length > 0) {
    visualElements.push(tags.slice(0, 3).join(", "));
  }

  const sceneSnippet = structuredText.replace(/['"]/g, "").slice(0, 150).trim();

  const prompt = `${STYLE_PREFIX}, ${visualElements.join(", ")}, ${sceneSnippet}`;

  return {
    prompt: prompt.slice(0, 500),
    negative_prompt: NEGATIVE_PROMPT,
  };
}

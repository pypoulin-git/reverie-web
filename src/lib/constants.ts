export const EMOTIONS = {
  joy: { color: "#fbbf24", icon: "\u2600\ufe0f", label: "Joie" },
  anxiety: { color: "#ef4444", icon: "\u26a1", label: "Anxiete" },
  wonder: { color: "#6366f1", icon: "\u2728", label: "Emerveillement" },
  sadness: { color: "#3b82f6", icon: "\ud83d\udca7", label: "Tristesse" },
  fear: { color: "#8b5cf6", icon: "\ud83d\udc41", label: "Peur" },
  peace: { color: "#34d399", icon: "\ud83c\udf43", label: "Paix" },
  love: { color: "#f472b6", icon: "\ud83d\udc9c", label: "Amour" },
  anger: { color: "#fb923c", icon: "\ud83d\udd25", label: "Colere" },
} as const;

export type EmotionKey = keyof typeof EMOTIONS;

export const DEMO_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL;

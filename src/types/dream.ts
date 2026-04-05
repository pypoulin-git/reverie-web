export interface Dream {
  id: string;
  user_id: string;
  title: string | null;
  raw_text: string;
  structured_text: string | null;
  voice_audio_path: string | null;
  emotional_intensity: number | null;
  lucidity_level: number | null;
  sleep_quality: number | null;
  wake_time: string | null;
  dream_date: string;
  tags: string[];
  emotions: string[];
  characters: string[];
  places: string[];
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface Interpretation {
  id: string;
  dream_id: string;
  gauge_value: number;
  content: InterpretationContent;
  model_used: string;
  created_at: string;
}

export interface InterpretationContent {
  spiritual: string;
  factual: string;
  blended: string;
}

export interface DreamImage {
  id: string;
  dream_id: string;
  storage_path: string;
  prompt_used: string | null;
  style: string;
  width: number;
  height: number;
  created_at: string;
}

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  interpretation_gauge: number;
  preferred_style: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface NatalChart {
  id: string;
  user_id: string;
  birth_date: string;
  birth_time: string | null;
  birth_lat: number;
  birth_lon: number;
  birth_city: string | null;
  sun_sign: string | null;
  moon_sign: string | null;
  ascendant_sign: string | null;
  planets: Record<string, unknown> | null;
  houses: Record<string, unknown> | null;
  created_at: string;
}

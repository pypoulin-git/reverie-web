import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  INTERPRET_DREAM_SYSTEM,
  buildInterpretDreamPrompt,
} from "@/lib/prompts/interpret-dream";

export async function POST(request: Request) {
  try {
    const { dream_id, gauge_value } = await request.json();

    if (!dream_id) {
      return NextResponse.json(
        { error: "dream_id required" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch dream from DB
    const { data: dream, error: dbError } = await supabase
      .from("dreams")
      .select("structured_text, raw_text, tags, emotions, characters, places, user_id")
      .eq("id", dream_id)
      .single();

    if (dbError || !dream) {
      throw new Error(`Dream not found: ${dbError?.message}`);
    }

    const text = dream.structured_text || dream.raw_text;
    const gauge = gauge_value ?? 0.5;

    // Check if user has a natal chart for astro context
    let astroContext: { moonSign?: string; sunSign?: string; ascendant?: string } | undefined;
    const { data: chart } = await supabase
      .from("natal_charts")
      .select("moon_sign, sun_sign, ascendant_sign")
      .eq("user_id", dream.user_id)
      .single();

    if (chart) {
      astroContext = {
        moonSign: chart.moon_sign ?? undefined,
        sunSign: chart.sun_sign ?? undefined,
        ascendant: chart.ascendant_sign ?? undefined,
      };
    }

    const userPrompt = buildInterpretDreamPrompt(
      text,
      dream.tags || [],
      dream.emotions || [],
      dream.characters || [],
      dream.places || [],
      gauge,
      astroContext
    );

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6-20250514",
        max_tokens: 1024,
        system: INTERPRET_DREAM_SYSTEM,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Anthropic API error: ${err}`);
    }

    const result = await response.json();
    const parsed = JSON.parse(result.content?.[0]?.text ?? "{}");

    // Save interpretation to DB
    await supabase.from("interpretations").insert({
      dream_id,
      gauge_value: gauge,
      content: parsed,
      model_used: "claude-sonnet-4-6-20250514",
    });

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

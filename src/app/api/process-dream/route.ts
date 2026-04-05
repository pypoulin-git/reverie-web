import { NextResponse } from "next/server";
import {
  STRUCTURE_DREAM_SYSTEM,
  buildStructureDreamPrompt,
} from "@/lib/prompts/structure-dream";

export async function POST(request: Request) {
  try {
    const { raw_text } = await request.json();

    if (!raw_text) {
      return NextResponse.json(
        { error: "raw_text field required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: STRUCTURE_DREAM_SYSTEM,
        messages: [
          { role: "user", content: buildStructureDreamPrompt(raw_text) },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Anthropic API error: ${err}`);
    }

    const result = await response.json();
    const text = result.content?.[0]?.text ?? "{}";
    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

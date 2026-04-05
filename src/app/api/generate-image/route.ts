import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildImagePrompt } from "@/lib/prompts/image-prompt";

export async function POST(request: Request) {
  try {
    const { dream_id } = await request.json();

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

    // Fetch dream
    const { data: dream, error: dbError } = await supabase
      .from("dreams")
      .select("id, user_id, structured_text, raw_text, tags, emotions, places")
      .eq("id", dream_id)
      .single();

    if (dbError || !dream) {
      throw new Error(`Dream not found: ${dbError?.message}`);
    }

    // Build prompt
    const { prompt, negative_prompt } = buildImagePrompt(
      dream.structured_text || dream.raw_text,
      dream.tags || [],
      dream.emotions || [],
      dream.places || []
    );

    // Call fal.ai SDXL
    const falResponse = await fetch("https://queue.fal.run/fal-ai/fast-sdxl", {
      method: "POST",
      headers: {
        Authorization: `Key ${process.env.FAL_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        negative_prompt,
        image_size: { width: 768, height: 1024 },
        num_inference_steps: 30,
        guidance_scale: 7.5,
        num_images: 1,
        enable_safety_checker: true,
      }),
    });

    if (!falResponse.ok) {
      const err = await falResponse.text();
      throw new Error(`fal.ai error: ${err}`);
    }

    const falResult = await falResponse.json();
    const imageUrl = falResult.images?.[0]?.url;

    if (!imageUrl) {
      throw new Error("No image URL in fal.ai response");
    }

    // Download image
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();

    // Upload to Supabase Storage
    const storagePath = `${dream.user_id}/${dream_id}/image.webp`;
    const { error: uploadError } = await supabase.storage
      .from("dream-images")
      .upload(storagePath, imageBuffer, {
        contentType: "image/webp",
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Storage upload error: ${uploadError.message}`);
    }

    // Save image record
    await supabase.from("dream_images").insert({
      dream_id,
      storage_path: storagePath,
      prompt_used: prompt,
      style: "watercolor",
      model_used: "fast-sdxl",
      width: 768,
      height: 1024,
    });

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("dream-images")
      .getPublicUrl(storagePath);

    return NextResponse.json({
      storage_path: storagePath,
      public_url: urlData.publicUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

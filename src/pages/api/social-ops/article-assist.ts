import type { APIRoute } from "astro";

type GeminiPart = {
  text?: string;
};

type GeminiCandidate = {
  content?: {
    parts?: GeminiPart[];
  };
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const mode = body?.mode === "quick" ? "quick" : "full";

    if (!prompt) {
      return new Response(JSON.stringify({ error: "PROMPT_REQUIRED" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = import.meta.env.GEMINI_API_KEY || import.meta.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY_MISSING" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }

    const model = import.meta.env.GEMINI_FLASH_MODEL || "gemini-2.5-flash";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: mode === "quick" ? 0.4 : 0.6,
            topP: 0.9,
            maxOutputTokens: mode === "quick" ? 2500 : 6000,
          },
        }),
      },
    );

    const result = await response.json();
    if (!response.ok) {
      console.error("Gemini Flash API 錯誤：", result);
      return new Response(JSON.stringify({ error: "GEMINI_API_FAILED", detail: result?.error?.message || "" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const content = Array.isArray(result?.candidates)
      ? result.candidates
          .map((candidate: GeminiCandidate) =>
            Array.isArray(candidate?.content?.parts)
              ? candidate.content.parts.map((part) => part?.text || "").join("")
              : "",
          )
          .join("\n\n")
          .trim()
      : "";

    if (!content) {
      return new Response(JSON.stringify({ error: "GEMINI_EMPTY_RESPONSE" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        mode,
        content,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Gemini Flash 內容助手失敗：", error);
    return new Response(JSON.stringify({ error: "ARTICLE_ASSIST_FAILED" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

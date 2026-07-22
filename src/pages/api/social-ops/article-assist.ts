import type { APIRoute } from "astro";

type GeminiPart = {
  text?: string;
};

type GeminiCandidate = {
  content?: {
    parts?: GeminiPart[];
  };
};

function normalizeArticleAssistContent(content: string) {
  const trimmed = content.trim();
  if (!trimmed) return "";

  const markers = [
    "0. 【決題摘要】",
    "0.【決題摘要】",
    "【決題摘要】",
    "0. 【決策摘要】",
    "0.【決策摘要】",
    "【決策摘要】",
    "0. 【判題結論】",
    "0.【判題結論】",
    "【判題結論】",
    "A. 【定稿判斷】",
    "A.【定稿判斷】",
    "【定稿判斷】",
  ];

  const offsets = markers
    .map((marker) => trimmed.indexOf(marker))
    .filter((index) => index >= 0);

  if (!offsets.length) return trimmed;

  return trimmed.slice(Math.min(...offsets)).trim();
}

function resolveArticleAssistModel(mode: string, env: Record<string, string | undefined>) {
  if (mode === "topic") {
    return env.GEMINI_TOPIC_MODEL || env.GEMINI_FLASH_MODEL || "gemini-2.5-flash";
  }
  return env.GEMINI_FLASH_MODEL || "gemini-2.5-flash";
}

function parseGeminiRetryAfterSeconds(message: string) {
  const matched = message.match(/retry in\s+([\d.]+)s/i);
  if (!matched) return null;
  const value = Number(matched[1]);
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.ceil(value);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const mode = body?.mode === "quick"
      ? "quick"
      : body?.mode === "topic"
        ? "topic"
      : body?.mode === "metadata"
        ? "metadata"
        : "full";

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

    const model = resolveArticleAssistModel(mode, import.meta.env);
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
            temperature: mode === "metadata" ? 0.1 : mode === "quick" ? 0.2 : mode === "topic" ? 0.2 : 0.6,
            topP: 0.9,
            maxOutputTokens: mode === "metadata" ? 900 : mode === "topic" ? 4096 : mode === "quick" ? 1800 : 6000,
          },
        }),
      },
    );

    const result = await response.json();
    if (!response.ok) {
      const detail = result?.error?.message || "";
      const isQuotaExceeded = /quota exceeded|rate limit|resource has been exhausted/i.test(detail);
      const retryAfterSeconds = parseGeminiRetryAfterSeconds(detail);
      console.error("Gemini Flash API 錯誤：", result);
      return new Response(JSON.stringify({
        error: isQuotaExceeded ? "GEMINI_RATE_LIMITED" : "GEMINI_API_FAILED",
        detail,
        retryAfterSeconds,
      }), {
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
    const normalizedContent = normalizeArticleAssistContent(content);
    if (!normalizedContent) {
      return new Response(JSON.stringify({ error: "GEMINI_EMPTY_RESPONSE" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        mode,
        content: normalizedContent,
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

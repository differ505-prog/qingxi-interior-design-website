import type { APIRoute } from "astro";

type GeminiPart = {
  text?: string;
};

type GeminiCandidate = {
  content?: {
    parts?: GeminiPart[];
  };
};

async function reportArticleAssistDebugEvent(
  hypothesisId: string,
  location: string,
  msg: string,
  data: Record<string, unknown> = {},
  runId = "pre-fix",
) {
  // #region debug-point shared:article-assist-debug
  await fetch("http://127.0.0.1:7777/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: "gemini-flash-failure",
      runId,
      hypothesisId,
      location,
      msg,
      data,
      ts: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
}

function normalizeArticleAssistContent(content: string) {
  const trimmed = content.trim();
  if (!trimmed) return "";

  const markers = [
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
      : body?.mode === "metadata"
        ? "metadata"
        : "full";

    // #region debug-point A:request-received
    await reportArticleAssistDebugEvent("A", "article-assist.ts:44", "[DEBUG] article assist request received", {
      mode,
      promptLength: prompt.length,
    });
    // #endregion

    if (!prompt) {
      // #region debug-point A:prompt-missing
      await reportArticleAssistDebugEvent("A", "article-assist.ts:52", "[DEBUG] prompt missing", { mode });
      // #endregion
      return new Response(JSON.stringify({ error: "PROMPT_REQUIRED" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = import.meta.env.GEMINI_API_KEY || import.meta.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      // #region debug-point A:key-missing
      await reportArticleAssistDebugEvent("A", "article-assist.ts:61", "[DEBUG] gemini api key missing", {
        mode,
        hasGeminiApiKey: Boolean(import.meta.env.GEMINI_API_KEY),
        hasGoogleGenerativeAiApiKey: Boolean(import.meta.env.GOOGLE_GENERATIVE_AI_API_KEY),
      });
      // #endregion
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY_MISSING" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }

    const model = import.meta.env.GEMINI_FLASH_MODEL || "gemini-2.5-flash";
    // #region debug-point B:upstream-request
    await reportArticleAssistDebugEvent("B", "article-assist.ts:73", "[DEBUG] sending upstream gemini request", {
      mode,
      model,
      promptLength: prompt.length,
    });
    // #endregion
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
            temperature: mode === "metadata" ? 0.1 : mode === "quick" ? 0.2 : 0.6,
            topP: 0.9,
            maxOutputTokens: mode === "metadata" ? 900 : mode === "quick" ? 1800 : 6000,
          },
        }),
      },
    );

    const result = await response.json();
    if (!response.ok) {
      const detail = result?.error?.message || "";
      const isQuotaExceeded = /quota exceeded|rate limit|resource has been exhausted/i.test(detail);
      const retryAfterSeconds = parseGeminiRetryAfterSeconds(detail);
      // #region debug-point B:upstream-failed
      await reportArticleAssistDebugEvent("B", "article-assist.ts:103", "[DEBUG] upstream gemini request failed", {
        mode,
        model,
        status: response.status,
        errorStatus: result?.error?.status || "",
        errorMessage: detail,
        isQuotaExceeded,
        retryAfterSeconds,
      });
      // #endregion
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
    // #region debug-point C:upstream-succeeded
    await reportArticleAssistDebugEvent("C", "article-assist.ts:124", "[DEBUG] upstream gemini request succeeded", {
      mode,
      model,
      rawContentLength: content.length,
      normalizedContentLength: normalizedContent.length,
      candidateCount: Array.isArray(result?.candidates) ? result.candidates.length : 0,
    });
    // #endregion

    if (!normalizedContent) {
      // #region debug-point C:empty-response
      await reportArticleAssistDebugEvent("C", "article-assist.ts:135", "[DEBUG] normalized gemini response empty", {
        mode,
        model,
        rawContentLength: content.length,
        candidateCount: Array.isArray(result?.candidates) ? result.candidates.length : 0,
      });
      // #endregion
      return new Response(JSON.stringify({ error: "GEMINI_EMPTY_RESPONSE" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    // #region debug-point C:response-ok
    await reportArticleAssistDebugEvent("C", "article-assist.ts:148", "[DEBUG] article assist response ok", {
      mode,
      normalizedContentLength: normalizedContent.length,
    });
    // #endregion
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
    // #region debug-point B:route-exception
    await reportArticleAssistDebugEvent("B", "article-assist.ts:161", "[DEBUG] article assist route exception", {
      errorName: error instanceof Error ? error.name : typeof error,
      errorMessage: error instanceof Error ? error.message : String(error),
    });
    // #endregion
    console.error("Gemini Flash 內容助手失敗：", error);
    return new Response(JSON.stringify({ error: "ARTICLE_ASSIST_FAILED" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

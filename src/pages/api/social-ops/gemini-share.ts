import type { APIRoute } from "astro";

function normalizeGeminiShareUrl(rawUrl: string) {
  const targetUrl = new URL(rawUrl);
  if (targetUrl.protocol !== "https:") {
    throw new Error("INVALID_URL");
  }
  if (targetUrl.hostname !== "gemini.google.com" || !targetUrl.pathname.startsWith("/share/")) {
    throw new Error("TARGET_NOT_ALLOWED");
  }
  targetUrl.hash = "";
  return targetUrl;
}

function extractMarkdownContent(readerText: string) {
  const marker = "Markdown Content:";
  const markerIndex = readerText.indexOf(marker);
  if (markerIndex < 0) return "";
  return readerText.slice(markerIndex + marker.length).trim();
}

function extractGeminiTitle(markdown: string) {
  const lines = markdown.split("\n").map((line) => line.trim()).filter(Boolean);
  const heading = lines.find((line) => /^#{1,6}\s+/.test(line));
  if (heading) {
    return heading.replace(/^#{1,6}\s+/, "").trim();
  }
  return lines[0] || "Gemini Canvas 備份";
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const rawUrl = typeof body?.url === "string" ? body.url.trim() : "";

    if (!rawUrl) {
      return new Response(JSON.stringify({ error: "INVALID_URL" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const targetUrl = normalizeGeminiShareUrl(rawUrl);
    const readerUrl = `https://r.jina.ai/http://${targetUrl.toString()}`;
    const response = await fetch(readerUrl, {
      headers: {
        Accept: "text/plain, text/markdown;q=0.9",
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "FETCH_FAILED" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const readerText = await response.text();
    const content = extractMarkdownContent(readerText);
    if (!content) {
      return new Response(JSON.stringify({ error: "EMPTY_CONTENT" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const title = extractGeminiTitle(content);
    return new Response(JSON.stringify({
      title,
      sourceUrl: targetUrl.toString(),
      content,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "GEMINI_SHARE_IMPORT_FAILED";
    const status = code === "INVALID_URL" || code === "TARGET_NOT_ALLOWED" ? 400 : 500;
    console.error("匯入 Gemini 分享內容失敗：", error);
    return new Response(JSON.stringify({ error: code }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
};

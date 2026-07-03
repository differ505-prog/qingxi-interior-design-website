import type { APIRoute } from "astro";
import {
  getBlobToken,
  normalizeArticleNote,
  readArticleNotes,
  writeArticleNotes,
} from "../../lib/article-note-store";

const ARTICLE_QUESTION_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const ARTICLE_QUESTION_RATE_LIMIT_MAX_REQUESTS = 5;
const articleQuestionRateLimitStore = new Map<string, number[]>();

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  extraHeaders: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeArticleUrl(articleSlug: string, value: unknown) {
  const normalized = normalizeText(value);
  if (normalized) return normalized;
  return articleSlug ? `/blog/${articleSlug}` : "";
}

function getClientRateLimitKey(request: Request) {
  const forwardedFor = normalizeText(request.headers.get("x-forwarded-for"));
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  const userAgent = normalizeText(request.headers.get("user-agent")) || "unknown";
  return `${ip}:${userAgent.slice(0, 120)}`;
}

function applyArticleQuestionRateLimit(request: Request) {
  const now = Date.now();
  const windowStart = now - ARTICLE_QUESTION_RATE_LIMIT_WINDOW_MS;
  const clientKey = getClientRateLimitKey(request);
  const attempts = (articleQuestionRateLimitStore.get(clientKey) || []).filter(
    (timestamp) => timestamp > windowStart,
  );

  if (attempts.length >= ARTICLE_QUESTION_RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((attempts[0] + ARTICLE_QUESTION_RATE_LIMIT_WINDOW_MS - now) / 1000),
    );
    articleQuestionRateLimitStore.set(clientKey, attempts);
    return {
      limited: true,
      retryAfterSeconds,
    };
  }

  attempts.push(now);
  articleQuestionRateLimitStore.set(clientKey, attempts);
  return {
    limited: false,
    retryAfterSeconds: 0,
  };
}

function isAllowedArticleQuestionRequest(request: Request, requestUrl: URL) {
  const expectedOrigin = requestUrl.origin;
  const originHeader = normalizeText(request.headers.get("origin"));
  const refererHeader = normalizeText(request.headers.get("referer"));

  try {
    if (originHeader && new URL(originHeader).origin !== expectedOrigin) {
      return false;
    }

    if (refererHeader && new URL(refererHeader).origin !== expectedOrigin) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

function buildInternalNote(input: {
  submitterName: string;
  contactInfo: string;
  detail: string;
  articleUrl: string;
  referrer: string;
}) {
  const lines = [];
  if (input.submitterName) lines.push(`稱呼：${input.submitterName}`);
  if (input.contactInfo) lines.push(`聯絡方式：${input.contactInfo}`);
  if (input.detail) lines.push(`補充背景：${input.detail}`);
  if (input.articleUrl) lines.push(`來源文章：${input.articleUrl}`);
  if (input.referrer) lines.push(`來源頁：${input.referrer}`);
  return lines.join("\n");
}

export const POST: APIRoute = async ({ request, url }) => {
  const token = getBlobToken();
  if (!token) {
    return jsonResponse(
      {
        status: "setup_required",
        configured: false,
        note: "目前尚未接通共享儲存，請先設定 Vercel Blob。",
      },
      503,
    );
  }

  if (!isAllowedArticleQuestionRequest(request, url)) {
    return jsonResponse(
      {
        status: "forbidden",
        configured: true,
        note: "此送出來源無效，請從本站文章頁重新提交。",
      },
      403,
    );
  }

  const rateLimitResult = applyArticleQuestionRateLimit(request);
  if (rateLimitResult.limited) {
    return jsonResponse(
      {
        status: "rate_limited",
        configured: true,
        note: "送出次數過於頻繁，請稍後再試。",
      },
      429,
      {
        "Retry-After": String(rateLimitResult.retryAfterSeconds),
      },
    );
  }

  try {
    const body = await request.json();
    const articleSlug = normalizeText(body?.articleSlug);
    const articleTitle = normalizeText(body?.articleTitle);
    const articleUrl = normalizeArticleUrl(articleSlug, body?.articleUrl);
    const question = normalizeText(body?.question);
    const detail = normalizeText(body?.detail);
    const submitterName = normalizeText(body?.submitterName);
    const contactInfo = normalizeText(body?.contactInfo);
    const honeypot = normalizeText(body?.company);
    const referrer = normalizeText(request.headers.get("referer"));

    if (honeypot) {
      return jsonResponse({
        status: "ok",
        configured: true,
        note: "問題已送出。",
      });
    }

    if (!articleSlug || !articleTitle || !question) {
      return jsonResponse(
        {
          status: "error",
          configured: true,
          note: "請先提供文章資訊與提問內容。",
        },
        400,
      );
    }

    if (question.length < 8) {
      return jsonResponse(
        {
          status: "error",
          configured: true,
          note: "提問內容至少需要 8 個字，方便青曦判斷重點。",
        },
        400,
      );
    }

    if (submitterName.length > 40 || contactInfo.length > 120) {
      return jsonResponse(
        {
          status: "error",
          configured: true,
          note: "稱呼或聯絡資訊長度過長，請精簡後再送出。",
        },
        400,
      );
    }

    if (detail.length > 1000 || question.length > 1000) {
      return jsonResponse(
        {
          status: "error",
          configured: true,
          note: "提問內容過長，請先濃縮重點後再送出。",
        },
        400,
      );
    }

    if (articleUrl && !articleUrl.startsWith("/blog/")) {
      return jsonResponse(
        {
          status: "error",
          configured: true,
          note: "文章來源格式不正確，請從原文章頁重新送出。",
        },
        400,
      );
    }

    const note = normalizeArticleNote({
      id: crypto.randomUUID(),
      articleSlug,
      articleTitle,
      articleUrl,
      question,
      note: buildInternalNote({
        submitterName,
        contactInfo,
        detail,
        articleUrl,
        referrer,
      }),
      sourceType: "client_question",
      status: "pending",
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const existingNotes = await readArticleNotes(token);
    const nextNotes = [note, ...existingNotes];
    await writeArticleNotes(token, nextNotes);

    return jsonResponse({
      status: "ok",
      configured: true,
      note: "問題已送出，青曦會留作內部整理與後續補充參考。",
    });
  } catch (error) {
    console.error("文章提問提交失敗：", error);
    return jsonResponse(
      {
        status: "error",
        configured: true,
        note: "問題送出失敗，請稍後再試。",
      },
      500,
    );
  }
};

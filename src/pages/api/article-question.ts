import type { APIRoute } from "astro";
import {
  getBlobToken,
  normalizeArticleNote,
  readArticleNotes,
  writeArticleNotes,
} from "../../lib/article-note-store";

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
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

export const POST: APIRoute = async ({ request }) => {
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

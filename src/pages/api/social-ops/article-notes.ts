import type { APIRoute } from "astro";
import {
  getBlobToken,
  normalizeArticleNote,
  readArticleNotes,
  writeArticleNotes,
} from "../../../lib/article-note-store";
import { isSameOriginRequest } from "../../../lib/request-security";

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export const GET: APIRoute = async () => {
  const token = getBlobToken();
  if (!token) {
    return jsonResponse({
      status: "setup_required",
      configured: false,
      items: [],
      note: "需要先在 Vercel 專案接上 Blob，並提供 BLOB_READ_WRITE_TOKEN，文章提問池才會跨裝置同步。",
    });
  }

  try {
    const items = await readArticleNotes(token);
    return jsonResponse({
      status: "ok",
      configured: true,
      items,
    });
  } catch (error) {
    console.error("讀取文章提問池失敗：", error);
    return jsonResponse({
      status: "error",
      configured: true,
      items: [],
      note: "文章提問池讀取失敗，請檢查 Blob 設定。",
    }, 500);
  }
};

export const POST: APIRoute = async ({ request, url }) => {
  const token = getBlobToken();
  if (!token) {
    return jsonResponse({
      status: "setup_required",
      configured: false,
      items: [],
      note: "目前尚未接通共享儲存，請先設定 Vercel Blob。",
    });
  }

  if (!isSameOriginRequest(request, url)) {
    return jsonResponse({
      status: "forbidden",
      configured: true,
      note: "此請求來源無效，請回到工作面板重新操作。",
    }, 403);
  }

  try {
    const body = await request.json();
    const rawNote = body?.note;
    if (!rawNote || typeof rawNote !== "object") {
      return jsonResponse({
        status: "error",
        configured: true,
        note: "請提供完整的文章提問內容。",
      }, 400);
    }

    const note = normalizeArticleNote(rawNote as Record<string, unknown>);
    if (!note.id || !note.articleSlug || !note.articleTitle || !note.question) {
      return jsonResponse({
        status: "error",
        configured: true,
        note: "至少需要文章、提問內容與識別 ID。",
      }, 400);
    }

    const existingNotes = await readArticleNotes(token);
    const nextNotes = [
      note,
      ...existingNotes.filter((entry) => entry.id !== note.id),
    ];
    await writeArticleNotes(token, nextNotes);

    return jsonResponse({
      status: "ok",
      configured: true,
      items: nextNotes,
    });
  } catch (error) {
    console.error("寫入文章提問池失敗：", error);
    return jsonResponse({
      status: "error",
      configured: true,
      note: "文章提問池寫入失敗，請稍後再試。",
    }, 500);
  }
};

export const DELETE: APIRoute = async ({ request, url }) => {
  const token = getBlobToken();
  if (!token) {
    return jsonResponse({
      status: "setup_required",
      configured: false,
      items: [],
      note: "目前尚未接通共享儲存，請先設定 Vercel Blob。",
    });
  }

  if (!isSameOriginRequest(request, url)) {
    return jsonResponse({
      status: "forbidden",
      configured: true,
      note: "此請求來源無效，請回到工作面板重新操作。",
    }, 403);
  }

  const noteId = url.searchParams.get("id")?.trim() || "";
  if (!noteId) {
    return jsonResponse({
      status: "error",
      configured: true,
      note: "刪除時缺少提問 ID。",
    }, 400);
  }

  try {
    const existingNotes = await readArticleNotes(token);
    const nextNotes = existingNotes.filter((entry) => entry.id !== noteId);
    await writeArticleNotes(token, nextNotes);

    return jsonResponse({
      status: "ok",
      configured: true,
      items: nextNotes,
    });
  } catch (error) {
    console.error("刪除文章提問池失敗：", error);
    return jsonResponse({
      status: "error",
      configured: true,
      note: "文章提問池刪除失敗，請稍後再試。",
    }, 500);
  }
};

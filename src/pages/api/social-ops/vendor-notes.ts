import type { APIRoute } from "astro";
import { list, put } from "@vercel/blob";

const DEBUG_SERVER_URL = "http://127.0.0.1:7778/event";
const DEBUG_SESSION_ID = "vendor-notes-write-fail";

type VendorNoteRecord = {
  id: string;
  name: string;
  trade: string;
  priceLevel: string;
  craftLevel: string;
  primaryUrl: string;
  secondaryUrl: string;
  location: string;
  impression: string;
  memo: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
};

const VENDOR_NOTES_BLOB_PATH = "social-ops/vendor-notes.json";

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function getBlobToken() {
  return (
    import.meta.env.BLOB_READ_WRITE_TOKEN?.trim() ||
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
    ""
  );
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeBoolean(value: unknown) {
  return Boolean(value);
}

function normalizeVendorNote(input: Record<string, unknown>): VendorNoteRecord {
  const now = new Date().toISOString();
  return {
    id: normalizeText(input.id),
    name: normalizeText(input.name),
    trade: normalizeText(input.trade),
    priceLevel: normalizeText(input.priceLevel),
    craftLevel: normalizeText(input.craftLevel),
    primaryUrl: normalizeText(input.primaryUrl),
    secondaryUrl: normalizeText(input.secondaryUrl),
    location: normalizeText(input.location),
    impression: normalizeText(input.impression),
    memo: normalizeText(input.memo),
    isPinned: normalizeBoolean(input.isPinned),
    createdAt: normalizeText(input.createdAt) || now,
    updatedAt: normalizeText(input.updatedAt) || now,
  };
}

async function readVendorNotes(token: string) {
  const result = await list({
    token,
    prefix: VENDOR_NOTES_BLOB_PATH,
    limit: 1,
  });

  const blob = result.blobs.find((entry) => entry.pathname === VENDOR_NOTES_BLOB_PATH) || result.blobs[0];
  if (!blob?.url) return [];

  const response = await fetch(blob.url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`READ_VENDOR_NOTES_FAILED:${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) return [];
  return data
    .filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === "object")
    .map((entry) => normalizeVendorNote(entry));
}

async function writeVendorNotes(token: string, notes: VendorNoteRecord[]) {
  // #region debug-point B:before-put
  fetch(DEBUG_SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: DEBUG_SESSION_ID,
      runId: "pre-fix",
      hypothesisId: "B",
      location: "src/pages/api/social-ops/vendor-notes.ts:writeVendorNotes",
      msg: "[DEBUG] about to put vendor notes blob",
      data: {
        pathname: VENDOR_NOTES_BLOB_PATH,
        noteCount: notes.length,
        access: "public",
        tokenPresent: Boolean(token),
      },
      ts: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
  await put(VENDOR_NOTES_BLOB_PATH, JSON.stringify(notes, null, 2), {
    token,
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
  });
  // #region debug-point B:after-put
  fetch(DEBUG_SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: DEBUG_SESSION_ID,
      runId: "pre-fix",
      hypothesisId: "B",
      location: "src/pages/api/social-ops/vendor-notes.ts:writeVendorNotes",
      msg: "[DEBUG] put vendor notes blob completed",
      data: {
        pathname: VENDOR_NOTES_BLOB_PATH,
        noteCount: notes.length,
      },
      ts: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
}

export const GET: APIRoute = async () => {
  const token = getBlobToken();
  if (!token) {
    return jsonResponse({
      status: "setup_required",
      configured: false,
      items: [],
      note: "需要先在 Vercel 專案接上 Blob，並提供 BLOB_READ_WRITE_TOKEN，這份共享廠商筆記才會跨裝置同步。",
    });
  }

  try {
    const items = await readVendorNotes(token);
    return jsonResponse({
      status: "ok",
      configured: true,
      items,
    });
  } catch (error) {
    console.error("讀取共享廠商筆記失敗：", error);
    return jsonResponse({
      status: "error",
      configured: true,
      items: [],
      note: "共享廠商筆記讀取失敗，請檢查 Blob 設定。",
    }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  const token = getBlobToken();
  // #region debug-point A:post-entry
  fetch(DEBUG_SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: DEBUG_SESSION_ID,
      runId: "pre-fix",
      hypothesisId: "A",
      location: "src/pages/api/social-ops/vendor-notes.ts:POST",
      msg: "[DEBUG] vendor notes POST entered",
      data: {
        tokenPresent: Boolean(token),
      },
      ts: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
  if (!token) {
    return jsonResponse({
      status: "setup_required",
      configured: false,
      items: [],
      note: "目前尚未接通共享儲存，請先設定 Vercel Blob。",
    });
  }

  try {
    const body = await request.json();
    const rawNote = body?.note;
    // #region debug-point D:request-shape
    fetch(DEBUG_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: DEBUG_SESSION_ID,
        runId: "pre-fix",
        hypothesisId: "D",
        location: "src/pages/api/social-ops/vendor-notes.ts:POST",
        msg: "[DEBUG] vendor notes POST parsed request body",
        data: {
          hasNote: Boolean(rawNote),
          noteType: typeof rawNote,
        },
        ts: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    if (!rawNote || typeof rawNote !== "object") {
      return jsonResponse({
        status: "error",
        configured: true,
        note: "請提供完整的廠商筆記內容。",
      }, 400);
    }

    const note = normalizeVendorNote(rawNote as Record<string, unknown>);
    if (!note.id || !note.name || !note.trade) {
      return jsonResponse({
        status: "error",
        configured: true,
        note: "至少需要廠商名稱、工種與識別 ID。",
      }, 400);
    }

    const existingNotes = await readVendorNotes(token);
    // #region debug-point C:after-read
    fetch(DEBUG_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: DEBUG_SESSION_ID,
        runId: "pre-fix",
        hypothesisId: "C",
        location: "src/pages/api/social-ops/vendor-notes.ts:POST",
        msg: "[DEBUG] vendor notes existing records loaded before write",
        data: {
          existingCount: existingNotes.length,
          incomingId: note.id,
          incomingTrade: note.trade,
        },
        ts: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    const nextNotes = [
      note,
      ...existingNotes.filter((entry) => entry.id !== note.id),
    ];
    await writeVendorNotes(token, nextNotes);

    return jsonResponse({
      status: "ok",
      configured: true,
      items: nextNotes,
    });
  } catch (error) {
    console.error("寫入共享廠商筆記失敗：", error);
    // #region debug-point E:post-catch
    fetch(DEBUG_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: DEBUG_SESSION_ID,
        runId: "pre-fix",
        hypothesisId: "E",
        location: "src/pages/api/social-ops/vendor-notes.ts:POST",
        msg: "[DEBUG] vendor notes POST failed in catch",
        data: {
          errorName: error instanceof Error ? error.name : typeof error,
          errorMessage: error instanceof Error ? error.message : String(error),
          errorStack: error instanceof Error ? error.stack : "",
        },
        ts: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    const errorName = error instanceof Error ? error.name : "UnknownError";
    const errorMessage = error instanceof Error ? error.message : String(error);
    return jsonResponse({
      status: "error",
      configured: true,
      note: `共享廠商筆記寫入失敗：${errorName} - ${errorMessage}`,
    }, 500);
  }
};

export const DELETE: APIRoute = async ({ url }) => {
  const token = getBlobToken();
  if (!token) {
    return jsonResponse({
      status: "setup_required",
      configured: false,
      items: [],
      note: "目前尚未接通共享儲存，請先設定 Vercel Blob。",
    });
  }

  const noteId = url.searchParams.get("id")?.trim() || "";
  if (!noteId) {
    return jsonResponse({
      status: "error",
      configured: true,
      note: "刪除時缺少廠商筆記 ID。",
    }, 400);
  }

  try {
    const existingNotes = await readVendorNotes(token);
    const nextNotes = existingNotes.filter((entry) => entry.id !== noteId);
    await writeVendorNotes(token, nextNotes);

    return jsonResponse({
      status: "ok",
      configured: true,
      items: nextNotes,
    });
  } catch (error) {
    console.error("刪除共享廠商筆記失敗：", error);
    return jsonResponse({
      status: "error",
      configured: true,
      note: "共享廠商筆記刪除失敗，請稍後再試。",
    }, 500);
  }
};

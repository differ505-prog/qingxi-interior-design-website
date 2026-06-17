import type { APIRoute } from "astro";
import { get, put } from "@vercel/blob";

const VENDOR_NOTES_BLOB_ACCESS = "private" as const;

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
  const result = await get(VENDOR_NOTES_BLOB_PATH, {
    token,
    access: VENDOR_NOTES_BLOB_ACCESS,
    useCache: false,
  });
  if (!result?.stream) return [];

  const payload = await new Response(result.stream).text();
  const data = JSON.parse(payload);
  if (!Array.isArray(data)) return [];
  return data
    .filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === "object")
    .map((entry) => normalizeVendorNote(entry));
}

async function writeVendorNotes(token: string, notes: VendorNoteRecord[]) {
  await put(VENDOR_NOTES_BLOB_PATH, JSON.stringify(notes, null, 2), {
    token,
    access: VENDOR_NOTES_BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
  });
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
    return jsonResponse({
      status: "error",
      configured: true,
      note: "共享廠商筆記寫入失敗，請稍後再試。",
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

import type { APIRoute } from "astro";

import {
  getBlobToken,
  readVendorIntakes,
  updateVendorIntake,
} from "../../../lib/vendor-intake-store";

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
      note: "需要先接通 Vercel Blob，工班登錄池才會跨裝置同步。",
    });
  }

  try {
    const items = await readVendorIntakes(token);
    return jsonResponse({
      status: "ok",
      configured: true,
      items,
    });
  } catch (error) {
    console.error("讀取工班登錄池失敗：", error);
    return jsonResponse(
      {
        status: "error",
        configured: true,
        items: [],
        note: "工班登錄池讀取失敗，請稍後再試。",
      },
      500,
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  const token = getBlobToken();
  if (!token) {
    return jsonResponse({
      status: "setup_required",
      configured: false,
      items: [],
      note: "需要先接通 Vercel Blob，工班登錄池才會跨裝置同步。",
    });
  }

  try {
    const body = await request.json();
    const rawItem = body?.item;
    if (!rawItem || typeof rawItem !== "object") {
      return jsonResponse(
        {
          status: "error",
          configured: true,
          note: "請提供完整的工班更新內容。",
        },
        400,
      );
    }

    const result = await updateVendorIntake(token, rawItem as Record<string, unknown>);
    return jsonResponse({
      status: "ok",
      configured: true,
      item: result.item,
      items: result.items,
    });
  } catch (error) {
    console.error("更新工班登錄池失敗：", error);
    return jsonResponse(
      {
        status: "error",
        configured: true,
        note: error instanceof Error ? error.message : "工班資料更新失敗，請稍後再試。",
      },
      500,
    );
  }
};

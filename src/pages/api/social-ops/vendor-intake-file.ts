import type { APIRoute } from "astro";

import {
  getBlobToken,
  getVendorIntakeAttachmentById,
} from "../../../lib/vendor-intake-store";

export const GET: APIRoute = async ({ url }) => {
  const token = getBlobToken();
  if (!token) {
    return new Response("尚未接通共享儲存。", { status: 503 });
  }

  const id = url.searchParams.get("id")?.trim() || "";
  if (!id) {
    return new Response("缺少附件 ID。", { status: 400 });
  }

  try {
    const result = await getVendorIntakeAttachmentById(token, id);
    if (!result?.blob?.stream || !result.item) {
      return new Response("找不到附件。", { status: 404 });
    }

    return new Response(result.blob.stream, {
      status: 200,
      headers: {
        "Content-Type": result.item.attachmentType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${encodeURIComponent(
          result.item.attachmentName || "vendor-upload",
        )}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("讀取工班附件失敗：", error);
    return new Response("附件讀取失敗。", { status: 500 });
  }
};

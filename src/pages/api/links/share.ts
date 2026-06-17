import type { APIRoute } from "astro";
import {
  isShortLinkStorageConfigured,
  saveShortLinkTarget,
} from "../../../lib/short-link-store";

function isAllowedShortLinkTarget(targetUrl: URL, origin: string) {
  return targetUrl.origin === origin && (targetUrl.pathname === "/blog" || targetUrl.pathname.startsWith("/blog/"));
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

    const origin = new URL(request.url).origin;
    const targetUrl = new URL(rawUrl, origin);

    if (!isAllowedShortLinkTarget(targetUrl, origin)) {
      return new Response(JSON.stringify({ error: "TARGET_NOT_ALLOWED" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!isShortLinkStorageConfigured()) {
      return new Response(
        JSON.stringify({
          mode: "inline",
          url: targetUrl.toString(),
          warning: "SHORT_LINK_STORAGE_NOT_CONFIGURED",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const token = await saveShortLinkTarget(targetUrl.toString());
    const shortUrl = `${origin}/r/${encodeURIComponent(token || "")}`;

    return new Response(
      JSON.stringify({
        mode: "short",
        token,
        url: shortUrl,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("建立文章短連結失敗：", error);
    return new Response(JSON.stringify({ error: "CREATE_SHORT_LINK_FAILED" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

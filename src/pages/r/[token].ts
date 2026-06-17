import type { APIRoute } from "astro";
import { getShortLinkTarget } from "../../lib/short-link-store";

export const GET: APIRoute = async ({ params }) => {
  const token = params.token?.trim();

  if (!token || !/^[a-zA-Z0-9]{6,32}$/.test(token)) {
    return new Response("Invalid short link.", { status: 400 });
  }

  try {
    const record = await getShortLinkTarget(token);
    const targetUrl = typeof record?.targetUrl === "string" ? record.targetUrl : "";

    if (!targetUrl) {
      return new Response("Short link not found.", { status: 404 });
    }

    return Response.redirect(targetUrl, 302);
  } catch (error) {
    console.error("讀取文章短連結失敗：", error);
    return new Response("Failed to resolve short link.", { status: 500 });
  }
};

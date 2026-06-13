import type { APIRoute } from "astro";
import {
  encodeContractPayload,
  isContractLinkStorageConfigured,
  saveSharedContractPayload,
} from "../../../lib/contract-link-store";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const payload = body?.payload;
    const signPath = typeof body?.signPath === "string" && body.signPath.startsWith("/") ? body.signPath : "/contract-studio/sign";

    if (!payload || typeof payload !== "object") {
      return new Response(JSON.stringify({ error: "INVALID_PAYLOAD" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const origin = new URL(request.url).origin;

    if (!isContractLinkStorageConfigured()) {
      const fallbackUrl = new URL(signPath, origin);
      fallbackUrl.searchParams.set("contract", encodeContractPayload(payload));
      return new Response(
        JSON.stringify({
          mode: "inline",
          url: fallbackUrl.toString(),
          warning: "SHORT_LINK_STORAGE_NOT_CONFIGURED",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const token = await saveSharedContractPayload(payload);
    const shortUrl = `${origin}${signPath}?token=${encodeURIComponent(token || "")}`;

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
    console.error("建立合約短連結失敗：", error);
    return new Response(JSON.stringify({ error: "CREATE_SHARE_LINK_FAILED" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

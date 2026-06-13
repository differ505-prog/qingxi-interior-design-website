import type { APIRoute } from "astro";
import { getSharedContractPayload } from "../../../lib/contract-link-store";

export const GET: APIRoute = async ({ params }) => {
  const token = params.token?.trim();

  if (!token || !/^[a-zA-Z0-9]{6,32}$/.test(token)) {
    return new Response(JSON.stringify({ error: "INVALID_TOKEN" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const record = await getSharedContractPayload(token);

    if (!record?.payload) {
      return new Response(JSON.stringify({ error: "TOKEN_NOT_FOUND" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(record), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("讀取合約短連結失敗：", error);
    return new Response(JSON.stringify({ error: "READ_SHARE_LINK_FAILED" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

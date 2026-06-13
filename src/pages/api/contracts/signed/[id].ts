import type { APIRoute } from "astro";
import { getPermanentSignedContractRecord } from "../../../../lib/contract-link-store";

export const GET: APIRoute = async ({ params }) => {
  const recordId = params.id?.trim();

  if (!recordId || !/^[a-zA-Z0-9]{6,32}$/.test(recordId)) {
    return new Response(JSON.stringify({ error: "INVALID_SIGNED_RECORD_ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const record = await getPermanentSignedContractRecord(recordId);

    if (!record?.signedRecord) {
      return new Response(JSON.stringify({ error: "SIGNED_RECORD_NOT_FOUND" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(record), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("讀取單筆已簽合約失敗：", error);
    return new Response(JSON.stringify({ error: "READ_SIGNED_RECORD_FAILED" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

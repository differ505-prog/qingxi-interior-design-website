import type { APIRoute } from "astro";
import {
  isContractLinkStorageConfigured,
  listPermanentSignedContractRecords,
  listPermanentSignedContractRecordsBySource,
} from "../../../lib/contract-link-store";

export const GET: APIRoute = async ({ url }) => {
  if (!isContractLinkStorageConfigured()) {
    return new Response(
      JSON.stringify({
        configured: false,
        records: [],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const limit = Number(url.searchParams.get("limit") || 50);
    const source = url.searchParams.get("source") || "";
    const records = source
      ? await listPermanentSignedContractRecordsBySource(source, Number.isFinite(limit) ? limit : 50)
      : await listPermanentSignedContractRecords(Number.isFinite(limit) ? limit : 50);

    const summaries = records.map((record: any) => ({
      id: record.id,
      source: record.source || "",
      sourceToken: record.sourceToken || "",
      contractNumber: record.signedRecord?.contractNumber || record.payload?.meta?.contractNumber || "",
      contractTitle: record.signedRecord?.contractTitle || record.payload?.meta?.contractTitle || "",
      clientName: record.signedRecord?.contractMeta?.clientName || record.payload?.meta?.clientName || "",
      projectName: record.signedRecord?.contractMeta?.projectName || record.payload?.meta?.projectName || "",
      signerName: record.signedRecord?.signerName || "",
      signedAtIso: record.signedRecord?.signedAtIso || "",
      signedAtLocal: record.signedRecord?.signedAtLocal || "",
      updatedAt: record.updatedAt || "",
    }));

    return new Response(
      JSON.stringify({
        configured: true,
        records: summaries,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("讀取已簽合約清單失敗：", error);
    return new Response(JSON.stringify({ error: "READ_SIGNED_CONTRACTS_FAILED" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

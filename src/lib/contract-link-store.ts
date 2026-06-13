const CONTRACT_LINK_PREFIX = "contract_link:";
const CONTRACT_LINK_TTL_SECONDS = 60 * 60 * 24 * 30;
const SIGNED_CONTRACT_PREFIX = "signed_contract:";
const SIGNED_CONTRACT_INDEX_KEY = "signed_contract_index";

function getEnvValue(name: string) {
  return import.meta.env[name] ?? process.env[name] ?? "";
}

function getKvConfig() {
  return {
    url: getEnvValue("KV_REST_API_URL"),
    token: getEnvValue("KV_REST_API_TOKEN"),
  };
}

export function isContractLinkStorageConfigured() {
  const { url, token } = getKvConfig();
  return Boolean(url && token);
}

function createToken() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 10);
}

function buildStorageKey(token: string) {
  return `${CONTRACT_LINK_PREFIX}${token}`;
}

function buildSignedContractStorageKey(recordId: string) {
  return `${SIGNED_CONTRACT_PREFIX}${recordId}`;
}

async function runKvCommand(command: Array<string | number>) {
  const { url, token } = getKvConfig();

  if (!url || !token) {
    throw new Error("KV storage is not configured.");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    throw new Error(`KV request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.result;
}

export async function saveSharedContractPayload(payload: unknown) {
  if (!isContractLinkStorageConfigured()) {
    return null;
  }

  const payloadSource =
    payload && typeof payload === "object" && typeof (payload as { source?: unknown }).source === "string"
      ? (payload as { source: string }).source
      : "qingxi-contract-studio";

  const record = {
    payload,
    createdAt: new Date().toISOString(),
    source: payloadSource,
  };

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const token = createToken();
    const setResult = await runKvCommand([
      "SET",
      buildStorageKey(token),
      JSON.stringify(record),
      "EX",
      CONTRACT_LINK_TTL_SECONDS,
      "NX",
    ]);

    if (setResult === "OK") {
      return token;
    }
  }

  throw new Error("Unable to allocate a unique short contract token.");
}

export async function getSharedContractPayload(token: string) {
  if (!isContractLinkStorageConfigured()) {
    return null;
  }

  const raw = await runKvCommand(["GET", buildStorageKey(token)]);
  if (!raw) {
    return null;
  }

  return JSON.parse(String(raw));
}

export async function saveSignedContractRecord(token: string, signedRecord: unknown) {
  if (!isContractLinkStorageConfigured()) {
    return null;
  }

  const storageKey = buildStorageKey(token);
  const raw = await runKvCommand(["GET", storageKey]);
  if (!raw) {
    return null;
  }

  const existingRecord = JSON.parse(String(raw));
  const signedRecordId = existingRecord.signedRecordId || createToken();
  const permanentSignedRecord = {
    id: signedRecordId,
    sourceToken: token,
    payload: existingRecord.payload,
    signedRecord,
    createdAt: existingRecord.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: existingRecord.source || "qingxi-contract-studio",
  };
  const nextRecord = {
    ...existingRecord,
    signedRecordId,
    signedRecord,
    signedRecordUpdatedAt: new Date().toISOString(),
  };

  const signedRecordSetResult = await runKvCommand([
    "SET",
    buildSignedContractStorageKey(signedRecordId),
    JSON.stringify(permanentSignedRecord),
  ]);

  if (signedRecordSetResult !== "OK") {
    return null;
  }

  if (!existingRecord.signedRecordId) {
    await runKvCommand(["LPUSH", SIGNED_CONTRACT_INDEX_KEY, signedRecordId]);
  }

  const result = await runKvCommand([
    "SET",
    storageKey,
    JSON.stringify(nextRecord),
    "EX",
    CONTRACT_LINK_TTL_SECONDS,
  ]);

  return result === "OK"
    ? {
        ...nextRecord,
        signedRecordId,
      }
    : null;
}

export async function getPermanentSignedContractRecord(recordId: string) {
  if (!isContractLinkStorageConfigured()) {
    return null;
  }

  const raw = await runKvCommand(["GET", buildSignedContractStorageKey(recordId)]);
  if (!raw) {
    return null;
  }

  return JSON.parse(String(raw));
}

export async function listPermanentSignedContractRecords(limit = 50) {
  if (!isContractLinkStorageConfigured()) {
    return [];
  }

  const ids = await runKvCommand(["LRANGE", SIGNED_CONTRACT_INDEX_KEY, 0, Math.max(0, limit - 1)]);
  if (!Array.isArray(ids) || !ids.length) {
    return [];
  }

  const records = await Promise.all(
    ids.map(async (recordId) => {
      if (typeof recordId !== "string" || !recordId) {
        return null;
      }
      return getPermanentSignedContractRecord(recordId);
    }),
  );

  return records.filter(Boolean);
}

export async function listPermanentSignedContractRecordsBySource(source: string, limit = 50) {
  const records = await listPermanentSignedContractRecords(limit);
  return records.filter((record: any) => record?.source === source);
}

export function encodeContractPayload(payload: unknown) {
  return Buffer.from(JSON.stringify(payload), "utf-8").toString("base64");
}

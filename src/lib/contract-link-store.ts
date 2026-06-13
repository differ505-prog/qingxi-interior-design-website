const CONTRACT_LINK_PREFIX = "contract_link:";
const CONTRACT_LINK_TTL_SECONDS = 60 * 60 * 24 * 30;

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

  const record = {
    payload,
    createdAt: new Date().toISOString(),
    source: "qingxi-contract-studio",
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
  const nextRecord = {
    ...existingRecord,
    signedRecord,
    signedRecordUpdatedAt: new Date().toISOString(),
  };

  const result = await runKvCommand([
    "SET",
    storageKey,
    JSON.stringify(nextRecord),
    "EX",
    CONTRACT_LINK_TTL_SECONDS,
  ]);

  return result === "OK" ? nextRecord : null;
}

export function encodeContractPayload(payload: unknown) {
  return Buffer.from(JSON.stringify(payload), "utf-8").toString("base64");
}

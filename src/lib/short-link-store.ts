const SHORT_LINK_PREFIX = "short_link:";
const SHORT_LINK_TTL_SECONDS = 60 * 60 * 24 * 30;

function getEnvValue(name: string) {
  return import.meta.env[name] ?? process.env[name] ?? "";
}

function getKvConfig() {
  return {
    url: getEnvValue("KV_REST_API_URL"),
    token: getEnvValue("KV_REST_API_TOKEN"),
  };
}

export function isShortLinkStorageConfigured() {
  const { url, token } = getKvConfig();
  return Boolean(url && token);
}

function createToken() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 8);
}

function buildStorageKey(token: string) {
  return `${SHORT_LINK_PREFIX}${token}`;
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

export async function saveShortLinkTarget(targetUrl: string) {
  if (!isShortLinkStorageConfigured()) {
    return null;
  }

  const record = {
    targetUrl,
    createdAt: new Date().toISOString(),
    source: "qingxi-social-ops",
  };

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const token = createToken();
    const setResult = await runKvCommand([
      "SET",
      buildStorageKey(token),
      JSON.stringify(record),
      "EX",
      SHORT_LINK_TTL_SECONDS,
      "NX",
    ]);

    if (setResult === "OK") {
      return token;
    }
  }

  throw new Error("Unable to allocate a unique short link token.");
}

export async function getShortLinkTarget(token: string) {
  if (!isShortLinkStorageConfigured()) {
    return null;
  }

  const raw = await runKvCommand(["GET", buildStorageKey(token)]);
  if (!raw) {
    return null;
  }

  return JSON.parse(String(raw));
}

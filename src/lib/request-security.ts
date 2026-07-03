const memoryRateLimitStore = new Map<string, number[]>();

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

export function isSameOriginRequest(request: Request, requestUrl: URL) {
  const expectedOrigin = requestUrl.origin;
  const originHeader = normalizeText(request.headers.get("origin"));
  const refererHeader = normalizeText(request.headers.get("referer"));

  try {
    if (originHeader && new URL(originHeader).origin !== expectedOrigin) {
      return false;
    }

    if (refererHeader && new URL(refererHeader).origin !== expectedOrigin) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

function getClientFingerprint(request: Request) {
  const forwardedFor = normalizeText(request.headers.get("x-forwarded-for"));
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  const userAgent = normalizeText(request.headers.get("user-agent")) || "unknown";
  return `${ip}:${userAgent.slice(0, 120)}`;
}

export function applyMemoryRateLimit(input: {
  namespace: string;
  request: Request;
  windowMs: number;
  maxRequests: number;
}) {
  const now = Date.now();
  const windowStart = now - input.windowMs;
  const clientKey = `${input.namespace}:${getClientFingerprint(input.request)}`;
  const attempts = (memoryRateLimitStore.get(clientKey) || []).filter(
    (timestamp) => timestamp > windowStart,
  );

  if (attempts.length >= input.maxRequests) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((attempts[0] + input.windowMs - now) / 1000),
    );
    memoryRateLimitStore.set(clientKey, attempts);
    return {
      limited: true,
      retryAfterSeconds,
    };
  }

  attempts.push(now);
  memoryRateLimitStore.set(clientKey, attempts);
  return {
    limited: false,
    retryAfterSeconds: 0,
  };
}

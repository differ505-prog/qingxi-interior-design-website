import { createHmac, timingSafeEqual } from "node:crypto";

const DEFAULT_SOCIAL_OPS_PASSWORD = "05050505";
const DEFAULT_SOCIAL_OPS_SESSION_SECRET = "qingxi-social-ops-session-secret";

export const SOCIAL_OPS_AUTH_CONFIG = {
  enabled: true,
  cookieName: "social_ops_auth",
  cookieMaxAgeDays: 7,
  loginPath: "/social-ops-login",
  defaultNextPath: "/social-ops",
  passwordEnvName: "SOCIAL_OPS_PASSWORD",
  sessionSecretEnvName: "SOCIAL_OPS_SESSION_SECRET",
};

function readEnvValue(key: string) {
  return import.meta.env[key]?.trim() || process.env[key]?.trim() || "";
}

export function getSocialOpsPassword() {
  return readEnvValue(SOCIAL_OPS_AUTH_CONFIG.passwordEnvName) || DEFAULT_SOCIAL_OPS_PASSWORD;
}

function getSocialOpsSessionSecret() {
  return (
    readEnvValue(SOCIAL_OPS_AUTH_CONFIG.sessionSecretEnvName) ||
    getSocialOpsPassword() ||
    DEFAULT_SOCIAL_OPS_SESSION_SECRET
  );
}

function signSocialOpsPayload(payload: string) {
  return createHmac("sha256", getSocialOpsSessionSecret()).update(payload).digest("base64url");
}

export function createSocialOpsSessionToken() {
  const expiresAt =
    Date.now() + SOCIAL_OPS_AUTH_CONFIG.cookieMaxAgeDays * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ exp: expiresAt, scope: "social-ops" })).toString(
    "base64url",
  );
  return `${payload}.${signSocialOpsPayload(payload)}`;
}

export function isValidSocialOpsSessionToken(token: string | undefined | null) {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expectedSignature = signSocialOpsPayload(payload);
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (providedBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(providedBuffer, expectedBuffer)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp?: number;
      scope?: string;
    };
    return parsed.scope === "social-ops" && typeof parsed.exp === "number" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export function verifySocialOpsPassword(password: string) {
  return password === getSocialOpsPassword();
}

export function isProtectedSocialOpsPath(pathname: string) {
  return pathname === "/social-ops" || pathname.startsWith("/api/social-ops/");
}

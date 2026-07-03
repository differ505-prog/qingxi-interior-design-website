import { createHmac, timingSafeEqual } from "node:crypto";

const DEFAULT_SOCIAL_OPS_PASSWORD = "05050505";
const DEFAULT_SOCIAL_OPS_SESSION_SECRET = "qingxi-social-ops-session-secret";
const IS_DEV_AUTH_FALLBACK = import.meta.env.DEV || process.env.NODE_ENV !== "production";

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

export function getSocialOpsAuthSetupStatus() {
  const passwordFromEnv = readEnvValue(SOCIAL_OPS_AUTH_CONFIG.passwordEnvName);
  const sessionSecretFromEnv = readEnvValue(SOCIAL_OPS_AUTH_CONFIG.sessionSecretEnvName);
  const usingDevFallback = IS_DEV_AUTH_FALLBACK && (!passwordFromEnv || !sessionSecretFromEnv);

  return {
    configured: Boolean(passwordFromEnv && sessionSecretFromEnv) || usingDevFallback,
    passwordConfigured: Boolean(passwordFromEnv) || IS_DEV_AUTH_FALLBACK,
    sessionSecretConfigured: Boolean(sessionSecretFromEnv) || IS_DEV_AUTH_FALLBACK,
    usingDevFallback,
  };
}

export function isSocialOpsAuthConfigured() {
  return getSocialOpsAuthSetupStatus().configured;
}

export function getSocialOpsPassword() {
  const passwordFromEnv = readEnvValue(SOCIAL_OPS_AUTH_CONFIG.passwordEnvName);
  if (passwordFromEnv) return passwordFromEnv;
  if (IS_DEV_AUTH_FALLBACK) return DEFAULT_SOCIAL_OPS_PASSWORD;
  return "";
}

function getSocialOpsSessionSecret() {
  const sessionSecretFromEnv = readEnvValue(SOCIAL_OPS_AUTH_CONFIG.sessionSecretEnvName);
  if (sessionSecretFromEnv) return sessionSecretFromEnv;
  if (IS_DEV_AUTH_FALLBACK) return getSocialOpsPassword() || DEFAULT_SOCIAL_OPS_SESSION_SECRET;
  return "";
}

function signSocialOpsPayload(payload: string) {
  const secret = getSocialOpsSessionSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSocialOpsSessionToken() {
  if (!isSocialOpsAuthConfigured()) return "";
  const expiresAt =
    Date.now() + SOCIAL_OPS_AUTH_CONFIG.cookieMaxAgeDays * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ exp: expiresAt, scope: "social-ops" })).toString(
    "base64url",
  );
  return `${payload}.${signSocialOpsPayload(payload)}`;
}

export function isValidSocialOpsSessionToken(token: string | undefined | null) {
  if (!token || !isSocialOpsAuthConfigured()) return false;

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
  const configuredPassword = getSocialOpsPassword();
  return Boolean(configuredPassword) && password === configuredPassword;
}

export function isProtectedSocialOpsPath(pathname: string) {
  return pathname === "/social-ops" || pathname.startsWith("/api/social-ops/");
}

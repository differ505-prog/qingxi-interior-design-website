export const SOCIAL_OPS_AUTH_CONFIG = {
  enabled: true,
  password: "05050505",
  cookieName: "social_ops_auth",
  cookieMaxAgeDays: 7,
  loginPath: "/social-ops-login",
  defaultNextPath: "/social-ops",
};

export function isProtectedSocialOpsPath(pathname: string) {
  return pathname === "/social-ops" || pathname.startsWith("/api/social-ops/");
}

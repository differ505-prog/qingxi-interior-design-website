import type { MiddlewareHandler } from 'astro';
import { PASSWORD_PROTECTION_CONFIG, isLocalDevelopment } from './lib/password-config';
import {
  getSocialOpsAuthSetupStatus,
  isSocialOpsAuthConfigured,
  isProtectedSocialOpsPath,
  isValidSocialOpsSessionToken,
  SOCIAL_OPS_AUTH_CONFIG,
} from './lib/social-ops-auth';

// ==================== 預覽密碼保護 ====================
// 密碼保護邏輯
const PREVIEW_PROTECTION_ENABLED = PASSWORD_PROTECTION_CONFIG.enabled && !isLocalDevelopment();
const LEGACY_VERCEL_HOST = 'qingxi-interior-design-website.vercel.app';
const CANONICAL_ORIGIN = 'https://qingxidesign.tw';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { hostname, pathname, search } = context.url;

  if (hostname === LEGACY_VERCEL_HOST) {
    return context.redirect(`${CANONICAL_ORIGIN}${pathname}${search}`, 308);
  }

  // ==================== 預覽密碼保護邏輯 ====================
  if (PREVIEW_PROTECTION_ENABLED) {
    // 登錄頁面本身不需要驗證
    if (pathname === '/preview-login') {
      return next();
    }

    // 檢查是否有有效的認證 Cookie
    const authCookie = context.cookies.get('preview_auth');

    if (!authCookie || authCookie.value !== 'true') {
      // 未認證，重定向到登錄頁面
      return context.redirect('/preview-login');
    }
  }

  if (SOCIAL_OPS_AUTH_CONFIG.enabled) {
    if (pathname === SOCIAL_OPS_AUTH_CONFIG.loginPath) {
      return next();
    }

    if (isProtectedSocialOpsPath(pathname)) {
      if (!isSocialOpsAuthConfigured()) {
        const authSetupStatus = getSocialOpsAuthSetupStatus();
        if (pathname.startsWith('/api/social-ops/')) {
          return new Response(
            JSON.stringify({
              status: 'setup_required',
              configured: false,
              note: `正式環境需先設定 ${SOCIAL_OPS_AUTH_CONFIG.passwordEnvName} 與 ${SOCIAL_OPS_AUTH_CONFIG.sessionSecretEnvName}。`,
              usingDevFallback: authSetupStatus.usingDevFallback,
            }),
            {
              status: 503,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        }

        return context.redirect(
          `${SOCIAL_OPS_AUTH_CONFIG.loginPath}?reason=setup_required`,
        );
      }

      const authCookie = context.cookies.get(SOCIAL_OPS_AUTH_CONFIG.cookieName);
      if (!authCookie || !isValidSocialOpsSessionToken(authCookie.value)) {
        if (pathname.startsWith('/api/social-ops/')) {
          return new Response(
            JSON.stringify({
              status: 'unauthorized',
              configured: false,
              note: '需要先輸入工作台密碼，才能讀寫共享內容。',
            }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        }

        const nextPath = `${pathname}${search}`;
        return context.redirect(
          `${SOCIAL_OPS_AUTH_CONFIG.loginPath}?next=${encodeURIComponent(nextPath)}`,
        );
      }
    }
  }

  // 正常處理
  return next();
};

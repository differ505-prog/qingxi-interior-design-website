import type { MiddlewareHandler } from 'astro';
import { PASSWORD_PROTECTION_CONFIG, isLocalDevelopment } from './lib/password-config';

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

  // 正常處理
  return next();
};

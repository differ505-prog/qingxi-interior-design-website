import type { MiddlewareHandler } from 'astro';

// ==================== 預覽密碼保護 ====================
// 設為 true 時，訪客需要輸入密碼才能訪問網站
const PREVIEW_PROTECTION_ENABLED = import.meta.env.PREVIEW_PROTECTION_ENABLED === 'true' || false;

// ==================== 維護模式 ====================
// 設為 true 時，所有訪客（除了特定IP）都會看到建置中頁面
const MAINTENANCE_MODE = import.meta.env.MAINTENANCE_MODE === 'true' ||
  import.meta.env.PUBLIC_MAINTENANCE_MODE === 'true' ||
  false;

// 允許訪問的IP列表（可選，用於測試）
const ALLOWED_IPS = (import.meta.env.ALLOWED_IPS ||
  import.meta.env.PUBLIC_ALLOWED_IPS ||
  '').split(',').filter(Boolean);

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { pathname } = context.url;

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

  // ==================== 維護模式邏輯 ====================
  if (MAINTENANCE_MODE) {
    // 檢查是否已經是建置中頁面
    if (pathname === '/coming-soon') {
      return next();
    }

    // 檢查IP是否在允許列表中
    const clientIP = context.request.headers.get('x-forwarded-for')?.split(',')[0] ||
      context.request.headers.get('x-real-ip') ||
      'unknown';

    if (ALLOWED_IPS.length > 0 && ALLOWED_IPS.includes(clientIP)) {
      return next();
    }

    // ⚠️ 臨時禁用 middleware 重定向，改用客戶端重定向
    // 因為 middleware 在 Vercel 上可能會有 URL 構建問題
    // 讓 BaseLayout 中的客戶端腳本來處理重定向
    return next();
  }

  // 正常處理
  return next();
};

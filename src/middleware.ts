import type { MiddlewareHandler } from 'astro';

// 維護模式開關
// 設為 true 時，所有訪客（除了特定IP）都會看到建置中頁面
// 優先使用環境變數，如果沒有則使用預設值
// ⚠️ 臨時硬編碼：如果需要立即啟用維護模式，將下面的 false 改為 true
const MAINTENANCE_MODE = import.meta.env.MAINTENANCE_MODE === 'true' || 
                         import.meta.env.PUBLIC_MAINTENANCE_MODE === 'true' ||
                         true; // ⚠️ 臨時設為 true，部署後記得改回 false 或使用環境變數

// 允許訪問的IP列表（可選，用於測試）
const ALLOWED_IPS = (import.meta.env.ALLOWED_IPS || 
                     import.meta.env.PUBLIC_ALLOWED_IPS || 
                     '').split(',').filter(Boolean);

export const onRequest: MiddlewareHandler = async (context, next) => {
  // 如果維護模式關閉，正常處理
  if (!MAINTENANCE_MODE) {
    return next();
  }

  // 檢查是否已經是建置中頁面
  if (context.url.pathname === '/coming-soon') {
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
};


import type { MiddlewareHandler } from 'astro';

// 維護模式開關
// 設為 true 時，所有訪客（除了特定IP）都會看到建置中頁面
const MAINTENANCE_MODE = import.meta.env.MAINTENANCE_MODE === 'true' || false;

// 允許訪問的IP列表（可選，用於測試）
const ALLOWED_IPS = (import.meta.env.ALLOWED_IPS || '').split(',').filter(Boolean);

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

  // 重定向到建置中頁面
  return Response.redirect(new URL('/coming-soon', context.url), 307);
};


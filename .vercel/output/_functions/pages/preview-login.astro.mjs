import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D7yWafUH.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DnsG0h9q.mjs';
/* empty css                                         */
export { renderers } from '../renderers.mjs';

const PASSWORD_PROTECTION_CONFIG = {
  // 訪問密碼（請修改為您想要的密碼）
  password: "wife2024",
  // Cookie 有效期（天數）
  cookieMaxAge: 7
};

const $$Astro = createAstro();
const $$PreviewLogin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PreviewLogin;
  const PREVIEW_PASSWORD = PASSWORD_PROTECTION_CONFIG.password;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const password = formData.get("password");
    if (password === PREVIEW_PASSWORD) {
      const maxAge = PASSWORD_PROTECTION_CONFIG.cookieMaxAge * 24 * 60 * 60;
      const response = Astro2.redirect("/");
      response.headers.set(
        "Set-Cookie",
        `preview_auth=true; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Strict`
      );
      return response;
    }
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u8A2A\u554F\u9A57\u8B49 - \u9752\u66E6\u7A7A\u9593\u8A2D\u8A08", "data-astro-cid-p3n4h3wg": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="login-container" data-astro-cid-p3n4h3wg> <div class="login-box" data-astro-cid-p3n4h3wg> <div class="logo" data-astro-cid-p3n4h3wg> <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-p3n4h3wg> <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="var(--resort-primary)" opacity="0.2" data-astro-cid-p3n4h3wg></path> <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" stroke="var(--resort-primary)" stroke-width="2" data-astro-cid-p3n4h3wg></path> <path d="M9 12l2 2 4-4" stroke="var(--resort-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-p3n4h3wg></path> </svg> </div> <h1 data-astro-cid-p3n4h3wg>預覽版訪問驗證</h1> <p class="subtitle" data-astro-cid-p3n4h3wg>此網站目前處於建置階段</p> <p class="description" data-astro-cid-p3n4h3wg>請輸入密碼以繼續訪問</p> <form method="POST" class="login-form" data-astro-cid-p3n4h3wg> <div class="input-group" data-astro-cid-p3n4h3wg> <label for="password" data-astro-cid-p3n4h3wg>密碼</label> <input type="password" id="password" name="password" placeholder="請輸入訪問密碼" autofocus required data-astro-cid-p3n4h3wg> </div> <button type="submit" class="login-btn" data-astro-cid-p3n4h3wg> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-p3n4h3wg> <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-p3n4h3wg></path> <polyline points="10 17 15 12 10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-p3n4h3wg></polyline> <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-p3n4h3wg></line> </svg>
進入網站
</button> </form> <p class="footer-note" data-astro-cid-p3n4h3wg>
💡 如果您是訪客且需要訪問權限，請聯繫網站管理員
</p> </div> </div> ` })}  ${renderScript($$result, "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/\u6211\u7684\u96F2\u7AEF\u786C\u789F/03_\u8CC7\u6E90\u8207\u8208\u8DA3 (Resources)/01_\u77E5\u8B58\u9AD4\u7CFB/\u7A0B\u5F0F\u8A2D\u8A08/\u590F\u6D1B\u514B\u6C11\u5BBF\u65B0\u7DB2\u7AD9/src/pages/preview-login.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/\u6211\u7684\u96F2\u7AEF\u786C\u789F/03_\u8CC7\u6E90\u8207\u8208\u8DA3 (Resources)/01_\u77E5\u8B58\u9AD4\u7CFB/\u7A0B\u5F0F\u8A2D\u8A08/\u590F\u6D1B\u514B\u6C11\u5BBF\u65B0\u7DB2\u7AD9/src/pages/preview-login.astro", void 0);

const $$file = "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/我的雲端硬碟/03_資源與興趣 (Resources)/01_知識體系/程式設計/夏洛克民宿新網站/src/pages/preview-login.astro";
const $$url = "/preview-login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$PreviewLogin,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

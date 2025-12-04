import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_D7yWafUH.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DnsG0h9q.mjs';
/* empty css                                         */
export { renderers } from '../../renderers.mjs';

const $$LakeSuite = createComponent(($$result, $$props, $$slots) => {
  const roomData = {
    name: "\u6E56\u666F\u5957\u623F",
    englishName: "Lake View Suite",
    description: "\u7368\u4EAB\u79C1\u4EBA\u6E56\u666F\u7684\u9802\u7D1A\u5957\u623F\uFF0C\u662F\u8FFD\u6C42\u6D6A\u6F2B\u8207\u54C1\u8CEA\u7684\u6700\u4F73\u9078\u64C7\u3002\u5927\u9762\u843D\u5730\u7A97\u5C07\u4EBA\u5DE5\u6E56\u6CCA\u7684\u6E56\u5149\u5C71\u8272\u76E1\u6536\u773C\u5E95\uFF0C\u56DB\u5B63\u7686\u6709\u4E0D\u540C\u7F8E\u666F\u3002\u5BEC\u655E\u7684\u89C0\u666F\u967D\u53F0\u8A2D\u6709\u8212\u9069\u5EA7\u6905\uFF0C\u6E05\u6668\u53EF\u5728\u6B64\u4EAB\u7528\u65E9\u9910\uFF0C\u508D\u665A\u5247\u80FD\u6B23\u8CDE\u5915\u967D\u9918\u6689\u6620\u7167\u6E56\u9762\u7684\u7D55\u7F8E\u666F\u81F4\u3002",
    capacity: "2-3\u4EBA",
    size: "\u7D0415\u576A\uFF0850\u5E73\u65B9\u7C73\uFF09",
    bedType: "King Size \u96D9\u4EBA\u5E8A\uFF08180x200cm\uFF09",
    images: [
      { src: "/lake-suite.png", alt: "\u6E56\u666F\u5957\u623F\u5168\u666F" },
      { src: "/lake-suite.png", alt: "\u6E56\u666F\u5957\u623F\u89C0\u666F\u967D\u53F0" },
      { src: "/lake-suite.png", alt: "\u6E56\u666F\u5957\u623F\u6D74\u5BA4" },
      { src: "/lake-suite.png", alt: "\u6E56\u666F\u5957\u623F\u65E5\u843D\u666F\u89C0" }
    ],
    amenities: [
      {
        icon: "\u{1F30A}",
        name: "\u79C1\u4EBA\u6E56\u666F",
        description: "\u5C08\u5C6C\u6E56\u666F\u8996\u91CE\uFF0C\u56DB\u5B63\u7F8E\u666F\u76E1\u6536\u773C\u5E95"
      },
      {
        icon: "\u{1FA9F}",
        name: "\u89C0\u666F\u967D\u53F0",
        description: "\u5BEC\u655E\u967D\u53F0\u914D\u6236\u5916\u5EA7\u6905\uFF0C\u7D55\u4F73\u89C0\u666F\u9EDE"
      },
      { icon: "\u{1F6C1}", name: "\u7368\u7ACB\u6D74\u7F38", description: "\u5927\u578B\u6D74\u7F38\uFF0C\u908A\u6CE1\u6FA1\u908A\u8CDE\u666F" },
      {
        icon: "\u2615",
        name: "\u81A0\u56CA\u5496\u5561\u6A5F",
        description: "Nespresso\u5496\u5561\u6A5F\u8207\u7CBE\u9078\u5496\u5561"
      },
      {
        icon: "\u{1F6CF}\uFE0F",
        name: "King Size \u5E8A",
        description: "180x200cm \u9802\u7D1A\u5E8A\u588A\u8207\u7FBD\u7D68\u5BE2\u5177"
      },
      { icon: "\u2744\uFE0F", name: "\u51B7\u6C23\u7A7A\u8ABF", description: "\u500B\u5225\u63A7\u5236\u51B7\u6696\u7A7A\u8ABF\u7CFB\u7D71" },
      {
        icon: "\u{1F4FA}",
        name: "\u667A\u6167\u96FB\u8996",
        description: "55\u540B4K\u96FB\u8996\uFF0C\u652F\u63F4\u4E32\u6D41\u670D\u52D9"
      },
      { icon: "\u{1F310}", name: "\u9AD8\u901FWiFi", description: "\u514D\u8CBB\u7121\u7DDA\u7DB2\u8DEF\uFF0C\u901F\u5EA6\u7A69\u5B9A" },
      { icon: "\u{1F6BF}", name: "\u96E8\u6DCB\u82B1\u7051", description: "\u5927\u578B\u96E8\u6DCB\u82B1\u7051\u8207\u624B\u6301\u82B1\u7051" },
      { icon: "\u{1F9F4}", name: "\u9AD8\u7D1A\u5099\u54C1", description: "\u7CBE\u9078\u6C90\u6D74\u7528\u54C1\u8207\u8B77\u819A\u7522\u54C1" },
      { icon: "\u{1FA91}", name: "\u4F11\u61A9\u6C99\u767C", description: "\u8212\u9069\u96D9\u4EBA\u6C99\u767C\u8207\u8336\u51E0" },
      { icon: "\u{1F512}", name: "\u96FB\u5B50\u9396", description: "\u5B89\u5168\u96FB\u5B50\u9580\u9396\u7CFB\u7D71" },
      { icon: "\u{1F4A8}", name: "\u5439\u98A8\u6A5F", description: "\u5C08\u696D\u7D1A\u5439\u98A8\u6A5F" },
      {
        icon: "\u{1F305}",
        name: "\u65E5\u51FA\u65E5\u843D",
        description: "\u7D55\u4F73\u4F4D\u7F6E\u6B23\u8CDE\u65E5\u51FA\u65E5\u843D\u7F8E\u666F"
      }
    ],
    highlights: [
      "\u7368\u5BB6\u79C1\u4EBA\u6E56\u666F\u8996\u91CE",
      "\u5BEC\u655E\u89C0\u666F\u967D\u53F0\uFF0C\u6236\u5916\u5EA7\u6905",
      "\u6D74\u5BA4\u914D\u7368\u7ACB\u6D74\u7F38\uFF0C\u908A\u6CE1\u6FA1\u908A\u8CDE\u666F",
      "15\u576A\u8212\u9069\u7A7A\u9593\uFF0C\u6D6A\u6F2B\u6C1B\u570D",
      "Nespresso\u81A0\u56CA\u5496\u5561\u6A5F",
      "\u56DB\u5B63\u4E0D\u540C\u6E56\u666F\uFF0C\u62CD\u7167\u7D55\u7F8E",
      "\u9069\u5408\u60C5\u4FB6\u871C\u6708\u6216\u7D00\u5FF5\u65E5"
    ],
    policies: [
      "\u5165\u4F4F\u6642\u9593\uFF1A\u4E0B\u53483:00 PM\u4E4B\u5F8C",
      "\u9000\u623F\u6642\u9593\uFF1A\u4E0A\u534811:00 AM\u4E4B\u524D",
      "\u7981\u6B62\u5438\u83F8\uFF08\u967D\u53F0\u53EF\u5438\u83F8\uFF09",
      "\u4E0D\u53EF\u651C\u5E36\u5BF5\u7269",
      "\u53EF\u52A0\u4E00\u5F35\u55AE\u4EBA\u5E8A\uFF08\u9700\u984D\u5916\u6536\u8CBB\uFF09",
      "\u5EFA\u8B70\u63D0\u524D\u9810\u8A02\u6E56\u666F\u65E9\u9910\u670D\u52D9",
      "\u63D0\u4F9B\u514D\u8CBB\u505C\u8ECA\u4F4D"
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${roomData.name} - \u590F\u6D1B\u514BVilla\u6C11\u5BBF`, "description": `${roomData.description} ${roomData.size}\u7684\u6D6A\u6F2B\u7A7A\u9593\uFF0C\u63D0\u4F9B${roomData.bedType}\uFF0C\u9069\u5408${roomData.capacity}\u5165\u4F4F\u3002`, "data-astro-cid-z76e4h7h": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="room-detail-container" data-astro-cid-z76e4h7h> <!-- Breadcrumb --> <div class="breadcrumb" data-astro-cid-z76e4h7h> <a href="/" data-astro-cid-z76e4h7h>首頁</a> <span class="separator" data-astro-cid-z76e4h7h>›</span> <a href="/portfolio" data-astro-cid-z76e4h7h>房型介紹</a> <span class="separator" data-astro-cid-z76e4h7h>›</span> <span class="current" data-astro-cid-z76e4h7h>${roomData.name}</span> </div> <!-- Hero Section --> <section class="hero-section" data-astro-cid-z76e4h7h> <div class="hero-content" data-astro-cid-z76e4h7h> <h1 data-astro-cid-z76e4h7h>${roomData.name}</h1> <p class="english-name" data-astro-cid-z76e4h7h>${roomData.englishName}</p> <p class="room-description" data-astro-cid-z76e4h7h>${roomData.description}</p> <div class="room-quick-info" data-astro-cid-z76e4h7h> <div class="info-badge" data-astro-cid-z76e4h7h> <span class="icon" data-astro-cid-z76e4h7h>👥</span> <span data-astro-cid-z76e4h7h>${roomData.capacity}</span> </div> <div class="info-badge" data-astro-cid-z76e4h7h> <span class="icon" data-astro-cid-z76e4h7h>📏</span> <span data-astro-cid-z76e4h7h>${roomData.size}</span> </div> <div class="info-badge" data-astro-cid-z76e4h7h> <span class="icon" data-astro-cid-z76e4h7h>🛏️</span> <span data-astro-cid-z76e4h7h>${roomData.bedType}</span> </div> </div> <a href="https://booking.owlting.com/summerrockvilla" target="_blank" class="main-cta-btn" data-astro-cid-z76e4h7h>
立即預訂此房型
</a> </div> <div class="hero-image" data-astro-cid-z76e4h7h> <img${addAttribute(roomData.images[0].src, "src")}${addAttribute(roomData.images[0].alt, "alt")} data-astro-cid-z76e4h7h> <div class="room-badge premium" data-astro-cid-z76e4h7h>精選推薦</div> </div> </section> <!-- Image Gallery --> <section class="gallery-section" data-astro-cid-z76e4h7h> <h2 class="section-title" data-astro-cid-z76e4h7h>房間照片</h2> <div class="image-grid" data-astro-cid-z76e4h7h> ${roomData.images.slice(1).map((image) => renderTemplate`<div class="gallery-item" data-astro-cid-z76e4h7h> <img${addAttribute(image.src, "src")}${addAttribute(image.alt, "alt")} loading="lazy" data-astro-cid-z76e4h7h> </div>`)} </div> </section> <!-- Room Amenities --> <section class="amenities-section" data-astro-cid-z76e4h7h> <h2 class="section-title" data-astro-cid-z76e4h7h>房間設施</h2> <div class="amenities-grid" data-astro-cid-z76e4h7h> ${roomData.amenities.map((amenity) => renderTemplate`<div class="amenity-card" data-astro-cid-z76e4h7h> <div class="amenity-icon" data-astro-cid-z76e4h7h>${amenity.icon}</div> <h3 data-astro-cid-z76e4h7h>${amenity.name}</h3> <p data-astro-cid-z76e4h7h>${amenity.description}</p> </div>`)} </div> </section> <!-- Highlights --> <section class="highlights-section" data-astro-cid-z76e4h7h> <h2 class="section-title" data-astro-cid-z76e4h7h>房型亮點</h2> <ul class="highlights-list" data-astro-cid-z76e4h7h> ${roomData.highlights.map((highlight) => renderTemplate`<li data-astro-cid-z76e4h7h> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-z76e4h7h> <polyline points="20 6 9 17 4 12" data-astro-cid-z76e4h7h></polyline> </svg> ${highlight} </li>`)} </ul> </section> <!-- Policies --> <section class="policies-section" data-astro-cid-z76e4h7h> <h2 class="section-title" data-astro-cid-z76e4h7h>入住須知</h2> <ul class="policies-list" data-astro-cid-z76e4h7h> ${roomData.policies.map((policy) => renderTemplate`<li data-astro-cid-z76e4h7h> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-z76e4h7h> <circle cx="12" cy="12" r="10" data-astro-cid-z76e4h7h></circle> <line x1="12" y1="16" x2="12" y2="12" data-astro-cid-z76e4h7h></line> <line x1="12" y1="8" x2="12.01" y2="8" data-astro-cid-z76e4h7h></line> </svg> ${policy} </li>`)} </ul> <p class="policies-note" data-astro-cid-z76e4h7h>
更多詳細規定請參考 <a href="/policies" data-astro-cid-z76e4h7h>房規與政策頁面</a> </p> </section> <!-- Booking CTA --> <section class="cta-section" data-astro-cid-z76e4h7h> <div class="cta-card" data-astro-cid-z76e4h7h> <h2 data-astro-cid-z76e4h7h>準備好預訂了嗎？</h2> <p data-astro-cid-z76e4h7h>立即線上預訂，享受舒適假期</p> <div class="cta-buttons" data-astro-cid-z76e4h7h> <a href="https://booking.owlting.com/summerrockvilla" target="_blank" class="primary-btn" data-astro-cid-z76e4h7h>
線上訂房
</a> <a href="/contact" class="secondary-btn" data-astro-cid-z76e4h7h> 聯絡我們 </a> </div> </div> </section> <!-- Other Rooms --> <section class="other-rooms-section" data-astro-cid-z76e4h7h> <h2 class="section-title" data-astro-cid-z76e4h7h>其他房型</h2> <div class="other-rooms-grid" data-astro-cid-z76e4h7h> <a href="/rooms/deluxe-room" class="other-room-card" data-astro-cid-z76e4h7h> <img src="/deluxe-room.png" alt="豪華雙人房" loading="lazy" data-astro-cid-z76e4h7h> <h3 data-astro-cid-z76e4h7h>豪華雙人房</h3> <p data-astro-cid-z76e4h7h>浪漫雙人，溫馨舒適</p> </a> <a href="/rooms/family-suite" class="other-room-card" data-astro-cid-z76e4h7h> <img src="/family-suite.png" alt="家庭套房" loading="lazy" data-astro-cid-z76e4h7h> <h3 data-astro-cid-z76e4h7h>家庭套房</h3> <p data-astro-cid-z76e4h7h>適合4人，寬敞舒適</p> </a> <a href="/rooms/villa" class="other-room-card" data-astro-cid-z76e4h7h> <img src="/villa-room.png" alt="獨棟別墅" loading="lazy" data-astro-cid-z76e4h7h> <h3 data-astro-cid-z76e4h7h>獨棟別墅</h3> <p data-astro-cid-z76e4h7h>6-8人，獨立空間</p> </a> </div> </section> </div> ` })} `;
}, "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/\u6211\u7684\u96F2\u7AEF\u786C\u789F/03_\u8CC7\u6E90\u8207\u8208\u8DA3 (Resources)/01_\u77E5\u8B58\u9AD4\u7CFB/\u7A0B\u5F0F\u8A2D\u8A08/\u590F\u6D1B\u514B\u6C11\u5BBF\u65B0\u7DB2\u7AD9/src/pages/rooms/lake-suite.astro", void 0);

const $$file = "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/我的雲端硬碟/03_資源與興趣 (Resources)/01_知識體系/程式設計/夏洛克民宿新網站/src/pages/rooms/lake-suite.astro";
const $$url = "/rooms/lake-suite";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$LakeSuite,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

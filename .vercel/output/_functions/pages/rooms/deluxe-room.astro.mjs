import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_D7yWafUH.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DnsG0h9q.mjs';
/* empty css                                          */
export { renderers } from '../../renderers.mjs';

const $$DeluxeRoom = createComponent(($$result, $$props, $$slots) => {
  const roomData = {
    name: "\u8C6A\u83EF\u96D9\u4EBA\u623F",
    englishName: "Deluxe Double Room",
    description: "\u6EAB\u99A8\u8212\u9069\u7684\u96D9\u4EBA\u7A7A\u9593\uFF0C\u5B8C\u7F8E\u9069\u5408\u60C5\u4FB6\u6216\u5546\u52D9\u65C5\u5BA2\u3002\u623F\u5167\u914D\u5099King Size\u5927\u5E8A\u8207\u9AD8\u7D1A\u5BE2\u5177\uFF0C\u8B93\u60A8\u4E00\u591C\u597D\u7720\u3002\u5927\u7247\u843D\u5730\u7A97\u5F15\u5165\u5145\u8DB3\u81EA\u7136\u5149\u7DDA\uFF0C\u642D\u914D\u73FE\u4EE3\u7C21\u7D04\u7684\u5BA4\u5167\u8A2D\u8A08\uFF0C\u71DF\u9020\u51FA\u8212\u9069\u653E\u9B06\u7684\u4F4F\u5BBF\u6C1B\u570D\u3002",
    capacity: "2\u4EBA",
    size: "\u7D0412\u576A\uFF0840\u5E73\u65B9\u7C73\uFF09",
    bedType: "King Size \u96D9\u4EBA\u5E8A\uFF08180x200cm\uFF09",
    images: [
      { src: "/deluxe-room.png", alt: "\u8C6A\u83EF\u96D9\u4EBA\u623F\u5168\u666F" },
      { src: "/deluxe-room.png", alt: "\u8C6A\u83EF\u96D9\u4EBA\u623F\u5E8A\u8216\u7279\u5BEB" },
      { src: "/deluxe-room.png", alt: "\u8C6A\u83EF\u96D9\u4EBA\u623F\u885B\u6D74\u8A2D\u5099" },
      { src: "/deluxe-room.png", alt: "\u8C6A\u83EF\u96D9\u4EBA\u623F\u7A97\u666F" }
    ],
    amenities: [
      {
        icon: "\u{1F6CF}\uFE0F",
        name: "King Size \u5E8A",
        description: "180x200cm \u9802\u7D1A\u5E8A\u588A\u914D\u9AD8\u7D1A\u5BE2\u5177"
      },
      {
        icon: "\u{1F6BF}",
        name: "\u7368\u7ACB\u885B\u6D74",
        description: "\u4E7E\u6FD5\u5206\u96E2\u6DCB\u6D74\u9593\uFF0C\u63D0\u4F9B\u6C90\u6D74\u7528\u54C1"
      },
      { icon: "\u2744\uFE0F", name: "\u51B7\u6C23\u7A7A\u8ABF", description: "\u500B\u5225\u63A7\u5236\u51B7\u6696\u7A7A\u8ABF\u7CFB\u7D71" },
      {
        icon: "\u{1F4FA}",
        name: "\u6DB2\u6676\u96FB\u8996",
        description: "50\u540B\u667A\u6167\u96FB\u8996\uFF0C\u53EF\u9023\u63A5Netflix"
      },
      { icon: "\u{1F310}", name: "\u9AD8\u901FWiFi", description: "\u514D\u8CBB\u7121\u7DDA\u7DB2\u8DEF\uFF0C\u901F\u5EA6\u7A69\u5B9A" },
      { icon: "\u2615", name: "\u5496\u5561\u8A2D\u5099", description: "\u81A0\u56CA\u5496\u5561\u6A5F\u8207\u8336\u5305" },
      {
        icon: "\u{1FA9F}",
        name: "\u843D\u5730\u7A97",
        description: "\u5927\u9762\u7A4D\u63A1\u5149\uFF0C\u53EF\u6B23\u8CDE\u5712\u5340\u666F\u8272"
      },
      { icon: "\u{1F512}", name: "\u96FB\u5B50\u9396", description: "\u5B89\u5168\u96FB\u5B50\u9580\u9396\u7CFB\u7D71" },
      {
        icon: "\u{1F9F4}",
        name: "\u76E5\u6D17\u7528\u54C1",
        description: "\u74B0\u4FDD\u6D17\u9AEE\u7CBE\u3001\u6C90\u6D74\u4E73\u3001\u4E73\u6DB2"
      },
      { icon: "\u{1F4A8}", name: "\u5439\u98A8\u6A5F", description: "\u5C08\u696D\u7D1A\u5439\u98A8\u6A5F" },
      { icon: "\u{1F50C}", name: "USB\u5145\u96FB", description: "\u5E8A\u982DUSB\u5145\u96FB\u63D2\u5EA7" },
      { icon: "\u{1FA91}", name: "\u4F11\u61A9\u5EA7\u6905", description: "\u8212\u9069\u55AE\u4EBA\u6C99\u767C\u8207\u8336\u51E0" }
    ],
    highlights: [
      "\u5BEC\u655E\u8212\u9069\u768412\u576A\u7A7A\u9593",
      "\u9802\u7D1AKing Size\u5E8A\u588A\u8207\u5BE2\u5177",
      "\u5927\u9762\u843D\u5730\u7A97\u63A1\u5149\u6975\u4F73",
      "\u4E7E\u6FD5\u5206\u96E2\u7368\u7ACB\u885B\u6D74",
      "\u514D\u8CBB\u9AD8\u901FWiFi\u8207\u667A\u6167\u96FB\u8996",
      "\u81A0\u56CA\u5496\u5561\u6A5F\u8207\u8336\u5305"
    ],
    policies: [
      "\u5165\u4F4F\u6642\u9593\uFF1A\u4E0B\u53483:00 PM\u4E4B\u5F8C",
      "\u9000\u623F\u6642\u9593\uFF1A\u4E0A\u534811:00 AM\u4E4B\u524D",
      "\u7981\u6B62\u5438\u83F8\uFF08\u5BA4\u5916\u8A2D\u6709\u5438\u83F8\u5340\uFF09",
      "\u4E0D\u53EF\u651C\u5E36\u5BF5\u7269",
      "\u52A0\u4EBA\u52A0\u5E8A\u9700\u984D\u5916\u6536\u8CBB",
      "\u63D0\u4F9B\u514D\u8CBB\u505C\u8ECA\u4F4D"
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${roomData.name} - \u590F\u6D1B\u514BVilla\u6C11\u5BBF`, "description": `${roomData.description} ${roomData.size}\u7684\u8212\u9069\u7A7A\u9593\uFF0C\u63D0\u4F9B${roomData.bedType}\uFF0C\u9069\u5408${roomData.capacity}\u5165\u4F4F\u3002`, "data-astro-cid-td34epqu": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="room-detail-container" data-astro-cid-td34epqu> <!-- Breadcrumb --> <div class="breadcrumb" data-astro-cid-td34epqu> <a href="/" data-astro-cid-td34epqu>首頁</a> <span class="separator" data-astro-cid-td34epqu>›</span> <a href="/portfolio" data-astro-cid-td34epqu>房型介紹</a> <span class="separator" data-astro-cid-td34epqu>›</span> <span class="current" data-astro-cid-td34epqu>${roomData.name}</span> </div> <!-- Hero Section --> <section class="hero-section" data-astro-cid-td34epqu> <div class="hero-content" data-astro-cid-td34epqu> <h1 data-astro-cid-td34epqu>${roomData.name}</h1> <p class="english-name" data-astro-cid-td34epqu>${roomData.englishName}</p> <p class="room-description" data-astro-cid-td34epqu>${roomData.description}</p> <div class="room-quick-info" data-astro-cid-td34epqu> <div class="info-badge" data-astro-cid-td34epqu> <span class="icon" data-astro-cid-td34epqu>👥</span> <span data-astro-cid-td34epqu>${roomData.capacity}</span> </div> <div class="info-badge" data-astro-cid-td34epqu> <span class="icon" data-astro-cid-td34epqu>📏</span> <span data-astro-cid-td34epqu>${roomData.size}</span> </div> <div class="info-badge" data-astro-cid-td34epqu> <span class="icon" data-astro-cid-td34epqu>🛏️</span> <span data-astro-cid-td34epqu>${roomData.bedType}</span> </div> </div> <a href="https://booking.owlting.com/summerrockvilla" target="_blank" class="main-cta-btn" data-astro-cid-td34epqu>
立即預訂此房型
</a> </div> <div class="hero-image" data-astro-cid-td34epqu> <img${addAttribute(roomData.images[0].src, "src")}${addAttribute(roomData.images[0].alt, "alt")} data-astro-cid-td34epqu> <div class="room-badge" data-astro-cid-td34epqu>熱門房型</div> </div> </section> <!-- Image Gallery --> <section class="gallery-section" data-astro-cid-td34epqu> <h2 class="section-title" data-astro-cid-td34epqu>房間照片</h2> <div class="image-grid" data-astro-cid-td34epqu> ${roomData.images.slice(1).map((image) => renderTemplate`<div class="gallery-item" data-astro-cid-td34epqu> <img${addAttribute(image.src, "src")}${addAttribute(image.alt, "alt")} loading="lazy" data-astro-cid-td34epqu> </div>`)} </div> </section> <!-- Room Amenities --> <section class="amenities-section" data-astro-cid-td34epqu> <h2 class="section-title" data-astro-cid-td34epqu>房間設施</h2> <div class="amenities-grid" data-astro-cid-td34epqu> ${roomData.amenities.map((amenity) => renderTemplate`<div class="amenity-card" data-astro-cid-td34epqu> <div class="amenity-icon" data-astro-cid-td34epqu>${amenity.icon}</div> <h3 data-astro-cid-td34epqu>${amenity.name}</h3> <p data-astro-cid-td34epqu>${amenity.description}</p> </div>`)} </div> </section> <!-- Highlights --> <section class="highlights-section" data-astro-cid-td34epqu> <h2 class="section-title" data-astro-cid-td34epqu>房型亮點</h2> <ul class="highlights-list" data-astro-cid-td34epqu> ${roomData.highlights.map((highlight) => renderTemplate`<li data-astro-cid-td34epqu> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-td34epqu> <polyline points="20 6 9 17 4 12" data-astro-cid-td34epqu></polyline> </svg> ${highlight} </li>`)} </ul> </section> <!-- Policies --> <section class="policies-section" data-astro-cid-td34epqu> <h2 class="section-title" data-astro-cid-td34epqu>入住須知</h2> <ul class="policies-list" data-astro-cid-td34epqu> ${roomData.policies.map((policy) => renderTemplate`<li data-astro-cid-td34epqu> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-td34epqu> <circle cx="12" cy="12" r="10" data-astro-cid-td34epqu></circle> <line x1="12" y1="16" x2="12" y2="12" data-astro-cid-td34epqu></line> <line x1="12" y1="8" x2="12.01" y2="8" data-astro-cid-td34epqu></line> </svg> ${policy} </li>`)} </ul> <p class="policies-note" data-astro-cid-td34epqu>
更多詳細規定請參考 <a href="/policies" data-astro-cid-td34epqu>房規與政策頁面</a> </p> </section> <!-- Booking CTA --> <section class="cta-section" data-astro-cid-td34epqu> <div class="cta-card" data-astro-cid-td34epqu> <h2 data-astro-cid-td34epqu>準備好預訂了嗎？</h2> <p data-astro-cid-td34epqu>立即線上預訂，享受舒適假期</p> <div class="cta-buttons" data-astro-cid-td34epqu> <a href="https://booking.owlting.com/summerrockvilla" target="_blank" class="primary-btn" data-astro-cid-td34epqu>
線上訂房
</a> <a href="/contact" class="secondary-btn" data-astro-cid-td34epqu> 聯絡我們 </a> </div> </div> </section> <!-- Other Rooms --> <section class="other-rooms-section" data-astro-cid-td34epqu> <h2 class="section-title" data-astro-cid-td34epqu>其他房型</h2> <div class="other-rooms-grid" data-astro-cid-td34epqu> <a href="/rooms/family-suite" class="other-room-card" data-astro-cid-td34epqu> <img src="/family-suite.png" alt="家庭套房" loading="lazy" data-astro-cid-td34epqu> <h3 data-astro-cid-td34epqu>家庭套房</h3> <p data-astro-cid-td34epqu>適合4人，寬敞舒適</p> </a> <a href="/rooms/lake-suite" class="other-room-card" data-astro-cid-td34epqu> <img src="/lake-suite.png" alt="湖景套房" loading="lazy" data-astro-cid-td34epqu> <h3 data-astro-cid-td34epqu>湖景套房</h3> <p data-astro-cid-td34epqu>私人湖景，浪漫氛圍</p> </a> <a href="/rooms/villa" class="other-room-card" data-astro-cid-td34epqu> <img src="/villa-room.png" alt="獨棟別墅" loading="lazy" data-astro-cid-td34epqu> <h3 data-astro-cid-td34epqu>獨棟別墅</h3> <p data-astro-cid-td34epqu>6-8人，獨立空間</p> </a> </div> </section> </div> ` })} `;
}, "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/\u6211\u7684\u96F2\u7AEF\u786C\u789F/03_\u8CC7\u6E90\u8207\u8208\u8DA3 (Resources)/01_\u77E5\u8B58\u9AD4\u7CFB/\u7A0B\u5F0F\u8A2D\u8A08/\u590F\u6D1B\u514B\u6C11\u5BBF\u65B0\u7DB2\u7AD9/src/pages/rooms/deluxe-room.astro", void 0);

const $$file = "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/我的雲端硬碟/03_資源與興趣 (Resources)/01_知識體系/程式設計/夏洛克民宿新網站/src/pages/rooms/deluxe-room.astro";
const $$url = "/rooms/deluxe-room";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$DeluxeRoom,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

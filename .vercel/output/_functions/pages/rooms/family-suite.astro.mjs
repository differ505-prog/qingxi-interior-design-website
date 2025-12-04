import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_D7yWafUH.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DnsG0h9q.mjs';
/* empty css                                           */
export { renderers } from '../../renderers.mjs';

const $$FamilySuite = createComponent(($$result, $$props, $$slots) => {
  const roomData = {
    name: "\u5BB6\u5EAD\u5957\u623F",
    englishName: "Family Suite",
    description: "\u5C08\u70BA\u5BB6\u5EAD\u8A2D\u8A08\u7684\u5BEC\u655E\u5957\u623F\uFF0C\u63D0\u4F9B\u5145\u88D5\u7684\u5C45\u4F4F\u7A7A\u9593\u8B93\u5168\u5BB6\u4EBA\u90FD\u80FD\u8212\u9069\u653E\u9B06\u3002\u5169\u5F35\u96D9\u4EBA\u5E8A\u914D\u7F6E\u53EF\u5BB9\u7D0D4\u4EBA\u5165\u4F4F\uFF0C\u7368\u7ACB\u7684\u8D77\u5C45\u7A7A\u9593\u8A2D\u6709\u6C99\u767C\u8207\u8336\u51E0\uFF0C\u8B93\u60A8\u6709\u66F4\u591A\u6D3B\u52D5\u8207\u4EA4\u6D41\u7684\u5834\u6240\u3002\u5927\u9762\u7A97\u6236\u53EF\u6B23\u8CDE\u5712\u5340\u7F8E\u9E97\u7684\u5EAD\u5712\u666F\u89C0\u3002",
    capacity: "4\u4EBA",
    size: "\u7D0418\u576A\uFF0860\u5E73\u65B9\u7C73\uFF09",
    bedType: "\u5169\u5F35\u96D9\u4EBA\u5E8A\uFF08\u5404150x200cm\uFF09",
    images: [
      { src: "/family-suite.png", alt: "\u5BB6\u5EAD\u5957\u623F\u5168\u666F" },
      { src: "/family-suite.png", alt: "\u5BB6\u5EAD\u5957\u623F\u81E5\u5BA4\u5340" },
      { src: "/family-suite.png", alt: "\u5BB6\u5EAD\u5957\u623F\u5BA2\u5EF3\u5340" },
      { src: "/family-suite.png", alt: "\u5BB6\u5EAD\u5957\u623F\u885B\u6D74" }
    ],
    amenities: [
      {
        icon: "\u{1F6CF}\uFE0F",
        name: "\u96D9\u5E8A\u914D\u7F6E",
        description: "\u5169\u5F35150x200cm\u96D9\u4EBA\u5E8A\uFF0C\u8212\u9069\u5E8A\u588A"
      },
      {
        icon: "\u{1F6CB}\uFE0F",
        name: "\u7368\u7ACB\u5BA2\u5EF3",
        description: "\u8212\u9069\u6C99\u767C\u3001\u8336\u51E0\uFF0C\u5B8C\u6574\u8D77\u5C45\u7A7A\u9593"
      },
      {
        icon: "\u{1F6BF}",
        name: "\u5927\u6D74\u5BA4",
        description: "\u4E7E\u6FD5\u5206\u96E2\uFF0C\u6D74\u7F38\u8207\u6DCB\u6D74\u8A2D\u5099\u9F4A\u5168"
      },
      {
        icon: "\u{1F333}",
        name: "\u5EAD\u5712\u666F\u89C0",
        description: "\u5927\u9762\u7A97\u6236\uFF0C\u6B23\u8CDE\u5712\u5340\u7DA0\u610F\u76CE\u7136"
      },
      { icon: "\u2744\uFE0F", name: "\u51B7\u6C23\u7A7A\u8ABF", description: "\u96D9\u5340\u7368\u7ACB\u63A7\u5236\u51B7\u6696\u7A7A\u8ABF" },
      {
        icon: "\u{1F4FA}",
        name: "55\u540B\u96FB\u8996",
        description: "\u5927\u87A2\u5E55\u667A\u6167\u96FB\u8996\uFF0C\u652F\u63F4\u4E32\u6D41"
      },
      {
        icon: "\u{1F310}",
        name: "\u9AD8\u901FWiFi",
        description: "\u514D\u8CBB\u7121\u7DDA\u7DB2\u8DEF\uFF0C\u591A\u8A2D\u5099\u9023\u63A5"
      },
      {
        icon: "\u2615",
        name: "\u8336\u6C34\u5427",
        description: "\u5496\u5561\u6A5F\u3001\u5FEB\u716E\u58FA\u3001\u8336\u5305\u3001\u5496\u5561"
      },
      { icon: "\u{1F512}", name: "\u96FB\u5B50\u9396", description: "\u5B89\u5168\u96FB\u5B50\u9580\u9396\u7CFB\u7D71" },
      { icon: "\u{1F9F4}", name: "\u76E5\u6D17\u7528\u54C1", description: "\u5168\u5957\u74B0\u4FDD\u6C90\u6D74\u5099\u54C1" },
      { icon: "\u{1F4A8}", name: "\u5439\u98A8\u6A5F", description: "\u5C08\u696D\u7D1A\u5439\u98A8\u6A5F" },
      { icon: "\u{1FA91}", name: "\u7528\u9910\u5340", description: "\u5C0F\u578B\u9910\u684C\u6905\uFF0C\u53EF\u65BC\u623F\u5167\u7528\u9910" },
      { icon: "\u{1F50C}", name: "\u591A\u63D2\u5EA7", description: "\u623F\u9593\u591A\u8655\u914D\u7F6E\u5145\u96FB\u63D2\u5EA7" },
      { icon: "\u{1F9F8}", name: "\u5152\u7AE5\u53CB\u5584", description: "\u53EF\u63D0\u4F9B\u5B30\u5152\u5E8A\u3001\u5152\u7AE5\u5099\u54C1" }
    ],
    highlights: [
      "\u5BEC\u655E18\u576A\u5BB6\u5EAD\u5C08\u5C6C\u7A7A\u9593",
      "\u7368\u7ACB\u5BA2\u5EF3\u5340\u57DF\uFF0C\u5BB6\u4EBA\u5171\u4EAB\u6642\u5149",
      "\u5169\u5F35\u96D9\u4EBA\u5E8A\uFF0C\u8212\u9069\u7761\u7720\u54C1\u8CEA",
      "\u5927\u6D74\u5BA4\u914D\u6D74\u7F38\uFF0C\u9069\u5408\u89AA\u5B50\u4F7F\u7528",
      "\u5EAD\u5712\u666F\u89C0\u7A97\uFF0C\u81EA\u7136\u63A1\u5149\u4F73",
      "\u5152\u7AE5\u53CB\u5584\u8A2D\u65BD\u8207\u5099\u54C1",
      "\u53EF\u5BB9\u7D0D4\u4EBA\uFF0C\u9069\u5408\u5BB6\u5EAD\u65C5\u904A"
    ],
    policies: [
      "\u5165\u4F4F\u6642\u9593\uFF1A\u4E0B\u53483:00 PM\u4E4B\u5F8C",
      "\u9000\u623F\u6642\u9593\uFF1A\u4E0A\u534811:00 AM\u4E4B\u524D",
      "\u7981\u6B62\u5438\u83F8\uFF08\u5BA4\u5916\u8A2D\u6709\u5438\u83F8\u5340\uFF09",
      "\u4E0D\u53EF\u651C\u5E36\u5BF5\u7269",
      "\u53EF\u514D\u8CBB\u52A0\u4E00\u4F4D12\u6B72\u4EE5\u4E0B\u5152\u7AE5\uFF08\u4E0D\u4F54\u5E8A\uFF09",
      "\u53EF\u63D0\u4F9B\u5B30\u5152\u5E8A\u8207\u5152\u7AE5\u5099\u54C1\uFF08\u9700\u63D0\u524D\u9810\u7D04\uFF09",
      "\u63D0\u4F9B\u514D\u8CBB\u505C\u8ECA\u4F4D"
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${roomData.name} - \u590F\u6D1B\u514BVilla\u6C11\u5BBF`, "description": `${roomData.description} ${roomData.size}\u7684\u5BB6\u5EAD\u7A7A\u9593\uFF0C\u63D0\u4F9B${roomData.bedType}\uFF0C\u9069\u5408${roomData.capacity}\u5165\u4F4F\u3002`, "data-astro-cid-awkdpak4": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="room-detail-container" data-astro-cid-awkdpak4> <!-- Breadcrumb --> <div class="breadcrumb" data-astro-cid-awkdpak4> <a href="/" data-astro-cid-awkdpak4>首頁</a> <span class="separator" data-astro-cid-awkdpak4>›</span> <a href="/portfolio" data-astro-cid-awkdpak4>房型介紹</a> <span class="separator" data-astro-cid-awkdpak4>›</span> <span class="current" data-astro-cid-awkdpak4>${roomData.name}</span> </div> <!-- Hero Section --> <section class="hero-section" data-astro-cid-awkdpak4> <div class="hero-content" data-astro-cid-awkdpak4> <h1 data-astro-cid-awkdpak4>${roomData.name}</h1> <p class="english-name" data-astro-cid-awkdpak4>${roomData.englishName}</p> <p class="room-description" data-astro-cid-awkdpak4>${roomData.description}</p> <div class="room-quick-info" data-astro-cid-awkdpak4> <div class="info-badge" data-astro-cid-awkdpak4> <span class="icon" data-astro-cid-awkdpak4>👨‍👩‍👧‍👦</span> <span data-astro-cid-awkdpak4>${roomData.capacity}</span> </div> <div class="info-badge" data-astro-cid-awkdpak4> <span class="icon" data-astro-cid-awkdpak4>📏</span> <span data-astro-cid-awkdpak4>${roomData.size}</span> </div> <div class="info-badge" data-astro-cid-awkdpak4> <span class="icon" data-astro-cid-awkdpak4>🛏️</span> <span data-astro-cid-awkdpak4>${roomData.bedType}</span> </div> </div> <a href="https://booking.owlting.com/summerrockvilla" target="_blank" class="main-cta-btn" data-astro-cid-awkdpak4>
立即預訂此房型
</a> </div> <div class="hero-image" data-astro-cid-awkdpak4> <img${addAttribute(roomData.images[0].src, "src")}${addAttribute(roomData.images[0].alt, "alt")} data-astro-cid-awkdpak4> <div class="room-badge family" data-astro-cid-awkdpak4>家庭首選</div> </div> </section> <!-- Image Gallery --> <section class="gallery-section" data-astro-cid-awkdpak4> <h2 class="section-title" data-astro-cid-awkdpak4>房間照片</h2> <div class="image-grid" data-astro-cid-awkdpak4> ${roomData.images.slice(1).map((image) => renderTemplate`<div class="gallery-item" data-astro-cid-awkdpak4> <img${addAttribute(image.src, "src")}${addAttribute(image.alt, "alt")} loading="lazy" data-astro-cid-awkdpak4> </div>`)} </div> </section> <!-- Room Amenities --> <section class="amenities-section" data-astro-cid-awkdpak4> <h2 class="section-title" data-astro-cid-awkdpak4>房間設施</h2> <div class="amenities-grid" data-astro-cid-awkdpak4> ${roomData.amenities.map((amenity) => renderTemplate`<div class="amenity-card" data-astro-cid-awkdpak4> <div class="amenity-icon" data-astro-cid-awkdpak4>${amenity.icon}</div> <h3 data-astro-cid-awkdpak4>${amenity.name}</h3> <p data-astro-cid-awkdpak4>${amenity.description}</p> </div>`)} </div> </section> <!-- Highlights --> <section class="highlights-section" data-astro-cid-awkdpak4> <h2 class="section-title" data-astro-cid-awkdpak4>房型亮點</h2> <ul class="highlights-list" data-astro-cid-awkdpak4> ${roomData.highlights.map((highlight) => renderTemplate`<li data-astro-cid-awkdpak4> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-awkdpak4> <polyline points="20 6 9 17 4 12" data-astro-cid-awkdpak4></polyline> </svg> ${highlight} </li>`)} </ul> </section> <!-- Policies --> <section class="policies-section" data-astro-cid-awkdpak4> <h2 class="section-title" data-astro-cid-awkdpak4>入住須知</h2> <ul class="policies-list" data-astro-cid-awkdpak4> ${roomData.policies.map((policy) => renderTemplate`<li data-astro-cid-awkdpak4> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-awkdpak4> <circle cx="12" cy="12" r="10" data-astro-cid-awkdpak4></circle> <line x1="12" y1="16" x2="12" y2="12" data-astro-cid-awkdpak4></line> <line x1="12" y1="8" x2="12.01" y2="8" data-astro-cid-awkdpak4></line> </svg> ${policy} </li>`)} </ul> <p class="policies-note" data-astro-cid-awkdpak4>
更多詳細規定請參考 <a href="/policies" data-astro-cid-awkdpak4>房規與政策頁面</a> </p> </section> <!-- Booking CTA --> <section class="cta-section" data-astro-cid-awkdpak4> <div class="cta-card" data-astro-cid-awkdpak4> <h2 data-astro-cid-awkdpak4>準備好預訂了嗎？</h2> <p data-astro-cid-awkdpak4>立即線上預訂，享受舒適假期</p> <div class="cta-buttons" data-astro-cid-awkdpak4> <a href="https://booking.owlting.com/summerrockvilla" target="_blank" class="primary-btn" data-astro-cid-awkdpak4>
線上訂房
</a> <a href="/contact" class="secondary-btn" data-astro-cid-awkdpak4> 聯絡我們 </a> </div> </div> </section> <!-- Other Rooms --> <section class="other-rooms-section" data-astro-cid-awkdpak4> <h2 class="section-title" data-astro-cid-awkdpak4>其他房型</h2> <div class="other-rooms-grid" data-astro-cid-awkdpak4> <a href="/rooms/deluxe-room" class="other-room-card" data-astro-cid-awkdpak4> <img src="/deluxe-room.png" alt="豪華雙人房" loading="lazy" data-astro-cid-awkdpak4> <h3 data-astro-cid-awkdpak4>豪華雙人房</h3> <p data-astro-cid-awkdpak4>浪漫雙人，溫馨舒適</p> </a> <a href="/rooms/lake-suite" class="other-room-card" data-astro-cid-awkdpak4> <img src="/lake-suite.png" alt="湖景套房" loading="lazy" data-astro-cid-awkdpak4> <h3 data-astro-cid-awkdpak4>湖景套房</h3> <p data-astro-cid-awkdpak4>私人湖景，浪漫氛圍</p> </a> <a href="/rooms/villa" class="other-room-card" data-astro-cid-awkdpak4> <img src="/villa-room.png" alt="獨棟別墅" loading="lazy" data-astro-cid-awkdpak4> <h3 data-astro-cid-awkdpak4>獨棟別墅</h3> <p data-astro-cid-awkdpak4>6-8人，獨立空間</p> </a> </div> </section> </div> ` })} `;
}, "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/\u6211\u7684\u96F2\u7AEF\u786C\u789F/03_\u8CC7\u6E90\u8207\u8208\u8DA3 (Resources)/01_\u77E5\u8B58\u9AD4\u7CFB/\u7A0B\u5F0F\u8A2D\u8A08/\u590F\u6D1B\u514B\u6C11\u5BBF\u65B0\u7DB2\u7AD9/src/pages/rooms/family-suite.astro", void 0);

const $$file = "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/我的雲端硬碟/03_資源與興趣 (Resources)/01_知識體系/程式設計/夏洛克民宿新網站/src/pages/rooms/family-suite.astro";
const $$url = "/rooms/family-suite";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$FamilySuite,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

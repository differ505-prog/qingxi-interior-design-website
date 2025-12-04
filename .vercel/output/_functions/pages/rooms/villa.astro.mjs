import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_D7yWafUH.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DnsG0h9q.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Villa = createComponent(($$result, $$props, $$slots) => {
  const roomData = {
    name: "\u7368\u68DF\u5225\u5885",
    englishName: "Private Villa",
    description: "\u5B8C\u5168\u7368\u7ACB\u7684\u9802\u7D1AVilla\u7A7A\u9593\uFF0C\u64C1\u6709\u5C08\u5C6C\u5EAD\u5712\u8207\u7368\u7ACB\u5165\u53E3\uFF0C\u5B9B\u5982\u79C1\u4EBA\u838A\u5712\u822C\u7684\u5962\u83EF\u9AD4\u9A57\u3002\u4E09\u9593\u81E5\u5BA4\u914D\u7F6E\u53EF\u5BB9\u7D0D6-8\u4EBA\uFF0C\u975E\u5E38\u9069\u5408\u5927\u5BB6\u5EAD\u805A\u6703\u6216\u597D\u53CB\u5718\u9AD4\u5305\u68DF\u3002\u5BEC\u655E\u7684\u5BA2\u5EF3\u3001\u7528\u9910\u5340\u8207\u6236\u5916\u5EAD\u5712\uFF0C\u63D0\u4F9B\u5145\u8DB3\u7684\u6D3B\u52D5\u7A7A\u9593\u3002\u7368\u4EAB\u5C08\u5C6C\u7684\u79C1\u5BC6\u6027\u8207\u81EA\u7531\u5EA6\uFF0C\u662F\u5718\u9AD4\u65C5\u904A\u7684\u6700\u4F73\u9078\u64C7\u3002",
    capacity: "6-8\u4EBA",
    size: "\u7D0440\u576A\uFF08132\u5E73\u65B9\u7C73\uFF09",
    bedType: "3\u9593\u81E5\u5BA4\uFF081 King + 2 Queen\uFF09",
    images: [
      { src: "/villa-room.png", alt: "\u7368\u68DF\u5225\u5885\u5916\u89C0" },
      { src: "/villa-room.png", alt: "\u5225\u5885\u5BA2\u5EF3\u7A7A\u9593" },
      { src: "/villa-room.png", alt: "\u5225\u5885\u4E3B\u81E5\u5BA4" },
      { src: "/villa-room.png", alt: "\u5225\u5885\u79C1\u4EBA\u5EAD\u5712" }
    ],
    amenities: [
      {
        icon: "\u{1F3E1}",
        name: "\u7368\u68DF\u5EFA\u7BC9",
        description: "\u5B8C\u5168\u7368\u7ACB\u7684villa\uFF0C\u5C08\u5C6C\u5165\u53E3\u8207\u7A7A\u9593"
      },
      {
        icon: "\u{1F333}",
        name: "\u79C1\u4EBA\u5EAD\u5712",
        description: "\u5C08\u5C6C\u6236\u5916\u5EAD\u5712\uFF0C\u53EF\u70E4\u8089\u805A\u6703"
      },
      {
        icon: "\u{1F6CF}\uFE0F",
        name: "3\u9593\u81E5\u5BA4",
        description: "\u4E3B\u81E5King\u5E8A\uFF0C\u5169\u9593Queen\u96D9\u4EBA\u5E8A"
      },
      { icon: "\u{1F525}", name: "\u58C1\u7210", description: "\u88DD\u98FE\u58C1\u7210\uFF0C\u589E\u6DFB\u6EAB\u99A8\u6C1B\u570D" },
      {
        icon: "\u{1F6CB}\uFE0F",
        name: "\u5927\u5BA2\u5EF3",
        description: "\u5BEC\u655E\u5BA2\u5EF3\uFF0C\u591A\u4EBA\u6C99\u767C\u8207\u5A1B\u6A02\u8A2D\u65BD"
      },
      { icon: "\u{1F37D}\uFE0F", name: "\u7528\u9910\u5340", description: "\u7368\u7ACB\u9910\u5EF3\uFF0C8\u4EBA\u5EA7\u5927\u9910\u684C" },
      {
        icon: "\u{1F373}",
        name: "\u5B8C\u6574\u5EDA\u623F",
        description: "\u51B0\u7BB1\u3001\u5FAE\u6CE2\u7210\u3001\u9910\u5177\uFF08\u4E0D\u542B\u74E6\u65AF\u7210\uFF09"
      },
      { icon: "\u{1F6BF}", name: "\u591A\u9593\u885B\u6D74", description: "2.5\u9593\u885B\u6D74\uFF0C\u4E7E\u6FD5\u5206\u96E2" },
      { icon: "\u2744\uFE0F", name: "\u5206\u5340\u7A7A\u8ABF", description: "\u5404\u623F\u9593\u7368\u7ACB\u63A7\u5236\u7A7A\u8ABF" },
      { icon: "\u{1F4FA}", name: "\u5927\u96FB\u8996", description: "65\u540B\u667A\u6167\u96FB\u8996\uFF0C\u97F3\u97FF\u7CFB\u7D71" },
      {
        icon: "\u{1F310}",
        name: "\u9AD8\u901FWiFi",
        description: "\u5168\u5C4BWiFi\u8986\u84CB\uFF0C\u591A\u8A2D\u5099\u9023\u63A5"
      },
      { icon: "\u2615", name: "\u5496\u5561\u5427", description: "\u5496\u5561\u6A5F\u3001\u5FEB\u716E\u58FA\u3001\u9910\u5177\u7D44" },
      { icon: "\u{1F9FA}", name: "\u6D17\u8863\u6A5F", description: "\u7368\u7ACB\u6D17\u8863\u6A5F\uFF08\u9577\u4F4F\u4FBF\u5229\uFF09" },
      { icon: "\u{1F512}", name: "\u96FB\u5B50\u9396", description: "\u96D9\u91CD\u5B89\u5168\u9580\u9396\u7CFB\u7D71" },
      { icon: "\u{1F17F}\uFE0F", name: "\u5C08\u5C6C\u505C\u8ECA", description: "2-3\u500B\u5C08\u5C6C\u505C\u8ECA\u4F4D" },
      { icon: "\u{1F33A}", name: "\u5EAD\u5712\u5EA7\u6905", description: "\u6236\u5916\u684C\u6905\uFF0C\u4EAB\u53D7\u6236\u5916\u6642\u5149" }
    ],
    highlights: [
      "40\u576A\u8D85\u5927\u7368\u7ACB\u7A7A\u9593",
      "3\u9593\u81E5\u5BA4\uFF0C\u53EF\u5BB9\u7D0D6-8\u4EBA",
      "\u5C08\u5C6C\u79C1\u4EBA\u5EAD\u5712\uFF0C\u53EF\u70E4\u8089\u805A\u6703",
      "\u5B8C\u6574\u5BA2\u5EF3\u3001\u9910\u5EF3\u3001\u5EDA\u623F\u914D\u7F6E",
      "\u5B8C\u5168\u7368\u7ACB\uFF0C\u9AD8\u5EA6\u79C1\u5BC6\u6027",
      "\u9069\u5408\u5BB6\u5EAD\u5718\u805A\u3001\u670B\u53CB\u5305\u68DF",
      "\u5C08\u5C6C\u505C\u8ECA\u4F4D\uFF0C\u51FA\u5165\u65B9\u4FBF",
      "\u53EF\u52A0\u8CFC\u70E4\u8089\u5668\u5177\u8207\u98DF\u6750"
    ],
    policies: [
      "\u5165\u4F4F\u6642\u9593\uFF1A\u4E0B\u53483:00 PM\u4E4B\u5F8C",
      "\u9000\u623F\u6642\u9593\uFF1A\u4E0A\u534811:00 AM\u4E4B\u524D",
      "\u7981\u6B62\u5BA4\u5167\u5438\u83F8\uFF08\u6236\u5916\u5EAD\u5712\u53EF\u5438\u83F8\uFF09",
      "\u4E0D\u53EF\u651C\u5E36\u5BF5\u7269",
      "\u53EF\u52A0\u5E8A\u81F38\u4EBA\uFF08\u9700\u984D\u5916\u6536\u8CBB\uFF09",
      "\u70E4\u8089\u9700\u63D0\u524D\u9810\u7D04\u4E26\u52A0\u8CFC\u670D\u52D9",
      "\u5EFA\u8B70\u81F3\u5C11\u4F4F\u5BBF2\u665A\u4EE5\u4E0A",
      "\u5C08\u5C6C\u505C\u8ECA\u4F4D2-3\u500B",
      "\u9069\u5408\u5305\u68DF\u4F7F\u7528\uFF0C\u4EAB\u6709\u5B8C\u5168\u79C1\u5BC6\u6027"
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${roomData.name} - \u590F\u6D1B\u514BVilla\u6C11\u5BBF`, "description": `${roomData.description} ${roomData.size}\u7684\u5962\u83EF\u7368\u68DF\u7A7A\u9593\uFF0C\u63D0\u4F9B${roomData.bedType}\uFF0C\u9069\u5408${roomData.capacity}\u5165\u4F4F\u3002`, "data-astro-cid-puawbenx": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="room-detail-container" data-astro-cid-puawbenx> <!-- Breadcrumb --> <div class="breadcrumb" data-astro-cid-puawbenx> <a href="/" data-astro-cid-puawbenx>首頁</a> <span class="separator" data-astro-cid-puawbenx>›</span> <a href="/portfolio" data-astro-cid-puawbenx>房型介紹</a> <span class="separator" data-astro-cid-puawbenx>›</span> <span class="current" data-astro-cid-puawbenx>${roomData.name}</span> </div> <!-- Hero Section --> <section class="hero-section" data-astro-cid-puawbenx> <div class="hero-content" data-astro-cid-puawbenx> <h1 data-astro-cid-puawbenx>${roomData.name}</h1> <p class="english-name" data-astro-cid-puawbenx>${roomData.englishName}</p> <p class="room-description" data-astro-cid-puawbenx>${roomData.description}</p> <div class="room-quick-info" data-astro-cid-puawbenx> <div class="info-badge" data-astro-cid-puawbenx> <span class="icon" data-astro-cid-puawbenx>👨‍👩‍👧‍👦</span> <span data-astro-cid-puawbenx>${roomData.capacity}</span> </div> <div class="info-badge" data-astro-cid-puawbenx> <span class="icon" data-astro-cid-puawbenx>📏</span> <span data-astro-cid-puawbenx>${roomData.size}</span> </div> <div class="info-badge" data-astro-cid-puawbenx> <span class="icon" data-astro-cid-puawbenx>🏠</span> <span data-astro-cid-puawbenx>${roomData.bedType}</span> </div> </div> <a href="https://booking.owlting.com/summerrockvilla" target="_blank" class="main-cta-btn" data-astro-cid-puawbenx>
立即預訂此房型
</a> </div> <div class="hero-image" data-astro-cid-puawbenx> <img${addAttribute(roomData.images[0].src, "src")}${addAttribute(roomData.images[0].alt, "alt")} data-astro-cid-puawbenx> <div class="room-badge vip" data-astro-cid-puawbenx>VIP尊榮</div> </div> </section> <!-- Image Gallery --> <section class="gallery-section" data-astro-cid-puawbenx> <h2 class="section-title" data-astro-cid-puawbenx>房間照片</h2> <div class="image-grid" data-astro-cid-puawbenx> ${roomData.images.slice(1).map((image) => renderTemplate`<div class="gallery-item" data-astro-cid-puawbenx> <img${addAttribute(image.src, "src")}${addAttribute(image.alt, "alt")} loading="lazy" data-astro-cid-puawbenx> </div>`)} </div> </section> <!-- Room Amenities --> <section class="amenities-section" data-astro-cid-puawbenx> <h2 class="section-title" data-astro-cid-puawbenx>房間設施</h2> <div class="amenities-grid" data-astro-cid-puawbenx> ${roomData.amenities.map((amenity) => renderTemplate`<div class="amenity-card" data-astro-cid-puawbenx> <div class="amenity-icon" data-astro-cid-puawbenx>${amenity.icon}</div> <h3 data-astro-cid-puawbenx>${amenity.name}</h3> <p data-astro-cid-puawbenx>${amenity.description}</p> </div>`)} </div> </section> <!-- Highlights --> <section class="highlights-section" data-astro-cid-puawbenx> <h2 class="section-title" data-astro-cid-puawbenx>房型亮點</h2> <ul class="highlights-list" data-astro-cid-puawbenx> ${roomData.highlights.map((highlight) => renderTemplate`<li data-astro-cid-puawbenx> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-puawbenx> <polyline points="20 6 9 17 4 12" data-astro-cid-puawbenx></polyline> </svg> ${highlight} </li>`)} </ul> </section> <!-- Policies --> <section class="policies-section" data-astro-cid-puawbenx> <h2 class="section-title" data-astro-cid-puawbenx>入住須知</h2> <ul class="policies-list" data-astro-cid-puawbenx> ${roomData.policies.map((policy) => renderTemplate`<li data-astro-cid-puawbenx> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-puawbenx> <circle cx="12" cy="12" r="10" data-astro-cid-puawbenx></circle> <line x1="12" y1="16" x2="12" y2="12" data-astro-cid-puawbenx></line> <line x1="12" y1="8" x2="12.01" y2="8" data-astro-cid-puawbenx></line> </svg> ${policy} </li>`)} </ul> <p class="policies-note" data-astro-cid-puawbenx>
更多詳細規定請參考 <a href="/policies" data-astro-cid-puawbenx>房規與政策頁面</a> </p> </section> <!-- Booking CTA --> <section class="cta-section" data-astro-cid-puawbenx> <div class="cta-card" data-astro-cid-puawbenx> <h2 data-astro-cid-puawbenx>準備好預訂了嗎？</h2> <p data-astro-cid-puawbenx>立即線上預訂，享受舒適假期</p> <div class="cta-buttons" data-astro-cid-puawbenx> <a href="https://booking.owlting.com/summerrockvilla" target="_blank" class="primary-btn" data-astro-cid-puawbenx>
線上訂房
</a> <a href="/contact" class="secondary-btn" data-astro-cid-puawbenx> 聯絡我們 </a> </div> </div> </section> <!-- Other Rooms --> <section class="other-rooms-section" data-astro-cid-puawbenx> <h2 class="section-title" data-astro-cid-puawbenx>其他房型</h2> <div class="other-rooms-grid" data-astro-cid-puawbenx> <a href="/rooms/deluxe-room" class="other-room-card" data-astro-cid-puawbenx> <img src="/deluxe-room.png" alt="豪華雙人房" loading="lazy" data-astro-cid-puawbenx> <h3 data-astro-cid-puawbenx>豪華雙人房</h3> <p data-astro-cid-puawbenx>浪漫雙人，溫馨舒適</p> </a> <a href="/rooms/family-suite" class="other-room-card" data-astro-cid-puawbenx> <img src="/family-suite.png" alt="家庭套房" loading="lazy" data-astro-cid-puawbenx> <h3 data-astro-cid-puawbenx>家庭套房</h3> <p data-astro-cid-puawbenx>適合4人，寬敞舒適</p> </a> <a href="/rooms/lake-suite" class="other-room-card" data-astro-cid-puawbenx> <img src="/lake-suite.png" alt="湖景套房" loading="lazy" data-astro-cid-puawbenx> <h3 data-astro-cid-puawbenx>湖景套房</h3> <p data-astro-cid-puawbenx>私人湖景，浪漫氛圍</p> </a> </div> </section> </div> ` })} `;
}, "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/\u6211\u7684\u96F2\u7AEF\u786C\u789F/03_\u8CC7\u6E90\u8207\u8208\u8DA3 (Resources)/01_\u77E5\u8B58\u9AD4\u7CFB/\u7A0B\u5F0F\u8A2D\u8A08/\u590F\u6D1B\u514B\u6C11\u5BBF\u65B0\u7DB2\u7AD9/src/pages/rooms/villa.astro", void 0);

const $$file = "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/我的雲端硬碟/03_資源與興趣 (Resources)/01_知識體系/程式設計/夏洛克民宿新網站/src/pages/rooms/villa.astro";
const $$url = "/rooms/villa";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Villa,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

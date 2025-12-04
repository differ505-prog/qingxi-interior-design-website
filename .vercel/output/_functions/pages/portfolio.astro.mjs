import { e as createComponent, r as renderTemplate, o as defineScriptVars, h as addAttribute, m as maybeRenderHead, k as renderComponent } from '../chunks/astro/server_D7yWafUH.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DnsG0h9q.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$RoomComparison = createComponent(($$result, $$props, $$slots) => {
  const rooms = [
    {
      id: "deluxe",
      name: "\u8C6A\u83EF\u96D9\u4EBA\u623F",
      image: "/deluxe-room.png",
      price: "from NT$3,200",
      capacity: "2\u4EBA",
      size: "12\u576A",
      bed: "King Size",
      view: "\u5EAD\u5712\u666F\u89C0",
      bathroom: "\u6DCB\u6D74",
      features: [
        "\u7368\u7ACB\u885B\u6D74",
        "\u51B7\u6C23\u7A7A\u8ABF",
        "\u6DB2\u6676\u96FB\u8996",
        "WiFi",
        "\u5439\u98A8\u6A5F",
        "\u5496\u5561\u6A5F",
        "\u4FDD\u96AA\u7BB1",
        "Mini\u5427"
      ],
      url: "/rooms/deluxe-room"
    },
    {
      id: "family",
      name: "\u5BB6\u5EAD\u5957\u623F",
      image: "/family-suite.png",
      price: "from NT$4,800",
      capacity: "4\u4EBA",
      size: "18\u576A",
      bed: "2\u5F35\u96D9\u4EBA\u5E8A",
      view: "\u5EAD\u5712\u666F\u89C0",
      bathroom: "\u6DCB\u6D74+\u6D74\u7F38",
      features: [
        "\u7368\u7ACB\u5BA2\u5EF3",
        "\u5927\u6D74\u5BA4",
        "\u51B7\u6C23\u7A7A\u8ABF",
        "55\u540B\u96FB\u8996",
        "WiFi",
        "\u5496\u5561\u5427",
        "\u5152\u7AE5\u53CB\u5584",
        "\u7528\u9910\u5340"
      ],
      url: "/rooms/family-suite"
    },
    {
      id: "lake",
      name: "\u6E56\u666F\u5957\u623F",
      image: "/lake-suite.png",
      price: "from NT$4,200",
      capacity: "2-3\u4EBA",
      size: "15\u576A",
      bed: "King Size",
      view: "\u79C1\u4EBA\u6E56\u666F",
      bathroom: "\u6DCB\u6D74+\u6D74\u7F38",
      features: [
        "\u89C0\u666F\u967D\u53F0",
        "\u7368\u7ACB\u6D74\u7F38",
        "Nespresso",
        "\u96E8\u6DCB\u82B1\u7051",
        "WiFi",
        "\u6DB2\u6676\u96FB\u8996",
        "\u65E5\u51FA\u65E5\u843D\u666F\u89C0",
        "\u9AD8\u7D1A\u5099\u54C1"
      ],
      url: "/rooms/lake-suite"
    },
    {
      id: "villa",
      name: "\u7368\u68DF\u5225\u5885",
      image: "/villa-room.png",
      price: "from NT$12,000",
      capacity: "6-8\u4EBA",
      size: "40\u576A",
      bed: "3\u81E5\u5BA4",
      view: "\u79C1\u4EBA\u5EAD\u5712",
      bathroom: "2.5\u9593\u885B\u6D74",
      features: [
        "\u7368\u68DF\u5EFA\u7BC9",
        "\u79C1\u4EBA\u5EAD\u5712",
        "\u5B8C\u6574\u5EDA\u623F",
        "\u5BA2\u5EF3\u9910\u5EF3",
        "\u58C1\u7210",
        "\u6D17\u8863\u6A5F",
        "\u5C08\u5C6C\u505C\u8ECA\u4F4D",
        "\u70E4\u8089\u5340"
      ],
      url: "/rooms/villa"
    }
  ];
  return renderTemplate(_a || (_a = __template(["", '<div class="comparison-tool" data-astro-cid-2pthjhf3> <div class="comparison-header" data-astro-cid-2pthjhf3> <h2 data-astro-cid-2pthjhf3>\u623F\u578B\u6BD4\u8F03</h2> <p data-astro-cid-2pthjhf3>\u9078\u64C7\u6700\u591A3\u500B\u623F\u578B\u9032\u884C\u6BD4\u8F03\uFF0C\u627E\u5230\u6700\u9069\u5408\u60A8\u7684\u9078\u64C7</p> </div> <div class="room-selector" data-astro-cid-2pthjhf3> ', ' </div> <div class="comparison-actions" data-astro-cid-2pthjhf3> <button class="compare-btn" id="compareBtn" disabled data-astro-cid-2pthjhf3>\n\u958B\u59CB\u6BD4\u8F03 (<span id="selectedCount" data-astro-cid-2pthjhf3>0</span>/3)\n</button> <button class="reset-btn" id="resetBtn" data-astro-cid-2pthjhf3>\u91CD\u7F6E\u9078\u64C7</button> </div> <div class="comparison-table-container" id="comparisonTableContainer" style="display: none;" data-astro-cid-2pthjhf3> <table class="comparison-table" id="comparisonTable" data-astro-cid-2pthjhf3> <thead data-astro-cid-2pthjhf3> <tr data-astro-cid-2pthjhf3> <th class="feature-col" data-astro-cid-2pthjhf3>\u9805\u76EE</th> <!-- Dynamic columns will be inserted here --> </tr> </thead> <tbody data-astro-cid-2pthjhf3> <!-- Dynamic rows will be inserted here --> </tbody> </table> <div class="comparison-footer" data-astro-cid-2pthjhf3> <button class="close-comparison" id="closeComparison" data-astro-cid-2pthjhf3>\u95DC\u9589\u6BD4\u8F03</button> </div> </div> </div>  <script>(function(){', '\n    document.addEventListener("DOMContentLoaded", () => {\n        const checkboxes = document.querySelectorAll(\'input[name="room"]\');\n        const compareBtn = document.getElementById("compareBtn");\n        const resetBtn = document.getElementById("resetBtn");\n        const selectedCount = document.getElementById("selectedCount");\n        const comparisonTableContainer = document.getElementById(\n            "comparisonTableContainer",\n        );\n        const comparisonTable = document.getElementById("comparisonTable");\n        const closeComparisonBtn = document.getElementById("closeComparison");\n\n        let selected = [];\n\n        function updateSelection() {\n            selected = Array.from(checkboxes)\n                .filter((cb) => cb.checked)\n                .map((cb) => cb.value);\n\n            selectedCount.textContent = selected.length;\n            compareBtn.disabled = selected.length < 2;\n\n            // Limit to 3 selections\n            if (selected.length >= 3) {\n                checkboxes.forEach((cb) => {\n                    if (!cb.checked) cb.disabled = true;\n                });\n            } else {\n                checkboxes.forEach((cb) => (cb.disabled = false));\n            }\n        }\n\n        function showComparison() {\n            const selectedRooms = rooms.filter((room) =>\n                selected.includes(room.id),\n            );\n\n            // Build table header\n            const thead = comparisonTable.querySelector("thead tr");\n            thead.innerHTML = \'<th class="feature-col">\u9805\u76EE</th>\';\n            selectedRooms.forEach((room) => {\n                thead.innerHTML += `<th>${room.name}</th>`;\n            });\n\n            // Build table body\n            const tbody = comparisonTable.querySelector("tbody");\n            tbody.innerHTML = `\n        <tr>\n          <td class="feature-col">\u5716\u7247</td>\n          ${selectedRooms\n              .map(\n                  (room) => `\n            <td><img src="${room.image}" alt="${room.name}" class="room-image" /></td>\n          `,\n              )\n              .join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u50F9\u683C</td>\n          ${selectedRooms\n              .map(\n                  (room) => `\n            <td class="price-tag">${room.price}</td>\n          `,\n              )\n              .join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u5BB9\u7D0D\u4EBA\u6578</td>\n          ${selectedRooms.map((room) => `<td>${room.capacity}</td>`).join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u576A\u6578</td>\n          ${selectedRooms.map((room) => `<td>${room.size}</td>`).join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u5E8A\u578B</td>\n          ${selectedRooms.map((room) => `<td>${room.bed}</td>`).join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u666F\u89C0</td>\n          ${selectedRooms.map((room) => `<td>${room.view}</td>`).join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u885B\u6D74</td>\n          ${selectedRooms.map((room) => `<td>${room.bathroom}</td>`).join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u4E3B\u8981\u8A2D\u65BD</td>\n          ${selectedRooms\n              .map(\n                  (room) => `\n            <td>\n              <ul class="feature-list">\n                ${room.features\n                    .slice(0, 6)\n                    .map((f) => `<li>${f}</li>`)\n                    .join("")}\n              </ul>\n            </td>\n          `,\n              )\n              .join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u67E5\u770B\u8A73\u60C5</td>\n          ${selectedRooms\n              .map(\n                  (room) => `\n            <td><a href="${room.url}" class="view-room-btn">\u67E5\u770B\u623F\u578B</a></td>\n          `,\n              )\n              .join("")}\n        </tr>\n      `;\n\n            comparisonTableContainer.style.display = "block";\n            comparisonTableContainer.scrollIntoView({\n                behavior: "smooth",\n                block: "start",\n            });\n        }\n\n        function resetSelection() {\n            checkboxes.forEach((cb) => {\n                cb.checked = false;\n                cb.disabled = false;\n            });\n            selected = [];\n            updateSelection();\n            comparisonTableContainer.style.display = "none";\n        }\n\n        checkboxes.forEach((cb) => {\n            cb.addEventListener("change", updateSelection);\n        });\n\n        compareBtn?.addEventListener("click", showComparison);\n        resetBtn?.addEventListener("click", resetSelection);\n        closeComparisonBtn?.addEventListener("click", () => {\n            comparisonTableContainer.style.display = "none";\n        });\n\n        updateSelection();\n    });\n})();<\/script>'], ["", '<div class="comparison-tool" data-astro-cid-2pthjhf3> <div class="comparison-header" data-astro-cid-2pthjhf3> <h2 data-astro-cid-2pthjhf3>\u623F\u578B\u6BD4\u8F03</h2> <p data-astro-cid-2pthjhf3>\u9078\u64C7\u6700\u591A3\u500B\u623F\u578B\u9032\u884C\u6BD4\u8F03\uFF0C\u627E\u5230\u6700\u9069\u5408\u60A8\u7684\u9078\u64C7</p> </div> <div class="room-selector" data-astro-cid-2pthjhf3> ', ' </div> <div class="comparison-actions" data-astro-cid-2pthjhf3> <button class="compare-btn" id="compareBtn" disabled data-astro-cid-2pthjhf3>\n\u958B\u59CB\u6BD4\u8F03 (<span id="selectedCount" data-astro-cid-2pthjhf3>0</span>/3)\n</button> <button class="reset-btn" id="resetBtn" data-astro-cid-2pthjhf3>\u91CD\u7F6E\u9078\u64C7</button> </div> <div class="comparison-table-container" id="comparisonTableContainer" style="display: none;" data-astro-cid-2pthjhf3> <table class="comparison-table" id="comparisonTable" data-astro-cid-2pthjhf3> <thead data-astro-cid-2pthjhf3> <tr data-astro-cid-2pthjhf3> <th class="feature-col" data-astro-cid-2pthjhf3>\u9805\u76EE</th> <!-- Dynamic columns will be inserted here --> </tr> </thead> <tbody data-astro-cid-2pthjhf3> <!-- Dynamic rows will be inserted here --> </tbody> </table> <div class="comparison-footer" data-astro-cid-2pthjhf3> <button class="close-comparison" id="closeComparison" data-astro-cid-2pthjhf3>\u95DC\u9589\u6BD4\u8F03</button> </div> </div> </div>  <script>(function(){', '\n    document.addEventListener("DOMContentLoaded", () => {\n        const checkboxes = document.querySelectorAll(\'input[name="room"]\');\n        const compareBtn = document.getElementById("compareBtn");\n        const resetBtn = document.getElementById("resetBtn");\n        const selectedCount = document.getElementById("selectedCount");\n        const comparisonTableContainer = document.getElementById(\n            "comparisonTableContainer",\n        );\n        const comparisonTable = document.getElementById("comparisonTable");\n        const closeComparisonBtn = document.getElementById("closeComparison");\n\n        let selected = [];\n\n        function updateSelection() {\n            selected = Array.from(checkboxes)\n                .filter((cb) => cb.checked)\n                .map((cb) => cb.value);\n\n            selectedCount.textContent = selected.length;\n            compareBtn.disabled = selected.length < 2;\n\n            // Limit to 3 selections\n            if (selected.length >= 3) {\n                checkboxes.forEach((cb) => {\n                    if (!cb.checked) cb.disabled = true;\n                });\n            } else {\n                checkboxes.forEach((cb) => (cb.disabled = false));\n            }\n        }\n\n        function showComparison() {\n            const selectedRooms = rooms.filter((room) =>\n                selected.includes(room.id),\n            );\n\n            // Build table header\n            const thead = comparisonTable.querySelector("thead tr");\n            thead.innerHTML = \'<th class="feature-col">\u9805\u76EE</th>\';\n            selectedRooms.forEach((room) => {\n                thead.innerHTML += \\`<th>\\${room.name}</th>\\`;\n            });\n\n            // Build table body\n            const tbody = comparisonTable.querySelector("tbody");\n            tbody.innerHTML = \\`\n        <tr>\n          <td class="feature-col">\u5716\u7247</td>\n          \\${selectedRooms\n              .map(\n                  (room) => \\`\n            <td><img src="\\${room.image}" alt="\\${room.name}" class="room-image" /></td>\n          \\`,\n              )\n              .join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u50F9\u683C</td>\n          \\${selectedRooms\n              .map(\n                  (room) => \\`\n            <td class="price-tag">\\${room.price}</td>\n          \\`,\n              )\n              .join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u5BB9\u7D0D\u4EBA\u6578</td>\n          \\${selectedRooms.map((room) => \\`<td>\\${room.capacity}</td>\\`).join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u576A\u6578</td>\n          \\${selectedRooms.map((room) => \\`<td>\\${room.size}</td>\\`).join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u5E8A\u578B</td>\n          \\${selectedRooms.map((room) => \\`<td>\\${room.bed}</td>\\`).join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u666F\u89C0</td>\n          \\${selectedRooms.map((room) => \\`<td>\\${room.view}</td>\\`).join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u885B\u6D74</td>\n          \\${selectedRooms.map((room) => \\`<td>\\${room.bathroom}</td>\\`).join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u4E3B\u8981\u8A2D\u65BD</td>\n          \\${selectedRooms\n              .map(\n                  (room) => \\`\n            <td>\n              <ul class="feature-list">\n                \\${room.features\n                    .slice(0, 6)\n                    .map((f) => \\`<li>\\${f}</li>\\`)\n                    .join("")}\n              </ul>\n            </td>\n          \\`,\n              )\n              .join("")}\n        </tr>\n        <tr>\n          <td class="feature-col">\u67E5\u770B\u8A73\u60C5</td>\n          \\${selectedRooms\n              .map(\n                  (room) => \\`\n            <td><a href="\\${room.url}" class="view-room-btn">\u67E5\u770B\u623F\u578B</a></td>\n          \\`,\n              )\n              .join("")}\n        </tr>\n      \\`;\n\n            comparisonTableContainer.style.display = "block";\n            comparisonTableContainer.scrollIntoView({\n                behavior: "smooth",\n                block: "start",\n            });\n        }\n\n        function resetSelection() {\n            checkboxes.forEach((cb) => {\n                cb.checked = false;\n                cb.disabled = false;\n            });\n            selected = [];\n            updateSelection();\n            comparisonTableContainer.style.display = "none";\n        }\n\n        checkboxes.forEach((cb) => {\n            cb.addEventListener("change", updateSelection);\n        });\n\n        compareBtn?.addEventListener("click", showComparison);\n        resetBtn?.addEventListener("click", resetSelection);\n        closeComparisonBtn?.addEventListener("click", () => {\n            comparisonTableContainer.style.display = "none";\n        });\n\n        updateSelection();\n    });\n})();<\/script>'])), maybeRenderHead(), rooms.map((room) => renderTemplate`<label class="room-checkbox" data-astro-cid-2pthjhf3> <input type="checkbox" name="room"${addAttribute(room.id, "value")}${addAttribute(room.name, "data-room-name")} data-astro-cid-2pthjhf3> <span class="checkbox-label" data-astro-cid-2pthjhf3> <img${addAttribute(room.image, "src")}${addAttribute(room.name, "alt")} loading="lazy" data-astro-cid-2pthjhf3> <span class="room-name" data-astro-cid-2pthjhf3>${room.name}</span> </span> </label>`), defineScriptVars({ rooms }));
}, "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/\u6211\u7684\u96F2\u7AEF\u786C\u789F/03_\u8CC7\u6E90\u8207\u8208\u8DA3 (Resources)/01_\u77E5\u8B58\u9AD4\u7CFB/\u7A0B\u5F0F\u8A2D\u8A08/\u590F\u6D1B\u514B\u6C11\u5BBF\u65B0\u7DB2\u7AD9/src/components/RoomComparison.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u623F\u578B\u4ECB\u7D39 - \u590F\u6D1B\u514BVilla\u6C11\u5BBF", "data-astro-cid-ajmli3vt": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="portfolio-container" data-astro-cid-ajmli3vt> <div class="content-wrapper" data-astro-cid-ajmli3vt> <div class="header-section" data-astro-cid-ajmli3vt> <h6 class="section-subtitle" data-astro-cid-ajmli3vt>OUR ROOMS</h6> <h1 data-astro-cid-ajmli3vt>房型介紹</h1> <p class="subtitle" data-astro-cid-ajmli3vt>精心設計的舒適空間，為您打造完美假期</p> </div> <div class="rooms-grid" data-astro-cid-ajmli3vt> <article class="room-card" data-astro-cid-ajmli3vt> <div class="room-image" data-astro-cid-ajmli3vt> <img src="/deluxe-room.png" alt="豪華雙人房" data-astro-cid-ajmli3vt> <div class="room-badge" data-astro-cid-ajmli3vt>熱門</div> </div> <div class="room-content" data-astro-cid-ajmli3vt> <h3 data-astro-cid-ajmli3vt>豪華雙人房</h3> <p class="room-description" data-astro-cid-ajmli3vt>
溫馨舒適的雙人空間，King
              Size大床配備高級寢具，讓您一夜好眠。落地窗引入充足自然光，房內設有獨立衛浴、冷氣、電視等完善設施。
</p> <div class="room-features" data-astro-cid-ajmli3vt> <span class="feature-tag" data-astro-cid-ajmli3vt>🛏️ King Size 床</span> <span class="feature-tag" data-astro-cid-ajmli3vt>🚿 獨立衛浴</span> <span class="feature-tag" data-astro-cid-ajmli3vt>❄️ 冷氣空調</span> <span class="feature-tag" data-astro-cid-ajmli3vt>📺 液晶電視</span> </div> <div class="room-info" data-astro-cid-ajmli3vt> <span class="room-capacity" data-astro-cid-ajmli3vt>👥 2人</span> <span class="room-size" data-astro-cid-ajmli3vt>📏 約12坪</span> </div> <div class="room-actions" data-astro-cid-ajmli3vt> <a href="/rooms/deluxe-room" class="detail-btn" data-astro-cid-ajmli3vt>查看詳情</a> <a href="https://booking.owlting.com/summerrockvilla" target="_blank" class="book-btn" data-astro-cid-ajmli3vt>
查看房價
</a> </div> </div> </article> <article class="room-card" data-astro-cid-ajmli3vt> <div class="room-image" data-astro-cid-ajmli3vt> <img src="/family-suite.png" alt="家庭套房" data-astro-cid-ajmli3vt> </div> <div class="room-content" data-astro-cid-ajmli3vt> <h3 data-astro-cid-ajmli3vt>家庭套房</h3> <p class="room-description" data-astro-cid-ajmli3vt>
寬敞舒適的家庭房型，兩張雙人床可容納4人入住。適合家庭旅遊或朋友結伴出遊，獨立的起居空間讓您有更多活動空間。
</p> <div class="room-features" data-astro-cid-ajmli3vt> <span class="feature-tag" data-astro-cid-ajmli3vt>🛏️ 雙床房</span> <span class="feature-tag" data-astro-cid-ajmli3vt>🛋️ 獨立客廳</span> <span class="feature-tag" data-astro-cid-ajmli3vt>🚿 大浴室</span> <span class="feature-tag" data-astro-cid-ajmli3vt>🌳 庭園景觀</span> </div> <div class="room-info" data-astro-cid-ajmli3vt> <span class="room-capacity" data-astro-cid-ajmli3vt>👥 4人</span> <span class="room-size" data-astro-cid-ajmli3vt>📏 約18坪</span> </div> <div class="room-actions" data-astro-cid-ajmli3vt> <a href="/rooms/family-suite" class="detail-btn" data-astro-cid-ajmli3vt>查看詳情</a> <a href="https://booking.owlting.com/summerrockvilla" target="_blank" class="book-btn" data-astro-cid-ajmli3vt>
查看房價
</a> </div> </div> </article> <article class="room-card" data-astro-cid-ajmli3vt> <div class="room-image" data-astro-cid-ajmli3vt> <img src="/lake-suite.png" alt="湖景套房" data-astro-cid-ajmli3vt> <div class="room-badge premium" data-astro-cid-ajmli3vt>精選</div> </div> <div class="room-content" data-astro-cid-ajmli3vt> <h3 data-astro-cid-ajmli3vt>湖景套房</h3> <p class="room-description" data-astro-cid-ajmli3vt>
獨享私人湖景的頂級套房，大面落地窗將湖光山色盡收眼底。陽台設有戶外座椅區，清晨可在此享用早餐，傍晚欣賞夕陽美景。
</p> <div class="room-features" data-astro-cid-ajmli3vt> <span class="feature-tag" data-astro-cid-ajmli3vt>🌊 私人湖景</span> <span class="feature-tag" data-astro-cid-ajmli3vt>🪟 觀景陽台</span> <span class="feature-tag" data-astro-cid-ajmli3vt>🛁 浴缸</span> <span class="feature-tag" data-astro-cid-ajmli3vt>☕ 咖啡機</span> </div> <div class="room-info" data-astro-cid-ajmli3vt> <span class="room-capacity" data-astro-cid-ajmli3vt>👥 2-3人</span> <span class="room-size" data-astro-cid-ajmli3vt>📏 約15坪</span> </div> <div class="room-actions" data-astro-cid-ajmli3vt> <a href="/rooms/lake-suite" class="detail-btn" data-astro-cid-ajmli3vt>查看詳情</a> <a href="https://booking.owlting.com/summerrockvilla" target="_blank" class="book-btn" data-astro-cid-ajmli3vt>
查看房價
</a> </div> </div> </article> <article class="room-card" data-astro-cid-ajmli3vt> <div class="room-image" data-astro-cid-ajmli3vt> <img src="/villa-room.png" alt="獨棟別墅" data-astro-cid-ajmli3vt> <div class="room-badge premium" data-astro-cid-ajmli3vt>VIP</div> </div> <div class="room-content" data-astro-cid-ajmli3vt> <h3 data-astro-cid-ajmli3vt>獨棟別墅</h3> <p class="room-description" data-astro-cid-ajmli3vt>
完全獨立的Villa空間，擁有專屬庭園與入口。多房型設計可容納6-8人，適合大家庭或團體包棟。享受如同私人莊園般的奢華體驗。
</p> <div class="room-features" data-astro-cid-ajmli3vt> <span class="feature-tag" data-astro-cid-ajmli3vt>🏡 獨棟建築</span> <span class="feature-tag" data-astro-cid-ajmli3vt>🌳 私人庭園</span> <span class="feature-tag" data-astro-cid-ajmli3vt>🛏️ 3臥室</span> <span class="feature-tag" data-astro-cid-ajmli3vt>🔥 壁爐</span> </div> <div class="room-info" data-astro-cid-ajmli3vt> <span class="room-capacity" data-astro-cid-ajmli3vt>👥 6-8人</span> <span class="room-size" data-astro-cid-ajmli3vt>📏 約40坪</span> </div> <div class="room-actions" data-astro-cid-ajmli3vt> <a href="/rooms/villa" class="detail-btn" data-astro-cid-ajmli3vt>查看詳情</a> <a href="https://booking.owlting.com/summerrockvilla" target="_blank" class="book-btn" data-astro-cid-ajmli3vt>
查看房價
</a> </div> </div> </article> </div> <!-- Room Comparison Tool --> <div class="comparison-section" data-astro-cid-ajmli3vt> ${renderComponent($$result2, "RoomComparison", $$RoomComparison, { "data-astro-cid-ajmli3vt": true })} </div> <div class="booking-info" data-astro-cid-ajmli3vt> <h2 data-astro-cid-ajmli3vt>訂房資訊</h2> <div class="info-grid" data-astro-cid-ajmli3vt> <div class="info-item" data-astro-cid-ajmli3vt> <h4 data-astro-cid-ajmli3vt>⏰ 入住時間</h4> <p data-astro-cid-ajmli3vt>下午 3:00 PM 之後</p> </div> <div class="info-item" data-astro-cid-ajmli3vt> <h4 data-astro-cid-ajmli3vt>⏰ 退房時間</h4> <p data-astro-cid-ajmli3vt>上午 11:00 AM 之前</p> </div> <div class="info-item" data-astro-cid-ajmli3vt> <h4 data-astro-cid-ajmli3vt>🍳 早餐服務</h4> <p data-astro-cid-ajmli3vt>可加購精緻早餐 (需提前預訂)</p> </div> <div class="info-item" data-astro-cid-ajmli3vt> <h4 data-astro-cid-ajmli3vt>📞 訂房專線</h4> <p data-astro-cid-ajmli3vt>03-8541633</p> </div> </div> <div class="booking-cta" data-astro-cid-ajmli3vt> <a href="https://booking.owlting.com/summerrockvilla" target="_blank" class="main-book-btn" data-astro-cid-ajmli3vt>
立即線上訂房
</a> </div> </div> </div> </div> ` })} `;
}, "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/\u6211\u7684\u96F2\u7AEF\u786C\u789F/03_\u8CC7\u6E90\u8207\u8208\u8DA3 (Resources)/01_\u77E5\u8B58\u9AD4\u7CFB/\u7A0B\u5F0F\u8A2D\u8A08/\u590F\u6D1B\u514B\u6C11\u5BBF\u65B0\u7DB2\u7AD9/src/pages/portfolio/index.astro", void 0);

const $$file = "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/我的雲端硬碟/03_資源與興趣 (Resources)/01_知識體系/程式設計/夏洛克民宿新網站/src/pages/portfolio/index.astro";
const $$url = "/portfolio";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

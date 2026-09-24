# 首頁視覺美學優化 — 實作清單

> 來源：視覺美學評審報告（第 24 輪）
> 目標：修復 Mobile 佈局失效、圖文比例失衡、資訊引導中斷
> 預估影響：+0.43 / 10

---

## 提案 0｜統一卡片圓角 [優先 1]

### 目標
service-card `border-radius: 24px`、smart-case-card `border-radius: 24px`、testimonial-card `border-radius: 0`。同為卡片元件圓角節奏混亂。

### 修改檔案
- `src/pages/index.astro`

### 實作步驟

1. 搜尋全站圓角設定：
   ```bash
   grep -n "border-radius" src/pages/index.astro | grep -v "9999\|50%"
   ```

2. 將 `.testimonial-card` 的 `border-radius: 0` 改為 `border-radius: 20px`

3. 將 `.service-card` 的 `border-radius: 24px` 改為 `border-radius: 20px`（全站統一）

4. 將 `.smart-case-card` 的 `border-radius: 24px` 改為 `border-radius: 20px`

5. 驗證：
   ```bash
   grep -n "border-radius" src/pages/index.astro | grep -v "9999\|50%"
   ```
   預期：所有卡片元件均為 `20px`

---

## 提案 1｜移除 service-content 固定高度 [優先 2]

### 目標
`min-height: 250px`（桌面）/ `220px`（手機）在手機 375px 寬度下比例失衡，Icon 區塊被壓縮。

### 修改檔案
- `src/pages/index.astro`

### 實作步驟

1. 找到 `.service-content` 定義

2. 將 `min-height: 250px` 改為 `min-height: 200px`

3. 找到 `@media (max-width: 768px)` 中的 `.service-content` 覆寫

4. 將 `min-height: 220px` 改為 `min-height: 160px`

5. 驗證：
   ```bash
   grep -n "service-content" src/pages/index.astro | grep "min-height"
   ```

---

## 提案 2｜修正 testimonial 偏移 [優先 3]

### 目標
Desktop 12-column：card 2 `margin-top: 3rem`、card 3 `margin-top: 1rem` 造成視覺重心歪斜。改用 CSS `align-self` 或移除偏移。

### 修改檔案
- `src/pages/index.astro`

### 實作步驟

1. 找到 Desktop 的 `.testimonial-card:nth-child(2)` 和 `.testimonial-card:nth-child(3)`

2. 將：
   ```css
   .testimonial-card:nth-child(2) {
     grid-column: 6 / span 3;
     margin-top: 3rem;
   }
   .testimonial-card:nth-child(3) {
     grid-column: 9 / -1;
     margin-top: 1rem;
   }
   ```
   改為（用 `align-self` 取代 `margin-top`）：
   ```css
   .testimonial-card:nth-child(2) {
     grid-column: 6 / span 3;
     align-self: end;
     margin-top: 0;
   }
   .testimonial-card:nth-child(3) {
     grid-column: 9 / -1;
     align-self: center;
     margin-top: 0;
   }
   ```

3. 驗證：確認 Desktop 佈局保持階梯視覺但無 `margin-top` 強制偏移

---

## 提案 3｜手機 padding clamp 化 [優先 4]

### 目標
桌面用 `clamp(5rem, 9vw, 7.5rem)`，手機固定 `3rem 1.5rem`，大→小螢幕跳躍感明顯。

### 修改檔案
- `src/pages/index.astro`

### 實作步驟

1. 找到 `@media (max-width: 768px)` 中所有固定 padding 值：
   ```bash
   grep -n "padding: 3rem\|padding: 2.6rem\|padding: 2rem 1.5rem" src/pages/index.astro
   ```

2. 將固定值改為 clamp：
   - `padding: 3rem 1.5rem` → `padding: clamp(2.5rem, 8vw, 3rem) clamp(1rem, 4vw, 1.5rem)`
   - `padding: 2.6rem 1.25rem` → `padding: clamp(2rem, 7vw, 2.6rem) clamp(0.85rem, 3.5vw, 1.25rem)`

3. 確認 `.stats-section` 等深色背景區塊的 padding 同步調整

4. 驗證：搜尋 `@media (max-width: 768px)` 區塊中不再有固定 `rem` 值

---

## 提案 4｜Consult-title 手機斷點優化 [優先 5]

### 目標
`clamp(2.8rem, 5.4vw, 4.6rem)` 在 430px 寬度下手機字級與 section-title 差距過大。

### 修改檔案
- `src/pages/index.astro`

### 實作步驟

1. 找到 `.consult-title` 的 CSS 定義

2. 將：
   ```css
   .consult-title {
     font-size: clamp(2.8rem, 5.4vw, 4.6rem);
     line-height: 1.1;
   }
   ```
   改為（加 max-width 防止爆行）：
   ```css
   .consult-title {
     font-size: clamp(2rem, 5.4vw, 3.6rem);
     line-height: 1.18;
     max-width: 22ch;
   }
   ```

3. 確認 Mobile 的 `max-width: none`（若有）已移除

4. 驗證：`grep -n "consult-title" src/pages/index.astro | grep "font-size"`

---

## 提案 5｜Gray-darkest 冷化 [優先 6]

### 目標
`--gray-darkest: #342f2b` 偏棕，室內設計網站可考慮更冷灰提升專業感。

### 修改檔案
- `src/layouts/BaseLayout.astro`

### 實作步驟

1. 找到 `--gray-darkest: #342f2b` 定義（約第 292 行）

2. 改為：`--gray-darkest: #2d2d2d;`

3. 驗證：
   ```bash
   grep -n "gray-darkest" src/layouts/BaseLayout.astro | head -5
   ```

---

## 提案 A｜Testimonial Mobile 疊排微調 [優先 2]

### 目標
Desktop 12-column 階梯佈局（5格→3格→4格 + margin-top 遞增）在 Mobile 失效 → 改為 3-column 等寬但不同 margin-top。

### 修改檔案
- `src/pages/index.astro`

### 實作步驟

1. 找到 `@media (max-width: 768px)` 區塊（約第 880 行附近）

2. 找到以下目前的 Mobile 覆寫規則並**替換**：
   ```css
   /* 原本 */
   .testimonial-card,
   .testimonial-card:nth-child(1),
   .testimonial-card:nth-child(2),
   .testimonial-card:nth-child(3) {
     grid-column: auto;
     margin-top: 0;
   }
   .testimonial-grid {
     grid-template-columns: 1fr;
   }
   ```
   替換為：
   ```css
   .testimonial-grid {
     grid-template-columns: repeat(3, 1fr);
     gap: 1.2rem;
   }
   .testimonial-card {
     grid-column: span 1;
     margin-top: 0;
   }
   .testimonial-card:nth-child(2) {
     margin-top: 2.5rem;
   }
   .testimonial-card:nth-child(3) {
     margin-top: 1.2rem;
   }
   ```

3. 驗證：搜尋 `testimonial-card` 確保 Desktop 12-column 規則未被破壞（保留 `grid-column: 1 / span 5` 等原有設定）。

---

## 提案 B｜FAQ Mobile 雙欄保留 [優先 1]

### 目標
原本「前兩題雙欄、最後一題全寬」的 2+1 節奏在 Mobile 消失 → 改為 Mobile 2-column 雙欄，最後一題佔滿。

### 修改檔案
- `src/pages/index.astro`

### 實作步驟

1. 找到 `@media (max-width: 768px)` 區塊中 `.faq-list` 的覆寫

2. 將 `.faq-list` Mobile 覆寫：
   ```css
   /* 原本 */
   .faq-list {
     grid-template-columns: 1fr;
   }
   ```
   替換為：
   ```css
   .faq-list {
     grid-template-columns: repeat(2, 1fr);
     gap: 1.2rem;
   }
   ```

3. 新增 `.faq-item` Mobile 覆寫（插入同一個 `@media (max-width: 768px)` 區塊）：
   ```css
   .faq-item:nth-child(1),
   .faq-item:nth-child(2) {
     grid-column: span 1;
     margin-top: 0;
   }
   .faq-item:nth-child(2) {
     /* 移除 Desktop 的 margin-top */
     margin-top: 0;
   }
   .faq-item:nth-child(3) {
     grid-column: 1 / -1;
     margin-top: 0;
   }
   ```

4. 調整 `.faq-question` Mobile 字級：
   - 確認 `.faq-question` 在 Mobile 的 `font-size` 為 `1rem`（確保雙欄時標題不爆版）

5. 驗證：`grep -n "faq-item:nth-child" src/pages/index.astro` 確認兩處均有定義。

---

## 提案 C｜Smart-case Mobile Grid 保留 [優先 3]

### 目標
Smart-case-grid 在 Mobile 完全消失（`display: none`），引導資訊中斷 → 改為 `overflow-x-auto` 橫向滑動。

### 修改檔案
- `src/pages/index.astro`

### 實作步驟

1. 找到 `@media (max-width: 768px)` 區塊中 `.smart-case-shell` 的覆寫

2. 將 `.smart-case-shell` Mobile 覆寫：
   ```css
   /* 原本 */
   .smart-case-shell {
     grid-template-columns: 1fr;
   }
   ```
   替換為：
   ```css
   .smart-case-shell {
     grid-template-columns: unset;
     display: flex;
     flex-direction: column;
     gap: 1.5rem;
   }
   ```

3. 找到 `.smart-case-grid` 的 Mobile 覆寫（若無則新增），插入以下規則：
   ```css
   .smart-case-grid {
     display: flex;
     overflow-x: auto;
     gap: 1rem;
     scroll-snap-type: x mandatory;
     -webkit-overflow-scrolling: touch;
     padding-bottom: 0.5rem;
     /* 隱藏 scrollbar 但保留滑動功能 */
     scrollbar-width: none; /* Firefox */
   }
   .smart-case-grid::-webkit-scrollbar {
     display: none; /* Chrome/Safari/Edge */
   }
   ```

4. 新增 `.smart-case-card` Mobile 覆寫：
   ```css
   .smart-case-card {
     flex: 0 0 280px;
     scroll-snap-align: start;
     /* 移除 Desktop 的 grid 樣式，確保 flex 生效 */
     display: block;
   }
   ```

5. 確認 `.smart-case-mobile-note`（Mobile 提示文字）仍存在，作為滑動引導。

6. 驗證：搜尋 `smart-case-grid` 確保 Desktop 仍是 `grid`（`grid-template-columns`）。

---

## 提案 D｜Workflow Mobile Timeline 連線裝飾 [優先 4]

### 目標
8 步流程 Mobile 變成 8 個獨立區塊，無視覺連貫性 → 左側加垂直時間軸連線。

### 修改檔案
- `src/pages/index.astro`

### 實作步驟

1. 找到 `@media (max-width: 768px)` 區塊

2. 新增 `.workflow-item` Mobile 覆寫：
   ```css
   .workflow-item {
     position: relative;
     padding-left: 2.5rem;
   }
   ```

3. 新增 `.workflow-item::before` 偽元素（垂直連線）：
   ```css
   .workflow-item::before {
     content: "";
     position: absolute;
     left: 0.65rem;
     top: 0;
     bottom: 0;
     width: 1px;
     background: linear-gradient(
       180deg,
       rgba(115, 103, 94, 0.5) 0%,
       rgba(115, 103, 94, 0.1) 100%
     );
   }
   ```

4. 新增最後一項隱藏連線：
   ```css
   .workflow-item:last-child::before {
     background: none;
   }
   ```

5. 調整 `.workflow-number` Mobile 覆寫：
   ```css
   .workflow-number {
     position: absolute;
     left: 0;
     top: 1.1rem;
     width: 1.5rem;
     height: 1.5rem;
     font-size: 0.72rem;
     background: var(--white);
     border: 1px solid rgba(115, 103, 94, 0.3);
     border-radius: 50%;
     display: flex;
     align-items: center;
     justify-content: center;
   }
   ```

6. 調整 `.workflow-content` Mobile 覆寫（移除 Desktop 的 `transform`）：
   ```css
   .workflow-content {
     padding: 0;
     /* 保留 Desktop 原有樣式，確保 Mobile 可讀 */
   }
   ```

7. 驗證：搜尋 `workflow-item::before` 確保 Desktop 沒有這個偽元素（避免破壞 Desktop 左右交錯佈局）。

---

## 驗證清單（全部完成後執行）

```bash
# 1. 確認無語法錯誤
npx astro check src/pages/index.astro

# 2. 確認 grep 無漏網
grep -n "testimonial-card:nth-child" src/pages/index.astro
grep -n "faq-item:nth-child" src/pages/index.astro
grep -n "smart-case-grid" src/pages/index.astro
grep -n "workflow-item::before" src/pages/index.astro

# 3. 確認 Desktop 原有樣式未被破壞
grep -n "grid-column: 1 / span 5" src/pages/index.astro  # Testimonial 保留
grep -n "grid-template-columns: repeat(2, 1fr)" src/pages/index.astro  # FAQ 保留
grep -n "grid-template-columns: minmax(280px, 360px)" src/pages/index.astro  # Smart-case 保留
```

---

## Commit 訊息建議

```
chore: 首頁 Mobile 佈局與視覺節奏優化

- 提案 A：Testimonial Mobile 保留 3-column 疊排韻律（margin-top 遞增）
- 提案 B：FAQ Mobile 保留 2-column 雙欄（最後一題佔滿）
- 提案 C：Smart-case Mobile 改為橫向滑動（scroll-snap-type: x）
- 提案 D：Workflow Mobile 加垂直時間軸連線裝飾

視覺美學評審報告：+0.43/10
```

---

## 預覽方式

```bash
npm run dev
# 開啟 http://localhost:4321/
# 依序檢查：
# 1. 首頁 Testimonial 區塊（滑到約 70% 高度）
# 2. 首頁 FAQ 區塊（滑到約 85% 高度）
# 3. 首頁 Smart-case 區塊（滑到約 50% 高度）
# 4. 首頁 Workflow 區塊（滑到約 60% 高度）
# 每次測試使用 Chrome DevTools 模擬 Mobile（375px 寬度）
```

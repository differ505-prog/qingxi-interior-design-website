# 青曦裝修 Web 視覺審查實作清單

> 依賴順序：① → ② → ③ → ④ → ⑤（不可跳步）
> 每次 commit 只做一個提案，避免一次 commit 過大難以 revert

---

## 提案① — 手機 Hero h1 修正（最高 ROI，優先執行）

### ①-1 smart-home.astro — hero h1

**檔案**：`src/pages/smart-home.astro`

**目標行**：約 357 行

**原碼**：
```css
.hero-copy h1 {
  font-size: clamp(4.2rem, 8vw, 7rem);
  font-weight: 780;
  line-height: 0.92;
  letter-spacing: -0.065em;
}
```

**新碼**：
```css
.hero-copy h1 {
  font-size: clamp(2.4rem, 7.5vw, 4.2rem);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.02em;
}
```

**變更摘要**：
- 上限 7rem → 4.2rem（合 ≤6rem 上限 SOP）
- 下限 4.2rem → 2.4rem（375px 不再爆行）
- font-weight 780 → 700（Noto Serif TC 合法最大值）
- line-height 0.92 → 1.18（舒適行高）
- letter-spacing -0.065em → -0.02em（合乎字距反向律）

---

### ①-2 contact.astro — contact-copy h1

**檔案**：`src/pages/contact.astro`

**目標行**：約 318 行

**原碼**：
```css
.contact-copy h1 {
  font-size: clamp(4rem, 8vw, 6.8rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.03em;
}
```

**新碼**：
```css
.contact-copy h1 {
  font-size: clamp(2rem, 6.5vw, 4.6rem);
  font-weight: 600;
  line-height: 1.22;
  letter-spacing: -0.025em;
}
```

**變更摘要**：
- 上限 6.8rem → 4.6rem（合 ≤6rem 上限）
- 下限 4rem → 2rem（375px「把想住進去的畫面，先告訴我們」14 字不再爆成 3-4 行）
- line-height 1.15 → 1.22（舒適行高）
- letter-spacing -0.03em → -0.025em（字距反向律合規）

---

## 提案② — 色彩 SOP 補丁：新增語意狀態色 token

### ②-1 BaseLayout.astro — :root 新增狀態色與 LINE token

**檔案**：`src/layouts/BaseLayout.astro`

**目標位置**：在 `--tiffany-pale` 定義區塊（約 375 行 `:root` 內）**之前**，新增以下 6 行

**新增位置**（在 `/* 暖色系... */` 註解區塊之前）：

```css
        /* 語意狀態色（提案②，SOP 補丁） */
        --state-success: #4f7355;
        --state-warning: #a87b48;
        --state-danger:  #b85c52;
        --state-info:    #5d7e92;

        /* LINE 品牌色（提案②，SOP 補丁） */
        --line-brand:      #06c755;
        --line-brand-hover: #05b048;
```

---

### ②-2 requirement-form.astro — .required 改用 --state-danger

**檔案**：`src/pages/requirement-form.astro`

**目標行**：約 1350 行

**原碼**：
```css
.required {
  color: #dd4d4d;
}
```

**新碼**：
```css
.required {
  color: var(--state-danger);
}
```

---

### ②-3 requirement-form.astro — .line-button 改用 --line-brand

**檔案**：`src/pages/requirement-form.astro`

**目標行**：約 1533 行（`.line-button`）與 1544 行（`.line-button:hover`）

**原碼**：
```css
.line-button {
  background: #06c755;
  ...
}
.line-button:hover {
  background: #05b048;
  box-shadow: 0 14px 24px rgba(6, 199, 85, 0.24);
}
```

**新碼**：
```css
.line-button {
  background: var(--line-brand);
  ...
}
.line-button:hover {
  background: var(--line-brand-hover);
  box-shadow: 0 14px 24px rgba(6, 199, 85, 0.24);
}
```

---

### ②-4 contact.astro — LINE 文字色改用 --line-brand

**檔案**：`src/pages/contact.astro`

**目標行**：約 580 行

**原碼**：
```css
color: #06c755;
```

**新碼**：
```css
color: var(--line-brand);
```

---

### ②-5 renovation-process.astro — 12 處狀態色收斂

**檔案**：`src/pages/renovation-process.astro`

> 逐一搜尋以下 hex 值，替換為對應 token。若替換後視覺效果有疑慮，停在該行並回報。

| 行範圍（參考） | 原 hex | 替換為 |
|----------------|--------|--------|
| ~1873 | `#406443` | `var(--state-success)` |
| ~1878 | `#9b6f3d` | `var(--state-warning)` |
| ~1883 | `#8d4b42` | `var(--state-danger)` |
| ~1894 | `#8b6338` | `var(--state-warning)` |
| ~1900 | `#446075` | `var(--state-info)` |
| ~1905 | `#5b5048` | `var(--gray-dark)` |
| ~1910 | `#3c5f63` | `var(--state-info)` |
| ~1915 | `#9b6f3d` | `var(--state-warning)` |
| ~1920 | `#645378` | `var(--art-accent-solid)` |
| ~1925 | `#2f5342` | `var(--state-success)` |

**執行方式**：
```bash
# 先grep確認精確行號
grep -n "#406443\|#9b6f3d\|#8d4b42\|#8b6338\|#446075\|#5b5048\|#3c5f63\|#645378\|#2f5342" src/pages/renovation-process.astro
```

---

### ②-6 faq.astro — #8a837b 收斂至 --gray-medium

**檔案**：`src/pages/faq.astro`

**目標行**：約 284 行與 380 行

**搜尋**：`#8a837b`

**替換為**：`var(--gray-medium)`

---

### ②-7 crew-contract-studio/* — 後台子系統 token 化（可選，若時間允許）

**範圍**：`src/pages/crew-contract-studio/` 下所有 `.astro` 檔案

**搜尋命令**：
```bash
grep -rEn "background: #fff;color: #[0-9a-fA-F]{3,6}" src/pages/crew-contract-studio/
```

**原則**：
- `#fff` → `var(--white)`
- `#6b4d36` 暖棕系 → `var(--crew-warm-deep)`
- `#8b6a4d` → `var(--crew-warm)`
- `#2f241d` → `var(--gray-darkest)`

---

## 提案③ — 設計系統 token 化：圓角 + 動效

### ③-1 BaseLayout.astro — 新增 radius 與 motion token

**檔案**：`src/layouts/BaseLayout.astro`

**新增位置**：在 `--motion-duration-fast` 之後（約 362 行）

```css
        /* 圓角 token（提案③） */
        --radius-sm:   8px;
        --radius-md:   16px;
        --radius-lg:   24px;
        --radius-pill: 999px;

        /* 動效時長 token（提案③） */
        --motion-instant:   0.18s;
        --motion-fast:      0.32s;
        --motion-narrative: 0.6s;
```

**新增說明**：取代目前散落的 0.25/0.3/0.35/0.45/0.55/0.6s 與 14/16/18/20/22/24/26/28/30/32/34/36px

---

### ③-2 全站 transition: all 替換（最重要的一步）

**範圍**：所有含 `transition: all` 的檔案

**搜尋命令**：
```bash
grep -rn "transition: all" src/pages/ src/components/ src/layouts/
```

**替換原則**：
- `transition: all 0.3s ease;` → `transition: transform var(--motion-fast) var(--motion-standard), opacity var(--motion-fast) var(--motion-standard), background-color var(--motion-fast) var(--motion-standard);`
- `transition: all 0.6s ease;` → `transition: transform var(--motion-narrative) var(--motion-standard), opacity var(--motion-narrative) var(--motion-standard);`
- `transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);` → 同上，但 easing 改為 `var(--motion-standard)` 或 `cubic-bezier(0.25, 0.1, 0.25, 1)`

**謹慎處理**：`transition: all` 會影響任何屬性，必須確認每個 context 確實只需要 transform/opacity/bg 這三者。若遇到 input focus / outline / box-shadow 等需要一併動的，補入完整屬性列表。

---

### ③-3 全站 transition 時長收斂

**搜尋命令**：
```bash
grep -rn "transition.*[0-9]\.[0-9]*s" src/pages/ src/components/ src/layouts/ | grep -v "var(--motion"
```

**替換對照**：
| 原值 | 替換為 |
|------|--------|
| `0.25s` | `var(--motion-instant)` 或 `var(--motion-fast)` |
| `0.3s` / `0.35s` | `var(--motion-fast)` |
| `0.45s` | `var(--motion-fast)` |
| `0.55s` / `0.6s` | `var(--motion-narrative)` |
| `0.9s` | 保留（在 BaseLayout 已定義） |

**例外**：若原值配合的 easing 不是 `ease`，而是 `cubic-bezier` 或 `ease-in-out`，可保留原值但補上對應 `--motion-*` 變數名。

---

### ③-4 全站 border-radius 收斂（目視評估再動）

**搜尋命令**：
```bash
grep -rEn "border-radius: [0-9]+px" src/pages/ src/components/ src/layouts/ | sort -t: -k3 -n | uniq
```

**替換對照**：
| 原值 | 替換為 |
|------|--------|
| `2px` / `4px` / `6px` / `8px` / `12px` | `var(--radius-sm)` |
| `14px` / `16px` / `18px` / `20px` / `22px` | `var(--radius-md)` |
| `24px` / `26px` / `28px` / `30px` / `32px` / `34px` / `36px` | `var(--radius-lg)` |
| `999px` / `50px` | `var(--radius-pill)` |

**注意**：`border-radius: 12px 12px 0 0` 等不對稱圓角保持原值。

---

## 提案④ — 斷點收斂至 4 標準值

### ④-1 斷點現況掃描

```bash
grep -rEho "@media \(max-width: [0-9]+px\)" src/pages/ src/components/ src/layouts/ | sort | uniq -c | sort -rn
```

### ④-2 遷移對照

| 原斷點 | 遷移至 | 影響檔案（grep 確認） |
|--------|--------|----------------------|
| `900px` | `1024px` | 搜尋 `900px` 確認精確行 |
| `720px` | `768px` | 搜尋 `720px` 確認精確行 |
| `960px` | `1024px` | 搜尋 `960px` 確認精確行 |
| `1180px` | `1024px` | 搜尋 `1180px` 確認精確行 |
| `1120px` | `1024px` | 搜尋 `1120px` 確認精確行 |
| `640px` | `768px` | 搜尋 `640px` 確認精確行 |

**執行方式**：
```bash
# 逐一確認
grep -rn "900px" src/pages/ src/components/
grep -rn "720px" src/pages/ src/components/
# ...以此類推
```

**原則**：
- 合併時若邏輯衝突（例如 900px 有特殊 padding、768px 有不同 grid），保留更嚴格的（數值小的）。
- 900px → 1024px 時，若原為「小於 900px」變成「小於 1024px」，覆蓋範圍變大，**先確認視覺效果不受影響**。

### ④-3 保留的 4 標準值（不動）

- `480px` — 小型手機（iPhone SE 等）
- `768px` — 手機 → 平板
- `1024px` — 平板 → 桌面
- `1200px` — 桌面 → 大桌面

---

## 提案⑤ — transition: all 掃除（已含於③-2）

> 提案⑤ 與提案③-2 為同一工作，已納入③-2。

---

## 實作順序總覽

```
① 手機 Hero h1 修正          → 2 個檔案，2 處改動（高優先）
② 色彩 token 新增            → BaseLayout :root 新增 6 行
   ↓
②.2 ~ ②.7 色彩應用          → 逐一 grep 替換，約 20 處
   ↓
③-1 圓角 + 動效 token       → BaseLayout :root 新增 7 行
   ↓
③-2 ~ ③-4 系統性收斂        → 全域替換，最大範圍
   ↓
④ 斷點收斂                  → 最後執行（因為涉及 media query 重寫）
```

---

## 執行前必讀

1. **每次提案單獨 commit**：提案① 一個 commit，提案② 一個 commit，提案③ 一個 commit，提案④ 一個 commit
2. **每個提案執行前先 grep 確認行號**：避免 hardcoded 行號偏移
3. **替換前先備份**：`git add . && git commit -m "wip: before design system token"`（提案執行前必做）
4. **build 驗證**：每個提案執行完跑 `npm run build` 確認零 error
5. **提案③ 破壞面最大**：建議拆成 ③-A（motion token）/ ③-B（radius token）兩個 commit

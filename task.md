# 文案精煉落地清單（第 21 輪）

> 來源：第 20 輪文案體檢報告 → 所有提案 A-1~A-3 / B-1~B-5 / C-1~C-3 全部落地
> 執行範圍：`src/pages/index.astro`（主要）、`src/layouts/BaseLayout.astro`（1 處）
> 執行原則：每個 commit 只做 1 個提案；逐案 grep 驗證；commit message 前綴 `copy-prune:`

---

## Commit 總覽

| # | 提案 | 類型 | 檔案 | 主要變更 |
|---|------|------|------|----------|
| 1 | A-1 | 整段刪除 | `index.astro` | 移除 `.workflow-editor-note` aside（完整 HTML 塊） |
| 2 | A-2 | 整段刪除 | `index.astro` | 移除 `.faq-home-note` aside（完整 HTML 塊） |
| 3 | A-3 | 整段刪除 | `index.astro` | 移除 `.faq-curation` 整塊（eyebrow + p） |
| 4 | B-1 | 精簡 | `BaseLayout.astro` | footer `.footer-brand p` 從 71 字砍至 25 字 |
| 5 | B-2 | 精簡 | `index.astro` | `.workflow-summary-note` 從 43 字當量砍至 24 字 |
| 6 | B-3 | 精簡 | `index.astro` | `.consult-note-text` 從 38 字砍至 11 字 |
| 7 | B-4 | 精簡 | `index.astro` | smart-case card h3：拿掉「讓」字 + 順手修鄰近「協助」段落 |
| 8 | B-5 | 精簡 | `index.astro` | `.quote-detail` 拿掉「的」字 |
| 9 | C-1 | 移除 eyebrow | `index.astro` | 移除 `.consult-kicker`（Closing Edit）|
| 10 | C-2 | 移除 eyebrow | `index.astro` | 移除 `.workflow-summary-label`（Flow Snapshot）|
| 11 | C-3 | 移除 eyebrow | `faq.astro` | 移除 `.faq-curation-note` eyebrow（Consultation Edit）|
| 12 | — | 全域驗證 | 全域 | grep 無殘留驗證 |

---

## Commit 1 — A-1：移除 `.workflow-editor-note` aside

**檔案**：`src/pages/index.astro`
**行號**：第 410–413 行

### 變更對照

| 項目 | Before | After |
|------|--------|-------|
| HTML 結構 | 完整 `<aside class="workflow-editor-note">...</aside>` | **整段移除** |
| CSS | `.workflow-editor-note` 樣式規則（3 處參照） | **保留 CSS，孤兒規則無害** |

### 實作步驟

**步驟 1**：確認目標範圍（行 410–413）
```bash
sed -n '408,416p' src/pages/index.astro
```
預期輸出：
```astro
        </div>
        <aside class="workflow-editor-note">
          <p class="workflow-editor-label">Project Rhythm</p>
          <p>青曦不把流程寫成制式 SOP，而是讓每一步都回到現場條件、生活方式與後續施工判斷。</p>
        </aside>
      </div>
```

**步驟 2**：執行刪除

**old_string**（精確全文）：
```astro
        <aside class="workflow-editor-note">
          <p class="workflow-editor-label">Project Rhythm</p>
          <p>青曦不把流程寫成制式 SOP，而是讓每一步都回到現場條件、生活方式與後續施工判斷。</p>
        </aside>
```

**new_string**：
（空白）

**步驟 3**：驗證已移除
```bash
grep -n "workflow-editor-note\|Project Rhythm" src/pages/index.astro
```
預期：0 行（HTML 已移除；CSS 樣式規則仍在但無引用，屬於無害孤兒）

**Commit message**：`copy-prune: index 移除 workflow-editor-note aside（整段刪除，留白優於自嗨後記）`

---

## Commit 2 — A-2：移除 `.faq-home-note` aside

**檔案**：`src/pages/index.astro`
**行號**：第 616–619 行

### 變更對照

| 項目 | Before | After |
|------|--------|-------|
| HTML 結構 | 完整 `<aside class="faq-home-note">...</aside>` | **整段移除** |
| CSS | `.faq-home-note` 等 3 個樣式規則 | **保留 CSS，孤兒無害** |

### 實作步驟

**步驟 1**：確認目標範圍
```bash
sed -n '614,622p' src/pages/index.astro
```
預期輸出：
```astro
        <aside class="faq-home-note">
          <p class="faq-home-note-label">Consult Notes</p>
          <p>這裡不是完整說明書，而是正式諮詢前最常需要先對齊的三個起點。</p>
        </aside>
```

**步驟 2**：執行刪除

**old_string**：
```astro
        <aside class="faq-home-note">
          <p class="faq-home-note-label">Consult Notes</p>
          <p>這裡不是完整說明書，而是正式諮詢前最常需要先對齊的三個起點。</p>
        </aside>
```

**new_string**：（空白）

**步驟 3**：驗證
```bash
grep -n "faq-home-note\|Consult Notes" src/pages/index.astro
```
預期：0 行

**Commit message**：`copy-prune: index 移除 faq-home-note aside（整段刪除，FAQ 標題已自明）`

---

## Commit 3 — A-3：移除 `.faq-curation` 整塊

**檔案**：`src/pages/index.astro`
**行號**：第 622–625 行

### 變更對照

| 項目 | Before | After |
|------|--------|-------|
| HTML 結構 | 完整 `<div class="faq-curation">` + eyebrow + p | **整段移除** |
| CSS | `.faq-curation` + `.faq-curation-label` 樣式 | **保留 CSS，孤兒無害** |

### 實作步驟

**步驟 1**：確認目標範圍
```bash
sed -n '620,628p' src/pages/index.astro
```
預期輸出：
```astro
      <div class="faq-curation">
        <p class="faq-curation-label">Quick Read</p>
        <p>如果三題看完，大方向已經對得上，再進完整 FAQ 或直接聯絡就好。</p>
      </div>
```

**步驟 2**：執行刪除

**old_string**：
```astro
      <div class="faq-curation">
        <p class="faq-curation-label">Quick Read</p>
        <p>如果三題看完，大方向已經對得上，再進完整 FAQ 或直接聯絡就好。</p>
      </div>
```

**new_string**：（空白）

**步驟 3**：驗證
```bash
grep -n "faq-curation\|Quick Read" src/pages/index.astro
```
預期：0 行

**Commit message**：`copy-prune: index 移除 faq-curation 區塊（整段刪除，CTA 雙入口已足）`

---

## Commit 4 — B-1：精簡 footer brand 段落

**檔案**：`src/layouts/BaseLayout.astro`
**行號**：第 1031 行

### 變更對照

| 項目 | Before（71 字） | After（25 字） |
|------|-----------------|----------------|
| 內容 | 「專注於大台北住宅與商業空間規劃。從設計提案、系統櫃收納配置到工程落地整合，以安定、耐看的空間語言，精準回應每位屋主的生活方式。」 | **「大台北住宅與商空，從設計到工程一起整合。」** |

### 實作步驟

**步驟 1**：確認目標
```bash
grep -n "專注於大台北住宅與商業空間" src/layouts/BaseLayout.astro
```

**步驟 2**：替換

**old_string**：
```astro
              <p>
                專注於大台北住宅與商業空間規劃。從設計提案、系統櫃收納配置到工程落地整合，以安定、耐看的空間語言，精準回應每位屋主的生活方式。
              </p>
```

**new_string**：
```astro
              <p>
                大台北住宅與商空，從設計到工程一起整合。
              </p>
```

**步驟 3**：驗證
```bash
grep -n "專注於大台北住宅\|精準回應每位屋主" src/layouts/BaseLayout.astro
```
預期：0 行

**Commit message**：`copy-prune: BaseLayout footer brand p 從 71 字砍至 25 字，移除 AI 招牌尾句`

---

## Commit 5 — B-2：精簡 `.workflow-summary-note`

**檔案**：`src/pages/index.astro`
**行號**：第 424–426 行

### 變更對照

| 項目 | Before（43 字當量） | After（24 字） |
|------|---------------------|-----------------|
| 內容 | 「從第一次接洽開始，流程會沿著需求收斂、方案確認、報價簽約到施工驗收推進，不讓每一步只剩片段資訊。」 | **「需求收斂、方案確認、報價簽約到施工驗收，依序推進。」** |

### 實作步驟

**步驟 1**：確認目標
```bash
sed -n '423,428p' src/pages/index.astro
```

**步驟 2**：替換

**old_string**：
```astro
        <p class="workflow-summary-note">
          從第一次接洽開始，流程會沿著需求收斂、方案確認、報價簽約到施工驗收推進，不讓每一步只剩片段資訊。
        </p>
```

**new_string**：
```astro
        <p class="workflow-summary-note">
          需求收斂、方案確認、報價簽約到施工驗收，依序推進。
        </p>
```

**步驟 3**：驗證
```bash
grep -n "從第一次接洽開始\|不讓每一步只剩片段" src/pages/index.astro
```
預期：0 行

**Commit message**：`copy-prune: index workflow-summary-note 從 43 字砍至 24 字`

---

## Commit 6 — B-3：精簡 `.consult-note-text`

**檔案**：`src/pages/index.astro`
**行號**：第 580 行

### 變更對照

| 項目 | Before（38 字） | After（11 字） |
|------|-----------------|----------------|
| 內容 | 「青曦把開始分成三種節奏。想先聊方向、先估一輪，或先判斷智能整合是否需要，都可以各自開始。」 | **「三種節奏，先選一個開始。」** |

### 實作步驟

**步驟 1**：確認目標
```bash
sed -n '578,582p' src/pages/index.astro
```

**步驟 2**：替換

**old_string**：
```astro
        <p class="consult-note-text">青曦把開始分成三種節奏。想先聊方向、先估一輪，或先判斷智能整合是否需要，都可以各自開始。</p>
```

**new_string**：
```astro
        <p class="consult-note-text">三種節奏，先選一個開始。</p>
```

**步驟 3**：驗證
```bash
grep -n "青曦把開始分成三種節奏" src/pages/index.astro
```
預期：0 行

**Commit message**：`copy-prune: index consult-note-text 從 38 字砍至 11 字`

---

## Commit 7 — B-4：smart-case card 精簡 + 順手修鄰近「協助」

**檔案**：`src/pages/index.astro`
**行號**：第 358–362 行（第一張 smart-case-card）

### 變更對照

| # | 位置 | Before | After |
|---|------|--------|-------|
| 7a | h3（行 358） | 「整理 Home Assistant 規則，**讓**回家模式更快上線」 | **「整理 Home Assistant 規則，回家模式更快上線」** |
| 7b | p（行 360–361） | 「**協助**整理需求、撰寫規則與排查整合問題，**讓**回家、離家、睡眠與節能模式更快落地。」 | **「整理需求、撰寫規則與排查整合問題，讓回家、離家、睡眠與節能模式更快落地。」** |

### 實作步驟

**步驟 1**：確認目標
```bash
sed -n '356,364p' src/pages/index.astro
```

**步驟 2**：替換（一次性替換整個 article 區塊）

**old_string**：
```astro
            <h3>整理 Home Assistant 規則，讓回家模式更快上線</h3>
            <p>
              協助整理需求、撰寫規則與排查整合問題，
              讓回家、離家、睡眠與節能模式更快落地。
            </p>
```

**new_string**：
```astro
            <h3>整理 Home Assistant 規則，回家模式更快上線</h3>
            <p>
              整理需求、撰寫規則與排查整合問題，
              讓回家、離家、睡眠與節能模式更快落地。
            </p>
```

**步驟 3**：驗證「協助」是否已清除
```bash
grep -n "協助" src/pages/index.astro
```
預期：0 行

**Commit message**：`copy-prune: index smart-case card h3 拿掉「讓」+ 移除「協助」主動句海`

---

## Commit 8 — B-5：精簡 `.quote-detail`

**檔案**：`src/pages/index.astro`
**行號**：第 157 行

### 變更對照

| 項目 | Before | After |
|------|--------|-------|
| 內容 | 「設計不是堆漂亮詞，而是把生活整理得**更好住**。」 | **「設計不是堆漂亮詞，是把生活整理得更好住。」** |

### 實作步驟

**步驟 1**：確認目標
```bash
grep -n "設計不是堆漂亮詞" src/pages/index.astro
```

**步驟 2**：替換

**old_string**：
```astro
          <p class="quote-detail">設計不是堆漂亮詞，而是把生活整理得更好住。</p>
```

**new_string**：
```astro
          <p class="quote-detail">設計不是堆漂亮詞，是把生活整理得更好住。</p>
```

**步驟 3**：驗證
```bash
grep -n "設計不是堆漂亮詞，而是" src/pages/index.astro
```
預期：0 行

**Commit message**：`copy-prune: index quote-detail 拿掉「的」字，語感更俐落`

---

## Commit 9 — C-1：移除 `.consult-kicker`（Closing Edit）

**檔案**：`src/pages/index.astro`
**行號**：第 572 行

### 實作步驟

**步驟 1**：確認目標
```bash
sed -n '570,575p' src/pages/index.astro
```

**步驟 2**：刪除該行

**old_string**：
```astro
        <p class="consult-kicker">Closing Edit</p>
```

**new_string**：（空白，該行刪除）

**步驟 3**：驗證
```bash
grep -n "Closing Edit" src/pages/index.astro
```
預期：0 行

**Commit message**：`copy-prune: index 移除 consult-kicker eyebrow（Closing Edit，讀者無感知）`

---

## Commit 10 — C-2：移除 `.workflow-summary-label`（Flow Snapshot）

**檔案**：`src/pages/index.astro`
**行號**：第 417 行

### 實作步驟

**步驟 1**：確認目標
```bash
sed -n '415,420p' src/pages/index.astro
```

**步驟 2**：刪除該行

**old_string**：
```astro
        <p class="workflow-summary-label">Flow Snapshot</p>
```

**new_string**：（空白，該行刪除）

**步驟 3**：驗證
```bash
grep -n "Flow Snapshot" src/pages/index.astro
```
預期：0 行

**Commit message**：`copy-prune: index 移除 workflow-summary-label eyebrow（Flow Snapshot，讀者無感知）`

---

## Commit 11 — C-3：移除 faq.astro `.faq-curation-note` eyebrow

**檔案**：`src/pages/faq.astro`
**行號**：需先確認行號

### 實作步驟

**步驟 1**：確認行號
```bash
grep -n "Consultation Edit\|faq-curation-note" src/pages/faq.astro
```

**步驟 2**：確認目標文字（預期格式）
```astro
        <p class="faq-curation-label">Consultation Edit</p>
```
或
```astro
        <p class="faq-curation-note">Consultation Edit</p>
```

**步驟 3**：替換（eyebrow 改為「閱讀提醒」或直接移除）

**選項 A — 改為功能性標籤（推薦）**：
**old_string**：
```astro
        <p class="faq-curation-label">Consultation Edit</p>
```
**new_string**：
```astro
        <p class="faq-curation-label">閱讀提醒</p>
```

**選項 B — 整段移除**（若該 aside 為純 eyebow 無內文）：
直接刪除整個 aside 區塊（請先 grep 確認範圍）

**步驟 4**：驗證
```bash
grep -n "Consultation Edit" src/pages/faq.astro
```
預期：0 行

**Commit message**：`copy-prune: faq 移除 Consultation Edit eyebrow，改為「閱讀提醒」`

---

## Commit 12 — 全域驗證

**執行時間**：所有 commit 完成後，最後一次跑完整 grep 驗證

### 驗證指令（按優先序）

```bash
# 1. 確認無「為您」AI 味
grep -rn "為您" src/pages/ src/layouts/ | grep -v "social-ops/"
# 預期：0 行

# 2. 確認無情緒動詞黑名單
grep -rEn "負責到底|用心|完美融合|絕對|最優|全方位|量身打造" src/pages/ src/layouts/ | grep -v "/blog/"
# 預期：0 行

# 3. 確認無「協助」殘留
grep -rn "協助" src/pages/index.astro src/pages/smart-home.astro
# 預期：0 行

# 4. 確認無 em-dash / en-dash（social-ops 內部例外）
grep -rEn "—|–" src/pages/ src/layouts/ | grep -v "social-ops/"
# 預期：0 行

# 5. 確認無「Project Rhythm / Flow Snapshot / Closing Edit / Consultation Edit」編輯家具
grep -rEn "Project Rhythm|Flow Snapshot|Closing Edit|Consultation Edit" src/pages/ src/layouts/
# 預期：0 行

# 6. 確認無 h1/h2/h3 句尾句號（本輪只修 UI 頁面，不含 blog 內文）
grep -rEn "<h[1-3][^>]*>[^<]+[。！]</h[1-3]>" src/pages/index.astro src/pages/contact.astro src/layouts/BaseLayout.astro
# 預期：0 行

# 7. 確認無「workflow-editor-note / faq-home-note / faq-curation」殘留
grep -rn "workflow-editor-note\|faq-home-note\|faq-curation" src/pages/index.astro
# 預期：0 行
```

---

## 執行摘要（落地後預期）

| 指標 | 執行前 | 執行後 |
|------|--------|--------|
| UI 頁面（index + contact + BaseLayout）大標句尾句號 | 0 | 0（已堅守） |
| 情緒動詞黑名單命中 | 0 | 0 |
| 「為您」AI 味 | 2 處 | 0 |
| 「協助」被動句 | 1 處（+ smart-home 5 處） | 0 |
| 編輯家具（Project Rhythm 等） | 5 處 | 0 |
| `workflow-editor-note` aside | 1 塊 | 0 |
| `faq-home-note` aside | 1 塊 | 0 |
| `faq-curation` 區塊 | 1 塊 | 0 |
| footer brand p 字數 | 71 字 | 25 字 |
| 總削減字數 | — | 約 250+ 字（11 個提案合計） |

---

## 確認清單（等我勾選）

- [ ] Commit 1：A-1 移除 workflow-editor-note aside
- [ ] Commit 2：A-2 移除 faq-home-note aside
- [ ] Commit 3：A-3 移除 faq-curation 區塊
- [ ] Commit 4：B-1 footer brand p 精簡（71→25 字）
- [ ] Commit 5：B-2 workflow-summary-note 精簡
- [ ] Commit 6：B-3 consult-note-text 精簡（38→11 字）
- [ ] Commit 7：B-4 smart-case card h3 + 移除「協助」
- [ ] Commit 8：B-5 quote-detail 拿掉「的」
- [ ] Commit 9：C-1 移除 Closing Edit eyebrow
- [ ] Commit 10：C-2 移除 Flow Snapshot eyebrow
- [ ] Commit 11：C-3 faq Consultation Edit（選 A 或 B）
- [ ] Commit 12：全域 grep 驗證

> **注意**：本清單一經確認，我會嚴格依序執行 12 個 commit，每個 commit 前綴 `copy-prune:`，請在 commit 完成後自行用 `git log --oneline` 確認。

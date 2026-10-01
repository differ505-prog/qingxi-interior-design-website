# 文案精煉實作清單（第 20 輪）

> 覆蓋範圍：① 消除「為您」AI八股 ② 消除「深耕」AI八股 ③ 消除 blog h1/h2 句尾句號 ④ 消除「協助」被動句海 ⑤ consult-title 孤字防護
> 執行順序：④ → ③ → ① → ② → ⑤ → 全域 grep 驗證
> 每個 commit 只做 1 個提案，不可跳步或混合

---

## 執行順序總覽

| Commit | 提案 | 檔案 | 主要變更 |
|--------|------|------|----------|
| 1 | ④ | `src/pages/smart-home.astro` | 「協助」×6 → 主動句式 |
| 2 | ③ | `src/pages/blog/index.astro` | blog h1/h2 句尾句號移除 |
| 3 | ① | `src/pages/index.astro` + `src/pages/contact.astro` | 「為您」AI八股 → 直說人話 |
| 4 | ② | `src/pages/index.astro` | 「深耕」AI套話 → 「服務」中性詞 |
| 5 | ⑤ | `src/pages/index.astro` | consult-title 語意斷行防孤字 |
| 6 | — | 全域 | grep 驗證 |

---

## Commit 1 — smart-home.astro：「協助」被動句 → 主動句式

**檔案**：`src/pages/smart-home.astro`
**範圍**：所有「協助」句式，共 6 處

### 變更對照表

| # | 位置 | Before（被動） | After（主動） |
|---|------|----------------|---------------|
| 1a | `capabilities[0].title`（第7行） | 協助設定與整理 Home Assistant | 設定與整理 Home Assistant |
| 1b | `capabilities[0].description`（第9行） | 協助整理需求、建立自動化邏輯與排查整合問題，讓 HA 更快進入可用狀態。 | 整理需求、建立自動化邏輯與排查整合問題，讓 HA 更快進入可用狀態。 |
| 1c | `workflow[2].description`（第104行） | 協助整理 HA 規則、場景設定與除錯流程，讓系統更快進入穩定可用狀態。 | 整理 HA 規則、場景設定與除錯流程，讓系統更快進入穩定可用狀態。 |
| 1d | hero-panel `<li>` 第1項（第140行） | 可協助 Home Assistant、NAS 與跨品牌串聯 | Home Assistant、NAS 與跨品牌串聯都做 |
| 1e | hero-panel `<li>` 第2項（第141行） | 協助需求整理、設定與除錯 | 需求整理、設定與除錯都包 |
| 1f | hero-panel `<li>` 第3項（第142行） | 從一開始就把布線、機櫃與操作流程想進去 | 從一開始就把布線、機櫃與操作流程想進去（不變，無協助） |

### 詳細實作步驟

**步驟 1**：確認行號
```bash
grep -n "協助" src/pages/smart-home.astro
```
預期輸出 5 行（6 處含重複字串）

**步驟 2**：逐一替換（使用 StrReplace，old_string → new_string）

#### 替換① — capabilities[0].title
**old_string**：
```astro
    title: "協助設定與整理 Home Assistant",
```
**new_string**：
```astro
    title: "設定與整理 Home Assistant",
```

#### 替換② — capabilities[0].description
**old_string**：
```astro
    description:
      "協助整理需求、建立自動化邏輯與排查整合問題，讓 HA 更快進入可用狀態。",
```
**new_string**：
```astro
    description:
      "整理需求、建立自動化邏輯與排查整合問題，讓 HA 更快進入可用狀態。",
```

#### 替換③ — hero-panel 第1項
**old_string**：
```html
<li>可協助 Home Assistant、NAS 與跨品牌串聯</li>
```
**new_string**：
```html
<li>Home Assistant、NAS 與跨品牌串聯都做</li>
```

#### 替換④ — hero-panel 第2項
**old_string**：
```html
<li>協助需求整理、設定與除錯</li>
```
**new_string**：
```html
<li>需求整理、設定與除錯都包</li>
```

#### 替換⑤ — workflow[2].description
**old_string**：
```astro
    description: "協助整理 HA 規則、場景設定與除錯流程，讓系統更快進入穩定可用狀態。",
```
**new_string**：
```astro
    description: "整理 HA 規則、場景設定與除錯流程，讓系統更快進入穩定可用狀態。",
```

**步驟 3**：驗證無殘留
```bash
grep -n "協助" src/pages/smart-home.astro
```
預期：0 行

**Commit message**：`fix: smart-home 消除「協助」被動句，改為主動句式`

---

## Commit 2 — blog/index.astro：h1/h2 句尾句號移除

**檔案**：`src/pages/blog/index.astro`
**範圍**：2 處大標句尾句號

### 變更對照表

| # | 位置 | Before | After |
|---|------|--------|-------|
| 2a | h1（第564行） | 把裝修知識整理得更清楚、更好懂**。** | 把裝修知識整理得更清楚、更好懂 |
| 2b | h2（第596行） | 以設計判斷為核心，整理可慢慢閱讀的裝修知識**。** | 以設計判斷為核心，整理可慢慢閱讀的裝修知識 |

### 詳細實作步驟

**步驟 1**：確認行號
```bash
grep -n "好懂。" src/pages/blog/index.astro
grep -n "知識。" src/pages/blog/index.astro
```

**步驟 2**：逐一替換

#### 替換① — h1
**old_string**：
```astro
        <h1>把裝修知識整理得更清楚、更好懂。</h1>
```
**new_string**：
```astro
        <h1>把裝修知識整理得更清楚、更好懂</h1>
```

#### 替換② — h2
**old_string**：
```astro
          <h2 class="library-title">以設計判斷為核心，整理可慢慢閱讀的裝修知識。</h2>
```
**new_string**：
```astro
          <h2 class="library-title">以設計判斷為核心，整理可慢慢閱讀的裝修知識</h2>
```

**步驟 3**：驗證無句尾句號
```bash
grep -n "好懂。</h1>\|知識。</h[12]>" src/pages/blog/index.astro
```
預期：0 行

**Commit message**：`fix: blog/index h1/h2 句尾句號移除，遵守 SOP 標點規範`

---

## Commit 3 — index.astro + contact.astro：「為您」AI八股 → 直說人話

**檔案**：`src/pages/index.astro`（1處）+ `src/pages/contact.astro`（1處）

### 變更對照表

| # | 檔案 | 位置 | Before | After |
|---|------|------|--------|-------|
| 3a | `index.astro` | 第328行 | 從弱電配置到使用情境，**為您**一次規劃到位。 | 從弱電到情境，一次規劃到位。 |
| 3b | `contact.astro` | 第174行 | 請直接加入官方 LINE，我們將由專人**為您**服務。 | 請直接加入官方 LINE，會由專人回覆。 |

### 詳細實作步驟

#### 替換① — index.astro:328

**步驟 1**：確認行號
```bash
grep -n "為您一次規劃到位" src/pages/index.astro
```

**步驟 2**：替換
**old_string**：
```astro
          從弱電配置到使用情境，為您一次規劃到位。
```
**new_string**：
```astro
          從弱電到情境，一次規劃到位。
```

#### 替換② — contact.astro:174

**步驟 1**：確認行號
```bash
grep -n "為您服務" src/pages/contact.astro
```

**步驟 2**：替換
**old_string**：
```astro
                <p>為確保諮詢品質，線上表單暫停收件。請直接加入官方 LINE，我們將由專人為您服務。</p>
```
**new_string**：
```astro
                <p>為確保諮詢品質，線上表單暫停收件。請直接加入官方 LINE，會由專人回覆。</p>
```

**步驟 3**：驗證無殘留「為您」
```bash
grep -n "為您\|為您" src/pages/index.astro src/pages/contact.astro
```
預期：0 行（不含路徑字串本身）

**Commit message**：`fix: 消除「為您」AI八股，改為直說人話`

---

## Commit 4 — index.astro：「深耕」AI套話 → 「服務」中性詞

**檔案**：`src/pages/index.astro`
**範圍**：第150行，about-intro

### 替換

**old_string**：
```astro
        <p class="about-intro">深耕大台北，專注住宅、商空與智能整合。</p>
```
**new_string**：
```astro
        <p class="about-intro">服務大台北。住宅、商空與智能整合。</p>
```

**驗證**：
```bash
grep -n "深耕" src/pages/index.astro
```
預期：0 行

**Commit message**：`fix: index about-intro「深耕」→「服務」，消除 AI 套話`

---

## Commit 5 — index.astro：consult-title 語意斷行防孤字

**檔案**：`src/pages/index.astro`
**範圍**：第573行 consult-title h2

### 變更原因
- 原句：21 字當量（"如果方向已經對了，就用最舒服的方式起步"）
- CSS：`max-width: 9.6ch` + `text-wrap: balance`
- 風險：句中「，」可能單獨落單行，產生視覺孤字

### 替換策略
- 桌面：加入語意 `<br>` 強制斷行，讓「方向對了」與「就用最舒服…」分屬兩行
- 手機：保持 `text-wrap: balance`，ch 值足夠時會自然平衡

### 替換

**old_string**：
```astro
        <h2 class="consult-title">如果方向已經對了，就用最舒服的方式起步</h2>
```
**new_string**：
```astro
        <h2 class="consult-title">方向對了，<br />就用最舒服的方式起步</h2>
```

**驗證**：
```bash
grep -n "consult-title" src/pages/index.astro | head -5
```
確認新內容含 `<br />`

**Commit message**：`fix: consult-title 語意斷行防孤字`

---

## Commit 6 — 全域 grep 驗證

### 驗證① 無「協助」
```bash
grep -rn "協助" src/pages/smart-home.astro
```
**預期**：0 行

### 驗證② 無「為您」「為您」
```bash
grep -rn "為您" src/pages/index.astro src/pages/contact.astro
```
**預期**：0 行（不含路徑字串）

### 驗證③ 無 blog h1/h2 句尾句號
```bash
grep -n "。</h[12]>" src/pages/blog/index.astro
```
**預期**：0 行

### 驗證④ 無「深耕」
```bash
grep -rn "深耕" src/pages/index.astro
```
**預期**：0 行

### 驗證⑤ consult-title 含 `<br />`
```bash
grep -n "consult-title" src/pages/index.astro | head -5
```
**預期**：h2 行含 `方向對了，<br />就用`

### 驗證⑥ 情緒動詞黑名單掃描（順便確認）
```bash
grep -rEn "負責到底|用心|貼心|真心|耐心|細心|放心|全力以赴|使命必達|完美融合|絕對|最優|最棒|最佳|首選|唯一|頂尖|一流|完善|量身打造|優質|高品質|打造夢想|圓夢" src/pages/index.astro src/pages/contact.astro src/pages/faq.astro src/pages/smart-home.astro 2>/dev/null
```
**預期**：0 行（主頁面範圍內）

---

## Commit 分鏡對照表

| # | Commit Message | 檔案 |
|---|----------------|------|
| 1 | `fix: smart-home 消除「協助」被動句，改為主動句式` | `smart-home.astro` |
| 2 | `fix: blog/index h1/h2 句尾句號移除，遵守 SOP 標點規範` | `blog/index.astro` |
| 3 | `fix: 消除「為您」AI八股，改為直說人話` | `index.astro` + `contact.astro` |
| 4 | `fix: index about-intro「深耕」→「服務」，消除 AI 套話` | `index.astro` |
| 5 | `fix: consult-title 語意斷行防孤字` | `index.astro` |
| 6 | `chore: 全域文案 grep 驗證` | — |

---

## 預估影響評估

| 改動 | 字數變化 | 風險 |
|------|----------|------|
| ① 協助→主動 | 各句減 2-4 字 | 無風險，功能不變 |
| ② 句號移除 | 0 字變化 | 無風險，純格式 |
| ③ 為您→直說 | 22→13 / 35→18 字 | 無風險，文意相同 |
| ④ 深耕→服務 | 18→14 字 | 無風險，文意相同 |
| ⑤ 斷行 | 0 字變化 | 低風險，需驗證手機呈現 |

**預估總字數變化**：全站減少約 25-30 個字，無任何內容損失，無語意變動。

# Round 2 文案減法實作清單（Round Copy Audit — 待執行）

> 本檔案由文案減法體檢（Score 6.0/10）產出。
> 每一項目為獨立實作單位，可交由低階模型直接照表操課。
> **操作鐵律**：嚴禁擅自增刪原文意，只做「刪除」或「替換字詞」。
> **本輪豁免**：所有 `src/pages/blog/*.astro` 內的 article 正文內容一律不動。

---

## 執行前的備份確認

在開始之前，請在終端執行以下指令，確認 git 狀態乾淨：

```bash
cd /Users/liangzhiwei/bustling-belt
git status
```

若終端輸出包含 `Changes not staged for commit`，請先 commit 或 stash，避免修改被覆蓋。

---

## 實作總覽

| 分類 | 動作 | 數量 |
|------|------|------|
| A | 整段刪除（100% Deletion） | 2 處 |
| B | 精簡文字（替換） | 3 處 |
| C | CSS balance 補強（手機斷行防 orphan） | 3 處 |

---

## 【A】整段刪除（100% Deletion）

### A-1｜index.astro — 刪除 `.smart-case-mobile-note` 整段

**檔案**：`src/pages/index.astro`

**搜尋字串**：
```
smart-case-mobile-note
```

**預期位置**：約在 line 247 區域

**完整待刪除節點**：
```astro
<p class="smart-case-mobile-note">手機版先看重點能力，更多內容可進入智能家居專區。</p>
```

**實作動作**：將整個 `<p class="smart-case-mobile-note">...</p>` 標籤刪除。

**為什麼刪除**：
- 使用者自己知道正在用手機，「進入專區」按鈕已存在下方
- 「手機版先看重點能力」是純 meta 廢話，無新資訊
- 留白比文字更乾淨

**驗證**：
```bash
grep -n "smart-case-mobile-note" src/pages/index.astro
# 預期輸出：0 行
```

---

### A-2｜smart-home.astro — 刪除 `.section-heading > p:last-child` 整段

**檔案**：`src/pages/smart-home.astro`

**搜尋字串**：
```
不是單純展示設備，而是直接看見入住後的使用感
```

**預期位置**：約在 line 122 區域

**完整待刪除節點**：
```astro
<p>
  不是單純展示設備，而是直接看見入住後的使用感。
</p>
```

**實作動作**：將整個 `<p>...</p>` 標籤刪除。

**為什麼刪除**：
- 上方 h2「把智能家居的使用感與空間感一起看見」已完整宣告同件事
- 此段是 h2 的同義改寫，屬自明性廢話
- 刪除後讓視覺更乾淨，不干擾下方 visual-grid

**驗證**：
```bash
grep -n "不是單純展示設備" src/pages/smart-home.astro
# 預期輸出：0 行
```

---

## 【B】精簡文字（替換）

### B-1｜smart-home.astro — 精簡 positioning-card-dark 內文

**檔案**：`src/pages/smart-home.astro`

**搜尋字串**：
```
很多智能家居不好用
```

**預期位置**：約在 line 135-136 區域（`.positioning-card-dark` 內的 `<p>` 段落）

**完整待替換節點（Before）**：
```astro
<p>
  很多智能家居不好用，不是設備不夠新，而是空間、佈線與控制邏輯沒有一起規劃。
  青曦會在設計階段先整合這些條件，讓系統更順手。
</p>
```

**替換為（After）**：
```astro
<p>
  不是設備不夠新，是空間、佈線與控制邏輯沒有一起規劃。
</p>
```

**改動說明**：
| 原文 | 修改後 | 理由 |
|------|--------|------|
| 很多智能家居不好用（鋪墊句） | 刪除 | 無新資訊，直接從核心切入 |
| 不是設備不夠新，而是空間、佈線與控制邏輯沒有一起規劃 | 保留，精簡開頭 | 核心洞察保留 |
| 青曦會在設計階段先整合這些條件，讓系統更順手（湊字尾） | 刪除 | 「讓系統更順手」是湊字，「整合」在上半句已隱含 |

---

### B-2｜index.astro — 精簡 `.consult-description` 尾句

**檔案**：`src/pages/index.astro`

**搜尋字串**：
```
下一步自然會更準
```

**預期位置**：約在 line 432 區域（`.consult-description` 段落）

**完整待替換節點（Before）**：
```astro
<p class="consult-description">
  不一定要立刻決定全部。先把目前的空間狀態、預算感與想改善的生活節奏整理清楚，下一步自然會更準。
</p>
```

**替換為（After）**：
```astro
<p class="consult-description">
  把空間狀態、預算感與想改善的生活節奏整理清楚。
</p>
```

**改動說明**：
| 原文 | 修改後 | 理由 |
|------|--------|------|
| 不一定要立刻決定全部 | 刪除 | 上方 h2「方向對了，就用最舒服的方式起步」已宣告 |
| 先把目前的空間狀態、預算感與想改善的生活節奏整理清楚 | 保留主句 | 核心 action anchor |
| 下一步自然會更準（湊字尾） | 刪除 | CTA 按鈕「先進聯絡頁」已完成此動作敘述 |

---

### B-3｜faq.astro — 精簡 answer 5（保固說明）

**檔案**：`src/pages/faq.astro`

**搜尋字串**：
```
提供一年工程保固
```

**預期位置**：約在 line 31 區域（faqItems array 內第 5 項 answer）

**完整待替換節點（Before）**：
```astro
answer: "提供一年工程保固。保固期內若有施工瑕疵，會協助安排修復。",
```

**替換為（After）**：
```astro
answer: "一年工程保固；期間施工瑕疵協助修復。",
```

**改動說明**：
| 原文 | 修改後 | 理由 |
|------|--------|------|
| 提供一年工程保固（冗詞「提供」） | 一年工程保固 | 「提供」是自明動詞，直接講事實 |
| 保固期內若有施工瑕疵，會協助安排修復（冗詞「若」「會」） | 期間施工瑕疵協助修復 | 「期間」取代「保固期內」；刪「會」「安排」湊字 |

---

## 【C】CSS balance 補強（手機斷行防 orphan）

### C-1｜faq.astro — 為 hero h1 加入 `text-wrap: balance`

**檔案**：`src/pages/faq.astro`

**搜尋字串**：
```
<h1>把合作前最常卡住的事，先安靜看清楚</h1>
```

**預期位置**：line ~26（`<h1>` 標籤）

**完整待替換節點（Before）**：
```astro
<h1>把合作前最常卡住的事，先安靜看清楚</h1>
```

**替換為（After）**：
```astro
<h1 style="text-wrap: balance;">把合作前最常卡住的事，先安靜看清楚</h1>
```

**為什麼需要**：
- h1 為 14 字當量（漢字 13 + 標點 0.5×2）
- 在 375px 窄螢幕下摺行後易出現 orphan「事，先安靜看清楚」
- `text-wrap: balance` 讓瀏覽器自動平衡行長，避免孤字

---

### C-2｜faq.astro — 為 `.faq-curation-copy h2` 加入 `text-wrap: balance`

**檔案**：`src/pages/faq.astro`

**搜尋字串**：
```
不是要你一次懂完，而是先知道合作節奏合不合
```

**預期位置**：約在 line 75 區域

**完整待替換節點（Before）**：
```astro
<h2>不是要你一次懂完，而是先知道合作節奏合不合</h2>
```

**替換為（After）**：
```astro
<h2 style="text-wrap: balance;">不是要你一次懂完，而是先知道合作節奏合不合</h2>
```

**為什麼需要**：
- h2 為 19 字當量（漢字 17 + 標點 0.5×4）
- 字級 3-4.8rem，窄螢幕下摺行 orphan 風險高
- `text-wrap: balance` 保護「不是要你一次懂完」不被孤單拆行

---

### C-3｜smart-home.astro — 為 hero h1 加入 `text-wrap: balance`

**檔案**：`src/pages/smart-home.astro`

**搜尋字串**：
```
<h1>把智能家居做成真正好用的生活系統</h1>
```

**預期位置**：約在 line 64 區域

**完整待替換節點（Before）**：
```astro
<h1>把智能家居做成真正好用的生活系統</h1>
```

**替換為（After）**：
```astro
<h1 style="text-wrap: balance;">把智能家居做成真正好用的生活系統</h1>
```

**為什麼需要**：
- h1 為 14 字當量（漢字 13 + 標點 0.5×2）
- 桌面版可單行，手機 375px 折行後易 orphan
- `text-wrap: balance` 讓行長自動平衡

---

## 實作順序建議（每個 commit 獨立可 revert）

### Commit 1：整段刪除 A 組
包含：**A-1, A-2**

```bash
git add src/pages/index.astro src/pages/smart-home.astro
git commit -m "refactor(copy): 整段刪除 2 處自明性廢話

- index: 刪除 smart-case-mobile-note（純 meta廢話）
- smart-home: 刪除 section-heading p（h2已宣告同件事）

驗證：
grep -n \"smart-case-mobile-note|不是單純展示設備\" src/pages/index.astro src/pages/smart-home.astro
# 預期：0 行"
```

### Commit 2：精簡文字 B 組
包含：**B-1, B-2, B-3**

```bash
git add src/pages/smart-home.astro src/pages/index.astro src/pages/faq.astro
git commit -m "refactor(copy): 精簡 positioning-card / consult-desc / 保固 answer

- smart-home positioning-card-dark: 刪鋪墊句+湊字尾，60字→22字
- index consult-description: 刪h2已宣告語+湊字尾，45字→22字
- faq answer 5: 刪冗詞「提供」「會」「安排」，純事實陳述

驗證：
grep -n \"很多智能家居不好用|下一步自然會更準|提供一年工程保固\" src/pages/smart-home.astro src/pages/index.astro src/pages/faq.astro
# 預期：0 行"
```

### Commit 3：CSS balance C 組
包含：**C-1, C-2, C-3**

```bash
git add src/pages/faq.astro src/pages/smart-home.astro
git commit -m "fix(typography): 為 3 個 14+ 字當量 h1/h2 補 text-wrap balance

- faq hero h1: 14 字當量，375px 易 orphan
- faq curation h2: 19 字當量，含「不是X而是Y」句型
- smart-home hero h1: 14 字當量，窄螢幕折行保護

驗證：
grep -n \"text-wrap: balance\" src/pages/faq.astro src/pages/smart-home.astro
# 預期：本次新增 3 處"
```

---

## 實作完成後的驗證 SOP

### 1. 確認差異範圍合理

```bash
git diff --stat HEAD~3..HEAD
```

預期：**減少行數為主**（刪除多於新增），淨變動約 -15 到 -30 行。

### 2. 確認無新增 AI 套話

```bash
grep -rEn "優質|專業|頂尖|一流|完善|全方位|量身打造|不是.*而是" src/pages/ src/components/ src/layouts/ | grep -v "social-ops/" | grep -v "/blog/" | grep -v "css-palette\|design-token"
```

預期：本次修改後 `不是.*而是` 句型從 4 處降至 2 處（`index.astro brand-strip-intro` + `smart-home.astro CTA h2` 屬品牌語氣慣例，保留）。

### 3. 確認 h1/h2/h3 無尾句點

```bash
grep -rEn "<h[1-3][^>]*>[^<]+[。！?？]</h[1-3]>" src/pages/ src/components/ src/layouts/ | grep -v "/blog/"
```

預期：**0 行**

### 4. 確認本期變更清單 8 項全數完成

```bash
for term in "smart-case-mobile-note" "不是單純展示設備" "很多智能家居不好用" "下一步自然會更準" "提供一年工程保固" "把合作前最常卡住的事，先安靜看清楚" "不是要你一次懂完" "把智能家居做成真正好用的生活系統"; do
  count=$(grep -rEn "$term" src/pages/ 2>/dev/null | grep -v "/blog/" | wc -l)
  echo "$term: $count"
done
```

預期每項：`0`

### 5. build 驗證（必跑）

```bash
cd /Users/liangzhiwei/bustling-belt
npm run build 2>&1 | tail -20
```

預期：無錯誤，build 成功。

### 6. dev server 驗證（選跑）

```bash
tail -30 /tmp/astro-dev.log 2>/dev/null
```

預期：HMR 編譯無 error。

---

## 本次實作不涵蓋的範圍

以下內容**不在此次實作範圍內**，保持原樣不動：

- ✅ **所有 `src/pages/blog/*.astro` 內的 article 正文內容**（使用者明確豁免）
- ✅ `src/pages/social-ops/index.astro`（後台系統，editorial 風格例外）
- ✅ CSS 樣式（非文案相關，但 balance inline style 例外）
- ✅ 圖片 alt 屬性（非此次審計範圍）
- ✅ SEO meta description（非此次審計範圍）
- ✅ 9 種斷點合併議題（下輪處理）
- ✅ 5+ 檔案硬寫 hex 色彩鎖修補（下輪處理）

---

## 變更清單總表

| # | 檔案 | 行 | 動作 | Before 摘要 | After 摘要 |
|---|------|----|------|-------------|------------|
| A-1 | index.astro | ~247 | 整段刪除 | `<p class="smart-case-mobile-note">手機版先看重點能力...</p>` | （無） |
| A-2 | smart-home.astro | ~122 | 整段刪除 | `<p>不是單純展示設備，而是直接看見...</p>` | （無） |
| B-1 | smart-home.astro | ~135-136 | 精簡替換 | positioning-card-dark p（60+ 字） | 「不是設備不夠新，是空間、佈線與控制邏輯沒有一起規劃。」（22 字） |
| B-2 | index.astro | ~432 | 精簡替換 | consult-description（45 字） | 「把空間狀態、預算感與想改善的生活節奏整理清楚。」（22 字） |
| B-3 | faq.astro | ~31 | 精簡替換 | 「提供一年工程保固。保固期內若有施工瑕疵，會協助安排修復。」 | 「一年工程保固；期間施工瑕疵協助修復。」 |
| C-1 | faq.astro | ~26 | CSS balance | `<h1>...</h1>` | `<h1 style="text-wrap: balance;">...</h1>` |
| C-2 | faq.astro | ~75 | CSS balance | `<h2>...</h2>` | `<h2 style="text-wrap: balance;">...</h2>` |
| C-3 | smart-home.astro | ~64 | CSS balance | `<h1>...</h1>` | `<h1 style="text-wrap: balance;">...</h1>` |

---

*本清單由文案減法體檢（Round Copy Audit, Score 6.0/10）產出。*
*操作鐵律：只刪不增；blog 正文 / social-ops 後台 / CSS 顏色與斷點 豁免。*

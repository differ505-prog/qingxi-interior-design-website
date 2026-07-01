# 青曦知識文章美感模板

## 目的

- 讓新文章不只是「有內容」，而是能穩定呈現青曦知識區的編輯感。
- 適用於 `src/pages/blog/*.astro` 的靜態文章頁。
- 優先沿用共用版型 [EditorialArticleLayout.astro](file:///Users/liangzhiwei/bustling-belt/src/components/blog/EditorialArticleLayout.astro) 已有樣式，不另起新風格。

## 建議骨架

### 1. 開場 lead

- 第一段使用 `.article-lead`
- 用途：先把讀者拉進問題情境，不急著解答
- 長度：1 段，2-4 句

```astro
<p class="article-lead">
  先交代讀者真正卡住的情境、焦慮點與判斷難題。
</p>
```

### 2. 早段引用卡

- lead 後盡量在 1 段內出現 `blockquote`
- 用途：提供一句能定錨全文的核心判斷
- 不要太長，1-2 句即可

```astro
<blockquote>
  先回答什麼不能省、什麼不該急，再談風格與預算。
</blockquote>
```

### 3. 摘要面板

- 用 `.article-insight-panel`
- 用途：把整篇文章的判斷骨架先整理出來
- 適合放在開頭或轉場段落

```astro
<div class="article-insight-panel">
  <p class="article-insight-label">判斷骨架</p>
  <h3 class="article-insight-title">一句話說清楚這篇文章的決策順序。</h3>
  <p>用 2-3 句補充，讓讀者知道後面會怎麼展開。</p>
</div>
```

### 4. 主段落層級

- 文章至少要有 `3` 個 `h2`
- 每個 `h2` 下，盡量補 `2-3` 個 `h3`
- 不要只靠大段落堆滿；要讓讀者能掃讀

推薦節奏：

- `h2`：主判斷軸
- `h3`：子情境、常見誤區、具體檢查點

## 可重用模組

### A. 雙欄資訊卡

- 用 `.article-card-grid`
- 適合做：A/B 對照、適合 / 不適合、要做 / 可延後、風險 / 建議

```astro
<div class="article-card-grid">
  <div class="article-card">
    <p class="article-card-kicker">Need</p>
    <h3>不可妥協的需要</h3>
    <p>寫 2-4 句說明。</p>
  </div>
  <div class="article-card">
    <p class="article-card-kicker">Want</p>
    <h3>可被替代的想要</h3>
    <p>寫 2-4 句說明。</p>
  </div>
</div>
```

### B. 三欄檢查格

- 用 `.article-check-grid`
- 適合做：檢查點、判斷順序、三步驟、三個核心問題

```astro
<div class="article-check-grid">
  <div class="article-check-item">
    <strong>檢查點一</strong>
    <p>一句到兩句，越清楚越好。</p>
  </div>
  <div class="article-check-item">
    <strong>檢查點二</strong>
    <p>一句到兩句，越清楚越好。</p>
  </div>
  <div class="article-check-item">
    <strong>檢查點三</strong>
    <p>一句到兩句，越清楚越好。</p>
  </div>
</div>
```

### C. 單圖與雙圖

- 單張重點圖：用 `.article-figure`
- 中後段若有 2 張圖，優先用 `.article-gallery`
- 一篇文章建議至少有：
  - 1 張封面圖
  - 1 張內文重點圖
  - 若素材足夠，再補 1 組雙圖 gallery

```astro
<figure class="article-figure">
  <img src={articleDetailImage} alt="描述重點即可" />
  <figcaption>用一句話補充圖片與本文的關係。</figcaption>
</figure>
```

```astro
<div class="article-gallery">
  <figure class="article-figure">
    <img src={imageA} alt="第一張圖" />
    <figcaption>第一張圖的說明。</figcaption>
  </figure>
  <figure class="article-figure">
    <img src={imageB} alt="第二張圖" />
    <figcaption>第二張圖的說明。</figcaption>
  </figure>
</div>
```

## 建議節奏

- 開頭：`lead + blockquote + insight panel`
- 中段：每個 `h2` 都盡量有 `h3`
- 中後段：至少出現一次 `card grid` 或 `check grid`
- 結尾前：若有兩張圖，優先放 `gallery`
- 結尾：用 `blockquote` 收束，比普通段落更有份量

## 不建議

- 不要整篇只有 `h2 + 長段落`
- 不要把條列都寫成很長的完整段落，會失去掃讀性
- 不要每張圖都只當裝飾，要讓 caption 幫正文補充判斷
- 不要一開始就塞太多背景，前兩屏要先建立主軸
- 不要把文章寫成社群貼文延長版；知識文章應該像可收進書稿的章節

## 建議最低標準

- 1 個 `.article-lead`
- 1 個前段 `blockquote`
- 1 個 `.article-insight-panel`
- 3 個以上 `h2`
- 至少 4 個 `h3`
- 1 個 `.article-card-grid` 或 `.article-check-grid`
- 1 張 `.article-figure`
- 有第二、三張圖時，優先改成 `.article-gallery`
- 結尾用 `blockquote` 或有份量的總結模組收束

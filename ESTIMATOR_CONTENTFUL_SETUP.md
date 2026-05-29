# 裝修估價器 Contentful 設定說明

## 目標

裝修估價器現在會優先讀取 Contentful 的 `renovationEstimatorConfig` 內容模型。

如果 Contentful 尚未建立這個內容模型，或欄位資料不完整，網站會自動回退到內建預設值，不會讓估價器壞掉。

另外，專案必須先正確設置 `CONTENTFUL_SPACE_ID` 與 `CONTENTFUL_ACCESS_TOKEN`，系統才能讀到後台資料。

## 環境變數

請確認本機 `.env` 或部署平台環境變數已有以下內容：

```env
CONTENTFUL_SPACE_ID=你的_space_id
CONTENTFUL_ACCESS_TOKEN=你的_access_token
```

## 內容模型

請在 Contentful 新增一個 Content Model：

- Name: `Renovation Estimator Config`
- API Identifier: `renovationEstimatorConfig`

## 建議欄位

請新增以下欄位，型別都使用 `Number`，只有 `disclaimer` 使用 `Short text`：

- `basicMin`
- `basicMax`
- `standardMin`
- `standardMax`
- `premiumMin`
- `premiumMax`
- `luxuryMin`
- `luxuryMax`
- `fullMultiplier`
- `partialMultiplier`
- `designOnlyMultiplier`
- `designFeeMin`
- `designFeeMax`
- `disclaimer`

## 欄位意義

- `basicMin` / `basicMax`: 經濟型每坪單價區間
- `standardMin` / `standardMax`: 標準型每坪單價區間
- `premiumMin` / `premiumMax`: 精緻型每坪單價區間
- `luxuryMin` / `luxuryMax`: 豪華型每坪單價區間
- `fullMultiplier`: 全屋裝修倍率，通常填 `1`
- `partialMultiplier`: 局部裝修倍率，預設 `0.6`
- `designOnlyMultiplier`: 純設計倍率，預設 `0.15`
- `designFeeMin` / `designFeeMax`: 每坪設計費區間
- `disclaimer`: 估價器下方提醒文字

## 預設值

如果你還沒在 Contentful 建資料，系統會使用這組預設值：

```text
basic: 4 - 6
standard: 6 - 10
premium: 10 - 15
luxury: 15 - 20
fullMultiplier: 1
partialMultiplier: 0.6
designOnlyMultiplier: 0.15
designFeeMin: 3
designFeeMax: 5
```

## 建立內容

建立好模型後，再新增一筆 Entry 即可。

建議只維護一筆資料，讓估價器固定讀第一筆設定。

## 修改後的效果

你之後只要在 Contentful 改數字：

- 估價公式會跟著變
- 前台「裝修等級」下拉選單的每坪價格文字也會同步更新
- 提醒文字會同步更新

## 注意事項

- 如果最小值大於最大值，系統會自動對調，避免前台顯示錯誤
- 如果倍率填成負數，系統會自動改成 `0`
- 如果某欄沒填，系統會用預設值補上

## 程式位置

- Contentful 設定讀取邏輯：`src/lib/contentful.js`
- 估價器頁面：`src/pages/tools/index.astro`

# 裝修估價器引流與成效追蹤設定

這份清單是給青曦網站目前的引流與轉換追蹤使用。

## 目前已完成

- 網站支援以 `PUBLIC_GA_MEASUREMENT_ID` 載入 Google Analytics 4
- 估價器已送出以下事件：
  - `renovation_estimate_generated`
  - `renovation_estimate_cta_click`
- 設計需求表已送出以下事件：
  - `requirement_form_submit`
  - `requirement_form_success`
- 設計需求表會自動帶入：
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`
  - `utm_term`
  - `utm_content`
  - `landing_page`
  - `page_referrer`
  - 估價器摘要欄位

## 上線前還需要的資料

### 1. Google Analytics 4 Measurement ID

- 格式範例：`G-ABC1234567`
- 用途：讓網站開始記錄流量、事件與轉換
- 放置位置：

```env
PUBLIC_GA_MEASUREMENT_ID=G-ABC1234567
```

### 2. Formspree Form ID

- 格式範例：`xblyzabc`
- 用途：讓設計需求表正式可送出
- 放置位置：

```env
PUBLIC_FORMSPREE_REQUIREMENT_FORM_ID=xblyzabc
```

## 建議的 GA4 轉換設定

在 GA4 後台中，建議把以下事件標記為轉換：

- `renovation_estimate_cta_click`
- `requirement_form_submit`
- `requirement_form_success`

其中最重要的是：

- `requirement_form_success`

這代表訪客已完成正式留單。

## 最值得先看的報表

### 1. 流量來源

- 看 `Session source / medium`
- 判斷流量來自 Google、Instagram、Facebook、LINE 或其他活動連結

### 2. 估價器使用量

- 看 `renovation_estimate_generated`
- 判斷有多少訪客真的開始用工具，不只是進頁面看看

### 3. CTA 點擊率

- 看 `renovation_estimate_cta_click`
- 對比 `renovation_estimate_generated`
- 判斷估價後有多少人願意往下一步走

### 4. 正式留單量

- 看 `requirement_form_submit` 與 `requirement_form_success`
- 判斷實際送出率與成功率

## UTM 命名建議

建議之後對外貼連結時都加上 UTM，例如：

```text
https://qingxidesign.tw/tools?utm_source=instagram&utm_medium=social&utm_campaign=renovation-estimator
```

可先固定這樣命名：

- `utm_source`：`instagram` `facebook` `line` `google`
- `utm_medium`：`social` `ads` `referral` `organic`
- `utm_campaign`：用活動名稱，例如 `renovation-estimator`、`summer-promo`

## 建議的判讀方式

- 工具頁流量高，但 `renovation_estimate_generated` 低：
  - 代表工具頁吸引人點進來，但內容還不夠讓人開始試算
- 有大量 `renovation_estimate_generated`，但 `renovation_estimate_cta_click` 低：
  - 代表估價器有吸引力，但後續承接不夠強
- `requirement_form_submit` 高，`requirement_form_success` 低：
  - 代表送出流程或外部收件有問題，需要優先檢查

## 下一步

等取得以下兩個資料後，就可以完成正式啟用：

- `PUBLIC_GA_MEASUREMENT_ID`
- `PUBLIC_FORMSPREE_REQUIREMENT_FORM_ID`

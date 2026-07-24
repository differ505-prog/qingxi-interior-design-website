# Top 3 分類去重（top3-category-dedupe）

## 症狀

在 social-ops 後台的「純新文章 Top 3」區塊，當排序邏輯把所有候選按某條件排完後，可能會出現 Top 3 全在同一個分類（例如全在「預算拆解」），導致使用者點開看到的是同一類別的 3 張卡，視覺上沒有分類代表性。

預期：Top 3 應優先以 round-robin 各分類取 1 篇的方式填滿，呈現多樣性；不足 limit 才在同一分類內遞補。

## 根因

`pickDiverseByCategory` 的 round-robin 邏輯若**空陣列 early-return 不正確**，或排序上游傳入空 array，會導致迴圈無限旋轉或結果未過濾成 limit 大小。

## 觸發條件

1. 候選池 length > limit（典型情況）
2. 候選依 `category` 欄位分組，每組至少 1 篇
3. 多分類情境

## 偵測護欄

**手動 grep**：

```bash
# 找出 round-robin 函式簽名
grep -n "pickDiverseByCategory" src/pages/social-ops/index.astro
# 確認最後 return 滿足 limit 限制且不返回空桶
grep -A 25 "function pickDiverseByCategory" src/pages/social-ops/index.astro | tail -10
```

**守護原則**：

- `result.length < safeLimit` 的迴圈必須有「全部桶空了」的終止條件
- 不能只看 `result.length === 0` 來 break（會無限旋轉）

## 修復 commit

`52eb356` — fix(social-ops): Top 3 分類去重 + 點擊卡片高亮互斥

## 迴歸測試

**狀態**：未保護（無 vitest）。

**規劃**：補單元測試覆蓋 round-robin 各分類取 1 篇的場景。

## 同類風險函式

- `pickDiverseByCategory` ← 本 bug 所在
- 任何「迴圈 + shift bucket + cursor ++ % length」結構都有同類風險

## 預防措施

程式碼審查階段，凡看到 `while (result.length < X)` + cursor pattern 都必須檢查：
1. 終止條件是否依「所有 bucket 空了」
2. lastResultLength 是否每次推進
3. 安全上限（避免無限旋轉）

# Bug 模式庫（BPA — Bug Pattern Atlas）

本目錄記錄專案歷史上出現過、已修復的關鍵 bug，建立可被檢索的模式庫，避免同類 bug 換個地方再次復發。

## 命名規則

- 一個 bug 一個檔案：`docs/bug-patterns/{YYYY-MM-DD}-{short-id}.md`
- 檔名首段為發生日期（UTC+8），次段為該 bug 簡短識別碼
- 識別碼為可記憶的形式，如 `top3-category-dedupe`、`dependency-lock-empty`

## 必填欄位

每個 bug 模式檔案至少包含：

1. **症狀**：使用者看到了什麼、預期應該是什麼
2. **根因**：JS/CSS/資料流哪一層出了問題
3. **觸發條件**：什麼樣的輸入或狀態會觸發
4. **偵測護欄**：用 grep / 腳本可以怎麼抓出這個 bug
5. **修復 commit**：修掉的 commit hash
6. **迴歸測試**：是否有測試保護；若無，標明已規劃

## 護欄檢查（自動）

`./guardrails-check.mjs` 會掃描本目錄內所有 `偵測護欄` 段落，自動檢查 codebase。執行方式：

```bash
node docs/bug-patterns/guardrails-check.mjs
```

或透過 npm script：

```bash
npm run lint:guardrails
```

## 護欄有效性評估

每 5 輪 review 一次：
- 上次 review 後又新增幾個同類 bug？
- 護欄是否抓到了任何 1 次違規？
- 若護欄從未觸發 → 評估是否過嚴或過鬆

## 已登記 bug 模式

| 日期 | 識別碼 | 簡述 | 護欄啟用 |
|---|---|---|---|
| 2026-07-23 | top3-category-dedupe | Top 3 候選分類去重 | ✅ |

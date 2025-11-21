# 🔧 維護模式使用說明

## 如何啟用維護模式（建置中頁面）

### 方法一：使用環境變數（推薦）

1. 在專案根目錄創建 `.env` 文件（如果還沒有）

2. 添加以下內容：
```env
MAINTENANCE_MODE=true
```

3. 重啟開發伺服器：
```bash
npm run dev
```

4. 現在所有訪客都會被重定向到 `/coming-soon` 頁面

### 方法二：允許特定IP訪問（測試用）

如果你想在維護模式下還能正常訪問網站進行測試：

```env
MAINTENANCE_MODE=true
ALLOWED_IPS=123.45.67.89,98.76.54.32
```

（將IP替換為你的實際IP地址）

### 方法三：直接修改 middleware.ts

在 `src/middleware.ts` 中直接修改：

```typescript
const MAINTENANCE_MODE = true; // 改為 true
```

---

## 如何關閉維護模式

### 方法一：環境變數
```env
MAINTENANCE_MODE=false
```

### 方法二：刪除環境變數
直接刪除 `.env` 文件中的 `MAINTENANCE_MODE` 行

### 方法三：修改 middleware.ts
```typescript
const MAINTENANCE_MODE = false; // 改為 false
```

---

## 建置中頁面自訂

編輯 `src/pages/coming-soon.astro` 可以自訂：

- 公司名稱
- 聯繫方式（LINE、Email）
- 預計上線時間
- 頁面樣式和文字

---

## SEO 設定

### 建置期間

`public/robots.txt` 已設定為阻止所有搜索引擎索引：
```
User-agent: *
Disallow: /
```

### 網站上線後

修改 `public/robots.txt` 為：
```
User-agent: *
Allow: /
Disallow: /coming-soon
```

---

## 部署注意事項

### Vercel / Netlify

在部署平台的環境變數設定中添加：
- `MAINTENANCE_MODE=true` （建置期間）
- `MAINTENANCE_MODE=false` （上線後）

### 其他平台

確保 `.env` 文件被正確讀取，或直接在 `middleware.ts` 中設定。

---

## 測試

1. 啟用維護模式
2. 訪問網站首頁，應該會自動跳轉到 `/coming-soon`
3. 直接訪問 `/coming-soon` 應該正常顯示
4. 關閉維護模式後，所有頁面應該正常訪問

---

## 常見問題

**Q: 為什麼我還是能看到正常頁面？**
A: 檢查 `.env` 文件是否正確設定，或重啟開發伺服器。

**Q: 如何知道我的IP地址？**
A: 訪問 https://whatismyipaddress.com/ 查看你的公網IP。

**Q: 維護模式會影響 SEO 嗎？**
A: 不會，因為 `robots.txt` 已經阻止搜索引擎索引。

**Q: 可以暫時關閉維護模式讓客戶看嗎？**
A: 可以，只要將 `MAINTENANCE_MODE` 設為 `false` 即可。


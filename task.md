# 任務：方案 B — 作品集案例頁實景圖替換

**目標圖片：** `/Users/liangzhiwei/Desktop/Gemini_Generated_Image_45xkuh45xkuh45xk.jpeg`
**目的地：** `src/pages/portfolio/xizhi-zhongxing-rd.astro` 作品集案例內頁

---

## Step 1：檔案搬遷與命名

**動作：** 將圖片複製到 `/Users/liangzhiwei/bustling-belt/public/images/portfolio/xizhi-zhongxing-rd/`

**新檔名：** `modern-living-room.jpeg`

**理由：** 符合「語意化命名」原則，禁止保留 Gemini_Generated 預設檔名。

```bash
cp "/Users/liangzhiwei/Desktop/Gemini_Generated_Image_45xkuh45xkuh45xk.jpeg" \
   "/Users/liangzhiwei/bustling-belt/public/images/portfolio/xizhi-zhongxing-rd/modern-living-room.jpeg"
```

---

## Step 2：在 Astro 頁面加入圖片物件

**檔案：** `src/pages/portfolio/xizhi-zhongxing-rd.astro`

**位置：** 在 `project.images` 陣列中新增一筆。

**插入位置建議：** 放在第二筆（`featured-xizhi.jpg`）之後，因為兩者同為客廳情境圖。

```javascript
{
  src: '/images/portfolio/xizhi-zhongxing-rd/modern-living-room.jpeg',
  alt: '現代簡約客廳實景，落地窗引入自然光、實木地板與室內植栽',
  layout: 'is-wide',   // 16:9 寬幅，適合 Hero 區塊
},
```

**裁切策略：** `is-wide` 適用於 16:9 橫幅，裁切中間主體（實木地板 + 沙發 + 落地窗）。

---

## Step 3：原始檔追溯註解（HTML 圖片上方）

在 Astro `<img>` 或 `<Image>` 元件上方補上註解，格式如下：

```html
<!-- 圖片：現代簡約客廳實景
     原始檔：/Users/liangzhiwei/Desktop/Gemini_Generated_Image_45xkuh45xkuh45xk.jpeg
     原始尺寸：1600x900 (16:9)
     顯示策略：object-fit: cover + object-position: center
     AI生圖提示詞：Modern minimalist living room interior, open plan, natural light through floor-to-ceiling windows, wooden ceiling beams, contemporary furniture, indoor plants, warm wood tones -->
<img
  src="/images/portfolio/xizhi-zhongxing-rd/modern-living-room.jpeg"
  alt="現代簡約客廳實景，落地窗引入自然光、實木地板與室內植栽"
  width="1600"
  height="900"
  loading="lazy"
  class="project-img"
  style="object-fit: cover; object-position: center;"
/>
```

---

## Step 4：確認 CSS 有 `object-fit: cover`

**檔案：** `src/pages/portfolio/xizhi-zhongxing-rd.astro` 的 `<style>` 區塊

確認 `.project-img` 或 `.is-wide` 已有：

```css
.project-img,
.is-wide {
  width: 100%;
  height: auto;
  object-fit: cover;
}
```

若無，補上。

---

## Step 5：驗證 SOP 合規（grep 命令）

完成後依序執行：

```bash
# 5.1 確認檔案已複製
ls /Users/liangzhiwei/bustling-belt/public/images/portfolio/xizhi-zhongxing-rd/modern-living-room.jpeg

# 5.2 確認 alt 不是空泛描述
grep -n "modern-living-room.jpeg" /Users/liangzhiwei/bustling-belt/src/pages/portfolio/xizhi-zhongxing-rd.astro

# 5.3 確認無 AI 平台預設檔名殘留
grep -rEn "Gemini_Generated|Midjourney_|DALL-E_" \
  /Users/liangzhiwei/bustling-belt/src/pages/portfolio/

# 5.4 確認有原始檔追溯註解
grep -B 3 "modern-living-room.jpeg" \
  /Users/liangzhiwei/bustling-belt/src/pages/portfolio/xizhi-zhongxing-rd.astro \
  | grep "原始檔"
```

---

## Step 6：本地預覽

啟動開發伺服器後，訪問：

```
http://localhost:4321/portfolio/xizhi-zhongxing-rd
```

確認：
- 圖片正確顯示
- 無破圖 icon
- 響應式縮放正常（mobile / desktop）

---

## 附錄：AI 生圖提示詞（供後續參考）

```
Modern minimalist living room interior with open floor plan,
abundant natural light through floor-to-ceiling windows,
exposed wooden ceiling beams, warm oak wood flooring,
contemporary grey sofa with decorative pillows,
minimalist coffee table, potted monstera plant,
clean white walls, linear LED ceiling lighting,
indoor-outdoor connection feeling spacious yet cozy
```


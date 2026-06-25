# Debug Session: ga4-no-events
- **Status**: [OPEN]
- **Issue**: 網站已載入新 GA4 Measurement ID，但 GA4 即時報表與工作台都收不到任何事件資料。
- **Debug Server**: http://127.0.0.1:7777/event
- **Log File**: .dbg/trae-debug-log-ga4-no-events.ndjson

## Reproduction Steps
1. 打開正式站首頁或任一頁面。
2. 用手機 4G 或一般瀏覽器進站，停留 10-20 秒。
3. 觀察 GA4 即時報表是否出現活躍使用者或事件。

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | `gtag('config', ...)` 已載入，但自動 `page_view` 沒有成功送出 | High | Low | Pending |
| B | 前端頁面實際有載入錯的 Measurement ID 或 hydration 後被覆蓋 | Medium | Low | Pending |
| C | 瀏覽器端送出事件了，但被站上腳本、CSP 或載入時序中斷 | Medium | Medium | Pending |
| D | 事件有送出，但 GA4 property / stream 設定異常，未正常記錄 | Medium | Medium | Pending |

## Log Evidence
- Instrumentation added in `src/layouts/BaseLayout.astro`
- Debug points:
  - `A`: inline GA init script executed with resolved `googleAnalyticsId`
  - `B`: external `gtag.js` load success / failure
  - `C`: runtime snapshot of `window.gtag`, `window.dataLayer`, and resource requests after 4s
- Runtime evidence from `.dbg/trae-debug-log-ga4-no-events.ndjson`:
  - Line 1 / 5 / 9: `init-ga4` executed with `measurementId=G-QM2JJPDSHE`
  - Line 2 / 6 / 10: `gtag-script-loaded`
  - Line 3 / 7 / 11: `probe-dispatched`
  - Line 4 / 8 / 12: `runtime-state-snapshot`
  - `resourceHits` includes `https://www.google-analytics.com/g/collect?...&en=page_view...`
  - `resourceHits` also includes a second `https://www.google-analytics.com/g/collect?...` request from the probe run

## Verification Conclusion
| ID | Hypothesis | Status | Evidence Summary |
|----|------------|--------|------------------|
| A | `gtag('config', ...)` 已載入，但自動 `page_view` 沒有成功送出 | ❌ Rejected | Line 4 / 8 / 12 明確出現 `google-analytics.com/g/collect?...&en=page_view...` |
| B | 前端頁面實際有載入錯的 Measurement ID 或 hydration 後被覆蓋 | ❌ Rejected | 面板顯示 `measurementId: G-QM2JJPDSHE`，且 `scriptLoad: loaded` |
| C | 瀏覽器端送出事件了，但被站上腳本、CSP 或載入時序中斷 | ❌ Rejected | Line 4 / 8 / 12 已看到兩次 `g/collect`，前端傳輸層正常 |
| D | 事件有送出，但 GA4 property / stream 設定異常，未正常記錄 | ✅ Confirmed | 前端已把 `page_view` 與 probe 送到 `google-analytics.com/g/collect`，但 GA4 即時與工作台仍為 0，問題已轉到 GA4 接收/顯示側 |

Additional note:
- Screenshot `20:34:50` still does not show the newly added `probeQueued / probeDispatched / probeError` fields.
- This indicates the browser likely has not loaded commit `fae1f6a` yet, so a hard refresh after deploy completion is required for the next evidence round.
- Screenshot `20:36:30` confirms:
  - `probeQueued: yes`
  - `probeDispatched: yes`
  - `probeError: none`
  - `recentPushes` includes `["event","ga_debug_probe", ...]`
  - `networkHits: none`

## Fix Candidate
- Keep instrumentation.
- No additional business-logic fix yet.
- Next verification target:
  - Check GA4 `DebugView` for the `ga_debug_probe` event
  - Compare whether GA4 receives debug events but delays standard reports / home cards

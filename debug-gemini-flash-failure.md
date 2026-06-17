# Debug Session: gemini-flash-failure
- **Status**: [OPEN]
- **Issue**: Gemini Flash 目前無法生成，請稍後再試。
- **Debug Server**: http://127.0.0.1:7777/event
- **Log File**: .dbg/trae-debug-log-gemini-flash-failure.ndjson

## Reproduction Steps
1. 開啟 `social-ops`
2. 貼入社團問題
3. 觸發 `Gemini Flash` 生成
4. 畫面出現「Gemini Flash 目前無法生成，請稍後再試。」

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | API route 未讀到 `GEMINI_API_KEY` 或 `GOOGLE_GENERATIVE_AI_API_KEY` | High | Low | Rejected |
| B | 上游 Gemini API 因 model / quota / auth / request 格式失敗 | High | Low | Confirmed |
| C | 上游有回應但內容為空，或 normalize 後變空 | Med | Low | Rejected |
| D | 前端把後端具體錯誤吞掉，只顯示通用文案 | Med | Low | Confirmed |

## Log Evidence
- Local API reproduction succeeded:
  - `A` request received
  - `B` sending upstream gemini request
  - `C` upstream gemini request succeeded
  - `C` article assist response ok
- Production API reproduction:
  - `POST https://www.qingxidesign.tw/api/social-ops/article-assist`
  - Response: `{"error":"GEMINI_API_FAILED","detail":"...Quota exceeded...Please retry in 38.751151936s."}`
- Conclusion:
  - Local environment can generate normally, so missing key and empty response are both rejected.
  - Production fails because Gemini free-tier quota is exceeded.
  - Frontend currently collapses this specific cause into a generic "請稍後再試" message.

## Verification Conclusion
- Implemented minimal fix:
  - API now maps quota/rate-limit failures to `GEMINI_RATE_LIMITED`
  - API extracts `retryAfterSeconds` when upstream returns retry timing
  - Frontend now shows a specific warning like `Gemini Flash 目前達到額度上限，約 xx 秒後再試。`
- Waiting for remote deployment and user verification.

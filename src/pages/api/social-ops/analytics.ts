import type { APIRoute } from "astro";
import { createSign } from "node:crypto";

type GaMetricMap = Record<string, number>;
type TrafficTrendPoint = {
  date: string;
  label: string;
  sessions: number;
};

const REPORT_RANGE_DAYS = 7;
const CURRENT_RANGE_START_DAYS_AGO = REPORT_RANGE_DAYS - 1;
const PREVIOUS_RANGE_START_DAYS_AGO = CURRENT_RANGE_START_DAYS_AGO + REPORT_RANGE_DAYS;
const PREVIOUS_RANGE_END_DAYS_AGO = REPORT_RANGE_DAYS;
const SOCIAL_SOURCE_HINTS = [
  "facebook",
  "instagram",
  "threads",
  "line",
  "xhs",
  "xiaohongshu",
  "social",
];

function base64UrlEncode(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function signJwt(payload: Record<string, unknown>, privateKey: string) {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(privateKey);

  return `${unsignedToken}.${base64UrlEncode(signature)}`;
}

async function getGoogleAccessToken(clientEmail: string, privateKey: string) {
  const now = Math.floor(Date.now() / 1000);
  const assertion = signJwt(
    {
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    },
    privateKey,
  );

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const result = await response.json();
  if (!response.ok || !result?.access_token) {
    throw new Error(`GA4_ACCESS_TOKEN_FAILED:${result?.error || response.status}`);
  }

  return String(result.access_token);
}

async function runGaReport(
  accessToken: string,
  propertyId: string,
  body: Record<string, unknown>,
) {
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propertyId)}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(`GA4_RUN_REPORT_FAILED:${result?.error?.message || response.status}`);
  }

  return result;
}

async function runGaRealtimeReport(
  accessToken: string,
  propertyId: string,
  body: Record<string, unknown>,
) {
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propertyId)}:runRealtimeReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      `GA4_RUN_REALTIME_REPORT_FAILED:${result?.error?.message || response.status}`,
    );
  }

  return result;
}

async function runGaReportWithStartDateRetry(
  accessToken: string,
  propertyId: string,
  body: Record<string, unknown>,
) {
  try {
    return await runGaReport(accessToken, propertyId, body);
  } catch (error) {
    const retryStartDate = getRetryableGaStartDate(error);
    const dateRanges = Array.isArray(body?.dateRanges) ? body.dateRanges : [];
    if (!retryStartDate || dateRanges.length !== 1) {
      throw error;
    }

    const nextBody = {
      ...body,
      dateRanges: dateRanges.map((range: any) => ({
        ...range,
        startDate: retryStartDate,
      })),
    };

    return runGaReport(accessToken, propertyId, nextBody);
  }
}

function parseMetricValue(value: string | undefined) {
  const parsed = Number(value || "0");
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseReportMetricValue(report: any) {
  return parseMetricValue(
    report?.totals?.[0]?.metricValues?.[0]?.value ||
      report?.rows?.[0]?.metricValues?.[0]?.value,
  );
}

function getUtcIsoDateDaysAgo(daysAgo: number) {
  const value = new Date();
  value.setUTCHours(0, 0, 0, 0);
  value.setUTCDate(value.getUTCDate() - daysAgo);
  return value.toISOString().slice(0, 10);
}

function formatGaDateValue(rawValue: string) {
  if (!/^\d{8}$/.test(rawValue)) return "";
  return `${rawValue.slice(0, 4)}-${rawValue.slice(4, 6)}-${rawValue.slice(6, 8)}`;
}

function formatTrendLabel(dateValue: string) {
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-").map((value) => Number(value));
  if (!year || !month || !day) return dateValue;
  return `${month}/${day}`;
}

function createDateRangePoints(startDate: string, endDate: string, totals: Map<string, number>) {
  const points: TrafficTrendPoint[] = [];
  const cursor = new Date(`${startDate}T00:00:00Z`);
  const boundary = new Date(`${endDate}T00:00:00Z`);
  if (Number.isNaN(cursor.getTime()) || Number.isNaN(boundary.getTime())) {
    return points;
  }

  while (cursor <= boundary) {
    const date = cursor.toISOString().slice(0, 10);
    points.push({
      date,
      label: formatTrendLabel(date),
      sessions: totals.get(date) || 0,
    });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return points;
}

function buildTrafficTrendPoints(report: any, startDate: string, endDate: string) {
  const totals = new Map<string, number>();
  for (const row of report?.rows || []) {
    const date = formatGaDateValue(String(row?.dimensionValues?.[0]?.value || ""));
    if (!date) continue;
    totals.set(date, parseMetricValue(row?.metricValues?.[0]?.value));
  }

  return createDateRangePoints(startDate, endDate, totals);
}

function getRetryableGaStartDate(error: unknown) {
  const message = error instanceof Error ? error.message : String(error || "");
  const matched = message.match(/must be greater than (\d{4}-\d{2}-\d{2})/);
  if (!matched?.[1]) return "";

  const parsed = new Date(`${matched[1]}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return "";
  parsed.setUTCDate(parsed.getUTCDate() + 1);
  return parsed.toISOString().slice(0, 10);
}

function normalizePrivateKey(value: string) {
  const trimmed = value.trim();
  const unwrapped =
    trimmed.startsWith('"') && trimmed.endsWith('"')
      ? trimmed.slice(1, -1)
      : trimmed;
  return unwrapped.replace(/\\n/g, "\n").trim();
}

function isSocialSourceMedium(value: string) {
  const normalized = value.trim().toLowerCase();
  return SOCIAL_SOURCE_HINTS.some((hint) => normalized.includes(hint));
}

export const GET: APIRoute = async () => {
  const currentStartDate = getUtcIsoDateDaysAgo(CURRENT_RANGE_START_DAYS_AGO);
  const currentEndDate = getUtcIsoDateDaysAgo(0);
  const previousStartDate = getUtcIsoDateDaysAgo(PREVIOUS_RANGE_START_DAYS_AGO);
  const previousEndDate = getUtcIsoDateDaysAgo(PREVIOUS_RANGE_END_DAYS_AGO);

  const propertyId =
    import.meta.env.GA4_PROPERTY_ID?.trim() ||
    import.meta.env.GOOGLE_ANALYTICS_PROPERTY_ID?.trim() ||
    "";
  const clientEmail =
    import.meta.env.GA4_SERVICE_ACCOUNT_CLIENT_EMAIL?.trim() ||
    import.meta.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL?.trim() ||
    "";
  const privateKey = normalizePrivateKey(
    import.meta.env.GA4_SERVICE_ACCOUNT_PRIVATE_KEY ||
      import.meta.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ||
      "",
  );

  if (!propertyId || !clientEmail || !privateKey) {
    return new Response(
      JSON.stringify({
        status: "setup_required",
        configured: false,
        rangeLabel: "近 7 天",
        note:
          "需要設定 GA4_PROPERTY_ID、GA4_SERVICE_ACCOUNT_CLIENT_EMAIL、GA4_SERVICE_ACCOUNT_PRIVATE_KEY，工作台才能直接讀取 GA4 報表。",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const accessToken = await getGoogleAccessToken(clientEmail, privateKey);

    const socialSourceExpressions = SOCIAL_SOURCE_HINTS.map((value) => ({
      filter: {
        fieldName: "sessionSourceMedium",
        stringFilter: {
          matchType: "CONTAINS",
          value,
        },
      },
    }));

    const [
      realtimeReport,
      blogReport,
      eventReport,
      sourceReport,
      socialLandingReport,
      todaySessionsReport,
      totalSessionsReport,
      trafficTrendReport,
      previousTrafficTrendReport,
    ] = await Promise.all([
      runGaRealtimeReport(accessToken, propertyId, {
        metrics: [{ name: "activeUsers" }],
        minuteRanges: [{ startMinutesAgo: 29, endMinutesAgo: 0, name: "last30Minutes" }],
        limit: 1,
      }),
      runGaReport(accessToken, propertyId, {
        dateRanges: [{ startDate: currentStartDate, endDate: currentEndDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        dimensionFilter: {
          filter: {
            fieldName: "pagePath",
            stringFilter: {
              matchType: "BEGINS_WITH",
              value: "/blog/",
            },
          },
        },
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        metricAggregations: ["TOTAL"],
        limit: 5,
      }),
      runGaReport(accessToken, propertyId, {
        dateRanges: [{ startDate: currentStartDate, endDate: currentEndDate }],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          filter: {
            fieldName: "eventName",
            inListFilter: {
              values: [
                "renovation_estimate_generated",
                "renovation_estimate_cta_click",
                "requirement_form_submit",
                "requirement_form_success",
              ],
            },
          },
        },
      }),
      runGaReport(accessToken, propertyId, {
        dateRanges: [{ startDate: currentStartDate, endDate: currentEndDate }],
        dimensions: [{ name: "sessionSourceMedium" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 25,
      }),
      runGaReport(accessToken, propertyId, {
        dateRanges: [{ startDate: currentStartDate, endDate: currentEndDate }],
        dimensions: [{ name: "landingPagePlusQueryString" }, { name: "sessionSourceMedium" }],
        metrics: [{ name: "sessions" }],
        dimensionFilter: {
          orGroup: {
            expressions: socialSourceExpressions,
          },
        },
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 25,
      }),
      runGaReport(accessToken, propertyId, {
        dateRanges: [{ startDate: "today", endDate: "today" }],
        metrics: [{ name: "sessions" }],
        metricAggregations: ["TOTAL"],
      }),
      runGaReportWithStartDateRetry(accessToken, propertyId, {
        dateRanges: [{ startDate: "2005-01-01", endDate: "today" }],
        metrics: [{ name: "sessions" }],
        metricAggregations: ["TOTAL"],
      }),
      runGaReport(accessToken, propertyId, {
        dateRanges: [{ startDate: currentStartDate, endDate: currentEndDate }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
        limit: REPORT_RANGE_DAYS,
      }),
      runGaReport(accessToken, propertyId, {
        dateRanges: [{ startDate: previousStartDate, endDate: previousEndDate }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
        limit: REPORT_RANGE_DAYS,
      }),
    ]);

    const eventMetrics = (eventReport?.rows || []).reduce(
      (acc: GaMetricMap, row: any) => {
        const eventName = String(row?.dimensionValues?.[0]?.value || "");
        acc[eventName] = parseMetricValue(row?.metricValues?.[0]?.value);
        return acc;
      },
      {},
    );

    const topPosts = (blogReport?.rows || []).map((row: any) => ({
      pagePath: String(row?.dimensionValues?.[0]?.value || ""),
      views: parseMetricValue(row?.metricValues?.[0]?.value),
    }));

    const topSources = (sourceReport?.rows || []).map((row: any) => {
      const sourceMedium = String(row?.dimensionValues?.[0]?.value || "");
      return {
        sourceMedium,
        sessions: parseMetricValue(row?.metricValues?.[0]?.value),
        isSocial: isSocialSourceMedium(sourceMedium),
      };
    });

    const socialLandingTotals = new Map<string, number>();
    for (const row of socialLandingReport?.rows || []) {
      const landingPage = String(row?.dimensionValues?.[0]?.value || "").trim();
      const sessions = parseMetricValue(row?.metricValues?.[0]?.value);
      if (!landingPage || landingPage === "(not set)") continue;
      socialLandingTotals.set(landingPage, (socialLandingTotals.get(landingPage) || 0) + sessions);
    }

    const socialLandingPages = Array.from(socialLandingTotals.entries())
      .sort((left, right) => right[1] - left[1])
      .slice(0, 5)
      .map(([pagePath, sessions]) => ({
        pagePath,
        sessions,
      }));

    const totalBlogViews = parseMetricValue(
      blogReport?.totals?.[0]?.metricValues?.[0]?.value,
    );
    const todaySessions = parseReportMetricValue(todaySessionsReport);
    const totalSessions = parseReportMetricValue(totalSessionsReport);
    const realtimeActiveUsers = parseMetricValue(
      realtimeReport?.rows?.[0]?.metricValues?.[0]?.value,
    );
    const trafficTrendPoints = buildTrafficTrendPoints(
      trafficTrendReport,
      currentStartDate,
      currentEndDate,
    );
    const previousTrafficTrendPoints = buildTrafficTrendPoints(
      previousTrafficTrendReport,
      previousStartDate,
      previousEndDate,
    );
    const trafficTrendCurrentTotal = trafficTrendPoints.reduce(
      (sum, item) => sum + item.sessions,
      0,
    );
    const trafficTrendPreviousTotal = previousTrafficTrendPoints.reduce(
      (sum, item) => sum + item.sessions,
      0,
    );
    const trafficTrendChange = trafficTrendCurrentTotal - trafficTrendPreviousTotal;
    const trafficTrendChangePercent = trafficTrendPreviousTotal > 0
      ? Number(((trafficTrendChange / trafficTrendPreviousTotal) * 100).toFixed(1))
      : trafficTrendCurrentTotal > 0
        ? 100
        : 0;
    const socialSessions = topSources.reduce(
      (sum: number, item: { isSocial: boolean; sessions: number }) =>
        item.isSocial ? sum + item.sessions : sum,
      0,
    );

    return new Response(
      JSON.stringify({
        status: "ok",
        configured: true,
        rangeLabel: "近 7 天",
        updatedAt: new Date().toISOString(),
        metrics: {
          realtimeActiveUsers,
          todaySessions,
          totalSessions,
          blogViews: totalBlogViews,
          socialSessions,
          estimateGenerated: eventMetrics.renovation_estimate_generated || 0,
          estimateCtaClick: eventMetrics.renovation_estimate_cta_click || 0,
          requirementSubmit: eventMetrics.requirement_form_submit || 0,
          requirementSuccess: eventMetrics.requirement_form_success || 0,
        },
        topPosts,
        topSources: topSources.slice(0, 8),
        socialLandingPages,
        trafficTrend: {
          points: trafficTrendPoints,
          currentTotal: trafficTrendCurrentTotal,
          previousTotal: trafficTrendPreviousTotal,
          change: trafficTrendChange,
          changePercent: trafficTrendChangePercent,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("讀取 GA4 成效報表失敗：", error);
    return new Response(
      JSON.stringify({
        status: "error",
        configured: true,
        rangeLabel: "近 7 天",
        note: "GA4 報表或即時資料讀取失敗，請檢查 Property ID 或 service account 權限。",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

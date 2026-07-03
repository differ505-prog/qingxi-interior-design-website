import type { APIRoute } from "astro";

import {
  addVendorIntake,
  getBlobToken,
  validateVendorIntakeFile,
} from "../../lib/vendor-intake-store";
import {
  applyMemoryRateLimit,
  isSameOriginRequest,
} from "../../lib/request-security";

const VENDOR_INTAKE_RATE_LIMIT_WINDOW_MS = 20 * 60 * 1000;
const VENDOR_INTAKE_RATE_LIMIT_MAX_REQUESTS = 3;

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export const POST: APIRoute = async ({ request, url }) => {
  const token = getBlobToken();
  if (!token) {
    return jsonResponse(
      {
        status: "setup_required",
        configured: false,
        note: "目前尚未接通共享儲存，請先設定 Vercel Blob。",
      },
      503,
    );
  }

  if (!isSameOriginRequest(request, url)) {
    return jsonResponse(
      {
        status: "forbidden",
        configured: true,
        note: "此送出來源無效，請從本站頁面重新提交。",
      },
      403,
    );
  }

  const rateLimitResult = applyMemoryRateLimit({
    namespace: "vendor-intake",
    request,
    windowMs: VENDOR_INTAKE_RATE_LIMIT_WINDOW_MS,
    maxRequests: VENDOR_INTAKE_RATE_LIMIT_MAX_REQUESTS,
  });
  if (rateLimitResult.limited) {
    return new Response(
      JSON.stringify({
        status: "rate_limited",
        configured: true,
        note: "送出次數過於頻繁，請稍後再試。",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "Retry-After": String(rateLimitResult.retryAfterSeconds),
        },
      },
    );
  }

  try {
    const formData = await request.formData();
    const name = String(formData.get("name") || "").trim();
    const trade = String(formData.get("trade") || "").trim();
    const contactMethod = String(formData.get("contact_method") || "").trim();
    const contactValue = String(formData.get("contact_value") || "").trim();
    const serviceArea = String(formData.get("service_area") || "").trim();
    const projectFocus = String(formData.get("project_focus") || "").trim();
    const craftApproach = String(formData.get("craft_approach") || "").trim();
    const pricingDisclosure = String(formData.get("pricing_disclosure") || "").trim();
    const honeypot = String(formData.get("company") || "").trim();
    const rawFile = formData.get("pricing_file");
    const file = rawFile instanceof File && rawFile.size > 0 ? rawFile : null;

    if (honeypot) {
      return jsonResponse({
        status: "ok",
        configured: true,
        note: "資料已送出。",
      });
    }

    if (!name || !trade || !contactMethod || !contactValue || !serviceArea || !projectFocus || !craftApproach || !pricingDisclosure) {
      return jsonResponse(
        {
          status: "error",
          configured: true,
          note: "請填寫姓名、工種、服務區域、擅長案型、工法細緻度與報價資料提供方式。",
        },
        400,
      );
    }

    if (
      name.length > 40 ||
      trade.length > 40 ||
      contactMethod.length > 20 ||
      contactValue.length > 120 ||
      serviceArea.length > 80 ||
      projectFocus.length > 80 ||
      craftApproach.length > 80 ||
      pricingDisclosure.length > 40
    ) {
      return jsonResponse(
        {
          status: "error",
          configured: true,
          note: "部分欄位內容過長，請精簡後再送出。",
        },
        400,
      );
    }

    const note = String(formData.get("note") || "").trim();
    const teamName = String(formData.get("team_name") || "").trim();
    const invoiceStatus = String(formData.get("invoice_status") || "").trim();
    const acceptsContract = String(formData.get("accepts_contract") || "").trim();
    const pricingMode = String(formData.get("pricing_mode") || "").trim();
    const attachmentKind = String(formData.get("attachment_kind") || "").trim();
    const sourceLabel = String(formData.get("source_label") || "").trim();
    const sourceDetail = String(formData.get("source_detail") || "").trim();
    const utmSource = String(formData.get("utm_source") || "").trim();
    const utmMedium = String(formData.get("utm_medium") || "").trim();
    const utmCampaign = String(formData.get("utm_campaign") || "").trim();
    const utmTerm = String(formData.get("utm_term") || "").trim();
    const utmContent = String(formData.get("utm_content") || "").trim();
    const landingPage = String(formData.get("landing_page") || "").trim();
    const referrer = String(formData.get("referrer") || "").trim();

    if (
      teamName.length > 80 ||
      note.length > 1000 ||
      invoiceStatus.length > 40 ||
      acceptsContract.length > 40 ||
      pricingMode.length > 40 ||
      attachmentKind.length > 40 ||
      sourceLabel.length > 80 ||
      sourceDetail.length > 160 ||
      utmSource.length > 80 ||
      utmMedium.length > 80 ||
      utmCampaign.length > 120 ||
      utmTerm.length > 120 ||
      utmContent.length > 120 ||
      landingPage.length > 200 ||
      referrer.length > 200
    ) {
      return jsonResponse(
        {
          status: "error",
          configured: true,
          note: "補充欄位內容過長，請精簡後再送出。",
        },
        400,
      );
    }

    const requiresAttachment = pricingDisclosure === "direct" || pricingDisclosure === "sanitized";

    if (requiresAttachment && !file) {
      return jsonResponse(
        {
          status: "error",
          configured: true,
          note: "若選擇可直接提供或可提供去識別版本，請一併上傳報價資料。",
        },
        400,
      );
    }

    const fileError = validateVendorIntakeFile(file);
    if (file && fileError) {
      return jsonResponse(
        {
          status: "error",
          configured: true,
          note: fileError,
        },
        400,
      );
    }

    const result = await addVendorIntake(
      token,
      {
        name,
        teamName,
        trade,
        serviceArea,
        contactMethod,
        contactValue,
        projectFocus,
        craftApproach,
        invoiceStatus,
        acceptsContract,
        pricingMode,
        pricingDisclosure,
        note,
        attachmentKind,
        sourceType: "vendor_submitted",
        sourceLabel,
        sourceDetail,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
        landingPage,
        referrer,
      },
      file,
    );

    return jsonResponse({
      status: "ok",
      configured: true,
      item: result.item,
      note: "資料已送出，若案件適合，青曦會再主動聯繫。",
    });
  } catch (error) {
    console.error("工班登錄提交失敗：", error);
    return jsonResponse(
      {
        status: "error",
        configured: true,
        note: "工班資料提交失敗，請稍後再試。",
      },
      500,
    );
  }
};

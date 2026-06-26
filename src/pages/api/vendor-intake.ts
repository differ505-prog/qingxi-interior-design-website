import type { APIRoute } from "astro";

import {
  addVendorIntake,
  getBlobToken,
  validateVendorIntakeFile,
} from "../../lib/vendor-intake-store";

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
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
    const rawFile = formData.get("pricing_file");
    const file = rawFile instanceof File && rawFile.size > 0 ? rawFile : null;

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
        teamName: String(formData.get("team_name") || "").trim(),
        trade,
        serviceArea,
        contactMethod,
        contactValue,
        projectFocus,
        craftApproach,
        invoiceStatus: String(formData.get("invoice_status") || "").trim(),
        acceptsContract: String(formData.get("accepts_contract") || "").trim(),
        pricingMode: String(formData.get("pricing_mode") || "").trim(),
        pricingDisclosure,
        note: String(formData.get("note") || "").trim(),
        attachmentKind: String(formData.get("attachment_kind") || "").trim(),
        sourceType: "vendor_submitted",
        sourceLabel: String(formData.get("source_label") || "").trim(),
        sourceDetail: String(formData.get("source_detail") || "").trim(),
        utmSource: String(formData.get("utm_source") || "").trim(),
        utmMedium: String(formData.get("utm_medium") || "").trim(),
        utmCampaign: String(formData.get("utm_campaign") || "").trim(),
        utmTerm: String(formData.get("utm_term") || "").trim(),
        utmContent: String(formData.get("utm_content") || "").trim(),
        landingPage: String(formData.get("landing_page") || "").trim(),
        referrer: String(formData.get("referrer") || "").trim(),
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

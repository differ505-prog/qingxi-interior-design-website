type SummaryField = {
  label: string;
  value: string;
};

function getSingleValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function compactFields(fields: SummaryField[]) {
  return fields.filter((field) => field.value);
}

function translateIssueType(value: string) {
  const labels: Record<string, string> = {
    pricing: "估價數字不合理",
    breakdown: "工程拆解怪怪的",
    interaction: "勾選或互動有問題",
    display: "畫面顯示異常",
    other: "其他",
  };

  return labels[value] || value;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function buildEstimatorFeedbackSummary(
  formData: FormData,
  options?: { userAgent?: string; submittedAt?: string },
) {
  const contactMethod = getSingleValue(formData, "contact_method");
  const subject = "青曦空間設計｜裝修估價器問題回報";
  const replyTo = isEmail(contactMethod) ? contactMethod : "";
  const fields = compactFields([
    {
      label: "問題類型",
      value: translateIssueType(getSingleValue(formData, "issue_type")),
    },
    {
      label: "問題描述",
      value: getSingleValue(formData, "issue_description"),
    },
    {
      label: "聯絡方式",
      value: contactMethod,
    },
    {
      label: "頁面路徑",
      value: getSingleValue(formData, "page_path"),
    },
    {
      label: "進站頁面",
      value: getSingleValue(formData, "landing_page"),
    },
    {
      label: "來源頁面",
      value: getSingleValue(formData, "page_referrer"),
    },
    {
      label: "估價摘要",
      value: getSingleValue(formData, "estimator_summary"),
    },
    {
      label: "工程拆解",
      value: getSingleValue(formData, "estimator_breakdown"),
    },
    {
      label: "完整快照",
      value: getSingleValue(formData, "estimator_snapshot"),
    },
    {
      label: "送出時間",
      value: options?.submittedAt || "",
    },
    {
      label: "使用者代理",
      value: options?.userAgent || "",
    },
  ]);

  return { subject, replyTo, fields };
}

const FIELD_VALUE_LABELS: Record<string, Record<string, string>> = {
  "contact-preference": {
    phone: "電話",
    line: "LINE",
    email: "Email",
    either: "都可以",
  },
  presale: {
    yes: "是",
    no: "否",
  },
  "customer-change": {
    yes: "需要客變",
    no: "不需要客變",
  },
  "house-status": {
    raw: "毛胚屋",
    renovated: "一般屋況 / 非毛胚屋",
    other: "其他",
  },
  budget: {
    "under-50": "50萬以下",
    "50-100": "50-100萬",
    "100-200": "100-200萬",
    "200-300": "200-300萬",
    "300-500": "300-500萬",
    "500-800": "500-800萬",
    "over-800": "800萬以上",
    other: "其他",
  },
  "max-budget": {
    "under-50": "50萬以下",
    "50-100": "50-100萬",
    "100-200": "100-200萬",
    "200-300": "200-300萬",
    "300-500": "300-500萬",
    "500-800": "500-800萬",
    "over-800": "800萬以上",
    other: "其他",
  },
  "smart-home-planning": {
    yes: "需要",
    maybe: "想了解",
    no: "暫時不需要",
  },
  "smart-home-features": {
    lighting: "燈光控制",
    curtain: "電動窗簾",
    "air-conditioning": "空調整合",
    "door-lock": "智慧門鎖",
    sensor: "感測器自動化",
    security: "監控與安防",
    network: "網路與弱電配置",
    audio: "影音情境整合",
  },
  "smart-home-ecosystem": {
    "apple-home": "Apple Home",
    "google-home": "Google Home",
    alexa: "Alexa",
    "home-assistant": "Home Assistant",
    "not-sure": "還不確定",
  },
  "existing-smart-devices": {
    yes: "有既有設備",
    no: "沒有既有設備",
  },
  "household-structure": {
    single: "單身居住",
    couple: "伴侶 / 夫妻",
    infant: "嬰幼兒",
    child: "學齡兒童",
    teen: "青少年",
    elder: "長輩同住",
    caregiver: "照護者 / 幫手",
    other: "其他",
  },
  "pet-plans": {
    current: "目前有寵物",
    planned: "近期會養",
    none: "目前沒有",
  },
  "pet-type": {
    dog: "狗",
    cat: "貓",
    bird: "鳥",
    "small-animal": "兔 / 鼠 / 其他小型寵物",
    aquarium: "魚缸 / 水族",
    other: "其他",
  },
  holidays: {
    home: "在家休息",
    outdoor: "戶外活動",
    shopping: "購物",
    travel: "旅遊",
    other: "其他",
  },
  source: {
    facebook: "Facebook",
    instagram: "Instagram",
    google: "Google 搜尋",
    friend: "親友介紹",
    other: "其他",
  },
  "wall-issue": {
    yes: "有漏水 / 壁癌",
    no: "無漏水 / 壁癌",
  },
  "bathroom-renovation": {
    yes: "需要",
    no: "不需要",
    notes: "另有備註",
  },
  "kitchen-renovation": {
    yes: "需要",
    no: "不需要",
    notes: "另有備註",
  },
  "cad-file": {
    yes: "已有 CAD",
    no: "尚無 CAD",
    notes: "另有備註",
  },
  spaces: {
    "living-room": "客廳",
    "dining-room": "餐廳",
    bathroom: "浴廁",
    kitchen: "廚房",
    "master-bedroom": "主臥房",
    "children-room": "小孩房",
    "guest-room": "客房",
    "elderly-room": "孝親房",
    "study-room": "書房",
    "walk-in-closet": "更衣室",
    storage: "儲藏室",
    "tatami-room": "和室",
  },
};

const SPACE_DETAIL_LABELS: Record<string, string> = {
  "tv-wall": "造型電視牆",
  "storage-cabinet": "收納櫃",
  "display-cabinet": "展示櫃",
  "l-sofa": "L 型沙發",
  "straight-sofa": "一字型沙發",
  "appliance-cabinet": "電器櫃",
  "dining-cabinet": "餐櫃",
  island: "中島",
  "dining-table": "餐桌",
  "master-mirror": "主衛浴鏡櫃",
  "guest-mirror": "客衛浴鏡櫃",
  "master-bathtub": "主衛浴浴缸",
  "guest-bathtub": "客衛浴浴缸",
  "refrigerator-cabinet": "冰箱櫃",
  "bar-counter": "吧台",
  "bed-size": "床尺寸需求",
  "makeup-table": "化妝桌",
  desk: "書桌",
  "walk-in-closet": "更衣室",
  tv: "電視",
  "blackout-curtain": "窗簾需全遮光",
  "lift-table": "自動升降桌",
  "tea-table": "活動茶桌",
  other: "其他",
};

const SPACE_LABELS = FIELD_VALUE_LABELS.spaces;

type SummaryField = {
  label: string;
  value: string;
};

function getSingleValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getMultiValues(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);
}

function translateValue(field: string, value: string) {
  return FIELD_VALUE_LABELS[field]?.[value] || value;
}

function formatValueList(field: string, values: string[]) {
  return values.map((value) => translateValue(field, value)).join("、");
}

function formatLabeledLine(label: string, value: string) {
  return value ? `${label}：${value}` : "";
}

function compactLines(lines: Array<string | null | undefined>) {
  return lines.filter(Boolean).join("\n");
}

function formatContactMethod(formData: FormData) {
  const phone = getSingleValue(formData, "phone");
  const lineId = getSingleValue(formData, "line-id");
  const email = getSingleValue(formData, "email");
  const preference = translateValue(
    "contact-preference",
    getSingleValue(formData, "contact-preference"),
  );

  return compactLines([
    formatLabeledLine("電話", phone),
    formatLabeledLine("LINE ID", lineId),
    formatLabeledLine("Email", email),
    formatLabeledLine("偏好聯繫方式", preference),
  ]);
}

function formatProjectSummary(formData: FormData) {
  const budget = translateValue("budget", getSingleValue(formData, "budget"));
  const budgetOther = getSingleValue(formData, "budget-other");
  const maxBudget = translateValue("max-budget", getSingleValue(formData, "max-budget"));
  const maxBudgetOther = getSingleValue(formData, "max-budget-other");
  const presale = translateValue("presale", getSingleValue(formData, "presale"));
  const customerChange = translateValue(
    "customer-change",
    getSingleValue(formData, "customer-change"),
  );
  const houseStatus = translateValue(
    "house-status",
    getSingleValue(formData, "house-status"),
  );
  const wallIssue = translateValue("wall-issue", getSingleValue(formData, "wall-issue"));

  return compactLines([
    formatLabeledLine("裝修地址", getSingleValue(formData, "address")),
    formatLabeledLine("社區案名", getSingleValue(formData, "community")),
    formatLabeledLine("是否為預售屋", presale),
    formatLabeledLine("是否需要客變", customerChange),
    formatLabeledLine("客變到期日", getSingleValue(formData, "change-deadline")),
    formatLabeledLine("交屋日期", getSingleValue(formData, "handover-date")),
    formatLabeledLine("室內總坪數", getSingleValue(formData, "interior-area")),
    formatLabeledLine("建物坪數", getSingleValue(formData, "building-area")),
    formatLabeledLine("權狀坪數", getSingleValue(formData, "deed-area")),
    formatLabeledLine("屋齡", getSingleValue(formData, "house-age")),
    formatLabeledLine("室內屋高", getSingleValue(formData, "house-height")),
    formatLabeledLine("是否為毛胚屋", houseStatus),
    formatLabeledLine("外牆漏水 / 壁癌", wallIssue),
    formatLabeledLine("期望裝修預算", budgetOther || budget),
    formatLabeledLine("最高可接受預算", maxBudgetOther || maxBudget),
    formatLabeledLine("預算備註", getSingleValue(formData, "budget-notes")),
    formatLabeledLine("期望完工時間", getSingleValue(formData, "expected-completion")),
    formatLabeledLine("最晚可接受完工時間", getSingleValue(formData, "latest-completion")),
  ]);
}

function formatSpaceSummary(formData: FormData) {
  const spaces = getMultiValues(formData, "spaces");

  if (spaces.length === 0) return "";

  const lines = spaces.map((space) => {
    const label = SPACE_LABELS[space] || space;
    const count = getSingleValue(formData, `${space}-count`);
    const details = getMultiValues(formData, `${space}-details`)
      .map((value) => SPACE_DETAIL_LABELS[value] || value)
      .filter((value) => value !== "其他");
    const diningPeople = getSingleValue(formData, `${space}-dining-table-people`);
    const otherDetails = getSingleValue(formData, `${space}-other-details`);

    const suffixParts = [
      count ? `${count}${count === "4+" ? " 間" : " 間"}` : "",
      details.length ? details.join("、") : "",
      diningPeople ? `餐桌 ${diningPeople} 人` : "",
      otherDetails ? `其他：${otherDetails}` : "",
    ].filter(Boolean);

    return suffixParts.length ? `- ${label}｜${suffixParts.join("｜")}` : `- ${label}`;
  });

  return lines.join("\n");
}

function formatNeedSummary(formData: FormData) {
  const bathroomRenovation = translateValue(
    "bathroom-renovation",
    getSingleValue(formData, "bathroom-renovation"),
  );
  const kitchenRenovation = translateValue(
    "kitchen-renovation",
    getSingleValue(formData, "kitchen-renovation"),
  );
  const cadFile = translateValue("cad-file", getSingleValue(formData, "cad-file"));

  return compactLines([
    formatLabeledLine("一句話需求", getSingleValue(formData, "other-notes-basic")),
    formatLabeledLine("最優先想解決的事", getSingleValue(formData, "priority-needs")),
    formatLabeledLine("是否需要衛浴裝修", bathroomRenovation),
    formatLabeledLine(
      "衛浴裝修備註",
      getSingleValue(formData, "bathroom-renovation-notes"),
    ),
    formatLabeledLine("是否需要廚房裝修", kitchenRenovation),
    formatLabeledLine(
      "廚房裝修備註",
      getSingleValue(formData, "kitchen-renovation-notes"),
    ),
    formatLabeledLine("是否已有 CAD 檔", cadFile),
    formatLabeledLine("CAD 備註", getSingleValue(formData, "cad-file-notes")),
    formatLabeledLine("其他補充", getSingleValue(formData, "completion-notes")),
  ]);
}

function formatFamilySummary(formData: FormData) {
  const household = formatValueList(
    "household-structure",
    getMultiValues(formData, "household-structure"),
  );
  const petPlans = translateValue("pet-plans", getSingleValue(formData, "pet-plans"));
  const petTypes = formatValueList("pet-type", getMultiValues(formData, "pet-type"));
  const holidays = formatValueList("holidays", getMultiValues(formData, "holidays"));

  return compactLines([
    formatLabeledLine("年齡", getSingleValue(formData, "age")),
    formatLabeledLine("職業", getSingleValue(formData, "occupation")),
    formatLabeledLine("居住人數", getSingleValue(formData, "residents")),
    formatLabeledLine("家庭成員組成", household),
    formatLabeledLine(
      "家庭成員其他補充",
      getSingleValue(formData, "household-structure-other"),
    ),
    formatLabeledLine(
      "家庭生活補充",
      getSingleValue(formData, "family-lifestyle-notes"),
    ),
    formatLabeledLine("寵物規劃", petPlans),
    formatLabeledLine("寵物類型", petTypes),
    formatLabeledLine("寵物其他補充", getSingleValue(formData, "pet-type-other")),
    formatLabeledLine("寵物需求", getSingleValue(formData, "pet-notes")),
    formatLabeledLine("假日習慣", holidays),
    formatLabeledLine("假日其他補充", getSingleValue(formData, "holidays-other")),
  ]);
}

function formatSmartHomeSummary(formData: FormData) {
  const planning = translateValue(
    "smart-home-planning",
    getSingleValue(formData, "smart-home-planning"),
  );
  const features = formatValueList(
    "smart-home-features",
    getMultiValues(formData, "smart-home-features"),
  );
  const ecosystem = formatValueList(
    "smart-home-ecosystem",
    getMultiValues(formData, "smart-home-ecosystem"),
  );
  const existingDevices = translateValue(
    "existing-smart-devices",
    getSingleValue(formData, "existing-smart-devices"),
  );

  return compactLines([
    formatLabeledLine("是否需要智慧家庭規劃", planning),
    formatLabeledLine("希望整合項目", features),
    formatLabeledLine("希望支援生態系", ecosystem),
    formatLabeledLine("既有設備狀況", existingDevices),
    formatLabeledLine(
      "既有設備補充",
      getSingleValue(formData, "existing-smart-devices-notes"),
    ),
    formatLabeledLine("想實現的生活情境", getSingleValue(formData, "smart-home-scenes")),
    formatLabeledLine("智慧家庭補充", getSingleValue(formData, "smart-home-notes")),
  ]);
}

function formatAcquisitionSummary(formData: FormData) {
  const source = formatValueList("source", getMultiValues(formData, "source"));

  return compactLines([
    formatLabeledLine("如何得知青曦", source),
    formatLabeledLine("來源其他補充", getSingleValue(formData, "source-other")),
    formatLabeledLine("UTM Source", getSingleValue(formData, "utm_source")),
    formatLabeledLine("UTM Medium", getSingleValue(formData, "utm_medium")),
    formatLabeledLine("UTM Campaign", getSingleValue(formData, "utm_campaign")),
    formatLabeledLine("UTM Term", getSingleValue(formData, "utm_term")),
    formatLabeledLine("UTM Content", getSingleValue(formData, "utm_content")),
    formatLabeledLine("Landing Page", getSingleValue(formData, "landing_page")),
    formatLabeledLine("Referrer", getSingleValue(formData, "page_referrer")),
  ]);
}

function formatEstimatorSummary(formData: FormData) {
  return compactLines([
    formatLabeledLine("估價摘要", getSingleValue(formData, "estimator-summary")),
    formatLabeledLine("預估總價", getSingleValue(formData, "estimator-total-range")),
    formatLabeledLine("每坪抓法", getSingleValue(formData, "estimator-per-ping-range")),
    formatLabeledLine("專案類型", getSingleValue(formData, "estimator-project-type")),
    formatLabeledLine("品質等級", getSingleValue(formData, "estimator-quality-level")),
    formatLabeledLine("屋況條件", getSingleValue(formData, "estimator-house-condition")),
    formatLabeledLine("估價工項", getSingleValue(formData, "estimator-selected-items")),
  ]);
}

function buildSubject(formData: FormData) {
  const name = getSingleValue(formData, "name") || "未填姓名";
  const address = getSingleValue(formData, "address");
  return address
    ? `青曦空間設計｜設計需求表｜${name}｜${address}`
    : `青曦空間設計｜設計需求表｜${name}`;
}

function compactFields(fields: SummaryField[]) {
  return fields.filter((field) => field.value);
}

export function buildRequirementSubmissionSummary(formData: FormData) {
  const email = getSingleValue(formData, "email");

  return {
    subject: buildSubject(formData),
    replyTo: email,
    fields: compactFields([
      { label: "表單類型", value: "設計需求表" },
      { label: "姓名", value: getSingleValue(formData, "name") },
      { label: "聯絡方式", value: formatContactMethod(formData) },
      { label: "案件資訊", value: formatProjectSummary(formData) },
      { label: "核心需求", value: formatNeedSummary(formData) },
      { label: "空間規劃", value: formatSpaceSummary(formData) },
      { label: "智慧家庭需求", value: formatSmartHomeSummary(formData) },
      { label: "家庭與生活", value: formatFamilySummary(formData) },
      { label: "估價器帶入資訊", value: formatEstimatorSummary(formData) },
      { label: "流量與來源", value: formatAcquisitionSummary(formData) },
    ]),
  };
}

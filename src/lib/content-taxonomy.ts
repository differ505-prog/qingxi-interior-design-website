export interface BookshelfTrack {
  title: string;
  focus: string;
  chapters: string;
}

export const bookshelfTracks: BookshelfTrack[] = [
  {
    title: "老屋翻新系",
    focus: "老屋翻修、屋況判讀、預算拆解、基礎工程、空間重整與完工避雷",
    chapters: "現況判讀 / 預算拆解 / 基礎工程 / 空間重整 / 完工避雷",
  },
  {
    title: "預售屋客變系",
    focus: "客變、交屋前規劃、配置預留、材質設備、收納與機能預留",
    chapters: "客變判斷 / 配置預留 / 材質設備 / 生活動線 / 交屋銜接",
  },
  {
    title: "驗屋交屋系",
    focus: "驗屋、點交、缺失判讀、交屋後先後順序與修正重點",
    chapters: "驗屋判讀 / 缺失排序 / 點交策略 / 交屋後進場",
  },
  {
    title: "格局動線系",
    focus: "小坪數規劃、收納、動線、尺度、家具配置與生活邏輯",
    chapters: "空間尺度 / 動線配置 / 收納系統 / 家具配置 / 使用情境",
  },
  {
    title: "水電照明系",
    focus: "插座、開關、迴路、照明、設備整合、窗簾與智能控制",
    chapters: "插座開關 / 迴路安全 / 照明設計 / 設備整合 / 智能控制",
  },
];

export const siteCategoryOptions = [
  "老屋翻新",
  "預售屋客變",
  "驗屋交屋",
  "格局動線",
  "水電照明",
  "裝修預算",
  "收納機能",
  "材質設備",
  "智能家居",
] as const;

const trackAliasGroups: Array<[string, string[]]> = [
  ["老屋翻新系", ["老屋翻新系", "老屋翻新", "老屋翻修", "中古屋翻新", "中古屋翻修", "局部翻新"]],
  ["預售屋客變系", ["預售屋客變系", "預售屋客變", "預售屋", "客變", "客變規劃"]],
  ["驗屋交屋系", ["驗屋交屋系", "驗屋交屋", "驗屋", "交屋", "點交"]],
  ["格局動線系", ["格局動線系", "格局動線", "格局", "動線", "空間規劃", "空間配置"]],
  ["水電照明系", ["水電照明系", "水電照明", "水電", "照明", "插座", "開關", "迴路"]],
];

const chapterKeywordMap: Record<string, Record<string, string[]>> = {
  "老屋翻新系": {
    "現況判讀": ["屋況", "老屋", "中古屋", "翻新前", "現況", "評估"],
    "預算拆解": ["預算", "費用", "報價", "單價", "怎麼抓", "追加", "取捨"],
    "基礎工程": ["天花板", "輕鋼架", "地板", "磁磚", "水電", "泥作", "拆除", "工法"],
    "空間重整": ["客廳", "格局", "動線", "家具", "收納", "配置", "空間", "改造"],
    "完工避雷": ["驗收", "完工", "缺失", "避雷", "糾紛", "保固"],
  },
  "預售屋客變系": {
    "客變判斷": ["客變", "預售屋", "客變要不要", "客變值得"],
    "配置預留": ["預留", "插座", "迴路", "燈位", "弱電", "開關"],
    "材質設備": ["材質", "建材", "面材", "板材", "磁磚", "地板", "五金", "廚具", "衛浴"],
    "生活動線": ["動線", "收納", "生活習慣", "空間安排"],
    "交屋銜接": ["交屋", "進場", "交屋後", "客變後"],
  },
  "驗屋交屋系": {
    "驗屋判讀": ["驗屋", "檢查", "缺失", "裂縫", "漏水"],
    "缺失排序": ["優先", "排序", "先修", "先處理"],
    "點交策略": ["點交", "建商", "回報", "協調"],
    "交屋後進場": ["交屋後", "進場", "裝修銜接"],
  },
  "格局動線系": {
    "空間尺度": ["尺寸", "尺度", "坪數", "寬度", "深度"],
    "動線配置": ["動線", "走道", "轉身", "配置"],
    "收納系統": ["收納", "櫃體", "櫥櫃", "儲物"],
    "家具配置": ["家具", "沙發", "餐桌", "床架", "書桌", "餐椅"],
    "使用情境": ["小孩", "長輩", "寵物", "生活習慣", "使用情境"],
  },
  "水電照明系": {
    "插座開關": ["插座", "開關", "面板"],
    "迴路安全": ["迴路", "電箱", "安全", "負載"],
    "照明設計": ["照明", "燈光", "色溫", "間接照明"],
    "設備整合": ["弱電", "網路", "監控", "冷氣", "新風", "設備整合"],
    "智能控制": ["智能", "窗簾", "感應", "自動化", "語音", "情境"],
  },
};

export function getTrackConfig(trackTitle = "") {
  return bookshelfTracks.find((track) => track.title === trackTitle) || null;
}

export function getTrackChapters(trackTitle = "") {
  const track = getTrackConfig(trackTitle);
  if (!track?.chapters) return [];
  return track.chapters.split("/").map((chapter) => chapter.trim()).filter(Boolean);
}

export function normalizeTrack(value = "") {
  const text = value.trim();
  if (!text) return "";

  for (const [canonical, aliases] of trackAliasGroups) {
    if (aliases.some((alias) => text.includes(alias))) return canonical;
  }

  return bookshelfTracks.find((track) => track.title === text)?.title || "";
}

export function normalizeSiteCategory(value = "") {
  const text = value.trim();
  if (!text) return "";

  const aliasGroups: Array<[string, string[]]> = [
    ["老屋翻新", ["老屋翻新", "老屋翻修", "中古屋翻新", "中古屋翻修", "老屋", "翻新"]],
    ["預售屋客變", ["預售屋客變", "預售屋", "客變", "客變規劃"]],
    ["驗屋交屋", ["驗屋交屋", "驗屋", "交屋", "點交"]],
    ["格局動線", ["格局動線", "格局", "動線", "空間配置", "空間規劃"]],
    ["水電照明", ["水電照明", "水電", "照明", "插座", "開關", "迴路"]],
    ["裝修預算", ["裝修預算", "預算規劃", "裝潢預算", "裝修費用", "費用拆解", "報價"]],
    ["收納機能", ["收納機能", "收納", "機能", "櫃體", "儲物"]],
    ["材質設備", ["材質設備", "材質", "設備", "建材", "五金", "材料"]],
    ["智能家居", ["智能家居", "智能", "智慧家庭", "智慧家居", "自動化"]],
  ];

  for (const [canonical, aliases] of aliasGroups) {
    if (aliases.some((alias) => text.includes(alias))) return canonical;
  }

  return siteCategoryOptions.find((option) => option === text) || "";
}

export function inferTrackFromText(...values: string[]) {
  const text = values.join("\n").replace(/\s+/g, "");
  if (!text) return "";

  let bestTrack = "";
  let bestScore = 0;

  trackAliasGroups.forEach(([canonical, aliases]) => {
    const score = aliases.reduce((sum, alias) => sum + (text.includes(alias.replace(/\s+/g, "")) ? alias.length : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestTrack = canonical;
    }
  });

  return bestTrack;
}

export function inferChapterFromTrack(trackTitle = "", ...values: string[]) {
  const text = values.join("\n").replace(/\s+/g, "");
  if (!trackTitle || !text) return "";

  const chapters = chapterKeywordMap[trackTitle] || {};
  let bestChapter = "";
  let bestScore = 0;

  Object.entries(chapters).forEach(([chapter, keywords]) => {
    const score = keywords.reduce((sum, keyword) => sum + (text.includes(keyword.replace(/\s+/g, "")) ? keyword.length : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestChapter = chapter;
    }
  });

  return bestChapter;
}

export function normalizeTagList(value: unknown) {
  const values = Array.isArray(value)
    ? value
    : String(value ?? "")
      .split(/[,\n/#、]/)
      .map((item) => item.trim())
      .filter(Boolean);

  return Array.from(new Set(values.map((item) => String(item).trim()).filter(Boolean)));
}

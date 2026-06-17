export interface BookshelfTrack {
  title: string;
  focus: string;
  chapters: string;
}

export interface BookshelfSubchapterPlan {
  title: string;
  keywords: string[];
}

export interface BookshelfChapterPlan {
  title: string;
  keywords: string[];
  subchapters: BookshelfSubchapterPlan[];
}

export interface BookshelfTrackPlan {
  title: string;
  focus: string;
  chapters: BookshelfChapterPlan[];
}

export interface PublishingCatalogPost {
  title: string;
  track?: string;
  chapter?: string;
  siteCategory?: string;
  category?: string;
  summary?: string;
  tags?: string[];
  date?: string;
}

export interface BookshelfEntry {
  title: string;
  trackTitle: string;
  chapter: string;
  subchapter: string;
  category: string;
  date: string;
}

export interface PublishingTrackCoverage {
  title: string;
  articleCount: number;
  completedChapters: number;
  totalChapters: number;
  completedSubchapters: number;
  totalSubchapters: number;
  coverageRate: number;
}

export interface PublishingChapterGap {
  chapter: string;
  articleCount: number;
  missingSubchapters: string[];
  remainingToBaseline: number;
  subchapters: PublishingSubchapterStatus[];
  recommendedTopic: NextTopicRecommendation | null;
}

export interface PublishingTrackDashboard extends PublishingTrackCoverage {
  missingChapterTitles: string[];
  remainingToBaseline: number;
  readyToPublish: boolean;
  chapterGaps: PublishingChapterGap[];
}

export interface PublishingSubchapterStatus {
  title: string;
  articleCount: number;
  coveredByArticle: boolean;
}

export interface NextTopicRecommendation {
  focusTrackTitle: string;
  trackTitle: string;
  chapter: string;
  subchapter: string;
  category: string;
  articleCountInTrack: number;
  articleCountInChapter: number;
  articleCountInSubchapter: number;
  coverageBefore: number;
  coverageAfter: number;
  primaryTitle: string;
  backupTitles: string[];
  reason: string;
  flashPrompt: string;
}

export const publishingFocusTrackTitle = "老屋翻新系";

export const bookshelfTrackPlans: BookshelfTrackPlan[] = [
  {
    title: "老屋翻新系",
    focus: "老屋翻修、屋況判讀、預算拆解、基礎工程、空間重整與完工避雷",
    chapters: [
      {
        title: "現況判讀",
        keywords: ["屋況", "老屋", "中古屋", "翻新前", "現況", "評估"],
        subchapters: [
          { title: "屋況盤點", keywords: ["屋況", "現況", "中古屋", "老屋", "盤點", "評估"] },
          { title: "翻新範圍", keywords: ["局部翻新", "翻新範圍", "要不要拆", "整修範圍", "改造範圍"] },
          { title: "翻新起手式", keywords: ["先做什麼", "第一步", "從哪開始", "翻新前", "準備階段"] },
        ],
      },
      {
        title: "預算拆解",
        keywords: ["預算", "費用", "報價", "單價", "怎麼抓", "追加", "取捨"],
        subchapters: [
          { title: "預算分級", keywords: ["預算", "費用", "多少錢", "怎麼抓", "抓多少"] },
          { title: "報價拆讀", keywords: ["報價", "單價", "估價", "報價單", "費用拆解"] },
          { title: "追加風險", keywords: ["追加", "超支", "爆預算", "變更多", "加價"] },
        ],
      },
      {
        title: "基礎工程",
        keywords: ["天花板", "輕鋼架", "地板", "磁磚", "水電", "泥作", "拆除", "工法"],
        subchapters: [
          { title: "拆除泥作", keywords: ["拆除", "泥作", "砌牆", "打底"] },
          { title: "水電更新", keywords: ["水電", "配線", "配管", "電路", "管線"] },
          { title: "防水地坪", keywords: ["防水", "地坪", "找平", "浴室", "漏水"] },
        ],
      },
      {
        title: "空間重整",
        keywords: ["客廳", "格局", "動線", "家具", "收納", "配置", "空間", "改造"],
        subchapters: [
          { title: "格局調整", keywords: ["格局", "隔間", "空間重整", "動線重整"] },
          { title: "收納補強", keywords: ["收納", "櫃體", "儲物", "機能"] },
          { title: "家具配置", keywords: ["家具", "沙發", "餐桌", "床架", "配置"] },
        ],
      },
      {
        title: "完工避雷",
        keywords: ["驗收", "完工", "缺失", "避雷", "糾紛", "保固"],
        subchapters: [
          { title: "驗收重點", keywords: ["驗收", "完工", "缺失"] },
          { title: "保固界線", keywords: ["保固", "責任", "保修"] },
          { title: "糾紛預防", keywords: ["糾紛", "避雷", "爭議", "扯皮"] },
        ],
      },
    ],
  },
  {
    title: "預售屋客變系",
    focus: "客變、交屋前規劃、配置預留、材質設備、收納與機能預留",
    chapters: [
      {
        title: "客變判斷",
        keywords: ["客變", "預售屋", "客變要不要", "客變值得"],
        subchapters: [
          { title: "客變時機", keywords: ["客變時間", "客變時機", "什麼時候"] },
          { title: "值不值得改", keywords: ["要不要客變", "值得", "必要", "划算"] },
          { title: "先決條件", keywords: ["先決定", "先確認", "客變前", "前置"] },
        ],
      },
      {
        title: "配置預留",
        keywords: ["預留", "插座", "迴路", "燈位", "弱電", "開關"],
        subchapters: [
          { title: "插座迴路", keywords: ["插座", "迴路", "回路", "開關"] },
          { title: "燈位弱電", keywords: ["燈位", "弱電", "網路", "監控"] },
          { title: "設備預留", keywords: ["預留", "設備", "冷氣", "新風", "管線"] },
        ],
      },
      {
        title: "材質設備",
        keywords: ["材質", "建材", "面材", "板材", "磁磚", "地板", "五金", "廚具", "衛浴"],
        subchapters: [
          { title: "廚具衛浴", keywords: ["廚具", "衛浴", "水龍頭", "馬桶"] },
          { title: "地板磁磚", keywords: ["地板", "磁磚", "石材"] },
          { title: "五金面材", keywords: ["五金", "面材", "板材", "建材"] },
        ],
      },
      {
        title: "生活動線",
        keywords: ["動線", "收納", "生活習慣", "空間安排"],
        subchapters: [
          { title: "收納配置", keywords: ["收納", "櫃體", "機能"] },
          { title: "家務動線", keywords: ["家務", "廚房", "洗衣", "清潔"] },
          { title: "起居情境", keywords: ["生活習慣", "起居", "使用情境"] },
        ],
      },
      {
        title: "交屋銜接",
        keywords: ["交屋", "進場", "交屋後", "客變後"],
        subchapters: [
          { title: "交屋清單", keywords: ["交屋", "點交", "清單"] },
          { title: "進場排序", keywords: ["進場", "排序", "先後"] },
          { title: "客變銜接裝修", keywords: ["客變後", "銜接", "裝修"] },
        ],
      },
    ],
  },
  {
    title: "驗屋交屋系",
    focus: "驗屋、點交、缺失判讀、交屋後先後順序與修正重點",
    chapters: [
      {
        title: "驗屋判讀",
        keywords: ["驗屋", "檢查", "缺失", "裂縫", "漏水"],
        subchapters: [
          { title: "結構防水", keywords: ["裂縫", "防水", "漏水", "壁癌"] },
          { title: "水電機電", keywords: ["水電", "插座", "開關", "設備"] },
          { title: "尺寸平整", keywords: ["尺寸", "平整", "水平", "垂直"] },
        ],
      },
      {
        title: "缺失排序",
        keywords: ["優先", "排序", "先修", "先處理"],
        subchapters: [
          { title: "必修先修", keywords: ["優先", "先修", "先處理"] },
          { title: "可觀察項", keywords: ["觀察", "後續看", "先記錄"] },
          { title: "後續追蹤", keywords: ["追蹤", "複驗", "回報"] },
        ],
      },
      {
        title: "點交策略",
        keywords: ["點交", "建商", "回報", "協調"],
        subchapters: [
          { title: "建商回報", keywords: ["建商", "回報", "提報"] },
          { title: "紀錄佐證", keywords: ["照片", "紀錄", "佐證", "證據"] },
          { title: "協調節奏", keywords: ["協調", "溝通", "節奏"] },
        ],
      },
      {
        title: "交屋後進場",
        keywords: ["交屋後", "進場", "裝修銜接"],
        subchapters: [
          { title: "裝修前準備", keywords: ["準備", "交屋後", "進場前"] },
          { title: "保護措施", keywords: ["保護", "養護", "包覆"] },
          { title: "進場銜接", keywords: ["進場", "銜接", "施工順序"] },
        ],
      },
    ],
  },
  {
    title: "格局動線系",
    focus: "小坪數規劃、收納、動線、尺度、家具配置與生活邏輯",
    chapters: [
      {
        title: "空間尺度",
        keywords: ["尺寸", "尺度", "坪數", "寬度", "深度"],
        subchapters: [
          { title: "走道寬度", keywords: ["走道", "寬度", "通道"] },
          { title: "家具距離", keywords: ["家具距離", "間距", "尺寸"] },
          { title: "轉身餘裕", keywords: ["轉身", "餘裕", "活動空間"] },
        ],
      },
      {
        title: "動線配置",
        keywords: ["動線", "走道", "轉身", "配置"],
        subchapters: [
          { title: "客餐廳動線", keywords: ["客廳", "餐廳", "客餐廳"] },
          { title: "廚房家務線", keywords: ["廚房", "家務", "備餐"] },
          { title: "臥室起居線", keywords: ["臥室", "起居", "睡眠"] },
        ],
      },
      {
        title: "收納系統",
        keywords: ["收納", "櫃體", "櫥櫃", "儲物"],
        subchapters: [
          { title: "玄關收納", keywords: ["玄關", "鞋櫃", "落塵"] },
          { title: "餐廚收納", keywords: ["餐廚", "餐櫃", "備品"] },
          { title: "臥室收納", keywords: ["臥室", "衣櫃", "更衣"] },
        ],
      },
      {
        title: "家具配置",
        keywords: ["家具", "沙發", "餐桌", "床架", "書桌", "餐椅"],
        subchapters: [
          { title: "客廳家具", keywords: ["沙發", "茶几", "電視牆"] },
          { title: "餐桌尺寸", keywords: ["餐桌", "餐椅", "用餐"] },
          { title: "臥室配置", keywords: ["床架", "床邊", "床頭"] },
        ],
      },
      {
        title: "使用情境",
        keywords: ["小孩", "長輩", "寵物", "生活習慣", "使用情境"],
        subchapters: [
          { title: "育兒家庭", keywords: ["小孩", "育兒", "玩具"] },
          { title: "長輩同住", keywords: ["長輩", "無障礙", "高齡"] },
          { title: "寵物共居", keywords: ["寵物", "貓", "狗"] },
        ],
      },
    ],
  },
  {
    title: "水電照明系",
    focus: "插座、開關、迴路、照明、設備整合、窗簾與智能控制",
    chapters: [
      {
        title: "插座開關",
        keywords: ["插座", "開關", "面板"],
        subchapters: [
          { title: "客廳插座", keywords: ["客廳", "插座", "電視牆"] },
          { title: "臥室插座", keywords: ["臥室", "床頭", "插座"] },
          { title: "廚衛開關", keywords: ["廚房", "浴室", "開關"] },
        ],
      },
      {
        title: "迴路安全",
        keywords: ["迴路", "電箱", "安全", "負載"],
        subchapters: [
          { title: "迴路分配", keywords: ["迴路", "分配", "回路"] },
          { title: "高耗電設備", keywords: ["高耗電", "冷氣", "烤箱", "IH"] },
          { title: "漏電保護", keywords: ["漏電", "斷路器", "保護"] },
        ],
      },
      {
        title: "照明設計",
        keywords: ["照明", "燈光", "色溫", "間接照明"],
        subchapters: [
          { title: "客廳照明", keywords: ["客廳", "照明", "燈光"] },
          { title: "臥室照明", keywords: ["臥室", "夜燈", "色溫"] },
          { title: "餐廚照明", keywords: ["餐廳", "廚房", "吊燈", "工作燈"] },
        ],
      },
      {
        title: "設備整合",
        keywords: ["弱電", "網路", "監控", "冷氣", "新風", "設備整合"],
        subchapters: [
          { title: "弱電網路", keywords: ["弱電", "網路", "AP"] },
          { title: "冷氣新風", keywords: ["冷氣", "新風", "全熱"] },
          { title: "監控門禁", keywords: ["監控", "門禁", "對講"] },
        ],
      },
      {
        title: "智能控制",
        keywords: ["智能", "窗簾", "感應", "自動化", "語音", "情境"],
        subchapters: [
          { title: "智能窗簾", keywords: ["窗簾", "自動", "情境"] },
          { title: "感應情境", keywords: ["感應", "人體感應", "情境"] },
          { title: "語音整合", keywords: ["語音", "Home Assistant", "整合"] },
        ],
      },
    ],
  },
];

export const bookshelfTracks: BookshelfTrack[] = bookshelfTrackPlans.map((track) => ({
  title: track.title,
  focus: track.focus,
  chapters: track.chapters.map((chapter) => chapter.title).join(" / "),
}));

export const bookshelfSubchapterPools = Object.fromEntries(
  bookshelfTrackPlans.map((track) => [
    track.title,
    Object.fromEntries(
      track.chapters.map((chapter) => [
        chapter.title,
        Object.fromEntries(chapter.subchapters.map((subchapter) => [subchapter.title, subchapter.keywords])),
      ]),
    ),
  ]),
) as Record<string, Record<string, Record<string, string[]>>>;

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

function getInferenceKeywordScore(text: string, keywords: string[]) {
  return keywords.reduce((score, keyword) => score + (text.includes(keyword.replace(/\s+/g, "")) ? keyword.length : 0), 0);
}

function resolveTrackRootLabel(trackTitle = "") {
  const mapping: Record<string, string> = {
    "老屋翻新系": "老屋翻新",
    "預售屋客變系": "預售屋客變",
    "驗屋交屋系": "驗屋交屋",
    "格局動線系": "格局動線",
    "水電照明系": "水電照明",
  };
  return mapping[trackTitle] || trackTitle.replace(/系$/, "");
}

function getTopicTemplateSet(trackTitle = "", chapterTitle = "", subchapterTitle = "") {
  const root = resolveTrackRootLabel(trackTitle);

  if (chapterTitle === "現況判讀") {
    return [
      `${root}前怎麼做${subchapterTitle}？先抓最關鍵的判斷點`,
      `${root}${subchapterTitle}先看什麼，才知道值不值得做？`,
      `${root}${subchapterTitle}最容易漏看的 3 個地方`,
    ];
  }

  if (chapterTitle === "客變判斷" || chapterTitle === "驗屋判讀") {
    return [
      `${root}${subchapterTitle}怎麼判斷？先抓最核心的決策點`,
      `${root}${subchapterTitle}先看這幾件事，就知道要不要做`,
      `${root}${subchapterTitle}最容易忽略的 3 個重點`,
    ];
  }

  if (chapterTitle === "預算拆解") {
    return [
      `${root}${subchapterTitle}怎麼抓？先看最容易失手的地方`,
      `${root}${subchapterTitle}最常多花在哪裡？`,
      `${root}${subchapterTitle}先抓對，後面才不容易爆預算`,
    ];
  }

  if (chapterTitle === "基礎工程" || chapterTitle === "配置預留" || chapterTitle === "設備整合") {
    return [
      `${root}${subchapterTitle}怎麼排？先看順序再動工`,
      `${root}${subchapterTitle}要先決定什麼？`,
      `${root}${subchapterTitle}最容易漏掉的 3 個前置`,
    ];
  }

  if (chapterTitle === "完工避雷" || chapterTitle === "缺失排序" || chapterTitle === "點交策略") {
    return [
      `${root}${subchapterTitle}怎麼看？最容易忽略的重點整理`,
      `${root}${subchapterTitle}先抓這幾個重點就夠了`,
      `${root}${subchapterTitle}最容易出錯的地方在哪裡？`,
    ];
  }

  if (chapterTitle === "照明設計" || chapterTitle === "插座開關" || chapterTitle === "智能控制") {
    return [
      `${root}${subchapterTitle}怎麼做才順手？`,
      `${root}${subchapterTitle}先想清楚，入住後才不後悔`,
      `${root}${subchapterTitle}最值得先確認的 3 件事`,
    ];
  }

  if (chapterTitle === "空間重整" || chapterTitle === "動線配置" || chapterTitle === "家具配置" || chapterTitle === "生活動線") {
    return [
      `${root}${subchapterTitle}怎麼排才順？`,
      `${root}${subchapterTitle}先看取捨，再決定怎麼做`,
      `${root}${subchapterTitle}最常做錯的配置是什麼？`,
    ];
  }

  return [
    `${root}${subchapterTitle}怎麼判斷？`,
    `${root}${subchapterTitle}最值得先補的重點是什麼？`,
    `${root}${subchapterTitle}先看這幾件事，再決定要不要做`,
  ];
}

function buildRecommendationReason(trackTitle: string, subchapterTitle: string, chapterCount: number, subchapterCount: number) {
  const focusLead = trackTitle === publishingFocusTrackTitle
    ? "這題屬於目前主攻書系，補完會直接推進第一本書的完成度。"
    : "這題雖不在主攻書系，但目前缺口很大，補位效率高。";
  const chapterLead = chapterCount === 0
    ? "這一章目前還是空章，應先立住主幹。"
    : chapterCount === 1
      ? "這一章目前只有 1 篇，還沒有形成章節感。"
      : "這一章已有基底，但這個缺口仍可明顯補強章節完整度。";
  const subchapterLead = subchapterCount === 0
    ? `子章「${subchapterTitle}」目前尚未覆蓋，最適合先補第一篇。`
    : `子章「${subchapterTitle}」目前只有 ${subchapterCount} 篇，仍適合補互補角度。`;
  return `${focusLead} ${chapterLead} ${subchapterLead}`;
}

export function getTrackPlan(trackTitle = "") {
  return bookshelfTrackPlans.find((track) => track.title === trackTitle) || null;
}

export function getTrackConfig(trackTitle = "") {
  return bookshelfTracks.find((track) => track.title === trackTitle) || null;
}

export function getTrackChapters(trackTitle = "") {
  return getTrackPlan(trackTitle)?.chapters.map((chapter) => chapter.title) || [];
}

export function getTrackSubchapterMap(trackTitle = "", chapterTitle = "") {
  return bookshelfSubchapterPools?.[trackTitle]?.[chapterTitle] || {};
}

export function getTrackSubchapters(trackTitle = "", chapterTitle = "") {
  return Object.keys(getTrackSubchapterMap(trackTitle, chapterTitle));
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
  const trackPlan = getTrackPlan(trackTitle);
  if (!trackPlan || !text) return "";

  let bestChapter = "";
  let bestScore = 0;

  trackPlan.chapters.forEach((chapter) => {
    const score = getInferenceKeywordScore(text, chapter.keywords);
    if (score > bestScore) {
      bestScore = score;
      bestChapter = chapter.title;
    }
  });

  return bestChapter || trackPlan.chapters[0]?.title || "";
}

export function inferSubchapterFromTrack(trackTitle = "", chapterTitle = "", ...values: string[]) {
  const text = values.join("\n").replace(/\s+/g, "");
  const chapterPlan = getTrackPlan(trackTitle)?.chapters.find((chapter) => chapter.title === chapterTitle);
  if (!chapterPlan || !text) return chapterPlan?.subchapters[0]?.title || "";

  let bestSubchapter = "";
  let bestScore = 0;

  chapterPlan.subchapters.forEach((subchapter) => {
    const score = getInferenceKeywordScore(text, subchapter.keywords);
    if (score > bestScore) {
      bestScore = score;
      bestSubchapter = subchapter.title;
    }
  });

  return bestSubchapter || chapterPlan.subchapters[0]?.title || "";
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

export function buildBookshelfEntries(posts: PublishingCatalogPost[] = []): BookshelfEntry[] {
  return posts.map((post) => {
    const trackTitle =
      normalizeTrack(String(post.track ?? "")) ||
      inferTrackFromText(post.title || "", post.summary || "", normalizeTagList(post.tags).join(" "));
    const chapter =
      String(post.chapter ?? "").trim() ||
      inferChapterFromTrack(trackTitle, post.title || "", post.summary || "", normalizeTagList(post.tags).join(" "));
    const subchapter = inferSubchapterFromTrack(trackTitle, chapter, post.title || "", post.summary || "", normalizeTagList(post.tags).join(" "));
    const category = normalizeSiteCategory(String(post.siteCategory || post.category || "")) || String(post.siteCategory || post.category || "");
    return {
      title: post.title || "未命名文章",
      trackTitle: trackTitle || publishingFocusTrackTitle,
      chapter,
      subchapter,
      category,
      date: String(post.date || ""),
    };
  });
}

export function getPublishingCoverageSummary(posts: PublishingCatalogPost[] = [], focusTrackTitle = publishingFocusTrackTitle) {
  const entries = buildBookshelfEntries(posts);
  const tracks = bookshelfTrackPlans.map((track) => {
    const trackEntries = entries.filter((entry) => entry.trackTitle === track.title);
    const totalChapters = track.chapters.length;
    const completedChapters = track.chapters.filter((chapter) =>
      trackEntries.some((entry) => entry.chapter === chapter.title),
    ).length;
    const totalSubchapters = track.chapters.reduce((sum, chapter) => sum + chapter.subchapters.length, 0);
    const completedSubchapters = track.chapters.reduce(
      (sum, chapter) =>
        sum + chapter.subchapters.filter((subchapter) =>
          trackEntries.some((entry) => entry.chapter === chapter.title && entry.subchapter === subchapter.title),
        ).length,
      0,
    );

    return {
      title: track.title,
      articleCount: trackEntries.length,
      completedChapters,
      totalChapters,
      completedSubchapters,
      totalSubchapters,
      coverageRate: totalSubchapters ? Math.round((completedSubchapters / totalSubchapters) * 100) : 0,
    } satisfies PublishingTrackCoverage;
  });

  return {
    focusTrackTitle,
    tracks,
    focusTrack: tracks.find((track) => track.title === focusTrackTitle) || tracks[0] || null,
  };
}

export function getPublishingDashboard(posts: PublishingCatalogPost[] = [], focusTrackTitle = publishingFocusTrackTitle) {
  const entries = buildBookshelfEntries(posts);
  const tracks = bookshelfTrackPlans.map((track) => {
    const trackEntries = entries.filter((entry) => entry.trackTitle === track.title);
    const chapterGaps = track.chapters.map((chapter) => {
      const chapterEntries = trackEntries.filter((entry) => entry.chapter === chapter.title);
      const subchapters = chapter.subchapters.map((subchapter) => {
        const articleCount = chapterEntries.filter((entry) => entry.subchapter === subchapter.title).length;
        return {
          title: subchapter.title,
          articleCount,
          coveredByArticle: articleCount > 0,
        } satisfies PublishingSubchapterStatus;
      });
      const missingSubchapters = chapter.subchapters
        .filter((subchapter) => !chapterEntries.some((entry) => entry.subchapter === subchapter.title))
        .map((subchapter) => subchapter.title);

      return {
        chapter: chapter.title,
        articleCount: chapterEntries.length,
        missingSubchapters,
        remainingToBaseline: missingSubchapters.length,
        subchapters,
        recommendedTopic: getChapterRecommendedTopicFromEntries(entries, track.title, chapter.title, focusTrackTitle),
      } satisfies PublishingChapterGap;
    });

    const totalChapters = track.chapters.length;
    const completedChapters = chapterGaps.filter((gap) => gap.articleCount > 0).length;
    const totalSubchapters = track.chapters.reduce((sum, chapter) => sum + chapter.subchapters.length, 0);
    const completedSubchapters = totalSubchapters - chapterGaps.reduce((sum, gap) => sum + gap.remainingToBaseline, 0);
    const remainingToBaseline = chapterGaps.reduce((sum, gap) => sum + gap.remainingToBaseline, 0);
    const missingChapterTitles = chapterGaps.filter((gap) => gap.articleCount === 0).map((gap) => gap.chapter);

    return {
      title: track.title,
      articleCount: trackEntries.length,
      completedChapters,
      totalChapters,
      completedSubchapters,
      totalSubchapters,
      coverageRate: totalSubchapters ? Math.round((completedSubchapters / totalSubchapters) * 100) : 0,
      missingChapterTitles,
      remainingToBaseline,
      readyToPublish: remainingToBaseline === 0,
      chapterGaps: chapterGaps.sort((left, right) => right.remainingToBaseline - left.remainingToBaseline),
    } satisfies PublishingTrackDashboard;
  });

  const rankedTracks = [...tracks].sort((left, right) => {
    if (left.remainingToBaseline !== right.remainingToBaseline) {
      return left.remainingToBaseline - right.remainingToBaseline;
    }
    if (left.coverageRate !== right.coverageRate) {
      return right.coverageRate - left.coverageRate;
    }
    return right.articleCount - left.articleCount;
  });

  return {
    focusTrackTitle,
    tracks,
    rankedTracks,
    focusTrack: tracks.find((track) => track.title === focusTrackTitle) || tracks[0] || null,
    nearestTrack: rankedTracks[0] || null,
  };
}

export function buildNextTopicFlashPrompt(recommendation: Omit<NextTopicRecommendation, "flashPrompt">) {
  return [
    "你是青曦空間設計的內容總編，現在只要替『下一篇最推薦主題』潤題，不要改變主題缺口本身。",
    "請根據下列固定缺口，輸出 1 個最推薦正式標題 + 2 個備選標題。",
    "要求：",
    "1. 不能跳出指定主書系、章節與子章節。",
    "2. 目標是加速補全書稿完整度，而不是追求花俏流量題。",
    "3. 標題要適合官網發布，也要能自然收進未來書稿章名。",
    "4. 語氣要高級、乾淨、穩定，不要內容農場腔。",
    "5. 若需要聚焦，優先補最能立住章節骨架的角度。",
    "",
    `主攻書系：${recommendation.focusTrackTitle}`,
    `本次固定主書系：${recommendation.trackTitle}`,
    `章節：${recommendation.chapter}`,
    `子章節：${recommendation.subchapter}`,
    `網站分類：${recommendation.category}`,
    `目前本書篇數：${recommendation.articleCountInTrack}`,
    `本章篇數：${recommendation.articleCountInChapter}`,
    `本子章篇數：${recommendation.articleCountInSubchapter}`,
    `推薦原因：${recommendation.reason}`,
    "",
    "請直接輸出：",
    "A. 最推薦標題（1 個）",
    "B. 備選標題（2 個）",
    "C. 為什麼這一題最適合現在先寫（2-4 句）",
  ].join("\n");
}

function buildRecommendationFromCandidate(
  candidate: {
    trackTitle: string;
    chapter: string;
    subchapter: string;
    category: string;
    articleCountInTrack: number;
    articleCountInChapter: number;
    articleCountInSubchapter: number;
    coverageBefore: number;
    coverageAfter: number;
  },
  focusTrackTitle: string,
) {
  const [primaryTitle, ...backupTitles] = getTopicTemplateSet(candidate.trackTitle, candidate.chapter, candidate.subchapter);
  const reason = buildRecommendationReason(
    candidate.trackTitle,
    candidate.subchapter,
    candidate.articleCountInChapter,
    candidate.articleCountInSubchapter,
  );
  const recommendationBase = {
    focusTrackTitle,
    trackTitle: candidate.trackTitle,
    chapter: candidate.chapter,
    subchapter: candidate.subchapter,
    category: candidate.category,
    articleCountInTrack: candidate.articleCountInTrack,
    articleCountInChapter: candidate.articleCountInChapter,
    articleCountInSubchapter: candidate.articleCountInSubchapter,
    coverageBefore: candidate.coverageBefore,
    coverageAfter: candidate.coverageAfter,
    primaryTitle,
    backupTitles,
    reason,
  };

  return {
    ...recommendationBase,
    flashPrompt: buildNextTopicFlashPrompt(recommendationBase),
  } satisfies NextTopicRecommendation;
}

function buildRecommendationCandidates(
  entries: BookshelfEntry[],
  focusTrackTitle: string,
  filters: { trackTitle?: string; chapterTitle?: string } = {},
) {
  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, 3);

  const candidates = bookshelfTrackPlans.flatMap((track) =>
    (filters.trackTitle && track.title !== filters.trackTitle ? [] : track.chapters).flatMap((chapter) =>
      (filters.chapterTitle && chapter.title !== filters.chapterTitle ? [] : chapter.subchapters).map((subchapter) => {
        const trackEntries = entries.filter((entry) => entry.trackTitle === track.title);
        const chapterEntries = trackEntries.filter((entry) => entry.chapter === chapter.title);
        const subchapterEntries = chapterEntries.filter((entry) => entry.subchapter === subchapter.title);
        const totalSubchapters = track.chapters.reduce((sum, item) => sum + item.subchapters.length, 0);
        const completedSubchapters = track.chapters.reduce(
          (sum, item) =>
            sum + item.subchapters.filter((child) =>
              trackEntries.some((entry) => entry.chapter === item.title && entry.subchapter === child.title),
            ).length,
          0,
        );
        const coverageBefore = totalSubchapters ? Math.round((completedSubchapters / totalSubchapters) * 100) : 0;
        const coverageAfter = totalSubchapters
          ? Math.round(((completedSubchapters + (subchapterEntries.length ? 0 : 1)) / totalSubchapters) * 100)
          : coverageBefore;
        const recentPenalty = recentEntries.some((entry) =>
          entry.trackTitle === track.title && entry.subchapter === subchapter.title,
        )
          ? 28
          : recentEntries.some((entry) =>
              entry.trackTitle === track.title && entry.chapter === chapter.title,
            )
            ? 12
            : 0;
        const focusBoost = track.title === focusTrackTitle ? 60 : 0;
        const emptyChapterBoost = chapterEntries.length === 0 ? 34 : chapterEntries.length === 1 ? 18 : 6;
        const emptySubchapterBoost = subchapterEntries.length === 0 ? 52 : subchapterEntries.length === 1 ? 16 : 0;
        const trackCoverageBoost = Math.max(0, 24 - trackEntries.length * 2);
        const score = focusBoost + emptyChapterBoost + emptySubchapterBoost + trackCoverageBoost - recentPenalty;

        return {
          trackTitle: track.title,
          chapter: chapter.title,
          subchapter: subchapter.title,
          category: normalizeSiteCategory(track.title) || resolveTrackRootLabel(track.title),
          articleCountInTrack: trackEntries.length,
          articleCountInChapter: chapterEntries.length,
          articleCountInSubchapter: subchapterEntries.length,
          coverageBefore,
          coverageAfter,
          score,
        };
      }),
    ),
  );

  return candidates.sort((left, right) => right.score - left.score);
}

function getChapterRecommendedTopicFromEntries(
  entries: BookshelfEntry[],
  trackTitle: string,
  chapterTitle: string,
  focusTrackTitle = publishingFocusTrackTitle,
) {
  const best = buildRecommendationCandidates(entries, focusTrackTitle, { trackTitle, chapterTitle })[0];
  if (!best) return null;
  return buildRecommendationFromCandidate(best, focusTrackTitle);
}

export function getChapterRecommendedTopic(
  posts: PublishingCatalogPost[] = [],
  trackTitle: string,
  chapterTitle: string,
  focusTrackTitle = publishingFocusTrackTitle,
) {
  return getChapterRecommendedTopicFromEntries(buildBookshelfEntries(posts), trackTitle, chapterTitle, focusTrackTitle);
}

export function getNextRecommendedTopic(posts: PublishingCatalogPost[] = [], focusTrackTitle = publishingFocusTrackTitle): NextTopicRecommendation | null {
  const entries = buildBookshelfEntries(posts);
  const best = buildRecommendationCandidates(entries, focusTrackTitle)[0];
  if (!best) return null;
  return buildRecommendationFromCandidate(best, focusTrackTitle);
}

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
  subchapter?: string;
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
  titlePool: PublicationTitlePoolItem[];
}

export interface PublishingTrackDashboard extends PublishingTrackCoverage {
  missingChapterTitles: string[];
  remainingToBaseline: number;
  readyToPublish: boolean;
  chapterGaps: PublishingChapterGap[];
  titlePool: PublicationTitlePoolItem[];
}

export interface PublishingSubchapterStatus {
  title: string;
  articleCount: number;
  coveredByArticle: boolean;
}

export interface PublicationTitlePoolItem {
  trackTitle: string;
  chapter: string;
  subchapter: string;
  primaryTitle: string;
  backupTitles: string[];
  category: string;
  status: "published" | "merge_needed" | "draft" | "pending";
  confidence: "high" | "medium" | "low";
  isRecommended: boolean;
  note: string;
}

export interface SimilarArticleMatch {
  title: string;
  chapter: string;
  subchapter: string;
  score: number;
  reason: string;
}

export interface NextTopicRecommendation {
  mode: PublishingTopicMode;
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
  webTitle: string;
  bookTitle: string;
  primaryTitle: string;
  backupTitles: string[];
  reason: string;
  sameSubchapterArticles: string[];
  sameChapterArticles: string[];
  sameTrackArticles: string[];
  similarArticles: SimilarArticleMatch[];
  collisionRisk: "low" | "medium" | "high";
  collisionReason: string;
  actionHint: string;
  flashPrompt: string;
}

export type PublishingTopicMode = "publishing" | "balanced" | "flash";

export interface PublishingTopicModeOption {
  value: PublishingTopicMode;
  label: string;
  description: string;
}

export const publishingFocusTrackTitle = "老屋翻新系";
export const publicationChapterOrder = ["現況判讀", "預算拆解", "基礎工程", "空間重整", "完工避雷"] as const;

export interface PublicationMergeDirective {
  trackTitle: string;
  chapterTitle: string;
  targetTitle: string;
  targetSubchapter: string;
  sourceTitles: string[];
  note: string;
}

export const publicationMergeDirectives: PublicationMergeDirective[] = [
  {
    trackTitle: publishingFocusTrackTitle,
    chapterTitle: "現況判讀",
    targetTitle: "老屋翻新起手式：屋況盤點與範圍界定總表",
    targetSubchapter: "翻新起手式",
    sourceTitles: [
      "老屋翻新範圍怎麼抓？從屋況盤點到關鍵判斷點的完整評估指南",
      "啟動老屋翻新之前：精準盤點屋況的 5 個核心判斷點",
    ],
    note: "這兩篇屬同一組前置決策內容，應整併為單一的翻新起手式條目，而不是繼續拆成分散子題。",
  },
];

export const publishingTopicModeOptions: PublishingTopicModeOption[] = [
  {
    value: "publishing",
    label: "出版優先",
    description: "先補主攻書缺章，最快推進一本到可出版。",
  },
  {
    value: "balanced",
    label: "平衡模式",
    description: "兼顧主攻書完成度與跨書系的實用補位。",
  },
  {
    value: "flash",
    label: "Flash 探索",
    description: "保留書系骨架，但讓 Flash 更有空間滾動修題與找新角度。",
  },
];

export const bookshelfTrackPlans: BookshelfTrackPlan[] = [
  {
    title: "老屋翻新系",
    focus: "老屋翻修、屋況判讀、預算拆解、基礎工程、空間重整與完工避雷",
    chapters: [
      {
        title: "現況判讀",
        keywords: ["屋況", "老屋", "中古屋", "翻新前", "現況", "評估"],
        subchapters: [
          { title: "翻新起手式", keywords: ["屋況盤點", "翻新範圍", "先做什麼", "第一步", "從哪開始", "翻新前", "準備階段"] },
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

function getBookTitleOverride(trackTitle = "", chapterTitle = "", subchapterTitle = "") {
  const overrides: Record<string, string> = {
    [`${publishingFocusTrackTitle}|現況判讀|翻新起手式`]: "老屋翻新起手式：屋況盤點與範圍界定總表",
    [`${publishingFocusTrackTitle}|預算拆解|預算分級`]: "預算分級：全室裝修的預算配置框架",
    [`${publishingFocusTrackTitle}|預算拆解|報價拆讀`]: "報價識讀：全室預算拆解與避險指南",
    [`${publishingFocusTrackTitle}|預算拆解|追加風險`]: "追加風險：變更、漏項與超支的預防策略",
    [`${publishingFocusTrackTitle}|基礎工程|水電更新`]: "水電更新：老屋基礎工程的迴路重整與用電安全",
    [`${publishingFocusTrackTitle}|基礎工程|防水地坪`]: "防水地坪：老屋防水修復與地坪施作基準",
    [`${publishingFocusTrackTitle}|空間重整|格局調整`]: "格局調整：老屋空間重整與生活動線規劃",
    [`${publishingFocusTrackTitle}|空間重整|收納補強`]: "收納補強：老屋機能配置與櫃體整合策略",
    [`${publishingFocusTrackTitle}|空間重整|家具配置`]: "家具配置：老屋尺度配置與起居動線校準",
    [`${publishingFocusTrackTitle}|完工避雷|驗收重點`]: "驗收重點：老屋完工檢核與缺失排查清單",
    [`${publishingFocusTrackTitle}|完工避雷|保固界線`]: "保固界線：老屋修繕責任與保固邊界",
    [`${publishingFocusTrackTitle}|完工避雷|糾紛預防`]: "糾紛預防：老屋裝修爭議的溝通節點與證據留存",
  };
  return overrides[`${trackTitle}|${chapterTitle}|${subchapterTitle}`] || "";
}

export function buildBookTopicTitle(trackTitle = "", chapterTitle = "", subchapterTitle = "") {
  const override = getBookTitleOverride(trackTitle, chapterTitle, subchapterTitle);
  if (override) return override;

  const root = resolveTrackRootLabel(trackTitle);

  if (chapterTitle === "現況判讀") {
    return `${subchapterTitle}：${root}前期判讀與改造決策`;
  }
  if (chapterTitle === "預算拆解") {
    return `${subchapterTitle}：${root}的預算配置與報價判讀`;
  }
  if (chapterTitle === "基礎工程") {
    return `${subchapterTitle}：${root}基礎工程的施作順序與驗收重點`;
  }
  if (chapterTitle === "空間重整") {
    return `${subchapterTitle}：${root}空間規劃與生活動線的配置邏輯`;
  }
  if (chapterTitle === "完工避雷") {
    return `${subchapterTitle}：${root}完工驗收與風險控管`;
  }

  return `${subchapterTitle}：${root}${chapterTitle ? `的${chapterTitle}` : ""}實務指南`;
}

function buildTitleBackups(trackTitle = "", chapterTitle = "", subchapterTitle = "", bookTitle = "") {
  const root = resolveTrackRootLabel(trackTitle);
  const base = bookTitle || buildBookTopicTitle(trackTitle, chapterTitle, subchapterTitle);
  return Array.from(new Set([
    base,
    `${subchapterTitle}：${root}${chapterTitle ? ` ${chapterTitle}` : ""}的重點整理`,
    `${subchapterTitle}：${root}${chapterTitle ? ` ${chapterTitle}` : ""}的決策框架`,
  ])).filter((title) => title !== base).slice(0, 2);
}

export function getTopicTitleSet(trackTitle = "", chapterTitle = "", subchapterTitle = "") {
  const bookTitle = buildBookTopicTitle(trackTitle, chapterTitle, subchapterTitle);
  return {
    webTitle: bookTitle,
    backupTitles: buildTitleBackups(trackTitle, chapterTitle, subchapterTitle, bookTitle),
    bookTitle,
  };
}

function getMacroPrioritySubchapters(chapterTitle = "") {
  const priorityMap: Record<string, string[]> = {
    "現況判讀": ["翻新起手式", "屋況盤點"],
    "預算拆解": ["報價拆讀", "預算分級"],
    "基礎工程": ["拆除泥作", "水電更新"],
    "空間重整": ["格局調整"],
    "完工避雷": ["驗收重點"],
  };
  return priorityMap[chapterTitle] || [];
}

function isMicroCoverageTitle(title = "") {
  const microKeywords = ["客廳", "餐廳", "臥室", "浴室", "廚房", "玄關", "陽台", "局部", "單區", "單一空間"];
  return microKeywords.some((keyword) => title.includes(keyword));
}

function buildSimilarArticleMatches(
  entries: BookshelfEntry[],
  trackTitle: string,
  chapterTitle: string,
  subchapterTitle: string,
) {
  const mergeDirective = getPublicationMergeDirective(trackTitle, chapterTitle);
  return entries
    .filter((entry) => entry.trackTitle === trackTitle)
    .map((entry) => {
      const score = getSemanticOverlapScore(trackTitle, chapterTitle, subchapterTitle, entry, mergeDirective);
      return {
        title: entry.title,
        chapter: entry.chapter,
        subchapter: entry.subchapter,
        score,
        reason: buildSimilarityReason(score, chapterTitle, subchapterTitle, entry, mergeDirective),
      } satisfies SimilarArticleMatch;
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 2);
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

function buildTitlePoolItem(
  entries: BookshelfEntry[],
  trackTitle: string,
  chapterTitle: string,
  subchapterTitle: string,
  recommendedTopic: NextTopicRecommendation | null,
): PublicationTitlePoolItem {
  const titleSet = getTopicTitleSet(trackTitle, chapterTitle, subchapterTitle);
  const mergeDirective = getPublicationMergeDirective(trackTitle, chapterTitle);
  const hasPublishedEntry = entries.some((entry) => (
    entry.trackTitle === trackTitle &&
    entry.chapter === chapterTitle &&
    entry.subchapter === subchapterTitle
  ));
  const mergeNeeded = Boolean(
    mergeDirective &&
    mergeDirective.targetSubchapter === subchapterTitle &&
    mergeDirective.sourceTitles.length > 0
  );
  const isRecommended = recommendedTopic?.subchapter === subchapterTitle;
  const status: PublicationTitlePoolItem["status"] = mergeNeeded
    ? "merge_needed"
    : hasPublishedEntry
      ? "published"
      : "pending";
  const confidence: PublicationTitlePoolItem["confidence"] = isRecommended
    ? "high"
    : mergeNeeded
      ? "high"
      : hasPublishedEntry
        ? "medium"
        : "medium";
  const note = mergeNeeded
    ? mergeDirective?.note || "此子章目前應先整併既有文章，不建議另開新標題。"
    : hasPublishedEntry
      ? "此子章已有已上線文章，標題池保留作為整體出版視角參考。"
      : isRecommended
        ? "這是目前系統最推薦優先補位的標題。"
        : "這是未來待補的候選標題，可交由高階 LLM 進一步覆核、重排與刪修。";
  return {
    trackTitle,
    chapter: chapterTitle,
    subchapter: subchapterTitle,
    primaryTitle: titleSet.webTitle,
    backupTitles: titleSet.backupTitles,
    category: normalizeSiteCategory(trackTitle) || resolveTrackRootLabel(trackTitle),
    status,
    confidence,
    isRecommended,
    note,
  } satisfies PublicationTitlePoolItem;
}

function buildChapterTitlePool(
  entries: BookshelfEntry[],
  trackTitle: string,
  chapterPlan: BookshelfChapterPlan,
  recommendedTopic: NextTopicRecommendation | null,
) {
  return chapterPlan.subchapters.map((subchapter) => (
    buildTitlePoolItem(entries, trackTitle, chapterPlan.title, subchapter.title, recommendedTopic)
  ));
}

export function getTrackPlan(trackTitle = "") {
  return bookshelfTrackPlans.find((track) => track.title === trackTitle) || null;
}

export function getPublicationMergeDirective(trackTitle = "", chapterTitle = "") {
  return publicationMergeDirectives.find((directive) => (
    directive.trackTitle === trackTitle && directive.chapterTitle === chapterTitle
  )) || null;
}

export function getPublicationMergeSourceTitles(trackTitle = "", chapterTitle = "") {
  return getPublicationMergeDirective(trackTitle, chapterTitle)?.sourceTitles || [];
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

function normalizeSemanticText(...values: string[]) {
  return values.join(" ").replace(/[：:？?、，,。！!（）()「」『』《》\-\s]/g, "").trim();
}

function buildCandidateSemanticTerms(trackTitle = "", chapterTitle = "", subchapterTitle = "") {
  const trackPlan = getTrackPlan(trackTitle);
  const chapterPlan = trackPlan?.chapters.find((chapter) => chapter.title === chapterTitle);
  const subchapterPlan = chapterPlan?.subchapters.find((subchapter) => subchapter.title === subchapterTitle);
  return Array.from(new Set([
    resolveTrackRootLabel(trackTitle),
    trackTitle,
    chapterTitle,
    subchapterTitle,
    ...normalizeTagList(chapterPlan?.keywords || []),
    ...normalizeTagList(subchapterPlan?.keywords || []),
  ].filter(Boolean).map((term) => normalizeSemanticText(String(term)))));
}

function getSemanticOverlapScore(
  trackTitle: string,
  chapterTitle: string,
  subchapterTitle: string,
  entry: BookshelfEntry,
  mergeDirective: PublicationMergeDirective | null = null,
) {
  if (mergeDirective?.targetSubchapter === subchapterTitle && mergeDirective.sourceTitles.includes(entry.title)) {
    return 88;
  }

  const candidateTerms = buildCandidateSemanticTerms(trackTitle, chapterTitle, subchapterTitle);
  const entryText = normalizeSemanticText(entry.title, entry.chapter, entry.subchapter, entry.trackTitle, entry.category);
  const matchedTerms = candidateTerms.filter((term) => term && entryText.includes(term));
  const termScore = candidateTerms.length
    ? Math.round((matchedTerms.length / candidateTerms.length) * 100)
    : 0;

  const sameTrackBoost = entry.trackTitle === trackTitle ? 16 : 0;
  const sameChapterBoost = entry.chapter === chapterTitle ? 22 : 0;
  const sameSubchapterBoost = entry.subchapter === subchapterTitle ? 24 : 0;

  return Math.min(100, termScore + sameTrackBoost + sameChapterBoost + sameSubchapterBoost);
}

function buildSimilarityReason(
  score: number,
  chapterTitle: string,
  subchapterTitle: string,
  entry: BookshelfEntry,
  mergeDirective: PublicationMergeDirective | null = null,
) {
  if (mergeDirective?.targetSubchapter === subchapterTitle && mergeDirective.sourceTitles.includes(entry.title)) {
    return "這篇已屬同一組前置決策內容，較適合整併而不是另開新題。";
  }
  if (entry.subchapter === subchapterTitle) {
    return "同子章內容重疊度高，容易形成直接撞題。";
  }
  if (entry.chapter === chapterTitle && score >= 60) {
    return "同章核心解法接近，應避免重複描述相同決策方案。";
  }
  if (entry.chapter === chapterTitle) {
    return "同章相鄰內容已有基底，需強化切角差異。";
  }
  return "同書系已有相關內容，可作為差異化比對參考。";
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
    const subchapter =
      String(post.subchapter ?? "").trim() ||
      inferSubchapterFromTrack(trackTitle, chapter, post.title || "", post.summary || "", normalizeTagList(post.tags).join(" "));
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

export function getPublishingDashboard(
  posts: PublishingCatalogPost[] = [],
  focusTrackTitle = publishingFocusTrackTitle,
  mode: PublishingTopicMode = "publishing",
) {
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

      const recommendedTopic = getChapterRecommendedTopicFromEntries(entries, track.title, chapter.title, focusTrackTitle, mode);
      const titlePool = buildChapterTitlePool(entries, track.title, chapter, recommendedTopic);
      return {
        chapter: chapter.title,
        articleCount: chapterEntries.length,
        missingSubchapters,
        remainingToBaseline: missingSubchapters.length,
        subchapters,
        recommendedTopic,
        titlePool,
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
      chapterGaps,
      titlePool: chapterGaps.flatMap((gap) => gap.titlePool),
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
  const modeLeadMap: Record<PublishingTopicMode, string> = {
    publishing: "這次以『出版優先』模式運作，目標是最快補齊主攻書缺口。",
    balanced: "這次以『平衡模式』運作，目標是在出版進度與跨題材實用性之間取得平衡。",
    flash: "這次以『Flash 探索模式』運作，允許在不脫離書系骨架下，找更靈活的新切角。",
  };
  return [
    "你是青曦空間設計的內容總編，現在只要替『下一篇最推薦主題』潤題，不要改變主題缺口本身。",
    "請根據下列固定缺口，輸出 1 個最推薦統一標題，以及 2 個備選標題。",
    modeLeadMap[recommendation.mode],
    "要求：",
    "1. 不能跳出指定主書系、章節與子章節。",
    "2. 目標是加速補全書稿完整度，而不是追求花俏流量題。",
    "3. 標題必須符合實體出版目錄體例，採用「主標題：副標題」結構，嚴禁問句與內容農場腔。",
    "4. 語氣要高級、乾淨、穩定，不要內容農場腔。",
    "5. 若該章目前只有局部、單空間或微觀文章，優先補能立住全局框架的宏觀題。",
    "6. 必須先檢查同子章與相似舊文；若核心解法與既有內容重疊度超過 60%，必須直接更換角度、改子章節，或明確判定應整併舊文。",
    "7. 若某章完成度為 0%，其優先權必須高於已有兩篇以上文章的章節，先補結構性真空。",
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
    "同子章既有文章：",
    recommendation.sameSubchapterArticles.length ? recommendation.sameSubchapterArticles.join(" / ") : "目前沒有同子章文章，可直接立第一篇。",
    "",
    "同章既有文章：",
    recommendation.sameChapterArticles.length ? recommendation.sameChapterArticles.join(" / ") : "目前沒有同章文章，請直接立住章節主幹。",
    "",
    "同書系其他既有文章：",
    recommendation.sameTrackArticles.length ? recommendation.sameTrackArticles.join(" / ") : "目前沒有同書系其他文章，請把這篇寫成可立主幹的起手文。",
    "",
    "請直接輸出：",
    "A. 最推薦統一標題（1 個）",
    "B. 備選標題（2 個）",
    "C. 撞題檢查（2-4 句，明確說明是否與既有文章重疊）",
    "D. 為什麼這一題最適合現在先寫（2-4 句）",
  ].join("\n");
}

function listEntryTitles(entries: BookshelfEntry[] = [], limit = 6) {
  return entries
    .slice(0, limit)
    .map((entry) => entry.title)
    .filter(Boolean);
}

function buildExistingArticleContext(
  entries: BookshelfEntry[],
  trackTitle: string,
  chapterTitle: string,
  subchapterTitle: string,
) {
  const sameTrackEntries = entries.filter((entry) => entry.trackTitle === trackTitle);
  const sameChapterEntries = sameTrackEntries.filter((entry) => entry.chapter === chapterTitle);
  const sameSubchapterEntries = sameChapterEntries.filter((entry) => entry.subchapter === subchapterTitle);
  const neighboringTrackEntries = sameTrackEntries.filter((entry) => entry.chapter !== chapterTitle);

  return {
    sameSubchapterArticles: listEntryTitles(sameSubchapterEntries, 4),
    sameChapterArticles: listEntryTitles(
      sameChapterEntries.filter((entry) => entry.subchapter !== subchapterTitle),
      5,
    ),
    sameTrackArticles: listEntryTitles(neighboringTrackEntries, 6),
  };
}

function buildRecommendationFromCandidate(
  entries: BookshelfEntry[],
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
  mode: PublishingTopicMode,
) {
  const titleSet = getTopicTitleSet(candidate.trackTitle, candidate.chapter, candidate.subchapter);
  const unifiedTitle = titleSet.webTitle;
  const reason = buildRecommendationReason(
    candidate.trackTitle,
    candidate.subchapter,
    candidate.articleCountInChapter,
    candidate.articleCountInSubchapter,
  );
  const existingArticleContext = buildExistingArticleContext(
    entries,
    candidate.trackTitle,
    candidate.chapter,
    candidate.subchapter,
  );
  const similarArticles = buildSimilarArticleMatches(
    entries,
    candidate.trackTitle,
    candidate.chapter,
    candidate.subchapter,
  );
  const topSemanticScore = similarArticles[0]?.score || 0;
  const mergeDirective = getPublicationMergeDirective(candidate.trackTitle, candidate.chapter);
  const mergeTriggered = Boolean(
    mergeDirective &&
    mergeDirective.targetSubchapter === candidate.subchapter &&
    similarArticles.some((article) => mergeDirective.sourceTitles.includes(article.title)),
  );
  const collisionRisk: NextTopicRecommendation["collisionRisk"] = topSemanticScore >= 60
    ? "high"
    : topSemanticScore >= 35
      ? "medium"
      : "low";
  const collisionReason = mergeTriggered
    ? mergeDirective?.note || "這個主題已與既有文章形成整併關係，較適合合併而非另開新題。"
    : collisionRisk === "high"
      ? "核心解法與既有文章重疊度超過 60%，應優先改子章節或直接整併舊文。"
      : collisionRisk === "medium"
        ? "同章已有相近解法，需強化差異與補位角度。"
        : "目前未發現明顯語意撞題，可優先補齊此缺口。";
  const actionHint = mergeTriggered
    ? "應合併舊文"
    : collisionRisk === "high"
      ? "需改子章節"
      : collisionRisk === "medium"
        ? "需拉開差異"
        : "可直接推進";
  const recommendationBase = {
    mode,
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
    webTitle: unifiedTitle,
    bookTitle: unifiedTitle,
    primaryTitle: unifiedTitle,
    backupTitles: titleSet.backupTitles,
    reason,
    ...existingArticleContext,
    similarArticles,
    collisionRisk,
    collisionReason,
    actionHint,
  };

  return {
    ...recommendationBase,
    flashPrompt: buildNextTopicFlashPrompt(recommendationBase),
  } satisfies NextTopicRecommendation;
}

function getRecommendationScoreWeights(mode: PublishingTopicMode) {
  const weights: Record<
    PublishingTopicMode,
    {
      focusBoost: number;
      otherTrackBoost: number;
      emptyChapterBoost: [number, number, number];
      emptySubchapterBoost: [number, number, number];
      trackCoverageBoost: number;
      recentPenalty: [number, number];
      seededSubchapterBoost: number;
      multiTrackDiversityBoost: number;
      structuralVacuumBoost: number;
      chapterSaturationPenalty: number;
    }
  > = {
    publishing: {
      focusBoost: 60,
      otherTrackBoost: 0,
      emptyChapterBoost: [34, 18, 6],
      emptySubchapterBoost: [52, 16, 0],
      trackCoverageBoost: 24,
      recentPenalty: [28, 12],
      seededSubchapterBoost: 0,
      multiTrackDiversityBoost: 0,
      structuralVacuumBoost: 140,
      chapterSaturationPenalty: 72,
    },
    balanced: {
      focusBoost: 34,
      otherTrackBoost: 8,
      emptyChapterBoost: [26, 14, 6],
      emptySubchapterBoost: [40, 18, 4],
      trackCoverageBoost: 18,
      recentPenalty: [20, 9],
      seededSubchapterBoost: 10,
      multiTrackDiversityBoost: 10,
      structuralVacuumBoost: 112,
      chapterSaturationPenalty: 54,
    },
    flash: {
      focusBoost: 14,
      otherTrackBoost: 20,
      emptyChapterBoost: [18, 12, 8],
      emptySubchapterBoost: [26, 20, 10],
      trackCoverageBoost: 12,
      recentPenalty: [10, 4],
      seededSubchapterBoost: 18,
      multiTrackDiversityBoost: 16,
      structuralVacuumBoost: 90,
      chapterSaturationPenalty: 42,
    },
  };
  return weights[mode];
}

function buildRecommendationCandidates(
  entries: BookshelfEntry[],
  focusTrackTitle: string,
  mode: PublishingTopicMode,
  filters: { trackTitle?: string; chapterTitle?: string } = {},
) {
  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, 3);
  const weights = getRecommendationScoreWeights(mode);

  const candidates = bookshelfTrackPlans.flatMap((track) =>
    (filters.trackTitle && track.title !== filters.trackTitle ? [] : track.chapters).flatMap((chapter) =>
      (filters.chapterTitle && chapter.title !== filters.chapterTitle ? [] : chapter.subchapters).map((subchapter) => {
        const trackEntries = entries.filter((entry) => entry.trackTitle === track.title);
        const chapterEntries = trackEntries.filter((entry) => entry.chapter === chapter.title);
        const subchapterEntries = chapterEntries.filter((entry) => entry.subchapter === subchapter.title);
        const missingSubchapterCount = chapter.subchapters.filter((child) => (
          !chapterEntries.some((entry) => entry.subchapter === child.title)
        )).length;
        if (subchapterEntries.length > 0 && missingSubchapterCount > 0) {
          return null;
        }
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
          ? weights.recentPenalty[0]
          : recentEntries.some((entry) =>
              entry.trackTitle === track.title && entry.chapter === chapter.title,
            )
            ? weights.recentPenalty[1]
            : 0;
        const focusBoost = track.title === focusTrackTitle ? weights.focusBoost : weights.otherTrackBoost;
        const emptyChapterBoost = chapterEntries.length === 0
          ? weights.emptyChapterBoost[0]
          : chapterEntries.length === 1
            ? weights.emptyChapterBoost[1]
            : weights.emptyChapterBoost[2];
        const emptySubchapterBoost = subchapterEntries.length === 0
          ? weights.emptySubchapterBoost[0]
          : subchapterEntries.length === 1
            ? weights.emptySubchapterBoost[1]
            : weights.emptySubchapterBoost[2];
        const trackCoverageBoost = Math.max(0, weights.trackCoverageBoost - trackEntries.length * 2);
        const seededSubchapterBoost = subchapterEntries.length > 0 ? weights.seededSubchapterBoost : 0;
        const multiTrackDiversityBoost = track.title !== focusTrackTitle ? weights.multiTrackDiversityBoost : 0;
        const macroPriorityBoost = chapterEntries.length > 0 &&
          chapterEntries.every((entry) => isMicroCoverageTitle(entry.title)) &&
          getMacroPrioritySubchapters(chapter.title).includes(subchapter.title)
          ? 26
          : 0;
        const trackHasStructuralVacuum = track.chapters.some((item) => (
          trackEntries.filter((entry) => entry.chapter === item.title).length === 0
        ));
        const structuralVacuumBoost = chapterEntries.length === 0 ? weights.structuralVacuumBoost : 0;
        const chapterSaturationPenalty = trackHasStructuralVacuum && chapterEntries.length >= 2
          ? weights.chapterSaturationPenalty
          : 0;
        const collisionPenalty = subchapterEntries.length > 0 ? 90 : 0;
        const score =
          focusBoost +
          emptyChapterBoost +
          emptySubchapterBoost +
          trackCoverageBoost +
          seededSubchapterBoost +
          multiTrackDiversityBoost +
          structuralVacuumBoost +
          macroPriorityBoost -
          recentPenalty -
          chapterSaturationPenalty -
          collisionPenalty;

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

  return candidates
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate))
    .sort((left, right) => right.score - left.score);
}

function getChapterRecommendedTopicFromEntries(
  entries: BookshelfEntry[],
  trackTitle: string,
  chapterTitle: string,
  focusTrackTitle = publishingFocusTrackTitle,
  mode: PublishingTopicMode = "publishing",
) {
  const best = buildRecommendationCandidates(entries, focusTrackTitle, mode, { trackTitle, chapterTitle })[0];
  if (!best) return null;
  return buildRecommendationFromCandidate(entries, best, focusTrackTitle, mode);
}

export function getChapterRecommendedTopic(
  posts: PublishingCatalogPost[] = [],
  trackTitle: string,
  chapterTitle: string,
  focusTrackTitle = publishingFocusTrackTitle,
  mode: PublishingTopicMode = "publishing",
) {
  return getChapterRecommendedTopicFromEntries(buildBookshelfEntries(posts), trackTitle, chapterTitle, focusTrackTitle, mode);
}

function getTrackRecommendedTopicFromEntries(
  entries: BookshelfEntry[],
  trackTitle: string,
  focusTrackTitle = publishingFocusTrackTitle,
  mode: PublishingTopicMode = "publishing",
) {
  const best = buildRecommendationCandidates(entries, focusTrackTitle, mode, { trackTitle })[0];
  if (!best) return null;
  return buildRecommendationFromCandidate(entries, best, focusTrackTitle, mode);
}

export function getTrackRecommendedTopic(
  posts: PublishingCatalogPost[] = [],
  trackTitle: string,
  focusTrackTitle = publishingFocusTrackTitle,
  mode: PublishingTopicMode = "publishing",
) {
  return getTrackRecommendedTopicFromEntries(buildBookshelfEntries(posts), trackTitle, focusTrackTitle, mode);
}

export function getTrackRecommendedTopics(
  posts: PublishingCatalogPost[] = [],
  focusTrackTitle = publishingFocusTrackTitle,
  mode: PublishingTopicMode = "publishing",
) {
  const entries = buildBookshelfEntries(posts);
  return bookshelfTrackPlans
    .map((track) => getTrackRecommendedTopicFromEntries(entries, track.title, focusTrackTitle, mode))
    .filter((recommendation): recommendation is NextTopicRecommendation => Boolean(recommendation));
}

export function getNextRecommendedTopics(
  posts: PublishingCatalogPost[] = [],
  focusTrackTitle = publishingFocusTrackTitle,
  mode: PublishingTopicMode = "publishing",
  limit = 6,
) {
  const entries = buildBookshelfEntries(posts);
  return buildRecommendationCandidates(entries, focusTrackTitle, mode)
    .slice(0, Math.max(1, limit))
    .map((candidate) => buildRecommendationFromCandidate(entries, candidate, focusTrackTitle, mode));
}

export function getNextRecommendedTopic(
  posts: PublishingCatalogPost[] = [],
  focusTrackTitle = publishingFocusTrackTitle,
  mode: PublishingTopicMode = "publishing",
): NextTopicRecommendation | null {
  const entries = buildBookshelfEntries(posts);
  const best = buildRecommendationCandidates(entries, focusTrackTitle, mode)[0];
  if (!best) return null;
  return buildRecommendationFromCandidate(entries, best, focusTrackTitle, mode);
}

export interface BookshelfTrack {
  title: string;
  focus: string;
  chapters: string;
}

export interface BookshelfSubchapterPlan {
  title: string;
  keywords: string[];
  nodeKind?: PublicationNodeKind;
  titleOverride?: string;
  assetSlotLabel?: string;
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

export interface PublicationBookProposal {
  trackTitle: string;
  bookTitle: string;
  subtitle: string;
  positioning: string;
}

export type PublicationNodeKind = "core" | "case" | "qa" | "form" | "project";

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
  nodeKind: PublicationNodeKind;
  statusTag: string;
  workflowAction: "New_Publish" | "Merge_and_Update" | "Revise_Angle";
  assetSlotLabel?: string;
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
  workflowAction: "New_Publish" | "Merge_and_Update" | "Revise_Angle";
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
export const publicationChronologyMinCompletionRate = 25;
export const crossSeriesForbiddenKeywords = ["預售屋", "客變", "新成屋", "商空"] as const;

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
    targetTitle: "翻新起手式：屋況盤點與範圍界定總表",
    targetSubchapter: "翻新起手式",
    sourceTitles: [
      "老屋翻新範圍怎麼抓？從屋況盤點到關鍵判斷點的完整評估指南",
      "啟動老屋翻新之前：精準盤點屋況的 5 個核心判斷點",
    ],
    note: "這兩篇屬同一組前置決策內容，應整併為單一的翻新起手式條目，而不是繼續拆成分散子題。",
  },
];

const publicationBookProposalOverrides: Record<string, PublicationBookProposal> = {
  [publishingFocusTrackTitle]: {
    trackTitle: publishingFocusTrackTitle,
    bookTitle: "老屋翻新全拆解",
    subtitle: "從屋況盤點、預算控管到完工避雷的實戰指南",
    positioning: "把屋況判讀、預算控管、基礎工程、空間重整與完工避雷整成一本可支撐 6-8 萬字出版體量的老屋翻新實戰指南。",
  },
  "預售屋客變系": {
    trackTitle: "預售屋客變系",
    bookTitle: "預售屋客變決策手冊",
    subtitle: "從配置預留到交屋銜接的規劃框架",
    positioning: "把客變、設備預留與交屋前後的決策節點整成一套可直接執行的準備清單。",
  },
  "驗屋交屋系": {
    trackTitle: "驗屋交屋系",
    bookTitle: "驗屋交屋判讀指南",
    subtitle: "缺失排序、點交策略與交屋後進場的實務框架",
    positioning: "將驗屋缺失、點交節奏與進場銜接整成一套可實際判讀與追蹤的交屋工具書。",
  },
  "格局動線系": {
    trackTitle: "格局動線系",
    bookTitle: "家的動線配置學",
    subtitle: "從尺度、收納到家具配置的生活邏輯",
    positioning: "用生活情境與空間尺度重新梳理家的動線，建立真正能住得順的配置方法。",
  },
  "水電照明系": {
    trackTitle: "水電照明系",
    bookTitle: "住家的水電照明基礎課",
    subtitle: "插座、迴路、照明與設備整合的規劃手冊",
    positioning: "把最容易後悔的隱蔽工程與照明決策，整理成入住前就能用的規劃基準。",
  },
};

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
          {
            title: "翻新起手式",
            keywords: ["屋況盤點", "翻新範圍", "先做什麼", "第一步", "從哪開始", "翻新前", "準備階段"],
            nodeKind: "core",
            titleOverride: "翻新起手式：屋況盤點與範圍界定總表",
          },
          {
            title: "實戰表單",
            keywords: ["checklist", "表單", "健檢", "初勘", "清單", "附錄"],
            nodeKind: "form",
            titleOverride: "初勘健檢：老屋第一輪現場檢查清單",
            assetSlotLabel: "老屋初勘健檢 Check-list",
          },
          {
            title: "專案節點",
            keywords: ["初勘流程", "估價前", "決策順序", "判讀流程", "是否開工", "專案節點", "開工前"],
            nodeKind: "project",
            titleOverride: "專案節點：初勘至開工的決策沙盤推演",
          },
          {
            title: "案例解析",
            keywords: ["before after", "漏水", "結構老化", "血淚案例", "翻車案例", "案例解析"],
            nodeKind: "case",
            titleOverride: "案例解析：忽視漏水與結構老化的翻車代價",
          },
          {
            title: "迷思破解",
            keywords: ["初勘", "屋況判讀", "漏看", "風險訊號", "常見迷思", "判斷失準"],
            nodeKind: "qa",
            titleOverride: "屋況初勘：你最容易漏看的 5 個風險訊號",
          },
        ],
      },
      {
        title: "預算拆解",
        keywords: ["預算", "費用", "報價", "單價", "怎麼抓", "追加", "取捨"],
        subchapters: [
          {
            title: "預算分級",
            keywords: ["預算", "費用", "多少錢", "怎麼抓", "抓多少", "天地壁", "家具"],
            nodeKind: "core",
            titleOverride: "預算分級：客廳天地壁與家具的費用拆解",
          },
          {
            title: "報價拆讀",
            keywords: ["報價", "單價", "估價", "報價單", "費用拆解"],
            nodeKind: "core",
            titleOverride: "報價拆讀：全室預算拆解與避險指南",
          },
          {
            title: "追加風險",
            keywords: ["追加", "超支", "爆預算", "變更多", "加價"],
            nodeKind: "core",
            titleOverride: "追加風險：變更、漏項與超支的預防策略",
          },
          {
            title: "案例解析",
            keywords: ["超支", "報價單", "漏項", "追加失控", "翻車案例", "案例解析"],
            nodeKind: "case",
            titleOverride: "超支翻車：報價單沒拆細項的追加失控實錄",
          },
          {
            title: "迷思破解",
            keywords: ["低總價", "省錢", "漏項", "報價迷思", "常見迷思"],
            nodeKind: "qa",
            titleOverride: "低總價陷阱：看似省錢其實最容易漏項的報價判讀",
          },
          {
            title: "實戰表單",
            keywords: ["預算表", "比例試算", "試算表", "表單", "分配比例"],
            nodeKind: "form",
            titleOverride: "預算分配：全室比例試算與付款節奏表",
            assetSlotLabel: "全室預算分配比例試算表",
          },
          {
            title: "發包合約",
            keywords: ["發包", "工班", "合約", "責任界線", "付款條款", "報價比較"],
            nodeKind: "core",
            titleOverride: "發包合約：工班比價、責任界線與付款條款",
          },
          {
            title: "合約檢核",
            keywords: ["合約", "檢核", "工班比價", "付款節點", "責任範圍", "表單"],
            nodeKind: "form",
            titleOverride: "合約檢核：工班報價比較與責任條款確認表",
            assetSlotLabel: "工班報價比較與責任條款確認表",
          },
        ],
      },
      {
        title: "基礎工程",
        keywords: ["天花板", "輕鋼架", "地板", "磁磚", "水電", "泥作", "拆除", "工法"],
        subchapters: [
          {
            title: "拆除泥作",
            keywords: ["拆除", "泥作", "砌牆", "打底"],
            nodeKind: "core",
            titleOverride: "拆除泥作：老屋翻新基礎工程的施作順序與驗收重點",
          },
          {
            title: "水電更新",
            keywords: ["水電", "配線", "配管", "電路", "管線"],
            nodeKind: "core",
            titleOverride: "水電更新：老屋基礎工程的迴路重整與用電安全",
          },
          {
            title: "防水地坪",
            keywords: ["防水", "地坪", "找平", "浴室", "漏水"],
            nodeKind: "core",
            titleOverride: "防水地坪：老屋防水修復與地坪施作基準",
          },
          {
            title: "迷思破解",
            keywords: ["qa", "迷思", "管線一定要全換", "預算黑洞", "常見問題"],
            nodeKind: "qa",
            titleOverride: "管線重做：哪些必須全換，哪些其實該先判讀",
          },
          {
            title: "案例解析",
            keywords: ["返工", "拆除順序", "管線重拉", "施工翻車", "案例解析"],
            nodeKind: "case",
            titleOverride: "施工翻車：拆除與管線重拉順序錯置的返工代價",
          },
          {
            title: "實戰表單",
            keywords: ["進場前", "泥作", "水電", "檢核表", "進場檢查", "表單"],
            nodeKind: "form",
            titleOverride: "進場前檢核：泥作、水電與保護工程確認表",
            assetSlotLabel: "泥作水電進場前檢核表",
          },
          {
            title: "工序銜接",
            keywords: ["工序", "銜接", "介面", "交接", "進場順序", "表單"],
            nodeKind: "project",
            titleOverride: "工序銜接：泥作、水電、防水與木作的進場交接表",
            assetSlotLabel: "工序銜接表與介面交接清單",
          },
        ],
      },
      {
        title: "空間重整",
        keywords: ["客廳", "格局", "動線", "家具", "收納", "配置", "空間", "改造"],
        subchapters: [
          {
            title: "格局調整",
            keywords: ["格局", "隔間", "空間重整", "動線重整", "採光"],
            nodeKind: "core",
            titleOverride: "格局調整：結構、採光與動線的空間重整邏輯",
          },
          {
            title: "收納補強",
            keywords: ["收納", "櫃體", "儲物", "機能"],
            nodeKind: "core",
            titleOverride: "收納補強：老屋機能配置與櫃體整合策略",
          },
          {
            title: "家具配置",
            keywords: ["家具", "沙發", "餐桌", "床架", "配置"],
            nodeKind: "core",
            titleOverride: "家具配置：老屋尺度配置與起居動線校準",
          },
          {
            title: "實戰表單",
            keywords: ["系統櫃", "配件", "清單", "規格確認", "表單"],
            nodeKind: "form",
            titleOverride: "實戰表單：系統櫃配件清單與規格確認表",
            assetSlotLabel: "系統櫃配件清單與規格確認表",
          },
          {
            title: "整理計畫",
            keywords: ["整理", "收納整理", "組織", "專案", "演練"],
            nodeKind: "project",
            titleOverride: "收納組織：全室物品分區、回位與補貨演練",
            assetSlotLabel: "全室收納與組織的實際演練",
          },
          {
            title: "案例解析",
            keywords: ["格局重整", "採光回正", "動線回正", "收納改善", "案例解析"],
            nodeKind: "case",
            titleOverride: "採光回正：格局重整後的收納與動線修正紀錄",
          },
          {
            title: "迷思破解",
            keywords: ["收納做滿", "櫃體深度", "動線取捨", "常見迷思", "機能過量"],
            nodeKind: "qa",
            titleOverride: "櫃體動線：收納做滿不等於好住的取捨邏輯",
          },
        ],
      },
      {
        title: "完工避雷",
        keywords: ["驗收", "完工", "缺失", "避雷", "糾紛", "保固"],
        subchapters: [
          {
            title: "驗收重點",
            keywords: ["驗收", "完工", "缺失"],
            nodeKind: "core",
            titleOverride: "驗收重點：老屋完工檢核與缺失排查清單",
          },
          {
            title: "保固界線",
            keywords: ["保固", "責任", "保修"],
            nodeKind: "core",
            titleOverride: "保固界線：老屋修繕責任與保固邊界",
          },
          {
            title: "糾紛預防",
            keywords: ["糾紛", "避雷", "爭議", "扯皮"],
            nodeKind: "core",
            titleOverride: "糾紛預防：老屋裝修爭議的溝通節點與證據留存",
          },
          {
            title: "案例解析",
            keywords: ["成功下莊", "點交", "保固期", "糾紛化解", "案例解析"],
            nodeKind: "case",
            titleOverride: "成功下莊：點交與保固期的糾紛化解實錄",
          },
          {
            title: "迷思破解",
            keywords: ["保固不是萬靈丹", "點交責任", "責任邊界", "常見迷思", "完工迷思"],
            nodeKind: "qa",
            titleOverride: "點交責任：保固不是萬靈丹的邊界與證據留存",
          },
          {
            title: "點交流程",
            keywords: ["點交流程", "複驗", "保固起算", "追蹤表", "修繕追蹤"],
            nodeKind: "project",
            titleOverride: "點交流程：複驗、保固起算與修繕追蹤表",
            assetSlotLabel: "點交與保固追蹤表",
          },
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
  const subchapterPlan = getTrackPlan(trackTitle)?.chapters
    .find((chapter) => chapter.title === chapterTitle)
    ?.subchapters.find((subchapter) => subchapter.title === subchapterTitle);
  if (subchapterPlan?.titleOverride) {
    return subchapterPlan.titleOverride;
  }
  const overrides: Record<string, string> = {
    [`${publishingFocusTrackTitle}|預算拆解|報價拆讀`]: "報價拆讀：全室預算拆解與避險指南",
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
  if (trackTitle === publishingFocusTrackTitle) {
    return [];
  }
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

function getOldHouseFallbackCandidateConfig(chapterTitle = "") {
  const configMap: Record<string, { chapterTitle: string; subchapterTitle: string; category: string }> = {
    "現況判讀": {
      chapterTitle: "現況判讀",
      subchapterTitle: "翻新起手式",
      category: "老屋翻新",
    },
    "預算拆解": {
      chapterTitle: "預算拆解",
      subchapterTitle: "追加風險",
      category: "裝修預算",
    },
    "基礎工程": {
      chapterTitle: "基礎工程",
      subchapterTitle: "實戰表單",
      category: "老屋翻新",
    },
    "空間重整": {
      chapterTitle: "空間重整",
      subchapterTitle: "收納補強",
      category: "收納機能",
    },
    "完工避雷": {
      chapterTitle: "完工避雷",
      subchapterTitle: "保固界線",
      category: "老屋翻新",
    },
  };
  return configMap[chapterTitle] || configMap["空間重整"];
}

function getOldHouseRecommendationPriorityBoost(
  chapterTitle: string,
  subchapterTitle: string,
  nodeKind: PublicationNodeKind,
) {
  const chapterBoostMap: Record<string, number> = {
    "現況判讀": 120,
    "預算拆解": 88,
    "基礎工程": 30,
    "空間重整": 18,
    "完工避雷": 16,
  };
  const chapterSubchapterBoostMap: Record<string, number> = {
    "現況判讀::翻新起手式": 360,
    "現況判讀::實戰表單": 260,
    "現況判讀::專案節點": 154,
    "預算拆解::發包合約": 188,
    "預算拆解::合約檢核": -120,
    "預算拆解::報價拆讀": 104,
    "預算拆解::追加風險": 118,
    "基礎工程::實戰表單": 48,
    "基礎工程::工序銜接": 116,
  };
  const nodeKindBoostMap: Record<PublicationNodeKind, number> = {
    core: 0,
    case: 18,
    qa: 14,
    form: 36,
    project: 32,
  };
  return (
    (chapterBoostMap[chapterTitle] || 0) +
    (chapterSubchapterBoostMap[`${chapterTitle}::${subchapterTitle}`] || 0) +
    (nodeKindBoostMap[nodeKind] || 0)
  );
}

function isEntryPendingMerge(entry: BookshelfEntry) {
  const mergeDirective = getPublicationMergeDirective(entry.trackTitle, entry.chapter);
  return Boolean(mergeDirective?.sourceTitles.includes(entry.title));
}

function getEffectiveTrackEntries(trackEntries: BookshelfEntry[]) {
  return trackEntries.filter((entry) => !isEntryPendingMerge(entry));
}

function getChapterCompletionRateFromEntries(
  trackTitle: string,
  chapterTitle: string,
  trackEntries: BookshelfEntry[],
) {
  const chapterPlan = getTrackPlan(trackTitle)?.chapters.find((chapter) => chapter.title === chapterTitle);
  if (!chapterPlan) return 0;
  const total = chapterPlan.subchapters.length || 1;
  const completed = chapterPlan.subchapters.filter((subchapter) => (
    trackEntries.some((entry) => entry.chapter === chapterTitle && entry.subchapter === subchapter.title)
  )).length;
  return Math.round((completed / total) * 100);
}

function getEffectiveChapterCompletionRateFromEntries(
  trackTitle: string,
  chapterTitle: string,
  trackEntries: BookshelfEntry[],
) {
  return getChapterCompletionRateFromEntries(trackTitle, chapterTitle, getEffectiveTrackEntries(trackEntries));
}

function isCandidateBlockedByChronology(
  trackTitle: string,
  chapterTitle: string,
  trackEntries: BookshelfEntry[],
) {
  if (trackTitle !== publishingFocusTrackTitle) return false;
  const chapterIndex = publicationChapterOrder.indexOf(chapterTitle as typeof publicationChapterOrder[number]);
  if (chapterIndex <= 0) return false;
  return publicationChapterOrder.some((orderedChapter, orderedIndex) => (
    orderedIndex < chapterIndex &&
    getEffectiveChapterCompletionRateFromEntries(trackTitle, orderedChapter, trackEntries) < publicationChronologyMinCompletionRate
  ));
}

function isDeferredOldHouseCandidate(
  trackTitle: string,
  chapterTitle: string,
  subchapterTitle: string,
  trackEntries: BookshelfEntry[],
) {
  if (trackTitle !== publishingFocusTrackTitle) return false;
  if (chapterTitle !== "預算拆解" || subchapterTitle !== "合約檢核") return false;
  const hasContractCore = getEffectiveTrackEntries(trackEntries).some((entry) => (
    entry.chapter === "預算拆解" && entry.subchapter === "發包合約"
  ));
  return (
    !hasContractCore ||
    getEffectiveChapterCompletionRateFromEntries(trackTitle, "現況判讀", trackEntries) < publicationChronologyMinCompletionRate
  );
}

function getOldHouseTimelinePenalty(
  trackTitle: string,
  chapterTitle: string,
  nodeKind: PublicationNodeKind,
  trackEntries: BookshelfEntry[],
) {
  if (trackTitle !== publishingFocusTrackTitle) return 0;
  const chapterIndex = publicationChapterOrder.indexOf(chapterTitle as typeof publicationChapterOrder[number]);
  const effectiveEntries = getEffectiveTrackEntries(trackEntries);
  const diagnosisCount = effectiveEntries.filter((entry) => entry.chapter === "現況判讀").length;
  const budgetCount = effectiveEntries.filter((entry) => entry.chapter === "預算拆解").length;
  const foundationCount = effectiveEntries.filter((entry) => ["現況判讀", "預算拆解"].includes(entry.chapter)).length;
  let penalty = 0;
  const hasChronologyBlock = publicationChapterOrder.some((orderedChapter, orderedIndex) => (
    orderedIndex <= chapterIndex - 2 &&
    getEffectiveChapterCompletionRateFromEntries(trackTitle, orderedChapter, trackEntries) < publicationChronologyMinCompletionRate
  ));
  if (hasChronologyBlock) {
    penalty += 880;
  }
  if (diagnosisCount === 0 && chapterIndex >= 3 && (nodeKind === "form" || nodeKind === "project")) {
    penalty += 260;
  }
  if (foundationCount <= 1 && chapterTitle === "空間重整" && nodeKind === "form") {
    penalty += 140;
  }
  if (budgetCount === 0 && chapterTitle === "基礎工程" && nodeKind === "project") {
    penalty += 90;
  }
  return penalty;
}

function isProcessKnowledgeSubchapter(trackTitle = "", chapterTitle = "", subchapterTitle = "") {
  const plan = getSubchapterPlan(trackTitle, chapterTitle, subchapterTitle);
  if (plan?.nodeKind === "project") return true;
  const text = `${chapterTitle} ${subchapterTitle} ${plan?.titleOverride || ""}`;
  return ["流程", "工序", "發包", "合約", "介面", "點交"].some((keyword) => text.includes(keyword));
}

function getIncompleteCoreBoost(
  trackTitle: string,
  chapterTitle: string,
  subchapterTitle: string,
  chapterEntries: BookshelfEntry[],
) {
  const candidatePlan = getSubchapterPlan(trackTitle, chapterTitle, subchapterTitle);
  if (!candidatePlan) return 0;
  const entryPlans = chapterEntries
    .map((entry) => getSubchapterPlan(trackTitle, chapterTitle, entry.subchapter))
    .filter((plan): plan is NonNullable<typeof plan> => Boolean(plan));
  const hasTheory = entryPlans.some((plan) => plan.nodeKind === "core");
  const hasToolForm = entryPlans.some((plan) => plan.nodeKind === "form");
  const hasProcess = chapterEntries.some((entry) => isProcessKnowledgeSubchapter(trackTitle, chapterTitle, entry.subchapter));
  const candidateIsTheory = candidatePlan.nodeKind === "core";
  const candidateIsToolForm = candidatePlan.nodeKind === "form";
  const candidateIsProcess = isProcessKnowledgeSubchapter(trackTitle, chapterTitle, subchapterTitle);
  let boost = 0;
  if (!hasTheory && candidateIsTheory) boost += 50;
  if (!hasToolForm && candidateIsToolForm) boost += 50;
  if (!hasProcess && candidateIsProcess) boost += 50;
  return boost;
}

function hasHandledChapterNodeKind(
  trackTitle: string,
  chapterTitle: string,
  nodeKind: PublicationNodeKind,
  chapterEntries: BookshelfEntry[],
  rawTrackEntries: BookshelfEntry[],
) {
  const hasPublishedNode = nodeKind === "project"
    ? chapterEntries.some((entry) => isProcessKnowledgeSubchapter(trackTitle, chapterTitle, entry.subchapter))
    : chapterEntries.some((entry) => getSubchapterPlan(trackTitle, chapterTitle, entry.subchapter)?.nodeKind === nodeKind);
  if (hasPublishedNode) return true;
  const mergeDirective = getPublicationMergeDirective(trackTitle, chapterTitle);
  if (!mergeDirective) return false;
  const targetPlan = getSubchapterPlan(trackTitle, chapterTitle, mergeDirective.targetSubchapter);
  if (!targetPlan || targetPlan.nodeKind !== nodeKind) return false;
  return rawTrackEntries
    .filter((entry) => entry.chapter === chapterTitle && entry.subchapter === mergeDirective.targetSubchapter)
    .some((entry) => mergeDirective.sourceTitles.includes(entry.title));
}

function getIntraChapterSequencePenalty(
  trackTitle: string,
  chapterTitle: string,
  subchapterTitle: string,
  chapterEntries: BookshelfEntry[],
  rawTrackEntries: BookshelfEntry[],
) {
  const candidatePlan = getSubchapterPlan(trackTitle, chapterTitle, subchapterTitle);
  if (!candidatePlan) return 0;
  const hasTheory = hasHandledChapterNodeKind(trackTitle, chapterTitle, "core", chapterEntries, rawTrackEntries);
  const hasForm = hasHandledChapterNodeKind(trackTitle, chapterTitle, "form", chapterEntries, rawTrackEntries);
  const hasProcess = hasHandledChapterNodeKind(trackTitle, chapterTitle, "project", chapterEntries, rawTrackEntries);
  if (candidatePlan.nodeKind === "form") {
    return hasTheory ? 0 : 260;
  }
  if (candidatePlan.nodeKind === "project") {
    return hasForm ? 0 : 560;
  }
  if (candidatePlan.nodeKind === "case") {
    return hasProcess ? 0 : 780;
  }
  if (candidatePlan.nodeKind === "qa") {
    return hasForm ? 0 : 240;
  }
  return 0;
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
  const subchapterPlan = getTrackPlan(trackTitle)?.chapters
    .find((chapter) => chapter.title === chapterTitle)
    ?.subchapters.find((subchapter) => subchapter.title === subchapterTitle);
  const mergeDirective = getPublicationMergeDirective(trackTitle, chapterTitle);
  const hasPublishedEntry = entries.some((entry) => (
    entry.trackTitle === trackTitle &&
    entry.chapter === chapterTitle &&
    entry.subchapter === subchapterTitle
  ));
  const topSemanticScore = buildSimilarArticleMatches(entries, trackTitle, chapterTitle, subchapterTitle)[0]?.score || 0;
  const collisionMergeNeeded = !hasPublishedEntry && topSemanticScore >= 60;
  const mergeNeeded = Boolean(
    mergeDirective &&
    mergeDirective.targetSubchapter === subchapterTitle &&
    mergeDirective.sourceTitles.length > 0
  );
  const isRecommended = recommendedTopic?.subchapter === subchapterTitle;
  const status: PublicationTitlePoolItem["status"] = mergeNeeded || collisionMergeNeeded
    ? "merge_needed"
    : hasPublishedEntry
      ? "published"
      : "pending";
  const nodeKind = subchapterPlan?.nodeKind || "core";
  const confidence: PublicationTitlePoolItem["confidence"] = isRecommended
    ? "high"
    : mergeNeeded
      ? "high"
      : hasPublishedEntry
        ? "medium"
        : "medium";
  const workflowAction: PublicationTitlePoolItem["workflowAction"] = mergeNeeded || collisionMergeNeeded
    ? "Merge_and_Update"
    : topSemanticScore > 35
      ? "Revise_Angle"
      : "New_Publish";
  const statusTag = mergeNeeded
    ? "整併執行中"
    : collisionMergeNeeded
      ? "需整併舊文"
    : hasPublishedEntry
      ? "已上線"
      : nodeKind === "case"
        ? "待補_案例"
        : nodeKind === "qa"
          ? "待補_QA"
          : nodeKind === "form"
            ? "待補_表單"
            : nodeKind === "project"
              ? "待補_專案"
              : "待補_正規";
  const note = mergeNeeded
    ? mergeDirective?.note || "此子章目前應先整併既有文章，不建議另開新標題。"
    : collisionMergeNeeded
      ? "此子章與既有文章的核心解法重疊度過高，應先整併舊文或改切角，不建議直接發布。"
    : hasPublishedEntry
      ? "此子章已有已上線文章，標題池保留作為整體出版視角參考。"
      : isRecommended
        ? "這是目前系統最推薦優先補位的標題。"
        : nodeKind === "form" || nodeKind === "project"
          ? "這是可掛載實體資產的節點，後續可綁定試算表、PDF 或專案附件。"
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
    nodeKind,
    statusTag,
    workflowAction,
    assetSlotLabel: subchapterPlan?.assetSlotLabel,
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

function getSubchapterPlan(trackTitle = "", chapterTitle = "", subchapterTitle = "") {
  return getTrackPlan(trackTitle)?.chapters
    .find((chapter) => chapter.title === chapterTitle)
    ?.subchapters.find((subchapter) => subchapter.title === subchapterTitle) || null;
}

export function getPublicationBookProposal(trackTitle = "") {
  return publicationBookProposalOverrides[trackTitle] || {
    trackTitle,
    bookTitle: resolveTrackRootLabel(trackTitle) || trackTitle || "未命名出版企劃",
    subtitle: `${resolveTrackRootLabel(trackTitle) || trackTitle}的章節化出版規劃`,
    positioning: "以既有文章骨架為基礎，持續補齊章節、標題池與出版閉環。",
  };
}

export function hasCrossSeriesForbiddenKeyword(...values: string[]) {
  const text = values.join(" ").replace(/\s+/g, "");
  return crossSeriesForbiddenKeywords.some((keyword) => text.includes(keyword));
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

function isMountedFormDuplicate(
  trackTitle: string,
  chapterTitle: string,
  subchapterTitle: string,
  entry: BookshelfEntry,
) {
  const candidatePlan = getSubchapterPlan(trackTitle, chapterTitle, subchapterTitle);
  const entryPlan = getSubchapterPlan(entry.trackTitle, entry.chapter, entry.subchapter);
  if (candidatePlan?.nodeKind !== "form" || entryPlan?.nodeKind !== "form") {
    return false;
  }
  const candidateText = normalizeSemanticText(
    candidatePlan.titleOverride || "",
    candidatePlan.assetSlotLabel || "",
    candidatePlan.title || "",
    ...(candidatePlan.keywords || []),
  );
  const entryText = normalizeSemanticText(
    entry.title || "",
    entryPlan.titleOverride || "",
    entryPlan.assetSlotLabel || "",
    entryPlan.title || "",
    ...(entryPlan.keywords || []),
  );
  const duplicateAnchors = ["系統櫃", "五金", "收納", "配件", "抽屜", "模組", "規格"];
  const sharedAnchors = duplicateAnchors.filter((keyword) => candidateText.includes(keyword) && entryText.includes(keyword));
  const candidateAsset = normalizeSemanticText(candidatePlan.assetSlotLabel || "");
  const entryAsset = normalizeSemanticText(entryPlan.assetSlotLabel || "");
  return Boolean(
    (candidateAsset && entryAsset && candidateAsset === entryAsset) ||
    sharedAnchors.length >= 3
  );
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

  if (isMountedFormDuplicate(trackTitle, chapterTitle, subchapterTitle, entry)) {
    return 92;
  }

  // 同書系與同章節只能作為「需要人工覆核」的弱訊號，不能直接把不同解法題目打成高撞題。
  const sameTrackBoost = entry.trackTitle === trackTitle ? 8 : 0;
  const sameChapterBoost = entry.chapter === chapterTitle ? 8 : 0;
  const sameSubchapterBoost = entry.subchapter === subchapterTitle ? 24 : 0;
  const sameChapterCap = entry.chapter === chapterTitle && entry.subchapter !== subchapterTitle
    ? 59
    : 100;

  return Math.min(sameChapterCap, termScore + sameTrackBoost + sameChapterBoost + sameSubchapterBoost);
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
  if (isMountedFormDuplicate(entry.trackTitle, chapterTitle, subchapterTitle, entry)) {
    return "這組表單與掛載資產高度重複，應合併為同一份附錄工具，不宜拆成兩篇新題。";
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
    const trackEntries = getEffectiveTrackEntries(entries.filter((entry) => entry.trackTitle === track.title));
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
    const trackEntries = getEffectiveTrackEntries(entries.filter((entry) => entry.trackTitle === track.title));
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
  const topSimilarArticle = similarArticles[0] || null;
  const topSimilarEntry = topSimilarArticle
    ? entries.find((entry) => (
      entry.trackTitle === candidate.trackTitle &&
      entry.chapter === topSimilarArticle.chapter &&
      entry.subchapter === topSimilarArticle.subchapter &&
      entry.title === topSimilarArticle.title
    )) || null
    : null;
  const duplicateFormAssetTriggered = Boolean(
    topSimilarEntry &&
    isMountedFormDuplicate(candidate.trackTitle, candidate.chapter, candidate.subchapter, topSimilarEntry),
  );
  const canBeHighRisk = Boolean(
    mergeTriggered ||
    duplicateFormAssetTriggered ||
    topSimilarArticle?.subchapter === candidate.subchapter,
  );
  const collisionRisk: NextTopicRecommendation["collisionRisk"] = canBeHighRisk && topSemanticScore >= 60
    ? "high"
    : topSemanticScore >= 35
      ? "medium"
      : "low";
  const collisionReason = mergeTriggered
    ? mergeDirective?.note || "這個主題已與既有文章形成整併關係，較適合合併而非另開新題。"
    : duplicateFormAssetTriggered
      ? "這組實戰表單與既有掛載資產高度重複，應直接併入同一份工具資產，不宜拆成兩篇送審。"
    : collisionRisk === "high"
      ? "核心解法與既有文章重疊度超過 60%，應優先改子章節或直接整併舊文。"
      : collisionRisk === "medium"
        ? "目前僅屬語意相近或同章相鄰主題，建議交由 LLM 或人工覆核是否真的撞題。"
        : "目前未發現明顯語意撞題，可優先補齊此缺口。";
  const actionHint = mergeTriggered
    ? "Merge_and_Update｜先整併舊文"
    : duplicateFormAssetTriggered
      ? "Merge_and_Update｜先整併同資產表單"
    : collisionRisk === "high"
      ? "Merge_and_Update｜先整併舊文"
      : collisionRisk === "medium"
        ? "Revise_Angle｜需拉開差異"
        : "New_Publish｜可直接推進";
  const workflowAction: NextTopicRecommendation["workflowAction"] = mergeTriggered || duplicateFormAssetTriggered || (topSimilarArticle?.subchapter === candidate.subchapter && topSemanticScore > 50)
    ? "Merge_and_Update"
    : collisionRisk === "medium"
      ? "Revise_Angle"
      : "New_Publish";
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
    workflowAction,
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

  const strictIsolation = focusTrackTitle === publishingFocusTrackTitle;
  const candidates = bookshelfTrackPlans.flatMap((track) =>
    (strictIsolation && track.title !== focusTrackTitle ? [] :
    (filters.trackTitle && track.title !== filters.trackTitle ? [] : track.chapters).flatMap((chapter) =>
      (filters.chapterTitle && chapter.title !== filters.chapterTitle ? [] : chapter.subchapters).map((subchapter) => {
        const rawTrackEntries = entries.filter((entry) => entry.trackTitle === track.title);
        const trackEntries = getEffectiveTrackEntries(rawTrackEntries);
        const chapterEntries = trackEntries.filter((entry) => entry.chapter === chapter.title);
        const subchapterEntries = chapterEntries.filter((entry) => entry.subchapter === subchapter.title);
        const mergeDirective = getPublicationMergeDirective(track.title, chapter.title);
        const missingSubchapterCount = chapter.subchapters.filter((child) => (
          !chapterEntries.some((entry) => entry.subchapter === child.title)
        )).length;
        const allowCoveredMergeCandidate = Boolean(
          mergeDirective?.targetSubchapter === subchapter.title &&
          rawTrackEntries
            .filter((entry) => entry.chapter === chapter.title && entry.subchapter === subchapter.title)
            .some((entry) => mergeDirective.sourceTitles.includes(entry.title)),
        );
        if (subchapterEntries.length > 0 && missingSubchapterCount > 0 && !allowCoveredMergeCandidate) {
          return null;
        }
        if (isCandidateBlockedByChronology(track.title, chapter.title, rawTrackEntries)) {
          return null;
        }
        if (isDeferredOldHouseCandidate(track.title, chapter.title, subchapter.title, rawTrackEntries)) {
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
        const subchapterPlan = chapter.subchapters.find((item) => item.title === subchapter.title);
        const nodeKind = subchapterPlan?.nodeKind || "core";
        const titleSet = getTopicTitleSet(track.title, chapter.title, subchapter.title);
        if (strictIsolation && hasCrossSeriesForbiddenKeyword(titleSet.webTitle, titleSet.backupTitles.join(" "))) {
          return null;
        }
        const topSemanticScore = buildSimilarArticleMatches(entries, track.title, chapter.title, subchapter.title)[0]?.score || 0;
        const collisionPenalty = subchapterEntries.length > 0
          ? 90
          : topSemanticScore >= 60
            ? 240
            : topSemanticScore >= 35
              ? 76
              : 0;
        const oldHousePriorityBoost = track.title === publishingFocusTrackTitle
          ? getOldHouseRecommendationPriorityBoost(chapter.title, subchapter.title, nodeKind)
          : 0;
        const incompleteCoreBoost = track.title === publishingFocusTrackTitle
          ? getIncompleteCoreBoost(track.title, chapter.title, subchapter.title, chapterEntries)
          : 0;
        const intraChapterSequencePenalty = getIntraChapterSequencePenalty(
          track.title,
          chapter.title,
          subchapter.title,
          chapterEntries,
          rawTrackEntries,
        );
        const mergeTargetBoost = allowCoveredMergeCandidate ? 320 : 0;
        const timelinePenalty = getOldHouseTimelinePenalty(track.title, chapter.title, nodeKind, trackEntries);
        const score =
          focusBoost +
          emptyChapterBoost +
          emptySubchapterBoost +
          trackCoverageBoost +
          seededSubchapterBoost +
          multiTrackDiversityBoost +
          structuralVacuumBoost +
          mergeTargetBoost +
          oldHousePriorityBoost +
          incompleteCoreBoost +
          macroPriorityBoost -
          recentPenalty -
          intraChapterSequencePenalty -
          timelinePenalty -
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
    )),
  );

  return candidates
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate))
    .sort((left, right) => right.score - left.score);
}

function buildForcedFallbackCandidate(
  entries: BookshelfEntry[],
  focusTrackTitle: string,
  mode: PublishingTopicMode,
  fallbackConfig = getOldHouseFallbackCandidateConfig(),
) {
  if (focusTrackTitle !== publishingFocusTrackTitle) return null;
  const {
    chapterTitle: fallbackChapterTitle,
    subchapterTitle: fallbackSubchapterTitle,
    category: fallbackCategory,
  } = fallbackConfig;
  const fallbackTrackTitle = publishingFocusTrackTitle;
  const track = getTrackPlan(fallbackTrackTitle);
  const chapter = track?.chapters.find((item) => item.title === fallbackChapterTitle);
  const subchapter = chapter?.subchapters.find((item) => item.title === fallbackSubchapterTitle);
  if (!track || !chapter || !subchapter) return null;

  const trackEntries = getEffectiveTrackEntries(entries.filter((entry) => entry.trackTitle === fallbackTrackTitle));
  const chapterEntries = trackEntries.filter((entry) => entry.chapter === fallbackChapterTitle);
  const subchapterEntries = chapterEntries.filter((entry) => entry.subchapter === fallbackSubchapterTitle);
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

  return buildRecommendationFromCandidate(
    entries,
    {
      trackTitle: fallbackTrackTitle,
      chapter: fallbackChapterTitle,
      subchapter: fallbackSubchapterTitle,
      category: fallbackCategory,
      articleCountInTrack: trackEntries.length,
      articleCountInChapter: chapterEntries.length,
      articleCountInSubchapter: subchapterEntries.length,
      coverageBefore,
      coverageAfter,
    },
    focusTrackTitle,
    mode,
  );
}

function getChapterRecommendedTopicFromEntries(
  entries: BookshelfEntry[],
  trackTitle: string,
  chapterTitle: string,
  focusTrackTitle = publishingFocusTrackTitle,
  mode: PublishingTopicMode = "publishing",
) {
  const best = buildRecommendationCandidates(entries, focusTrackTitle, mode, { trackTitle, chapterTitle })[0];
  if (!best) {
    return trackTitle === publishingFocusTrackTitle
      ? buildForcedFallbackCandidate(entries, focusTrackTitle, mode, getOldHouseFallbackCandidateConfig(chapterTitle))
      : null;
  }
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
  if (!best) {
    return trackTitle === publishingFocusTrackTitle
      ? buildForcedFallbackCandidate(entries, focusTrackTitle, mode)
      : null;
  }
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
  const recommendations = buildRecommendationCandidates(entries, focusTrackTitle, mode)
    .slice(0, Math.max(1, limit))
    .map((candidate) => buildRecommendationFromCandidate(entries, candidate, focusTrackTitle, mode));
  if (recommendations.length) return recommendations;
  const fallback = buildForcedFallbackCandidate(entries, focusTrackTitle, mode);
  return fallback ? [fallback] : [];
}

export function getNextRecommendedTopic(
  posts: PublishingCatalogPost[] = [],
  focusTrackTitle = publishingFocusTrackTitle,
  mode: PublishingTopicMode = "publishing",
): NextTopicRecommendation | null {
  const entries = buildBookshelfEntries(posts);
  const best = buildRecommendationCandidates(entries, focusTrackTitle, mode)[0];
  if (!best) return buildForcedFallbackCandidate(entries, focusTrackTitle, mode);
  return buildRecommendationFromCandidate(entries, best, focusTrackTitle, mode);
}

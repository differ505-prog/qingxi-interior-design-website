export type QuoteCategory = {
  id: string;
  label: string;
};

export type QuoteTemplateItem = {
  id: string;
  categoryId: string;
  name: string;
  unit: string;
  defaultUnitPrice: number;
  defaultQuantity: number;
  description: string;
};

export const quoteCategories: QuoteCategory[] = [
  { id: "preparation", label: "保護與拆除" },
  { id: "electrical", label: "水電工程" },
  { id: "masonry", label: "泥作與防水" },
  { id: "finish", label: "表面與天花" },
  { id: "cabinet", label: "櫃體與木作" },
  { id: "smart-home", label: "智能家居" },
];

export const quoteTemplateItems: QuoteTemplateItem[] = [
  {
    id: "protection-basic",
    categoryId: "preparation",
    name: "基礎保護工程",
    unit: "式",
    defaultUnitPrice: 12000,
    defaultQuantity: 1,
    description: "施工前地坪、電梯與公共區保護。",
  },
  {
    id: "demolition-basic",
    categoryId: "preparation",
    name: "拆除清運",
    unit: "式",
    defaultUnitPrice: 25000,
    defaultQuantity: 1,
    description: "含基礎拆除與清運費用。",
  },
  {
    id: "electrical-circuit",
    categoryId: "electrical",
    name: "新增迴路",
    unit: "迴路",
    defaultUnitPrice: 4800,
    defaultQuantity: 1,
    description: "新增配電回路與線材整理。",
  },
  {
    id: "electrical-outlet",
    categoryId: "electrical",
    name: "新增插座",
    unit: "處",
    defaultUnitPrice: 1200,
    defaultQuantity: 1,
    description: "新增一般插座點位。",
  },
  {
    id: "electrical-switch-move",
    categoryId: "electrical",
    name: "開關移位",
    unit: "處",
    defaultUnitPrice: 900,
    defaultQuantity: 1,
    description: "含原開關位移與基礎整理。",
  },
  {
    id: "lighting-downlight",
    categoryId: "electrical",
    name: "崁燈安裝",
    unit: "盞",
    defaultUnitPrice: 1800,
    defaultQuantity: 1,
    description: "含線路配置與燈具安裝。",
  },
  {
    id: "bathroom-waterproof",
    categoryId: "masonry",
    name: "浴室防水更新",
    unit: "間",
    defaultUnitPrice: 28000,
    defaultQuantity: 1,
    description: "含基礎防水層施作。",
  },
  {
    id: "tiling-refresh",
    categoryId: "masonry",
    name: "牆地磚更新",
    unit: "坪",
    defaultUnitPrice: 4800,
    defaultQuantity: 1,
    description: "含貼磚工資與基礎材料。",
  },
  {
    id: "ceiling-flat",
    categoryId: "finish",
    name: "平釘天花",
    unit: "坪",
    defaultUnitPrice: 3200,
    defaultQuantity: 1,
    description: "含角材、板材與批土處理。",
  },
  {
    id: "painting-full",
    categoryId: "finish",
    name: "全室油漆",
    unit: "坪",
    defaultUnitPrice: 2200,
    defaultQuantity: 1,
    description: "含批土、打磨與面漆。",
  },
  {
    id: "floor-spc",
    categoryId: "finish",
    name: "SPC 地板",
    unit: "坪",
    defaultUnitPrice: 3800,
    defaultQuantity: 1,
    description: "含地坪整平與基礎收邊。",
  },
  {
    id: "system-cabinet",
    categoryId: "cabinet",
    name: "系統櫃",
    unit: "尺",
    defaultUnitPrice: 8500,
    defaultQuantity: 1,
    description: "含板材、五金與安裝。",
  },
  {
    id: "woodwork-cabinet",
    categoryId: "cabinet",
    name: "木作收納櫃",
    unit: "尺",
    defaultUnitPrice: 12000,
    defaultQuantity: 1,
    description: "含木作結構、表面處理與安裝。",
  },
  {
    id: "tv-wall",
    categoryId: "cabinet",
    name: "電視牆立面",
    unit: "式",
    defaultUnitPrice: 38000,
    defaultQuantity: 1,
    description: "含立面包覆與細部收邊。",
  },
  {
    id: "smart-home-basic",
    categoryId: "smart-home",
    name: "智能家居基礎整合",
    unit: "式",
    defaultUnitPrice: 48000,
    defaultQuantity: 1,
    description: "含燈光、窗簾與空調基礎整合。",
  },
];

export const quoteDefaultTerms = [
  "本報價為現階段初估，實際金額仍會依現場丈量、材料確認與施工條件微調。",
  "未列項目、特殊保護、特殊搬運、額外加班與大樓管委會相關費用，將另行說明。",
  "若後續有新增工項、材料升級或施工條件變動，會先提供調整內容再確認。",
  "正式開工前會再提供最終版報價與施工安排。",
];

export const quoteInvoiceNotice = {
  title: "稅務與開立發票說明",
  paragraphs: [
    "本工作室目前為個人承攬型態，為替業主節省非必要之稅務管銷成本，本報價單所列金額皆為未稅現金價。完工後將開立具備負責人身分證字號之個人勞務報酬收據，作為合法付款證明。",
    "若業主因報帳需求，確實需要開立統一發票，本工作室可協助委託合作之建材商或工班代為開立。惟依稅法規定，需另行加收 8% 之營業稅與代辦手續費。此稅額費用不包含於本報價單總價內，將於簽約時另行計算。",
  ],
};

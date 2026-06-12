export type QuoteCategory = {
  id: string;
  label: string;
};

export type QuoteTemplateItem = {
  id: string;
  categoryId: string;
  name: string;
  unit: string;
  pricingBasis: string;
  defaultUnitPrice: number;
  defaultQuantity: number;
  description: string;
};

export type QuoteOption = {
  value: string;
  label: string;
  multiplier: number;
  note: string;
};

export type QuoteChoice = {
  value: string;
  label: string;
  note: string;
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
    pricingBasis: "依案場規模與公共區保護範圍計",
    defaultUnitPrice: 12000,
    defaultQuantity: 1,
    description: "施工前地坪、電梯與公共區保護。",
  },
  {
    id: "demolition-basic",
    categoryId: "preparation",
    name: "拆除清運",
    unit: "式",
    pricingBasis: "依拆除範圍與清運量計",
    defaultUnitPrice: 25000,
    defaultQuantity: 1,
    description: "含基礎拆除與清運費用。",
  },
  {
    id: "waste-bag",
    categoryId: "preparation",
    name: "垃圾清運袋裝",
    unit: "車",
    pricingBasis: "依垃圾量與清運次數計",
    defaultUnitPrice: 8000,
    defaultQuantity: 1,
    description: "適用額外拆除廢棄物與二次清運。",
  },
  {
    id: "electrical-circuit",
    categoryId: "electrical",
    name: "新增迴路",
    unit: "迴路",
    pricingBasis: "依配電箱延伸與線路距離計",
    defaultUnitPrice: 4800,
    defaultQuantity: 1,
    description: "新增配電回路與線材整理。",
  },
  {
    id: "electrical-outlet",
    categoryId: "electrical",
    name: "新增插座",
    unit: "處",
    pricingBasis: "一般插座點位單價",
    defaultUnitPrice: 1200,
    defaultQuantity: 1,
    description: "新增一般插座點位。",
  },
  {
    id: "electrical-switch-move",
    categoryId: "electrical",
    name: "開關移位",
    unit: "處",
    pricingBasis: "含配線延伸與基礎收口",
    defaultUnitPrice: 900,
    defaultQuantity: 1,
    description: "含原開關位移與基礎收口，不含大面積批土與油漆復原。",
  },
  {
    id: "lighting-downlight",
    categoryId: "electrical",
    name: "崁燈安裝",
    unit: "盞",
    pricingBasis: "含基本配線與安裝工資",
    defaultUnitPrice: 1800,
    defaultQuantity: 1,
    description: "含線路配置與燈具安裝。",
  },
  {
    id: "weak-current",
    categoryId: "electrical",
    name: "弱電 / 網路點位",
    unit: "點",
    pricingBasis: "依每一點佈線與面板安裝計",
    defaultUnitPrice: 1800,
    defaultQuantity: 1,
    description: "適用網路、電視與監視器預留點位。",
  },
  {
    id: "water-piping",
    categoryId: "electrical",
    name: "冷熱水配管更新",
    unit: "式",
    pricingBasis: "依更新範圍與點位數量計",
    defaultUnitPrice: 18000,
    defaultQuantity: 1,
    description: "適用廚房、衛浴或局部冷熱水路更新。",
  },
  {
    id: "bathroom-waterproof",
    categoryId: "masonry",
    name: "浴室防水更新",
    unit: "間",
    pricingBasis: "依每間衛浴防水範圍計",
    defaultUnitPrice: 28000,
    defaultQuantity: 1,
    description: "含基礎防水層施作。",
  },
  {
    id: "tiling-refresh",
    categoryId: "masonry",
    name: "牆地磚更新",
    unit: "坪",
    pricingBasis: "依貼磚面積與磁磚規格計",
    defaultUnitPrice: 4800,
    defaultQuantity: 1,
    description: "含貼磚工資與基礎材料。",
  },
  {
    id: "drainage-relocation",
    categoryId: "masonry",
    name: "排水移位",
    unit: "處",
    pricingBasis: "依移位距離與地坪開挖難度計",
    defaultUnitPrice: 6500,
    defaultQuantity: 1,
    description: "常用於廚房、衛浴設備位置調整。",
  },
  {
    id: "ceiling-flat",
    categoryId: "finish",
    name: "平釘天花",
    unit: "坪",
    pricingBasis: "依天花面積與收邊複雜度計",
    defaultUnitPrice: 3200,
    defaultQuantity: 1,
    description: "含角材、板材與批土處理。",
  },
  {
    id: "painting-full",
    categoryId: "finish",
    name: "全室油漆",
    unit: "坪",
    pricingBasis: "依油漆面積與牆況修補量計",
    defaultUnitPrice: 2200,
    defaultQuantity: 1,
    description: "含批土、打磨與面漆。",
  },
  {
    id: "floor-spc",
    categoryId: "finish",
    name: "SPC 地板",
    unit: "坪",
    pricingBasis: "依鋪設面積與現場整平需求計",
    defaultUnitPrice: 3800,
    defaultQuantity: 1,
    description: "含地坪整平與基礎收邊。",
  },
  {
    id: "glass-partition",
    categoryId: "finish",
    name: "玻璃隔間 / 拉門",
    unit: "式",
    pricingBasis: "依玻璃尺寸與五金等級計",
    defaultUnitPrice: 32000,
    defaultQuantity: 1,
    description: "適用書房、浴室或彈性隔間。",
  },
  {
    id: "system-cabinet",
    categoryId: "cabinet",
    name: "系統櫃",
    unit: "尺",
    pricingBasis: "依每尺櫃體長度與標準五金配置計",
    defaultUnitPrice: 8500,
    defaultQuantity: 1,
    description: "含板材、標準五金與安裝，特殊配件另列。",
  },
  {
    id: "woodwork-cabinet",
    categoryId: "cabinet",
    name: "木作收納櫃",
    unit: "尺",
    pricingBasis: "依每尺櫃體長度與表面材質計",
    defaultUnitPrice: 12000,
    defaultQuantity: 1,
    description: "含木作結構、表面處理與安裝。",
  },
  {
    id: "tv-wall",
    categoryId: "cabinet",
    name: "電視牆立面",
    unit: "式",
    pricingBasis: "依立面尺寸與材質做法計",
    defaultUnitPrice: 38000,
    defaultQuantity: 1,
    description: "含立面包覆與細部收邊。",
  },
  {
    id: "entry-cabinet",
    categoryId: "cabinet",
    name: "玄關鞋櫃",
    unit: "式",
    pricingBasis: "依櫃體尺寸、門片與標準五金配置計",
    defaultUnitPrice: 26000,
    defaultQuantity: 1,
    description: "含鞋櫃、吊衣區或落塵區整合，特殊五金另列。",
  },
  {
    id: "smart-home-basic",
    categoryId: "smart-home",
    name: "智能家居基礎整合",
    unit: "式",
    pricingBasis: "依整合設備數量與控制情境計",
    defaultUnitPrice: 48000,
    defaultQuantity: 1,
    description: "含燈光、窗簾與空調基礎整合。",
  },
  {
    id: "smart-home-security",
    categoryId: "smart-home",
    name: "門鎖 / 感測 / 監控整合",
    unit: "式",
    pricingBasis: "依設備品牌、數量與串接需求計",
    defaultUnitPrice: 36000,
    defaultQuantity: 1,
    description: "適用智慧門鎖、感測器與監視器整合。",
  },
];

export const quoteDefaultTerms = [
  "本報價為現階段初估，實際金額仍會依現場丈量、材料確認與施工條件微調。",
  "本報價為局部或目前已確認項目的初步估價，若後續增加其他空間、設備或工程內容，會另行補充整體報價。",
  "若遇大樓管委會特殊規定、無電梯搬運、夜間施工或高規格公共區保護需求，會於開工前另行評估並說明。",
  "若後續有新增工項、材料升級或施工條件變動，會先提供調整內容再確認。",
  "正式開工前會再提供最終版報價與施工安排。",
];

export const quoteMaterialLevelOptions: QuoteOption[] = [
  {
    value: "basic",
    label: "標準實用",
    multiplier: 1,
    note: "以常用規格與實用型材料為主。",
  },
  {
    value: "refined",
    label: "進階升級",
    multiplier: 1.08,
    note: "部分材料、五金與表面處理升級。",
  },
  {
    value: "premium",
    label: "高階精緻",
    multiplier: 1.18,
    note: "櫃體、五金、設備與表面材質整體升級。",
  },
];

export const quoteDifficultyOptions: QuoteOption[] = [
  {
    value: "standard",
    label: "一般施工",
    multiplier: 1,
    note: "新成屋或條件單純案場。",
  },
  {
    value: "complex",
    label: "條件較複雜",
    multiplier: 1.08,
    note: "需搬運、局部保護或現場介面較多。",
  },
  {
    value: "challenging",
    label: "高難度施工",
    multiplier: 1.15,
    note: "老屋、動線受限或多工種交錯施工。",
  },
];

export const quoteMethodOptions: QuoteChoice[] = [
  {
    value: "surface",
    label: "明管配置",
    note: "以明管、壓條或可見管路方式施作，通常不含牆面打鑿。",
  },
  {
    value: "concealed",
    label: "暗管配置",
    note: "需牆面或地坪打鑿，通常需搭配泥作、批土或油漆修補。",
  },
  {
    value: "pending",
    label: "現場確認後再定",
    note: "待現場丈量與路徑確認後，再決定工法與最終做法。",
  },
];

export const quoteRestorationOptions: QuoteChoice[] = [
  {
    value: "not_included",
    label: "未含牆面修補",
    note: "目前未含泥作修補、批土與油漆復原。",
  },
  {
    value: "basic_patch",
    label: "含局部修補",
    note: "含基礎修補，若需大面積泥作或全區重整，會另行估價。",
  },
  {
    value: "full_restore",
    label: "含泥作與油漆復原",
    note: "含必要之泥作、批土與油漆復原工序。",
  },
];

export const quoteProtectionOptions: QuoteChoice[] = [
  {
    value: "review",
    label: "依現場需求另評估",
    note: "是否需地坪、電梯或公共區保護，依現場與社區規定確認。",
  },
  {
    value: "basic",
    label: "含基本保護",
    note: "含一般施工動線與局部區域保護。",
  },
  {
    value: "advanced",
    label: "需高規格保護另估",
    note: "若社區規範較高或需大範圍保護，將另行評估追加。",
  },
];

export const quoteCleanupOptions: QuoteChoice[] = [
  {
    value: "none",
    label: "未含完工清潔",
    note: "目前僅含施工本體，未含完工粗清或細部清潔。",
  },
  {
    value: "basic_clean",
    label: "含基本粗清",
    note: "含完工後基本粗清與現場整理，未含細部清潔。",
  },
  {
    value: "fine_clean",
    label: "含粗清與細部清潔",
    note: "含完工粗清與交屋前細部清潔整理。",
  },
];

export const quoteWarrantyOptions: QuoteChoice[] = [
  {
    value: "water-electric-1y",
    label: "基礎工程保固 1 年",
    note: "常用於水電、局部泥作等基礎工程；耗材與人為損壞除外。",
  },
  {
    value: "custom-limited",
    label: "依工項另列保固",
    note: "依本案實際工項與合作廠商條件，於正式報價時另列保固內容。",
  },
  {
    value: "none",
    label: "此階段先不列保固",
    note: "僅用於非常初步之討論估價，正式報價前仍建議補上。",
  },
];

export const quoteInvoiceNotice = {
  title: "稅務與開立發票說明",
  paragraphs: [
    "本工作室目前採個人承攬方式接案，報價單所列金額為未稅現金價。實際請款與付款證明，會依本案最終承攬與結算方式提供合法憑證。",
    "若業主因公司報帳需求需要統一發票，請於報價確認前先行告知。我們會依實際承攬與開票方式另行核算稅額與正式報價內容。",
  ],
};

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
  { id: "hvac", label: "空調工程" },
  { id: "masonry", label: "泥作與防水" },
  { id: "finish", label: "表面與天花" },
  { id: "cabinet", label: "櫃體與木作" },
  { id: "doors-windows", label: "門窗與鋁作" },
  { id: "fixtures", label: "設備與衛浴" },
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
    name: "局部拆除工程",
    unit: "坪",
    pricingBasis: "依拆除面積、施作區域與拆除難度計",
    defaultUnitPrice: 3500,
    defaultQuantity: 1,
    description: "含基礎拆除工資與裝袋，不含額外清運車次、特殊保護或完工清潔。",
  },
  {
    id: "waste-bag",
    categoryId: "preparation",
    name: "廢棄物清運車次",
    unit: "車",
    pricingBasis: "依垃圾量與清運次數計",
    defaultUnitPrice: 8000,
    defaultQuantity: 1,
    description: "適用拆除後廢棄物清運、二次清運或社區指定清運安排。",
  },
  {
    id: "final-fine-clean",
    categoryId: "preparation",
    name: "完工細部清潔",
    unit: "坪",
    pricingBasis: "依室內坪數、污染程度與交屋前細清範圍計",
    defaultUnitPrice: 450,
    defaultQuantity: 1,
    description: "含櫃內擦拭、窗溝去污、地坪細清與交屋前整體整理，不含入住後再次清潔。",
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
    pricingBasis: "含挖孔、基本配線、標準 LED 崁燈與安裝",
    defaultUnitPrice: 1600,
    defaultQuantity: 1,
    description: "含挖孔、線路配置、標準 LED 崁燈與安裝，自備燈具另依規格調整。",
  },
  {
    id: "weak-current",
    categoryId: "electrical",
    name: "弱電 / 網路點位",
    unit: "點",
    pricingBasis: "依每一點佈線與面板安裝計",
    defaultUnitPrice: 1800,
    defaultQuantity: 1,
    description: "適用網路、電視與監視器預留點位，不含交換器、機櫃、Mesh 路由器與主動設備。",
  },
  {
    id: "water-piping",
    categoryId: "electrical",
    name: "冷熱水點位更新",
    unit: "點",
    pricingBasis: "依每一處冷熱水點位更新、延伸與收口條件計",
    defaultUnitPrice: 4500,
    defaultQuantity: 1,
    description: "適用廚房、衛浴或局部冷熱水點位更新，不含大範圍幹管重拉。",
  },
  {
    id: "hvac-piping",
    categoryId: "hvac",
    name: "空調管線配置",
    unit: "組",
    pricingBasis: "依每組室內外機冷媒管、排水與披覆路徑計，單組標準長度以 7 公尺內為基礎",
    defaultUnitPrice: 14500,
    defaultQuantity: 1,
    description: "含冷媒管、排水配置與基礎披覆，超長管線依實際米數另計，不含冷氣設備本體。",
  },
  {
    id: "hvac-install",
    categoryId: "hvac",
    name: "分離式冷氣安裝與洗洞",
    unit: "組",
    pricingBasis: "依一對一單組室內外機安裝條件與基礎穿牆洗洞需求計",
    defaultUnitPrice: 6500,
    defaultQuantity: 1,
    description: "含室內外機吊掛、標準銅管銜接、基礎測試與一般牆面洗洞一孔，特殊高空作業或危險施工另計。",
  },
  {
    id: "bathroom-waterproof",
    categoryId: "masonry",
    name: "浴室防水更新",
    unit: "間",
    pricingBasis: "依每間衛浴地坪與牆面防水高度計",
    defaultUnitPrice: 28000,
    defaultQuantity: 1,
    description: "含地坪與淋浴濕區牆面防水，實際施作高度於正式報價載明。",
  },
  {
    id: "tiling-refresh",
    categoryId: "masonry",
    name: "牆地磚鋪貼工資",
    unit: "坪",
    pricingBasis: "依實際貼磚面積、打底條件與鋪貼工法計",
    defaultUnitPrice: 5600,
    defaultQuantity: 1,
    description: "含貼磚工資、基礎打底與水泥砂漿副料，不含面磚材料、打除見底、防水重作與特殊磚材。",
  },
  {
    id: "tiling-material",
    categoryId: "masonry",
    name: "牆地磚材料費",
    unit: "坪",
    pricingBasis: "依客戶最終選定之面磚品牌、尺寸、耗損量與收邊材料計",
    defaultUnitPrice: 2500,
    defaultQuantity: 1,
    description: "可作為國產常規磚材暫列基準；實際仍依最終選磚、尺寸與耗損量調整。",
  },
  {
    id: "partition-wall",
    categoryId: "masonry",
    name: "輕隔間 / 隔間牆",
    unit: "坪",
    pricingBasis: "依隔間材質、牆體厚度、高度與內部補強需求計",
    defaultUnitPrice: 6800,
    defaultQuantity: 1,
    description: "適用輕鋼架隔間、白磚牆或紅磚牆等格局調整，實際工法與厚度於正式報價載明。",
  },
  {
    id: "demolition-to-structure",
    categoryId: "masonry",
    name: "拆除見底 / 見磚",
    unit: "坪",
    pricingBasis: "依打除深度、見底範圍與清運量計",
    defaultUnitPrice: 5200,
    defaultQuantity: 1,
    description: "適用浴室翻新、地坪或牆面需打除至見底之案型，不含後續防水、打底與貼材工程。",
  },
  {
    id: "floor-screed",
    categoryId: "masonry",
    name: "地坪整平 / 粉光",
    unit: "坪",
    pricingBasis: "依地坪高低差、厚度與粉光條件計",
    defaultUnitPrice: 2600,
    defaultQuantity: 1,
    description: "適用一般地坪高低差修正與基礎粉光，不含大幅墊高、隔音墊或特殊結構補強。",
  },
  {
    id: "self-leveling",
    categoryId: "masonry",
    name: "自平泥整平",
    unit: "坪",
    pricingBasis: "依地坪落差、厚度與自平泥施作條件計",
    defaultUnitPrice: 3200,
    defaultQuantity: 1,
    description: "適用 SPC、地板或薄貼材前之精細整平；若需木作底板整平另計。",
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
    id: "ac-piping-box",
    categoryId: "finish",
    name: "冷氣包管 / 包樑修飾",
    unit: "尺",
    pricingBasis: "依包管長度、斷面尺寸與轉折收邊條件計",
    defaultUnitPrice: 2800,
    defaultQuantity: 1,
    description: "適用冷媒管、排水管或樑位修飾，含基礎木作結構與表面收邊。",
  },
  {
    id: "curtain-box",
    categoryId: "finish",
    name: "窗簾盒",
    unit: "尺",
    pricingBasis: "依窗簾盒長度、深度與收邊方式計",
    defaultUnitPrice: 1800,
    defaultQuantity: 1,
    description: "含基礎木作結構、窗簾盒收邊與一般油漆前處理，不含軌道與窗簾本體。",
  },
  {
    id: "painting-full",
    categoryId: "finish",
    name: "全室油漆",
    unit: "坪",
    pricingBasis: "依室內地坪坪數粗估，並按常見牆面與天花約 2.5 至 3 倍展開量換算",
    defaultUnitPrice: 3200,
    defaultQuantity: 1,
    description: "本單價為初估用地坪換算法，已內含約地坪 2.5 至 3 倍之牆面與天花塗刷量；正式報價可再依實際塗刷面積細化，若需全室重新批土整平另計。",
  },
  {
    id: "floor-spc",
    categoryId: "finish",
    name: "SPC 地板",
    unit: "坪",
    pricingBasis: "依實際鋪設面積計，本單價預設原地面已具直鋪平整度條件",
    defaultUnitPrice: 3800,
    defaultQuantity: 1,
    description: "含 SPC 板材、專用防潮墊與基礎收邊；若現場需自平泥、木作底板整平或大幅修正高低差，將另行評估。",
  },
  {
    id: "glass-partition",
    categoryId: "finish",
    name: "玻璃固定隔間",
    unit: "才",
    pricingBasis: "依 8mm 至 10mm 強化玻璃面積與基礎收邊做法計",
    defaultUnitPrice: 900,
    defaultQuantity: 1,
    description: "適用書房、浴室或彈性隔間，含清玻璃與基礎收邊，不含特殊鐵件分割、長虹玻璃或拉門五金。",
  },
  {
    id: "glass-sliding-hardware",
    categoryId: "finish",
    name: "玻璃拉門五金 / 滑軌",
    unit: "樘",
    pricingBasis: "依每樘拉門五金等級、滑軌長度與安裝條件計",
    defaultUnitPrice: 18000,
    defaultQuantity: 1,
    description: "適用需搭配玻璃拉門的案型，不含玻璃本體。",
  },
  {
    id: "system-cabinet",
    categoryId: "cabinet",
    name: "系統櫃",
    unit: "尺",
    pricingBasis: "依每尺櫃體展開長度、櫃型與標準五金配置計",
    defaultUnitPrice: 8500,
    defaultQuantity: 1,
    description: "含一般高櫃或矮櫃板材、標準五金與安裝，不含石材檯面與特殊配件。",
  },
  {
    id: "cabinet-hardware-upgrade",
    categoryId: "cabinet",
    name: "系統櫃五金 / 收納配件升級",
    unit: "組",
    pricingBasis: "依抽屜滑軌、拉籃、吊衣桿、分隔件與特殊五金配置計",
    defaultUnitPrice: 6500,
    defaultQuantity: 1,
    description: "適用系統櫃之抽屜、拉籃、特殊鉸鏈與收納配件升級，建議搭配配件清單逐項確認。",
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
    unit: "尺",
    pricingBasis: "依立面寬度、底板結構與一般飾面收邊做法計，預設標準高度 240cm 內",
    defaultUnitPrice: 5200,
    defaultQuantity: 1,
    description: "含立面基底與一般飾面收邊，不含特殊燈帶、石材、金屬件、隱藏門片或特殊機構；挑高或超高立面另計。",
  },
  {
    id: "entry-cabinet",
    categoryId: "cabinet",
    name: "玄關鞋櫃",
    unit: "尺",
    pricingBasis: "依每尺櫃體長度、櫃深、門片與標準五金配置計",
    defaultUnitPrice: 9000,
    defaultQuantity: 1,
    description: "含鞋櫃、吊衣區或落塵區整合，特殊五金、穿鞋椅或石材檯面另計。",
  },
  {
    id: "window-replacement",
    categoryId: "doors-windows",
    name: "氣密窗 / 鋁窗更新",
    unit: "樘",
    pricingBasis: "依窗型尺寸、玻璃規格與安裝條件計",
    defaultUnitPrice: 22000,
    defaultQuantity: 1,
    description: "含拆裝、基礎填縫與安裝，特殊玻璃與外牆吊料另計。",
  },
  {
    id: "interior-door",
    categoryId: "doors-windows",
    name: "室內門片與門框更新",
    unit: "樘",
    pricingBasis: "依門片材質、五金與門框尺寸計",
    defaultUnitPrice: 18000,
    defaultQuantity: 1,
    description: "含門片、門框、標準五金與安裝，電子鎖另計。",
  },
  {
    id: "bathroom-fixture-install",
    categoryId: "fixtures",
    name: "衛浴設備全套安裝",
    unit: "間",
    pricingBasis: "依標準單間衛浴之馬桶、面盆、龍頭與淋浴設備整組安裝計",
    defaultUnitPrice: 6800,
    defaultQuantity: 1,
    description: "適用單間衛浴整套更新，含基礎安裝工資與標準五金配件，不含設備本體與埋壁式特殊配管。",
  },
  {
    id: "bathroom-fixture-single",
    categoryId: "fixtures",
    name: "衛浴單品安裝",
    unit: "件",
    pricingBasis: "依單一馬桶、面盆、龍頭或淋浴設備之安裝條件計",
    defaultUnitPrice: 2200,
    defaultQuantity: 1,
    description: "適用局部更換單一設備，不含設備本體、額外改管、壁掛或埋壁式特殊安裝。",
  },
  {
    id: "bathroom-fan-heater",
    categoryId: "fixtures",
    name: "抽風機 / 暖風機安裝",
    unit: "台",
    pricingBasis: "依每台設備安裝位置、配線與風管條件計",
    defaultUnitPrice: 6800,
    defaultQuantity: 1,
    description: "含安裝與基本配線，設備本體與額外風管另計。",
  },
  {
    id: "smart-home-hub",
    categoryId: "smart-home",
    name: "智慧主機 / 網關建置",
    unit: "式",
    pricingBasis: "依每案智慧中樞、網關設定與基礎網路整合作業計",
    defaultUnitPrice: 15000,
    defaultQuantity: 1,
    description: "含智慧主機、網關設定與基礎情境建置，不含額外網通設備採購。",
  },
  {
    id: "smart-home-control-node",
    categoryId: "smart-home",
    name: "控制節點整合",
    unit: "迴路",
    pricingBasis: "依實際串接之燈光迴路、電動窗簾或空調台數計",
    defaultUnitPrice: 2500,
    defaultQuantity: 1,
    description: "含單一控制節點之硬體整合與情境連動設定。",
  },
  {
    id: "smart-home-security-node",
    categoryId: "smart-home",
    name: "安防節點整合",
    unit: "台",
    pricingBasis: "依智慧門鎖、感測器或監視設備之串接台數計",
    defaultUnitPrice: 4500,
    defaultQuantity: 1,
    description: "含單一安防節點串接與測試，不含設備本體與進階錄影系統。",
  },
];

export const quoteDefaultTerms = [
  "本報價為依現階段需求編列之概念初估，實際金額、數量與工法仍以現場丈量、圖面確認與正式報價為準。",
  "標註為一式之項目，多為系統整合或前置作業；正式報價時會再載明施作範圍、尺寸或組數。標註為坪、尺、處、點、盞、樘、台、車、才者，依實際施作數量結算。",
  "若遇大樓管委會特殊規定、無電梯搬運、夜間施工、高規格公共區保護、額外清運或每日清潔要求，將另行評估並說明。",
  "水電點位新增、開關移位、拆除或暗管施工後，如產生管溝開鑿與回填，本報價僅含水泥砂漿基礎回填平整；若原牆面為特殊塗料、壁紙，或修補範圍超過單面牆體約 1/3，需重新全區批土、粉光、油漆或特殊面材復原時，將依現場狀況另行評估。",
  "施工期間若因現場隱蔽條件、設備更換、材料升級、尺寸調整或業主追加減工項而需調整，會先提供工程追加減確認內容，經雙方確認後再施作。",
  "若由業主自行採購燈具、衛浴、五金、家電或其他設備交由本團隊代為安裝，本報價僅含基礎安裝工資；設備本體之缺件、規格不符、運送損壞及原廠保固維修，由業主自行與供應商接洽。",
  "若本案需開立合法統一發票，正式報價與正式合約將改由具備合法裝修立案資格之公司作為簽約主體承接，以確保發票、保固與工程責任歸屬一致。",
  "若為智能家居、弱電或網路整合案型，穩定度仍取決於現場網路品質與業主最終採購之設備相容性；若後續改用不同品牌主機、路由器或控制設備，可能需另行調整設定與施工費用。",
];

export const quoteMaterialLevelOptions: QuoteOption[] = [
  {
    value: "basic",
    label: "常用國產規格",
    multiplier: 1,
    note: "以常用國產品牌、基本五金與實用型材料為主。",
  },
  {
    value: "refined",
    label: "部分材料升級",
    multiplier: 1.08,
    note: "部分材料、五金與表面處理升級，適合想提升整體質感的案件。",
  },
  {
    value: "premium",
    label: "多數材料升級",
    multiplier: 1.18,
    note: "櫃體、五金、設備與表面材質多數升級，正式規格仍需逐項確認。",
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
    note: "目前僅含施工本體；未含施工廢棄物退場整理、地坪掃除、櫃體擦拭與交屋前細部清潔。",
  },
  {
    value: "basic_clean",
    label: "含基本粗清",
    note: "含施工廢棄物退場、現場基礎掃地與大型垃圾清離；未含櫃內擦拭、窗溝去污與可直接入住之細部清潔。",
  },
  {
    value: "fine_clean",
    label: "含粗清與細部清潔",
    note: "含粗清、表面擦拭、櫃內整理、窗溝與地坪去污等交屋前細部清潔；仍不含搬家後再次清潔。",
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

export const quoteWaterproofWarrantyOptions: QuoteChoice[] = [
  {
    value: "waterproof-2y",
    label: "防水工程保固 2 年",
    note: "適用衛浴或局部防水重作；以正常使用下之非人為滲漏為保固範圍。",
  },
  {
    value: "custom-by-vendor",
    label: "依合作工班另列",
    note: "依本案工法、基底條件與合作工班保固條件，於正式報價另列。",
  },
  {
    value: "pending-waterproof",
    label: "此階段先不列",
    note: "若本案含防水工程，正式報價前仍建議補上防水保固年限與責任界線。",
  },
];

export const quoteInvoiceNotice = {
  title: "稅務與開立發票說明",
  paragraphs: [
    "本案報價單所列金額皆為未稅價。本工作室目前採個人承攬型態接案，常規結算將提供個人勞務收據或合法付款憑證作為請款依據。",
    "若業主因貸款、報帳或公司流程需求，須開立合法統一發票，請務必於正式簽約前先行告知；屆時正式報價與正式合約將改由合作之合法登記裝修立案公司作為簽約主體承接，並依法外加 5% 營業稅額後整合至正式合約總價。",
  ],
};

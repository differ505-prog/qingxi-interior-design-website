export type CrewContractPaymentStage = {
  id: string;
  label: string;
  percent: number;
  note: string;
};

export type CrewContractSection = {
  id: string;
  title: string;
  body: string;
};

export type CrewWorkRule = {
  id: string;
  title: string;
  description: string;
  baseline: string;
  selection: string;
  finishScope: string;
  note: string;
};

export const crewContractDefaultPaymentStages: CrewContractPaymentStage[] = [
  {
    id: "advance",
    label: "進場款",
    percent: 30,
    note: "工班確認進場日期、承作範圍與本次人力安排後支付，作為排班與進場準備依據。",
  },
  {
    id: "midpoint",
    label: "中段款",
    percent: 40,
    note: "本案約定之中段里程碑完成並經現場確認後支付。",
  },
  {
    id: "completion",
    label: "完工款",
    percent: 20,
    note: "本工種主要工作完成、現場可點驗時支付。",
  },
  {
    id: "retention",
    label: "保留款",
    percent: 10,
    note: "收尾、清潔、修補完成後支付；若仍有待改善項目，得保留合理修補費用至完成為止。",
  },
];

export const crewContractDefaultSections: CrewContractSection[] = [
  {
    id: "scope",
    title: "承作範圍",
    body:
      "工班應依本合約、約定單價、現場交底內容與附件施作，不得自行增減工項。未列入本次承作範圍之工作，須先經青曦書面同意後始得施作與計價。",
  },
  {
    id: "schedule",
    title: "進場時間與配合",
    body:
      "工班應依約定日期進場，配合現場管理、社區規範、噪音時段與跨工種銜接。若因工班遲到、缺工、工具不到位或自行改期造成延誤，工班應自行負責。",
  },
  {
    id: "payment",
    title: "計價與請款",
    body:
      "本案按本合約約定之單價、數量、總價與付款節點結算。工班不得跳過青曦直接向業主報價、請款、收現或收訂金；如有違反，青曦得逕行終止合作並請求損害賠償。",
  },
  {
    id: "quality",
    title: "品質與返工",
    body:
      "工班施作應符合一般業界品質、圖面尺寸、收邊平整與現場交底要求。若因工班施工錯誤、尺寸誤差、保護不足或收尾粗糙產生返工，相關人力、材料、清運與延誤成本由工班負責。",
  },
  {
    id: "safety",
    title: "安全與損害責任",
    body:
      "工班應自行管理進場人員、工具、用電、安全防護與勞安事項。施工期間如造成公共區域、鄰房、既有完成面、設備、建物或第三人損害，概由工班負責修復、賠償與善後。",
  },
  {
    id: "variation",
    title: "追加減與變更",
    body:
      "現場若有追加、減作、改做或數量變動，須先由青曦確認後再施作。未經確認先行施作之部分，青曦得不予認列或付款。",
  },
  {
    id: "cleanup",
    title: "保護、清潔與退場",
    body:
      "工班應做好施工保護、材料整理、垃圾打包與退場清潔，不得將廢料、工具或私人用品遺留現場。若未完成清潔或保護拆除，青曦得代為處理並自應付款中扣除。",
  },
  {
    id: "termination",
    title: "停工、解約與違約",
    body:
      "若工班無故停工、品質明顯不符、危及安全、擅自轉包、私下向業主接洽或未配合返工，青曦得通知限期改善；逾期未改善者，得停工、解約並另找他人進場，差額與損失由工班負責。",
  },
  {
    id: "signature",
    title: "簽署與留存",
    body:
      "本合約得以線上閱覽與電子簽署方式成立。簽署頁會留存簽署人資料、時間與簽名圖像，作為本次合作確認紀錄；定稿內容以簽署當下留存版本為準。",
  },
];

export const crewContractDefaultChecklist = [
  "我已看過本次承作範圍、單價 / 總價與付款方式。",
  "我了解未經青曦同意，不得自行追加、減作、轉包或直接向業主收款。",
  "我了解施工錯誤、返工、損壞、清潔未完成與公共區域損害，由我方負責。",
  "我會配合約定日期進場、退場、現場管理與拍照留存。",
  "我同意本次簽署以電子方式留存。",
];

export const crewContractDefaultWorkRules: CrewWorkRule[] = [
  {
    id: "scope-basis",
    title: "承作內容基準",
    description: "把這次工班實際要做的工項與不含項目先講清楚。",
    baseline: "依本次工種、現場交底與附件範圍施作",
    selection: "",
    finishScope: "含範圍 / 不含範圍 / 特別排除",
    note: "未先確認的額外工作，不視為當然計價項目。",
  },
  {
    id: "labor-tools",
    title: "人力與工具",
    description: "確認由誰負責人力、機具、耗材與施工保護。",
    baseline: "工班自備基本工具、人力與本工種常用耗材",
    selection: "",
    finishScope: "特殊機具、吊運、夜間施工另列",
    note: "若需青曦另提供材料或設備，應於進場前先確認。",
  },
  {
    id: "quality-rule",
    title: "品質與完成標準",
    description: "把最容易吵的收邊、平整度、修補與點交標準先寫清楚。",
    baseline: "依圖面尺寸、現場放樣與一般業界可驗收品質施作",
    selection: "",
    finishScope: "尺寸、水平垂直、收邊、清潔與保護完整",
    note: "未達約定標準者，工班應自行返工至完成。",
  },
  {
    id: "safety-rule",
    title: "安全與現場管理",
    description: "確認施工保護、用電、動火、垃圾與公共區域管理方式。",
    baseline: "依案場規定做好施工保護、工具管理與每日收整",
    selection: "",
    finishScope: "公共區域保護、廢棄物打包、指定位置堆放",
    note: "違反社區規範、噪音規定或造成罰款，由工班負責。",
  },
];

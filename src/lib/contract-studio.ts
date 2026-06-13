export type ContractPaymentStage = {
  id: string;
  label: string;
  percent: number;
  note: string;
};

export type ContractSection = {
  id: string;
  title: string;
  body: string;
};

export const contractDefaultPaymentStages: ContractPaymentStage[] = [
  {
    id: "deposit",
    label: "簽約訂金",
    percent: 30,
    note: "雙方確認合約內容後支付，作為檔期保留、前置備料與施工排程啟動之依據。",
  },
  {
    id: "midpoint",
    label: "工程中期款",
    percent: 40,
    note: "主要拆除、水電、泥作或木作工程進入中段時支付，比例可依案型再調整。",
  },
  {
    id: "final",
    label: "完工尾款",
    percent: 30,
    note: "工程完工、雙方點交確認後支付；若有追加減帳，依最終結算內容一併調整。",
  },
];

export const contractDefaultSections: ContractSection[] = [
  {
    id: "scope",
    title: "工程範圍與適用基準",
    body:
      "本合約內容係依雙方確認之圖面、報價單、材料規格與現場丈量結果執行。若後續因業主調整需求、現場隱蔽條件或法規限制而需變更工法、材料或數量，將先提出追加減內容並經雙方確認後施作。",
  },
  {
    id: "schedule",
    title: "工期與施工配合",
    body:
      "實際工期依案場條件、工種銜接、材料交期與社區施工規範安排。若因天候、管委會限制、停水停電、業主未及時確認材料或現場不可歸責於承攬方之因素影響進度，工期得合理順延。",
  },
  {
    id: "payment",
    title: "付款與結算",
    body:
      "付款以本合約約定之節點與比例為準。工程追加減、材料升級、範圍調整或現場另發現需補強之工項，將依雙方確認後之內容另行結算。",
  },
  {
    id: "warranty",
    title: "保固與責任界線",
    body:
      "基礎工程、設備安裝與防水保固範圍依合約載明內容執行。由業主自購之設備、耗材、原廠保固項目、使用不當或人為外力造成之損壞，不在本團隊保固責任內。",
  },
  {
    id: "signature",
    title: "簽署方式與留證",
    body:
      "本合約可由雙方透過線上頁面閱覽、確認並完成電子簽署。簽署頁將留存簽署人資料、簽署時間、裝置環境摘要與簽名圖像，作為本次合約確認紀錄。",
  },
];

export const contractDefaultChecklist = [
  "我已完整閱讀並同意本合約內容與付款節點。",
  "我理解本次簽署將以電子方式留存簽名與簽署時間紀錄。",
];

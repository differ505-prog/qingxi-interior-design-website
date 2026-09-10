// 模擬 production 老屋翻新系 New_Publish 候選
const candidates = [
  { chapter: "預算拆解", subchapter: "預算表配置", trackTitle: "老屋翻新系", workflowAction: "New_Publish", collisionRisk: "low", primaryTitle: "預算分配模板" },
  { chapter: "預算拆解", subchapter: "追加處理", trackTitle: "老屋翻新系", workflowAction: "New_Publish", collisionRisk: "low", primaryTitle: "追加減項策略" },
  { chapter: "空間重整", subchapter: "格局調整", trackTitle: "老屋翻新系", workflowAction: "New_Publish", collisionRisk: "low", primaryTitle: "格局調整與動線" },
];

// 我修的 pickDiverseByCategory（純 copy）
function pickDiverseByCategory(candidates, limit) {
  const safeLimit = Math.max(1, Number(limit) || 1);
  const pool = Array.isArray(candidates) ? candidates : [];
  if (pool.length === 0) return [];

  const byCategory = new Map();
  for (const candidate of pool) {
    const key = candidate?.category || "未分類";
    if (!byCategory.has(key)) byCategory.set(key, []);
    byCategory.get(key).push(candidate);
  }

  const pickRoundRobin = (grouping) => {
    const result = [];
    const keys = Array.from(grouping.keys());
    let cursor = 0;
    while (result.length < safeLimit) {
      const bucket = grouping.get(keys[cursor]);
      if (bucket && bucket.length > 0) {
        result.push(bucket.shift());
      }
      cursor = (cursor + 1) % keys.length;
      if (result.length === 0) break;
      const allEmpty = keys.every((k) => grouping.get(k).length === 0);
      if (allEmpty) break;
    }
    return result;
  };

  if (byCategory.size > 1) {
    return pickRoundRobin(byCategory);
  }

  const byChapter = new Map();
  for (const candidate of pool) {
    const key = candidate?.chapter || "未分章";
    if (!byChapter.has(key)) byChapter.set(key, []);
    byChapter.get(key).push(candidate);
  }
  return pickRoundRobin(byChapter);
}

console.log("=== 模擬 production：3 個 New_Publish 候選，2 個 chapter ===");
const result = pickDiverseByCategory(candidates, 3);
console.log(`結果：${result.length} 篇（預期 3，因為 chapter 數量足夠）`);
for (const r of result) console.log(`  [${r.chapter}] ${r.subchapter}`);

console.log("\n=== 邊界：只有 1 個 chapter ===");
const singleChapter = [
  { chapter: "預算拆解", subchapter: "A", workflowAction: "New_Publish" },
  { chapter: "預算拆解", subchapter: "B", workflowAction: "New_Publish" },
  { chapter: "預算拆解", subchapter: "C", workflowAction: "New_Publish" },
];
const r2 = pickDiverseByCategory(singleChapter, 3);
console.log(`結果：${r2.length} 篇（預期 1，單 chapter round-robin 第一次就拿到 1 篇後無其他 bucket 可取）`);
for (const r of r2) console.log(`  [${r.chapter}] ${r.subchapter}`);

console.log("\n=== 邊界：2 個 chapter ===");
const twoChapter = [
  { chapter: "A", subchapter: "a1" },
  { chapter: "A", subchapter: "a2" },
  { chapter: "B", subchapter: "b1" },
  { chapter: "B", subchapter: "b2" },
  { chapter: "B", subchapter: "b3" },
];
const r3 = pickDiverseByCategory(twoChapter, 3);
console.log(`結果：${r3.length} 篇（預期 3：A1+B1+A2）`);
for (const r of r3) console.log(`  [${r.chapter}] ${r.subchapter}`);

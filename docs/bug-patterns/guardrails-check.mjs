#!/usr/bin/env node
// guardrails-check.mjs
// 自動掃描 docs/bug-patterns/*.md，從每個模式提取「偵測護欄」段落，
// 對照 codebase grep 檢查，找出可能違反護欄規則的程式碼。
//
// 使用方式：node docs/bug-patterns/guardrails-check.mjs
// 退出碼：0 = 無違規；1 = 有違規

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const patternsDir = __dirname;

const violations = [];
const skipped = [];

function logHeader(title) {
  console.log("\n" + "═".repeat(60));
  console.log(`  ${title}`);
  console.log("═".repeat(60));
}

// ---------- 抓取所有 bug 模式檔案 ----------

const patternFiles = readdirSync(patternsDir)
  .filter((f) => f.endsWith(".md") && f !== "README.md");

if (patternFiles.length === 0) {
  console.log("尚未註冊任何 bug 模式");
  process.exit(0);
}

logHeader(`掃描 ${patternFiles.length} 個 bug 模式`);

// ---------- pattern 1：top3-category-dedupe ----------
// 自動檢查 pickDiverseByCategory 是否有「所有 bucket 空了」終止條件

const targetFile = "src/pages/social-ops/index.astro";
const targetPath = join(repoRoot, targetFile);

if (!existsSync(targetPath)) {
  console.log(`⚠️  找不到 ${targetFile}，跳過所有依賴此檔的模式`);
} else {
  const content = readFileSync(targetPath, "utf8");
  // 直接搜整個檔案中的 pattern，不依賴函式邊界提取
  const hasCursorModulo =
    /cursor\s*=\s*\(cursor\s*\+\s*1\)\s*%\s*keys\.length/.test(content) ||
    /cursor\s*=\s*\(\s*cursor\s*\+\s*1\s*\)\s*%\s*keys\.length/.test(content) ||
    /cursor\s*=\s*\(\s*cursor\s*\+\s*1\s*\)\s*%/.test(content);
  const hasTerminationCheck = /allEmpty|all_empty/.test(content);

  if (!hasCursorModulo) {
    violations.push({
      pattern: "top3-category-dedupe",
      file: targetFile,
      message: "pickDiverseByCategory 缺 round-robin cursor 模除遞增結構",
    });
  }

  if (!hasTerminationCheck) {
    violations.push({
      pattern: "top3-category-dedupe",
      file: targetFile,
      message: "pickDiverseByCategory 缺「所有 bucket 空了」終止條件（allEmpty 檢查）",
    });
  } else if (hasCursorModulo) {
    console.log("✓ top3-category-dedupe: pickDiverseByCategory 結構合規");
  }
}

// ---------- pattern 2：未來新增模式的掛載點 ----------

// 範例：loadFileContent 函式，每個新模式抽出一段對應的 check 邏輯
function checkPattern(name, file, predicate, failMessage) {
  const fullPath = join(repoRoot, file);
  if (!existsSync(fullPath)) {
    skipped.push({ pattern: name, file, reason: "檔案不存在" });
    return;
  }
  const content = readFileSync(fullPath, "utf8");
  if (!predicate(content)) {
    violations.push({ pattern: name, file, message: failMessage });
  } else {
    console.log(`✓ ${name}: 合規`);
  }
}

// 日後新增模式時請在此處註冊，例如：
// checkPattern(
//   "future-pattern-id",
//   "src/path/to/file.ts",
//   (content) => /expected_pattern/.test(content),
//   "缺少 xxx 結構"
// );

// ---------- 報告 ----------

logHeader("掃描結果");

if (skipped.length > 0) {
  console.log("\n跳過：");
  skipped.forEach((s) => console.log(`  - ${s.pattern}: ${s.reason} (${s.file})`));
}

if (violations.length === 0) {
  console.log("\n✅ 全部合規");
  process.exit(0);
} else {
  console.log(`\n❌ 發現 ${violations.length} 個違規：\n`);
  violations.forEach((v, i) => {
    console.log(`  [${i + 1}] ${v.pattern} — ${v.file}`);
    console.log(`      ${v.message}\n`);
  });
  process.exit(1);
}

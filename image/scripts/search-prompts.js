import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 读取JSON文件
 */
const read_json = (file_path) => JSON.parse(fs.readFileSync(file_path, "utf-8"));

/**
 * 解析查询字符串,支持两种格式:
 * 1. 带权重: "minimalist:2 coffee:0.3 poster:1"
 * 2. 简单模式: "minimalist coffee poster" (所有权重=1)
 */
const parse_query = (query) => {
    const keywords = [];
    const parts = query.toLowerCase().split(/\s+/).filter(Boolean);

    for (const part of parts) {
        if (part.includes(':')) {
            // 格式: keyword:weight
            const [keyword, weightStr] = part.split(':');
            const weight = parseFloat(weightStr) || 1.0;
            keywords.push({ keyword, weight });
        } else {
            // 简单格式: keyword (默认权重1.0)
            keywords.push({ keyword: part, weight: 1.0 });
        }
    }

    return keywords;
};

/**
 * 计算文本与关键词的加权匹配分数
 */
const score_text = (text, keywords) => {
    let score = 0;
    for (const { keyword, weight } of keywords) {
        if (text.includes(keyword)) {
            score += weight;
        }
    }
    return score;
};

// 从命令行参数获取查询字符串
const query = process.argv[2] || "minimalist:2 coffee:0.3 poster:1";
const keywords = parse_query(query);

console.error(`搜索关键词:`);
keywords.forEach(({ keyword, weight }) => {
    console.error(`  - ${keyword} (权重: ×${weight})`);
});

// 读取style-summary.json索引文件
const references_dir = path.resolve(__dirname, "../references");
const summary_path = path.join(references_dir, "style-summary.json");
const summary = read_json(summary_path);

// Phase 1: 在所有分类中找到最佳匹配的分类文件
let best_file = null;
let best_score = -1;

for (const [file_name, items] of Object.entries(summary)) {
    const joined = items.map((item) => `${item.t} ${item.d}`).join(" ");
    const score = score_text(joined.toLowerCase(), keywords);
    if (score > best_score) {
        best_score = score;
        best_file = file_name;
    }
}

if (!best_file) {
    console.error("未找到匹配的分类文件");
    process.exit(0);
}

console.error(`\n最佳分类: ${best_file} (加权评分: ${best_score.toFixed(1)})`);

// Phase 2: 在选定的分类文件中找到top prompts (带随机性)
const target_path = path.join(references_dir, best_file);
const list = read_json(target_path);

const ranked = list
    .map((item) => ({
        item,
        score: score_text(
            `${item.title ?? ""} ${item.description ?? ""} ${item.content ?? ""}`.toLowerCase(),
            keywords
        ),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

// 从top 10候选中随机选3个
const topCount = Math.min(10, ranked.length);
const topCandidates = ranked.slice(0, topCount);
const selectedCount = Math.min(3, topCandidates.length);
const randomSelection = [];
const selectedIndices = new Set();

while (randomSelection.length < selectedCount) {
    const idx = Math.floor(Math.random() * topCandidates.length);
    if (!selectedIndices.has(idx)) {
        randomSelection.push(topCandidates[idx]);
        selectedIndices.add(idx);
    }
}

const results = randomSelection.map((r) => ({
    title: r.item.title,
    score: r.score.toFixed(1),
    content: (r.item.content || "").replace(/\r/g, ""),
}));

console.error(`\n从Top ${topCount}中随机选择了 ${results.length} 个prompts:\n`);

// 输出结果
const output_file = "search_output.json";
const output_data = JSON.stringify({
    query,
    keywords: keywords.map(k => ({ keyword: k.keyword, weight: k.weight })),
    best_category: best_file,
    category_score: best_score.toFixed(1),
    top_prompts: results
}, null, 2);

fs.writeFileSync(output_file, output_data);
console.error(`\n结果已写入文件: ${output_file}`);

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load database
const DB_PATH = path.resolve(__dirname, '../references/seedance_prompts.json');
let db = []; // Will load dynamically

try {
    if (fs.existsSync(DB_PATH)) {
        db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    } else {
        console.error("Database not found. Run parse-readme.js first.");
        process.exit(1);
    }
} catch (e) {
    console.error("Error loading database:", e);
    process.exit(1);
}

// User input
const userInput = process.argv.slice(2).join(' ');

if (!userInput) {
    console.log("Usage: node director.js \"<idea>\"");
    process.exit(0);
}

// -------------------------------------------------------------
// Director Logic
// -------------------------------------------------------------

// 1. Keyword Extraction — 支持中英文混合搜索
// 中文按空格分词（用户自行空格分隔），英文过滤短停词
// 中文字符判断：Unicode范围 \u4e00-\u9fff
const isChinese = (str) => /[\u4e00-\u9fff]/.test(str);
const rawTokens = userInput.toLowerCase().split(/\s+/);
const keywords = rawTokens.filter(w => {
    if (isChinese(w)) return w.length >= 1; // 中文：保留所有（包括单字）
    return w.length > 3; // 英文：过滤 a/the/is 等停词
});

// 2. Scoring System
function scorePrompt(entry, keywords) {
    let score = 0;
    const text = (entry.title + " " + entry.description + " " + entry.prompt).toLowerCase();

    keywords.forEach(kw => {
        // Higher weight for title matches (likely the core concept)
        if (entry.title.toLowerCase().includes(kw)) score += 3;
        // Moderate weight for description
        if (entry.description && entry.description.toLowerCase().includes(kw)) score += 2;
        // Lower weight for raw prompt (can be noisy)
        if (entry.prompt.toLowerCase().includes(kw)) score += 1;
    });

    return score;
}

// 3. Search and Sort
const results = db.map(entry => ({
    ...entry,
    score: scorePrompt(entry, keywords)
}))
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // Start with top 5 matches

// 4. Output Generation
if (results.length === 0) {
    console.log(JSON.stringify({
        error: "No direct matches found. Try describing the action or vibe (e.g., 'slow motion', 'cinematic').",
        results: []
    }, null, 2));
} else {
    // Return structured JSON for the Agent to consume
    console.log(JSON.stringify({
        user_idea: userInput,
        best_match: results[0].title,
        results: results.map(r => ({
            title: r.title,
            original_prompt: r.prompt, // The agent will adapt this
            video_ref: r.videoUrl,
            score: r.score
        }))
    }, null, 2));
}

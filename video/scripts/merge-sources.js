/**
 * merge-sources.js
 * 从多个 GitHub 数据源解析 Seedance 2.0 提示词，合并去重后写入 seedance_prompts.json
 *
 * 数据源：
 * 1. YouMind-OpenLab (现有) — 已有 seedance_prompts.json
 * 2. ZeroLu/awesome-seedance — README-zh.md (中文)
 * 3. makesupday/Awesome-Seedance-2.0 — README.md (英文，需翻译)
 *
 * 用法：node merge-sources.js <zerolu_readme_path> <makesupday_readme_path>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 现有数据库路径
const DB_PATH = path.resolve(__dirname, '../references/seedance_prompts.json');

/**
 * 解析 ZeroLu README-zh.md
 * 格式：### X.X. 标题  \n **提示词：** \n ``` \n prompt \n ```
 * @param {string} content - README-zh.md 内容
 * @returns {Array} 提示词数组
 */
function parseZeroLu(content) {
    const results = [];
    // 匹配 ### X.X. 标题 后面紧跟的代码块
    const sectionRegex = /###\s+(\d+\.\d+)\.\s+(.+?)(?:\n|\r\n)\*(.+?)\*[\s\S]*?\*\*提示词[：:]\*\*\s*\r?\n```\r?\n([\s\S]*?)```/g;

    let match;
    while ((match = sectionRegex.exec(content)) !== null) {
        const sectionId = match[1];
        const title = match[2].trim();
        const description = match[3].trim();
        const prompt = match[4].trim();

        // 过滤掉太短的提示词（< 20 字符可能不是有效提示词）
        if (prompt.length < 20) continue;

        results.push({
            title: title,
            description: description,
            prompt: prompt,
            source: 'ZeroLu/awesome-seedance',
            category: getCategoryFromId(sectionId),
            tags: extractTags(title + ' ' + description + ' ' + prompt)
        });
    }

    return results;
}

/**
 * 根据章节 ID 推断分类
 * @param {string} id - 如 "1.1", "5.2"
 * @returns {string} 分类名
 */
function getCategoryFromId(id) {
    const major = parseInt(id.split('.')[0]);
    const categories = {
        1: '电影风格',
        2: '广告商业',
        3: '社交媒体',
        4: 'UGC风格',
        5: '动漫动画',
        6: '短剧网剧',
        7: '视觉特效'
    };
    return categories[major] || '其他';
}

/**
 * 解析 makesupday README.md（英文）
 * 格式：### X.X Title  \n ``` \n prompt \n ```
 * @param {string} content - README.md 内容
 * @returns {Array} 提示词数组
 */
function parseMakesupday(content) {
    const results = [];
    // 匹配 ### X.X Title 后面紧跟的代码块
    const sectionRegex = /###\s+(\d+\.\d+)\s+(.+?)(?:\n|\r\n)[\s\S]*?```\r?\n([\s\S]*?)```/g;

    let match;
    while ((match = sectionRegex.exec(content)) !== null) {
        const sectionId = match[1];
        const title = match[2].trim();
        const prompt = match[3].trim();

        // 过滤掉太短的提示词
        if (prompt.length < 20) continue;
        // 过滤掉纯公式/结构说明
        if (prompt.startsWith('Prompt =') || prompt.startsWith('[Subject]')) continue;

        // 翻译标题（简单映射 + 保留原文）
        const translatedTitle = translateTitle(title);

        results.push({
            title: translatedTitle,
            description: `来源: makesupday | 原标题: ${title}`,
            prompt: prompt, // 保留英文原文，Seedance 也支持英文
            prompt_zh: translatePrompt(prompt), // 添加中文翻译版
            source: 'makesupday/Awesome-Seedance-2.0',
            category: getMakesUpdayCategory(sectionId),
            tags: extractTags(title + ' ' + prompt)
        });
    }

    return results;
}

/**
 * makesupday 分类映射
 */
function getMakesUpdayCategory(id) {
    const major = parseInt(id.split('.')[0]);
    const categories = {
        1: '写实电影',
        2: '角色一致性',
        3: '产品广告',
        4: '社交媒体',
        5: '风格特效',
        6: '多镜头叙事',
        7: '音频口型',
        8: '运镜技术'
    };
    return categories[major] || '其他';
}

/**
 * 简单的标题翻译映射
 * @param {string} title - 英文标题
 * @returns {string} 中文标题
 */
function translateTitle(title) {
    const titleMap = {
        'Professional Portrait': '专业人像',
        'Dramatic Character Reveal': '戏剧性角色揭幕',
        'Athletic Action Shot': '运动动作镜头',
        'Hyper-Realistic Street Scene': '超写实街头场景',
        'Superhero Multi-Environment': '超级英雄多场景',
        'Brand Mascot Journey': '品牌吉祥物之旅',
        'Character Dialogue Scene': '角色对白场景',
        'Product Unboxing': '产品开箱',
        'Lifestyle Product Integration': '生活方式产品广告',
        'Food & Beverage Commercial': '美食饮品广告',
        'Tech Product Demo': '科技产品展示',
        'Meme-Style Comedy': '模因喜剧',
        'Morning Routine Montage': '早间日常蒙太奇',
        'Before & After Transformation': '前后对比变身',
        'High-Society Drama (Viral Short Drama Style) 🔥': '豪门恩怨短剧（爆款风格）🔥',
        'Wuxia Martial Arts Battle 🔥': '武侠竹林对决 🔥',
        'CEO Revenge Story 🔥': 'CEO复仇剧 🔥',
        'Cyberpunk Transformation': '赛博朋克变身',
        'Fantasy Forest Conversion': '奇幻森林转化',
        'Anime Style Application': '动漫风格转换',
        'Vintage Film Look': '复古胶片风',
        'Chase Scene Sequence': '追逐场景序列',
        'Product Story Arc': '产品故事弧线',
        'Emotional Mini-Drama': '情感微短剧',
        'Multilingual Dialogue': '多语言对话',
        'Music Video Sync': '音乐视频卡点',
        'Sound Effect Integration': '音效整合',
        'Voice-Over Commercial': '配音广告',
        'Dolly Movements': '推拉运镜',
        'Compound Camera Movement': '复合运镜',
        'Tracking Shot': '跟踪镜头',
        'Crane Movement': '摇臂运镜',
        'Handheld Documentary': '手持纪录片风格'
    };
    return titleMap[title] || title;
}

/**
 * 简易英文提示词翻译（关键词级别，保留结构）
 * 由于这是离线脚本，无法调用 LLM API，所以做结构化标记翻译
 * @param {string} prompt - 英文提示词
 * @returns {string} 带中文注释的提示词
 */
function translatePrompt(prompt) {
    // 对于已经包含中文的提示词，直接返回
    if (/[\u4e00-\u9fff]/.test(prompt)) return prompt;

    // 关键词替换映射
    const translations = [
        [/\bCamera:\s*/gi, '镜头：'],
        [/\bStyle:\s*/gi, '风格：'],
        [/\bLighting:\s*/gi, '光影：'],
        [/\bDuration:\s*/gi, '时长：'],
        [/\bAudio:\s*/gi, '音效：'],
        [/\bScene\s*(\d+)/gi, '场景 $1'],
        [/\bShot\s*(\d+)/gi, '镜头 $1'],
        [/\bAct\s*(\d+)/gi, '第 $1 幕'],
        [/\bCamera switch\s*→/gi, '镜头切换 →'],
        [/\bDialogue:\s*/gi, '对白：'],
        [/\bMaintain:\s*/gi, '保持：'],
        [/\bTransition:\s*/gi, '转场：'],
        [/\bPacing:\s*/gi, '节奏：'],
        [/\bVFX:\s*/gi, '特效：'],
        [/\bColor:\s*/gi, '色调：'],
        [/\bColor grade:\s*/gi, '调色：'],
        [/\bcharacter lock:\s*/gi, '角色锁定：'],
        [/\bstyle transfer:\s*/gi, '风格迁移：'],
        [/\bLens feel:\s*/gi, '镜头质感：'],
        [/\bSpeed:\s*/gi, '速度：'],
        [/\bFocus:\s*/gi, '焦点：'],
        [/\bReference\s+/gi, '参考 '],
        [/\bLip-sync:\s*/gi, '口型同步：'],
        [/\b@Image(\d+)/g, '@图片$1'],
        [/\b@Video(\d+)/g, '@视频$1'],
        [/\b@Audio(\d+)/g, '@音频$1'],
        [/\bclose-up/gi, '特写'],
        [/\bmedium shot/gi, '中景'],
        [/\bwide shot/gi, '全景'],
        [/\bslow motion/gi, '慢动作'],
        [/\bdolly-in/gi, '推镜'],
        [/\bdolly-out/gi, '拉镜'],
        [/\btracking shot/gi, '跟踪镜头'],
        [/\bhandheld/gi, '手持'],
        [/\bshallow depth of field/gi, '浅景深'],
        [/\bcinematic/gi, '电影感'],
    ];

    let result = prompt;
    for (const [pattern, replacement] of translations) {
        result = result.replace(pattern, replacement);
    }
    return result;
}

/**
 * 从文本中提取标签关键词
 * @param {string} text - 组合文本
 * @returns {string[]} 标签数组
 */
function extractTags(text) {
    const tagKeywords = [
        // 风格
        '电影', 'cinematic', '赛博朋克', 'cyberpunk', '仙侠', '武侠', '玄幻',
        '动漫', 'anime', '写实', '古风', '科幻', '恐怖', '喜剧', '浪漫',
        '广告', '产品', '短剧', '纪录片', 'documentary', '梵高', 'noir',
        '好莱坞', 'hollywood', '王家卫', '春晚', '模因', 'meme',
        // 运镜
        '一镜到底', '推镜', '拉镜', '环绕', '手持', '跟拍', '航拍',
        'tracking', 'dolly', 'crane', 'handheld',
        // 动作
        '战斗', 'battle', '舞蹈', 'dance', '追逐', 'chase', '爆炸',
        '变身', 'transform', '对决', '格斗',
        // 情绪
        '史诗', 'epic', '温馨', '搞笑', '恐惧', '震撼', '治愈',
        // 场景
        '城市', '夜晚', '雨', '沙漠', '竹林', '舞台', '办公室',
    ];

    const lowerText = text.toLowerCase();
    return tagKeywords.filter(kw => lowerText.includes(kw.toLowerCase()));
}

/**
 * 合并并去重
 * @param {Array} existing - 现有数据
 * @param {Array} newEntries - 新数据
 * @returns {Array} 合并后的数据
 */
function mergeAndDeduplicate(existing, newEntries) {
    // 用标题做简单去重
    const existingTitles = new Set(existing.map(e => e.title.toLowerCase()));
    const merged = [...existing];

    for (const entry of newEntries) {
        const titleLower = entry.title.toLowerCase();
        if (!existingTitles.has(titleLower)) {
            existingTitles.add(titleLower);
            merged.push(entry);
        } else {
            // 标题重复但可能不同版本，跳过
            console.log(`  [跳过重复] ${entry.title}`);
        }
    }

    return merged;
}

// ============ 主逻辑 ============

const args = process.argv.slice(2);
if (args.length < 2) {
    console.log('用法: node merge-sources.js <zerolu_readme_path> <makesupday_readme_path>');
    console.log('示例: node merge-sources.js ../../temp_zerolu/README-zh.md ../../temp_makesupday/README.md');
    process.exit(1);
}

const [zeroluPath, makesUpdayPath] = args;

// 1. 加载现有数据库
let existing = [];
if (fs.existsSync(DB_PATH)) {
    existing = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    console.log(`✅ 已加载现有数据库: ${existing.length} 条`);
} else {
    console.log('⚠️ 现有数据库不存在，将创建新数据库');
}

// 2. 解析 ZeroLu (中文)
console.log('\n📖 解析 ZeroLu/awesome-seedance (README-zh.md)...');
const zeroluContent = fs.readFileSync(path.resolve(zeroluPath), 'utf-8');
const zeroluData = parseZeroLu(zeroluContent);
console.log(`  找到 ${zeroluData.length} 条提示词`);
zeroluData.forEach(d => console.log(`  - ${d.title} [${d.category}]`));

// 3. 解析 makesupday (英文)
console.log('\n📖 解析 makesupday/Awesome-Seedance-2.0 (README.md)...');
const makesUpdayContent = fs.readFileSync(path.resolve(makesUpdayPath), 'utf-8');
const makesUpdayData = parseMakesupday(makesUpdayContent);
console.log(`  找到 ${makesUpdayData.length} 条提示词`);
makesUpdayData.forEach(d => console.log(`  - ${d.title} [${d.category}]`));

// 4. 合并
console.log('\n🔄 合并去重...');
const allNew = [...zeroluData, ...makesUpdayData];
const merged = mergeAndDeduplicate(existing, allNew);
console.log(`  合并前: ${existing.length} 条`);
console.log(`  新增: ${merged.length - existing.length} 条`);
console.log(`  合并后: ${merged.length} 条`);

// 5. 写入
fs.writeFileSync(DB_PATH, JSON.stringify(merged, null, 2), 'utf-8');
console.log(`\n✅ 已写入 ${DB_PATH}`);
console.log(`📊 最终数据库: ${merged.length} 条提示词`);

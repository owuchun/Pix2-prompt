import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const README_PATH = path.resolve(process.env.USERPROFILE || '', '.gemini/antigravity/scratch/temp_seedance_prompts/README_zh.md');
const OUTPUT_PATH = path.resolve(__dirname, '../references/seedance_prompts.json');

// Regex for extracting prompt blocks
// Matches: ### Title \n ... \n #### 📝 提示词 \n ... ```\n(Prompt Content)\n``` ...
const BLOCK_REGEX = /###\s+(.+?)\n([\s\S]+?)####\s+📝 提示词\s+\n\s*```\n([\s\S]+?)\n```/g;
// Regex for extracting Video URL from the block
const VIDEO_REGEX = /<a href="(https:\/\/github\.com\/YouMind-OpenLab\/awesome-seedance-2-prompts\/releases\/download\/videos\/\d+\.mp4)">/;

function parseReadme() {
    console.log(`Reading README from: ${README_PATH}`);

    if (!fs.existsSync(README_PATH)) {
        console.error(`Error: README file not found at ${README_PATH}`);
        process.exit(1);
    }

    const content = fs.readFileSync(README_PATH, 'utf-8');
    const prompts = [];
    let match;

    while ((match = BLOCK_REGEX.exec(content)) !== null) {
        const title = match[1].trim();
        const descriptionBlock = match[2].trim();
        const promptText = match[3].trim();

        // Extract video URL if present in the description block or after the code block
        // The regex captures up to the prompt code block. The video link usually follows.
        // We need to look ahead in the string from where the match ended, or expand the regex.
        // Simplified approach: Look for the video link in a substring starting from the match index.
        const remainingContent = content.substring(match.index + match[0].length, match.index + match[0].length + 1000);
        const videoMatch = VIDEO_REGEX.exec(remainingContent);
        const videoUrl = videoMatch ? videoMatch[1] : null;

        // Extract description (remove images/badges if possible)
        // Clean up description: Remove > blockquotes, images, badges
        const description = descriptionBlock
            .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images/badges
            .replace(/>\s*/g, '')           // Remove blockquotes
            .replace(/\s+/g, ' ')           // Normalize whitespace
            .trim();

        prompts.push({
            title,
            description,
            prompt: promptText,
            videoUrl,
            tags: [] // Todo: Auto-tagging logic could go here
        });
    }

    console.log(`Found ${prompts.length} prompts.`);

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(prompts, null, 2), 'utf-8');
    console.log(`Database saved to: ${OUTPUT_PATH}`);
}

parseReadme();

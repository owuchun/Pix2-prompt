import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const REFERENCES_DIR = join(import.meta.dir, "../../references");

async function main() {
    console.log(`Scanning references in: ${REFERENCES_DIR}`);
    const files = (await readdir(REFERENCES_DIR)).filter(f => f.endsWith(".json"));

    // Sort files to have deterministic order. 
    // You might want to prioritize certain files (e.g. "manual.json" or core categories) if you had a list.
    // For now, alphabetical.
    files.sort();

    const seenMap = new Map<string, string>(); // hash -> filename_where_first_seen
    const stats = {
        kept: 0,
        removed: 0,
        filesChanged: 0
    };

    for (const file of files) {
        const filePath = join(REFERENCES_DIR, file);
        const content = await readFile(filePath, "utf-8");

        if (!content.trim()) continue;

        let data;
        try {
            data = JSON.parse(content);
        } catch (e) {
            console.error(`Skipping invalid JSON: ${file}`);
            continue;
        }

        if (!Array.isArray(data)) continue;

        const newData = data.filter(item => {
            // Aggressive normalization (same as server.ts)
            let text = (item.content || item.description || "").toLowerCase();
            text = text.replace(/[^a-z0-9\u4e00-\u9fa5]/g, "").trim();

            if (!text || text.length < 5) return true; // Keep short/empty items (or scan them separately?)

            if (seenMap.has(text)) {
                // Duplicate found!
                stats.removed++;
                // console.log(`[Duplicate] Removing from ${file} (first seen in ${seenMap.get(text)}): "${(item.content || item.description).substring(0, 30)}..."`);
                return false;
            } else {
                seenMap.set(text, file);
                stats.kept++;
                return true;
            }
        });

        if (newData.length !== data.length) {
            console.log(`Updating ${file}: ${data.length} -> ${newData.length} items (-${data.length - newData.length})`);
            await writeFile(filePath, JSON.stringify(newData, null, 2));
            stats.filesChanged++;
        }
    }

    console.log("------------------------------------------------");
    console.log(`Cleanup Complete.`);
    console.log(`Total items kept: ${stats.kept}`);
    console.log(`Total duplicates removed: ${stats.removed}`);
    console.log(`Files updated: ${stats.filesChanged}`);
}

main();

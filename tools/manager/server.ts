import { serve } from "bun";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const REFERENCES_DIR = join(import.meta.dir, "../../references");

console.log(`Serving Data Manager at http://localhost:3000`);
console.log(`Scanning references in: ${REFERENCES_DIR}`);

serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);

        // Serve index.html
        if (url.pathname === "/" || url.pathname === "/index.html") {
            try {
                const html = await readFile(join(import.meta.dir, "index.html"), "utf-8");
                return new Response(html, { headers: { "Content-Type": "text/html" } });
            } catch (e) {
                return new Response("index.html not found", { status: 404 });
            }
        }

        // API: List files
        if (url.pathname === "/api/files") {
            try {
                const files = (await readdir(REFERENCES_DIR)).filter(f => f.endsWith(".json"));
                return Response.json(files);
            } catch (e) {
                return Response.json({ error: e.message }, { status: 500 });
            }
        }

        // API: Get file content
        if (url.pathname.startsWith("/api/file/") && req.method === "GET") {
            const filename = url.pathname.replace("/api/file/", "");
            try {
                const content = await readFile(join(REFERENCES_DIR, filename), "utf-8");
                return new Response(content, { headers: { "Content-Type": "application/json" } });
            } catch (e) {
                return new Response("File not found", { status: 404 });
            }
        }

        // API: Save file content (Overwrite with new filtered list)
        if (url.pathname.startsWith("/api/file/") && req.method === "POST") {
            const filename = url.pathname.replace("/api/file/", "");
            try {
                const body = await req.json();
                await writeFile(join(REFERENCES_DIR, filename), JSON.stringify(body, null, 2));
                return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
            } catch (e) {
                return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
            }
        }

        // API: Scan for duplicates
        if (url.pathname === "/api/duplicates") {
            try {
                const files = (await readdir(REFERENCES_DIR)).filter(f => f.endsWith(".json"));
                const contentMap = new Map(); // hash -> [{file, index, item}]

                for (const file of files) {
                    try {
                        const content = await readFile(join(REFERENCES_DIR, file), "utf-8");
                        if (!content.trim()) continue; // Skip empty files

                        let data;
                        try {
                            data = JSON.parse(content);
                        } catch (parseError) {
                            console.error(`Error parsing ${file}:`, parseError);
                            continue;
                        }

                        if (!Array.isArray(data)) continue; // Ensure it's an array

                        data.forEach((item, index) => {
                            // Create a signature based on aggressive normalization
                            let text = (item.content || item.description || "").toLowerCase();

                            // Remove punctuation and extra whitespace
                            // Use a simpler regex to avoid potential syntax issues in some environments
                            text = text.replace(/[^a-z0-9\u4e00-\u9fa5]/g, "").trim();

                            if (!text || text.length < 5) return;

                            if (!contentMap.has(text)) {
                                contentMap.set(text, []);
                            }
                            contentMap.get(text).push({ file, index, item });
                        });
                    } catch (err) {
                        console.error(`Error processing file ${file}:`, err);
                    }
                }

                // Filter only those with duplicates
                let duplicates = [];
                for (const [_, items] of contentMap.entries()) {
                    if (items.length > 1) {
                        // Sort items by file name to group them
                        duplicates.push(items.sort((a, b) => a.file.localeCompare(b.file)));
                    }
                }

                return Response.json(duplicates);
            } catch (e) {
                return Response.json({ error: e.message }, { status: 500 });
            }
        }

        // API: Bulk delete items
        // Expects: { "filename1": [index1, index2], "filename2": [index3] }
        if (url.pathname === "/api/bulk-delete" && req.method === "POST") {
            try {
                const deletions = await req.json(); // Map of filename -> array of indices (descending preferably)

                for (const [file, indices] of Object.entries(deletions)) {
                    const filePath = join(REFERENCES_DIR, file);
                    const content = await readFile(filePath, "utf-8");
                    let data = JSON.parse(content);

                    // Filter out items at specified indices
                    const indicesSet = new Set(indices);
                    data = data.filter((_, index) => !indicesSet.has(index));

                    await writeFile(filePath, JSON.stringify(data, null, 2));
                }

                return Response.json({ success: true });
            } catch (e) {
                return Response.json({ error: e.message }, { status: 500 });
            }
        }

        return new Response("Not Found", { status: 404 });
    },
});

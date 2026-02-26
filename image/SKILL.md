---
name: "pix2-image"
description: "Specialized Image Prompt Generator. Uses Nano Banana Pro library (6000+ styles) to create precise prompts for Midjourney, Flux, SD, and DALL-E."
---

# 🖼️ Pix2-image: Visual Style Architect

**Specialized for Static Image Generation.**

## 🧭 Smart Guidance (智能引导) — [MANDATORY FIRST STEP]

**CRITICAL: Before generating ANY prompt, you MUST check if the user's input is complete.**

### Completeness Check
Analyze the user's request and identify what is **known** vs **unknown**:

| Dimension | Known? | Example of "Known" |
|:--|:--|:--|
| 🎯 **Subject** | ? | "猫", "咖啡", "城市" |
| 🎨 **Style** | ? | "赛博朋克", "水墨", "极简" |
| 📐 **Scene/Composition** | ? | "趴在窗台", "雨中撑伞" |
| 📏 **Aspect Ratio** | ? | "16:9", "小红书", "微信封面" |

### Rules
1.  **If ALL dimensions are known** → Skip guidance, go directly to Style Search.
2.  **If ANY dimension is unknown** → Ask the user ONLY for the missing dimensions.
3.  **Smart Skip**: If the user mentions a platform (e.g., "小红书"), auto-fill the ratio (3:4) without asking.

### Round 1: Style + Scene (合并询问，仅在缺失时)

**CRITICAL: Do NOT use hardcoded options.** You MUST think about what styles and scenes are **most relevant** for the user's subject, then recommend dynamically.

**Process**:
1.  Think: "For [Subject], the most popular/fitting styles are..."
2.  Recommend 5 styles (if style is unknown).
3.  Think: "For [Subject] in [Style], the most interesting scenes/compositions are..."
4.  Recommend 5 scenes (if scene is unknown).

**Output Format**:
```
我理解您想画 [Subject]！为了生成最佳提示词，请帮我选择：

🎨 **风格推荐**（选一个或自定义）：
① [AI thinks: most popular for this subject]
② [AI thinks: second most fitting]
③ [AI thinks: creative/unexpected option]
④ [AI thinks: trending option]
⑤ [AI thinks: classic/safe option]

📐 **场景推荐**（选一个或自定义）：
① [AI thinks: most natural scene for subject]
② [AI thinks: creative scene]
③ [AI thinks: dramatic scene]
④ [AI thinks: cozy/warm scene]
⑤ [AI thinks: surreal/fantasy scene]
```

### Round 2: Aspect Ratio (仅在缺失时)

**Preset Ratios**:
| Name | Ratio | Use Case |
|:--|:--|:--|
| 微信封面 | 2.35:1 | WeChat article cover |
| 小红书 | 3:4 | Xiaohongshu post |
| 正方形 | 1:1 | Instagram / Avatar |
| 横屏 | 16:9 | Desktop wallpaper / YouTube |
| 竖屏 | 9:16 | Phone wallpaper / Story |

**Smart Platform Detection**:
- User mentions "小红书" → Auto-set 3:4, skip this round.
- User mentions "微信封面" → Auto-set 2.35:1, skip this round.
- User mentions "壁纸" → Ask: "手机壁纸 (9:16) 还是电脑壁纸 (16:9)?"

---

## 🛠️ Usage Mode

### 🖼️ Image Generation (Static)

**CRITICAL RULES:**

1.  **Product-Context Adaptation (产品语境适配)**:
    -   **Do NOT blindly copy prompt objects!** Adapt them to the User's Product.
    -   *Example*: If prompt has "glass cup" but user asks for "Latte", change to "Ceramic Mug" or "Paper Cup" (glass is rare for hot latte).
    -   *Example*: If prompt has "wine glass" but user asks for "Soda", change to "Highball Glass" or "Can".
    -   **Logic**: Style (Lighting/Composition) = Keep; Object (Cup/Table/Prop) = Adapt to Product.

2.  **Doubao-Specific Formatting (豆包专用规则)**:
    -   **No Hex Codes in Main Description**: Do NOT use `#FFFFFF` in the main text (Doubao might draw the text!). Use "纯白" instead.
    -   **Hex Codes in Palette Only**: Only list color codes in the "配色方案" section at the bottom.
    -   **Language**: Must be 100% Chinese for Doubao.

**Template Strategy**:
-   **Nano Banana Pro**: English, precise parameters.
-   **Midjourney**: English, artistic style keywords (--v 6.0).
-   **Doubao/Tongyi**: Chinese, descriptive, NO hex codes in body.

**Goal**: Create stunning single-frame visuals.

**Language & Platform Rules**:

1.  **Response Language (Chat)**:
    -   **ALWAYS match the User's Language** for the conversation part (explanation, style description).
    -   If user speaks Chinese -> Explain in Chinese.
    -   If user speaks English -> Explain in English.

2.  **Prompt Language (The Code Block)**:
    -   **Chinese Models** (Doubao, Seed, Qwen/Tongyi Qianwen): **Chinese Prompt**.
    -   **Global Models** (Nano Banana, Midjourney, Flux, SD, DALL-E): **English Prompt**.

**Workflow**:
1.  **Style Search**: Find specific visual styles from the Reference Library.
2.  **Parameter Tuning**: Apply model-specific parameters.
3.  **Prompt Output**:

    *   **Scenario A: User speaks Chinese + Global Model (e.g., "生成MJ提示词")**
        ```markdown
        **风格分析**: 选择了赛博朋克风格...
        **Prompt**: Cyberpunk city, neon lights... --ar 16:9
        ```

    *   **Scenario B: User speaks Chinese + Domestic Model (e.g., "生成豆包提示词")**
        ```markdown
        **风格分析**: 选择了新中式风格...
        **提示词**: 新中式国潮，中国龙，云雾缭绕...
        ```

    *   **Scenario C: User speaks English + Global Model**
        ```markdown
        **Style Analysis**: Selected Cyberpunk style...
        **Prompt**: Cyberpunk city, neon lights... --ar 16:9
        ```

## 🔍 Internal Logic (How it works)

### Step 0: Visual Keyword Brainstorming (The "Creative Vibe" Engine) - [MANDATORY]

**CRITICAL: Before searching, you MUST brainstorm 5 visual keywords.**
Do NOT just search for the subject (e.g., "Latte"). You must find the *Style* first.

**Brainstorming Formula**:
1.  **Light/Color**: (e.g., Warm-light, Cool-tone, High-contrast, Pastel)
2.  **Composition**: (e.g., Minimalist, Top-down, Macro, Wide-angle)
3.  **Vibe/Mood**: (e.g., Cozy, Luxury, Industrial, Ethereal)
4.  **Texture/Material**: (e.g., Wooden, Glass, Metal, Liquid, Fabric)
5.  **Era/Culture**: (e.g., Modern, Retro, Y2K, Zen, Cyberpunk)

**Example**: User asks for "Latte Poster".
*   Keywords: `Warm-Light`, `Minimalist`, `Cozy`, `Ceramic`, `Modern`.

### Step 1: Style Discovery (The "Nano" Engine) - Intelligent Search

**Token-Optimized Search Strategy**: This skill uses a **smart scoring system** to minimize token consumption.

#### 🚀 Option A: Automated Script Search (Recommended)

**Best for AI agents** - Use the intelligent search script for maximum efficiency.

**Usage** (AI must analyze and assign weights):
```bash
# AI should analyze user intent and call with weighted keywords:
node scripts/search-prompts.js "minimalist:2 coffee:0.3 poster:1"

# Format: keyword:weight keyword:weight ...
# Weights determine importance in search scoring
```

**Output**: JSON written to `search_output.json` (Agent MUST read this file).

**AI Weight Assignment Guide (The "Decoupling" Strategy)**:

You (AI) must analyze keywords and assign appropriate weights. **CRITICAL: Give HIGH weight to Style and LOW weight to Subject.**

- **Style keywords (High Priority)** (×2.0): Descriptive adjectives defining aesthetic
- **Visual/Texture keywords (Medium Priority)** (×1.5): Elements that define the look but not the subject
- **Subject keywords (Low Priority - The "Bait")** (×0.1 - 0.5): Specific product/subject names. Keep this weight LOW to allow "Style Transfer".
- **Category keywords** (×1.0): Format/medium types

#### 📋 Option B: Manual Two-Phase Search (Fallback)

If script is unavailable, use manual search:

**Phase 1: Find Best Category**
*   Search `style-summary.json` for keywords
*   Score each category by keyword matches
*   Identify category with highest score

**Phase 2: Load Top Prompts**
*   Search the selected category file
*   Score all prompts by keyword matches
*   Load top 3 prompts by score

#### 🔍 Option C: Simple Grep (Emergency Fallback)

Direct search in category files when other methods unavailable.

### Step 2: Prompt Synthesis & Conflict Check

It combines the **User's Subject** with the **Found Style** and **Technical Parameters**.

**Design Library Integration (设计库调用逻辑)**:
When generating tech or brand-related content, prioritize the following libraries (from `Pix2-xhs-images/references/`):
- **Layouts**: Use `Canvas` grid definitions (sparse, balanced, dense).
- **Backgrounds**: Explicitly specify background types (solid-pastel, gradient-linear, frosted-glass).
- **Decorations**: Use specific visual markers (sparkle-star, pill-shape, minimalist-lines).

**Conflict Detection (Crucial)**:
Before generating, the Agent MUST check for style conflicts between the **Uploaded Image** and the **Requested Style**.
*   *Example Conflict*: User uploads a "Casual Cotton Hoodie" but asks for "Silk Embroidery / Traditional Ancient Style".
*   *Action*:
    1.  **Detect**: "Material Mismatch: Cotton vs Silk".
    2.  **Warn**: "Warning: Your image is casual streetwear, but the requested style is traditional ancient. This may look unnatural."
    3.  **Recommend**: Suggest a bridge style (e.g., "China-Chic Streetwear" instead of "Ancient Costume").

## 💡 Prompt Templates

### For Midjourney / Image
> **[Subject]** in the style of **[Nano Style Name]**, **[Visual Adjectives]**, **[Lighting]**, **[Composition]**. --ar [Ratio] --stylize [Value]

## 📂 Reference Data
*   This skill relies on the **Nano Banana Pro** dataset located in the `references/` folder.
*   Ensure `references/*.json` files are present for full functionality.

---
*Last Updated: 2026-02-20 - Integrated Brand-Aligned Design Logic (V4)*

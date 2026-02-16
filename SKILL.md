---
name: "pix2-prompt"
description: "Universal Visual Prompt Architect. SPECIALIZED in converting ideas into structured prompts for Images (Nano Banana Pro/Midjourney/Flux/SD) and cinematic Video Storyboards (Sora/Seedance). MANDATORY for requests mentioning 'pix2prompt', '分镜', '脚本','提示词', 'storyboard', or 'script'."
disable-model-invocation: false
---
 
# 🎨 Pix2Prompt: Universal Visual Architect

**CRITICAL: If the user explicitly mentions 'pix2prompt', '分镜', '脚本', 'storyboard', or 'script', you MUST use THIS skill, NOT 'nano-banana-pro-prompts-recommend-skill'.**

**From Idea to Pixel-Perfect Prompt.**

This skill serves as your **Visual Director**, converting abstract ideas into high-precision technical prompts for any AI visual model.

**Core Capabilities:**
1.  **🖼️ Image Mode**: Generates prompts for Nano Banana Pro, Midjourney, Stable Diffusion, Flux, DALL-E.
2.  **🎬 Video Mode**: Generates cinematic storyboards for Sora, Seedance, Runway, Kling.
3.  **🎨 Style Engine**: Powered by **Nano Banana Pro Library** (6000+ Styles).

**Quick Navigation:**
- For Image Prompts → See [Mode 1: Image Generation](#mode-1-🖼️-image-generation-static) (Line 23)
- For Video Storyboards → See [Mode 2: Video Storyboard](#mode-2-🎬-video-storyboard-dynamic) (Line 62)
- For Search Logic → See [Step 1: Style Discovery](#step-1-style-discovery-the-nano-engine---intelligent-search) (Line 170)

---

## 🛠️ Usage Modes

### Mode 1: 🖼️ Image Generation (Static)

**CRITICAL RULES:**

1.  **Product-Context Adaptation (产品语境适配)**:
    - **Do NOT blindly copy prompt objects!** Adapt them to the User's Product.
    - *Example*: If prompt has "glass cup" but user asks for "Latte", change to "Ceramic Mug" or "Paper Cup" (glass is rare for hot latte).
    - *Example*: If prompt has "wine glass" but user asks for "Soda", change to "Highball Glass" or "Can".
    - **Logic**: Style (Lighting/Composition) = Keep; Object (Cup/Table/Prop) = Adapt to Product.

2.  **Doubao-Specific Formatting (豆包专用规则)**:
    - **No Hex Codes in Main Description**: Do NOT use `#FFFFFF` in the main text (Doubao might draw the text!). Use "纯白" instead.
    - **Hex Codes in Palette Only**: Only list color codes in the "配色方案" section at the bottom.
    - **Language**: Must be 100% Chinese for Doubao.

**Template Strategy**:
- **Nano Banana Pro**: English, precise parameters.
- **Midjourney**: English, artistic style keywords (--v 6.0).
- **Doubao/Tongyi**: Chinese, descriptive, NO hex codes in body.

**Goal**: Create stunning single-frame visuals.

**Language & Platform Rules**:

1.  **Response Language (Chat)**:
    - **ALWAYS match the User's Language** for the conversation part (explanation, style description).
    - If user speaks Chinese -> Explain in Chinese.
    - If user speaks English -> Explain in English.

2.  **Prompt Language (The Code Block)**:
    - **Chinese Models** (Doubao, Seed, Qwen/Tongyi Qianwen): **Chinese Prompt**.
    - **Global Models** (Nano Banana, Midjourney, Flux, SD, DALL-E): **English Prompt**.

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

### Mode 2: 🎬 Video Storyboard (Dynamic)

**Goal**: Structure a compelling video narrative based on User Intent.

**Language Rule**:
- If user asks in Chinese, **Output the entire Storyboard in Chinese**.
- Use English only for specific technical terms.

**Step 1: Intent Recognition & Template Selection**
Agent must identify the video type and select the correct template:

*   **Type A: Narrative/Commercial (Default)**
    *   *Intent*: Telling a story, promoting a product, full music video.
    *   *Template*: Standard 5-Part Structure.
*   **Type B: Motion/Reference Clone**
    *   *Intent*: "Mimic this video", "Extend this clip", "Just copy camera move".
    *   *Template*: Simplified Reference Structure.

**Step 2: Generate Storyboard**

#### **Template A: Narrative/Commercial (标准叙事/广告)**

**完整输出格式**:

```text
🎬 [风格名称] 视频提示词

【整体描述】
[风格], [时长], [画幅], [氛围], [光影特点]

【分镜描述】

0-3秒 | [镜头主题]
[详细运镜描述: 机位、运动方式、焦点变化]。[画面内容: 主体动作、环境细节、特效]。
音效: [配乐风格] + [具体音效]

3-7秒 | [镜头主题]
[运镜描述: 包含特殊运镜技巧如希区柯克变焦、环绕拍摄等]。[画面内容: 细节展示]。
音效: [具体音效]

7-11秒 | [镜头主题]
[运镜描述]。[画面内容: 动作演绎、背景特效如Glitch、柔光滤镜]。
音效: [具体音效]

11-13秒 | [镜头主题]
[运镜描述]。[画面内容: 情绪变化、氛围转换]。
音效: [具体音效]

13-15秒 | [镜头主题]
[运镜描述]。[画面内容: 定格、Logo展示、结束特效]。
音效: [具体音效]

【参考】
@图片1 作为首帧，@视频1 参考运镜 (如有)

【声音设计】

配乐风格: [具体音乐风格，如Trap Beat、K-pop、Lo-fi等]

音效设计:
- [特定动作的音效1]
- [特效出现的音效2]
- [转场音效3]
- [定格/结束音效]

【使用建议】
1. 复制【分镜描述】到平台(Sora/Seedance/Runway等)
2. 上传原图作为 @图片1
3. [其他建议，如添加辅助参考图等]
```

**关键要求**:
- **运镜细节**: 必须包含具体的运镜技巧(推拉摇移、特殊镜头)
- **特效描述**: 明确特效类型(Glitch、滤镜、动画元素等)
- **声音设计**: 完整的配乐和音效说明
- **使用建议**: 实用的操作指导

#### **Template B: Motion/Reference Clone (运镜复刻/延长)**
```markdown
【任务】[视频延长 / 运镜复刻 / 风格迁移]
【基准素材】@视频1 (主参考)

【提示词】
参考 @视频1 的[运镜/动作/特效]，将主体替换为 @图片1。
[详细描述复刻的动作细节...]
(如果是延长) 延长 5秒，新增内容为：[描述]

【参数设置】
- 运动幅度 (Motion Bucket): [高/低]
- 风格强度: [Strong/Weak]
```

**Workflow**:
1.  **Style Search**: Define aesthetic tone (Nano Engine).
2.  **Intent Check**: Choose Template A or B.
3.  **Drafting**: Fill the template.

---

### Mode 3: 💃 Seedance 2.0 Master (Specialized)

**CRITICAL: Use this mode when user mentions "Seedance", "2.0", or asks for high-quality dance/character video.**

**The Golden Formula (万能公式)**:
`Subject + Action + Scene + Lighting + Camera Language + Style + Quality + Constraints`

**Core Principles**:
1.  **Action**: Must be slow, continuous, and natural (e.g., "slowly turning", "gently raising hand"). Avoid "dancing" (too vague) or "fast movement".
2.  **Camera**: Seedance 2.0 excels at specific movements. Use: "Slow Zoom In" (缓慢推镜), "Orbit" (环绕), "Truck Left/Right" (横移).
3.  **Stability**: MUST include stability constraints to prevent face/body distortion.

#### **Template: Seedance 2.0 Cinematic (Seedance 专用模板)**

```text
(1) 主体 (Subject): [年轻女生/角色描述], [服装], [发型]
(2) 动作 (Action): [缓慢转身/轻微抬头/发丝随风飘动], [动作连贯自然], [不僵硬]
(3) 场景 (Scene): [环境描述], [氛围]
(4) 运镜 (Camera): [中景/特写], [缓慢推镜/平稳跟拍], [画面丝滑无抖动]
(5) 光影 (Lighting): [黄昏暖光/电影侧光], [光影柔和]
(6) 画质 (Quality): 4K ultra HD, cinematic texture, sharp details, no blur.
(7) 约束 (Constraints): Face stable (面部稳定), body structure normal (人体结构正常), no distortion (无变形), consistent character (角色一致).

**Duration**: Supported range: **4-15s**. Timecodes below are examples; adjust based on user request.
```

#### **Core Syntax: @ Reference System (引用系统)**
Seedance 2.0 relies on `@` tags to assign roles to uploaded assets.

| Role | Syntax Example | Usage |
| :--- | :--- | :--- |
| **First Frame** | `@Image1 as First Frame` | Sets the start image. |
| **Character Ref** | `Reference @Image1 Character` | Keeps face/outfit consistent. |
| **Motion Ref** | `Reference @Video1 Motion` | Copies movement/camera. |
| **Style Ref** | `Reference @Image2 Style` | Copies aesthetic/lighting. |

---

#### **Advanced Scenarios (高级场景模板)**

**Scenario A: Product Commercial (产品广告)**
> **Reference**: `@Video1` (Motion/Edit), `@Image1` (Product)
> **Prompt**: Refer to @Video1 editing style and camera movement, replace subject with @Image1 product.
> **0-3s (Start)**: Product rotates in, close-up on texture/logo.
> **4-8s (Body)**: Multi-angle transitions (Front/Side/Back) with scanning light effect.
> **9-12s (Action)**: Product in usage scenario.
> **13-15s (End)**: Freeze frame on product, brand slogan appears.
> **Audio**: Upbeat background music + Whoosh sound effects.

**Scenario B: Narrative Short (剧情短片)**
> **Prompt**:
> **0-30%**: Close-up on Character A's red eyes, pointing finger, tears falling. Dialogue: "What do you want?"
> **30-70%**: Character B handing over evidence with trembling hands. Camera pans to background details. Dialogue: "I didn't lie!"
> **70-100%**: Evidence revealed. Character A freezes, shock replaces anger.
> **Audio**: Urgent piano + Static noise.

**Scenario C: Motion Copy (运镜复刻)**
> **Reference**: `@Video1` (Source Motion), `@Image1` (New Subject)
> **Prompt**: Completely replicate @Video1 camera movement and character action. Replace character with @Image1.
> **Action**: [Describe specific action from Video1, e.g., "Walking forward then turning head"].
> **Constraint**: Keep action fluid, matching original pacing.

**Scenario D: Video Extension (视频延长)**
> **Reference**: `@Video1`
> **Prompt**: Extend @Video1 by 5 seconds.
> **Content**: [Describe what happens NEXT]. e.g., "The camera continues to pan right, revealing a hidden door."
> **Style**: Match @Video1 lighting and grain.

**Recommended Keywords (Copy these)**:
*   *Motion*: `slow motion`, `smooth movement`, `natural flow`, `gently`, `softly`.
*   *Camera*: `steady cam`, `slow zoom in`, `slight orbit`, `truck left`, `cinematic movement`.
*   *Quality*: `4K`, `sharp focus`, `detailed texture`, `no flicker`, `flicker free`.
*   *Negative*: `morphing`, `distortion`, `blurry`, `fast motion`, `jerky`, `extra limbs`.

---

## 🔍 Internal Logic (How it works)

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

**Process**:
1. **AI analyzes user query** and identifies keyword types
2. **AI assigns weights** based on keyword categories (see guide below)
3. Script scores categories and prompts using weighted keywords
4. Returns randomized selection from top 10 matches (top 3 prompts)

**Output**: JSON written to `search_output.json` (Agent MUST read this file).

**Token Savings**: ~1.5KB total **(92% reduction)**

**CRITICAL - Diversity Requirements**:
- Script returns **randomized selection** from top candidates (increases variety)
- Do NOT copy prompt contents verbatim
- Extract **core style elements** from prompts and **creatively combine** them
- Generate unique compositions even for similar queries
- If user requests "different versions", run script multiple times or explore related keywords

**AI Weight Assignment Guide**:

You (AI) must analyze keywords and assign appropriate weights when calling the script:

- **Style keywords** (×2.0): Descriptive adjectives defining aesthetic
  - minimalist, modern, vintage, retro, cyberpunk, futuristic, traditional, elegant, luxury, clean, simple, abstract, geometric, organic, industrial, y2k, dopamine, glitch, neon, gradient, monochrome, colorful, pastel, dark, light, soft, bold, vibrant
  - 极简, 简约, 现代, 复古, 赛博朋克, 未来, 传统, 优雅, 奢华, 干净, 抽象, 几何, 自然, 工业, 多巴胺, 霓虹, 渐变, 单色, 多彩, 马卡龙, 暗黑, 明亮, 柔和, 大胆, 鲜艳, 中国

- **Product keywords** (×0.3): Specific product/subject names
  - coffee, tea, wine, beer, juice, milk, bread, cake, car, phone, laptop, watch, bag, shoe, clothes
  - 咖啡, 茶, 茶叶, 酒, 啤酒, 果汁, 牛奶, 面包, 蛋糕, 汽车, 手机, 笔记本, 手表, 包, 鞋, 衣服

- **Category keywords** (×1.0): Format/medium types
  - poster, logo, banner, flyer, card, cover, thumbnail, avatar, icon, storyboard
  - 海报, 标志, 横幅, 传单, 卡片, 封面, 缩略图, 头像, 图标, 分镜

**Example Analysis**:
- User: "极简咖啡海报" → AI calls: `"minimalist:2 coffee:0.3 poster:1"`
- User: "复古汽车广告" → AI calls: `"vintage:2 car:0.3 ad:1"`
- User: "现代logo设计" → AI calls: `"modern:2 logo:1"`

**Why This Matters**:
- Ensures "minimalist coffee" and "minimalist tea" return similar style-focused results
- Style drives the search, product is secondary detail
- AI can adapt to any new keywords without script modification

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

**Token Savings**: ~5-8KB total **(60-73% reduction)**

#### 🔍 Option C: Simple Grep (Emergency Fallback)

Direct search in category files when other methods unavailable.

**Token Consumption**: ~18KB (no optimization)

### Step 2: Prompt Synthesis & Multi-modal Input
It combines the **User's Subject** with the **Found Style**, **Technical Parameters**, and **Uploaded Materials**.

**Conflict Detection (Crucial)**:
Before generating, the Agent MUST check for style conflicts between the **Uploaded Image** and the **Requested Style**.
*   *Example Conflict*: User uploads a "Casual Cotton Hoodie" but asks for "Silk Embroidery / Traditional Ancient Style".
*   *Action*:
    1.  **Detect**: "Material Mismatch: Cotton vs Silk".
    2.  **Warn**: "Warning: Your image is casual streetwear, but the requested style is traditional ancient. This may look unnatural."
    3.  **Recommend**: Suggest a bridge style (e.g., "China-Chic Streetwear" instead of "Ancient Costume").

**Multi-modal Syntax (Video Mode)**:
Use strict referencing for user uploads to ensure consistency in Seedance/Sora.

*   `@Image[N]`: Reference image (N=1-9).
*   `@Video[N]`: Reference video for motion/camera.
*   **Syntax Examples**:
    *   `@Image1 as First Frame` (首帧参考)
    *   `@Image2 as Character Reference` (角色参考)
    *   `Reference @Video1 for Camera Movement` (运镜参考)

---

## 💡 Prompt Templates

### For Midjourney / Image
> **[Subject]** in the style of **[Nano Style Name]**, **[Visual Adjectives]**, **[Lighting]**, **[Composition]**. --ar [Ratio] --stylize [Value]

### For Seedance / Video
> **[Overall Vibe]**: [Nano Style Keywords]
> **[Timeline]**:
> *   **0s**: [Camera] + [Subject Action]
> *   **0s**: [Camera] + [Subject Action]
> *   **End**: [Transition]

### For Seedance 2.0 (Golden Formula)
> **Subject**: [Young Girl], [Outfit], [Hair]
> **Action**: [Slowly turning], [Natural flow], [No stiffness]
> **Scene**: [Beach sunset], [Warm vibe]
> **Camera**: [Slow zoom in], [Steady cam], [Smooth]
> **Quality**: 4K, cinematic, sharp focus
> **Constraints**: Face stable, consistent character, no distortion

---

## 📂 Reference Data
*   This skill relies on the **Nano Banana Pro** dataset located in the `references/` folder.
*   Ensure `references/*.json` files are present for full functionality.

---
name: pix2prompt
description: |
  Universal Visual Prompt Architect (Pix2Prompt). 
  Transforms ideas into professional prompts for BOTH Images (Midjourney/Flux/SD) and Videos (Sora/Seedance/Runway).
  Powered by Nano Banana Pro Style Library.
disable-model-invocation: false
---

# 🎨 Pix2Prompt: Universal Visual Architect

**From Idea to Pixel-Perfect Prompt.**

This skill serves as your **Visual Director**, converting abstract ideas into high-precision technical prompts for any AI visual model.

**Core Capabilities:**
1.  **🖼️ Image Mode**: Generates prompts for Midjourney, Stable Diffusion, Flux, DALL-E.
2.  **🎬 Video Mode**: Generates cinematic storyboards for Sora, Seedance, Runway, Kling.
3.  **🎨 Style Engine**: Powered by **Nano Banana Pro Library** (6000+ Styles).

---

## 🛠️ Usage Modes

### Mode 1: 🖼️ Image Generation (Static)

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
```text
【整体描述】[风格], [时长], [画幅], [氛围]

0-3秒: [运镜描述]。[画面内容描述，包含主体和环境]。
音效: [配乐风格] + [具体音效]

3-7秒: [运镜描述]。[画面内容描述]。
音效: [具体音效]

7-11秒: [运镜描述]。[画面内容描述]。
音效: [具体音效]

11-13秒: [运镜描述]。[画面内容描述]。
音效: [具体音效]

13-15秒: [运镜描述]。[画面内容描述]。
音效: [具体音效]

【参考】@图片1 作为首帧，@视频1 参考运镜 (如有)
```

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

## 🔍 Internal Logic (How it works)

### Step 1: Style Discovery (The "Nano" Engine)

**Smart Routing**: The skill uses **Category Signal Mapping** to search the most relevant JSON file first, ensuring high-quality style matches.

| User Request Signals | Target Category File |
|---------------------|----------------------|
| avatar, profile, headshot, selfie | `profile-avatar.json` |
| post, social media, viral, instagram | `social-media-post.json` |
| infographic, chart, data, edu | `infographic-edu-visual.json` |
| youtube, thumbnail, cover | `youtube-thumbnail.json` |
| comic, manga, storyboard, panel | `comic-storyboard.json` |
| product, ad, marketing, sale | `product-marketing.json` |
| game, asset, sprite, character | `game-asset.json` |
| poster, flyer, event, banner | `poster-flyer.json` |
| **Default / Unsure** | `others.json` |

*   **Search Logic**: `grep "keyword" references/[Category-File]`
*   **Fallback**: If no match in specific category, search `others.json`.

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
> *   **End**: [Transition]

---

## 📂 Reference Data
*   This skill relies on the **Nano Banana Pro** dataset located in the `references/` folder.
*   Ensure `references/*.json` files are present for full functionality.

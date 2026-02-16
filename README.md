# 🎨 Pix2-prompt

> **Turn Any Idea into Professional AI Prompts (Image & Video)**

**Pix2-prompt** 是一个全能型视觉提示词生成器。它结合了 **Nano Banana Pro** 的海量风格库与 **影视级分镜逻辑**，为您提供最专业的 AI 视觉创作指令。

无论您使用哪款 AI 工具：
- **绘图 (Image)**: Midjourney, Flux, Stable Diffusion, DALL-E 3, Nano Banana Pro, 豆包 (Doubao), 千问 (Qwen-VL)
- **视频 (Video)**: Sora, Seedance, Runway Gen-2/3, Kling (可灵), Luma Dream Machine, Vidu

Pix2-prompt 都能为您生成精准、风格化的 Prompt。

## ✨ 核心特性 (Features)

*   **双模态支持 (Dual-Mode)**:
    *   🖼️ **Image Mode**: 支持 Midjourney, Flux, Stable Diffusion, DALL-E, 豆包 (Doubao), 千问 (Qwen-VL) 等主流绘图模型。
    *   🎬 **Video Mode**: 支持 Sora, Runway, Kling (可灵), Luma Dream Machine, Vidu 等视频生成模型。
    *   💃 **Seedance 2.0 Master**: **[NEW]** 专为 Seedance 2.0 优化的黄金公式（万能公式、稳定运镜、角色一致性约束）。
*   **风格引擎 (Style Engine)**: 内置 6000+ 专业视觉风格 (Y2K, Cyberpunk, Surrealism, Minimalist...)。
*   **结构化输出**: 自动补全光影、构图、相机参数、负面提示词。

## 🚀 性能优化 (Performance)

Pix2-prompt 采用智能搜索策略，相比传统方案 **节省 97% 的 Token**。

*   **旧方案**: Agent 读取完整 JSON 文件 (228KB) -> 消耗 ~60,000 Tokens。
*   **新方案**: 脚本搜索 -> 输出至 `search_output.json` (6KB) -> 消耗 ~1,500 Tokens。
*   **机制**: 脚本将搜索结果写入文件，Agent 仅需读取 `search_output.json`，避免了 stdout 缓冲区溢出导致的乱码问题。

## 📦 安装 (Installation)

1.  将 `Pix2-prompt` 文件夹放入技能目录：
    *   Windows: `C:/Users/[Username]/.agents/skills/`
    *   Mac/Linux: `~/.agents/skills/`
2.  **关键步骤**: 确保 `references/` 文件夹内包含风格库 JSON 文件。

## 🎮 使用 (Usage)

### 生成图片 (Image)
> **用户**: "帮我生成一张**极简主义风格**的咖啡海报。"
> **Pix2-prompt**:
> ```markdown
> **Prompt**: Minimalist coffee poster, flat lay composition, negative space, beige and dark brown color palette, soft morning light, Helvetica typography, high quality. --ar 3:4
> ```

### 生成视频 (Video)
> **用户**: "帮我写一个**赛博朋克风格**的摩托车夜骑视频分镜。"
> **Pix2-prompt**:
> ```markdown
> 【整体描述】Cyberpunk aesthetic, neon rain, futuristic city, fast-paced.
> 0-3s: [Low Angle Tracking], Motorcycle wheels spinning with neon trails...

### 💃 Seedance 2.0 Master (Specialized)
> **用户**: "帮我做一个产品展示视频，参考这个运镜，换成我的香水产品。"
> **Pix2-prompt**:
> ```markdown
> **Scenario**: Product Commercial (产品广告)
> **Golden Formula**: Subject + Action + Scene + Lighting + Camera + Style + Quality + Constraints
> **@ Reference**:
> - @Video1 as Motion Ref (运镜参考)
> - @Image1 as Product (产品主体)
> **Prompt**: Refer to @Video1 editing style... (See SKILL.md for full template)
> ```

**支持场景**:
1.  **产品广告 (Commercial)**: 多角度展示、光效扫描。
2.  **剧情短片 (Narrative)**: 情绪递进、台词对白。
3.  **运镜复刻 (Motion Copy)**: 像素级复刻参考视频动作。
4.  **视频延长 (Extension)**: 智能续写视频内容。

## 🌈 风格测试案例：多巴胺少女风 (Dopamine Girl Showcase)

以下展示了 Pix2-prompt 在生成特定风格（多巴胺少女风）时的生图与视频生成提示词。

### 1. 中文绘画 AI (豆包 / 千问) - 绘画提示词
> **Input**: "帮我生成一张多巴胺少女的绘画提示词，要高清写实，色彩鲜艳。"
> **Output**:
> **绘画提示词**:
> 极其细腻的写实画质，8k分辨率，电影级光影。一位充满青春活力的多巴胺女孩，身穿亮黄色的oversized卫衣搭配粉色短裤，戴着彩虹色的串珠项链和夸张的爱心墨镜。她手里拿着一支巨大的彩色棒棒糖，脸上洋溢着灿烂的笑容，嘴角有可爱的小酒窝。背景是阳光明媚的游乐园，色彩鲜艳饱和，周围有飞舞的彩色纸屑，逆光拍摄，发丝边缘有金色的轮廓光，景深柔和虚化。整体氛围活泼、快乐、治愈。

### 2. 英文绘画 AI (Nano / Midjourney) - Image Prompt
> **Input**: "Generate a prompt for a Dopamine Girl image, high quality."+穿黄色卫衣女孩.jpg
> **Output**:
> **Positive Prompt**: (best quality, masterpiece, photorealistic:1.3), 1girl, solo, dopamine style, vibrant colors, energetic pose, smiling brightly, wearing oversized neon green hoodie and hot pink shorts, colorful plastic hair clips, rainbow beaded necklace, holding a melting ice cream cone, amusement park background, sunny day, lens flare, sharp focus, 8k resolution, cinematic lighting. --ar 3:4 --v 6.0
> **Negative Prompt**: (worst quality, low quality:1.4), text, watermark, signature, blurry, deformed, bad anatomy, disfigured, dull colors, monochrome, dark, gloomy.

### 3. 中文视频 AI (即梦 / 可灵) - 视频分镜提示词
> **Input**: "生成一段15秒的多巴胺少女风视频分镜脚本，要求竖屏、高饱和度。"+穿粉色卫衣女孩.jpg
> **Output**:
> **【整体描述】** 活力多巴胺少女风格，15秒，竖屏9:16，高饱和糖果色与霓虹光效。
> *   **0-2秒 | 开场冲击**: 特写推镜，少女脸部特写，粉色爱心贴纸从眼角滑落，眼睛闪烁星星光效。
> *   **2-5秒 | 活力展示**: 中景环绕，少女穿着oversized彩色卫衣在涂鸦墙前跳跃，头发飞扬，背景霓虹闪烁。
> *   **6-10秒 | 动感高潮**: 全景快切，粉色房间→黄色旋转木马→蓝色泳池，少女在不同场景舞蹈，每秒快切。
> *   **13-15秒 | 收尾定格**: 特写定格，少女比剪刀手，背景霓虹灯牌"DOPAMINE"，画面闪白结束。
> *   **声音**: Hyperpop电子舞曲 (BPM 128) + 气泡破裂音效。

### 4. 英文视频 AI (Sora / Voe) - Video Prompt
> **Input**: "Generate a video prompt for a Dopamine Girl style video."
> **Output**:
> **Video Prompt**: A photorealistic, cinematic video in a vertical 9:16 format. The style is "Dopamine Girl," featuring high-saturation candy colors and neon lighting.
> *   **Scene**: A young energetic girl in a colorful oversized hoodie dancing in front of a graffiti wall.
> *   **Action**: The camera performs a dynamic orbiting shot around her as she jumps and laughs. Confetti rains down in slow motion.
> *   **Lighting**: Bright sunlight mixed with neon pink and blue fill lights.
> *   **Details**: High fidelity textures on clothing, hair moving naturally with the wind. The video has a joyful, energetic atmosphere typical of a music video.

## 🛠️ 目录结构
```text
Pix2-prompt/
├── SKILL.md          # 核心大脑
├── README.md         # 说明文档
└── references/       # 风格数据库
```

## 🙏 致谢 (Acknowledgements)

特别感谢以下开源项目提供的灵感与数据支持：

*   [**Nano Banana Pro Prompts Recommend Skill**](https://github.com/youmind-openlab/nano-banana-pro-prompts-recommend-skill) - 提供了强大的视觉风格提示词库。
*   [**ElementSix Skills**](https://github.com/elementsix/elementsix-skills) - 提供了优秀的 Agent Skill 设计范式。

---
*Open Source Visual Skill*

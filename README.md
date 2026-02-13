# 🎨 Pix2Prompt

> **Turn Any Idea into Professional AI Prompts (Image & Video)**

**Pix2Prompt** 是一个全能型视觉提示词生成器。它结合了 **Nano Banana Pro** 的海量风格库与 **影视级分镜逻辑**，为您提供最专业的 AI 视觉创作指令。

无论是生成一张 **Midjourney 大片**，还是制作一段 **Sora/Seedance 视频**，Pix2Prompt 都能搞定。

## ✨ 核心特性 (Features)

*   **双模态支持 (Dual-Mode)**:
    *   🖼️ **Image Mode**: 专为 Midjourney, Flux, SD 设计的绘图提示词。
    *   🎬 **Video Mode**: 专为 Sora, Seedance, Runway 设计的分镜脚本。
*   **风格引擎 (Style Engine)**: 内置 6000+ 专业视觉风格 (Y2K, Cyberpunk, Surrealism, Minimalist...)。
*   **结构化输出**: 自动补全光影、构图、相机参数、负面提示词。

## 📦 安装 (Installation)

1.  将 `pix2prompt` 文件夹放入技能目录：
    *   Windows: `C:/Users/[Username]/.agents/skills/`
    *   Mac/Linux: `~/.agents/skills/`
2.  **关键步骤**: 确保 `references/` 文件夹内包含风格库 JSON 文件 (需从 Nano Skill 复制)。

## 🎮 使用 (Usage)

### 生成图片 (Image)
> **用户**: "帮我生成一张**极简主义风格**的咖啡海报。"
> **Pix2Prompt**:
> ```markdown
> **Prompt**: Minimalist coffee poster, flat lay composition, negative space, beige and dark brown color palette, soft morning light, Helvetica typography, high quality. --ar 3:4
> ```

### 生成视频 (Video)
> **用户**: "帮我写一个**赛博朋克风格**的摩托车夜骑视频分镜。"
> **Pix2Prompt**:
> ```markdown
> 【整体描述】Cyberpunk aesthetic, neon rain, futuristic city, fast-paced.
> 0-3s: [Low Angle Tracking], Motorcycle wheels spinning with neon trails...
> 3-7s: [POV Shot], Rider dodging flying cars in the rain...
> ```

## 🛠️ 目录结构
```text
pix2prompt/
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

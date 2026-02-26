---
name: "pix2-prompt"
description: "Universal Visual Prompt Architect. ROUTER SKILL. Analyzes user intent and routes to either 'Pix2-image' (for static images/Midjourney) or 'Pix2-video' (for video storyboards/Seedance/Sora)."
---

# 🎨 Pix2-prompt: Visual Architect (Router)

**This skill acts as a ROUTER.**

## 🚦 Routing Logic

Analyze the user's request and determine if they want a **Static Image** or a **Video/Motion** content.

### 1. 🖼️ Image Mode
**Trigger Keywords**:
*   "Image", "Picture", "Drawing", "Photo", "Poster", "Wallpaper"
*   "Midjourney", "MJ", "Stable Diffusion", "SD", "Flux", "DALL-E", "Nano Banana"
*   "画图", "图片", "海报", "壁纸", "绘图"

**Action**:
Load and use instruction from: `image/SKILL.md`

### 2. 🎬 Video Mode (Director)
**Trigger Keywords**:
*   "Video", "Movie", "Film", "Clip", "Animation", "Motion"
*   "Sora", "Seedance", "Runway", "Kling", "Luma"
*   "Storyboard", "Script", "Director"
*   "视频", "电影", "动画", "分镜", "脚本", "导演", "运镜"

**Action**:
Load and use instruction from: `video/SKILL.md`

## ⚠️ Ambiguity Handler
If unclear (e.g., "Create a cyberpunk scene"), ask the user:
> "Do you want a static image (Midjourney) or a video (Seedance)?"

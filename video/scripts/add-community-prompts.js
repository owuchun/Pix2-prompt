/**
 * add-community-prompts.js
 * 手工添加从社区搜集的高质量独立提示词到数据库
 *
 * 用法：node add-community-prompts.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.resolve(__dirname, '../references/seedance_prompts.json');

// 从搜索结果中精选的社区高质量提示词
const communityPrompts = [
    {
        title: "骑士洞穴冒险多镜头序列",
        description: "银甲骑士进入黑暗洞穴的多镜头叙事，展示完整的情绪弧线和运镜变化。",
        prompt: "A multi-shot sequence of a knight in silver armor. Shot 1: Wide shot as he enters a dark cave with a torch. Shot 2: Close-up of his nervous eyes. Shot 3: He draws his sword, which glows blue. Low-angle shot.",
        prompt_zh: "银甲骑士的多镜头序列。镜头1：全景，他手持火把走入漆黑洞穴。镜头2：特写他紧张的双眼。镜头3：他拔出发着蓝色光芒的剑。仰拍镜头。",
        source: "weshop.ai 社区",
        category: "多镜头叙事",
        tags: ["史诗", "cinematic", "战斗", "多镜头"]
    },
    {
        title: "武侠雨夜竹林对决（带参考视频）",
        description: "武侠风格的竹林夜战，包含完整的运镜指令和物理效果要求。展示如何通过@参考系统控制角色一致性。",
        prompt: "武侠风格男性剑客（基于参考视频中的角色），身穿黑色武服，在夜晚的雨中竹林与敌人搏斗。快速剑术连击，可见的剑光轨迹和飞溅的水花。快速跟拍镜头、摇臂镜头和快速特写。电影级运镜语言。保持角色外观和服装一致性。逼真物理效果：湿透衣物、雨水交互。参考：上传武术视频+角色图片。",
        source: "glbgpt.com 深度指南",
        category: "电影风格",
        tags: ["武侠", "战斗", "cinematic", "雨", "竹林"]
    },
    {
        title: "奢侈品产品揭幕（商业大片级）",
        description: "高端电商叙事，微距+生活方式双镜头结构，展示如何用@引用系统锁定产品外观。",
        prompt: "[Shot 1: Macro] @ProductRef rotating slowly on a velvet pedestal, soft rim lighting, luxury aesthetic. [Shot 2: Lifestyle] A hand in elegant attire reaching out to grab @ProductRef on a marble countertop. 60fps, creamy bokeh, commercial grade.",
        prompt_zh: "[镜头1: 微距] @产品参考图 在天鹅绒基座上缓慢旋转，柔和轮廓光，奢华美学。[镜头2: 生活方式] 一只佩戴精致饰品的手伸向大理石台面上的@产品参考图。60fps，奶油般虚化，商业级品质。",
        source: "vmake.ai 高级指南",
        category: "产品广告",
        tags: ["广告", "产品", "cinematic"]
    },
    {
        title: "一镜到底间谍追踪（连续跟拍）",
        description: "从楼梯到走廊到天台的一镜到底跟拍，展示One-Take模式的最佳实践。",
        prompt: "@Image1 through @Image5, one continuous tracking shot following a runner up stairs, through corridors, onto the roof, ending with an overhead view of the city. Spy thriller style. @Image1 as first frame. Front-facing tracking shot of woman in red coat walking forward. Full shot following her. Pedestrians repeatedly block the frame. She reaches a corner, reference @Image2's corner architecture. Fixed shot as woman exits frame, disappears around corner.",
        prompt_zh: "@图片1至@图片5，一个连续跟踪镜头跟随奔跑者上楼梯、穿过走廊、到达屋顶，以城市俯瞰结束。间谍惊悚风格。@图片1作为首帧。正面跟踪镜头拍摄红衣女子向前行走。全身跟拍。行人反复遮挡画面。她到达拐角，参考@图片2的转角建筑。固定镜头拍摄女子出画，消失在拐角后。",
        source: "wavespeed.ai 教程",
        category: "一镜到底",
        tags: ["一镜到底", "cinematic", "追逐"]
    },
    {
        title: "音乐卡点换装MV",
        description: "基于音乐节拍的多图卡点换装视频，展示Beat-Sync音乐卡点编辑技术。",
        prompt: "海报中的女孩不断更换服装。服装风格参考@图片1和@图片2。她手持@图片3中的包包。视频节奏参考@视频1。多张图片与音乐卡点同步：@图片1至@图片7按照@视频1的关键帧位置和整体节奏进行剪切。画面中的角色更加动感。整体风格更加梦幻。强烈的视觉冲击力。根据音乐和视觉流动需要调整参考图片的构图。在镜头之间添加灯光变化。",
        source: "wavespeed.ai 教程",
        category: "音乐视频",
        tags: ["音乐", "dance", "变身"]
    },
    {
        title: "玻璃碎裂音效同步（慢动作）",
        description: "展示如何通过音效波形控制视觉节奏，实现音画完美同步。",
        prompt: "Match the glass shattering in Shot 2 to the peak of the waveform in @Audio1. A glass falls from table in slow motion. Impact with floor, shattering into pieces. Audio: Build-up: Tense silence as glass tips. Impact: Crisp shatter sound perfectly synced. Aftermath: Tinkling of settling pieces. Camera: High-speed slow motion, focus pull from glass to shards.",
        prompt_zh: "将镜头2中玻璃碎裂的瞬间与@音频1的波形峰值对齐。玻璃从桌子上慢动作坠落。撞击地面，碎成碎片。音效设计：蓄力期-玻璃倾斜时的紧张寂静；碎裂-清脆的碎裂声完美同步；余韵-碎片落地的叮当声。镜头：高速慢动作，从玻璃到碎片的焦点转移。",
        source: "weshop.ai 教程",
        category: "音效同步",
        tags: ["慢动作", "cinematic"]
    },
    {
        title: "电影悬疑开场（短片级）",
        description: "短片级的悬疑开场设计，包含光影控制和音乐暗示。",
        prompt: "Create a cinematic intro for a short film with a character entering a dimly lit room, dramatic camera pans, and suspenseful music. The character slowly pushes open a heavy wooden door. Dust particles float in a beam of light. Camera follows from behind, then circles around as they look up in awe.",
        prompt_zh: "为短片创建电影级开场：角色走进一个昏暗的房间，戏剧性的摇镜，悬疑配乐。角色缓慢推开一扇沉重的木门。尘埃颗粒漂浮在一束光线中。镜头从背后跟拍，然后在角色抬头惊叹时环绕展示。",
        source: "Dreamina 官方推荐",
        category: "电影风格",
        tags: ["cinematic", "恐怖", "悬疑"]
    },
    {
        title: "奇幻森林战斗（游戏预可视化）",
        description: "游戏级预可视化镜头，包含魔法特效和地形互动。",
        prompt: "Visualize a fantasy battle between heroes and monsters in a forest with magic effects, detailed terrain, and animated camera sweeps. Heroes cast spells that illuminate the dark forest. Monsters surge forward through underbrush. Camera sweeps from aerial establishing shot down to ground-level action.",
        prompt_zh: "可视化森林中英雄与怪物的奇幻战斗：魔法特效，精细地形，动态镜头扫掠。英雄释放法术照亮黑暗森林。怪物从灌木丛中涌出。镜头从航拍全景俯冲到地面级近身动作。",
        source: "Dreamina 官方推荐",
        category: "动漫动画",
        tags: ["玄幻", "战斗", "epic"]
    },
    {
        title: "中国水墨风竖屏叙事",
        description: "传统水墨画风格的竖屏叙事，展示如何用画风关键词控制视觉质感。",
        prompt: "传统中国水墨画风格，宣纸纹理背景，水墨色彩渐变。竖屏9:16。一位身着白色汉服的女子在月光下的山间小路上独行。墨色的松林在两侧延伸，墨迹浓淡交替。清风拂过，衣袂飘飘。远处的山峦用淡墨晕染，层层递进。月光如水银倾泻，在小路上留下斑驳的影子。女子停下脚步，仰望一轮满月，表情宁静而感伤。镜头缓缓上升，最终定格在月亮与群山的广阔画面上。全程以古筝和箫的悠远旋律为背景音乐。禁止：任何文字、字幕、LOGO或水印，禁止包含现代元素。",
        source: "YouMind社区 + 嫦娥奔月衍生",
        category: "古风叙事",
        tags: ["古风", "cinematic", "水墨"]
    },
    {
        title: "霸总复仇(三幕剧·竖屏短剧)",
        description: "爆款竖屏短剧模板：被辞退→买下公司→反杀坐上CEO椅，带对白和镜头指令。",
        prompt: '风格：现代商战，复仇爽剧，权力反转，设计师西装\n场景：开放式豪华办公室，落地窗，城市天际线\n\n场景1（0:00-0:05）：卑微的员工收到解雇信，同事嘲笑\n[对白："你被解雇了。保安会送你出去。"]\n\n场景2（0:05-0:10）：6个月后。同一个人穿着名牌西装回来，买下了公司。前上司脸色惨白。\n[对白："我想你坐的是我的椅子。"]\n\n场景3（0:10-0:15）：坐上CEO椅，戏剧性地转身。前同事们鞠躬。嘴角微扬。\n[对白："5分钟后开会。别迟到。"]\n\n镜头：从下仰拍的力量感镜头、戏剧性揭幕、反应特写\n光线：落地窗的黄金时段光线，戏剧性阴影\n时长：15秒',
        source: "makesupday 社区翻译版",
        category: "短剧网剧",
        tags: ["短剧", "cinematic", "办公室"]
    }
];

// 加载现有数据库
let db = [];
if (fs.existsSync(DB_PATH)) {
    db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    console.log(`✅ 已加载现有数据库: ${db.length} 条`);
}

// 去重合并
const existingTitles = new Set(db.map(e => e.title.toLowerCase()));
let added = 0;
for (const p of communityPrompts) {
    if (!existingTitles.has(p.title.toLowerCase())) {
        db.push(p);
        existingTitles.add(p.title.toLowerCase());
        added++;
        console.log(`  ✅ 新增: ${p.title}`);
    } else {
        console.log(`  ⏭️ 跳过: ${p.title} (已存在)`);
    }
}

// 写入
fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
console.log(`\n📊 新增 ${added} 条，总计 ${db.length} 条提示词`);

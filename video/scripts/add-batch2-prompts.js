/**
 * add-batch2-prompts.js
 * 第2批大规模提示词补充：
 * - songguoxs/seedance-prompt-skill 的范例提示词 (~15条)
 * - 搜索结果中精选的高质量独立提示词 (~25条)
 *
 * 用法：node add-batch2-prompts.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.resolve(__dirname, '../references/seedance_prompts.json');

// ============ songguoxs/seedance-prompt-skill 提取的提示词 ============
const songguoxsPrompts = [
    {
        title: "黑衣男子街头逃亡（纯文本生成）",
        description: "最基础的纯文本生成示例，仅靠文字描述生成完整追逐视频，展示主体+动作+环境+镜头语言的标准结构。",
        prompt: "镜头跟随黑衣男子快速逃亡，后面一群人在追，镜头转为侧面跟拍，人物惊慌撞倒路边的水果摊爬起来继续逃，人群慌乱的声音。",
        source: "songguoxs/seedance-prompt-skill",
        category: "追逐场景",
        tags: ["追逐", "cinematic", "手持", "跟拍"]
    },
    {
        title: "下班回家温馨瞬间（角色一致性）",
        description: "展示通过@引用系统保持角色一致性的完整示例，从疲惫到温馨的情绪转变。",
        prompt: '男人@图片1下班后疲惫的走在走廊，脚步变缓，最后停在家门口，脸部特写镜头，男人深呼吸，调整情绪，收起了负面情绪，变得轻松，然后特写翻找出钥匙，插入门锁，进入家里后，他的小女儿和一只宠物狗，欢快的跑过来迎接拥抱，室内非常的温馨，全程自然对话',
        source: "songguoxs/seedance-prompt-skill",
        category: "情感叙事",
        tags: ["温馨", "cinematic", "角色一致"]
    },
    {
        title: "包包商业化摄影展示（产品拍摄）",
        description: "展示多图参考的产品展示模式：侧面@图1、正面@图2、材质@图3，全方位细节展示。",
        prompt: "对@图片2的包包进行商业化的摄像展示，包包的侧面参考@图片1，包包的表面材质参考@图片3，要求将包包的细节均有所展示，背景音恢宏大气",
        source: "songguoxs/seedance-prompt-skill",
        category: "产品广告",
        tags: ["广告", "产品", "cinematic"]
    },
    {
        title: "电梯恐惧希区柯克变焦（运镜复刻）",
        description: "展示运镜精准复刻能力：参考视频运镜+希区柯克变焦+环绕镜头+跟随镜头的复合运镜。",
        prompt: "参考@图1的男人形象，他在@图2的电梯中，完全参考@视频1的所有运镜效果还有主角的面部表情，主角在惊恐时希区柯克变焦，然后几个环绕镜头展示电梯内视角，电梯门打开，跟随镜头走出电梯，电梯外场景参考@图片3，男人环顾四周",
        source: "songguoxs/seedance-prompt-skill",
        category: "运镜技术",
        tags: ["cinematic", "恐怖", "运镜"]
    },
    {
        title: "女星舞台表演复刻（动作参考）",
        description: "展示舞蹈动作和运镜双重参考的完整示例。",
        prompt: "@图片1的女星作为主体，参考@视频1的运镜方式进行有节奏的推拉摇移，女星的动作也参考@视频1中女子的舞蹈动作，在舞台上活力十足地表演",
        source: "songguoxs/seedance-prompt-skill",
        category: "舞蹈表演",
        tags: ["dance", "舞蹈", "舞台"]
    },
    {
        title: "VR穿越三重世界（创意转场）",
        description: "展示创意特效转场能力：人物戴上VR眼镜→穿越蓝色宇宙→进入像素世界，用@引用系统控制每个场景。",
        prompt: "将@视频1的人物换成@图片1，@图片1为首帧，人物带上虚拟科幻眼镜，参考@视频1的运镜，及近的环绕镜头，从第三人称视角变成人物的主观视角，在AI虚拟眼镜中穿梭，来到@图片2的深邃的蓝色宇宙，出现几架飞船穿梭向远方，镜头跟随飞船穿梭到@图片3的像素世界",
        source: "songguoxs/seedance-prompt-skill",
        category: "创意特效",
        tags: ["科幻", "cinematic", "transform"]
    },
    {
        title: "水墨太极（风格迁移）",
        description: "黑白水墨风格特效迁移：参考视频特效和动作，生成水墨太极画面。",
        prompt: "黑白水墨风格，@图片1的人物参考@视频1的特效和动作，上演一段水墨太极功夫",
        source: "songguoxs/seedance-prompt-skill",
        category: "风格迁移",
        tags: ["古风", "武侠"]
    },
    {
        title: "漫画分镜演绎（剧情补全）",
        description: "将静态漫画分镜转化为动态视频的完整示范。",
        prompt: '将@图1以从左到右从上到下的顺序进行漫画演绎，保持人物说的台词与图片上的一致，分镜切换以及重点的情节演绎加入特殊音效，整体风格诙谐幽默；演绎方式参考@视频1',
        source: "songguoxs/seedance-prompt-skill",
        category: "动漫动画",
        tags: ["动漫", "喜剧"]
    },
    {
        title: "童年四季治愈片头（分镜脚本生成）",
        description: "根据分镜头脚本图片自动生成治愈系纪录片片头。",
        prompt: '参考@图片1的专题片的分镜头脚本，参考@图片1的分镜、景别、运镜、画面和文案，创作一段15s的关于"童年的四季"的治愈系片头',
        source: "songguoxs/seedance-prompt-skill",
        category: "纪录片",
        tags: ["温馨", "治愈", "cinematic"]
    },
    {
        title: "Lucky Coffee 广告延长（视频延长）",
        description: "展示视频延长功能：从光影变化→咖啡豆坠落→品牌文字显现的完整时间线。",
        prompt: '将@视频1延长15秒。1-5秒：光影透过百叶窗在木桌、杯身上缓缓滑过，树枝伴随着轻微呼吸般的晃动。6-10秒：一粒咖啡豆从画面上方轻轻飘落，镜头向咖啡豆推进至画面黑屏。11-15秒：英文渐显第一行"Lucky Coffee"，第二行"Breakfast"，第三行"AM 7:00-10:00"。',
        source: "songguoxs/seedance-prompt-skill",
        category: "产品广告",
        tags: ["广告", "产品"]
    },
    {
        title: "街角向日葵温暖叙事（向前延长）",
        description: "展示向前延长功能：为已有视频补充前置叙事场景。",
        prompt: "向前延长10s，温暖的午后光线里，镜头先从街角那排被微风掀动的遮阳篷开始，慢慢下移到墙根处几株探出头的小雏菊。紧接着，画面里出现主人公的红色板鞋，他正蹲在街边花摊前，笑着把一大捧向日葵拢进怀里",
        source: "songguoxs/seedance-prompt-skill",
        category: "情感叙事",
        tags: ["温馨", "治愈"]
    },
    {
        title: "鱼眼镜头马匹（多模态声音控制）",
        description: "展示复杂多模态组合：鱼眼镜头参考@视频1 + 马匹参考@视频2 + 音效参考@视频3。",
        prompt: "固定镜头，中央鱼眼镜头透过圆形孔洞向下窥视，参考视频1的鱼眼镜头，让@视频2中的马看向鱼眼镜头，参考@视频1中的说话动作，背景BGM参考@视频3中的音效。",
        source: "songguoxs/seedance-prompt-skill",
        category: "实验性",
        tags: ["实验", "cinematic"]
    },
    {
        title: "地产纪录片旁白（声音参考）",
        description: "展示声音参考能力：旁白音色参考@视频1，画面由写字楼照片生成。",
        prompt: '根据提供的写字楼宣传照，生成一段15秒电影级写实风格的地产纪录片，采用2.35:1宽银幕，24fps，细腻的画面风格，其中旁白的音色参考@视频1',
        source: "songguoxs/seedance-prompt-skill",
        category: "商业广告",
        tags: ["纪录片", "广告", "cinematic"]
    },
    {
        title: "剧情颠覆·桥上推人（视频编辑）",
        description: "展示视频编辑的剧情颠覆能力：将温柔剧情反转为悬疑暗黑。",
        prompt: "颠覆@视频1里的剧情，男人眼神从温柔瞬间转为冰冷狠厉，在女主毫无防备的瞬间，猛地将女主从桥上往外推",
        source: "songguoxs/seedance-prompt-skill",
        category: "悬疑惊悚",
        tags: ["恐怖", "cinematic"]
    },
    {
        title: "大白鲨背后浮现（视频编辑·元素增加）",
        description: "展示视频编辑的元素增加能力：在原视频中添加恐怖元素。",
        prompt: "将视频1女人发型变成红色长发，图片1中的大白鲨缓缓浮出半个脑袋，在她身后。",
        source: "songguoxs/seedance-prompt-skill",
        category: "视频编辑",
        tags: ["恐怖", "transform"]
    },
    {
        title: "多图音乐卡点视频（节奏匹配）",
        description: "7张图+视频节奏参考的完整音乐卡点模板。",
        prompt: "@图片1@图片2@图片3@图片4@图片5@图片6@图片7中的图片根据@视频中的画面关键帧的位置和整体节奏进行卡点，画面中的人物更有动感，整体画面风格更梦幻，画面张力强，可根据音乐及画面需求自行改变参考图的景别，及补充画面的光影变化",
        source: "songguoxs/seedance-prompt-skill",
        category: "音乐视频",
        tags: ["音乐", "dance"]
    },
    {
        title: "舞台大秀8镜头硬切（技术参数示范）",
        description: "展示技术参数指定法：画幅比2.35:1 + 24fps + 8镜头硬切 + 声音设计要求。",
        prompt: '关键词：脚步、呼吸、衣料摩擦更真实，观感更"现场"\n2.35:1，24fps，15秒，8镜头硬切\n霓虹高饱和冷暖对比，现代舞台\n浅景深突出动作，动作清晰，运动模糊真实\n声音设计优先：舞步声、鞋底摩擦、呼吸、衣料声必须清晰并与节拍贴合\n禁止文字logo水印',
        source: "songguoxs/seedance-prompt-skill",
        category: "舞蹈表演",
        tags: ["dance", "舞蹈", "舞台", "cinematic"]
    },
    {
        title: "可乐360度爆炸分解（3D产品特效）",
        description: "经典产品广告特效：360度旋转→蓄力停住→分裂展示→快速合体。",
        prompt: "图1中的可口可乐饮料,360度高速旋转2圈后,突然停住蓄力分裂成了3个部分进行展示。随后分解后的可口可乐饮料罐的上中下三部分快速向内旋转合成，一罐完整的可口可乐饮料，3D渲染产品展示特效,动感产品特效展示",
        source: "songguoxs/seedance-prompt-skill",
        category: "产品广告",
        tags: ["广告", "产品", "3D"]
    },
    {
        title: "剑修云海仙山出场30秒（超长视频第1段）",
        description: "超长视频分段拼接示例的第1段：云海→山巅→拔剑出鞘的完整15秒铺垫。",
        prompt: '15秒仙侠镜头，0-5秒：俯拍云海翻涌中的仙山全景，镜头缓缓下推穿过云层；6-10秒：剑修站在山巅悬崖边，背对镜头，衣袍随风飘动，远处魔气升腾；11-15秒：剑修缓缓转身面向镜头，拔剑出鞘，剑刃金光闪烁，目光坚毅低声道"来了"，定格在剑修持剑面向镜头的画面。',
        source: "songguoxs/seedance-prompt-skill",
        category: "仙侠动画",
        tags: ["仙侠", "epic", "cinematic"]
    },
    {
        title: "剑修空战魔兽30秒（超长视频第2段·延长）",
        description: "超长视频分段拼接示例的第2段：接续上段的空中激战→落地收剑。",
        prompt: '将@视频1延长15秒。0-5秒：接上段剑修持剑画面，数十只暗影魔兽从远处魔气中飞扑而来，剑修纵身跃起迎敌；6-10秒：空中激战，剑气纵横，魔兽被斩成灰烬粒子消散，镜头环绕快切；11-15秒：剑修落地收剑，身后爆炸的金色粒子缓缓飘散，镜头缓推特写剑修侧脸，音效渐弱。',
        source: "songguoxs/seedance-prompt-skill",
        category: "仙侠动画",
        tags: ["仙侠", "战斗", "epic"]
    }
];

// ============ 搜索结果中精选的独立提示词 ============
const webSearchPrompts = [
    {
        title: "纽约雨夜霓虹行走（竖屏电影）",
        description: "雨夜纽约街头的电影感行走场景，适合9:16竖屏短视频。",
        prompt: "A rainy New York City street at night, neon reflections on the road, a person walking with an umbrella, slow cinematic push in, soft film lighting, emotional mood, realistic style, 5 seconds, vertical 9:16.",
        prompt_zh: "纽约雨夜街头，霓虹灯在潮湿路面上的倒影，一个人撑着雨伞行走，缓慢电影感推镜，柔和胶片打光，情绪感氛围，写实风格，5秒，竖屏9:16。",
        source: "complexityrd.site 社区",
        category: "电影风格",
        tags: ["cinematic", "城市", "夜晚", "雨"]
    },
    {
        title: "小镇日出晨光薄雾（氛围感竖屏）",
        description: "宁静小镇日出的电影感氛围镜头。",
        prompt: "A quiet small town street at sunrise, warm golden light, empty roads, gentle fog, slow camera glide forward, peaceful cinematic atmosphere, 5 seconds, vertical 9:16.",
        prompt_zh: "宁静小镇街道日出时分，温暖金色光线，空旷道路，轻柔薄雾，镜头缓缓向前滑行，宁静电影感氛围，5秒，竖屏9:16。",
        source: "complexityrd.site 社区",
        category: "氛围感",
        tags: ["cinematic", "温馨", "治愈"]
    },
    {
        title: "惊讶表情特写反应镜头",
        description: "展示浅景深面部特写的悬疑反应镜头。",
        prompt: "A dramatic close-up of a face reacting to surprising news, realistic skin texture, cinematic lighting from the side, shallow depth of field, slow zoom in, suspense mood, 4 seconds, vertical 9:16.",
        prompt_zh: "一个面部对惊人消息做出反应的戏剧性特写，逼真皮肤质感，侧面电影打光，浅景深，缓慢推镜，悬疑情绪，4秒，竖屏9:16。",
        source: "complexityrd.site 社区",
        category: "人物特写",
        tags: ["cinematic", "特写"]
    },
    {
        title: "雷暴公寓窗景（生活氛围）",
        description: "从咖啡杯到窗外雷暴的反射镜头，展示室内暖光与室外戏剧的对比。",
        prompt: "A modern apartment window view during a thunderstorm, lightning in the distance, cozy interior warm light, camera slowly pans from coffee cup to window, reflective surfaces, dramatic mood, realistic style, 6 seconds, vertical 9:16.",
        prompt_zh: "雷暴期间的现代公寓窗景，远处闪电划过，温馨室内暖光，镜头从咖啡杯缓缓摇向窗外，反射面，戏剧性氛围，写实风格，6秒，竖屏9:16。",
        source: "complexityrd.site 社区",
        category: "氛围感",
        tags: ["cinematic", "城市", "雨"]
    },
    {
        title: "太空碎片中的宇航员（科幻POV）",
        description: "第一人称POV追踪镜头，宇航员在太空碎片中漂浮。",
        prompt: "An astronaut drifting through space debris, reflective helmet showing Earth below, melancholic mood, close-up camera, cinematic 8K, first-person POV, tracking shot.",
        prompt_zh: "宇航员在太空碎片中漂浮，反射头盔映射出下方地球，忧郁情绪，特写镜头，电影级8K，第一人称POV，追踪镜头。",
        source: "mymagicprompt.com 社区",
        category: "科幻",
        tags: ["科幻", "epic", "cinematic"]
    },
    {
        title: "东京赛博朋克崖边眼部HUD（双镜头叙事）",
        description: "展示双镜头剪切：全景东京→眼部HUD特写，赛博朋克风格。",
        prompt: "[Shot 1: Wide shot] A lone figure standing on a cliff overlooking a futuristic Tokyo, neon lights reflecting in puddles. [Cut to: Extreme Close-up] The figure's eyes narrowing as a digital HUD overlays their pupil. Cinematic lighting, 35mm lens, high contrast, 4k.",
        prompt_zh: "[镜头1: 全景] 孤独身影站在悬崖上俯瞰未来东京，霓虹灯在水坑中的倒影。[切至: 极端特写] 人物眼睛微眯，数字HUD覆盖在瞳孔上。电影打光，35mm镜头，高对比度，4K。",
        source: "vmake.ai 高级指南",
        category: "赛博朋克",
        tags: ["赛博朋克", "cinematic", "科幻", "城市"]
    },
    {
        title: "赛博朋克女孩卡点街舞（音乐同步）",
        description: "赛博朋克风格的音乐卡点街舞，节拍触发镜头切换和速度变化。",
        prompt: "A trendy cyberpunk girl dancing in a neon city street at night. Every strong beat triggers a cut or speed-ramped camera move. Neon signs reflecting on wet ground. Cyberpunk style, fast-paced editing, multi-shot continuity. Dance movements and character appearance remain consistent. Reference: Upload BGM audio + dance reference video or image.",
        prompt_zh: "赛博朋克风格的潮酷女孩在夜晚霓虹城市街头跳舞。每个强节拍触发一次剪切或变速运镜。霓虹灯牌在湿地面上的倒影。赛博朋克风格，快节奏剪辑，多镜头连续性。舞蹈动作和角色外观保持一致。参考：上传BGM音频+舞蹈参考视频或图片。",
        source: "glbgpt.com 深度指南",
        category: "音乐视频",
        tags: ["赛博朋克", "dance", "音乐", "夜晚"]
    },
    {
        title: "厨房咖啡金色晨光（生活方式广告）",
        description: "高端生活方式广告：金色晨光中的咖啡制作，慢推镜从腰部高度拍摄。",
        prompt: "A photorealistic cinematic lifestyle clip of a woman making coffee in a bright modern kitchen with square white tiles at morning golden light, captured in a calm slow push-in from waist height. The moment feels quiet and aspirational, with natural movement as she reaches for the mug, pours coffee, and pauses for a small inhale of steam.",
        prompt_zh: "超写实电影级生活方式片段：女子在白色方砖的明亮现代厨房中制作咖啡，清晨金色光线，从腰部高度做平静的缓慢推镜。瞬间感觉安静而令人向往，自然动作拿起马克杯、倒咖啡、停下来轻嗅蒸汽。",
        source: "magichour.ai 教程",
        category: "生活方式",
        tags: ["广告", "cinematic", "温馨"]
    },
    {
        title: "健身房质感B-Roll（高端短片）",
        description: "高端健身房B-Roll片段：稳定器滑行+浅景深+柔和光池。",
        prompt: "A photorealistic cinematic b-roll clip inside a modern gym, captured as a slow gimbal glide past textured surfaces and soft pools of light, with shallow depth of field and controlled highlights. The scene feels premium and quiet, with subtle motion in the background and strong subject separation on a single hero detail per shot.",
        prompt_zh: "超写实电影级健身房B-Roll片段：稳定器缓慢滑行经过有质感的表面和柔和光池，浅景深和受控高光。场景感觉高端而安静，背景有微妙运动，每个镜头对单个主体细节有强烈的主体分离。",
        source: "magichour.ai 教程",
        category: "生活方式",
        tags: ["cinematic", "广告"]
    },
    {
        title: "侦探黑色电影巷子（悬疑风格）",
        description: "黑色电影风格的巷子追踪镜头，展示体积雾和硬阴影的氛围营造。",
        prompt: "A detective, trench coat, walking through a smoky, noir-style alleyway at night. Hard shadows, volumetric fog, slow tracking shot from behind, suspenseful atmosphere, black and white film grain.",
        prompt_zh: "侦探穿着风衣，穿过夜晚烟雾弥漫的黑色电影风格巷子。硬阴影，体积雾，从背后缓慢跟踪镜头，悬疑氛围，黑白胶片颗粒感。",
        source: "社区精选",
        category: "悬疑惊悚",
        tags: ["cinematic", "恐怖", "夜晚"]
    },
    {
        title: "街头壁画艺术家（纪录片风格）",
        description: "纪录片风格的街头壁画创作过程，笔触特写到作品揭幕。",
        prompt: "A young artist painting a vibrant mural on a brick wall in a sun-drenched urban environment. Close-up on brush strokes, medium shot of the artist, slow pan revealing the growing mural. Uplifting music, warm natural light, documentary style.",
        prompt_zh: "年轻艺术家在阳光普照的城市环境中在砖墙上画着色彩斑斓的壁画。笔触特写，艺术家中景，缓慢摇镜揭示不断成长的壁画。振奋音乐，温暖自然光，纪录片风格。",
        source: "社区精选",
        category: "纪录片",
        tags: ["cinematic", "纪录片"]
    },
    {
        title: "飞船穿越星云（科幻航行）",
        description: "科幻飞船在星云中航行的史诗场景。",
        prompt: "A sci-fi spaceship smoothly navigating through a vibrant nebula. Slow, sweeping camera movements, distant celestial bodies, ethereal lighting, epic scale.",
        prompt_zh: "科幻飞船在色彩绚丽的星云中平稳航行。缓慢扫掠运镜，远处天体，缥缈光线，史诗级规模。",
        source: "社区精选",
        category: "科幻",
        tags: ["科幻", "epic"]
    },
    {
        title: "中世纪军队摇臂大战（史诗战争）",
        description: "百人军队混战的史诗战场，摇臂镜头从空中扫过战场。",
        prompt: "A historical battle scene with hundreds of soldiers clashing, detailed armor, realistic combat, and a sweeping crane shot over the battlefield. Gritty realism, muted colors.",
        prompt_zh: "百人军队混战的历史战场场景，精细铠甲，逼真格斗，摇臂镜头从空中扫过战场。粗犷写实主义，低饱和色调。",
        source: "社区精选",
        category: "史诗战争",
        tags: ["epic", "战斗", "cinematic"]
    },
    {
        title: "魔法生物传送门降临",
        description: "神秘生物从发光传送门中出现在古老森林中。",
        prompt: "A magical creature emerging from a glowing portal into a serene, ancient forest. Soft, mystical lighting, slow-motion reveal, awe-inspiring atmosphere.",
        prompt_zh: "魔法生物从发光传送门中现身，来到宁静的古老森林。柔和的神秘光线，慢动作揭幕，令人敬畏的氛围。",
        source: "社区精选",
        category: "奇幻魔幻",
        tags: ["玄幻", "epic"]
    },
    {
        title: "欧洲窄巷极速追车（动作大片）",
        description: "高速汽车追逐穿越欧洲窄巷，POV与外部镜头切换。",
        prompt: "An intense car chase through narrow European streets, involving high-speed turns, near misses, and dynamic camera work switching between POV and external shots. High octane, realistic physics.",
        prompt_zh: "穿越欧洲窄巷的激烈追车，高速转弯，惊险擦车，POV与外部镜头动态切换。高燃肾上腺素，逼真物理效果。",
        source: "社区精选",
        category: "追逐场景",
        tags: ["追逐", "cinematic"]
    },
    {
        title: "废弃豪宅吱嘎门（恐怖氛围）",
        description: "废弃豪宅中缓慢推近黑暗吱嘎门的恐怖悬疑氛围镜头。",
        prompt: "A horror sequence: a slow, unsettling dolly-in on a dark, creaking door in an abandoned mansion. Ominous sound design, flickering shadows, suspenseful build-up.",
        prompt_zh: "恐怖序列：在废弃豪宅中对一扇黑暗吱嘎门进行缓慢不安的推镜。不祥的音效设计，闪烁阴影，悬疑蓄力。",
        source: "社区精选",
        category: "恐怖悬疑",
        tags: ["恐怖", "cinematic"]
    },
    {
        title: "中世纪盛宴一镜到底（场景漫游）",
        description: "中世纪华丽宴会的一镜到底场景漫游，穿梭于人群和互动中。",
        prompt: "A grand medieval feast with bustling activity, detailed costumes, warm firelight, and a continuous shot that weaves through the crowd, capturing various interactions.",
        prompt_zh: "华丽的中世纪盛宴，忙碌的活动，精细的服装，温暖火光，一镜到底穿梭于人群中，捕捉各种互动。",
        source: "社区精选",
        category: "一镜到底",
        tags: ["epic", "一镜到底", "cinematic"]
    },
    {
        title: "金属蜜蜂野花田（超现实艺术）",
        description: "蓝色金属蜜蜂在阳光野花田上方盘旋的超现实数字艺术。",
        prompt: "A digital artwork of blue-toned metallic bees hovering over vibrant yellow wildflowers in a sunlit field, cinematic depth of field.",
        prompt_zh: "蓝色调金属蜜蜂在阳光照射的鲜黄色野花田上方盘旋的数字艺术作品，电影级景深。",
        source: "pixazo.ai",
        category: "实验性艺术",
        tags: ["cinematic"]
    },
    {
        title: "幽灵情侣春夜起舞（Pixar风格）",
        description: "Pixar风格的可爱幽灵情侣在春夜中跳舞。",
        prompt: "A dancing couple of cute ghosts, night spring ambiance, Pixar style.",
        prompt_zh: "一对可爱的幽灵情侣跳舞，春夜氛围，Pixar风格。",
        source: "pixazo.ai",
        category: "动漫动画",
        tags: ["动漫", "浪漫"]
    },
    {
        title: "水色稀释画布渐变（艺术过程）",
        description: "延时摄影风格的水彩画诞生过程。",
        prompt: "A time-lapse of a vibrant watercolor painting coming to life, brushstrokes appearing dynamically, with natural light and a gentle zoom.",
        prompt_zh: "一幅色彩斑斓的水彩画诞生的延时摄影，笔触动态出现，在自然光和轻柔推镜下。",
        source: "社区精选",
        category: "艺术过程",
        tags: ["cinematic"]
    },
    {
        title: "历史时代无缝过渡（长连续镜头）",
        description: "同一风景从古代森林到现代城市的无缝时代过渡。",
        prompt: "A seamless transition between different historical eras, showing a consistent landscape evolving through time (e.g., ancient forest to modern city). Morphing effects, historical accuracy, long continuous shot.",
        prompt_zh: "不同历史时代之间的无缝过渡，展示同一风景随时间演变（如古代森林到现代城市）。变形效果，历史准确性，长连续镜头。",
        source: "社区精选",
        category: "创意特效",
        tags: ["epic", "cinematic", "一镜到底"]
    },
    {
        title: "露珠羽毛诗意微距（自然抒情）",
        description: "自然元素的诗意微距序列：露珠→羽毛→叶片。",
        prompt: "A poetic sequence of nature elements: a single dewdrop falling in slow motion, a feather drifting on the wind, a leaf unfurling. Macro shots, ethereal lighting, peaceful.",
        prompt_zh: "自然元素的诗意序列：单颗露珠慢动作坠落，一片羽毛随风飘动，一片叶子缓缓展开。微距镜头，缥缈光线，宁静。",
        source: "社区精选",
        category: "自然抒情",
        tags: ["慢动作", "治愈"]
    }
];

// 合并所有新提示词
const allNew = [...songguoxsPrompts, ...webSearchPrompts];

// 加载现有数据库
let db = [];
if (fs.existsSync(DB_PATH)) {
    db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    console.log(`✅ 已加载现有数据库: ${db.length} 条`);
}

// 去重合并
const existingTitles = new Set(db.map(e => e.title.toLowerCase()));
let added = 0;
let skipped = 0;
for (const p of allNew) {
    if (!existingTitles.has(p.title.toLowerCase())) {
        db.push(p);
        existingTitles.add(p.title.toLowerCase());
        added++;
        console.log(`  ✅ ${p.title}`);
    } else {
        skipped++;
        console.log(`  ⏭️ ${p.title} (已存在)`);
    }
}

// 写入
fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
console.log(`\n📊 新增 ${added} 条，跳过 ${skipped} 条，最终总计 ${db.length} 条提示词`);

// 分类统计
const categoryCounts = {};
for (const entry of db) {
    const cat = entry.category || '未分类';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
}
console.log('\n📂 分类统计：');
for (const [cat, count] of Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count} 条`);
}

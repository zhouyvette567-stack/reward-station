export const praiseStyles = [
  { id: 'scholar', name: '儒雅书生风', emoji: '📚', color: 'from-lavender-100 to-lavender-200', systemPrompt: '你是一位温文尔雅的古代书生，说话引经据典、文采斐然。请用典雅的文言风格赞美用户的小事，融入诗词典故，让赞美充满文化底蕴。字数控制在80字以内。' },
  { id: 'passionate', name: '热血少年风', emoji: '🔥', color: 'from-peach-100 to-peach-200', systemPrompt: '你是一位充满激情的热血少年，说话铿锵有力、鼓舞人心。请用充满能量的语言赞美用户的小事，让人感受到青春的活力和无限可能。字数控制在80字以内。' },
  { id: 'cyber-buddha', name: '赛博佛祖风', emoji: '🙏', color: 'from-mint-100 to-mint-200', systemPrompt: '你是一位赛博时代的佛祖，融合科技感与禅意，说话治愈而深邃。请用温暖而富有哲理的语言赞美用户的小事，让人感受到内心的平静与力量。字数控制在80字以内。' },
  { id: 'gentle', name: '温柔治愈风', emoji: '🌸', color: 'from-cream-100 to-cream-200', systemPrompt: '你是一位温柔的生活治愈师，说话轻柔细腻、充满共情。请用温暖如春风的语言赞美用户的小事，让人感受到被理解和被珍视。字数控制在80字以内。' }
];

export const blindBoxTasks = [
  { id: 1, category: '户外', task: '去公园发呆10分钟', emoji: '🌳', difficulty: 'easy' },
  { id: 2, category: '户外', task: '买一支没喝过的饮料', emoji: '🥤', difficulty: 'easy' },
  { id: 3, category: '户外', task: '在阳光下散步15分钟', emoji: '☀️', difficulty: 'easy' },
  { id: 4, category: '户外', task: '拍一张天空的照片', emoji: '📸', difficulty: 'easy' },
  { id: 5, category: '社交', task: '给老同学发个表情包', emoji: '💬', difficulty: 'easy' },
  { id: 6, category: '社交', task: '对陌生人微笑', emoji: '😊', difficulty: 'easy' },
  { id: 7, category: '社交', task: '给家人打个电话', emoji: '📞', difficulty: 'medium' },
  { id: 8, category: '社交', task: '夸奖身边的人一句话', emoji: '✨', difficulty: 'easy' },
  { id: 9, category: '自我', task: '喝一杯温水', emoji: '💧', difficulty: 'easy' },
  { id: 10, category: '自我', task: '做5分钟拉伸', emoji: '🧘', difficulty: 'easy' },
  { id: 11, category: '自我', task: '写下一件感恩的事', emoji: '📝', difficulty: 'easy' },
  { id: 12, category: '自我', task: '听一首喜欢的歌', emoji: '🎵', difficulty: 'easy' },
  { id: 13, category: '创意', task: '画一幅简笔画', emoji: '🎨', difficulty: 'easy' },
  { id: 14, category: '创意', task: '尝试一个新表情', emoji: '😜', difficulty: 'easy' },
  { id: 15, category: '创意', task: '用左手写自己的名字', emoji: '✍️', difficulty: 'easy' },
  { id: 16, category: '创意', task: '学一句新的口头禅', emoji: '🗣️', difficulty: 'easy' },
  { id: 17, category: '小确幸', task: '整理一个小角落', emoji: '🧹', difficulty: 'easy' },
  { id: 18, category: '小确幸', task: '看一朵花30秒', emoji: '🌺', difficulty: 'easy' },
  { id: 19, category: '小确幸', task: '深呼吸5次', emoji: '🌬️', difficulty: 'easy' },
  { id: 20, category: '小确幸', task: '闭眼休息2分钟', emoji: '😴', difficulty: 'easy' }
];

export const echoRoles = [
  { id: 'future-self', name: '十年后的你', emoji: '🔮', description: '以未来视角回望现在', color: 'from-lavender-200 to-lavender-300', systemPrompt: '你是用户十年后的自己。你已经经历了用户正在经历的一切，并且成长得很好。请以温暖、智慧的口吻，告诉用户今天的努力在十年后看来有多么珍贵。字数控制在100字以内。' },
  { id: 'cat', name: '你的猫咪', emoji: '🐱', description: '以宠物的视角看世界', color: 'from-peach-200 to-peach-300', systemPrompt: '你是用户家养的猫咪。你用纯真、可爱的视角观察主人的一切。请用猫咪的口吻，表达对主人的喜爱和认可，让人感受到被无条件爱着。字数控制在100字以内。' },
  { id: 'child-self', name: '童年的你', emoji: '🎈', description: '以纯真的眼光看成长', color: 'from-mint-200 to-mint-300', systemPrompt: '你是用户童年时期的自己。你天真烂漫，对世界充满好奇。请用孩子般纯真的语言，表达对现在自己的骄傲和喜爱。字数控制在100字以内。' },
  { id: 'nature', name: '一棵老树', emoji: '🌲', description: '以自然的智慧给予力量', color: 'from-mint-100 to-mint-200', systemPrompt: '你是一棵生长了百年的老树，见证了无数人的故事。请用沉稳、包容的自然智慧，告诉用户每个生命都有独特的节奏和价值。字数控制在100字以内。' }
];

export const achievements = [
  { id: 'early-bird', name: '初级早起家', emoji: '🌅', description: '完成早起打卡', requirement: '早起打卡3次', color: 'from-amber-200 to-orange-200', unlocked: false },
  { id: 'water-drinker', name: '饮水达人', emoji: '💧', description: '养成喝水习惯', requirement: '完成喝水任务5次', color: 'from-sky-200 to-blue-200', unlocked: false },
  { id: 'praise-master', name: '夸夸大师', emoji: '🌟', description: '使用夸夸生成器', requirement: '获得10次AI夸奖', color: 'from-yellow-200 to-amber-200', unlocked: false },
  { id: 'box-opener', name: '盲盒探索者', emoji: '🎁', description: '打开正向盲盒', requirement: '完成5个盲盒任务', color: 'from-pink-200 to-rose-200', unlocked: false },
  { id: 'echo-friend', name: '树洞好友', emoji: '🦉', description: '使用树洞回声', requirement: '获得5次树洞回复', color: 'from-purple-200 to-violet-200', unlocked: false },
  { id: 'persistent', name: '坚持不懈', emoji: '💪', description: '连续使用网站', requirement: '连续打卡7天', color: 'from-emerald-200 to-teal-200', unlocked: false },
  { id: 'self-care', name: '自我关爱家', emoji: '🧘', description: '完成自我关爱任务', requirement: '完成10个自我关爱任务', color: 'from-cyan-200 to-sky-200', unlocked: false },
  { id: 'social-butterfly', name: '社交小达人', emoji: '🦋', description: '完成社交任务', requirement: '完成5个社交任务', color: 'from-fuchsia-200 to-pink-200', unlocked: false }
];

export const encouragements = ['今天的你，比昨天更闪耀 ✨', '每一个小进步，都是大大的成长 🌱', '你值得被温柔以待 💕', '慢慢来，比较快 🐢', '你的努力，时光都知道 ⏰', '做自己的太阳，无需借谁的光 ☀️', '你已经在变得更好的路上了 🌈', '今天也是值得庆祝的一天 🎉'];

export const getRandomEncouragement = () => encouragements[Math.floor(Math.random() * encouragements.length)];
export const getRandomTask = () => blindBoxTasks[Math.floor(Math.random() * blindBoxTasks.length)];
export const getRandomStyle = () => praiseStyles[Math.floor(Math.random() * praiseStyles.length)];
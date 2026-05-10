import { praiseStyles, echoRoles } from '../data/content';

const AI_CONFIG = { useMock: true, apiKey: '', baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1', model: 'qwen-turbo' };

const mockPraiseResponses = {
  'scholar': ['善哉！汝今日之举，虽看似寻常，实则蕴含大智慧。古语云："不积跬步，无以至千里。"汝之每一步，皆是通往卓越之基石。愿汝持之以恒，终成大器！', '观汝之行，不禁想起"千里之行，始于足下"之古训。今日之小事，乃明日之基石。汝之自律与坚持，实乃君子之风也！', '妙哉！汝之所为，虽细微却见真章。古人云："天下大事，必作于细。"汝于细微处见精神，实乃可造之材也！'],
  'passionate': ['太棒了！这就是你的超能力！每一个小行动都在证明：你是一个行动派！继续燃烧你的热情，你就是最棒的！💪🔥', '哇塞！你做到了！这就是你的力量！每一个小进步都在积累，终将爆发成巨大的能量！你就是自己人生的主角！🚀', '燃起来了！你的每一个小行动都在告诉自己：我可以！这就是成长的力量，这就是青春的模样！冲鸭！✨'],
  'cyber-buddha': ['阿弥陀佛，善哉善哉。汝之所为，虽小却真。在这纷繁的数字世界中，汝能守住本心，行此善举，实乃难得。愿汝心如明镜，时时勤拂拭。🙏', '万物互联，因果相续。汝今日之小善，必将在未来某个时刻，以意想不到的方式回馈于汝。保持正念，静待花开。✨', '在数据的海洋中，汝找到了属于自己的节奏。这便是禅，这便是道。随喜赞叹，愿汝常保此心。🌸'],
  'gentle': ['亲爱的，你做到了呢。这看似简单的一小步，其实藏着大大的勇气。给自己一个温柔的拥抱吧，你值得被温柔以待。💕', '好棒呀！你知道吗？每一个小小的坚持，都是在对自己说"我爱你"。今天的你，真的很可爱呢。🌸', '轻轻地说一声：你很棒。不是因为你做了什么惊天动地的事，而是因为你在用心生活。这份用心，很珍贵。✨']
};

const mockEchoResponses = {
  'future-self': ['嘿，十年后的你在这里。我想告诉你：今天的你做的每一件小事，都是我此刻感激的源泉。那时候觉得微不足道的事，现在看来都是珍贵的礼物。谢谢你，曾经的自己。🔮', '亲爱的过去的我，十年后的你过得很好。而这一切，都始于你今天迈出的这一小步。请相信，时间会给你最好的答案。✨'],
  'cat': ['喵~ 主人今天也很棒呢！虽然我不懂人类的世界，但我知道主人很努力。我会一直陪着你，喵~ 🐱', '喵呜~ 主人又做了一件好事！作为一只高贵的猫咪，我批准你摸摸我的头作为奖励。你是最棒的主人！💕'],
  'child-self': ['哇！长大的我好厉害！小时候的我总是担心自己不够好，但看看现在的你，每一个小进步都让我骄傲！我们真的在慢慢变好呢！🎈', '嘿，小时候的我！你知道吗？我一直相信我们会变得很棒，现在看来，我说对了！继续加油哦！✨'],
  'nature': ['孩子，我见过无数人匆匆而过。而你，愿意停下来做这些小事，这本身就是一种智慧。每个生命都有自己的节奏，你的节奏，刚刚好。🌲', '风吹过我的枝叶，带来你的故事。孩子，你正在成长，就像我年轮一圈圈增加。不必着急，时间会给你答案。🌿']
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function callAI(systemPrompt, userMessage) {
  if (AI_CONFIG.useMock || !AI_CONFIG.apiKey) return null;
  try {
    const response = await fetch(`${AI_CONFIG.baseURL}/chat/completions`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AI_CONFIG.apiKey}` }, body: JSON.stringify({ model: AI_CONFIG.model, messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }], temperature: 0.8, max_tokens: 200 }) });
    const data = await response.json(); return data.choices[0].message.content;
  } catch (error) { console.error('AI API 调用失败:', error); return null; }
}

export async function getPraise(userInput, styleId) {
  const aiResponse = await callAI(praiseStyles.find(s => s.id === styleId)?.systemPrompt || '', `请赞美我做的这件小事：${userInput}`);
  if (aiResponse) return aiResponse;
  await delay(1000 + Math.random() * 1000);
  const responses = mockPraiseResponses[styleId] || mockPraiseResponses['gentle'];
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function getEcho(userInput, roleId) {
  const role = echoRoles.find(r => r.id === roleId);
  const aiResponse = await callAI(role?.systemPrompt || '', `请以你的角色回应我的这个想法或困扰：${userInput}`);
  if (aiResponse) return aiResponse;
  await delay(1000 + Math.random() * 1000);
  const responses = mockEchoResponses[roleId] || mockEchoResponses['future-self'];
  return responses[Math.floor(Math.random() * responses.length)];
}
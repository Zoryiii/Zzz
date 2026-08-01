/* ========================================
   毓 · 初始数据
   ======================================== */

// 模块配置
const MODULES = [
  {
    key: 'accounting', name: '记账', icon: '🐷',
    cover: 'public/images/191114.jpg',
    description: '记录每一笔收支',
    theme: { primary: '#B54A3A', secondary: '#E8A87C', bg: 'linear-gradient(135deg, #FFF5F0 0%, #FADBD0 100%)' },
    shape: 'rounded'
  },
  {
    key: 'tasks', name: '任务待办', icon: '🌼',
    cover: 'public/images/191107.jpg',
    description: '管理每日任务',
    theme: { primary: '#8BA888', secondary: '#E8D5B7', bg: 'linear-gradient(135deg, #F8FBF5 0%, #E8F0DF 100%)' },
    shape: 'hexagon'
  },
  {
    key: 'calligraphy', name: '练字', icon: '🪶',
    cover: 'public/images/190916.jpg',
    description: '名家字帖临摹',
    theme: { primary: '#D4A574', secondary: '#2C5F5A', bg: 'linear-gradient(135deg, #FDF8F0 0%, #F5E6D3 100%)' },
    shape: 'circle'
  },
  {
    key: 'english', name: '英语学习', icon: '🐰',
    cover: 'public/images/191110.jpg',
    description: '每日听说读写',
    theme: { primary: '#7CB5A5', secondary: '#B8D4B8', bg: 'linear-gradient(135deg, #F4F9F4 0%, #E8F0E8 100%)' },
    shape: 'parallelogram'
  },
  {
    key: 'films', name: '影集', icon: '🍿',
    cover: 'public/images/190928.jpg',
    description: '观影记录与感悟',
    theme: { primary: '#8B2635', secondary: '#1F3A5F', bg: 'linear-gradient(135deg, #FDF5F3 0%, #F5E6E0 100%)' },
    shape: 'star'
  },
  {
    key: 'photos', name: '相册', icon: '📷',
    cover: 'public/images/190912.jpg',
    description: '珍藏美好瞬间',
    theme: { primary: '#E8B4B8', secondary: '#F4D03F', bg: 'linear-gradient(135deg, #FFF8F8 0%, #FDE8EC 100%)' },
    shape: 'blob'
  },
  {
    key: 'inspiration', name: '灵感一现', icon: '💡',
    cover: 'public/images/190934.jpg',
    description: '捕捉每一个想法',
    theme: { primary: '#87CEEB', secondary: '#FF7F50', bg: 'linear-gradient(135deg, #F0F8FF 0%, #FFF5EF 100%)' },
    shape: 'triangle'
  },
  {
    key: 'sports', name: '运动集', icon: '⚽',
    cover: 'public/images/191112.jpg',
    description: '动起来，更健康',
    theme: { primary: '#4A90A4', secondary: '#2E8B8B', bg: 'linear-gradient(135deg, #F0F6F8 0%, #E0ECF0 100%)' },
    shape: 'diamond'
  },
  {
    key: 'daily', name: '日常记录', icon: '🍀',
    cover: 'public/images/190904.jpg',
    description: '每周打卡总结',
    theme: { primary: '#9FC4C4', secondary: '#C45A5A', bg: 'linear-gradient(135deg, #F4FAFA 0%, #EDF5F5 100%)' },
    shape: 'wave'
  },
  {
    key: 'news', name: '每日新闻', icon: '🕊️',
    cover: 'public/images/205904.jpg',
    description: '全球新闻速递',
    theme: { primary: '#5B7FA6', secondary: '#A6C8E0', bg: 'linear-gradient(135deg, #F0F5FA 0%, #E0ECF5 100%)' },
    shape: 'square'
  },
  {
    key: 'ai', name: '阅读', icon: '📖',
    cover: 'public/images/205912.jpg',
    description: '每日阅读，知识沉淀',
    theme: { primary: '#6C5CE7', secondary: '#A29BFE', bg: 'linear-gradient(135deg, #F5F3FF 0%, #EDE8FF 100%)' },
    shape: 'hexagon'
  }
];

// 理财小知识
const FINANCIAL_TIPS = [
  '复利是世界第八大奇迹。每天省下一杯奶茶钱（15元），按年化5%计算，30年后将累积超过18万元。',
  '50-30-20法则：50%用于必要开支，30%用于想要的东西，20%用于储蓄和投资。',
  '记账的核心不是记录，而是复盘。每月回顾消费分类，找出"拿铁因子"——那些不知不觉消耗财富的小额支出。',
  '应急基金应至少覆盖3-6个月的生活开支，放在随时可取的活期或货币基金中。',
  '投资的第一条规则是不要亏钱，第二条规则是记住第一条。先保本再增值。',
  '基金定投是普通人最好的投资方式之一——分批买入，摊薄成本，时间换空间。',
  '消费前问自己：这是"需要"还是"想要"？延迟满足是理财的起点。',
  '保险的本质是转移风险。先保障后理财，配置顺序：意外险 > 医疗险 > 重疾险 > 寿险。'
];

// 理财学习文章
const FINANCE_ARTICLES = [
  { id: 'f1', title: '复利的力量：为什么巴菲特90%的财富在50岁后获得', icon: '📈', tag: '基础', desc: '解析复利的数学原理与时间杠杆，说明为何"越早投资越好"。', point: '复利三要素：本金、收益率、时间。时间是普通人最大的杠杆。', url: 'https://xueqiu.com/' },
  { id: 'f2', title: '资产配置入门：不要把鸡蛋放在一个篮子里', icon: '🧺', tag: '核心', desc: '讲解资产配置的核心逻辑——股债平衡、分散风险。', point: '核心原则：分散+再平衡。年轻人可偏股(70%股30%债)，随年龄增长逐步增加债券比例。', url: 'https://www.zhihu.com/topic/finance' },
  { id: 'f3', title: '基金定投实战：微笑曲线与止盈策略', icon: '🎯', tag: '实战', desc: '详解定投的原理、微笑曲线的形成，以及常见的止盈方法。', point: '定投的核心是纪律：坚持比择时更重要。设置合理止盈线(如年化15%)，分批赎回。', url: 'https://www.1234567.com.cn/' },
  { id: 'f4', title: '收入的三种形态：从劳动收入到资产收入', icon: '💼', tag: '进阶', desc: '分析劳动收入、知识收入、资产收入的区别与转化路径。', point: '从"用时间换钱"到"让钱为你工作"，是财务自由的核心转变。', url: 'https://finance.sina.com.cn/' },
  { id: 'f5', title: '通货膨胀与真实购买力', icon: '🔥', tag: '认知', desc: '如何理解CPI、通胀对储蓄的侵蚀，以及如何抵御通胀。', point: '长期来看，投资实物资产(股票、房产)是抵御通胀最有效的方式。', url: 'https://www.eastmoney.com/' },
  { id: 'f6', title: '心理账户：为什么你总在股市亏钱', icon: '🧠', tag: '心理', desc: '行为金融学揭示的投资者常见心理偏差与应对方法。', point: '锚定效应、损失厌恶、从众心理——认识这些陷阱是避开它们的第一步。', url: 'https://www.investopedia.com/' }
];

// 每日一句
const DAILY_QUOTES = [
  '你未来的样子，藏在你现在的选择里。',
  '种一棵树最好的时间是十年前，其次是现在。',
  '日拱一卒，功不唐捐。',
  '越努力，越幸运。越坚持，越精进。',
  '慢慢来，比较快。',
  '人生没有白走的路，每一步都算数。',
  '所有的优秀，都源于不将就。',
  '自律给我自由。',
  '保持热爱，奔赴山海。',
  '心之所向，素履以往。',
  '不是所有的鱼都生活在同一片海里。',
  '万物皆有裂痕，那是光照进来的地方。',
  '温柔要有，但不是妥协。',
  '世间所有相遇，都是久别重逢。',
  '你的孤独，虽败犹荣。'
];

// 记账分类
const ACCOUNT_CATEGORIES = {
  expense: [
    { id: 'food', name: '餐饮', icon: '🍜', color: '#B54A3A' },
    { id: 'transport', name: '交通', icon: '🚇', color: '#8B6A3E' },
    { id: 'shopping', name: '购物', icon: '🛍️', color: '#E8A87C' },
    { id: 'entertainment', name: '娱乐', icon: '🎮', color: '#87CEEB' },
    { id: 'housing', name: '居住', icon: '🏠', color: '#6B8E6B' },
    { id: 'health', name: '医疗', icon: '💊', color: '#C45A5A' },
    { id: 'education', name: '学习', icon: '📖', color: '#2C5F5A' },
    { id: 'other', name: '其他', icon: '📝', color: '#8B8680' }
  ],
  income: [
    { id: 'salary', name: '工资', icon: '💰', color: '#8BA888' },
    { id: 'bonus', name: '奖金', icon: '🎁', color: '#E8C547' },
    { id: 'investment', name: '投资', icon: '📈', color: '#2E8B8B' },
    { id: 'other', name: '其他', icon: '✨', color: '#87CEEB' }
  ]
};

// 名家字帖数据库（扩充版）
const COPYBOOKS = [
  {
    id: 'c1', title: '兰亭序', author: '王羲之', dynasty: '东晋', style: '行书',
    description: '天下第一行书，飘逸洒脱，被誉为"书圣"之作',
    characters: [
      { char: '永', pinyin: 'yǒng', strokeCount: 5 },
      { char: '和', pinyin: 'hé', strokeCount: 8 },
      { char: '九', pinyin: 'jiǔ', strokeCount: 2 },
      { char: '年', pinyin: 'nián', strokeCount: 6 },
      { char: '兰', pinyin: 'lán', strokeCount: 20 },
      { char: '亭', pinyin: 'tíng', strokeCount: 9 },
      { char: '春', pinyin: 'chūn', strokeCount: 9 },
      { char: '天', pinyin: 'tiān', strokeCount: 4 },
      { char: '流', pinyin: 'liú', strokeCount: 10 },
      { char: '水', pinyin: 'shuǐ', strokeCount: 4 },
      { char: '风', pinyin: 'fēng', strokeCount: 4 },
      { char: '月', pinyin: 'yuè', strokeCount: 4 },
      { char: '山', pinyin: 'shān', strokeCount: 3 },
      { char: '茂', pinyin: 'mào', strokeCount: 8 },
      { char: '林', pinyin: 'lín', strokeCount: 8 }
    ]
  },
  {
    id: 'c2', title: '九成宫醴泉铭', author: '欧阳询', dynasty: '唐', style: '楷书',
    description: '楷书四大家之一，结构严谨，笔力险峻',
    characters: [
      { char: '九', pinyin: 'jiǔ', strokeCount: 2 },
      { char: '成', pinyin: 'chéng', strokeCount: 7 },
      { char: '宫', pinyin: 'gōng', strokeCount: 9 },
      { char: '醴', pinyin: 'lǐ', strokeCount: 20 },
      { char: '泉', pinyin: 'quán', strokeCount: 9 },
      { char: '铭', pinyin: 'míng', strokeCount: 14 },
      { char: '皇', pinyin: 'huáng', strokeCount: 9 },
      { char: '帝', pinyin: 'dì', strokeCount: 9 },
      { char: '无', pinyin: 'wú', strokeCount: 4 },
      { char: '为', pinyin: 'wèi', strokeCount: 4 },
      { char: '以', pinyin: 'yǐ', strokeCount: 4 },
      { char: '宁', pinyin: 'níng', strokeCount: 14 },
      { char: '静', pinyin: 'jìng', strokeCount: 16 },
      { char: '心', pinyin: 'xīn', strokeCount: 4 },
      { char: '志', pinyin: 'zhì', strokeCount: 7 }
    ]
  },
  {
    id: 'c3', title: '多宝塔碑', author: '颜真卿', dynasty: '唐', style: '楷书',
    description: '雄浑厚重，楷书典范，端庄雄伟',
    characters: [
      { char: '多', pinyin: 'duō', strokeCount: 6 },
      { char: '宝', pinyin: 'bǎo', strokeCount: 20 },
      { char: '塔', pinyin: 'tǎ', strokeCount: 12 },
      { char: '碑', pinyin: 'bēi', strokeCount: 13 },
      { char: '佛', pinyin: 'fó', strokeCount: 7 },
      { char: '寺', pinyin: 'sì', strokeCount: 6 },
      { char: '禅', pinyin: 'chán', strokeCount: 12 },
      { char: '师', pinyin: 'shī', strokeCount: 10 },
      { char: '楷', pinyin: 'kǎi', strokeCount: 13 },
      { char: '书', pinyin: 'shū', strokeCount: 4 },
      { char: '法', pinyin: 'fǎ', strokeCount: 8 },
      { char: '雄', pinyin: 'xióng', strokeCount: 12 },
      { char: '伟', pinyin: 'wěi', strokeCount: 11 },
      { char: '庄', pinyin: 'zhuāng', strokeCount: 6 },
      { char: '严', pinyin: 'yán', strokeCount: 7 }
    ]
  },
  {
    id: 'c4', title: '玄秘塔碑', author: '柳公权', dynasty: '唐', style: '楷书',
    description: '骨力遒劲，结构严谨，笔法锋利',
    characters: [
      { char: '玄', pinyin: 'xuán', strokeCount: 5 },
      { char: '秘', pinyin: 'mì', strokeCount: 10 },
      { char: '塔', pinyin: 'tǎ', strokeCount: 12 },
      { char: '骨', pinyin: 'gǔ', strokeCount: 9 },
      { char: '力', pinyin: 'lì', strokeCount: 2 },
      { char: '遒', pinyin: 'qiú', strokeCount: 12 },
      { char: '劲', pinyin: 'jìn', strokeCount: 7 },
      { char: '笔', pinyin: 'bǐ', strokeCount: 10 },
      { char: '锋', pinyin: 'fēng', strokeCount: 15 },
      { char: '结', pinyin: 'jié', strokeCount: 9 },
      { char: '构', pinyin: 'gòu', strokeCount: 8 },
      { char: '清', pinyin: 'qīng', strokeCount: 12 },
      { char: '秀', pinyin: 'xiù', strokeCount: 7 },
      { char: '关', pinyin: 'guān', strokeCount: 6 },
      { char: '节', pinyin: 'jié', strokeCount: 5 },
      { char: '奏', pinyin: 'zòu', strokeCount: 9 }
    ]
  },
  {
    id: 'c5', title: '自叙帖', author: '怀素', dynasty: '唐', style: '草书',
    description: '狂草奔放，书法巅峰，气势磅礴',
    characters: [
      { char: '自', pinyin: 'zì', strokeCount: 6 },
      { char: '叙', pinyin: 'xù', strokeCount: 9 },
      { char: '帖', pinyin: 'tiè', strokeCount: 8 },
      { char: '狂', pinyin: 'kuáng', strokeCount: 7 },
      { char: '草', pinyin: 'cǎo', strokeCount: 9 },
      { char: '奔', pinyin: 'bēn', strokeCount: 8 },
      { char: '放', pinyin: 'fàng', strokeCount: 8 },
      { char: '笔', pinyin: 'bǐ', strokeCount: 10 },
      { char: '墨', pinyin: 'mò', strokeCount: 15 },
      { char: '舞', pinyin: 'wǔ', strokeCount: 14 },
      { char: '龙', pinyin: 'lóng', strokeCount: 5 },
      { char: '蛇', pinyin: 'shé', strokeCount: 11 },
      { char: '电', pinyin: 'diàn', strokeCount: 5 },
      { char: '风', pinyin: 'fēng', strokeCount: 4 },
      { char: '雨', pinyin: 'yǔ', strokeCount: 8 }
    ]
  },
  {
    id: 'c6', title: '礼器碑', author: '佚名', dynasty: '东汉', style: '隶书',
    description: '隶书经典，端庄秀丽，古朴典雅',
    characters: [
      { char: '礼', pinyin: 'lǐ', strokeCount: 5 },
      { char: '器', pinyin: 'qì', strokeCount: 16 },
      { char: '碑', pinyin: 'bēi', strokeCount: 13 },
      { char: '隶', pinyin: 'lì', strokeCount: 8 },
      { char: '书', pinyin: 'shū', strokeCount: 4 },
      { char: '典', pinyin: 'diǎn', strokeCount: 8 },
      { char: '范', pinyin: 'fàn', strokeCount: 15 },
      { char: '端', pinyin: 'duān', strokeCount: 14 },
      { char: '庄', pinyin: 'zhuāng', strokeCount: 6 },
      { char: '古', pinyin: 'gǔ', strokeCount: 5 },
      { char: '朴', pinyin: 'pǔ', strokeCount: 6 },
      { char: '素', pinyin: 'sù', strokeCount: 10 },
      { char: '雍', pinyin: 'yōng', strokeCount: 13 },
      { char: '容', pinyin: 'róng', strokeCount: 10 },
      { char: '史', pinyin: 'shǐ', strokeCount: 5 }
    ]
  },
  {
    id: 'c7', title: '峄山碑', author: '李斯', dynasty: '秦', style: '篆书',
    description: '小篆之祖，笔画均匀，结构对称',
    characters: [
      { char: '峄', pinyin: 'yì', strokeCount: 16 },
      { char: '山', pinyin: 'shān', strokeCount: 3 },
      { char: '碑', pinyin: 'bēi', strokeCount: 13 },
      { char: '篆', pinyin: 'zhuàn', strokeCount: 18 },
      { char: '书', pinyin: 'shū', strokeCount: 4 },
      { char: '秦', pinyin: 'qín', strokeCount: 10 },
      { char: '皇', pinyin: 'huáng', strokeCount: 9 },
      { char: '帝', pinyin: 'dì', strokeCount: 9 },
      { char: '命', pinyin: 'mìng', strokeCount: 8 },
      { char: '丞', pinyin: 'chéng', strokeCount: 6 },
      { char: '相', pinyin: 'xiàng', strokeCount: 9 },
      { char: '李', pinyin: 'lǐ', strokeCount: 7 },
      { char: '斯', pinyin: 'sī', strokeCount: 12 },
      { char: '等', pinyin: 'děng', strokeCount: 12 },
      { char: '一', pinyin: 'yī', strokeCount: 1 }
    ]
  },
  {
    id: 'c8', title: '千字文', author: '智永', dynasty: '隋', style: '楷书',
    description: '永字八法，初学必备，结构端庄',
    characters: [
      { char: '天', pinyin: 'tiān', strokeCount: 4 },
      { char: '地', pinyin: 'dì', strokeCount: 6 },
      { char: '玄', pinyin: 'xuán', strokeCount: 5 },
      { char: '黄', pinyin: 'huáng', strokeCount: 12 },
      { char: '宇', pinyin: 'yǔ', strokeCount: 6 },
      { char: '宙', pinyin: 'zhòu', strokeCount: 8 },
      { char: '洪', pinyin: 'hóng', strokeCount: 9 },
      { char: '荒', pinyin: 'huāng', strokeCount: 9 },
      { char: '日', pinyin: 'rì', strokeCount: 4 },
      { char: '月', pinyin: 'yuè', strokeCount: 4 },
      { char: '盈', pinyin: 'yíng', strokeCount: 9 },
      { char: '昃', pinyin: 'zè', strokeCount: 8 },
      { char: '辰', pinyin: 'chén', strokeCount: 7 },
      { char: '宿', pinyin: 'sù', strokeCount: 14 },
      { char: '列', pinyin: 'liè', strokeCount: 6 }
    ]
  },
  {
    id: 'c9', title: '荆霄鹏行楷字帖', author: '荆霄鹏', dynasty: '当代', style: '行楷',
    description: '当代行楷大家，结构优美，通俗易懂，适合日常临摹',
    characters: [
      { char: '家', pinyin: 'jiā', strokeCount: 10 },
      { char: '庭', pinyin: 'tíng', strokeCount: 9 },
      { char: '深', pinyin: 'shēn', strokeCount: 11 },
      { char: '巷', pinyin: 'xiàng', strokeCount: 9 },
      { char: '陌', pinyin: 'mò', strokeCount: 14 },
      { char: '暖', pinyin: 'nuǎn', strokeCount: 13 },
      { char: '阳', pinyin: 'yáng', strokeCount: 6 },
      { char: '书', pinyin: 'shū', strokeCount: 4 },
      { char: '窗', pinyin: 'chuāng', strokeCount: 12 },
      { char: '笔', pinyin: 'bǐ', strokeCount: 10 },
      { char: '砚', pinyin: 'yàn', strokeCount: 10 },
      { char: '纸', pinyin: 'zhǐ', strokeCount: 7 },
      { char: '墨', pinyin: 'mò', strokeCount: 15 },
      { char: '香', pinyin: 'xiāng', strokeCount: 9 },
      { char: '韵', pinyin: 'yùn', strokeCount: 13 },
      { char: '雅', pinyin: 'yǎ', strokeCount: 12 },
      { char: '致', pinyin: 'zhì', strokeCount: 10 },
      { char: '远', pinyin: 'yuǎn', strokeCount: 17 },
      { char: '静', pinyin: 'jìng', strokeCount: 16 },
      { char: '思', pinyin: 'sī', strokeCount: 9 }
    ]
  },
  {
    id: 'c10', title: '田英章楷书字帖', author: '田英章', dynasty: '当代', style: '楷书',
    description: '当代楷书名家，欧楷传人，结构严谨，适合初学者',
    characters: [
      { char: '仁', pinyin: 'rén', strokeCount: 4 },
      { char: '义', pinyin: 'yì', strokeCount: 3 },
      { char: '礼', pinyin: 'lǐ', strokeCount: 5 },
      { char: '智', pinyin: 'zhì', strokeCount: 12 },
      { char: '信', pinyin: 'xìn', strokeCount: 9 },
      { char: '忠', pinyin: 'zhōng', strokeCount: 8 },
      { char: '孝', pinyin: 'xiào', strokeCount: 7 },
      { char: '廉', pinyin: 'lián', strokeCount: 13 },
      { char: '耻', pinyin: 'chǐ', strokeCount: 10 },
      { char: '勇', pinyin: 'yǒng', strokeCount: 9 },
      { char: '毅', pinyin: 'yì', strokeCount: 15 },
      { char: '恒', pinyin: 'héng', strokeCount: 9 },
      { char: '安', pinyin: 'ān', strokeCount: 6 },
      { char: '平', pinyin: 'píng', strokeCount: 5 },
      { char: '和', pinyin: 'hé', strokeCount: 8 },
      { char: '美', pinyin: 'měi', strokeCount: 9 },
      { char: '善', pinyin: 'shàn', strokeCount: 12 },
      { char: '真', pinyin: 'zhēn', strokeCount: 10 },
      { char: '诚', pinyin: 'chéng', strokeCount: 8 },
      { char: '敬', pinyin: 'jìng', strokeCount: 14 }
    ]
  },
  {
    id: 'c11', title: '田英章行楷字帖', author: '田英章', dynasty: '当代', style: '行楷',
    description: '田氏行楷，兼收并蓄，流畅自然，实用美观',
    characters: [
      { char: '春', pinyin: 'chūn', strokeCount: 9 },
      { char: '夏', pinyin: 'xià', strokeCount: 10 },
      { char: '秋', pinyin: 'qiū', strokeCount: 9 },
      { char: '冬', pinyin: 'dōng', strokeCount: 5 },
      { char: '风', pinyin: 'fēng', strokeCount: 4 },
      { char: '花', pinyin: 'huā', strokeCount: 7 },
      { char: '雪', pinyin: 'xuě', strokeCount: 11 },
      { char: '月', pinyin: 'yuè', strokeCount: 4 },
      { char: '江', pinyin: 'jiāng', strokeCount: 6 },
      { char: '山', pinyin: 'shān', strokeCount: 3 },
      { char: '如', pinyin: 'rú', strokeCount: 6 },
      { char: '画', pinyin: 'huà', strokeCount: 8 },
      { char: '诗', pinyin: 'shī', strokeCount: 8 },
      { char: '意', pinyin: 'yì', strokeCount: 13 },
      { char: '情', pinyin: 'qíng', strokeCount: 12 },
      { char: '韵', pinyin: 'yùn', strokeCount: 13 },
      { char: '味', pinyin: 'wèi', strokeCount: 8 },
      { char: '神', pinyin: 'shén', strokeCount: 9 },
      { char: '采', pinyin: 'cǎi', strokeCount: 11 },
      { char: '飞', pinyin: 'fēi', strokeCount: 3 },
      { char: '扬', pinyin: 'yáng', strokeCount: 6 },
    ]
  },
  {
    id: 'c12', title: '吴玉生行楷字帖', author: '吴玉生', dynasty: '当代', style: '行楷',
    description: '吴派行楷，端庄秀丽，结构优美，被誉为"行楷大家"',
    characters: [
      { char: '静', pinyin: 'jìng', strokeCount: 16 },
      { char: '雅', pinyin: 'yǎ', strokeCount: 12 },
      { char: '淡', pinyin: 'dàn', strokeCount: 11 },
      { char: '然', pinyin: 'rán', strokeCount: 12 },
      { char: '悠', pinyin: 'yōu', strokeCount: 11 },
      { char: '闲', pinyin: 'xián', strokeCount: 7 },
      { char: '远', pinyin: 'yuǎn', strokeCount: 17 },
      { char: '逸', pinyin: 'yì', strokeCount: 12 },
      { char: '云', pinyin: 'yún', strokeCount: 4 },
      { char: '鹤', pinyin: 'hè', strokeCount: 15 },
      { char: '松', pinyin: 'sōng', strokeCount: 8 },
      { char: '竹', pinyin: 'zhú', strokeCount: 6 },
      { char: '兰', pinyin: 'lán', strokeCount: 20 },
      { char: '菊', pinyin: 'jú', strokeCount: 12 },
      { char: '梅', pinyin: 'méi', strokeCount: 11 },
      { char: '荷', pinyin: 'hé', strokeCount: 10 },
      { char: '桃', pinyin: 'táo', strokeCount: 10 },
      { char: '柳', pinyin: 'liǔ', strokeCount: 9 },
      { char: '溪', pinyin: 'xī', strokeCount: 14 },
      { char: '桥', pinyin: 'qiáo', strokeCount: 10 }
    ]
  }
];

// 经典歌词收录（用于练字临摹）
const LYRIC_COLLECTIONS = [
  { id: 'l1', content: '人生如逆旅，我亦是行人。', source: '《临江仙》', singer: '苏轼' },
  { id: 'l2', content: '但愿人长久，千里共婵娟。', source: '《水调歌头》', singer: '王菲' },
  { id: 'l3', content: '红豆生南国，春来发几枝。', source: '《相思》', singer: '王维' },
  { id: 'l4', content: '山有木兮木有枝，心悦君兮君不知。', source: '《越人歌》', singer: '古风' },
  { id: 'l5', content: '春风十里不如你。', source: '《春风十里》', singer: '冯唐' },
  { id: 'l6', content: '从前初识这世间，万般流连。', source: '《起风了》', singer: '买辣椒也用券' },
  { id: 'l7', content: '我在江南君在北，一片空情寄秋水。', source: '《相思引》', singer: '董真' },
  { id: 'l8', content: '天青色等烟雨，而我在等你。', source: '《青花瓷》', singer: '周杰伦' },
  { id: 'l9', content: '月色被打捞起，晕开了结局。', source: '《青花瓷》', singer: '周杰伦' },
  { id: 'l10', content: '弹指流年，拂歌尘散，消瘦了思念。', source: '《浮生若梦》', singer: '网络' },
  { id: 'l11', content: '花开花落终有时，缘起缘灭皆是缘。', source: '《随缘》', singer: '佚名' },
  { id: 'l12', content: '人生得意须尽欢，莫使金樽空对月。', source: '《将进酒》', singer: '李白' }
];

// 好字收集默认数据（照片相册）
const GOOD_CHARACTERS = [
  { id: 'g1', photoUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=calligraphy character "静" written in elegant Chinese brush style on rice paper&image_size=square', source: '临摹《兰亭序》', date: '2024-03-15' },
  { id: 'g2', photoUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=calligraphy character "雅" written in elegant Chinese brush style on rice paper&image_size=square', source: '临摹《九成宫》', date: '2024-03-20' },
  { id: 'g3', photoUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=calligraphy character "逸" written in elegant Chinese brush style on rice paper&image_size=square', source: '自由练习', date: '2024-04-02' }
];

// 练字统计数据
const CALLIGRAPHY_STATS = {
  totalDays: 128,
  totalCharacters: 5640,
  totalCopybooks: 12,
  currentStreak: 15,
  longestStreak: 42,
  favoriteStyles: ['楷书', '行楷', '行书'],
  weeklyGoal: 7,
  weeklyDone: 5,
  level: '中级',
  nextLevel: '高级',
  progressPercent: 68,
  achievements: [
    { id: 'a1', name: '初学乍练', desc: '完成第一次练字', icon: '🌱', unlocked: true },
    { id: 'a2', name: '持之以恒', desc: '连续练字7天', icon: '🔥', unlocked: true },
    { id: 'a3', name: '笔耕不辍', desc: '连续练字30天', icon: '🎯', unlocked: true },
    { id: 'a4', name: '博览群书', desc: '完成5本字帖临摹', icon: '📚', unlocked: true },
    { id: 'a5', name: '入木三分', desc: '累计练字5000字', icon: '✒️', unlocked: false },
    { id: 'a6', name: '书道大家', desc: '连续练字100天', icon: '🏆', unlocked: false }
  ]
};

// 英语口语话题（保留用于兼容）
const SPEAKING_TOPICS = [
  { id: 't1', title: '自我介绍', category: '基础对话', difficulty: 1, description: '介绍自己的姓名、爱好、职业' },
  { id: 't2', title: '日常问候', category: '基础对话', difficulty: 1, description: '学习日常问候语和寒暄' },
  { id: 't3', title: '点餐用语', category: '生活场景', difficulty: 2, description: '在餐厅点餐的实用表达' },
  { id: 't4', title: '旅行对话', category: '生活场景', difficulty: 2, description: '旅行中的问路、购物等' },
  { id: 't5', title: '工作汇报', category: '职场商务', difficulty: 3, description: '工作场景的正式表达' },
  { id: 't6', title: '讨论电影', category: '兴趣话题', difficulty: 2, description: '分享观影感受和评价' },
  { id: 't7', title: '谈谈梦想', category: '深度对话', difficulty: 3, description: '关于理想和未来的讨论' }
];

// 英语学习每日内容库
const ENGLISH_DAILY = {
  topics: [
    { title: 'Technology & Innovation', level: 'B2', vocab: ['artificial intelligence', 'machine learning', 'blockchain', 'quantum computing', 'virtual reality'], grammar: 'Conditional sentences (Type 2)', sentence: 'If I were to invest in AI, I would focus on natural language processing.' },
    { title: 'Climate Change', level: 'B1', vocab: ['carbon footprint', 'renewable energy', 'sustainability', 'deforestation', 'biodiversity'], grammar: 'Passive voice (present perfect)', sentence: 'Significant progress has been made in renewable energy technology.' },
    { title: 'Global Economy', level: 'C1', vocab: ['inflation', 'recession', 'GDP growth', 'trade deficit', 'fiscal policy'], grammar: 'Mixed conditionals', sentence: 'Had the central bank acted sooner, the recession could have been avoided.' },
    { title: 'Space Exploration', level: 'A2', vocab: ['astronaut', 'spacecraft', 'galaxy', 'meteor', 'orbit'], grammar: 'Future simple vs future continuous', sentence: 'Scientists will be monitoring the spacecraft as it orbits the planet.' },
    { title: 'Health & Wellness', level: 'B1', vocab: ['balanced diet', 'regular exercise', 'mental health', 'stress management', 'sleep quality'], grammar: 'Modal verbs for advice', sentence: 'You should incorporate meditation into your daily routine to reduce stress.' },
    { title: 'Art & Culture', level: 'B2', vocab: ['renaissance', 'impressionism', 'masterpiece', 'art exhibition', 'cultural heritage'], grammar: 'Relative clauses (defining vs non-defining)', sentence: 'The painting, which was discovered in an attic, turned out to be a lost masterpiece.' },
    { title: 'Business Communication', level: 'C1', vocab: ['stakeholders', 'synergy', 'benchmark', 'value proposition', 'strategic alignment'], grammar: 'Inversion (formal)', sentence: 'Never before has the company seen such a strong quarter, nor are we resting on our laurels.' },
    { title: 'Education System', level: 'B1', vocab: ['curriculum', 'pedagogy', 'assessment', 'learning outcome', 'critical thinking'], grammar: 'Reported speech', sentence: 'The professor explained that the curriculum had been revised to emphasize critical thinking skills.' },
    { title: 'Environmental Protection', level: 'B2', vocab: ['emissions', 'biodiversity', 'conservation', 'ecosystem', 'renewable resources'], grammar: 'Causative verbs', sentence: 'The government has had new regulations implemented to protect endangered species.' },
    { title: 'Digital Transformation', level: 'C1', vocab: ['digitalization', 'big data analytics', 'cloud computing', 'cybersecurity', 'digital literacy'], grammar: 'Participle clauses', sentence: 'Leveraging big data analytics, companies are revolutionizing their customer engagement strategies.' }
  ],
  dailySentences: [
    { en: 'The only way to do great work is to love what you do.', zh: '做出伟大工作的唯一方法就是热爱你所做的事情。', source: 'Steve Jobs' },
    { en: 'Innovation distinguishes between a leader and a follower.', zh: '创新区分了领导者和追随者。', source: 'Steve Jobs' },
    { en: 'The future belongs to those who believe in the beauty of their dreams.', zh: '未来属于那些相信自己梦想之美的人。', source: 'Eleanor Roosevelt' },
    { en: 'In the middle of every difficulty lies opportunity.', zh: '每一个困难的中间都蕴含着机遇。', source: 'Albert Einstein' },
    { en: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', zh: '成功不是终点，失败也非末日：重要的是继续前进的勇气。', source: 'Winston Churchill' },
    { en: 'The best way to predict the future is to invent it.', zh: '预测未来的最好方法就是创造未来。', source: 'Alan Kay' },
    { en: 'Your time is limited, so don\'t waste it living someone else\'s life.', zh: '你的时间有限，所以不要浪费时间过别人的生活。', source: 'Steve Jobs' },
    { en: 'Whether you think you can, or you think you can\'t - you\'re right.', zh: '无论你认为自己能，还是认为自己不能——你都是对的。', source: 'Henry Ford' },
    { en: 'The journey of a thousand miles begins with a single step.', zh: '千里之行，始于足下。', source: 'Lao Tzu' },
    { en: 'Actions speak louder than words.', zh: '行胜于言。', source: 'Proverb' }
  ],
  grammarPoints: [
    { title: 'Present Perfect vs Past Simple', explanation: 'Use present perfect for actions with present relevance; past simple for completed past actions.', examples: ['I have lived in Beijing for 5 years.', 'I lived in Beijing for 5 years (but I don\'t live there now).'] },
    { title: 'Conditional Sentences', explanation: 'Type 1: real/possible; Type 2: unreal/hypothetical; Type 3: unreal past', examples: ['If it rains, I will stay home.', 'If I were you, I would accept the offer.', 'If I had studied harder, I would have passed.'] },
    { title: 'Articles (a/an/the)', explanation: 'Use "a/an" for singular countable nouns (unspecified); "the" for specific/unique nouns.', examples: ['I need a new laptop.', 'The sun rises in the east.'] },
    { title: 'Prepositions of Time', explanation: 'Use "in" for months/seasons, "on" for dates/days, "at" for specific times.', examples: ['I was born in July.', 'My birthday is on July 4th.', 'The meeting starts at 3 PM.'] },
    { title: 'Gerund vs Infinitive', explanation: 'Some verbs take gerunds (enjoy, avoid); others take infinitives (want, decide).', examples: ['I enjoy reading books.', 'I want to learn French.'] }
  ]
};

// 每日英语单词
const DAILY_WORDS = [
  { word: 'ephemeral', phonetic: '/ɪˈfemərəl/', meaning: 'adj. 短暂的，瞬息的' },
  { word: 'ubiquitous', phonetic: '/juːˈbɪkwɪtəs/', meaning: 'adj. 无处不在的' },
  { word: 'serendipity', phonetic: '/ˌserənˈdɪpəti/', meaning: 'n. 意外的惊喜，机缘巧合' },
  { word: 'eloquent', phonetic: '/ˈeləkwənt/', meaning: 'adj. 雄辩的，有说服力的' },
  { word: 'resilient', phonetic: '/rɪˈzɪliənt/', meaning: 'adj. 有韧性的，能迅速恢复的' },
  { word: 'meticulous', phonetic: '/məˈtɪkjələs/', meaning: 'adj. 一丝不苟的，细致的' },
  { word: 'paradox', phonetic: '/ˈpærədɒks/', meaning: 'n. 悖论，自相矛盾的说法' },
  { word: 'profound', phonetic: '/prəˈfaʊnd/', meaning: 'adj. 深远的，意义重大的' },
  { word: 'tenacious', phonetic: '/təˈneɪʃəs/', meaning: 'adj. 坚韧不拔的' },
  { word: 'cognizant', phonetic: '/ˈkɒɡnɪzənt/', meaning: 'adj. 认识到的，意识到的' }
];

// 阅读主题
const READING_TOPICS = [
  { id: 'r1', title: '文学经典', icon: '📚', description: '穿越时空，品读中外文学名著', difficulty: '入门', category: '文学' },
  { id: 'r2', title: '哲学思辨', icon: '🧠', description: '探索人生意义与思维方式', difficulty: '进阶', category: '哲学' },
  { id: 'r3', title: '心理学入门', icon: '💭', description: '理解自我与他人的心理机制', difficulty: '入门', category: '心理' },
  { id: 'r4', title: '商业与经济', icon: '💼', description: '认识商业世界的运作规律', difficulty: '进阶', category: '商业' },
  { id: 'r5', title: '科技前沿', icon: '🔬', description: '追踪人工智能、量子计算等前沿领域', difficulty: '高级', category: '科技' },
  { id: 'r6', title: '艺术与美学', icon: '🎨', description: '感受绘画、音乐、建筑中的美', difficulty: '入门', category: '艺术' },
  { id: 'r7', title: '历史长河', icon: '🏛️', description: '以史为鉴，认识人类文明演进', difficulty: '进阶', category: '历史' },
  { id: 'r8', title: '自我成长', icon: '🌱', description: '习惯养成、情绪管理、思维提升', difficulty: '入门', category: '成长' }
];

// 每日阅读推荐
const READING_FEATURED = [
  { id: 'rf1', title: '原子习惯', author: 'James Clear', category: '自我成长', summary: '用1%的小改变，带来复利式的大变化。本书系统阐述了习惯养成的科学方法。', difficulty: '入门', url: 'https://www.jamesclear.com/atomic-habits' },
  { id: 'rf2', title: '深度工作', author: 'Cal Newport', category: '商业', summary: '在注意力稀缺的时代，如何进行高强度的深度工作，成为一个有价值的人。', difficulty: '进阶', url: 'https://www.calnewport.com/books/deep-work/' },
  { id: 'rf3', title: '思考，快与慢', author: 'Daniel Kahneman', category: '心理学', summary: '诺奖得主带你认识大脑的两套思考系统，了解认知偏差如何影响决策。', difficulty: '高级', url: 'https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow' }
];

// 英文期刊短文（约200词）
const ENGLISH_ARTICLES = [
  {
    id: 'ea1',
    title: 'The Power of Small Habits',
    source: 'The Atlantic',
    level: 'B2',
    wordCount: 198,
    text: 'We often believe that success comes from big, dramatic changes. We think we need to quit our jobs, move to a new city, or completely transform our routines overnight. But research suggests otherwise. Small habits, repeated consistently, can lead to remarkable results over time.\n\nConsider the principle of compound interest. A one percent improvement each day may seem trivial, but over a year, it multiplies to thirty-seven times better. The same applies to learning a language, building a business, or improving health. The key is not intensity but consistency.\n\nThe challenge with small habits is that their effects are invisible in the short term. You will not notice a difference after reading ten pages a day for a week. But after a year, you will have read over three thousand six hundred pages. The mind struggles with delayed gratification, yet this is precisely where growth happens.\n\nTo build a small habit, start with something so easy you cannot say no. Want to exercise more? Begin with two minutes of stretching. Want to write more? Start with one sentence. The goal is not the action itself but establishing the identity of someone who does that action regularly.\n\nSmall habits are the architecture of a life well-lived.',
    vocab: ['compound interest', 'trivial', 'consistency', 'delayed gratification', 'architecture'],
    translation: '我们常以为成功源于巨大的改变。但研究表明，微小习惯的持续重复才能带来非凡结果。每天进步1%，一年后就会提升37倍。关键不在于强度，而在于坚持。'
  },
  {
    id: 'ea2',
    title: 'Why Cities Never Sleep',
    source: 'The Economist',
    level: 'B2',
    wordCount: 195,
    text: 'Cities have always been centers of human activity, but modern cities operate on a completely different scale. London, Tokyo, and New York never truly sleep. Their economies run around the clock, fueled by shift workers, international trade, and an insatiable demand for services.\n\nThe twenty-four-hour city is not merely a product of electricity and technology. It reflects a fundamental shift in how we live. In the past, work was tied to daylight. Today, the global economy demands constant connectivity. When Tokyo sleeps, London wakes. When London dozes, New York takes over.\n\nThis perpetual motion has consequences. Night workers face health risks that day workers rarely encounter. The disruption of circadian rhythms has been linked to heart disease, depression, and certain cancers. Yet for many, night work is not a choice but an economic necessity.\n\nCities are also rethinking their nighttime infrastructure. Public transportation, street lighting, and safety services must adapt to a population that is active at all hours. Some cities have appointed night mayors to oversee this transition.\n\nThe city that never sleeps is both a marvel of human organization and a reminder that progress often comes with hidden costs. As urban populations grow, finding balance between vitality and rest will become one of the defining challenges of this century.',
    vocab: ['insatiable', 'perpetual', 'circadian rhythms', 'infrastructure', 'vitality'],
    translation: '现代城市从不真正入睡。伦敦、东京和纽约的经济全天候运转。24小时城市不仅是电力的产物，更反映了生活方式的根本转变。但夜间工作带来了健康风险，城市也需要重新思考夜间基础设施。'
  },
  {
    id: 'ea3',
    title: 'The Science of Memory',
    source: 'Nature',
    level: 'C1',
    wordCount: 202,
    text: 'Memory is not a recording device. It is a reconstructive process, piecing together fragments of experience each time we recall them. This discovery, made by cognitive psychologists decades ago, has profound implications for how we understand ourselves.\n\nEvery time you remember an event, your brain does not simply replay a stored file. Instead, it reassembles the memory from scattered neural patterns. Like a storyteller retelling a tale, each recounting introduces slight variations. Over time, these variations accumulate. The memory you hold today may differ significantly from what actually happened.\n\nThis does not mean our memories are unreliable. Rather, they are adaptive. The brain prioritizes meaning over accuracy. It retains the emotional essence of an experience while discarding precise details. This is why you remember how a conversation felt but not the exact words spoken.\n\nResearchers have found that emotional arousal enhances memory consolidation. Events accompanied by strong feelings, whether joy or fear, are more vividly retained. The amygdala, a small structure deep in the brain, tags these experiences as important.\n\nUnderstanding memory\'s reconstructive nature has practical applications. In legal settings, eyewitness testimony is now treated with more caution. In education, spaced repetition and active recall have proven more effective than passive rereading. In daily life, it reminds us to be humble about what we think we remember.',
    vocab: ['reconstructive', 'fragments', 'neural patterns', 'consolidation', 'amygdala'],
    translation: '记忆不是录音设备，而是一个重建过程。每次回忆时，大脑都会重新拼凑记忆碎片。记忆优先保留意义而非准确性，情绪强化记忆巩固。这一发现对法律、教育和日常生活都有深远影响。'
  },
  {
    id: 'ea4',
    title: 'Remote Work and the Future',
    source: 'Financial Times',
    level: 'B2',
    wordCount: 190,
    text: 'The pandemic accelerated a trend that was already underway: the decentralization of work. Remote work, once a perk offered by progressive companies, became a necessity almost overnight. Now, as the world settles into a new rhythm, the question is not whether remote work will persist but how it will evolve.\n\nProponents argue that remote work increases productivity, reduces commuting time, and gives employees more control over their schedules. Critics counter that it erodes company culture, makes collaboration harder, and blurs the boundary between work and personal life.\n\nThe truth likely lies somewhere in between. Hybrid models, where employees split their time between home and office, are emerging as the most popular solution. This approach offers flexibility while maintaining opportunities for in-person collaboration.\n\nThe implications extend beyond individual companies. Cities that relied on office workers are seeing reduced foot traffic, affecting restaurants, shops, and public transportation. Real estate markets are shifting as people seek larger homes with dedicated office space. Even immigration patterns are changing, as workers freed from geographic constraints relocate to smaller cities and rural areas.\n\nThe future of work will not be a simple return to the past nor a complete break from tradition. It will be a negotiation between employers and employees, between efficiency and community, between freedom and structure. The organizations that navigate this transition successfully will be those that listen to their people.',
    vocab: ['decentralization', 'proponents', 'erodes', 'hybrid', 'geographic constraints'],
    translation: '疫情加速了工作去中心化的趋势。远程工作从福利变成必需品。混合办公模式正在成为最受欢迎的解决方案。远程工作的影响超越了公司层面，影响城市、房地产市场甚至移民模式。'
  },
  {
    id: 'ea5',
    title: 'The Art of Listening',
    source: 'Harvard Business Review',
    level: 'B1',
    wordCount: 187,
    text: 'Most people listen with the intent to reply, not to understand. They are either speaking or preparing to speak. This habit, so common that we barely notice it, is one of the greatest barriers to meaningful communication.\n\nTrue listening requires setting aside our own agenda. It means giving full attention to the speaker without mentally composing a response. It involves not just hearing words but noticing tone, body language, and what remains unsaid. This level of attention is rare and powerful.\n\nIn professional settings, poor listening costs money. Misunderstandings lead to errors, duplicated work, and missed opportunities. Leaders who fail to listen create cultures of silence, where employees feel undervalued and disengaged. The cost is not just individual frustration but organizational decline.\n\nImproving listening skills begins with awareness. Notice how often you interrupt, finish someone\'s sentence, or shift the conversation to yourself. These habits are deeply ingrained, but they can be changed.\n\nTry this experiment: in your next conversation, wait three seconds after the other person finishes speaking before you respond. The silence may feel uncomfortable at first, but it communicates respect and gives the speaker space to elaborate. You will be surprised by what emerges in that pause.\n\nListening is not passive. It is one of the most active, generous things we can do for another person. In a world of constant noise, the ability to truly listen is becoming a rare and valuable skill.',
    vocab: ['intent', 'agenda', 'ingrained', 'elaborate', 'generous'],
    translation: '大多数人倾听是为了回应，而非理解。真正的倾听要求放下自己的议程，全神贯注于说话者。在职场中，不善倾听会导致误解和错失机会。改善倾听技巧始于觉察，尝试在对话中等待三秒再回应。'
  }
];

// BBC Learning English 文章
const BBC_ARTICLES = [
  { id: 'b1', title: 'How to improve your English pronunciation', level: 'B1', url: 'https://www.bbc.co.uk/learningenglish/english/features/pronunciation' },
  { id: 'b2', title: '6 Minute English', level: 'B1', url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english' },
  { id: 'b3', title: 'English at Work', level: 'A2', url: 'https://www.bbc.co.uk/learningenglish/english/features/english-at-work' },
  { id: 'b4', title: 'Business English', level: 'B2', url: 'https://www.bbc.co.uk/learningenglish/english/features/business' },
  { id: 'b5', title: 'English in the News', level: 'B2', url: 'https://www.bbc.co.uk/learningenglish/english/features/news-review' }
];

// 每日新闻（模拟数据，实际应用中可接入API）
const DAILY_NEWS = {
  categories: ['科技', '财经', '文化', '体育', '生活方式'],
  items: [
    { category: '科技', title: '人工智能大模型突破多模态能力', summary: '最新研究表明，AI模型已能同时处理文字、图像、音频等多种信息，标志着通用人工智能的重要一步。', time: '2小时前', url: 'https://www.36kr.com/information/technology/' },
    { category: '科技', title: '量子计算机实现百万量子比特运算', summary: '某科技公司宣布其量子计算机已突破百万量子比特，为解决复杂科学问题提供了新可能。', time: '4小时前', url: 'https://www.sciencedaily.com/news/computers_math/' },
    { category: '财经', title: '全球可持续发展投资创新高', summary: 'ESG（环境、社会、治理）投资基金规模突破历史记录，投资者更加关注长期价值。', time: '3小时前', url: 'https://finance.sina.com.cn/' },
    { category: '财经', title: '数字人民币试点扩大至更多城市', summary: '央行宣布数字人民币试点范围进一步扩大，覆盖更多消费场景和地区。', time: '5小时前', url: 'https://www.yicai.com/' },
    { category: '文化', title: '传统书法艺术在数字时代焕发新生', summary: '随着数字化工具的发展，传统书法艺术以全新形式在年轻群体中流行开来。', time: '6小时前', url: 'https://www.ifeng.com/' },
    { category: '文化', title: '世界博物馆日：线上参观体验创新高', summary: '多家博物馆推出沉浸式线上展览，全球观众可足不出户感受艺术魅力。', time: '8小时前', url: 'https://www.thepaper.cn/' },
    { category: '体育', title: '全民健身计划推动运动科技发展', summary: '智能运动设备和应用程序市场快速增长，帮助人们更好地监测和改善健康。', time: '7小时前', url: 'https://sports.sina.com.cn/' },
    { category: '体育', title: '青少年体育教育改革取得新进展', summary: '教育部门推动体育课程改革，注重培养学生运动兴趣和终身锻炼习惯。', time: '9小时前', url: 'https://www.chinasportsdaily.cn/' },
    { category: '生活方式', title: '城市咖啡文化持续升温', summary: '精品咖啡店数量持续增长，咖啡已成为都市文化生活的重要组成部分。', time: '10小时前', url: 'https://www.sohu.com/lifestyle' },
    { category: '生活方式', title: '极简生活方式流行：少即是多', summary: '越来越多的人开始尝试极简生活，通过减少物质追求提升生活质量。', time: '12小时前', url: 'https://www.xiaohongshu.com/explore' }
  ]
};

// 每周运动计划
const SPORT_PLANS = [
  { id: 'p1', day: '周一', title: '沙漏腰1.0核心训练', desc: '20分钟站立无跑跳，追卧式训练不伤脖子不伤腰', video: 'https://search.bilibili.com/all?keyword=沙漏腰核心训练', icon: '⏳' },
  { id: 'p2', day: '周二', title: '少女背+直角肩', desc: '10分钟美背训练，改善圆肩驼背斜方肌', video: 'https://search.bilibili.com/all?keyword=少女背直角肩训练', icon: '🦢' },
  { id: 'p3', day: '周三', title: '休息日·轻活动', desc: '散步30分钟或瑜伽拉伸，保持活动不剧烈', video: '', icon: '🌿' },
  { id: 'p4', day: '周四', title: '跳绳燃脂训练', desc: '15分钟跳绳HIIT，高效燃脂塑形', video: 'https://search.bilibili.com/all?keyword=跳绳燃脂训练', icon: '🪢' },
  { id: 'p5', day: '周五', title: '蜜桃臀专项训练', desc: '20分钟臀部激活+力量训练', video: 'https://search.bilibili.com/all?keyword=蜜桃臀专项训练', icon: '🍑' },
  { id: 'p6', day: '周六', title: '全身燃脂走', desc: '30分钟无跳跃全身燃脂，适合新手', video: 'https://search.bilibili.com/all?keyword=全身燃脂走训练', icon: '🔥' },
  { id: 'p7', day: '周日', title: '瑜伽放松·冥想', desc: '15分钟阴瑜伽放松身心', video: '', icon: '🧘' }
];

// 运动分类
const SPORT_CATEGORIES = [
  { id: 'running', name: '跑步', icon: '🏃', videoUrl: 'https://www.bilibili.com/search?keyword=跑步教学', description: '提升心肺耐力' },
  { id: 'yoga', name: '瑜伽', icon: '🧘', videoUrl: 'https://www.bilibili.com/search?keyword=瑜伽入门', description: '提升柔韧性和平衡' },
  { id: 'strength', name: '力量训练', icon: '💪', videoUrl: 'https://www.bilibili.com/search?keyword=力量训练教程', description: '增肌塑形' },
  { id: 'cardio', name: '有氧运动', icon: '🔥', videoUrl: 'https://www.bilibili.com/search?keyword=有氧运动', description: '燃脂塑形' },
  { id: 'cycling', name: '骑行', icon: '🚴', videoUrl: 'https://www.bilibili.com/search?keyword=骑行训练', description: '下肢耐力训练' },
  { id: 'swimming', name: '游泳', icon: '🏊', videoUrl: 'https://www.bilibili.com/search?keyword=游泳教学', description: '全身运动' },
  { id: 'stretching', name: '拉伸', icon: '🤸', videoUrl: 'https://www.bilibili.com/search?keyword=拉伸教程', description: '放松肌肉' },
  { id: 'dance', name: '舞蹈', icon: '💃', videoUrl: 'https://www.bilibili.com/search?keyword=舞蹈教学', description: '协调性与表现力' }
];

// 日常默认目标
const DEFAULT_GOALS = [
  { id: 'g1', title: '早起', icon: '🌅' },
  { id: 'g2', title: '读书', icon: '📖' },
  { id: 'g3', title: '运动', icon: '🏃' },
  { id: 'g4', title: '冥想', icon: '🧘' },
  { id: 'g5', title: '喝8杯水', icon: '💧' }
];

// 电影类型
const FILM_TYPES = ['电影', '剧集', '纪录片', '动画'];
const FILM_GENRES = ['剧情', '喜剧', '爱情', '科幻', '悬疑', '动作', '治愈', '奇幻'];

// 高分经典电影推荐
const CLASSIC_FILMS = [
  {
    id: 'f1',
    title: '肖申克的救赎',
    rating: 9.7,
    genre: '剧情',
    year: 1994,
    director: '弗兰克·德拉邦特',
    reason: '希望是美好的，也许是人间至善，而美好的事物永不消逝。',
    poster: 'https://img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg'
  },
  {
    id: 'f2',
    title: '霸王别姬',
    rating: 9.6,
    genre: '剧情',
    year: 1993,
    director: '陈凯歌',
    reason: '一生一代一双人，争教两处销魂。',
    poster: 'https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2561716440.jpg'
  },
  {
    id: 'f3',
    title: '阿甘正传',
    rating: 9.5,
    genre: '剧情',
    year: 1994,
    director: '罗伯特·泽米吉斯',
    reason: '人生就像一盒巧克力，你永远不知道下一颗是什么味道。',
    poster: 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2372307693.jpg'
  },
  {
    id: 'f4',
    title: '泰坦尼克号',
    rating: 9.4,
    genre: '爱情',
    year: 1997,
    director: '詹姆斯·卡梅隆',
    reason: '你跳，我就跳。',
    poster: 'https://img2.doubanio.com/view/photo/s_ratio_poster/public/p457760035.jpg'
  },
  {
    id: 'f5',
    title: '千与千寻',
    rating: 9.4,
    genre: '奇幻',
    year: 2001,
    director: '宫崎骏',
    reason: '不管前方的路有多苦，只要走的方向正确，不管多么崎岖不平，都比站在原地更接近幸福。',
    poster: 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg'
  },
  {
    id: 'f6',
    title: '盗梦空间',
    rating: 9.3,
    genre: '科幻',
    year: 2010,
    director: '克里斯托弗·诺兰',
    reason: '你分不清现实与梦境的时候，就是你醒来的时候。',
    poster: 'https://img2.doubanio.com/view/photo/s_ratio_poster/public/p513344864.jpg'
  },
  {
    id: 'f7',
    title: '星际穿越',
    rating: 9.4,
    genre: '科幻',
    year: 2014,
    director: '克里斯托弗·诺兰',
    reason: '爱是唯一能够超越时空维度的力量。',
    poster: 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2614988097.jpg'
  },
  {
    id: 'f8',
    title: '教父',
    rating: 9.3,
    genre: '剧情',
    year: 1972,
    director: '弗朗西斯·福特·科波拉',
    reason: '花一秒钟就看透事情本质的人，和花半辈子也看不清事情本质的人，命运注定是不一样的。',
    poster: 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p616796485.jpg'
  },
  {
    id: 'f9',
    title: '当幸福来敲门',
    rating: 9.2,
    genre: '剧情',
    year: 2006,
    director: '加布里尔·穆奇诺',
    reason: '只要坚持，梦想总是可以实现的。',
    poster: 'https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2556070687.jpg'
  },
  {
    id: 'f10',
    title: '寻梦环游记',
    rating: 9.1,
    genre: '奇幻',
    year: 2017,
    director: '李·昂克里奇',
    reason: '在爱的记忆消失以前，请记住我。',
    poster: 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2537207693.jpg'
  },
  {
    id: 'f11',
    title: '海上钢琴师',
    rating: 9.3,
    genre: '剧情',
    year: 1998,
    director: '朱塞佩·托纳多雷',
    reason: '陆地上的人喜欢寻根究底，虚度了很多光阴。',
    poster: 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2557499127.jpg'
  },
  {
    id: 'f12',
    title: '无间道',
    rating: 9.3,
    genre: '悬疑',
    year: 2002,
    director: '刘伟强 / 麦兆辉',
    reason: '出来混，迟早是要还的。',
    poster: 'https://img2.doubanio.com/view/photo/s_ratio_poster/public/p616796485.jpg'
  },
  {
    id: 'f13',
    title: '龙猫',
    rating: 9.2,
    genre: '治愈',
    year: 1988,
    director: '宫崎骏',
    reason: '生活坏到一定程度就会好起来，因为它无法更坏。',
    poster: 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg'
  },
  {
    id: 'f14',
    title: '哈利·波特与魔法石',
    rating: 9.1,
    genre: '奇幻',
    year: 2001,
    director: '克里斯·哥伦布',
    reason: '决定我们成为什么样的人的，不是我们的能力，而是我们的选择。',
    poster: 'https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg'
  },
  {
    id: 'f15',
    title: '让子弹飞',
    rating: 9.0,
    genre: '剧情',
    year: 2010,
    director: '姜文',
    reason: '站着把钱挣了。',
    poster: 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg'
  }
];

// 灵感标签
const INSPIRATION_TAGS = ['创意', '写作', '学习', '工作', '生活', '旅行', '美食', '读书', '观影', '其他'];

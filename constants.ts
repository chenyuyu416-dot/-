
import { User, Chat, Category, Post, Competition, Job, VolunteerActivity, Comment, Team, TeamRequest, SentApplication } from './types';
import { BookOpen, Users, Briefcase, Heart, Gamepad2, GraduationCap, Trophy, Mic, Library, Cpu, Lightbulb, PencilRuler, Plane, Camera, Brush } from './components/Icons';

export const DUMMY_USERS: { [key: string]: User } = {
  'user1': { id: 'user1', name: '林同学', avatar: 'https://picsum.photos/seed/user1/100/100', school: '清华大学', major: '电子工程' },
  'user2': { id: 'user2', name: '王同学', avatar: 'https://picsum.photos/seed/user2/100/100', school: '复旦大学', major: '新闻学' },
  'user3': { id: 'user3', name: '张伟', avatar: 'https://picsum.photos/seed/user3/100/100', school: '上海交通大学', major: '机械工程' },
  'user4': { id: 'user4', name: 'AI小助手', avatar: 'https://i.pravatar.cc/150?u=ai_assistant', school: '云端' },
  'user5': { id: 'user5', name: '陈敏', avatar: 'https://picsum.photos/seed/user5/100/100', school: '浙江大学', major: '法学' },
  'dada_assistant': { id: 'dada_assistant', name: '搭搭小助手', avatar: 'https://i.pravatar.cc/150?u=dada_assistant', school: '官方' },
  'currentUser': { 
    id: 'currentUser', 
    name: '李华', 
    avatar: 'https://picsum.photos/seed/current/100/100',
    school: '北京大学',
    major: '计算机科学',
    grade: '大三',
    tags: ['25考研', '互联网+竞赛', 'Python', 'React'],
    preferences: ['喜欢早起学习', '不接受临时放鸽子']
  },
};

export const DUMMY_CHATS: Chat[] = [
  { id: 'chat1', user: DUMMY_USERS['user1'], lastMessage: '好的，我们明天图书馆见！', timestamp: '10:48 AM', unreadCount: 2 },
  { id: 'chat5', user: DUMMY_USERS['user5'], lastMessage: '我已通过了你的搭子申请！', timestamp: '10:15 AM', unreadCount: 1 },
  { id: 'chat6', user: DUMMY_USERS['dada_assistant'], lastMessage: '您已成功报名 "爱心书屋" 志愿活动！', timestamp: '9:45 AM', unreadCount: 0 },
  { id: 'chat2', user: DUMMY_USERS['user2'], lastMessage: '项目计划书我发你邮箱了。', timestamp: '9:15 AM', unreadCount: 0 },
  { id: 'chat3', user: DUMMY_USERS['user3'], lastMessage: '周末Citywalk有兴趣吗？', timestamp: '昨天', unreadCount: 0 },
  { id: 'chat4', user: DUMMY_USERS['user4'], lastMessage: '您好，有什么可以帮您？', timestamp: '昨天', unreadCount: 1 },
];

export const DUMMY_CATEGORIES: Category[] = [
  { id: 'study', title: '卷王修炼营', icon: GraduationCap, color: 'from-blue-500 to-indigo-600', scenes: [ { id: 's1', name: '考研冲刺组', description: '为梦想上岸' }, { id: 's2', name: '考公刷题团', description: '行测申论' }, { id: 's3', name: '图书馆自习局', description: '安静专注' }, { id: 's4', name: '语言学习社', description: '流利外语' } ] },
  { id: 'competition', title: '赛事集结号', icon: Trophy, color: 'from-amber-500 to-orange-600', scenes: [ { id: 'c1', name: '学科竞赛', description: '挑战知识巅峰' }, { id: 'c2', name: '技能竞赛', description: '代码、设计' }, { id: 'c3', name: '体育竞赛', description: '挥洒汗水' }, { id: 'c4', name: '文艺竞赛', description: '艺术才华' } ] },
  { id: 'career', title: '职场闯关团', icon: Briefcase, color: 'from-gray-700 to-gray-900', scenes: [ { id: 'ca1', name: '实习内推组', description: '信息共享' }, { id: 'ca2', name: '面试互助团', description: '模拟实战' }, { id: 'ca3', name: '兼职信息站', description: '优质机会' }, { id: 'ca4', name: '秋招/春招冲刺营', description: '决胜春秋招' } ] },
  { id: 'volunteer', title: '爱心发电站', icon: Heart, color: 'from-red-500 to-pink-600', scenes: [ { id: 'v1', name: '公益服务', description: '温暖世界' }, { id: 'v2', name: '赛事志愿', description: '幕后英雄' }, { id: 'v3', name: '助学支教', description: '知识传递' }, { id: 'v4', name: '应急志愿', description: '挺身而出' } ] },
  { id: 'hobby', title: '多元兴趣局', icon: Gamepad2, color: 'from-green-500 to-teal-600', scenes: [ { id: 'h1', name: '运动搭子', description: '多巴胺的快乐' }, { id: 'h2', name: '阅读搭子', description: '思想碰撞' }, { id: 'h3', name: '旅行搭子', description: '共享风景' }, { id: 'h4', name: '摄影搭子', description: '定格美好' } ] },
];

export const DUMMY_POSTS: Post[] = [
    { id: 'p1', author: DUMMY_USERS['user1'], category: 'study', sceneId: 's1', title: '找个搭子一起备战25软工考研', content: '本人目标院校是北邮，数学一英语一，希望找个作息规律、能互相监督的研友，可以一起线上自习！', tags: ['25考研', '计算机', '线上自习'], timestamp: '2小时前', likes: 12, comments: 4, image: 'https://picsum.photos/seed/post1/400/200' },
    { id: 'p2', author: DUMMY_USERS['user2'], category: 'competition', sceneId: 'c2', title: '互联网+大赛寻一位前端队友', content: '我们团队目前有产品和后端，项目是关于校园社交的，技术栈要求Vue/React，有项目经验的优先。', tags: ['互联网+', '前端', '组队'], timestamp: '5小时前', likes: 25, comments: 8 },
    { id: 'p3', author: DUMMY_USERS['user3'], category: 'hobby', sceneId: 'h1', title: '周末有人一起爬山吗？坐标香山', content: '天气这么好，一起去爬山呼吸新鲜空气吧！预计周六早上9点出发，男女不限，体力好的来！', tags: ['户外', '爬山', '周末活动'], timestamp: '昨天', likes: 30, comments: 15, image: 'https://picsum.photos/seed/post3/400/200' },
    { id: 'p4', author: DUMMY_USERS['user5'], category: 'study', sceneId: 's1', title: '法考主观题冲刺，找个小伙伴互相督促', content: '每天约定时间线上会议室模拟，互相出题背诵，要求有一定基础，非诚勿扰。', tags: ['法考', '主观题', '监督'], timestamp: '3天前', likes: 8, comments: 2 },
    { id: 'p5', author: DUMMY_USERS.currentUser, category: 'hobby', sceneId: 'h1', title: '羽毛球爱好者求搭子，每周2-3次', content: '坐标海淀，一般在学校体育馆，水平中等，寻找一个长期固定的球友，一起锻炼，共同进步。', tags: ['羽毛球', '海淀', '长期搭子'], timestamp: '1周前', likes: 18, comments: 6, image: 'https://picsum.photos/seed/post5/400/200' },
    { id: 'p6', author: DUMMY_USERS['user1'], category: 'study', sceneId: 's2', title: '国考刷题，每日行测一套', content: '目标75+，找搭子互相监督打卡，分享错题，晚上可以一起复盘。', tags: ['考公', '行测', '刷题'], timestamp: '4小时前', likes: 15, comments: 3 },
    { id: 'p7', author: DUMMY_USERS['user3'], category: 'study', sceneId: 's3', title: '图书馆常驻选手求脸熟', content: '坐标校图二楼，社科区，每天8点到，中午不休，备战保研，求一个安静的同路人。', tags: ['图书馆', '自习', '保研'], timestamp: '1天前', likes: 22, comments: 5 },
    { id: 'p8', author: DUMMY_USERS['user2'], category: 'hobby', sceneId: 'h2', title: '周末读书会，本期主题《百年孤独》', content: '寻找喜欢马尔克斯的朋友，一起探讨魔幻现实主义的魅力，地点在学校附近的咖啡馆。', tags: ['读书会', '文学', '百年孤独'], timestamp: '2天前', likes: 10, comments: 7 },
];

export const DUMMY_COMMENTS: Comment[] = [
    {id: 'c1', postId: 'p1', author: DUMMY_USERS.user5, text: '姐妹，我也是25考北邮，可以一起吗？', timestamp: '1小时前'},
    {id: 'c2', postId: 'p1', author: DUMMY_USERS.currentUser, text: '已私信！', timestamp: '30分钟前'},
    {id: 'c3', postId: 'p2', author: DUMMY_USERS.currentUser, text: '大佬看看我，React还算熟练，做过两个项目。', timestamp: '4小时前'},
    {id: 'c4', postId: 'p3', author: DUMMY_USERS.user1, text: '求带！不过我体力可能不太行哈哈。', timestamp: '20小时前'},
];

export const DUMMY_COMPETITIONS: Competition[] = [
    { id: 'comp1', sceneId: 'c1', name: '第十届中国国际“互联网+”大学生创新创业大赛', category: '创业', deadline: '2024-08-31', participants: '1-15人', details: '大赛旨在深化高等教育综合改革，激发大学生的创造力，培养造就“大众创业、万众创新”的生力军...'},
    { id: 'comp2', sceneId: 'c1', name: '2024年全国大学生数学建模竞赛', category: '学科', deadline: '2024-09-01', participants: '3人', details: '要求三人组成一队，在三天时间内，就指定的问题完成从建立模型、求解、验证到论文撰写的全部工作。'},
    { id: 'comp3', sceneId: 'c2', name: '蓝桥杯全国软件和信息技术专业人才大赛', category: '技能', deadline: '2024-10-15', participants: '个人赛', details: '国内领先的全国性IT学科赛事，旨在促进软件和信息技术专业人才培养。'},
];

export const DUMMY_TEAMS: Team[] = [
    {id: 't1', competitionId: 'comp1', name: '“校园通”项目组', leader: DUMMY_USERS.user2, members: [DUMMY_USERS.user2, DUMMY_USERS.user5], lookingFor: '前端开发，要求掌握Python，已有商业计划书'},
    {id: 't2', competitionId: 'comp1', name: '“AI赋能教育”团队', leader: DUMMY_USERS.user3, members: [DUMMY_USERS.user3], lookingFor: '算法工程师和产品经理各一名'},
    { id: 't3', competitionId: 'comp2', name: '数模冲奖小分队', leader: DUMMY_USERS.user1, members: [DUMMY_USERS.user1, DUMMY_USERS.currentUser], lookingFor: '寻找一位熟悉论文写作和排版的队友'},
];

export const DUMMY_JOBS: Job[] = [
    {id: 'j1', sceneId: 'ca1', title: '前端开发实习生', company: '字节跳动', location: '北京', type: '线下', salary: '400/天', deadline: '2024-09-30'},
    {id: 'j2', sceneId: 'ca1', title: '产品运营实习生', company: '腾讯', location: '深圳', type: '线下', salary: '300/天', deadline: '2024-08-31'},
    {id: 'j3', sceneId: 'ca3', title: '新媒体内容编辑', company: '小红书', location: '上海', type: '远程', salary: '200/天', deadline: '2024-10-15'},
];

export const DUMMY_VOLUNTEER_ACTIVITIES: VolunteerActivity[] = [
    {id: 'v1', sceneId: 'v1', title: '“爱心书屋”图书整理', organization: '北京大学青年志愿者协会', location: '校内图书馆', time: '每周六下午', required: 10, certification: true},
    {id: 'v2', sceneId: 'v2', title: '马拉松赛事服务志愿者', organization: '北京市体育局', location: '奥林匹克森林公园', time: '2024-10-20 全天', required: 50, certification: true},
    {id: 'v3', sceneId: 'v3', title: '“阳光助学”线上支教', organization: '西部阳光基金会', location: '线上', time: '每周2小时', required: 20, certification: false},
];

export const DUMMY_TEAM_REQUESTS: TeamRequest[] = [
    { id: 'req1', user: DUMMY_USERS.user1, teamName: '“校园通”项目组', message: '你好，我对你们的项目很感兴趣，我擅长React和Vue。'},
    { id: 'req2', user: DUMMY_USERS.user3, teamName: '数模冲奖小分队', message: '同学你好，我数理基础不错，希望加入你们。'},
];

export const DUMMY_SENT_APPLICATIONS: SentApplication[] = [
    { id: 'sa1', postTitle: '法考主观题冲刺，找个小伙伴互相督促', recipient: DUMMY_USERS.user5, status: 'accepted', timestamp: '2天前' },
    { id: 'sa2', postTitle: '周末有人一起爬山吗？坐标香山', recipient: DUMMY_USERS.user3, status: 'pending', timestamp: '昨天' },
    { id: 'sa3', postTitle: '国考刷题，每日行测一套', recipient: DUMMY_USERS.user1, status: 'rejected', timestamp: '3小时前' },
];
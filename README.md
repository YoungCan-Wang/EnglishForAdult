# EnglishForAdult - 成人英语学习应用

一个专为成人设计的英语口语和听力学习React Native应用。

## 功能特色

### 🗣️ 口语练习
- 发音练习和评估
- 实时语音识别
- 发音准确度分析
- 重点词汇练习

### 👂 听力训练
- 多难度听力材料
- 互动式问答练习
- 原文对照功能
- 播放速度调节

### 📚 词汇学习
- 分类词汇管理
- 发音播放功能
- 词汇详情查看
- 学习工具集成

### 📊 学习进度
- 详细学习统计
- 技能等级系统
- 成就徽章系统
- 连续学习记录

## 技术架构

### 前端框架
- **React Native** - 跨平台移动应用开发
- **TypeScript** - 类型安全的JavaScript
- **React Navigation** - 导航管理

### UI组件
- **react-native-vector-icons** - 图标库
- **react-native-linear-gradient** - 渐变效果
- **react-native-safe-area-context** - 安全区域处理

### 数据存储
- **AsyncStorage** - 本地数据持久化
- **ProgressService** - 学习进度管理
- **DataService** - 模拟数据服务

### 音频处理
- **AudioService** - 音频播放和录音
- **语音识别** - 发音评估功能
- **音频格式转换** - 多格式支持

## 项目结构

```
src/
├── components/          # 可复用组件
├── navigation/          # 导航配置
│   └── AppNavigator.tsx # 主导航器
├── screens/            # 页面组件
│   ├── HomeScreen.tsx           # 首页
│   ├── SpeakingScreen.tsx       # 口语练习
│   ├── ListeningScreen.tsx      # 听力练习
│   ├── VocabularyScreen.tsx     # 词汇学习
│   ├── ProfileScreen.tsx        # 个人中心
│   ├── LessonDetailScreen.tsx   # 课程详情
│   ├── PronunciationPracticeScreen.tsx  # 发音练习
│   └── ListeningPracticeScreen.tsx      # 听力练习详情
├── services/           # 业务服务
│   ├── DataService.ts       # 数据服务
│   ├── AudioService.ts      # 音频服务
│   └── ProgressService.ts   # 进度服务
├── types/              # 类型定义
│   └── index.ts        # 核心类型
├── utils/              # 工具函数
└── data/               # 静态数据

assets/
├── audio/              # 音频文件
└── images/             # 图片资源
```

## 安装和运行

### 环境要求
- Node.js >= 16
- React Native CLI
- Xcode (iOS开发)
- Android Studio (Android开发)

### 安装依赖
```bash
cd EnglishForAdult
npm install
```

### iOS运行
```bash
# 安装iOS依赖
npx pod-install

# 启动Metro服务器
npx react-native start

# 在新终端运行iOS应用
npx react-native run-ios
```

### Android运行
```bash
# 启动Metro服务器
npx react-native start

# 在新终端运行Android应用
npx react-native run-android
```

## 核心功能模块

### 1. 导航系统
- 底部标签导航（首页、口语、听力、词汇、我的）
- 堆栈导航支持页面跳转
- 类型安全的导航参数

### 2. 学习进度管理
- 用户等级和积分系统
- 技能经验值和升级机制
- 连续学习天数统计
- 成就解锁系统

### 3. 音频处理
- 音频播放和暂停控制
- 录音功能和文件管理
- 语音识别和发音评估
- 播放速度调节

### 4. 数据持久化
- 学习进度本地存储
- 用户设置保存
- 离线数据支持

## 开发计划

### 已完成 ✅
- [x] 项目初始化和依赖配置
- [x] 核心类型定义和TypeScript配置
- [x] 导航系统搭建（底部标签+堆栈导航）
- [x] 主要页面组件开发（首页、口语、听力、词汇、个人中心）
- [x] 音频服务架构设计
- [x] 进度管理系统和数据持久化
- [x] UI界面设计和渐变效果
- [x] TypeScript类型错误修复
- [x] React组件导入问题修复
- [x] 代码质量检查和编译验证

### 待开发 🚧
- [ ] 真实音频播放集成
- [ ] 语音识别API对接
- [ ] 发音评估算法
- [ ] 课程内容数据
- [ ] 用户认证系统
- [ ] 云端数据同步
- [ ] 推送通知
- [ ] 应用图标和启动页

### 优化计划 🔄
- [ ] 性能优化
- [ ] 错误处理完善
- [ ] 单元测试覆盖
- [ ] 国际化支持
- [ ] 无障碍功能

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系：
- 创建 Issue
- 发送邮件

---

**注意**: 这是一个学习项目，部分功能使用模拟数据。在生产环境中使用前，请确保集成真实的API和服务。

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lesson, SpeakingExercise, ListeningExercise, VocabularyWord, UserProgress } from '../types';

// 模拟课程数据
const mockLessons: Lesson[] = [
  {
    id: '1',
    title: '日常问候',
    description: '学习基本的英语问候语和自我介绍',
    level: 'beginner',
    type: 'speaking',
    content: {
      instructions: '练习基本的问候语，注意语调和发音',
      exercises: [
        {
          id: '1-1',
          type: 'pronunciation',
          question: '请跟读以下句子：Hello, how are you today?',
          correctAnswer: 'Hello, how are you today?',
          points: 10,
        },
      ],
    },
    duration: 15,
    completed: false,
  },
  {
    id: '2',
    title: '购物对话',
    description: '学习在商店购物时的常用英语表达',
    level: 'intermediate',
    type: 'listening',
    content: {
      instructions: '听对话并回答问题',
      exercises: [
        {
          id: '2-1',
          type: 'listening',
          question: '顾客想要买什么？',
          options: ['衣服', '食物', '书籍', '电子产品'],
          correctAnswer: '衣服',
          points: 15,
        },
      ],
    },
    duration: 20,
    completed: false,
  },
  {
    id: '3',
    title: '商务会议',
    description: '掌握商务会议中的专业英语表达',
    level: 'advanced',
    type: 'vocabulary',
    content: {
      instructions: '学习商务词汇并练习使用',
      exercises: [
        {
          id: '3-1',
          type: 'vocabulary',
          question: 'What does "agenda" mean?',
          options: ['议程', '会议', '报告', '决定'],
          correctAnswer: '议程',
          points: 20,
        },
      ],
    },
    duration: 25,
    completed: true,
  },
  {
    id: '4',
    title: '旅行英语',
    description: '旅行时必备的英语表达和词汇',
    level: 'intermediate',
    type: 'speaking',
    content: {
      instructions: '练习旅行场景对话',
      exercises: [
        {
          id: '4-1',
          type: 'conversation',
          question: '如何询问酒店房间？',
          correctAnswer: 'Do you have any available rooms?',
          points: 15,
        },
      ],
    },
    duration: 18,
    completed: false,
  },
];

// 模拟口语练习数据
const mockSpeakingExercises: SpeakingExercise[] = [
  {
    id: 'sp1',
    text: 'Good morning! How are you doing today? I hope you have a wonderful day ahead.',
    audioUrl: 'https://example.com/audio1.mp3',
    targetWords: ['morning', 'wonderful', 'ahead'],
    difficulty: 'easy',
  },
  {
    id: 'sp2',
    text: 'Could you please help me find the nearest subway station? I am a bit lost.',
    audioUrl: 'https://example.com/audio2.mp3',
    targetWords: ['nearest', 'subway', 'station', 'lost'],
    difficulty: 'easy',
  },
  {
    id: 'sp3',
    text: 'I would like to make a reservation for two people at seven thirty this evening.',
    audioUrl: 'https://example.com/audio3.mp3',
    targetWords: ['reservation', 'evening', 'thirty'],
    difficulty: 'medium',
  },
  {
    id: 'sp4',
    text: 'The quarterly financial report demonstrates significant improvement in our market position.',
    audioUrl: 'https://example.com/audio4.mp3',
    targetWords: ['quarterly', 'financial', 'demonstrates', 'significant', 'improvement'],
    difficulty: 'hard',
  },
];

// 模拟听力练习数据
const mockListeningExercises: ListeningExercise[] = [
  {
    id: 'ls1',
    audioUrl: 'https://example.com/listening1.mp3',
    transcript: 'Welcome to our English learning program. Today we will focus on basic conversation skills.',
    questions: [
      {
        id: 'ls1-q1',
        question: 'What is the focus of today\'s program?',
        options: ['Grammar', 'Vocabulary', 'Conversation skills', 'Writing'],
        correctAnswer: 'Conversation skills',
      },
    ],
    difficulty: 'easy',
  },
  {
    id: 'ls2',
    audioUrl: 'https://example.com/listening2.mp3',
    transcript: 'The weather forecast predicts heavy rain this afternoon with temperatures dropping to fifteen degrees.',
    questions: [
      {
        id: 'ls2-q1',
        question: 'What is the predicted temperature?',
        options: ['10 degrees', '15 degrees', '20 degrees', '25 degrees'],
        correctAnswer: '15 degrees',
      },
    ],
    difficulty: 'medium',
  },
];

// 模拟词汇数据
const mockVocabulary: VocabularyWord[] = [
  {
    id: 'v1',
    word: 'accomplish',
    pronunciation: '/əˈkʌmplɪʃ/',
    meaning: '完成，实现',
    example: 'She was able to accomplish her goals through hard work.',
    audioUrl: 'https://example.com/vocab1.mp3',
    difficulty: 'medium',
    category: 'general',
  },
  {
    id: 'v2',
    word: 'entrepreneur',
    pronunciation: '/ˌɒntrəprəˈnɜː(r)/',
    meaning: '企业家',
    example: 'The young entrepreneur started her own tech company.',
    audioUrl: 'https://example.com/vocab2.mp3',
    difficulty: 'hard',
    category: 'business',
  },
  {
    id: 'v3',
    word: 'delicious',
    pronunciation: '/dɪˈlɪʃəs/',
    meaning: '美味的',
    example: 'The cake was absolutely delicious.',
    audioUrl: 'https://example.com/vocab3.mp3',
    difficulty: 'easy',
    category: 'food',
  },
];

// 数据服务函数
export const getLessons = async (): Promise<Lesson[]> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockLessons;
};

export const getSpeakingExercises = async (difficulty?: string): Promise<SpeakingExercise[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (difficulty) {
    return mockSpeakingExercises.filter(ex => ex.difficulty === difficulty);
  }
  return mockSpeakingExercises;
};

export const getListeningExercises = async (difficulty?: string): Promise<ListeningExercise[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (difficulty) {
    return mockListeningExercises.filter(ex => ex.difficulty === difficulty);
  }
  return mockListeningExercises;
};

export const getVocabulary = async (category?: string): Promise<VocabularyWord[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (category) {
    return mockVocabulary.filter(word => word.category === category);
  }
  return mockVocabulary;
};

export const getUserProgress = async (): Promise<any> => {
  try {
    const progress = await AsyncStorage.getItem('userProgress');
    if (progress) {
      return JSON.parse(progress);
    }
    // 返回默认进度
    return {
      streak: 5,
      totalScore: 1250,
      completedLessons: 8,
      level: 'intermediate',
    };
  } catch (error) {
    console.error('获取用户进度失败:', error);
    return {
      streak: 0,
      totalScore: 0,
      completedLessons: 0,
      level: 'beginner',
    };
  }
};

export const saveUserProgress = async (progress: any): Promise<void> => {
  try {
    await AsyncStorage.setItem('userProgress', JSON.stringify(progress));
  } catch (error) {
    console.error('保存用户进度失败:', error);
  }
};

export const getLessonById = async (id: string): Promise<Lesson | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockLessons.find(lesson => lesson.id === id) || null;
};

export const markLessonCompleted = async (lessonId: string, score: number): Promise<void> => {
  try {
    const progress = await getUserProgress();
    const newProgress = {
      ...progress,
      totalScore: progress.totalScore + score,
      completedLessons: progress.completedLessons + 1,
    };
    await saveUserProgress(newProgress);
    
    // 更新课程完成状态
    const lesson = mockLessons.find(l => l.id === lessonId);
    if (lesson) {
      lesson.completed = true;
    }
  } catch (error) {
    console.error('标记课程完成失败:', error);
  }
};

// 获取每日挑战
export const getDailyChallenge = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    id: 'daily1',
    title: '每日发音挑战',
    description: '练习今日重点单词发音',
    words: ['pronunciation', 'challenge', 'practice'],
    points: 50,
    completed: false,
  };
};

// 获取学习统计
export const getLearningStats = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return {
    totalStudyTime: 1200, // 分钟
    wordsLearned: 156,
    lessonsCompleted: 23,
    speakingScore: 85,
    listeningScore: 78,
    vocabularyScore: 92,
  };
};
// 应用核心类型定义

export interface User {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  totalScore: number;
  streak: number;
  createdAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'speaking' | 'listening' | 'vocabulary';
  content: LessonContent;
  duration: number; // 分钟
  completed: boolean;
}

export interface LessonContent {
  instructions: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  type: 'pronunciation' | 'listening' | 'vocabulary' | 'conversation';
  question: string;
  options?: string[];
  correctAnswer: string;
  audioUrl?: string;
  imageUrl?: string;
  points: number;
}

export interface UserProgress {
  userId: string;
  level: number;
  totalPoints: number;
  streakDays: number;
  completedLessons: string[];
  skillLevels: {
    speaking: number;
    listening: number;
    vocabulary: number;
  };
  achievements: string[];
  lastActiveDate: string;
}

export interface LessonProgress {
  lessonId: string;
  score: number;
  completedAt: Date;
  timeSpent: number; // 秒
  mistakes: string[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  audioUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface SpeakingExercise {
  id: string;
  text: string;
  audioUrl: string;
  targetWords: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ListeningExercise {
  id: string;
  title: string;
  audioUrl: string;
  transcript: string;
  questions: ListeningQuestion[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ListeningQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface LearningStats {
  totalStudyTime: number;
  lessonsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  averageScore: number;
  streakDays: number;
  vocabularyCount: number;
  speakingScore: number;
  listeningScore: number;
  vocabularyScore: number;
  // 添加缺少的属性
  wordsLearned: number;
  totalPoints: number;
  level: number;
  weeklyGoal: number;
  skillProgress: {
    speaking: {
      level: number;
      experience: number;
      maxExperience: number;
      recentScores: number[];
    };
    listening: {
      level: number;
      experience: number;
      maxExperience: number;
      recentScores: number[];
    };
    vocabulary: {
      level: number;
      experience: number;
      maxExperience: number;
      recentScores: number[];
    };
  };
  weeklyProgress: number[];
  monthlyProgress: number[];
}

export interface AppState {
  user: User | null;
  currentLesson: Lesson | null;
  progress: UserProgress[];
  achievements: Achievement[];
  isLoading: boolean;
  error: string | null;
}
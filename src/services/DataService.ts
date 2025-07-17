// 数据服务 - 处理应用数据的获取和存储
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lesson, SpeakingExercise, ListeningExercise, VocabularyWord, UserProgress } from '../types';

// 导入真实数据
import lessonsData from '../data/lessons';
import vocabularyData from '../data/vocabulary';
import speakingData from '../data/speaking';
import listeningData from '../data/listening';

// 数据服务类
export const DataService = {
  // 获取课程列表
  async getLessons(): Promise<Lesson[]> {
    try {
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      return lessonsData;
    } catch (error) {
      console.error('获取课程失败:', error);
      return [];
    }
  },

  // 获取口语练习
  async getSpeakingExercises(difficulty?: string): Promise<SpeakingExercise[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      if (difficulty) {
        return speakingData.filter(ex => ex.difficulty === difficulty);
      }
      return speakingData;
    } catch (error) {
      console.error('获取口语练习失败:', error);
      return [];
    }
  },

  // 获取听力练习
  async getListeningExercises(difficulty?: string): Promise<ListeningExercise[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      if (difficulty) {
        return listeningData.filter(ex => ex.difficulty === difficulty);
      }
      return listeningData;
    } catch (error) {
      console.error('获取听力练习失败:', error);
      return [];
    }
  },

  // 获取词汇列表
  async getVocabulary(category?: string): Promise<VocabularyWord[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      if (category) {
        return vocabularyData.filter(word => word.category === category);
      }
      return vocabularyData;
    } catch (error) {
      console.error('获取词汇失败:', error);
      return [];
    }
  },

  // 获取用户进度
  async getUserProgress(): Promise<UserProgress> {
    try {
      const progress = await AsyncStorage.getItem('userProgress');
      if (progress) {
        return JSON.parse(progress);
      }
      // 返回默认进度
      return {
        userId: 'default',
        level: 1,
        totalPoints: 1250,
        streakDays: 5,
        completedLessons: ['lesson1', 'lesson2'],
        skillLevels: { speaking: 1, listening: 1, vocabulary: 1 },
        achievements: [],
        lastActiveDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error('获取用户进度失败:', error);
      return {
        userId: 'default',
        level: 1,
        totalPoints: 0,
        streakDays: 0,
        completedLessons: [],
        skillLevels: { speaking: 0, listening: 0, vocabulary: 0 },
        achievements: [],
        lastActiveDate: new Date().toISOString(),
      };
    }
  },

  // 保存用户进度
  async saveUserProgress(progress: UserProgress): Promise<void> {
    try {
      await AsyncStorage.setItem('userProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('保存用户进度失败:', error);
    }
  },

  // 根据ID获取课程
  async getLessonById(id: string): Promise<Lesson | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return lessonsData.find(lesson => lesson.id === id) || null;
  },

  // 标记课程完成
  async markLessonCompleted(lessonId: string, score: number): Promise<void> {
    try {
      const progress = await this.getUserProgress();
      const newProgress = {
        ...progress,
        totalPoints: progress.totalPoints + score,
        completedLessons: [...progress.completedLessons, lessonId],
        lastActiveDate: new Date().toISOString(),
      };
      await this.saveUserProgress(newProgress);
      
      // 更新课程完成状态
      const lesson = lessonsData.find(l => l.id === lessonId);
      if (lesson) {
        lesson.completed = true;
      }
    } catch (error) {
      console.error('标记课程完成失败:', error);
    }
  },

  // 获取每日挑战
  async getDailyChallenge(): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      id: 'daily1',
      title: '每日发音挑战',
      description: '练习今日重点单词发音',
      words: ['pronunciation', 'challenge', 'practice'],
      points: 50,
      completed: false,
    };
  },

  // 获取学习统计
  async getLearningStats(): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      totalStudyTime: 1200, // 分钟
      wordsLearned: 156,
      lessonsCompleted: 23,
      speakingScore: 85,
      listeningScore: 78,
      vocabularyScore: 92,
    };
  },
};
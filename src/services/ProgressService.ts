import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, LearningStats } from '../types';

// 移除重复的 LearningStats 接口定义（删除第4-16行）

// 每日学习记录
export interface DailyRecord {
  date: string; // YYYY-MM-DD
  studyTime: number; // 学习时间（分钟）
  lessonsCompleted: number; // 完成课程数
  wordsLearned: number; // 学习单词数
  points: number; // 获得积分
  exercises: {
    speaking: number;
    listening: number;
    vocabulary: number;
  };
}

// 技能进度
export interface SkillProgress {
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
}

class ProgressService {
  private static instance: ProgressService;
  private readonly STORAGE_KEYS = {
    USER_PROGRESS: 'user_progress',
    LEARNING_STATS: 'learning_stats',
    DAILY_RECORDS: 'daily_records',
    ACHIEVEMENTS: 'achievements',
    SKILL_PROGRESS: 'skill_progress',
    LESSON_PROGRESS: 'lesson_progress',
  };

  public static getInstance(): ProgressService {
    if (!ProgressService.instance) {
      ProgressService.instance = new ProgressService();
    }
    return ProgressService.instance;
  }

  // 获取用户进度
  public async getUserProgress(): Promise<UserProgress> {
    try {
      const stored = await AsyncStorage.getItem(this.STORAGE_KEYS.USER_PROGRESS);
      if (stored) {
        return JSON.parse(stored);
      }
      
      // 返回默认进度
      const defaultProgress: UserProgress = {
        userId: 'default_user',
        level: 1,
        totalPoints: 0,
        streakDays: 0,
        completedLessons: [],
        skillLevels: {
          speaking: 1,
          listening: 1,
          vocabulary: 1,
        },
        achievements: [],
        lastActiveDate: new Date().toISOString(),
      };
      
      await this.saveUserProgress(defaultProgress);
      return defaultProgress;
    } catch (error) {
      console.error('Failed to get user progress:', error);
      throw new Error('获取用户进度失败');
    }
  }

  // 保存用户进度
  public async saveUserProgress(progress: UserProgress): Promise<void> {
    try {
      await AsyncStorage.setItem(
        this.STORAGE_KEYS.USER_PROGRESS,
        JSON.stringify(progress)
      );
    } catch (error) {
      console.error('Failed to save user progress:', error);
      throw new Error('保存用户进度失败');
    }
  }

  // 获取学习统计
  public async getLearningStats(): Promise<LearningStats> {
    try {
      const stored = await AsyncStorage.getItem(this.STORAGE_KEYS.LEARNING_STATS);
      if (stored) {
        return JSON.parse(stored);
      }
      
      // 返回默认统计
      const defaultStats: LearningStats = {
        totalStudyTime: 0,
        wordsLearned: 0,
        lessonsCompleted: 0,
        speakingScore: 0,
        listeningScore: 0,
        vocabularyScore: 0,
        streakDays: 0,
        totalPoints: 0,
        level: 1,
        weeklyGoal: 300, // 默认周目标5小时
        weeklyProgress: [], // 每周学习进度记录数组
        currentStreak: 0,
        longestStreak: 0,
        averageScore: 0,
        vocabularyCount: 0,
        skillProgress: {
          speaking: {
            level: 1,
            experience: 0,
            maxExperience: 100,
            recentScores: []
          },
          listening: {
            level: 1,
            experience: 0,
            maxExperience: 100,
            recentScores: []
          },
          vocabulary: {
            level: 1,
            experience: 0,
            maxExperience: 100,
            recentScores: []
          }
        },
        monthlyProgress: []
      };
      
      await this.saveLearningStats(defaultStats);
      return defaultStats;
    } catch (error) {
      console.error('Failed to get learning stats:', error);
      throw new Error('获取学习统计失败');
    }
  }

  // 保存学习统计
  public async saveLearningStats(stats: LearningStats): Promise<void> {
    try {
      await AsyncStorage.setItem(
        this.STORAGE_KEYS.LEARNING_STATS,
        JSON.stringify(stats)
      );
    } catch (error) {
      console.error('Failed to save learning stats:', error);
      throw new Error('保存学习统计失败');
    }
  }

  // 记录学习会话
  public async recordStudySession(
    duration: number, // 学习时长（分钟）
    type: 'speaking' | 'listening' | 'vocabulary',
    score?: number,
    wordsLearned?: number
  ): Promise<void> {
    try {
      const [progress, stats, skillProgress] = await Promise.all([
        this.getUserProgress(),
        this.getLearningStats(),
        this.getSkillProgress(),
      ]);
      
      const today = new Date().toISOString().split('T')[0];
      const points = this.calculatePoints(duration, type, score);
      
      // 更新用户进度
      progress.totalPoints += points;
      progress.lastActiveDate = new Date().toISOString();
      
      // 更新学习统计
      stats.totalStudyTime += duration;
      stats.totalPoints += points;
      if (wordsLearned) {
        stats.wordsLearned += wordsLearned;
      }
      
      // 更新技能进度
      if (score !== undefined) {
        const skill = skillProgress[type];
        skill.recentScores.push(score);
        if (skill.recentScores.length > 10) {
          skill.recentScores = skill.recentScores.slice(-10);
        }
        
        // 计算平均分
        const avgScore = skill.recentScores.reduce((sum, s) => sum + s, 0) / skill.recentScores.length;
        stats[`${type}Score` as keyof LearningStats] = Math.round(avgScore) as any;
        
        // 增加经验值
        const expGain = Math.floor(score / 10) + Math.floor(duration / 5);
        skill.experience += expGain;
        
        // 检查升级
        while (skill.experience >= skill.maxExperience) {
          skill.experience -= skill.maxExperience;
          skill.level += 1;
          skill.maxExperience = this.calculateMaxExperience(skill.level);
          
          // 更新用户技能等级
          progress.skillLevels[type] = skill.level;
        }
      }
      
      // 更新用户等级
      const newLevel = this.calculateUserLevel(stats.totalPoints);
      if (newLevel > progress.level) {
        progress.level = newLevel;
        stats.level = newLevel;
        
        // 触发升级成就
        await this.unlockAchievement(`level_${newLevel}`);
      }
      
      // 更新连续学习天数
      await this.updateStreakDays(progress, stats);
      
      // 记录每日学习
      await this.recordDailyStudy(today, duration, type, points, wordsLearned || 0);
      
      // 保存所有更新
      await Promise.all([
        this.saveUserProgress(progress),
        this.saveLearningStats(stats),
        this.saveSkillProgress(skillProgress),
      ]);
      
      // 检查成就
      await this.checkAchievements(stats, progress);
    } catch (error) {
      console.error('Failed to record study session:', error);
      throw new Error('记录学习会话失败');
    }
  }

  // 完成课程
  public async completeLesson(lessonId: string, _score: number): Promise<void> {
    try {
      const [progress, stats] = await Promise.all([
        this.getUserProgress(),
        this.getLearningStats(),
      ]);
      
      // 添加到已完成课程
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
        stats.lessonsCompleted += 1;
        
        // 获得完成课程奖励
        const bonusPoints = 50;
        progress.totalPoints += bonusPoints;
        stats.totalPoints += bonusPoints;
        
        await Promise.all([
          this.saveUserProgress(progress),
          this.saveLearningStats(stats),
        ]);
        
        // 检查课程完成相关成就
        await this.checkLessonAchievements(stats.lessonsCompleted);
      }
    } catch (error) {
      console.error('Failed to complete lesson:', error);
      throw new Error('完成课程记录失败');
    }
  }

  // 获取技能进度
  public async getSkillProgress(): Promise<SkillProgress> {
    try {
      const stored = await AsyncStorage.getItem(this.STORAGE_KEYS.SKILL_PROGRESS);
      if (stored) {
        return JSON.parse(stored);
      }
      
      const defaultProgress: SkillProgress = {
        speaking: {
          level: 1,
          experience: 0,
          maxExperience: 100,
          recentScores: [],
        },
        listening: {
          level: 1,
          experience: 0,
          maxExperience: 100,
          recentScores: [],
        },
        vocabulary: {
          level: 1,
          experience: 0,
          maxExperience: 100,
          recentScores: [],
        },
      };
      
      await this.saveSkillProgress(defaultProgress);
      return defaultProgress;
    } catch (error) {
      console.error('Failed to get skill progress:', error);
      throw new Error('获取技能进度失败');
    }
  }

  // 保存技能进度
  public async saveSkillProgress(progress: SkillProgress): Promise<void> {
    try {
      await AsyncStorage.setItem(
        this.STORAGE_KEYS.SKILL_PROGRESS,
        JSON.stringify(progress)
      );
    } catch (error) {
      console.error('Failed to save skill progress:', error);
      throw new Error('保存技能进度失败');
    }
  }

  // 获取每日学习记录
  public async getDailyRecords(days: number = 30): Promise<DailyRecord[]> {
    try {
      const stored = await AsyncStorage.getItem(this.STORAGE_KEYS.DAILY_RECORDS);
      const allRecords: DailyRecord[] = stored ? JSON.parse(stored) : [];
      
      // 返回最近指定天数的记录
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      return allRecords.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= cutoffDate;
      }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Failed to get daily records:', error);
      return [];
    }
  }

  // 记录每日学习
  private async recordDailyStudy(
    date: string,
    duration: number,
    type: 'speaking' | 'listening' | 'vocabulary',
    points: number,
    wordsLearned: number
  ): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(this.STORAGE_KEYS.DAILY_RECORDS);
      const records: DailyRecord[] = stored ? JSON.parse(stored) : [];
      
      let todayRecord = records.find(r => r.date === date);
      if (!todayRecord) {
        todayRecord = {
          date,
          studyTime: 0,
          lessonsCompleted: 0,
          wordsLearned: 0,
          points: 0,
          exercises: {
            speaking: 0,
            listening: 0,
            vocabulary: 0,
          },
        };
        records.push(todayRecord);
      }
      
      todayRecord.studyTime += duration;
      todayRecord.points += points;
      todayRecord.wordsLearned += wordsLearned;
      todayRecord.exercises[type] += 1;
      
      await AsyncStorage.setItem(
        this.STORAGE_KEYS.DAILY_RECORDS,
        JSON.stringify(records)
      );
    } catch (error) {
      console.error('Failed to record daily study:', error);
    }
  }

  // 更新连续学习天数
  private async updateStreakDays(progress: UserProgress, stats: LearningStats): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    const lastActiveDate = progress.lastActiveDate.split('T')[0];
    
    if (lastActiveDate === today) {
      // 今天已经学习过了，不需要更新
      return;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (lastActiveDate === yesterdayStr) {
      // 连续学习
      progress.streakDays += 1;
      stats.streakDays += 1;
    } else {
      // 中断了连续学习
      progress.streakDays = 1;
      stats.streakDays = 1;
    }
  }

  // 计算积分
  private calculatePoints(
    duration: number,
    type: 'speaking' | 'listening' | 'vocabulary',
    score?: number
  ): number {
    let basePoints = duration * 2; // 基础积分：每分钟2分
    
    // 根据类型调整
    const typeMultiplier = {
      speaking: 1.2,
      listening: 1.1,
      vocabulary: 1.0,
    };
    
    basePoints *= typeMultiplier[type];
    
    // 根据分数调整
    if (score !== undefined) {
      const scoreMultiplier = score / 100;
      basePoints *= scoreMultiplier;
    }
    
    return Math.round(basePoints);
  }

  // 计算用户等级
  private calculateUserLevel(totalPoints: number): number {
    // 每1000分升一级
    return Math.floor(totalPoints / 1000) + 1;
  }

  // 计算技能升级所需经验值
  private calculateMaxExperience(level: number): number {
    return 100 + (level - 1) * 50;
  }

  // 解锁成就
  public async unlockAchievement(achievementId: string): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(this.STORAGE_KEYS.ACHIEVEMENTS);
      const achievements: string[] = stored ? JSON.parse(stored) : [];
      
      if (!achievements.includes(achievementId)) {
        achievements.push(achievementId);
        await AsyncStorage.setItem(
          this.STORAGE_KEYS.ACHIEVEMENTS,
          JSON.stringify(achievements)
        );
        
        // 这里可以触发成就解锁通知
        console.log('Achievement unlocked:', achievementId);
      }
    } catch (error) {
      console.error('Failed to unlock achievement:', error);
    }
  }

  // 检查成就
  private async checkAchievements(stats: LearningStats, _progress: UserProgress): Promise<void> {
    // 学习时长成就
    if (stats.totalStudyTime >= 60) await this.unlockAchievement('study_1_hour');
    if (stats.totalStudyTime >= 600) await this.unlockAchievement('study_10_hours');
    if (stats.totalStudyTime >= 3000) await this.unlockAchievement('study_50_hours');
    
    // 连续学习成就
    if (stats.streakDays >= 7) await this.unlockAchievement('streak_7_days');
    if (stats.streakDays >= 30) await this.unlockAchievement('streak_30_days');
    if (stats.streakDays >= 100) await this.unlockAchievement('streak_100_days');
    
    // 词汇学习成就
    if (stats.wordsLearned >= 100) await this.unlockAchievement('words_100');
    if (stats.wordsLearned >= 500) await this.unlockAchievement('words_500');
    if (stats.wordsLearned >= 1000) await this.unlockAchievement('words_1000');
    
    // 技能分数成就
    if (stats.speakingScore >= 90) await this.unlockAchievement('speaking_master');
    if (stats.listeningScore >= 90) await this.unlockAchievement('listening_master');
    if (stats.vocabularyScore >= 90) await this.unlockAchievement('vocabulary_master');
  }

  // 检查课程完成成就
  private async checkLessonAchievements(lessonsCompleted: number): Promise<void> {
    if (lessonsCompleted >= 1) await this.unlockAchievement('first_lesson');
    if (lessonsCompleted >= 10) await this.unlockAchievement('lessons_10');
    if (lessonsCompleted >= 50) await this.unlockAchievement('lessons_50');
    if (lessonsCompleted >= 100) await this.unlockAchievement('lessons_100');
  }

  // 获取已解锁成就
  public async getUnlockedAchievements(): Promise<string[]> {
    try {
      const stored = await AsyncStorage.getItem(this.STORAGE_KEYS.ACHIEVEMENTS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get achievements:', error);
      return [];
    }
  }

  // 重置进度（用于测试或重新开始）
  public async resetProgress(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(this.STORAGE_KEYS.USER_PROGRESS),
        AsyncStorage.removeItem(this.STORAGE_KEYS.LEARNING_STATS),
        AsyncStorage.removeItem(this.STORAGE_KEYS.DAILY_RECORDS),
        AsyncStorage.removeItem(this.STORAGE_KEYS.ACHIEVEMENTS),
        AsyncStorage.removeItem(this.STORAGE_KEYS.SKILL_PROGRESS),
        AsyncStorage.removeItem(this.STORAGE_KEYS.LESSON_PROGRESS),
      ]);
    } catch (error) {
      console.error('Failed to reset progress:', error);
      throw new Error('重置进度失败');
    }
  }

  // 导出进度数据
  public async exportProgress(): Promise<string> {
    try {
      const [progress, stats, records, achievements, skillProgress] = await Promise.all([
        this.getUserProgress(),
        this.getLearningStats(),
        this.getDailyRecords(365),
        this.getUnlockedAchievements(),
        this.getSkillProgress(),
      ]);
      
      const exportData = {
        progress,
        stats,
        records,
        achievements,
        skillProgress,
        exportDate: new Date().toISOString(),
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Failed to export progress:', error);
      throw new Error('导出进度失败');
    }
  }
}

export default ProgressService;
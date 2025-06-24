import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SpeakingExercise } from '../types';
import { getSpeakingExercises } from '../services/DataService';

const { width } = Dimensions.get('window');

interface Props {
  navigation: any;
}

const SpeakingScreen: React.FC<Props> = ({ navigation }) => {
  const [exercises, setExercises] = useState<SpeakingExercise[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const loadExercises = useCallback(async () => {
    try {
      const data = await getSpeakingExercises(selectedDifficulty);
      setExercises(data);
    } catch (error) {
      console.error('加载口语练习失败:', error);
    }
  }, [selectedDifficulty]);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  const renderDifficultySelector = () => {
    const difficulties = [
      { key: 'easy', label: '初级', color: '#4CAF50' },
      { key: 'medium', label: '中级', color: '#FF9800' },
      { key: 'hard', label: '高级', color: '#F44336' },
    ];

    return (
      <View style={styles.difficultyContainer}>
        <Text style={styles.sectionTitle}>选择难度</Text>
        <View style={styles.difficultyButtons}>
          {difficulties.map((diff) => (
            <TouchableOpacity
              key={diff.key}
              style={[
                styles.difficultyButton,
                {
                  backgroundColor: selectedDifficulty === diff.key ? diff.color : '#F0F0F0',
                },
              ]}
              onPress={() => setSelectedDifficulty(diff.key as any)}
            >
              <Text
                style={[
                  styles.difficultyText,
                  {
                    color: selectedDifficulty === diff.key ? 'white' : '#666',
                  },
                ]}
              >
                {diff.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderExerciseCard = (exercise: SpeakingExercise) => {
    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
        case 'easy': return ['#4CAF50', '#66BB6A'];
        case 'medium': return ['#FF9800', '#FFB74D'];
        case 'hard': return ['#F44336', '#EF5350'];
        default: return ['#2196F3', '#42A5F5'];
      }
    };

    return (
      <TouchableOpacity
        key={exercise.id}
        style={styles.exerciseCard}
        onPress={() => navigation.navigate('PronunciationPractice', { exercise })}
      >
        <LinearGradient
          colors={getDifficultyColor(exercise.difficulty)}
          style={styles.exerciseGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.exerciseHeader}>
            <Icon name="mic" size={24} color="white" />
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyBadgeText}>{exercise.difficulty}</Text>
            </View>
          </View>
          
          <Text style={styles.exerciseText} numberOfLines={3}>
            {exercise.text}
          </Text>
          
          <View style={styles.exerciseFooter}>
            <View style={styles.targetWords}>
              <Icon name="target" size={16} color="rgba(255, 255, 255, 0.8)" />
              <Text style={styles.targetWordsText}>
                重点词汇: {exercise.targetWords.slice(0, 3).join(', ')}
                {exercise.targetWords.length > 3 && '...'}
              </Text>
            </View>
            <Icon name="play-arrow" size={24} color="white" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderQuickPractice = () => {
    const quickOptions = [
      {
        title: '日常对话',
        subtitle: '练习日常交流',
        icon: 'chat',
        color: '#FF6B6B',
        action: () => Alert.alert('功能开发中', '日常对话练习即将上线！'),
      },
      {
        title: '商务英语',
        subtitle: '职场沟通技巧',
        icon: 'business',
        color: '#4ECDC4',
        action: () => Alert.alert('功能开发中', '商务英语练习即将上线！'),
      },
      {
        title: '发音纠正',
        subtitle: 'AI智能纠音',
        icon: 'tune',
        color: '#45B7D1',
        action: () => Alert.alert('功能开发中', '发音纠正功能即将上线！'),
      },
      {
        title: '情景模拟',
        subtitle: '真实场景对话',
        icon: 'theater-comedy',
        color: '#96C93D',
        action: () => Alert.alert('功能开发中', '情景模拟练习即将上线！'),
      },
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>快速练习</Text>
        <View style={styles.quickPracticeGrid}>
          {quickOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickPracticeCard, { backgroundColor: option.color }]}
              onPress={option.action}
            >
              <Icon name={option.icon} size={32} color="white" />
              <Text style={styles.quickPracticeTitle}>{option.title}</Text>
              <Text style={styles.quickPracticeSubtitle}>{option.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 头部统计 */}
      <LinearGradient
        colors={['#FF6B6B', '#FF8E8E']}
        style={styles.headerCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Icon name="mic" size={32} color="white" />
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>口语练习</Text>
              <Text style={styles.headerSubtitle}>提升你的英语口语能力</Text>
            </View>
          </View>
          <View style={styles.headerStats}>
            <Text style={styles.statsNumber}>12</Text>
            <Text style={styles.statsLabel}>已完成</Text>
          </View>
        </View>
      </LinearGradient>

      {/* 快速练习 */}
      {renderQuickPractice()}

      {/* 难度选择 */}
      {renderDifficultySelector()}

      {/* 练习列表 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>练习内容</Text>
        {exercises.map(renderExerciseCard)}
      </View>

      {/* 底部提示 */}
      <View style={styles.tipCard}>
        <Icon name="lightbulb-outline" size={24} color="#FFA726" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>练习小贴士</Text>
          <Text style={styles.tipText}>
            • 找一个安静的环境进行练习\n
            • 大声朗读，不要害怕犯错\n
            • 录制自己的声音进行对比\n
            • 每天坚持练习15-30分钟
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  headerStats: {
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statsLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  quickPracticeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickPracticeCard: {
    width: (width - 48) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  quickPracticeTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  quickPracticeSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  difficultyContainer: {
    margin: 16,
  },
  difficultyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  difficultyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  exerciseCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  exerciseGradient: {
    padding: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  difficultyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  exerciseText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    marginBottom: 16,
  },
  exerciseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  targetWords: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  targetWordsText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  tipCard: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tipContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default SpeakingScreen;
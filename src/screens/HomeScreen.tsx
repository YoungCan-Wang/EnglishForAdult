import React, { useState, useEffect } from 'react';
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
import { Lesson } from '../types';
import { getLessons, getUserProgress } from '../services/DataService';

const { width } = Dimensions.get('window');

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [userLevel, setUserLevel] = useState<string>('beginner');
  const [streak, setStreak] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const lessonsData = await getLessons();
      const progressData = await getUserProgress();
      
      setLessons(lessonsData);
      setStreak(progressData.streak || 0);
      setTotalScore(progressData.totalScore || 0);
    } catch (error) {
      console.error('加载数据失败:', error);
    }
  };

  const renderLessonCard = (lesson: Lesson) => {
    const getTypeIcon = (type: string) => {
      switch (type) {
        case 'speaking': return 'mic';
        case 'listening': return 'headset';
        case 'vocabulary': return 'book';
        default: return 'school';
      }
    };

    const getTypeColor = (type: string) => {
      switch (type) {
        case 'speaking': return ['#FF6B6B', '#FF8E8E'];
        case 'listening': return ['#4ECDC4', '#44A08D'];
        case 'vocabulary': return ['#45B7D1', '#96C93D'];
        default: return ['#6C5CE7', '#A29BFE'];
      }
    };

    return (
      <TouchableOpacity
        key={lesson.id}
        style={styles.lessonCard}
        onPress={() => navigation.navigate('LessonDetail', { lesson })}
      >
        <LinearGradient
          colors={getTypeColor(lesson.type)}
          style={styles.lessonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.lessonHeader}>
            <Icon name={getTypeIcon(lesson.type)} size={24} color="white" />
            <View style={styles.lessonBadge}>
              <Text style={styles.lessonLevel}>{lesson.level}</Text>
            </View>
          </View>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.lessonDescription}>{lesson.description}</Text>
          <View style={styles.lessonFooter}>
            <Text style={styles.lessonDuration}>{lesson.duration} 分钟</Text>
            {lesson.completed && (
              <Icon name="check-circle" size={20} color="white" />
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderQuickActions = () => {
    const actions = [
      { title: '每日挑战', icon: 'flash-on', color: '#FF6B6B', screen: 'SpeakingTab' },
      { title: '发音练习', icon: 'mic', color: '#4ECDC4', screen: 'SpeakingTab' },
      { title: '听力训练', icon: 'headset', color: '#45B7D1', screen: 'ListeningTab' },
      { title: '单词复习', icon: 'book', color: '#96C93D', screen: 'VocabularyTab' },
    ];

    return (
      <View style={styles.quickActions}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionButton, { backgroundColor: action.color }]}
            onPress={() => navigation.navigate(action.screen)}
          >
            <Icon name={action.icon} size={24} color="white" />
            <Text style={styles.actionText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 用户状态卡片 */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.statusCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.statusHeader}>
          <Text style={styles.welcomeText}>欢迎回来！</Text>
          <Text style={styles.levelText}>等级: {userLevel}</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Icon name="local-fire-department" size={24} color="#FFD700" />
            <Text style={styles.statNumber}>{streak}</Text>
            <Text style={styles.statLabel}>连续天数</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="star" size={24} color="#FFD700" />
            <Text style={styles.statNumber}>{totalScore}</Text>
            <Text style={styles.statLabel}>总积分</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="trending-up" size={24} color="#FFD700" />
            <Text style={styles.statNumber}>{lessons.filter(l => l.completed).length}</Text>
            <Text style={styles.statLabel}>已完成</Text>
          </View>
        </View>
      </LinearGradient>

      {/* 快捷操作 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>快速开始</Text>
        {renderQuickActions()}
      </View>

      {/* 推荐课程 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>推荐课程</Text>
        {lessons.slice(0, 4).map(renderLessonCard)}
      </View>

      {/* 今日目标 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>今日目标</Text>
        <View style={styles.goalCard}>
          <Icon name="flag" size={24} color="#007AFF" />
          <Text style={styles.goalText}>完成 2 个口语练习</Text>
          <Text style={styles.goalProgress}>进度: 1/2</Text>
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
  statusCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  levelText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
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
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: (width - 48) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  lessonCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lessonGradient: {
    padding: 16,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lessonBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lessonLevel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  lessonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  goalCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  goalText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  goalProgress: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default HomeScreen;
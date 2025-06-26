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
import { getUserProgress, getLearningStats } from '../services/DataService';

const { width } = Dimensions.get('window');

interface Props {
  navigation: any;
}

const ProfileScreen: React.FC<Props> = ({ navigation: _navigation }) => {
  const [userProgress, setUserProgress] = useState<any>(null);
  const [learningStats, setLearningStats] = useState<any>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const progress = await getUserProgress();
      const stats = await getLearningStats();
      setUserProgress(progress);
      setLearningStats(stats);
    } catch (error) {
      console.error('加载用户数据失败:', error);
    }
  };

  const renderUserInfo = () => {
    return (
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.userCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.userHeader}>
          <View style={styles.avatarContainer}>
            <Icon name="person" size={40} color="white" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>英语学习者</Text>
            <Text style={styles.userLevel}>等级: {userProgress?.level || 'beginner'}</Text>
            <View style={styles.levelProgress}>
              <View style={styles.levelProgressBar}>
                <View style={[styles.levelProgressFill, { width: '65%' }]} />
              </View>
              <Text style={styles.levelProgressText}>65% 到下一级</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.userStats}>
          <View style={styles.statItem}>
            <Icon name="local-fire-department" size={24} color="#FFD700" />
            <Text style={styles.statNumber}>{userProgress?.streak || 0}</Text>
            <Text style={styles.statLabel}>连续天数</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="star" size={24} color="#FFD700" />
            <Text style={styles.statNumber}>{userProgress?.totalScore || 0}</Text>
            <Text style={styles.statLabel}>总积分</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="school" size={24} color="#FFD700" />
            <Text style={styles.statNumber}>{userProgress?.completedLessons || 0}</Text>
            <Text style={styles.statLabel}>已完成</Text>
          </View>
        </View>
      </LinearGradient>
    );
  };

  const renderLearningStats = () => {
    if (!learningStats) return null;

    const stats = [
      {
        title: '学习时长',
        value: `${Math.floor((learningStats.totalStudyTime || 0) / 60)}h ${(learningStats.totalStudyTime || 0) % 60}m`,
        icon: 'access-time',
        color: '#4CAF50',
      },
      {
        title: '掌握单词',
        value: learningStats.wordsLearned || 0,
        icon: 'book',
        color: '#2196F3',
      },
      {
        title: '完成课程',
        value: learningStats.lessonsCompleted || 0,
        icon: 'school',
        color: '#FF9800',
      },
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>学习统计</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Icon name={stat.icon} size={32} color={stat.color} />
              <Text style={styles.statCardValue}>{stat.value}</Text>
              <Text style={styles.statCardTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderSkillProgress = () => {
    if (!learningStats) return null;

    const skills = [
      {
        name: '口语',
        score: learningStats.speakingScore || 0,
        color: '#FF6B6B',
        icon: 'mic',
      },
      {
        name: '听力',
        score: learningStats.listeningScore || 0,
        color: '#4ECDC4',
        icon: 'headset',
      },
      {
        name: '词汇',
        score: learningStats.vocabularyScore || 0,
        color: '#45B7D1',
        icon: 'book',
      },
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>技能进度</Text>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skillItem}>
            <View style={styles.skillHeader}>
              <View style={styles.skillInfo}>
                <Icon name={skill.icon} size={24} color={skill.color} />
                <Text style={styles.skillName}>{skill.name}</Text>
              </View>
              <Text style={styles.skillScore}>{skill.score}%</Text>
            </View>
            <View style={styles.skillProgressBar}>
              <View 
                style={[
                  styles.skillProgressFill, 
                  { width: `${skill.score}%`, backgroundColor: skill.color }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderMenuItems = () => {
    const menuItems = [
      {
        title: '学习设置',
        subtitle: '调整学习偏好和目标',
        icon: 'settings',
        action: () => Alert.alert('功能开发中', '学习设置即将上线！'),
      },
      {
        title: '成就徽章',
        subtitle: '查看你的学习成就',
        icon: 'emoji-events',
        action: () => Alert.alert('功能开发中', '成就系统即将上线！'),
      },
      {
        title: '学习报告',
        subtitle: '详细的学习分析报告',
        icon: 'assessment',
        action: () => Alert.alert('功能开发中', '学习报告即将上线！'),
      },
      {
        title: '好友排行',
        subtitle: '与好友比较学习进度',
        icon: 'leaderboard',
        action: () => Alert.alert('功能开发中', '好友功能即将上线！'),
      },
      {
        title: '帮助反馈',
        subtitle: '获取帮助或提供反馈',
        icon: 'help',
        action: () => Alert.alert('帮助反馈', '如有问题请联系我们！'),
      },
      {
        title: '关于应用',
        subtitle: '版本信息和开发团队',
        icon: 'info',
        action: () => Alert.alert('关于应用', 'EnglishForAdult v1.0.0\n\n专为成人英语学习设计的应用'),
      },
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>更多功能</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.action}>
            <View style={styles.menuItemLeft}>
              <Icon name={item.icon} size={24} color="#666" />
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color="#CCC" />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 用户信息卡片 */}
      {renderUserInfo()}

      {/* 学习统计 */}
      {renderLearningStats()}

      {/* 技能进度 */}
      {renderSkillProgress()}

      {/* 菜单项 */}
      {renderMenuItems()}

      {/* 底部间距 */}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  userCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  levelProgress: {
    width: '100%',
  },
  levelProgressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 4,
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  levelProgressText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userStats: {
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: (width - 48) / 3 - 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statCardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statCardTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  skillItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  skillScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  skillProgressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  skillProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    marginLeft: 12,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default ProfileScreen;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { VocabularyWord } from '../types';
import { getVocabulary } from '../services/DataService';

const { width } = Dimensions.get('window');

interface Props {
  navigation: any;
}

const VocabularyScreen: React.FC<Props> = ({ navigation }) => {
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');
  const [filteredWords, setFilteredWords] = useState<VocabularyWord[]>([]);

  useEffect(() => {
    loadVocabulary();
  }, [selectedCategory]);

  useEffect(() => {
    filterWords();
  }, [words, searchText]);

  const loadVocabulary = async () => {
    try {
      const data = await getVocabulary(selectedCategory === 'all' ? undefined : selectedCategory);
      setWords(data);
    } catch (error) {
      console.error('加载词汇失败:', error);
    }
  };

  const filterWords = () => {
    if (!searchText) {
      setFilteredWords(words);
      return;
    }
    
    const filtered = words.filter(word => 
      word.word.toLowerCase().includes(searchText.toLowerCase()) ||
      word.meaning.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredWords(filtered);
  };

  const renderCategorySelector = () => {
    const categories = [
      { key: 'all', label: '全部', color: '#6C5CE7' },
      { key: 'general', label: '常用', color: '#4CAF50' },
      { key: 'business', label: '商务', color: '#FF9800' },
      { key: 'food', label: '食物', color: '#F44336' },
      { key: 'travel', label: '旅行', color: '#2196F3' },
    ];

    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.sectionTitle}>词汇分类</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryButtons}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: selectedCategory === category.key ? category.color : '#F0F0F0',
                  },
                ]}
                onPress={() => setSelectedCategory(category.key)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: selectedCategory === category.key ? 'white' : '#666',
                    },
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索单词或释义..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
          {searchText ? (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Icon name="clear" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  const renderWordCard = (word: VocabularyWord) => {
    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
        case 'easy': return ['#4CAF50', '#66BB6A'];
        case 'medium': return ['#FF9800', '#FFB74D'];
        case 'hard': return ['#F44336', '#EF5350'];
        default: return ['#2196F3', '#42A5F5'];
      }
    };

    const playAudio = () => {
      Alert.alert('播放发音', `正在播放 "${word.word}" 的发音`);
    };

    return (
      <TouchableOpacity
        key={word.id}
        style={styles.wordCard}
        onPress={() => Alert.alert('单词详情', `${word.word}\n\n${word.meaning}\n\n例句: ${word.example}`)}
      >
        <LinearGradient
          colors={getDifficultyColor(word.difficulty)}
          style={styles.wordGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.wordHeader}>
            <View style={styles.wordInfo}>
              <Text style={styles.wordText}>{word.word}</Text>
              <Text style={styles.pronunciationText}>{word.pronunciation}</Text>
            </View>
            <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
              <Icon name="volume-up" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.meaningText}>{word.meaning}</Text>
          
          <View style={styles.wordFooter}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{word.category}</Text>
            </View>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyBadgeText}>{word.difficulty}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderQuickActions = () => {
    const actions = [
      {
        title: '单词测试',
        subtitle: '测试你的词汇量',
        icon: 'quiz',
        color: '#FF6B6B',
        action: () => Alert.alert('功能开发中', '单词测试即将上线！'),
      },
      {
        title: '记忆卡片',
        subtitle: '翻卡记单词',
        icon: 'style',
        color: '#4ECDC4',
        action: () => Alert.alert('功能开发中', '记忆卡片即将上线！'),
      },
      {
        title: '词根词缀',
        subtitle: '系统学习构词法',
        icon: 'account-tree',
        color: '#45B7D1',
        action: () => Alert.alert('功能开发中', '词根词缀学习即将上线！'),
      },
      {
        title: '复习计划',
        subtitle: '智能复习提醒',
        icon: 'schedule',
        color: '#96C93D',
        action: () => Alert.alert('功能开发中', '复习计划即将上线！'),
      },
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>学习工具</Text>
        <View style={styles.quickActionsGrid}>
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickActionCard, { backgroundColor: action.color }]}
              onPress={action.action}
            >
              <Icon name={action.icon} size={32} color="white" />
              <Text style={styles.quickActionTitle}>{action.title}</Text>
              <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
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
        colors={['#45B7D1', '#96C93D']}
        style={styles.headerCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Icon name="book" size={32} color="white" />
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>词汇学习</Text>
              <Text style={styles.headerSubtitle}>扩展你的英语词汇量</Text>
            </View>
          </View>
          <View style={styles.headerStats}>
            <Text style={styles.statsNumber}>156</Text>
            <Text style={styles.statsLabel}>已学单词</Text>
          </View>
        </View>
      </LinearGradient>

      {/* 学习工具 */}
      {renderQuickActions()}

      {/* 搜索栏 */}
      {renderSearchBar()}

      {/* 分类选择 */}
      {renderCategorySelector()}

      {/* 单词列表 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          词汇列表 ({filteredWords.length})
        </Text>
        {filteredWords.map(renderWordCard)}
      </View>

      {/* 学习进度 */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>今日学习进度</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
        <Text style={styles.progressText}>6/10 个单词</Text>
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
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 48) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  quickActionSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  searchContainer: {
    margin: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  categoryContainer: {
    margin: 16,
  },
  categoryButtons: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  wordCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  wordGradient: {
    padding: 16,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  wordInfo: {
    flex: 1,
  },
  wordText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  pronunciationText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  audioButton: {
    padding: 8,
  },
  meaningText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 12,
  },
  wordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
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
  progressCard: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default VocabularyScreen;
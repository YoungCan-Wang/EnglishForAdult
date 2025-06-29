import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import { SpeakingExercise } from '../types';

interface Props {
  navigation: any;
  route: any;
}

const PronunciationPracticeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { exercise }: { exercise: SpeakingExercise } = route.params;
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [completedWords, setCompletedWords] = useState<boolean[]>([]);
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    setCompletedWords(new Array(exercise.targetWords.length).fill(false));
  }, [exercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // 开始脉冲动画
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, pulseAnim]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    // 这里应该实现真实的录音功能
    Alert.alert('开始录音', '请大声朗读显示的文本');
  };

  const stopRecording = () => {
    setIsRecording(false);
    // 模拟录音分析
    setTimeout(() => {
      const newCompleted = [...completedWords];
      newCompleted[currentWordIndex] = true;
      setCompletedWords(newCompleted);
      
      Alert.alert(
        '录音完成',
        '发音分析中...',
        [
          {
            text: '查看结果',
            onPress: () => showPronunciationResult(),
          },
        ]
      );
    }, 1000);
  };

  const showPronunciationResult = () => {
    const accuracy = Math.floor(Math.random() * 20) + 80; // 模拟80-100%的准确率
    Alert.alert(
      '发音评估',
      `准确率: ${accuracy}%\n\n${accuracy >= 90 ? '优秀！' : accuracy >= 80 ? '良好！' : '需要改进'}`,
      [
        {
          text: '继续练习',
          onPress: () => {
            if (currentWordIndex < exercise.targetWords.length - 1) {
              setCurrentWordIndex(currentWordIndex + 1);
            } else {
              completePractice();
            }
          },
        },
        {
          text: '重新录音',
          style: 'cancel',
        },
      ]
    );
  };

  const completePractice = () => {
    Alert.alert(
      '练习完成！',
      '恭喜你完成了所有发音练习！',
      [
        {
          text: '返回',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const playOriginalAudio = () => {
    setIsPlaying(true);
    Alert.alert('播放原音', '正在播放标准发音...');
    // 这里应该实现音频播放功能
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderTargetWords = () => {
    return (
      <View style={styles.targetWordsContainer}>
        <Text style={styles.targetWordsTitle}>重点词汇</Text>
        <View style={styles.wordsGrid}>
          {exercise.targetWords.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.wordChip,
                {
                  backgroundColor: index === currentWordIndex ? '#007AFF' : 
                                 completedWords[index] ? '#4CAF50' : '#F0F0F0',
                },
              ]}
              onPress={() => setCurrentWordIndex(index)}
            >
              <Text
                style={[
                  styles.wordChipText,
                  {
                    color: index === currentWordIndex || completedWords[index] ? 'white' : '#333',
                  },
                ]}
              >
                {word}
              </Text>
              {completedWords[index] && (
                <CustomIcon name="check" size={16} color="white" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return ['#4CAF50', '#66BB6A'];
      case 'medium': return ['#FF9800', '#FFB74D'];
      case 'hard': return ['#F44336', '#EF5350'];
      default: return ['#2196F3', '#42A5F5'];
    }
  };

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <LinearGradient
        colors={getDifficultyColor(exercise.difficulty)}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <CustomIcon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>发音练习</Text>
        <Text style={styles.headerSubtitle}>跟读并录音</Text>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentWordIndex + 1} / {exercise.targetWords.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentWordIndex + 1) / exercise.targetWords.length) * 100}%` }
              ]} 
            />
          </View>
        </View>
      </LinearGradient>

      {/* 练习文本 */}
      <View style={styles.textContainer}>
        <Text style={styles.practiceText}>{exercise.text}</Text>
        
        {/* 当前重点词汇 */}
        <View style={styles.currentWordContainer}>
          <Text style={styles.currentWordLabel}>当前练习词汇:</Text>
          <Text style={styles.currentWord}>{exercise.targetWords[currentWordIndex]}</Text>
        </View>
      </View>

      {/* 控制按钮 */}
      <View style={styles.controlsContainer}>
        {/* 播放原音按钮 */}
        <TouchableOpacity
          style={[styles.controlButton, styles.playButton]}
          onPress={playOriginalAudio}
          disabled={isPlaying}
        >
          <CustomIcon name={isPlaying ? "pause" : "play-arrow"} size={24} color="white" />
          <Text style={styles.controlButtonText}>
            {isPlaying ? '播放中...' : '听原音'}
          </Text>
        </TouchableOpacity>

        {/* 录音按钮 */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={[
              styles.recordButton,
              { backgroundColor: isRecording ? '#F44336' : '#FF6B6B' },
            ]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <CustomIcon name={isRecording ? "stop" : "mic"} size={32} color="white" />
          </TouchableOpacity>
        </Animated.View>

        {/* 录音时间 */}
        {isRecording && (
          <Text style={styles.recordingTime}>{formatTime(recordingTime)}</Text>
        )}
      </View>

      {/* 重点词汇 */}
      {renderTargetWords()}

      {/* 提示 */}
      <View style={styles.tipsContainer}>
        <CustomIcon name="lightbulb-outline" size={20} color="#FFA726" />
        <Text style={styles.tipsText}>
          点击"听原音"按钮听标准发音，然后点击录音按钮开始练习
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 20,
  },
  progressText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  textContainer: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  practiceText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 16,
  },
  currentWordContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  currentWordLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  currentWord: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  controlsContainer: {
    alignItems: 'center',
    padding: 20,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 16,
  },
  playButton: {
    backgroundColor: '#4ECDC4',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  recordingTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
    marginTop: 12,
  },
  targetWordsContainer: {
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
  targetWordsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  wordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  wordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
  },
  wordChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: 4,
  },
  tipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  tipsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    lineHeight: 20,
  },
});

export default PronunciationPracticeScreen;
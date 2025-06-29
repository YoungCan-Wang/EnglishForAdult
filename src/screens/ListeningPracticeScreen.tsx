import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import { ListeningExercise } from '../types';

interface Props {
  navigation: any;
  route: any;
}

const ListeningPracticeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { exercise }: { exercise: ListeningExercise } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setSelectedAnswers(new Array(exercise.questions.length).fill(''));
  }, [exercise]);

  const currentQuestion = exercise.questions[currentQuestionIndex];

  const playAudio = () => {
    setIsPlaying(true);
    setPlayCount(prev => prev + 1);
    Alert.alert('播放音频', '正在播放听力材料...');
    // 这里应该实现真实的音频播放功能
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const selectAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < exercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeExercise();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const completeExercise = () => {
    // 计算得分
    let correctCount = 0;
    exercise.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const finalScore = Math.round((correctCount / exercise.questions.length) * 100);
    setScore(finalScore);
    setIsCompleted(true);
    setShowResults(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return ['#4CAF50', '#66BB6A'];
      case 'medium': return ['#FF9800', '#FFB74D'];
      case 'hard': return ['#F44336', '#EF5350'];
      default: return ['#2196F3', '#42A5F5'];
    }
  };

  const renderQuestion = () => {
    return (
      <View style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>
            问题 {currentQuestionIndex + 1} / {exercise.questions.length}
          </Text>
          <TouchableOpacity
            style={styles.transcriptButton}
            onPress={() => setShowTranscript(true)}
          >
            <CustomIcon name="subtitles" size={20} color="#007AFF" />
            <Text style={styles.transcriptButtonText}>查看原文</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestionIndex] === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            const showCorrect = isCompleted && isCorrect;
            const showWrong = isCompleted && isSelected && !isCorrect;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  isSelected && !isCompleted && styles.selectedOption,
                  showCorrect && styles.correctOption,
                  showWrong && styles.wrongOption,
                ]}
                onPress={() => !isCompleted && selectAnswer(option)}
                disabled={isCompleted}
              >
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionLabel,
                    { color: String.fromCharCode(65 + index) }
                  ]}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                  <Text style={[
                    styles.optionText,
                    (isSelected && !isCompleted) && styles.selectedOptionText,
                    showCorrect && styles.correctOptionText,
                    showWrong && styles.wrongOptionText,
                  ]}>
                    {option}
                  </Text>
                  {showCorrect && (
                    <CustomIcon name="check-circle" size={20} color="#4CAF50" />
                  )}
                  {showWrong && (
                    <CustomIcon name="cancel" size={20} color="#F44336" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderAudioControls = () => {
    return (
      <View style={styles.audioControlsContainer}>
        <TouchableOpacity
          style={[
            styles.playButton,
            { backgroundColor: isPlaying ? '#FF6B6B' : '#4ECDC4' }
          ]}
          onPress={playAudio}
          disabled={isPlaying}
        >
          <CustomIcon name={isPlaying ? "pause" : "play-arrow"} size={32} color="white" />
        </TouchableOpacity>
        
        <View style={styles.audioInfo}>
          <Text style={styles.audioTitle}>{exercise.title}</Text>
          <Text style={styles.playCountText}>已播放 {playCount} 次</Text>
        </View>
        
        <TouchableOpacity
          style={styles.speedButton}
          onPress={() => Alert.alert('播放速度', '功能开发中...')}
        >
          <CustomIcon name="speed" size={20} color="#666" />
          <Text style={styles.speedButtonText}>1.0x</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderNavigationButtons = () => {
    return (
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentQuestionIndex === 0 && styles.disabledButton
          ]}
          onPress={previousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <CustomIcon name="arrow-back" size={20} color={currentQuestionIndex === 0 ? '#CCC' : '#007AFF'} />
          <Text style={[
            styles.navButtonText,
            currentQuestionIndex === 0 && styles.disabledButtonText
          ]}>上一题</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            !selectedAnswers[currentQuestionIndex] && styles.disabledButton
          ]}
          onPress={nextQuestion}
          disabled={!selectedAnswers[currentQuestionIndex]}
        >
          <Text style={[
            styles.navButtonText,
            styles.nextButtonText,
            !selectedAnswers[currentQuestionIndex] && styles.disabledButtonText
          ]}>
            {currentQuestionIndex === exercise.questions.length - 1 ? '完成' : '下一题'}
          </Text>
          <CustomIcon 
            name={currentQuestionIndex === exercise.questions.length - 1 ? "check" : "arrow-forward"} 
            size={20} 
            color={!selectedAnswers[currentQuestionIndex] ? '#CCC' : 'white'} 
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTranscriptModal = () => {
    return (
      <Modal
        visible={showTranscript}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>听力原文</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowTranscript(false)}
            >
              <CustomIcon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.transcriptContent}>
            <Text style={styles.transcriptText}>{exercise.transcript}</Text>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.playAgainButton}
              onPress={() => {
                setShowTranscript(false);
                setTimeout(() => playAudio(), 300);
              }}
            >
              <CustomIcon name="replay" size={20} color="white" />
              <Text style={styles.playAgainButtonText}>重新播放</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderResultsModal = () => {
    return (
      <Modal
        visible={showResults}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.resultsOverlay}>
          <View style={styles.resultsContainer}>
            <LinearGradient
              colors={score >= 80 ? ['#4CAF50', '#66BB6A'] : score >= 60 ? ['#FF9800', '#FFB74D'] : ['#F44336', '#EF5350']}
              style={styles.resultsHeader}
            >
              <CustomIcon 
                name={score >= 80 ? "emoji-events" : score >= 60 ? "thumb-up" : "refresh"} 
                size={48} 
                color="white" 
              />
              <Text style={styles.resultsTitle}>
                {score >= 80 ? '优秀！' : score >= 60 ? '良好！' : '继续努力！'}
              </Text>
              <Text style={styles.scoreText}>{score}分</Text>
            </LinearGradient>
            
            <View style={styles.resultsContent}>
              <Text style={styles.resultsDescription}>
                你答对了 {exercise.questions.filter((q, i) => selectedAnswers[i] === q.correctAnswer).length} / {exercise.questions.length} 道题
              </Text>
              
              <View style={styles.resultsActions}>
                <TouchableOpacity
                  style={styles.reviewButton}
                  onPress={() => {
                    setShowResults(false);
                    setCurrentQuestionIndex(0);
                  }}
                >
                  <Text style={styles.reviewButtonText}>查看解析</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.continueButtonText}>继续学习</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
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
        
        <Text style={styles.headerTitle}>听力练习</Text>
        <Text style={styles.headerSubtitle}>{exercise.title}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestionIndex + 1) / exercise.questions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* 音频控制 */}
        {renderAudioControls()}
        
        {/* 问题 */}
        {renderQuestion()}
        
        {/* 导航按钮 */}
        {renderNavigationButtons()}
        
        {/* 提示 */}
        <View style={styles.tipsContainer}>
          <CustomIcon name="lightbulb-outline" size={20} color="#FFA726" />
          <Text style={styles.tipsText}>
            建议先听2-3遍音频，理解大意后再作答。可以查看原文帮助理解。
          </Text>
        </View>
      </ScrollView>

      {/* 原文模态框 */}
      {renderTranscriptModal()}
      
      {/* 结果模态框 */}
      {renderResultsModal()}
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
  content: {
    flex: 1,
  },
  audioControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  audioInfo: {
    flex: 1,
    marginLeft: 16,
  },
  audioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  playCountText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  speedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
  },
  speedButtonText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  questionContainer: {
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
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  transcriptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F0F8FF',
  },
  transcriptButtonText: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 4,
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 26,
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#F1F8E9',
  },
  wrongOption: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  correctOptionText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  wrongOptionText: {
    color: '#F44336',
    fontWeight: '600',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  disabledButton: {
    borderColor: '#CCC',
    backgroundColor: 'transparent',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginHorizontal: 8,
  },
  nextButtonText: {
    color: 'white',
  },
  disabledButtonText: {
    color: '#CCC',
  },
  tipsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  // 模态框样式
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  transcriptContent: {
    flex: 1,
    padding: 20,
  },
  transcriptText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  playAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ECDC4',
    paddingVertical: 12,
    borderRadius: 25,
  },
  playAgainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  // 结果模态框样式
  resultsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  resultsHeader: {
    alignItems: 'center',
    padding: 30,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  resultsContent: {
    padding: 20,
  },
  resultsDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  resultsActions: {
    flexDirection: 'row',
    gap: 12,
  },
  reviewButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
  },
  reviewButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ListeningPracticeScreen;
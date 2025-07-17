import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Lesson, Exercise } from '../types';
import { DataService } from '../services/DataService';
import AudioService from '../services/AudioService';

interface Props {
  route: {
    params: {
      lessonId: string;
    };
  };
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
}

const ExerciseDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { lessonId } = route.params;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [speechResult, setSpeechResult] = useState<string | null>(null);
  const audioService = AudioService.getInstance();

  useEffect(() => {
    loadLesson();
    setupAudioListeners();
    
    return () => {
      audioService.cleanup();
    };
  }, []);

  const loadLesson = async () => {
    try {
      const lessonData = await DataService.getLessonById(lessonId);
      setLesson(lessonData);
    } catch (error) {
      console.error('加载课程失败:', error);
      Alert.alert('错误', '加载课程失败');
    } finally {
      setIsLoading(false);
    }
  };

  const setupAudioListeners = () => {
    audioService.addSpeechResultListener((results: string[]) => {
      if (results.length > 0) {
        setSpeechResult(results[0]);
        setIsRecording(false);
      }
    });

    audioService.addRecordingListener((state) => {
      setIsRecording(state.isRecording);
    });
  };

  const currentExercise = lesson?.content.exercises[currentExerciseIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!currentExercise || !selectedAnswer) {
      Alert.alert('提示', '请选择一个答案');
      return;
    }

    const isCorrect = selectedAnswer === currentExercise.correctAnswer;
    if (isCorrect) {
      setScore(score + currentExercise.points);
    }

    setShowResult(true);
    
    setTimeout(() => {
      handleNextExercise();
    }, 2000);
  };

  const handleNextExercise = () => {
    if (!lesson) return;

    if (currentExerciseIndex < lesson.content.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setSpeechResult(null);
    } else {
      // 练习完成
      Alert.alert(
        '练习完成！',
        `您的得分: ${score}/${lesson.content.exercises.reduce((total, ex) => total + ex.points, 0)}`,
        [
          {
            text: '返回',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  const handlePlayAudio = async () => {
    if (currentExercise?.audioUrl) {
      try {
        await audioService.loadAudio(currentExercise.audioUrl);
        await audioService.playAudio();
      } catch (error) {
        console.error('播放音频失败:', error);
        Alert.alert('错误', '播放音频失败');
      }
    }
  };

  const handleStartRecording = async () => {
    try {
      await audioService.startRecording();
    } catch (error) {
      console.error('开始录音失败:', error);
      Alert.alert('错误', '开始录音失败');
    }
  };

  const handleStopRecording = async () => {
    try {
      await audioService.stopRecording();
    } catch (error) {
      console.error('停止录音失败:', error);
      Alert.alert('错误', '停止录音失败');
    }
  };

  const renderExerciseContent = () => {
    if (!currentExercise) return null;

    switch (currentExercise.type) {
      case 'pronunciation':
        return (
          <View style={styles.exerciseContent}>
            <Text style={styles.questionText}>{currentExercise.question}</Text>
            
            {currentExercise.audioUrl && (
              <TouchableOpacity style={styles.audioButton} onPress={handlePlayAudio}>
                <Icon name="play-arrow" size={24} color="#fff" />
                <Text style={styles.audioButtonText}>播放示例</Text>
              </TouchableOpacity>
            )}

            <View style={styles.recordingSection}>
              <TouchableOpacity
                style={[styles.recordButton, isRecording && styles.recordingButton]}
                onPress={isRecording ? handleStopRecording : handleStartRecording}
              >
                <Icon name={isRecording ? 'stop' : 'mic'} size={32} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.recordingText}>
                {isRecording ? '录音中...' : '点击开始录音'}
              </Text>
            </View>

            {speechResult && (
              <View style={styles.resultSection}>
                <Text style={styles.resultLabel}>识别结果:</Text>
                <Text style={styles.resultText}>{speechResult}</Text>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAnswer}>
                  <Text style={styles.submitButtonText}>提交答案</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );

      case 'listening':
      case 'vocabulary':
        return (
          <View style={styles.exerciseContent}>
            <Text style={styles.questionText}>{currentExercise.question}</Text>
            
            {currentExercise.audioUrl && (
              <TouchableOpacity style={styles.audioButton} onPress={handlePlayAudio}>
                <Icon name="play-arrow" size={24} color="#fff" />
                <Text style={styles.audioButtonText}>播放音频</Text>
              </TouchableOpacity>
            )}

            {currentExercise.options && (
              <View style={styles.optionsContainer}>
                {currentExercise.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedAnswer === option && styles.selectedOption,
                      showResult && option === currentExercise.correctAnswer && styles.correctOption,
                      showResult && selectedAnswer === option && option !== currentExercise.correctAnswer && styles.wrongOption,
                    ]}
                    onPress={() => !showResult && handleAnswerSelect(option)}
                    disabled={showResult}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedAnswer === option && styles.selectedOptionText,
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedAnswer && !showResult && (
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAnswer}>
                <Text style={styles.submitButtonText}>提交答案</Text>
              </TouchableOpacity>
            )}
          </View>
        );

      default:
        return (
          <View style={styles.exerciseContent}>
            <Text style={styles.questionText}>{currentExercise.question}</Text>
          </View>
        );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>课程未找到</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>返回</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{lesson.title}</Text>
        <Text style={styles.progressText}>
          {currentExerciseIndex + 1}/{lesson.content.exercises.length}
        </Text>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>得分: {score}</Text>
      </View>

      <ScrollView style={styles.content}>
        {renderExerciseContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  scoreContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  exerciseContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  audioButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  recordingSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  recordingButton: {
    backgroundColor: '#FF3B30',
  },
  recordingText: {
    fontSize: 16,
    color: '#666',
  },
  resultSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 15,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderColor: '#007AFF',
  },
  correctOption: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExerciseDetailScreen;
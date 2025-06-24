import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Lesson } from '../types';
import { markLessonCompleted } from '../services/DataService';

interface Props {
  navigation: any;
  route: any;
}

const LessonDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { lesson }: { lesson: Lesson } = route.params;
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentExercise] = answer;
    setUserAnswers(newAnswers);

    // 检查答案
    const exercise = lesson.content.exercises[currentExercise];
    if (answer === exercise.correctAnswer) {
      setScore(score + exercise.points);
    }

    // 移动到下一个练习
    if (currentExercise < lesson.content.exercises.length - 1) {
      setTimeout(() => {
        setCurrentExercise(currentExercise + 1);
      }, 1000);
    } else {
      // 完成课程
      setTimeout(() => {
        completeLesson();
      }, 1000);
    }
  };

  const completeLesson = async () => {
    try {
      await markLessonCompleted(lesson.id, score);
      setIsCompleted(true);
      Alert.alert(
        '课程完成！',
        `恭喜你完成了课程！\n\n得分: ${score}/${lesson.content.exercises.reduce((total, ex) => total + ex.points, 0)}`,
        [
          {
            text: '返回',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('完成课程失败:', error);
    }
  };

  const renderExercise = () => {
    if (isCompleted) {
      return (
        <View style={styles.completedContainer}>
          <Icon name="check-circle" size={64} color="#4CAF50" />
          <Text style={styles.completedTitle}>课程完成！</Text>
          <Text style={styles.completedScore}>得分: {score}</Text>
        </View>
      );
    }

    const exercise = lesson.content.exercises[currentExercise];
    if (!exercise) return null;

    return (
      <View style={styles.exerciseContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentExercise + 1) / lesson.content.exercises.length) * 100}%` }
            ]} 
          />
        </View>
        
        <Text style={styles.exerciseNumber}>
          {currentExercise + 1} / {lesson.content.exercises.length}
        </Text>
        
        <Text style={styles.exerciseQuestion}>{exercise.question}</Text>
        
        {exercise.options ? (
          <View style={styles.optionsContainer}>
            {exercise.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.recordButton}
            onPress={() => {
              Alert.alert('录音功能', '请开始录音练习发音');
              // 这里应该实现录音功能
              setTimeout(() => {
                handleAnswer(exercise.correctAnswer);
              }, 2000);
            }}
          >
            <Icon name="mic" size={32} color="white" />
            <Text style={styles.recordButtonText}>开始录音</Text>
          </TouchableOpacity>
        )}
        
        <Text style={styles.pointsText}>本题 {exercise.points} 分</Text>
      </View>
    );
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 课程头部 */}
      <LinearGradient
        colors={getTypeColor(lesson.type)}
        style={styles.headerCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.lessonDescription}>{lesson.description}</Text>
          
          <View style={styles.lessonMeta}>
            <View style={styles.metaItem}>
              <Icon name="access-time" size={16} color="rgba(255, 255, 255, 0.8)" />
              <Text style={styles.metaText}>{lesson.duration} 分钟</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="signal-cellular-alt" size={16} color="rgba(255, 255, 255, 0.8)" />
              <Text style={styles.metaText}>{lesson.level}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* 课程说明 */}
      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>课程说明</Text>
        <Text style={styles.instructionsText}>{lesson.content.instructions}</Text>
      </View>

      {/* 练习内容 */}
      {renderExercise()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerCard: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  headerContent: {
    marginTop: 20,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  lessonDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    lineHeight: 22,
  },
  lessonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginLeft: 4,
  },
  instructionsCard: {
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
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  exerciseContainer: {
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
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  exerciseNumber: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  exerciseQuestion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  recordButton: {
    backgroundColor: '#FF6B6B',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  recordButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  pointsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  completedContainer: {
    backgroundColor: 'white',
    margin: 16,
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  completedScore: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default LessonDetailScreen;
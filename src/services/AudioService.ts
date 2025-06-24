import { Alert } from 'react-native';

// 音频播放状态
export interface AudioState {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  isLoaded: boolean;
}

// 录音状态
export interface RecordingState {
  isRecording: boolean;
  duration: number;
  audioPath?: string;
}

class AudioService {
  private static instance: AudioService;
  private currentAudio: any = null;
  private recorder: any = null;
  private audioState: AudioState = {
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    isLoaded: false,
  };
  private recordingState: RecordingState = {
    isRecording: false,
    duration: 0,
  };
  private listeners: Array<(state: AudioState) => void> = [];
  private recordingListeners: Array<(state: RecordingState) => void> = [];

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  // 音频播放相关方法
  public async loadAudio(audioPath: string): Promise<boolean> {
    try {
      // 这里应该使用 react-native-sound 或其他音频库
      // 目前使用模拟实现
      console.log('Loading audio:', audioPath);
      
      this.audioState = {
        ...this.audioState,
        isLoaded: true,
        duration: 30, // 模拟30秒音频
        currentTime: 0,
      };
      
      this.notifyAudioListeners();
      return true;
    } catch (error) {
      console.error('Failed to load audio:', error);
      Alert.alert('错误', '音频加载失败');
      return false;
    }
  }

  public async playAudio(): Promise<boolean> {
    try {
      if (!this.audioState.isLoaded) {
        Alert.alert('提示', '请先加载音频文件');
        return false;
      }

      // 模拟播放
      this.audioState.isPlaying = true;
      this.notifyAudioListeners();
      
      // 模拟播放进度
      const playInterval = setInterval(() => {
        if (this.audioState.isPlaying) {
          this.audioState.currentTime += 1;
          if (this.audioState.currentTime >= this.audioState.duration) {
            this.audioState.isPlaying = false;
            this.audioState.currentTime = this.audioState.duration;
            clearInterval(playInterval);
          }
          this.notifyAudioListeners();
        } else {
          clearInterval(playInterval);
        }
      }, 1000);

      return true;
    } catch (error) {
      console.error('Failed to play audio:', error);
      Alert.alert('错误', '音频播放失败');
      return false;
    }
  }

  public pauseAudio(): void {
    this.audioState.isPlaying = false;
    this.notifyAudioListeners();
  }

  public stopAudio(): void {
    this.audioState.isPlaying = false;
    this.audioState.currentTime = 0;
    this.notifyAudioListeners();
  }

  public seekTo(time: number): void {
    if (time >= 0 && time <= this.audioState.duration) {
      this.audioState.currentTime = time;
      this.notifyAudioListeners();
    }
  }

  public setPlaybackSpeed(speed: number): void {
    // 实现播放速度控制
    console.log('Setting playback speed to:', speed);
  }

  // 录音相关方法
  public async startRecording(): Promise<boolean> {
    try {
      // 这里应该使用 @react-native-voice/voice 或其他录音库
      // 目前使用模拟实现
      console.log('Starting recording...');
      
      this.recordingState = {
        isRecording: true,
        duration: 0,
        audioPath: undefined,
      };
      
      this.notifyRecordingListeners();
      
      // 模拟录音计时
      const recordInterval = setInterval(() => {
        if (this.recordingState.isRecording) {
          this.recordingState.duration += 1;
          this.notifyRecordingListeners();
        } else {
          clearInterval(recordInterval);
        }
      }, 1000);

      return true;
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('错误', '录音启动失败');
      return false;
    }
  }

  public async stopRecording(): Promise<string | null> {
    try {
      this.recordingState.isRecording = false;
      
      // 模拟生成录音文件路径
      const audioPath = `recording_${Date.now()}.m4a`;
      this.recordingState.audioPath = audioPath;
      
      this.notifyRecordingListeners();
      
      console.log('Recording stopped, saved to:', audioPath);
      return audioPath;
    } catch (error) {
      console.error('Failed to stop recording:', error);
      Alert.alert('错误', '录音停止失败');
      return null;
    }
  }

  public cancelRecording(): void {
    this.recordingState = {
      isRecording: false,
      duration: 0,
    };
    this.notifyRecordingListeners();
  }

  // 语音识别相关方法
  public async startSpeechRecognition(language: string = 'en-US'): Promise<boolean> {
    try {
      // 这里应该使用 @react-native-voice/voice
      console.log('Starting speech recognition for language:', language);
      
      // 模拟语音识别
      setTimeout(() => {
        this.onSpeechResults(['Hello world', 'Hello word']);
      }, 3000);
      
      return true;
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      Alert.alert('错误', '语音识别启动失败');
      return false;
    }
  }

  public stopSpeechRecognition(): void {
    console.log('Stopping speech recognition...');
  }

  private onSpeechResults(results: string[]): void {
    console.log('Speech recognition results:', results);
    // 这里可以添加回调来处理识别结果
  }

  // 发音评估相关方法
  public async evaluatePronunciation(
    targetText: string,
    audioPath: string
  ): Promise<{
    score: number;
    feedback: string;
    wordScores: Array<{ word: string; score: number }>;
  }> {
    try {
      // 模拟发音评估
      console.log('Evaluating pronunciation for:', targetText);
      
      // 模拟评估结果
      const words = targetText.split(' ');
      const wordScores = words.map(word => ({
        word,
        score: Math.floor(Math.random() * 20) + 80, // 80-100分
      }));
      
      const averageScore = wordScores.reduce((sum, item) => sum + item.score, 0) / wordScores.length;
      
      let feedback = '';
      if (averageScore >= 90) {
        feedback = '发音非常标准！继续保持！';
      } else if (averageScore >= 80) {
        feedback = '发音不错，还有提升空间。';
      } else if (averageScore >= 70) {
        feedback = '发音需要改进，建议多练习。';
      } else {
        feedback = '发音需要大幅改进，建议跟读标准音频。';
      }
      
      return {
        score: Math.round(averageScore),
        feedback,
        wordScores,
      };
    } catch (error) {
      console.error('Failed to evaluate pronunciation:', error);
      throw new Error('发音评估失败');
    }
  }

  // 音频格式转换
  public async convertAudioFormat(
    inputPath: string,
    outputFormat: 'mp3' | 'wav' | 'm4a'
  ): Promise<string | null> {
    try {
      // 模拟格式转换
      const outputPath = inputPath.replace(/\.[^/.]+$/, `.${outputFormat}`);
      console.log(`Converting ${inputPath} to ${outputPath}`);
      
      // 实际实现中应该使用音频处理库
      return outputPath;
    } catch (error) {
      console.error('Failed to convert audio format:', error);
      return null;
    }
  }

  // 音频文件管理
  public async deleteAudioFile(filePath: string): Promise<boolean> {
    try {
      // 实际实现中应该删除文件系统中的文件
      console.log('Deleting audio file:', filePath);
      return true;
    } catch (error) {
      console.error('Failed to delete audio file:', error);
      return false;
    }
  }

  public async getAudioDuration(filePath: string): Promise<number> {
    try {
      // 模拟获取音频时长
      return Math.floor(Math.random() * 60) + 10; // 10-70秒
    } catch (error) {
      console.error('Failed to get audio duration:', error);
      return 0;
    }
  }

  // 监听器管理
  public addAudioListener(listener: (state: AudioState) => void): void {
    this.listeners.push(listener);
  }

  public removeAudioListener(listener: (state: AudioState) => void): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  public addRecordingListener(listener: (state: RecordingState) => void): void {
    this.recordingListeners.push(listener);
  }

  public removeRecordingListener(listener: (state: RecordingState) => void): void {
    const index = this.recordingListeners.indexOf(listener);
    if (index > -1) {
      this.recordingListeners.splice(index, 1);
    }
  }

  private notifyAudioListeners(): void {
    this.listeners.forEach(listener => listener(this.audioState));
  }

  private notifyRecordingListeners(): void {
    this.recordingListeners.forEach(listener => listener(this.recordingState));
  }

  // 获取当前状态
  public getAudioState(): AudioState {
    return { ...this.audioState };
  }

  public getRecordingState(): RecordingState {
    return { ...this.recordingState };
  }

  // 清理资源
  public cleanup(): void {
    this.stopAudio();
    this.cancelRecording();
    this.listeners = [];
    this.recordingListeners = [];
  }
}

export default AudioService;
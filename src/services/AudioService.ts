import { Alert } from 'react-native';
import Sound from 'react-native-sound';
import Voice from '@react-native-voice/voice';

// 初始化Sound库
Sound.setCategory('Playback');

// 音频播放状态
interface AudioState {
  isPlaying: boolean;
  isLoaded: boolean;
  duration: number;
  currentTime: number;
  volume: number;
}

// 录音状态
interface RecordingState {
  isRecording: boolean;
  duration: number;
  audioPath?: string | null;
}

// 音频播放接口
export interface AudioPlayer {
  load(url: string): Promise<void>;
  play(): Promise<void>;
  pause(): void;
  stop(): void;
  setVolume(volume: number): void;
  getDuration(): number;
  getCurrentTime(): number;
  release(): void;
}

// 录音接口
export interface AudioRecorder {
  start(): Promise<void>;
  stop(): Promise<string>;
  cancel(): void;
  isRecording(): boolean;
}

// 语音识别接口
export interface SpeechRecognition {
  start(): Promise<void>;
  stop(): Promise<string[]>;
  cancel(): void;
  isListening(): boolean;
}

class AudioService {
  private static instance: AudioService;
  private currentAudio: Sound | null = null;
  private recorder: any = null;
  private audioState: AudioState = {
    isPlaying: false,
    isLoaded: false,
    duration: 0,
    currentTime: 0,
    volume: 1.0,
  };

  private recordingState: RecordingState = {
    isRecording: false,
    duration: 0,
    audioPath: null,
  };

  private listeners: ((state: AudioState) => void)[] = [];
  private recordingListeners: ((state: RecordingState) => void)[] = [];
  private speechResults: string[] = [];
  private speechResultListeners: ((results: string[]) => void)[] = [];

  constructor() {
    this.initializeVoice();
  }

  private initializeVoice(): void {
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResultsHandler;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  private onSpeechStart = (e: any) => {
    // 语音识别开始
  };

  private onSpeechRecognized = (e: any) => {
    // 语音识别成功
  };

  private onSpeechEnd = (e: any) => {
    // 语音识别结束
    this.recordingState.isRecording = false;
    this.notifyRecordingListeners();
  };

  private onSpeechError = (e: any) => {
    // 语音识别错误
    this.recordingState.isRecording = false;
    this.notifyRecordingListeners();
    Alert.alert('语音识别错误', e.error?.message || '未知错误');
  };

  private onSpeechResultsHandler = (e: any) => {
    // 语音识别结果
    this.speechResults = e.value || [];
    this.notifySpeechResultListeners();
  };

  private onSpeechPartialResults = (e: any) => {
    // 语音识别部分结果
  };

  private onSpeechVolumeChanged = (e: any) => {
    // 语音音量变化
  };

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  // 音频播放相关方法
  public async loadAudio(audioPath: string): Promise<boolean> {
    try {
      // 释放之前的音频资源
      if (this.currentAudio) {
        this.currentAudio.release();
        this.currentAudio = null;
      }

      return new Promise((resolve) => {
        // 创建新的Sound实例
        this.currentAudio = new Sound(audioPath, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            // 音频加载失败
            Alert.alert('错误', '音频加载失败');
            resolve(false);
            return;
          }
          
          const duration = this.currentAudio?.getDuration() || 0;
          this.audioState = {
            ...this.audioState,
            isLoaded: true,
            duration: duration,
            currentTime: 0,
          };
          
          // 音频加载成功
          this.notifyAudioListeners();
          resolve(true);
        });
      });
    } catch (error) {
      console.error('Failed to load audio:', error);
      Alert.alert('错误', '音频加载失败');
      return false;
    }
  }

  public async playAudio(): Promise<boolean> {
    try {
      if (!this.audioState.isLoaded || !this.currentAudio) {
        Alert.alert('提示', '请先加载音频文件');
        return false;
      }

      return new Promise((resolve) => {
        this.audioState.isPlaying = true;
        this.notifyAudioListeners();
        
        // 使用react-native-sound播放音频
        this.currentAudio!.play((success) => {
          this.audioState.isPlaying = false;
          if (success) {
            // 音频播放完成
            this.audioState.currentTime = this.audioState.duration;
          } else {
            // 音频播放失败
            Alert.alert('错误', '音频播放失败');
          }
          this.notifyAudioListeners();
          resolve(success);
        });
        
        // 更新播放进度
        const progressInterval = setInterval(() => {
          if (this.audioState.isPlaying && this.currentAudio) {
            const currentTime = this.currentAudio.getCurrentTime();
            this.audioState.currentTime = currentTime !== undefined ? currentTime : 0;
            this.notifyAudioListeners();
          } else {
            clearInterval(progressInterval);
          }
        }, 100);
      });
    } catch (error) {
      console.error('Failed to play audio:', error);
      Alert.alert('错误', '音频播放失败');
      return false;
    }
  }

  public pauseAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.audioState.isPlaying = false;
      // 音频已暂停
      this.notifyAudioListeners();
    }
  }

  public stopAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.stop();
      this.audioState.isPlaying = false;
      this.audioState.currentTime = 0;
      // 音频已停止
      this.notifyAudioListeners();
    }
  }

  public seekTo(time: number): void {
    if (this.currentAudio && time >= 0 && time <= this.audioState.duration) {
      this.currentAudio.setCurrentTime(time);
      this.audioState.currentTime = time;
      this.notifyAudioListeners();
    }
  }

  public setPlaybackSpeed(speed: number): void {
    if (this.currentAudio) {
      this.currentAudio.setSpeed(speed);
      // 播放速度设置
    }
  }

  public setVolume(volume: number): void {
    if (this.currentAudio) {
      this.currentAudio.setVolume(Math.max(0, Math.min(1, volume)));
      // 音量设置
    }
  }

  // 录音相关方法
  public async startRecording(): Promise<boolean> {
    try {
      // 使用react-native-voice进行语音识别
      await Voice.start('en-US');
      
      this.recordingState = {
        isRecording: true,
        duration: 0,
        audioPath: undefined,
      };
      
      this.notifyRecordingListeners();
      
      // 开始录音和语音识别
      return true;
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('错误', '录音启动失败');
      return false;
    }
  }

  public async stopRecording(): Promise<string | null> {
    try {
      await Voice.stop();
      
      this.recordingState.isRecording = false;
      this.notifyRecordingListeners();
      
      // 录音已停止
      return 'recording_completed';
    } catch (error) {
      console.error('Failed to stop recording:', error);
      Alert.alert('错误', '录音停止失败');
      return null;
    }
  }

  public cancelRecording(): void {
    Voice.cancel();
    this.recordingState = {
      isRecording: false,
      duration: 0,
    };
    this.notifyRecordingListeners();
    // 录音已取消
  }

  // 语音识别相关方法
  public async startSpeechRecognition(language: string = 'en-US'): Promise<boolean> {
    try {
      // 这里应该使用 @react-native-voice/voice
      // 开始语音识别
      
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
    // 停止语音识别
  }

  private onSpeechResults(results: string[]): void {
    // 语音识别结果处理
    // 这里可以添加回调来处理识别结果
  }

  // 发音评估相关方法
  public async evaluatePronunciation(
    targetText: string,
    _audioPath: string
  ): Promise<{
    score: number;
    feedback: string;
    wordScores: Array<{ word: string; score: number }>;
  }> {
    try {
      // 模拟发音评估
      // 发音评估
      
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
      // 音频格式转换
      
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
      // 删除音频文件
      return true;
    } catch (error) {
      console.error('Failed to delete audio file:', error);
      return false;
    }
  }

  public async getAudioDuration(_filePath: string): Promise<number> {
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

  private notifySpeechResultListeners(): void {
    this.speechResultListeners.forEach(listener => listener(this.speechResults));
  }

  // 语音识别监听器管理
  public addSpeechResultListener(listener: (results: string[]) => void): void {
    this.speechResultListeners.push(listener);
  }

  public removeSpeechResultListener(listener: (results: string[]) => void): void {
    this.speechResultListeners = this.speechResultListeners.filter(l => l !== listener);
  }

  // 获取最新的语音识别结果
  public getLatestSpeechResult(): string | null {
    return this.speechResults.length > 0 ? this.speechResults[0] : null;
  }

  // 获取所有语音识别结果
  public getAllSpeechResults(): string[] {
    return [...this.speechResults];
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
    if (this.currentAudio) {
      this.currentAudio.release();
      this.currentAudio = null;
    }
    this.cancelRecording();
    
    // 清理语音识别
    Voice.destroy().then(Voice.removeAllListeners);
    
    // 清理所有监听器
    this.listeners = [];
    this.recordingListeners = [];
    this.speechResultListeners = [];
    this.speechResults = [];
  }
}

export default AudioService;
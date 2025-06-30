import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CustomIcon from '../components/CustomIcon';

// 导入屏幕组件
import HomeScreen from '../screens/HomeScreen';
import SpeakingScreen from '../screens/SpeakingScreen';
import ListeningScreen from '../screens/ListeningScreen';
import VocabularyScreen from '../screens/VocabularyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import PronunciationPracticeScreen from '../screens/PronunciationPracticeScreen';
import ListeningPracticeScreen from '../screens/ListeningPracticeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 主页堆栈导航
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: '英语学习' }}
      />
      <Stack.Screen 
        name="LessonDetail" 
        component={LessonDetailScreen} 
        options={{ title: '课程详情' }}
      />
    </Stack.Navigator>
  );
}

// 口语练习堆栈导航
function SpeakingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Speaking" 
        component={SpeakingScreen} 
        options={{ title: '口语练习' }}
      />
      <Stack.Screen 
        name="PronunciationPractice" 
        component={PronunciationPracticeScreen} 
        options={{ title: '发音练习' }}
      />
    </Stack.Navigator>
  );
}

// 听力练习堆栈导航
function ListeningStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Listening" 
        component={ListeningScreen} 
        options={{ title: '听力练习' }}
      />
      <Stack.Screen 
        name="ListeningPractice" 
        component={ListeningPracticeScreen} 
        options={{ title: '听力训练' }}
      />
    </Stack.Navigator>
  );
}

// 底部标签导航
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused: _focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'HomeTab':
              iconName = 'home';
              break;
            case 'SpeakingTab':
              iconName = 'mic';
              break;
            case 'ListeningTab':
              iconName = 'headset';
              break;
            case 'VocabularyTab':
              iconName = 'book';
              break;
            case 'ProfileTab':
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }

          return <CustomIcon name={iconName as 'home' | 'mic' | 'headset' | 'book' | 'person' | 'help'} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{ tabBarLabel: '首页' }}
      />
      <Tab.Screen 
        name="SpeakingTab" 
        component={SpeakingStack} 
        options={{ tabBarLabel: '口语' }}
      />
      <Tab.Screen 
        name="ListeningTab" 
        component={ListeningStack} 
        options={{ tabBarLabel: '听力' }}
      />
      <Tab.Screen 
        name="VocabularyTab" 
        component={VocabularyScreen} 
        options={{ tabBarLabel: '单词' }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{ tabBarLabel: '我的' }}
      />
    </Tab.Navigator>
  );
}

// 主应用导航器
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
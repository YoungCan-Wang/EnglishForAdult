// 听力练习数据
import { ListeningExercise } from '../types';

export const listeningData: ListeningExercise[] = [
  // 初级听力练习
  {
    id: 'ls1',
    title: '基础问候对话',
    audioUrl: 'https://www.soundjay.com/misc/sounds/basic-greeting.mp3',
    transcript: 'A: Hello! How are you today? B: I\'m fine, thank you. How about you? A: I\'m doing great. Nice weather today, isn\'t it? B: Yes, it\'s beautiful outside.',
    questions: [
      {
        id: 'ls1-q1',
        question: 'How is person B feeling?',
        options: ['Tired', 'Fine', 'Sick', 'Angry'],
        correctAnswer: 'Fine',
      },
      {
        id: 'ls1-q2',
        question: 'What do they say about the weather?',
        options: ['It\'s raining', 'It\'s cold', 'It\'s beautiful', 'It\'s windy'],
        correctAnswer: 'It\'s beautiful',
      },
    ],
    difficulty: 'easy',
  },
  {
    id: 'ls2',
    title: '咖啡店点餐',
    audioUrl: 'https://www.soundjay.com/misc/sounds/coffee-shop-order.mp3',
    transcript: 'Customer: Good morning! I\'d like a large coffee with milk, please. Barista: Would you like sugar with that? Customer: Yes, two sugars please. Barista: That will be $3.50. Customer: Here you go. Thank you!',
    questions: [
      {
        id: 'ls2-q1',
        question: 'What size coffee does the customer order?',
        options: ['Small', 'Medium', 'Large', 'Extra large'],
        correctAnswer: 'Large',
      },
      {
        id: 'ls2-q2',
        question: 'How much does the coffee cost?',
        options: ['$2.50', '$3.00', '$3.50', '$4.00'],
        correctAnswer: '$3.50',
      },
      {
        id: 'ls2-q3',
        question: 'How many sugars does the customer want?',
        options: ['One', 'Two', 'Three', 'None'],
        correctAnswer: 'Two',
      },
    ],
    difficulty: 'easy',
  },
  {
    id: 'ls3',
    title: '问路对话',
    audioUrl: 'https://www.soundjay.com/misc/sounds/asking-directions.mp3',
    transcript: 'Tourist: Excuse me, could you tell me how to get to the train station? Local: Sure! Go straight for two blocks, then turn left at the traffic light. The station will be on your right. Tourist: Thank you so much! Local: You\'re welcome. Have a safe trip!',
    questions: [
      {
        id: 'ls3-q1',
        question: 'Where does the tourist want to go?',
        options: ['Bus station', 'Train station', 'Airport', 'Hotel'],
        correctAnswer: 'Train station',
      },
      {
        id: 'ls3-q2',
        question: 'How many blocks should the tourist go straight?',
        options: ['One', 'Two', 'Three', 'Four'],
        correctAnswer: 'Two',
      },
      {
        id: 'ls3-q3',
        question: 'Which direction should they turn at the traffic light?',
        options: ['Left', 'Right', 'Straight', 'Back'],
        correctAnswer: 'Left',
      },
    ],
    difficulty: 'easy',
  },

  // 中级听力练习
  {
    id: 'ls4',
    title: '天气预报',
    audioUrl: 'https://www.soundjay.com/misc/sounds/weather-forecast.mp3',
    transcript: 'Good evening. Here\'s your weather forecast for tomorrow. We\'ll see partly cloudy skies in the morning with temperatures around 18 degrees Celsius. In the afternoon, expect some light rain with temperatures dropping to 15 degrees. The evening will be clear with a low of 12 degrees.',
    questions: [
      {
        id: 'ls4-q1',
        question: 'What will the weather be like in the morning?',
        options: ['Sunny', 'Rainy', 'Partly cloudy', 'Snowy'],
        correctAnswer: 'Partly cloudy',
      },
      {
        id: 'ls4-q2',
        question: 'What is the afternoon temperature?',
        options: ['12 degrees', '15 degrees', '18 degrees', '20 degrees'],
        correctAnswer: '15 degrees',
      },
      {
        id: 'ls4-q3',
        question: 'When will it rain?',
        options: ['Morning', 'Afternoon', 'Evening', 'Night'],
        correctAnswer: 'Afternoon',
      },
    ],
    difficulty: 'medium',
  },
  {
    id: 'ls5',
    title: '工作面试对话',
    audioUrl: 'https://www.soundjay.com/misc/sounds/job-interview.mp3',
    transcript: 'Interviewer: Tell me about your previous work experience. Candidate: I worked as a marketing coordinator for three years at ABC Company. I was responsible for social media campaigns and customer outreach. Interviewer: What was your biggest achievement there? Candidate: I increased our social media engagement by 40% and helped launch a successful product campaign.',
    questions: [
      {
        id: 'ls5-q1',
        question: 'How long did the candidate work at ABC Company?',
        options: ['Two years', 'Three years', 'Four years', 'Five years'],
        correctAnswer: 'Three years',
      },
      {
        id: 'ls5-q2',
        question: 'What was the candidate\'s job title?',
        options: ['Marketing manager', 'Marketing coordinator', 'Sales representative', 'Social media specialist'],
        correctAnswer: 'Marketing coordinator',
      },
      {
        id: 'ls5-q3',
        question: 'By how much did they increase social media engagement?',
        options: ['30%', '40%', '50%', '60%'],
        correctAnswer: '40%',
      },
    ],
    difficulty: 'medium',
  },
  {
    id: 'ls6',
    title: '餐厅预订',
    audioUrl: 'https://www.soundjay.com/misc/sounds/restaurant-reservation.mp3',
    transcript: 'Restaurant: Good afternoon, Mario\'s Restaurant. How can I help you? Customer: I\'d like to make a reservation for Saturday evening. Restaurant: For how many people? Customer: Four people, please. Restaurant: What time would you prefer? Customer: Around 7:30 PM if possible. Restaurant: Perfect! We have a table available at 7:30. May I have your name? Customer: Yes, it\'s Johnson.',
    questions: [
      {
        id: 'ls6-q1',
        question: 'What day is the reservation for?',
        options: ['Friday', 'Saturday', 'Sunday', 'Monday'],
        correctAnswer: 'Saturday',
      },
      {
        id: 'ls6-q2',
        question: 'How many people is the reservation for?',
        options: ['Two', 'Three', 'Four', 'Five'],
        correctAnswer: 'Four',
      },
      {
        id: 'ls6-q3',
        question: 'What time is the reservation?',
        options: ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'],
        correctAnswer: '7:30 PM',
      },
    ],
    difficulty: 'medium',
  },

  // 高级听力练习
  {
    id: 'ls7',
    title: '商务会议讨论',
    audioUrl: 'https://www.soundjay.com/misc/sounds/business-meeting.mp3',
    transcript: 'Manager: Let\'s discuss the quarterly sales report. Our revenue increased by 15% compared to last quarter, which exceeded our initial projections. However, we need to address the declining customer retention rate in the European market. Sarah, what\'s your analysis? Sarah: The data shows that customer satisfaction scores dropped by 8% in Europe, primarily due to delivery delays and customer service issues.',
    questions: [
      {
        id: 'ls7-q1',
        question: 'By how much did revenue increase?',
        options: ['10%', '15%', '20%', '25%'],
        correctAnswer: '15%',
      },
      {
        id: 'ls7-q2',
        question: 'Which market is experiencing problems?',
        options: ['Asian', 'American', 'European', 'African'],
        correctAnswer: 'European',
      },
      {
        id: 'ls7-q3',
        question: 'What are the main causes of customer dissatisfaction?',
        options: ['High prices and poor quality', 'Delivery delays and customer service issues', 'Limited product variety', 'Complicated ordering process'],
        correctAnswer: 'Delivery delays and customer service issues',
      },
    ],
    difficulty: 'hard',
  },
  {
    id: 'ls8',
    title: '科技新闻报道',
    audioUrl: 'https://www.soundjay.com/misc/sounds/tech-news.mp3',
    transcript: 'In today\'s technology news, researchers at Stanford University have developed a revolutionary artificial intelligence system that can predict natural disasters with 95% accuracy. The system analyzes satellite data, weather patterns, and geological information to forecast earthquakes, hurricanes, and floods up to 72 hours in advance. This breakthrough could potentially save thousands of lives and billions of dollars in property damage.',
    questions: [
      {
        id: 'ls8-q1',
        question: 'What is the accuracy rate of the AI system?',
        options: ['90%', '95%', '98%', '99%'],
        correctAnswer: '95%',
      },
      {
        id: 'ls8-q2',
        question: 'How far in advance can the system make predictions?',
        options: ['24 hours', '48 hours', '72 hours', '96 hours'],
        correctAnswer: '72 hours',
      },
      {
        id: 'ls8-q3',
        question: 'Which university developed this system?',
        options: ['Harvard', 'MIT', 'Stanford', 'Berkeley'],
        correctAnswer: 'Stanford',
      },
    ],
    difficulty: 'hard',
  },
  {
    id: 'ls9',
    title: '环境保护讲座',
    audioUrl: 'https://www.soundjay.com/misc/sounds/environmental-lecture.mp3',
    transcript: 'Climate change represents one of the most significant challenges of our time. Global temperatures have risen by 1.2 degrees Celsius since pre-industrial times, leading to more frequent extreme weather events. To mitigate these effects, we must transition to renewable energy sources, reduce carbon emissions by 50% by 2030, and implement sustainable practices in agriculture and manufacturing.',
    questions: [
      {
        id: 'ls9-q1',
        question: 'By how much have global temperatures risen?',
        options: ['0.8 degrees', '1.2 degrees', '1.5 degrees', '2.0 degrees'],
        correctAnswer: '1.2 degrees',
      },
      {
        id: 'ls9-q2',
        question: 'By what percentage should carbon emissions be reduced by 2030?',
        options: ['30%', '40%', '50%', '60%'],
        correctAnswer: '50%',
      },
      {
        id: 'ls9-q3',
        question: 'What is mentioned as a solution to climate change?',
        options: ['Building more factories', 'Increasing oil production', 'Transitioning to renewable energy', 'Expanding urban areas'],
        correctAnswer: 'Transitioning to renewable energy',
      },
    ],
    difficulty: 'hard',
  },
];

export default listeningData;
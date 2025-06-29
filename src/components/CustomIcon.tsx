import React from 'react';
import { SvgXml } from 'react-native-svg';

// SVG图标数据
const iconData = {
  home: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L20 9V21H15V14H9V21H4V9L12 3Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <circle cx="12" cy="7" r="1" fill="#FFD700"/>
    <path d="M9 17H15" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  
  mic: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
    <path d="M5 10V12C5 16.4183 8.58172 20 13 20H11C15.4183 20 19 16.4183 19 12V10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="12" y1="20" x2="12" y2="24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="8" y1="24" x2="16" y2="24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="10" cy="6" r="1" fill="#FF6B6B"/>
    <circle cx="14" cy="8" r="1" fill="#FF6B6B"/>
    <path d="M9 10C9 10 10.5 11 12 10.5C13.5 10 15 10 15 10" stroke="#FF6B6B" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  
  headset: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <rect x="1" y="15" width="4" height="6" rx="2" fill="currentColor"/>
    <rect x="19" y="15" width="4" height="6" rx="2" fill="currentColor"/>
    <circle cx="3" cy="17" r="1" fill="#4ECDC4"/>
    <circle cx="21" cy="17" r="1" fill="#4ECDC4"/>
    <path d="M8 12C8 12 9.5 13.5 12 13C14.5 12.5 16 12 16 12" stroke="#4ECDC4" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="12" cy="8" r="1.5" fill="#4ECDC4"/>
  </svg>`,
  
  book: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20V3H6.5C5.11929 3 4 4.11929 4 5.5V19.5Z" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
    <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20V21H6.5C5.11929 21 4 19.8807 4 18.5V19.5Z" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
    <line x1="9" y1="7" x2="17" y2="7" stroke="#96C93D" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="9" y1="10" x2="15" y2="10" stroke="#96C93D" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="9" y1="13" x2="16" y2="13" stroke="#96C93D" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="18" cy="5" r="1" fill="#FFD700"/>
  </svg>`,
  
  person: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="5" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
    <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" fill="currentColor"/>
    <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="10" cy="7" r="1" fill="#6C5CE7"/>
    <circle cx="14" cy="7" r="1" fill="#6C5CE7"/>
    <path d="M9 10C9 10 10.5 11 12 11C13.5 11 15 10 15 10" stroke="#6C5CE7" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  
  'flash-on': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <circle cx="8" cy="12" r="1" fill="#FFD700"/>
    <circle cx="16" cy="12" r="1" fill="#FFD700"/>
    <path d="M10 8L14 8" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M10 16L14 16" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  
  school: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L22 9L12 15L2 9L12 3Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M2 9V15L12 21L22 15V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 11V16L12 19L18 16V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="9" r="1" fill="#A29BFE"/>
    <circle cx="8" cy="13" r="0.5" fill="#A29BFE"/>
    <circle cx="16" cy="13" r="0.5" fill="#A29BFE"/>
  </svg>`,
  
  'check-circle': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
    <path d="M8 12L11 15L16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3" fill="#00C851" opacity="0.3"/>
    <circle cx="9" cy="9" r="1" fill="#FFD700"/>
    <circle cx="15" cy="9" r="1" fill="#FFD700"/>
  </svg>`,
  
  'local-fire-department': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8 2 5 5 5 9C5 13 8 16 12 16C16 16 19 13 19 9C19 5 16 2 12 2Z" fill="currentColor"/>
    <path d="M12 4C10 4 8 6 8 8C8 10 10 12 12 12C14 12 16 10 16 8C16 6 14 4 12 4Z" fill="#FF4444"/>
    <circle cx="12" cy="8" r="2" fill="#FFD700"/>
    <path d="M12 16V22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M8 20H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  
  star: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <circle cx="12" cy="10" r="2" fill="#FFD700"/>
    <path d="M9 12L15 12" stroke="#FFD700" stroke-width="1" stroke-linecap="round"/>
  </svg>`,
  
  'trending-up': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17 7H21V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="9" cy="11" r="1.5" fill="#00C851"/>
    <circle cx="13" cy="15" r="1.5" fill="#00C851"/>
    <circle cx="21" cy="7" r="1.5" fill="#00C851"/>
  </svg>`,
  
  flag: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M4 21V4H13L14 6H20V15H13L12 13H6V21H4Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
     <circle cx="10" cy="9" r="1" fill="#007AFF"/>
     <circle cx="16" cy="9" r="1" fill="#007AFF"/>
     <path d="M8 11H18" stroke="#007AFF" stroke-width="1" stroke-linecap="round"/>
   </svg>`,
   
   target: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
     <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2"/>
     <circle cx="12" cy="12" r="2" fill="currentColor"/>
     <circle cx="12" cy="8" r="1" fill="#FF6B6B"/>
   </svg>`,
   
   'play-arrow': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M8 5V19L19 12L8 5Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
     <circle cx="12" cy="12" r="2" fill="#00C851" opacity="0.5"/>
   </svg>`,
   
   chat: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
     <circle cx="9" cy="9" r="1" fill="#4ECDC4"/>
     <circle cx="15" cy="9" r="1" fill="#4ECDC4"/>
     <path d="M9 13C9 13 10.5 14 12 14C13.5 14 15 13 15 13" stroke="#4ECDC4" stroke-width="1.5" stroke-linecap="round"/>
   </svg>`,
   
   business: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M12 7V3H8V7H3V21H21V7H12Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
     <rect x="8" y="3" width="4" height="4" stroke="currentColor" stroke-width="1.5"/>
     <circle cx="12" cy="14" r="2" fill="#45B7D1"/>
     <path d="M6 11H18" stroke="#45B7D1" stroke-width="1" stroke-linecap="round"/>
     <path d="M6 17H18" stroke="#45B7D1" stroke-width="1" stroke-linecap="round"/>
   </svg>`,
   
   tune: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" fill="currentColor"/>
     <circle cx="8" cy="12" r="1" fill="#96C93D"/>
     <circle cx="16" cy="6" r="1" fill="#96C93D"/>
     <circle cx="12" cy="18" r="1" fill="#96C93D"/>
   </svg>`,
   
   'theater-comedy': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <circle cx="12" cy="12" r="10" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
     <circle cx="9" cy="9" r="1.5" fill="white"/>
     <circle cx="15" cy="9" r="1.5" fill="white"/>
     <path d="M7 15C7 15 9 17 12 17C15 17 17 15 17 15" stroke="white" stroke-width="2" stroke-linecap="round"/>
     <circle cx="9" cy="9" r="0.5" fill="#FF6B6B"/>
     <circle cx="15" cy="9" r="0.5" fill="#FF6B6B"/>
   </svg>`,
   
   'lightbulb-outline': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" stroke-width="1.5"/>
     <path d="M9 21V20H15V21C15 21.55 14.55 22 14 22H10C9.45 22 9 21.55 9 21Z" fill="currentColor"/>
     <circle cx="12" cy="9" r="2" fill="#FFA726"/>
     <path d="M10 12L14 12" stroke="#FFA726" stroke-width="1" stroke-linecap="round"/>
   </svg>`,
   
   'access-time': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <circle cx="12" cy="12" r="10" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
     <path d="M12 7V12L16 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
     <circle cx="12" cy="12" r="2" fill="#4ECDC4"/>
   </svg>`,
   
   'settings': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M19.14,12.94C19.18,12.64 19.2,12.33 19.2,12C19.2,11.68 19.18,11.36 19.14,11.06L21.16,9.48C21.34,9.34 21.39,9.07 21.28,8.87L19.36,5.55C19.24,5.33 18.99,5.26 18.77,5.33L16.38,6.29C15.88,5.91 15.35,5.59 14.76,5.35L14.4,2.81C14.36,2.57 14.16,2.4 13.91,2.4H10.09C9.84,2.4 9.64,2.57 9.6,2.81L9.24,5.35C8.65,5.59 8.12,5.92 7.62,6.29L5.23,5.33C5.01,5.26 4.76,5.33 4.64,5.55L2.72,8.87C2.61,9.07 2.66,9.34 2.84,9.48L4.86,11.06C4.82,11.36 4.8,11.69 4.8,12C4.8,12.31 4.82,12.64 4.86,12.94L2.84,14.52C2.66,14.66 2.61,14.93 2.72,15.13L4.64,18.45C4.76,18.67 5.01,18.74 5.23,18.67L7.62,17.71C8.12,18.08 8.65,18.41 9.24,18.65L9.6,21.19C9.64,21.43 9.84,21.6 10.09,21.6H13.91C14.16,21.6 14.36,21.43 14.4,21.19L14.76,18.65C15.35,18.41 15.88,18.08 16.38,17.71L18.77,18.67C18.99,18.74 19.24,18.67 19.36,18.45L21.28,15.13C21.39,14.93 21.34,14.66 21.16,14.52L19.14,12.94M12,15.6C10.02,15.6 8.4,13.98 8.4,12C8.4,10.02 10.02,8.4 12,8.4C13.98,8.4 15.6,10.02 15.6,12C15.6,13.98 13.98,15.6 12,15.6Z" fill="currentColor"/>
     <circle cx="12" cy="12" r="2" fill="#96C93D"/>
   </svg>`,
   
   'emoji-events': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M5 9V7L7 6V4C7 3.45 7.45 3 8 3H16C16.55 3 17 3.45 17 4V6L19 7V9C19 10.1 18.1 11 17 11V12C17 13.1 16.1 14 15 14H13V16L15 18V20H9V18L11 16V14H9C7.9 14 7 13.1 7 12V11C5.9 11 5 10.1 5 9Z" fill="currentColor"/>
     <circle cx="12" cy="8" r="1.5" fill="#FFD700"/>
     <path d="M9 10H15" stroke="#FFD700" stroke-width="1" stroke-linecap="round"/>
   </svg>`,
   
   'assessment': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
     <rect x="7" y="10" width="2" height="7" fill="#45B7D1"/>
     <rect x="11" y="7" width="2" height="10" fill="#45B7D1"/>
     <rect x="15" y="13" width="2" height="4" fill="#45B7D1"/>
   </svg>`,
   
   'leaderboard': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <rect x="2" y="9" width="5.5" height="12" fill="currentColor"/>
     <rect x="9.25" y="3" width="5.5" height="18" fill="currentColor"/>
     <rect x="16.5" y="11" width="5.5" height="10" fill="currentColor"/>
     <circle cx="4.75" cy="15" r="1" fill="#FFD700"/>
     <circle cx="12" cy="12" r="1" fill="#FFD700"/>
     <circle cx="19.25" cy="16" r="1" fill="#FFD700"/>
   </svg>`,
   
   'help': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <circle cx="12" cy="12" r="10" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
     <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
     <circle cx="12" cy="17" r="1" fill="white"/>
   </svg>`,
   
   'info': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
     <circle cx="12" cy="12" r="10" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
     <path d="M12 16V12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
     <circle cx="12" cy="8" r="1" fill="white"/>
   </svg>`,
   
   'chevron-right': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    
    'arrow-back': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    
    'signal-cellular-alt': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <rect x="2" y="17" width="3" height="5" fill="currentColor"/>
       <rect x="6" y="13" width="3" height="9" fill="currentColor"/>
       <rect x="10" y="9" width="3" height="13" fill="currentColor"/>
       <rect x="14" y="5" width="3" height="17" fill="currentColor"/>
       <rect x="18" y="2" width="3" height="20" fill="currentColor"/>
     </svg>`,
     
     'search': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
       <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
     </svg>`,
     
     'clear': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="currentColor"/>
        <path d="M15 9L9 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 9L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      
      'volume-up': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/>
         <path d="M19.07 4.93A10 10 0 0 1 19.07 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M15.54 8.46A5 5 0 0 1 15.54 15.54" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`,
       
       'quiz': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
         <path d="M9 9H15" stroke="white" stroke-width="2" stroke-linecap="round"/>
         <path d="M9 12H15" stroke="white" stroke-width="2" stroke-linecap="round"/>
         <path d="M9 15H12" stroke="white" stroke-width="2" stroke-linecap="round"/>
         <circle cx="16" cy="15" r="1" fill="white"/>
       </svg>`,
       
       'subtitles': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
         <path d="M4 12H8" stroke="white" stroke-width="2" stroke-linecap="round"/>
         <path d="M4 16H14" stroke="white" stroke-width="2" stroke-linecap="round"/>
         <path d="M10 12H20" stroke="white" stroke-width="2" stroke-linecap="round"/>
         <path d="M16 16H20" stroke="white" stroke-width="2" stroke-linecap="round"/>
       </svg>`,
       
       'cancel': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <circle cx="12" cy="12" r="10" fill="currentColor" stroke="currentColor" stroke-width="1.5"/>
         <path d="M15 9L9 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M9 9L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`,
       
       'pause': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
         <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
       </svg>`,
       
       'speed': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M20.38 8.57L19.15 10.42A8 8 0 0 1 18.93 18H5.07A8 8 0 0 1 15.58 6.85L17.43 5.62A10 10 0 0 0 3.35 19A2 2 0 0 0 5.07 20H18.93A2 2 0 0 0 20.67 19A10 10 0 0 0 20.38 8.57Z" fill="currentColor"/>
         <path d="M10.59 15.41A2 2 0 0 0 13.42 15.41L19.08 6.92L10.59 12.58A2 2 0 0 0 10.59 15.41Z" fill="#4ECDC4"/>
       </svg>`,
       
       'check': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
       </svg>`,
       
       'arrow-forward': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
       </svg>`,
       
       'close': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
       </svg>`,
       
       'replay': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M12 5V1L7 6L12 11V7C15.31 7 18 9.69 18 13S15.31 19 12 19S6 16.31 6 13H4C4 17.42 7.58 21 12 21S20 17.42 20 13S16.42 5 12 5Z" fill="currentColor"/>
         <circle cx="12" cy="13" r="2" fill="#4ECDC4"/>
       </svg>`,
       
       'thumb-up': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M1 21H5V9H1V21ZM23 10C23 8.9 22.1 8 21 8H14.69L15.64 3.43L15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.59C7.22 7.95 7 8.45 7 9V19C7 20.1 7.9 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10.82L23 10Z" fill="currentColor"/>
         <circle cx="12" cy="15" r="1" fill="#00C851"/>
       </svg>`,
       
       'refresh': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12S7.58 20 12.01 20C15.74 20 18.85 17.45 19.74 14H17.66C16.84 16.33 14.62 18 12.01 18C8.7 18 6.01 15.31 6.01 12S8.7 6 12.01 6C13.67 6 15.15 6.69 16.23 7.78L13.01 11H20.01V4L17.66 6.35Z" fill="currentColor"/>
          <circle cx="12" cy="12" r="2" fill="#4ECDC4"/>
        </svg>`,
        
        'stop': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="12" height="12" fill="currentColor"/>
        </svg>`
};

type IconName = 'home' | 'mic' | 'headset' | 'book' | 'person' | 'flash-on' | 'school' | 'check-circle' | 'local-fire-department' | 'star' | 'trending-up' | 'flag' | 'target' | 'play-arrow' | 'chat' | 'business' | 'tune' | 'theater-comedy' | 'lightbulb-outline' | 'access-time' | 'settings' | 'emoji-events' | 'assessment' | 'leaderboard' | 'help' | 'info' | 'chevron-right' | 'arrow-back' | 'signal-cellular-alt' | 'search' | 'clear' | 'volume-up' | 'quiz' | 'subtitles' | 'cancel' | 'pause' | 'speed' | 'check' | 'arrow-forward' | 'close' | 'replay' | 'thumb-up' | 'refresh' | 'stop';

interface CustomIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({ name, size = 24, color = '#000' }) => {
  const svgData = iconData[name];
  
  if (!svgData) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  // 替换SVG中的currentColor为实际颜色
  const coloredSvg = svgData.replace(/currentColor/g, color);
  
  return (
    <SvgXml 
      xml={coloredSvg} 
      width={size} 
      height={size} 
    />
  );
};

export default CustomIcon;
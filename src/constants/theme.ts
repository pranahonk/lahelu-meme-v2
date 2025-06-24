import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#4F46E5',
  secondary: '#EC4899',
  
  white: '#FFFFFF',
  black: '#000000',
  
  gray_100: '#F3F4F6',
  gray_300: '#D1D5DB',
  gray_500: '#6B7280',
  gray_700: '#374151',
  
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',

  background: '#111827',
  surface: '#1F2937',
  text: '#E5E7EB',
  textSecondary: '#9CA3AF',
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  
  width,
  height,
};

export const FONT_FAMILIES = [
  'System',
  'Arial',
  'Times New Roman',
  'Courier New',
  'Impact',
];

export const FONTS = {
  h1: { fontFamily: 'System', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'System', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'System', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'System', fontSize: SIZES.h4, lineHeight: 22 },
  body1: { fontFamily: 'System', fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: 'System', fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: 'System', fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: 'System', fontSize: SIZES.body4, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;

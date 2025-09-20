import type { CSSProperties } from 'react';

// 색상 상수
export const colors = {
  // Primary colors
  primary: '#4285f4',
  primaryHover: '#3367d6',
  primaryDark: '#2d3190',
  primaryGradient: 'linear-gradient(135deg, #4285f4 0%, #343ea8ff 100%)',
  primaryGradientHover: 'linear-gradient(135deg, #3367d6 0%, #2d3190 100%)',

  // Status colors
  error: '#dc3545',

  // Neutral colors
  white: '#ffffff',
  border: '#e0e0e0',
  borderHover: '#f5f5f5',
  disabled: '#ccc',
  background: '#f5f5f5',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Text colors
  text: '#333',
  textSecondary: '#666',
  textOnPrimary: '#ffffff',

  // Shadows
  shadow: '0 2px 8px rgba(66, 133, 244, 0.3)',
  shadowLarge: '0 10px 40px rgba(0, 0, 0, 0.2)',

  // Focus outlines
  focusOutline: '2px solid rgba(66, 133, 244, 0.2)',
  errorFocusOutline: '2px solid rgba(220, 53, 69, 0.2)',
} as const;

// 공통 필드 스타일
export const getFieldStyles = (hasError: boolean = false): CSSProperties => ({
  width: '100%',
  padding: '12px',
  border: `2px solid ${hasError ? colors.error : colors.border}`,
  borderRadius: '6px',
  fontSize: '16px',
  boxSizing: 'border-box',
});

// 포커스 스타일
export const getFocusStyles = (hasError: boolean = false): CSSProperties => ({
  borderColor: hasError ? colors.error : colors.primary,
  outline: hasError ? colors.errorFocusOutline : colors.focusOutline,
});

// 블러 스타일
export const getBlurStyles = (hasError: boolean = false): CSSProperties => ({
  borderColor: hasError ? colors.error : colors.border,
  outline: 'none',
});

// 레이블 스타일
export const labelStyles: CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '500',
  color: colors.text,
};

// 에러 메시지 스타일
export const errorStyles: CSSProperties = {
  color: colors.error,
  fontSize: '14px',
  marginTop: '4px',
  fontWeight: '500',
};

// 필드 컨테이너 스타일
export const fieldContainerStyles: CSSProperties = {
  marginBottom: '20px',
};

// Select 전용 스타일
export const selectStyles: CSSProperties = {
  backgroundColor: colors.white,
};

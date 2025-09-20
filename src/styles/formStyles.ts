import type { CSSProperties } from 'react';

// 색상 상수
export const colors = {
  error: '#dc3545',
  primary: '#4285f4',
  primaryHover: '#3367d6',
  border: '#e0e0e0',
  text: '#333',
  textSecondary: '#666',
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
  outline: `2px solid ${
    hasError ? 'rgba(220, 53, 69, 0.2)' : 'rgba(66, 133, 244, 0.2)'
  }`,
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
  backgroundColor: 'white',
};

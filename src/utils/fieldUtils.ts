import { getFocusStyles, getBlurStyles } from '../styles/formStyles';

// 공통 포커스 핸들러
export const createFocusHandler = (hasError: boolean = false) => {
  return (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const styles = getFocusStyles(hasError);
    e.target.style.borderColor = styles.borderColor as string;
    e.target.style.outline = styles.outline as string;
  };
};

// 공통 블러 핸들러
export const createBlurHandler = (hasError: boolean = false) => {
  return (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const styles = getBlurStyles(hasError);
    e.target.style.borderColor = styles.borderColor as string;
    e.target.style.outline = styles.outline as string;
  };
};
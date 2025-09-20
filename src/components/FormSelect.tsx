import { useId } from 'react';
import { getFieldStyles, labelStyles, errorStyles, selectStyles } from '../styles/formStyles';
import { createFocusHandler, createBlurHandler } from '../utils/fieldUtils';

interface FormSelectProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  error?: string;
}

const FormSelect = ({
  id,
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  placeholder = '선택해주세요',
  error,
}: FormSelectProps) => {
  const errorId = useId();
  const hasError = !!error;

  const combinedSelectStyle = {
    ...getFieldStyles(hasError),
    ...selectStyles,
  };

  const handleFocus = createFocusHandler(hasError);
  const handleBlur = createBlurHandler(hasError);

  return (
    <div style={{ marginBottom: '24px' }}>
      <label htmlFor={id} style={labelStyles}>
        {label} {required && '*'}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={combinedSelectStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <div id={errorId} role="alert" style={errorStyles}>
          {error}
        </div>
      )}
    </div>
  );
};

export default FormSelect;
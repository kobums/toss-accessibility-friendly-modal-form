import { useId } from 'react';

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

  const selectStyle = {
    width: '100%',
    padding: '12px',
    border: `2px solid ${hasError ? '#dc3545' : '#e0e0e0'}`,
    borderRadius: '6px',
    fontSize: '16px',
    boxSizing: 'border-box' as const,
    backgroundColor: 'white',
  };

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.style.borderColor = hasError ? '#dc3545' : '#4285f4';
    e.target.style.outline = `2px solid ${hasError ? 'rgba(220, 53, 69, 0.2)' : 'rgba(66, 133, 244, 0.2)'}`;
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.style.borderColor = hasError ? '#dc3545' : '#e0e0e0';
    e.target.style.outline = 'none';
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '500',
          color: '#333',
        }}
      >
        {label} {required && '*'}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={selectStyle}
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
        <div
          id={errorId}
          role="alert"
          style={{
            color: '#dc3545',
            fontSize: '14px',
            marginTop: '4px',
            fontWeight: '500',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default FormSelect;
import { forwardRef, useId } from 'react';

interface FormInputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, name, type = 'text', value, onChange, required = false, placeholder, error }, ref) => {
    const errorId = useId();
    const hasError = !!error;

    const inputStyle = {
      width: '100%',
      padding: '12px',
      border: `2px solid ${hasError ? '#dc3545' : '#e0e0e0'}`,
      borderRadius: '6px',
      fontSize: '16px',
      boxSizing: 'border-box' as const,
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.borderColor = hasError ? '#dc3545' : '#4285f4';
      e.target.style.outline = `2px solid ${hasError ? 'rgba(220, 53, 69, 0.2)' : 'rgba(66, 133, 244, 0.2)'}`;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.borderColor = hasError ? '#dc3545' : '#e0e0e0';
      e.target.style.outline = 'none';
    };

    return (
      <div style={{ marginBottom: '20px' }}>
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
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
        />
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
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
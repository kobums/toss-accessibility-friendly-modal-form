import { forwardRef } from 'react';

interface FormInputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, name, type = 'text', value, onChange, required = false, placeholder }, ref) => {
    const inputStyle = {
      width: '100%',
      padding: '12px',
      border: '2px solid #e0e0e0',
      borderRadius: '6px',
      fontSize: '16px',
      boxSizing: 'border-box' as const,
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.borderColor = '#4285f4';
      e.target.style.outline = '2px solid rgba(66, 133, 244, 0.2)';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.borderColor = '#e0e0e0';
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
        />
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
import { forwardRef, useId } from 'react';
import { getFieldStyles, labelStyles, errorStyles, fieldContainerStyles } from '../styles/formStyles';
import { createFocusHandler, createBlurHandler } from '../utils/fieldUtils';

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

    const inputStyle = getFieldStyles(hasError);
    const handleFocus = createFocusHandler(hasError);
    const handleBlur = createBlurHandler(hasError);

    return (
      <div style={fieldContainerStyles}>
        <label htmlFor={id} style={labelStyles}>
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
          <div id={errorId} role="alert" style={errorStyles}>
            {error}
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
interface ButtonProps {
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  type = 'button',
  variant = 'primary',
  onClick,
  children,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const baseStyle = {
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  const primaryStyle = {
    ...baseStyle,
    border: 'none',
    backgroundColor: isDisabled ? '#ccc' : '#4285f4',
    color: 'white',
  };

  const secondaryStyle = {
    ...baseStyle,
    border: '2px solid #e0e0e0',
    backgroundColor: 'white',
    color: '#333',
  };

  const style = variant === 'primary' ? primaryStyle : secondaryStyle;

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

    if (variant === 'primary') {
      (e.target as HTMLButtonElement).style.backgroundColor = '#3367d6';
    } else {
      (e.target as HTMLButtonElement).style.backgroundColor = '#f5f5f5';
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

    if (variant === 'primary') {
      (e.target as HTMLButtonElement).style.backgroundColor = '#4285f4';
    } else {
      (e.target as HTMLButtonElement).style.backgroundColor = 'white';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={style}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      aria-busy={loading}
    >
      {loading && (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid transparent',
            borderTop: '2px solid currentColor',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
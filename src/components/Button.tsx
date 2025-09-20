interface ButtonProps {
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = ({
  type = 'button',
  variant = 'primary',
  onClick,
  children,
  disabled = false,
}: ButtonProps) => {
  const baseStyle = {
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  };

  const primaryStyle = {
    ...baseStyle,
    border: 'none',
    backgroundColor: disabled ? '#ccc' : '#4285f4',
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
    if (disabled) return;

    if (variant === 'primary') {
      (e.target as HTMLButtonElement).style.backgroundColor = '#3367d6';
    } else {
      (e.target as HTMLButtonElement).style.backgroundColor = '#f5f5f5';
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

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
      disabled={disabled}
      style={style}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
    </button>
  );
};

export default Button;
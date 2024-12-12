import { ReactNode } from 'react';
import { Icon } from '../icons';
import type { IconName } from '../icons';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  className = '',
  type = 'button'
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center rounded-lg font-medium
        transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {icon && iconPosition === 'left' && (
        <Icon 
          name={icon} 
          size={size === 'sm' ? 'sm' : 'md'} 
          className={children ? 'mr-2' : ''} 
        />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Icon 
          name={icon} 
          size={size === 'sm' ? 'sm' : 'md'} 
          className={children ? 'ml-2' : ''} 
        />
      )}
    </button>
  );
}
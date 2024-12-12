import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'hover';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};

const variantStyles = {
  default: 'border border-gray-200',
  hover: 'border border-gray-200 hover:border-gray-300 transition-colors'
};

export function Card({ 
  children, 
  className = '',
  padding = 'md',
  variant = 'default'
}: CardProps) {
  return (
    <div className={`
      bg-white rounded-lg shadow-sm
      ${paddingStyles[padding]}
      ${variantStyles[variant]}
      ${className}
    `}>
      {children}
    </div>
  );
}
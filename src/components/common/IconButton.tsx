import { IconWrapper } from '../icons';
import { Icons } from '../icons';
import type { IconProps } from '../icons';

interface IconButtonProps extends IconProps {
  name: keyof typeof Icons;
  onClick?: () => void;
  label?: string;
  withBackground?: boolean;
}

export function IconButton({
  name,
  onClick,
  label,
  size = 'md',
  variant = 'primary',
  withBackground = false,
  className = ''
}: IconButtonProps) {
  const Icon = Icons[name];
  
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center rounded-lg 
        transition-colors focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-indigo-500
        ${className}
      `}
      title={label}
    >
      <IconWrapper 
        size={size} 
        variant={variant}
        withBackground={withBackground}
      >
        <Icon />
      </IconWrapper>
      {label && (
        <span className="ml-2 text-sm font-medium">
          {label}
        </span>
      )}
    </button>
  );
}
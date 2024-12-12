import { Link } from 'react-router-dom';
import { IconButton } from '../common/IconButton';
import type { IconProps } from '../icons';

interface NavigationLinkProps extends IconProps {
  href: string;
  icon: keyof typeof import('../icons').Icons;
  label: string;
  isActive?: boolean;
}

export function NavigationLink({ 
  href, 
  icon, 
  label, 
  isActive,
  ...iconProps 
}: NavigationLinkProps) {
  return (
    <Link
      to={href}
      className={`
        flex items-center px-3 py-2 rounded-md text-sm font-medium
        transition-colors
        ${isActive
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
      `}
    >
      <IconButton
        name={icon}
        label={label}
        variant={isActive ? 'primary' : 'gray'}
        size="sm"
        {...iconProps}
      />
    </Link>
  );
}
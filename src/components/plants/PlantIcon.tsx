import { Icon } from '../icons';

interface PlantIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'sprout' | 'leaf';
}

export function PlantIcon({ 
  className = '', 
  size = 'md',
  variant = 'default'
}: PlantIconProps) {
  const iconMap = {
    default: 'Flower', // Используем Flower вместо Plant
    sprout: 'Sprout',
    leaf: 'Leaf'
  } as const;

  return (
    <Icon 
      name={iconMap[variant]} 
      size={size} 
      className={className} 
    />
  );
}
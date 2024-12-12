import { RentedSystem } from '../../types/system';
import { RentedSystemCard } from './RentedSystemCard';

interface SystemsGridProps {
  systems: RentedSystem[];
  onRemoveSystem?: (systemId: string) => void;
}

export function SystemsGrid({ systems, onRemoveSystem }: SystemsGridProps) {
  // Сортируем системы: сначала те, что требуют внимания
  const sortedSystems = [...systems].sort((a, b) => {
    const aWarnings = a.plants.filter(p => p.status !== 'healthy').length;
    const bWarnings = b.plants.filter(p => p.status !== 'healthy').length;
    return bWarnings - aWarnings;
  });

  return (
    <div className="grid grid-cols-1 gap-6">
      {sortedSystems.map(system => (
        <RentedSystemCard 
          key={system.id} 
          system={system}
          onRemove={onRemoveSystem}
        />
      ))}
    </div>
  );
}
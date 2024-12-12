import { Link } from 'react-router-dom';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { SystemsGrid } from '../components/dashboard/SystemsGrid';
import type { RentedSystem } from '../types/system';
import type { IconName } from '../components/icons/types';

interface DashboardPageProps {
  rentedSystems: RentedSystem[];
  onRemoveSystem: (systemId: string) => void;
}

export function DashboardPage({ rentedSystems, onRemoveSystem }: DashboardPageProps) {
  // Подсчет статистики
  const totalPlants = rentedSystems.reduce((sum, system) => sum + system.plants.length, 0);
  const totalCapacity = rentedSystems.reduce((sum, system) => sum + system.capacity, 0);
  const healthyPlants = rentedSystems.reduce(
    (sum, system) => sum + system.plants.filter(p => p.status === 'healthy').length,
    0
  );
  const warningPlants = rentedSystems.reduce(
    (sum, system) => sum + system.plants.filter(p => p.status === 'warning').length,
    0
  );

  const stats = [
    {
      name: 'Всего систем',
      value: rentedSystems.length,
      icon: 'Package' as IconName,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Растений',
      value: totalPlants,
      total: totalCapacity,
      icon: 'Beaker' as IconName,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Здоровые растения',
      value: healthyPlants,
      total: totalPlants,
      icon: 'Sprout' as IconName,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      name: 'Требуют внимания',
      value: warningPlants,
      total: totalPlants,
      icon: 'AlertTriangle' as IconName,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="space-y-6">
      <DashboardStats stats={stats} />
      <SystemsGrid systems={rentedSystems} onRemoveSystem={onRemoveSystem} />
    </div>
  );
}
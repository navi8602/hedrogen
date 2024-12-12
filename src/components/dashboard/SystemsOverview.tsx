import { RentedSystem } from '../../types/system';
import { Card } from '../common/Card';
import { formatDate } from '../../utils/format';
import { calculateDaysRemaining } from '../../utils/rental';

interface SystemsOverviewProps {
  systems: RentedSystem[];
}

export function SystemsOverview({ systems }: SystemsOverviewProps) {
  const stats = [
    {
      label: 'Всего систем',
      value: systems.length,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      label: 'Активных растений',
      value: systems.reduce((sum, s) => sum + s.plants.length, 0),
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Требуют внимания',
      value: systems.filter(s => s.plants.some(p => p.status !== 'healthy')).length,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map(({ label, value, color, bgColor }) => (
          <Card key={label} padding="md" variant="hover">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${bgColor}`}>
                <span className={`text-xl font-bold ${color}`}>{value}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
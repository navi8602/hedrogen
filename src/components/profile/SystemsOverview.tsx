import { RentedSystem } from '../../types/system';
import { 
  Package, Calendar, Plant, AlertTriangle,
  TrendingUp, Activity 
} from 'lucide-react';
import { calculateDaysRemaining } from '../../utils/rental';
import { formatDate } from '../../utils/date';

interface SystemsOverviewProps {
  systems: RentedSystem[];
}

export function SystemsOverview({ systems }: SystemsOverviewProps) {
  const getSystemStatus = (system: RentedSystem) => {
    const daysRemaining = calculateDaysRemaining(system.endDate);
    const hasWarnings = system.plants.some(p => p.status !== 'healthy');
    
    if (daysRemaining < 7) {
      return {
        label: 'Скоро завершение',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100'
      };
    }
    if (hasWarnings) {
      return {
        label: 'Требует внимания',
        color: 'text-orange-600',
        bgColor: 'bg-orange-100'
      };
    }
    return {
      label: 'Активна',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    };
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Package className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Всего систем</p>
              <p className="text-xl font-semibold">{systems.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Plant className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Активных растений</p>
              <p className="text-xl font-semibold">
                {systems.reduce((sum, s) => sum + s.plants.length, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Требуют внимания</p>
              <p className="text-xl font-semibold">
                {systems.filter(s => 
                  s.plants.some(p => p.status !== 'healthy')
                ).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Мои системы</h3>
        <div className="space-y-4">
          {systems.map(system => {
            const status = getSystemStatus(system);
            const daysRemaining = calculateDaysRemaining(system.endDate);
            const healthyPlants = system.plants.filter(p => p.status === 'healthy').length;

            return (
              <div
                key={system.id}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Package className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{system.name}</h4>
                      <p className="text-sm text-gray-500">
                        {system.plants.length} из {system.capacity} позиций занято
                      </p>
                    </div>
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${status.bgColor} ${status.color}
                  `}>
                    {status.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      Осталось {daysRemaining} {
                        daysRemaining === 1 ? 'день' :
                        daysRemaining < 5 ? 'дня' : 'дней'
                      }
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Plant className="h-4 w-4 mr-2" />
                    <span>
                      {healthyPlants} здоровых растений
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Activity className="h-4 w-4 mr-2" />
                    <span>
                      {system.metrics.temperature}°C, {system.metrics.humidity}%
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <span>
                      {system.plants.length > 0 ? '85% успешных урожаев' : 'Нет данных'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    <span>Аренда: </span>
                    <span>{formatDate(system.startDate)}</span>
                    <span> — </span>
                    <span>{formatDate(system.endDate)}</span>
                  </div>
                  <button
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
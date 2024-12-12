import { SystemMetrics } from '../../types/system';
import { formatDateTime } from '../../utils/date';

interface SystemMetricsCardProps {
  metrics: SystemMetrics;
}

export function SystemMetricsCard({ metrics }: SystemMetricsCardProps) {
  const metricItems = [
    {
      label: "Температура",
      value: metrics.temperature,
      unit: "°C",
      icon: "🌡️"
    },
    {
      label: "Влажность",
      value: metrics.humidity,
      unit: "%",
      icon: "💧"
    },
    {
      label: "Питательные в-ва",
      value: metrics.nutrientLevel,
      unit: "%",
      icon: "🧪"
    },
    {
      label: "pH",
      value: metrics.phLevel,
      unit: "",
      icon: "⚖️"
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Показатели системы</h3>
      <div className="space-y-4">
        {metricItems.map(item => (
          <div key={item.label} className="flex items-center space-x-3">
            <span className="text-xl">{item.icon}</span>
            <div className="flex-1">
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="font-medium">
                {item.value}{item.unit}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4">
        Последнее обновление: {formatDateTime(metrics.lastUpdated)}
      </p>
    </div>
  );
}
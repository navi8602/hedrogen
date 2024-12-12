interface QuickActionProps {
  onAction: (action: string) => void;
}

export function QuickActions({ onAction }: QuickActionProps) {
  const actions = [
    {
      id: 'light',
      name: 'Освещение',
      value: 'Включено',
      icon: '☀️',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'watering',
      name: 'Полив',
      value: 'Авто',
      icon: '💧',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'ventilation',
      name: 'Вентиляция',
      value: '50%',
      icon: '🌪️',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'temperature',
      name: 'Температура',
      value: '23°C',
      icon: '🌡️',
      color: 'bg-red-100 text-red-800'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map(({ id, name, icon, value, color }) => (
        <button
          key={id}
          onClick={() => onAction(id)}
          className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 
                   bg-white transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${color}`}>
              <span className="text-xl">{icon}</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">{name}</p>
              <p className="text-sm text-gray-500">{value}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
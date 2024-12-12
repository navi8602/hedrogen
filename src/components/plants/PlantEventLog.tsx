import { useState } from 'react';
import { PlantEvent } from '../../types/plants';
import { formatDateTime } from '../../utils/date';
import { 
  Droplets, Scissors, Beaker, AlertTriangle, 
  FileText, Calendar, ChevronDown, ChevronUp,
  Plus 
} from 'lucide-react';

interface PlantEventLogProps {
  events: PlantEvent[];
  onAddEvent: (event: Omit<PlantEvent, 'id'>) => void;
}

const EVENT_ICONS = {
  watering: Droplets,
  harvesting: Calendar,
  pruning: Scissors,
  fertilizing: Beaker,
  issue: AlertTriangle,
  note: FileText
} as const;

const EVENT_LABELS = {
  watering: 'Полив',
  harvesting: 'Сбор урожая',
  pruning: 'Обрезка',
  fertilizing: 'Подкормка',
  issue: 'Проблема',
  note: 'Заметка'
} as const;

export function PlantEventLog({ events, onAddEvent }: PlantEventLogProps) {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    type: 'note' as PlantEvent['type'],
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent({
      ...newEvent,
      plantId: events[0]?.plantId || '',
      timestamp: new Date().toISOString()
    });
    setIsAddingEvent(false);
    setNewEvent({ type: 'note', description: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">История событий</h3>
        <button
          onClick={() => setIsAddingEvent(!isAddingEvent)}
          className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Добавить событие
        </button>
      </div>

      {isAddingEvent && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Тип события
            </label>
            <select
              value={newEvent.type}
              onChange={(e) => setNewEvent({ 
                ...newEvent, 
                type: e.target.value as PlantEvent['type']
              })}
              className="w-full rounded-md border-gray-300"
            >
              {Object.entries(EVENT_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <textarea
              value={newEvent.description}
              onChange={(e) => setNewEvent({ 
                ...newEvent, 
                description: e.target.value 
              })}
              className="w-full rounded-md border-gray-300"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAddingEvent(false)}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm text-white bg-indigo-600 
                       rounded hover:bg-indigo-700"
            >
              Добавить
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {events.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            История событий пуста
          </p>
        ) : (
          events.map(event => {
            const Icon = EVENT_ICONS[event.type];
            return (
              <div
                key={event.id}
                className="flex items-start space-x-3 p-3 bg-white 
                         rounded-lg border border-gray-200"
              >
                <div className={`
                  p-2 rounded-lg
                  ${event.type === 'issue' 
                    ? 'bg-red-100' 
                    : event.type === 'note'
                      ? 'bg-blue-100'
                      : 'bg-green-100'}
                `}>
                  <Icon className={`
                    h-5 w-5
                    ${event.type === 'issue' 
                      ? 'text-red-600' 
                      : event.type === 'note'
                        ? 'text-blue-600'
                        : 'text-green-600'}
                  `} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {EVENT_LABELS[event.type]}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDateTime(event.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
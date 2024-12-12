import { Dialog } from '../ui/Dialog';
import { RentedSystem } from '../../types/system';
import { formatDate } from '../../utils/date';

interface DeleteSystemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  system: RentedSystem;
}

export function DeleteSystemDialog({
  isOpen,
  onClose,
  onConfirm,
  system
}: DeleteSystemDialogProps) {
  const hasPlants = system.plants.length > 0;

  return (
    <Dialog 
      isOpen={isOpen} 
      onClose={onClose}
      title="Подтверждение удаления системы"
    >
      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
          <span className="text-red-600 text-xl">⚠️</span>
          <div>
            <p className="font-medium text-red-800">
              Вы уверены, что хотите удалить эту систему?
            </p>
            <p className="mt-1 text-sm text-red-700">
              Это действие нельзя будет отменить. Вся информация о системе,
              включая историю мониторинга и статистику, будет удалена.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Информация о системе:</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-600">Название:</span>{' '}
              <span className="font-medium">{system.name}</span>
            </p>
            <div className="flex items-center space-x-4">
              <div>
                <span>📅 Начало аренды: {formatDate(system.startDate)}</span>
              </div>
              <div>
                <span>📅 Окончание: {formatDate(system.endDate)}</span>
              </div>
            </div>
            <div>
              <span>🌱 Растений в системе: {system.plants.length} из {system.capacity}</span>
            </div>
          </div>
        </div>

        {hasPlants && (
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
            <span className="text-yellow-600 text-xl">⚠️</span>
            <div>
              <p className="font-medium text-yellow-800">
                В системе есть активные растения
              </p>
              <p className="mt-1 text-sm text-yellow-700">
                При удалении системы все данные о растениях будут потеряны.
                Рекомендуется сначала собрать урожай или пересадить растения.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white 
                     border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Отмена
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 
                     border border-transparent rounded-md hover:bg-red-700"
          >
            Удалить систему
          </button>
        </div>
      </div>
    </Dialog>
  );
}
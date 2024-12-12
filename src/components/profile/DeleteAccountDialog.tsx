import { Dialog } from '../ui/Dialog';

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteAccountDialog({
  isOpen,
  onClose,
  onConfirm
}: DeleteAccountDialogProps) {
  return (
    <Dialog 
      isOpen={isOpen} 
      onClose={onClose}
      title="Удаление аккаунта"
    >
      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
          <span className="text-red-600 text-xl">⚠️</span>
          <div>
            <p className="font-medium text-red-800">
              Вы уверены, что хотите удалить аккаунт?
            </p>
            <p className="mt-1 text-sm text-red-700">
              Это действие нельзя будет отменить. Вся информация о вашем аккаунте,
              включая историю выращивания и настройки, будет удалена.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">
            Что будет удалено:
          </h4>
          <ul className="space-y-1 text-sm text-yellow-700">
            <li>• Все данные профиля</li>
            <li>• История транзакций</li>
            <li>• Статистика выращивания</li>
            <li>• Настройки систем</li>
            <li>• Сохраненные способы оплаты</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Активные подписки</h4>
          <p className="text-sm text-gray-600">
            У вас есть активные системы в аренде. При удалении аккаунта все
            текущие подписки будут отменены, и средства за оставшийся период
            будут возвращены на карту оплаты.
          </p>
        </div>

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
            Удалить аккаунт
          </button>
        </div>
      </div>
    </Dialog>
  );
}
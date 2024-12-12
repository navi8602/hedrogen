interface DialogActionsProps {
  onClose: () => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

export function DialogActions({ 
  onClose, 
  onSubmit, 
  isSubmitDisabled 
}: DialogActionsProps) {
  return (
    <div className="flex justify-end space-x-3">
      <button
        onClick={onClose}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white 
                 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Отмена
      </button>
      <button
        onClick={onSubmit}
        disabled={isSubmitDisabled}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 
                 border border-transparent rounded-md hover:bg-indigo-700
                 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Добавить растения
      </button>
    </div>
  );
}
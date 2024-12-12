import { PlantType } from '../../../types/plants';
import { checkPlantCompatibility, getCurrentPlantQuantity, checkSpaceRequirements, getPlantQuantityLimit } from '../../../utils/plantCompatibility';

interface AddPlantEntryProps {
  index: number;
  entry: {
    plantId: string;
    quantity: number;
    notes?: string;
  };
  onUpdate: (index: number, field: string, value: any) => void;
  onRemove: (index: number) => void;
  currentPlants: any[];
  remainingSpace: number;
  filteredPlants: PlantType[];
}

export function AddPlantEntry({
  index,
  entry,
  onUpdate,
  onRemove,
  currentPlants,
  remainingSpace,
  filteredPlants
}: AddPlantEntryProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">Растение {index + 1}</h4>
        {index > 0 && (
          <button
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-700 px-2 py-1"
          >
            ✕
          </button>
        )}
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Тип растения
          </label>
          <select
            value={entry.plantId}
            onChange={(e) => onUpdate(index, 'plantId', e.target.value)}
            className="w-full rounded-md border-gray-300"
          >
            <option value="">Выберите растение</option>
            {filteredPlants.map(plant => {
              const isCompatible = checkPlantCompatibility(currentPlants, plant.id);
              const currentQuantity = getCurrentPlantQuantity(plant.id, currentPlants);
              const hasSpace = checkSpaceRequirements(plant.id, remainingSpace);
              const canAdd = isCompatible && hasSpace && 
                getPlantQuantityLimit(plant.id, currentQuantity);

              return (
                <option
                  key={plant.id}
                  value={plant.id}
                  disabled={!canAdd}
                >
                  {plant.name} {!canAdd && '(недоступно)'}
                </option>
              );
            })}
          </select>
        </div>

        {entry.plantId && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Количество
              </label>
              <input
                type="number"
                min="1"
                value={entry.quantity}
                onChange={(e) => onUpdate(index, 'quantity', parseInt(e.target.value))}
                className="w-full rounded-md border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Заметки
              </label>
              <input
                type="text"
                value={entry.notes || ''}
                onChange={(e) => onUpdate(index, 'notes', e.target.value)}
                className="w-full rounded-md border-gray-300"
                placeholder="Необязательно"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
import { PlantType } from '../../../types/plants';
import { PLANTS } from '../../../data/plants';

interface PlantDetailsProps {
  plant: PlantType;
}

export function PlantDetails({ plant }: PlantDetailsProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
      <div className="flex items-center space-x-4 text-sm">
        <div>
          <span className="text-gray-500">Время роста:</span>
          <span className="ml-1 font-medium">{plant.growthDays} дней</span>
        </div>
        <div>
          <span className="text-gray-500">Требует места:</span>
          <span className="ml-1 font-medium">{plant.spacing} позиций</span>
        </div>
      </div>

      <div className="text-sm">
        <span className="text-gray-500">Совместимо с:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {plant.companionPlants.map(id => {
            const companion = PLANTS.find(p => p.id === id);
            return companion ? (
              <span
                key={id}
                className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs"
              >
                {companion.name}
              </span>
            ) : null;
          })}
        </div>
      </div>

      {plant.incompatiblePlants.length > 0 && (
        <div className="text-sm">
          <span className="text-gray-500">Несовместимо с:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {plant.incompatiblePlants.map(id => {
              const incompatible = PLANTS.find(p => p.id === id);
              return incompatible ? (
                <span
                  key={id}
                  className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs"
                >
                  {incompatible.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
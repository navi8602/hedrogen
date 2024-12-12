import { PlantType } from '../../types/plants';
import { PLANTS, PLANT_CATEGORIES } from '../../data/plants';
import { 
  Thermometer, Droplets, Clock, Beaker,
  Plus, AlertTriangle, CheckCircle2 
} from 'lucide-react';

interface PlantCatalogProps {
  plants: PlantType[];
  onSelectPlant: (plant: PlantType) => void;
  onAddToSystem?: (plant: PlantType) => void;
  currentSystemPlants?: string[];
}

export function PlantCatalog({ 
  plants, 
  onSelectPlant,
  onAddToSystem,
  currentSystemPlants = []
}: PlantCatalogProps) {
  const getPlantCompatibilityStatus = (plant: PlantType) => {
    const isAlreadyInSystem = currentSystemPlants.includes(plant.name);
    if (isAlreadyInSystem) {
      return {
        canAdd: false,
        message: 'Уже добавлено в систему',
        icon: CheckCircle2,
        color: 'text-green-600'
      };
    }

    const incompatiblePlants = plant.incompatiblePlants
      .filter(id => {
        const incompatiblePlant = PLANTS.find(p => p.id === id);
        return incompatiblePlant && currentSystemPlants.includes(incompatiblePlant.name);
      })
      .map(id => PLANTS.find(p => p.id === id)?.name)
      .filter(Boolean);

    if (incompatiblePlants.length > 0) {
      return {
        canAdd: false,
        message: `Несовместимо с: ${incompatiblePlants.join(', ')}`,
        icon: AlertTriangle,
        color: 'text-red-600'
      };
    }

    return {
      canAdd: true,
      message: 'Можно добавить в систему',
      icon: Plus,
      color: 'text-indigo-600'
    };
  };

  if (plants.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Растения не найдены
        </h3>
        <p className="text-gray-500">
          Попробуйте изменить параметры поиска или фильтры
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {plants.map(plant => {
        const compatibility = getPlantCompatibilityStatus(plant);
        const Icon = compatibility.icon;

        return (
          <div
            key={plant.id}
            className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 
                     transition-all overflow-hidden"
          >
            <div className="relative">
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => onSelectPlant(plant)}
              />
              <span className={`
                absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium
                ${plant.difficulty === 'easy' 
                  ? 'bg-green-100 text-green-800' 
                  : plant.difficulty === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'}
              `}>
                {plant.difficulty === 'easy' ? 'Легко' :
                 plant.difficulty === 'medium' ? 'Средне' : 'Сложно'}
              </span>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-lg cursor-pointer hover:text-indigo-600"
                      onClick={() => onSelectPlant(plant)}>
                    {plant.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {PLANT_CATEGORIES[plant.category as keyof typeof PLANT_CATEGORIES]}
                  </p>
                </div>
                {onAddToSystem && (
                  <button
                    onClick={() => compatibility.canAdd && onAddToSystem(plant)}
                    className={`
                      flex items-center px-3 py-1.5 rounded-lg text-sm font-medium
                      ${compatibility.canAdd
                        ? 'text-indigo-600 hover:bg-indigo-50'
                        : 'text-gray-400 cursor-not-allowed'}
                    `}
                    disabled={!compatibility.canAdd}
                    title={compatibility.message}
                  >
                    <Icon className="h-4 w-4 mr-1.5" />
                    {compatibility.canAdd ? 'Добавить' : 'Добавлено'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {plant.growthDays} дней
                </div>
                <div className="flex items-center text-gray-600">
                  <Thermometer className="h-4 w-4 mr-2" />
                  {plant.optimalTemp.min}-{plant.optimalTemp.max}°C
                </div>
                <div className="flex items-center text-gray-600">
                  <Droplets className="h-4 w-4 mr-2" />
                  {plant.optimalHumidity.min}-{plant.optimalHumidity.max}%
                </div>
                <div className="flex items-center text-gray-600">
                  <Beaker className="h-4 w-4 mr-2" />
                  {plant.maxQuantity} макс.
                </div>
              </div>

              {!compatibility.canAdd && (
                <div className={`
                  flex items-center text-sm p-2 rounded-lg
                  ${compatibility.color.replace('text', 'bg').replace('600', '50')}
                `}>
                  <Icon className={`h-4 w-4 mr-2 ${compatibility.color}`} />
                  <span className={compatibility.color}>{compatibility.message}</span>
                </div>
              )}

              {plant.companionPlants.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">
                    Хорошо растет вместе с:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {plant.companionPlants.map(id => {
                      const companion = PLANTS.find(p => p.id === id);
                      return companion ? (
                        <span
                          key={id}
                          className="px-2 py-0.5 bg-green-100 text-green-800 
                                   rounded-full text-xs"
                        >
                          {companion.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
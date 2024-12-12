import { useState } from 'react';
import { Dialog } from '../../ui/Dialog';
import { PLANTS } from '../../../data/plants';
import { calculateTotalSpaceRequired, validatePlantCombination } from '../../../utils/plantCompatibility';
import { AddPlantEntry } from './AddPlantEntry';
import { ValidationErrors } from './ValidationErrors';
import { SpaceInfo } from './SpaceInfo';
import { DialogActions } from './DialogActions';
import { filterPlants, createPlantToAdd } from './utils';
import type { MultiPlantAddDialogProps, PlantEntry } from './types';

export function MultiPlantAddDialog({
  isOpen,
  onClose,
  onAdd,
  occupiedPositions,
  capacity,
  currentPlants
}: MultiPlantAddDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [entries, setEntries] = useState<PlantEntry[]>([{
    plantId: '',
    quantity: 1
  }]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const remainingSpace = capacity - occupiedPositions.length;
  const totalSpaceRequired = calculateTotalSpaceRequired(entries);
  const filteredPlants = filterPlants(PLANTS, selectedCategory, searchQuery);

  const addEntry = () => {
    setEntries([...entries, { plantId: '', quantity: 1 }]);
  };

  const removeEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
    validateEntries(newEntries);
  };

  const updateEntry = (index: number, field: keyof PlantEntry, value: any) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
    validateEntries(newEntries);
  };

  const validateEntries = (currentEntries: PlantEntry[]) => {
    const { isValid, errors } = validatePlantCombination(currentEntries);
    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateEntries(entries)) return;

    const plantsToAdd = entries.flatMap(entry => {
      const plant = createPlantToAdd(entry);
      if (!plant) return [];
      return Array(entry.quantity).fill(plant);
    });

    onAdd(plantsToAdd);
    onClose();
  };

  return (
    <Dialog 
      isOpen={isOpen} 
      onClose={onClose}
      title="Добавление растений"
    >
      <div className="space-y-6">
        <SpaceInfo
          remainingSpace={remainingSpace}
          totalSpaceRequired={totalSpaceRequired}
        />

        <ValidationErrors errors={validationErrors} />

        <div className="space-y-4">
          {entries.map((entry, index) => (
            <AddPlantEntry
              key={index}
              index={index}
              entry={entry}
              onUpdate={updateEntry}
              onRemove={removeEntry}
              currentPlants={currentPlants}
              remainingSpace={remainingSpace}
              filteredPlants={filteredPlants}
            />
          ))}
        </div>

        <button
          onClick={addEntry}
          className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
        >
          + Добавить еще растение
        </button>

        <DialogActions
          onClose={onClose}
          onSubmit={handleSubmit}
          isSubmitDisabled={validationErrors.length > 0 || entries.some(e => !e.plantId)}
        />
      </div>
    </Dialog>
  );
}
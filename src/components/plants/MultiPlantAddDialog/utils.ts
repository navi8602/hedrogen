import { PlantEntry } from './types';
import { PLANTS } from '../../../data/plants';

export function createPlantToAdd(entry: PlantEntry) {
  const plant = PLANTS.find(p => p.id === entry.plantId);
  if (!plant) return null;

  return {
    name: plant.name,
    position: 0,
    plantedDate: new Date().toISOString(),
    expectedHarvestDate: new Date(
      Date.now() + plant.growthDays * 24 * 60 * 60 * 1000
    ).toISOString(),
    notes: entry.notes
  };
}

export function filterPlants(plants: typeof PLANTS, category: string | null, searchQuery: string) {
  return plants.filter(plant => {
    const matchesCategory = !category || plant.category === category;
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}
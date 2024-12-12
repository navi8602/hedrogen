import { Plant } from '../../../types/system';

export interface PlantEntry {
  plantId: string;
  quantity: number;
  notes?: string;
}

export interface MultiPlantAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (plants: Omit<Plant, 'id' | 'status'>[]) => void;
  occupiedPositions: number[];
  capacity: number;
  currentPlants: Plant[];
}
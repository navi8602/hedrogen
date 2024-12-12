interface SpaceInfoProps {
  remainingSpace: number;
  totalSpaceRequired: number;
}

export function SpaceInfo({ remainingSpace, totalSpaceRequired }: SpaceInfoProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Доступное место:</span>
        <span className="font-medium">{remainingSpace} позиций</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Требуется места:</span>
        <span className={`font-medium ${
          totalSpaceRequired > remainingSpace ? 'text-red-600' : ''
        }`}>
          {totalSpaceRequired} позиций
        </span>
      </div>
    </div>
  );
}
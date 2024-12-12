interface ValidationErrorsProps {
  errors: string[];
}

export function ValidationErrors({ errors }: ValidationErrorsProps) {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 p-4 rounded-lg">
      <div className="flex items-start space-x-2">
        <span className="text-red-600">⚠️</span>
        <div>
          <h4 className="font-medium text-red-800">Обнаружены проблемы:</h4>
          <ul className="mt-1 text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
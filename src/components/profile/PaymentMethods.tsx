interface PaymentMethodsProps {
  onAddPaymentMethod: () => void;
}

// Моковые данные карт
const mockCards = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'visa',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  },
  {
    id: '2',
    type: 'card',
    last4: '8888',
    brand: 'mastercard',
    expiryMonth: 3,
    expiryYear: 2026,
    isDefault: false
  }
];

export function PaymentMethods({ onAddPaymentMethod }: PaymentMethodsProps) {
  const [cards, setCards] = useState(mockCards);

  const handleSetDefault = (cardId: string) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  const handleDeleteCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Способы оплаты</h3>
        <button
          onClick={onAddPaymentMethod}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white 
                   rounded-lg hover:bg-indigo-700"
        >
          + Добавить карту
        </button>
      </div>

      <div className="space-y-4">
        {cards.map(card => (
          <div
            key={card.id}
            className="flex items-center justify-between p-4 bg-white 
                     rounded-lg border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                💳
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">
                    {card.brand.charAt(0).toUpperCase() + card.brand.slice(1)}
                  </p>
                  <p className="text-gray-500">•••• {card.last4}</p>
                  {card.isDefault && (
                    <span className="flex items-center text-sm text-yellow-600">
                      ⭐ По умолчанию
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Истекает {card.expiryMonth}/{card.expiryYear}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {!card.isDefault && (
                <button
                  onClick={() => handleSetDefault(card.id)}
                  className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 
                           rounded-lg"
                >
                  Сделать основной
                </button>
              )}
              <button
                onClick={() => handleDeleteCard(card.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {cards.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 
                     border-dashed border-gray-300">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Нет добавленных карт
          </h3>
          <p className="text-gray-500 mb-4">
            Добавьте карту для оплаты аренды систем
          </p>
          <button
            onClick={onAddPaymentMethod}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 
                     text-white rounded-lg hover:bg-indigo-700"
          >
            + Добавить карту
          </button>
        </div>
      )}
    </div>
  );
}
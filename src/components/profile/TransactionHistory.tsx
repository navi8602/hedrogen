import { useState } from 'react';
import { Transaction } from '../../types/user';
import { 
  ArrowDownCircle, ArrowUpCircle, Calendar,
  CreditCard, Download, Filter 
} from 'lucide-react';

// Моковые данные транзакций
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'payment',
    amount: 2500,
    status: 'completed',
    date: '2024-03-01T10:00:00Z',
    description: 'Оплата аренды HydroPro 2000',
    paymentMethod: {
      type: 'card',
      last4: '4242'
    }
  },
  {
    id: '2',
    type: 'refund',
    amount: 500,
    status: 'completed',
    date: '2024-02-15T14:30:00Z',
    description: 'Возврат за досрочное прекращение аренды',
    paymentMethod: {
      type: 'card',
      last4: '4242'
    }
  }
];

export function TransactionHistory() {
  const [transactions] = useState(mockTransactions);
  const [timeRange, setTimeRange] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">История операций</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border-gray-300 rounded-md"
            >
              <option value="all">Все время</option>
              <option value="month">Этот месяц</option>
              <option value="3months">3 месяца</option>
              <option value="year">Год</option>
            </select>
          </div>
          <button
            className="flex items-center px-3 py-2 text-sm text-gray-700 
                     bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b 
                     border-gray-200 text-sm font-medium text-gray-500">
          <div>Тип</div>
          <div>Описание</div>
          <div>Дата</div>
          <div>Способ оплаты</div>
          <div className="text-right">Сумма</div>
        </div>

        <div className="divide-y divide-gray-200">
          {transactions.map(transaction => (
            <div
              key={transaction.id}
              className="grid grid-cols-5 gap-4 p-4 hover:bg-gray-50 
                       transition-colors"
            >
              <div className="flex items-center">
                {transaction.type === 'payment' ? (
                  <ArrowUpCircle className="h-5 w-5 text-red-500 mr-2" />
                ) : (
                  <ArrowDownCircle className="h-5 w-5 text-green-500 mr-2" />
                )}
                <span className={
                  transaction.type === 'payment' 
                    ? 'text-red-600' 
                    : 'text-green-600'
                }>
                  {transaction.type === 'payment' ? 'Оплата' : 'Возврат'}
                </span>
              </div>

              <div className="text-gray-900">{transaction.description}</div>

              <div className="text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </div>

              <div className="flex items-center text-gray-500">
                <CreditCard className="h-4 w-4 mr-2" />
                •••• {transaction.paymentMethod?.last4}
              </div>

              <div className={`text-right font-medium ${
                transaction.type === 'payment' 
                  ? 'text-red-600' 
                  : 'text-green-600'
              }`}>
                {transaction.type === 'payment' ? '-' : '+'}
                {transaction.amount} ₽
              </div>
            </div>
          ))}
        </div>
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Нет операций
          </h3>
          <p className="text-gray-500">
            За выбранный период операции не найдены
          </p>
        </div>
      )}
    </div>
  );
}
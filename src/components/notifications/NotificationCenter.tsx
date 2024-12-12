import { useState } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, removeNotification, clearAll } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <span className="text-gray-600">Уведомления</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center 
                         w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg 
                      border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Уведомления</h3>
              <div className="flex items-center space-x-2">
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Очистить все
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <span className="text-gray-500">✕</span>
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Нет новых уведомлений
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 ${!notification.read ? 'bg-gray-50' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                      </div>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <span className="text-gray-400">✕</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
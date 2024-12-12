import { useState } from 'react';
import { User } from '../../types/user';
import { 
  User as UserIcon, Mail, Phone, MapPin, 
  Bell, Globe, Moon, LogOut 
} from 'lucide-react';
import { Switch } from '../ui/Switch';

interface UserInfoProps {
  user: User;
  onUpdate: (data: Partial<User>) => void;
  onDeleteAccount: () => void;
}

export function UserInfo({ user, onUpdate, onDeleteAccount }: UserInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">
            Участник с {new Date(user.joinDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Имя
            </label>
            <div className="mt-1 flex items-center">
              <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="block w-full rounded-md border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="block w-full rounded-md border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Телефон
            </label>
            <div className="mt-1 flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="block w-full rounded-md border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Адрес
            </label>
            <div className="mt-1 flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
                className="block w-full rounded-md border-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Настройки уведомлений</h3>
          <div className="space-y-4">
            <Switch
              label="Email уведомления"
              description="Получать уведомления на email"
              checked={formData.preferences.notifications.email}
              onChange={() => setFormData({
                ...formData,
                preferences: {
                  ...formData.preferences,
                  notifications: {
                    ...formData.preferences.notifications,
                    email: !formData.preferences.notifications.email
                  }
                }
              })}
            />
            <Switch
              label="Push-уведомления"
              description="Получать уведомления в браузере"
              checked={formData.preferences.notifications.push}
              onChange={() => setFormData({
                ...formData,
                preferences: {
                  ...formData.preferences,
                  notifications: {
                    ...formData.preferences.notifications,
                    push: !formData.preferences.notifications.push
                  }
                }
              })}
            />
            <Switch
              label="SMS-уведомления"
              description="Получать уведомления по SMS"
              checked={formData.preferences.notifications.sms}
              onChange={() => setFormData({
                ...formData,
                preferences: {
                  ...formData.preferences,
                  notifications: {
                    ...formData.preferences.notifications,
                    sms: !formData.preferences.notifications.sms
                  }
                }
              })}
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <div className="space-x-3">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg 
                           hover:bg-indigo-700"
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(user);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 text-gray-700 bg-white border 
                           border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg 
                         hover:bg-indigo-700"
              >
                Редактировать
              </button>
            )}
          </div>

          <div className="space-x-3">
            <button
              type="button"
              onClick={onDeleteAccount}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Удалить аккаунт
            </button>
            <button
              type="button"
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Выйти
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
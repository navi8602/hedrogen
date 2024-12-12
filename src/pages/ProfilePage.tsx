import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { UserInfo } from '../components/profile/UserInfo';
import { PaymentMethods } from '../components/profile/PaymentMethods';
import { TransactionHistory } from '../components/profile/TransactionHistory';
import { SystemsOverview } from '../components/profile/SystemsOverview';
import { GrowthAnalytics } from '../components/profile/GrowthAnalytics';
import { DeleteAccountDialog } from '../components/profile/DeleteAccountDialog';
import { RentedSystem } from '../types/system';
import { useNotifications } from '../contexts/NotificationContext';
import { User } from '../types/user';

interface ProfilePageProps {
  rentedSystems: RentedSystem[];
}

// Моковые данные пользователя
const mockUser: User = {
  id: '1',
  name: 'Иван Петров',
  email: 'ivan@example.com',
  phone: '+7 (999) 123-45-67',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  joinDate: '2024-01-01',
  address: 'г. Москва, ул. Примерная, д. 1',
  preferences: {
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    language: 'ru',
    theme: 'light'
  }
};

export function ProfilePage({ rentedSystems }: ProfilePageProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { addNotification } = useNotifications();

  const handleUpdateProfile = (data: Partial<User>) => {
    addNotification({
      title: 'Профиль обновлен',
      message: 'Изменения успешно сохранены',
      type: 'success'
    });
  };

  const handleAddPaymentMethod = () => {
    addNotification({
      title: 'Способ оплаты добавлен',
      message: 'Новая карта успешно добавлена',
      type: 'success'
    });
  };

  const handleDeleteAccount = () => {
    addNotification({
      title: 'Аккаунт удален',
      message: 'Ваш аккаунт был успешно удален',
      type: 'info'
    });
    // В реальном приложении здесь был бы редирект на страницу входа
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Мой профиль</h1>
        <p className="text-gray-500">
          Управление личными данными и настройками аккаунта
        </p>
      </div>

      <Card>
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="systems">Мои системы</TabsTrigger>
            <TabsTrigger value="payments">Оплата</TabsTrigger>
            <TabsTrigger value="transactions">История операций</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="profile">
              <UserInfo
                user={mockUser}
                onUpdate={handleUpdateProfile}
                onDeleteAccount={() => setIsDeleteDialogOpen(true)}
              />
            </TabsContent>

            <TabsContent value="systems">
              <SystemsOverview systems={rentedSystems} />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentMethods onAddPaymentMethod={handleAddPaymentMethod} />
            </TabsContent>

            <TabsContent value="transactions">
              <TransactionHistory />
            </TabsContent>

            <TabsContent value="analytics">
              <GrowthAnalytics systems={rentedSystems} />
            </TabsContent>
          </div>
        </Tabs>
      </Card>

      <DeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}
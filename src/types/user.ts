export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  address: string;
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    language: string;
    theme: string;
  };
}

export interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'refund';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
  paymentMethod?: {
    type: string;
    last4: string;
  };
}

export interface GrowthRecord {
  systemId: string;
  plantName: string;
  plantedDate: string;
  harvestedDate: string;
  success: boolean;
  yield: number;
  issues: string[];
}
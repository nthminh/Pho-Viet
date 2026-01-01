export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  available: boolean;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  note?: string;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: Date;
  customerName?: string;
}

export interface Table {
  id: number;
  number: number;
  qrCode: string;
  status: 'available' | 'occupied' | 'reserved';
}

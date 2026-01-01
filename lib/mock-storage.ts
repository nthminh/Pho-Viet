/**
 * Mock Storage - In-memory database fallback
 * This provides a simple, free, and stable storage solution when Firebase is not configured
 * All data is stored in memory and will be reset when the page refreshes
 */

import { MenuItem, Order } from './types';
import { menuItems as defaultMenuItems } from './menu-data';

// In-memory storage
let menuItemsStore: MenuItem[] = [...defaultMenuItems];
let ordersStore: Order[] = [];
let menuListeners: Array<(items: MenuItem[]) => void> = [];
let orderListeners: Array<(orders: Order[]) => void> = [];

// Helper to generate IDs
const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

/**
 * Menu Items Operations
 */
export const mockGetMenuItems = async (): Promise<MenuItem[]> => {
  return [...menuItemsStore];
};

export const mockGetMenuItem = async (id: string): Promise<MenuItem | null> => {
  return menuItemsStore.find(item => item.id === id) || null;
};

export const mockAddMenuItem = async (item: Omit<MenuItem, 'id'>): Promise<string | null> => {
  const newItem: MenuItem = { ...item, id: generateId() };
  menuItemsStore.push(newItem);
  notifyMenuListeners();
  return newItem.id;
};

export const mockUpdateMenuItem = async (id: string, data: Partial<MenuItem>): Promise<boolean> => {
  const index = menuItemsStore.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  menuItemsStore[index] = { ...menuItemsStore[index], ...data };
  notifyMenuListeners();
  return true;
};

export const mockDeleteMenuItem = async (id: string): Promise<boolean> => {
  const index = menuItemsStore.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  menuItemsStore.splice(index, 1);
  notifyMenuListeners();
  return true;
};

export const mockSubscribeToMenuItems = (callback: (items: MenuItem[]) => void): (() => void) => {
  menuListeners.push(callback);
  // Immediately call with current data
  callback([...menuItemsStore]);
  
  // Return unsubscribe function
  return () => {
    menuListeners = menuListeners.filter(listener => listener !== callback);
  };
};

export const mockGetMenuItemsByCategory = async (category: string): Promise<MenuItem[]> => {
  return menuItemsStore.filter(item => item.category === category && item.available);
};

/**
 * Orders Operations
 */
export const mockCreateOrder = async (order: Omit<Order, 'id'>): Promise<string | null> => {
  const newOrder: Order = { ...order, id: generateId() };
  ordersStore.push(newOrder);
  notifyOrderListeners();
  return newOrder.id;
};

export const mockGetOrder = async (id: string): Promise<Order | null> => {
  return ordersStore.find(order => order.id === id) || null;
};

export const mockGetOrders = async (): Promise<Order[]> => {
  return [...ordersStore].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const mockGetOrdersByStatus = async (status: Order['status']): Promise<Order[]> => {
  return ordersStore
    .filter(order => order.status === status)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const mockGetOrdersByTable = async (tableNumber: number): Promise<Order[]> => {
  return ordersStore
    .filter(order => order.tableNumber === tableNumber)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const mockUpdateOrderStatus = async (id: string, status: Order['status']): Promise<boolean> => {
  const order = ordersStore.find(o => o.id === id);
  if (!order) return false;
  
  order.status = status;
  notifyOrderListeners();
  return true;
};

export const mockUpdateOrder = async (id: string, data: Partial<Omit<Order, 'id'>>): Promise<boolean> => {
  const index = ordersStore.findIndex(order => order.id === id);
  if (index === -1) return false;
  
  ordersStore[index] = { ...ordersStore[index], ...data };
  notifyOrderListeners();
  return true;
};

export const mockDeleteOrder = async (id: string): Promise<boolean> => {
  const index = ordersStore.findIndex(order => order.id === id);
  if (index === -1) return false;
  
  ordersStore.splice(index, 1);
  notifyOrderListeners();
  return true;
};

export const mockSubscribeToOrders = (
  callback: (orders: Order[]) => void,
  status?: Order['status']
): (() => void) => {
  const listener = (orders: Order[]) => {
    if (status) {
      callback(orders.filter(order => order.status === status));
    } else {
      callback(orders);
    }
  };
  
  orderListeners.push(listener);
  // Immediately call with current data
  const currentOrders = [...ordersStore].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  listener(currentOrders);
  
  // Return unsubscribe function
  return () => {
    orderListeners = orderListeners.filter(l => l !== listener);
  };
};

export const mockSubscribeToOrdersByTable = (
  tableNumber: number,
  callback: (orders: Order[]) => void
): (() => void) => {
  const listener = (orders: Order[]) => {
    callback(orders.filter(order => order.tableNumber === tableNumber));
  };
  
  orderListeners.push(listener);
  // Immediately call with current data
  const currentOrders = [...ordersStore].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  listener(currentOrders);
  
  // Return unsubscribe function
  return () => {
    orderListeners = orderListeners.filter(l => l !== listener);
  };
};

/**
 * Helper functions to notify listeners
 */
const notifyMenuListeners = () => {
  menuListeners.forEach(listener => listener([...menuItemsStore]));
};

const notifyOrderListeners = () => {
  const orders = [...ordersStore].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  orderListeners.forEach(listener => listener(orders));
};

/**
 * Reset storage (useful for testing)
 */
export const mockResetStorage = () => {
  menuItemsStore = [...defaultMenuItems];
  ordersStore = [];
  notifyMenuListeners();
  notifyOrderListeners();
};

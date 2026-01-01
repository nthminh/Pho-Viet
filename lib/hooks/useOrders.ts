'use client';

import { useEffect, useState } from 'react';
import { Order } from '../types';
import { 
  subscribeToOrders,
  createOrder as createOrderFirebase,
  updateOrderStatus as updateOrderStatusFirebase,
  updateOrder as updateOrderFirebase
} from '../firebase-orders';
import { hasFirebaseConfig, generateOrderId } from '../utils';

/**
 * Custom hook để quản lý orders
 * Tự động sử dụng Firebase nếu được cấu hình, fallback sang mock data
 */
export function useOrders(status?: Order['status']) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const useFirebase = hasFirebaseConfig();

  useEffect(() => {
    if (useFirebase) {
      // Sử dụng Firebase real-time
      const unsubscribe = subscribeToOrders((firebaseOrders) => {
        setOrders(firebaseOrders);
        setLoading(false);
      }, status);

      return () => unsubscribe();
    } else {
      // Không có Firebase, sử dụng mock data
      setLoading(false);
    }
  }, [status, useFirebase]);

  const createOrder = async (order: Omit<Order, 'id'>) => {
    if (useFirebase) {
      const id = await createOrderFirebase(order);
      return id;
    } else {
      // Mock: thêm vào local state
      const newOrder = { ...order, id: generateOrderId() };
      setOrders([newOrder, ...orders]);
      return newOrder.id;
    }
  };

  const updateStatus = async (id: string, newStatus: Order['status']) => {
    if (useFirebase) {
      return await updateOrderStatusFirebase(id, newStatus);
    } else {
      // Mock: cập nhật local state
      setOrders(orders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      ));
      return true;
    }
  };

  const updateOrderData = async (id: string, data: Partial<Order>) => {
    if (useFirebase) {
      return await updateOrderFirebase(id, data);
    } else {
      // Mock: cập nhật local state
      setOrders(orders.map(order => 
        order.id === id ? { ...order, ...data } : order
      ));
      return true;
    }
  };

  return {
    orders,
    loading,
    error,
    useFirebase,
    createOrder,
    updateStatus,
    updateOrderData,
  };
}

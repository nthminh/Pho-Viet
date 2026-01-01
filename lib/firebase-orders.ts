import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';
import { Order, OrderItem } from './types';
import * as mockStorage from './mock-storage';

const ORDERS_COLLECTION = 'orders';

/**
 * Chuyển đổi Date object sang Timestamp
 */
const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};

/**
 * Chuyển đổi Timestamp sang Date object
 */
const timestampToDate = (timestamp: Timestamp): Date => {
  return timestamp.toDate();
};

/**
 * Tạo đơn hàng mới
 */
export const createOrder = async (order: Omit<Order, 'id'>): Promise<string | null> => {
  // Use mock storage if Firebase is not configured
  if (!db) {
    console.info('Using mock storage (Firebase not configured)');
    return mockStorage.mockCreateOrder(order);
  }
  
  try {
    const orderData = {
      ...order,
      createdAt: dateToTimestamp(order.createdAt),
    };
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating order in Firebase, falling back to mock storage:', error);
    return mockStorage.mockCreateOrder(order);
  }
};

/**
 * Lấy đơn hàng theo ID
 */
export const getOrder = async (id: string): Promise<Order | null> => {
  if (!db) {
    return mockStorage.mockGetOrder(id);
  }
  
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
      } as Order;
    }
    return null;
  } catch (error) {
    console.error('Error getting order from Firebase, falling back to mock storage:', error);
    return mockStorage.mockGetOrder(id);
  }
};

/**
 * Lấy tất cả đơn hàng
 */
export const getOrders = async (): Promise<Order[]> => {
  if (!db) {
    return mockStorage.mockGetOrders();
  }
  
  try {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
      } as Order);
    });
    return orders;
  } catch (error) {
    console.error('Error getting orders from Firebase, falling back to mock storage:', error);
    return mockStorage.mockGetOrders();
  }
};

/**
 * Lấy đơn hàng theo trạng thái
 */
export const getOrdersByStatus = async (status: Order['status']): Promise<Order[]> => {
  if (!db) {
    return mockStorage.mockGetOrdersByStatus(status);
  }
  
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
      } as Order);
    });
    return orders;
  } catch (error) {
    console.error('Error getting orders by status from Firebase, falling back to mock storage:', error);
    return mockStorage.mockGetOrdersByStatus(status);
  }
};

/**
 * Lấy đơn hàng theo số bàn
 */
export const getOrdersByTable = async (tableNumber: number): Promise<Order[]> => {
  if (!db) {
    return mockStorage.mockGetOrdersByTable(tableNumber);
  }
  
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('tableNumber', '==', tableNumber),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
      } as Order);
    });
    return orders;
  } catch (error) {
    console.error('Error getting orders by table from Firebase, falling back to mock storage:', error);
    return mockStorage.mockGetOrdersByTable(tableNumber);
  }
};

/**
 * Cập nhật trạng thái đơn hàng
 */
export const updateOrderStatus = async (
  id: string, 
  status: Order['status']
): Promise<boolean> => {
  if (!db) {
    return mockStorage.mockUpdateOrderStatus(id, status);
  }
  
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    await updateDoc(docRef, { status });
    return true;
  } catch (error) {
    console.error('Error updating order status in Firebase, falling back to mock storage:', error);
    return mockStorage.mockUpdateOrderStatus(id, status);
  }
};

/**
 * Cập nhật đơn hàng
 */
export const updateOrder = async (
  id: string, 
  data: Partial<Omit<Order, 'id'>>
): Promise<boolean> => {
  if (!db) {
    return mockStorage.mockUpdateOrder(id, data);
  }
  
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    const updateData: DocumentData = { ...data };
    if (data.createdAt) {
      updateData.createdAt = dateToTimestamp(data.createdAt);
    }
    await updateDoc(docRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating order in Firebase, falling back to mock storage:', error);
    return mockStorage.mockUpdateOrder(id, data);
  }
};

/**
 * Xóa đơn hàng
 */
export const deleteOrder = async (id: string): Promise<boolean> => {
  if (!db) {
    return mockStorage.mockDeleteOrder(id);
  }
  
  try {
    await deleteDoc(doc(db, ORDERS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting order from Firebase, falling back to mock storage:', error);
    return mockStorage.mockDeleteOrder(id);
  }
};

/**
 * Lắng nghe thay đổi đơn hàng real-time
 */
export const subscribeToOrders = (
  callback: (orders: Order[]) => void,
  status?: Order['status']
): (() => void) => {
  if (!db) {
    return mockStorage.mockSubscribeToOrders(callback, status);
  }
  
  try {
    let q;
    if (status) {
      q = query(
        collection(db, ORDERS_COLLECTION),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
    }
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const orders: Order[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        orders.push({
          id: doc.id,
          ...data,
          createdAt: timestampToDate(data.createdAt),
        } as Order);
      });
      callback(orders);
    }, (error) => {
      console.error('Error subscribing to orders in Firebase, falling back to mock storage:', error);
      return mockStorage.mockSubscribeToOrders(callback, status);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up subscription, using mock storage:', error);
    return mockStorage.mockSubscribeToOrders(callback, status);
  }
};

/**
 * Lắng nghe đơn hàng theo bàn real-time
 */
export const subscribeToOrdersByTable = (
  tableNumber: number,
  callback: (orders: Order[]) => void
): (() => void) => {
  if (!db) {
    return mockStorage.mockSubscribeToOrdersByTable(tableNumber, callback);
  }
  
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('tableNumber', '==', tableNumber),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const orders: Order[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        orders.push({
          id: doc.id,
          ...data,
          createdAt: timestampToDate(data.createdAt),
        } as Order);
      });
      callback(orders);
    }, (error) => {
      console.error('Error subscribing to orders by table in Firebase, falling back to mock storage:', error);
      return mockStorage.mockSubscribeToOrdersByTable(tableNumber, callback);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up subscription, using mock storage:', error);
    return mockStorage.mockSubscribeToOrdersByTable(tableNumber, callback);
  }
};

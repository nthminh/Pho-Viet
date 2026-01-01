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
  if (!db) {
    console.warn('Firebase not initialized');
    return null;
  }
  try {
    const orderData = {
      ...order,
      createdAt: dateToTimestamp(order.createdAt),
    };
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
};

/**
 * Lấy đơn hàng theo ID
 */
export const getOrder = async (id: string): Promise<Order | null> => {
  if (!db) {
    console.warn('Firebase not initialized');
    return null;
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
    console.error('Error getting order:', error);
    return null;
  }
};

/**
 * Lấy tất cả đơn hàng
 */
export const getOrders = async (): Promise<Order[]> => {
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
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
    console.error('Error getting orders:', error);
    return [];
  }
};

/**
 * Lấy đơn hàng theo trạng thái
 */
export const getOrdersByStatus = async (status: Order['status']): Promise<Order[]> => {
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
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
    console.error('Error getting orders by status:', error);
    return [];
  }
};

/**
 * Lấy đơn hàng theo số bàn
 */
export const getOrdersByTable = async (tableNumber: number): Promise<Order[]> => {
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
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
    console.error('Error getting orders by table:', error);
    return [];
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
    console.warn('Firebase not initialized');
    return false;
  }
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    await updateDoc(docRef, { status });
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
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
    console.warn('Firebase not initialized');
    return false;
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
    console.error('Error updating order:', error);
    return false;
  }
};

/**
 * Xóa đơn hàng
 */
export const deleteOrder = async (id: string): Promise<boolean> => {
  if (!db) {
    console.warn('Firebase not initialized');
    return false;
  }
  try {
    await deleteDoc(doc(db, ORDERS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    return false;
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
    console.warn('Firebase not initialized');
    return () => {};
  }
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
  });

  return unsubscribe;
};

/**
 * Lắng nghe đơn hàng theo bàn real-time
 */
export const subscribeToOrdersByTable = (
  tableNumber: number,
  callback: (orders: Order[]) => void
): (() => void) => {
  if (!db) {
    console.warn('Firebase not initialized');
    return () => {};
  }
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
  });

  return unsubscribe;
};

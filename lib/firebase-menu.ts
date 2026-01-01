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
import { MenuItem } from './types';
import * as mockStorage from './mock-storage';

const MENU_COLLECTION = 'menuItems';

/**
 * Lấy tất cả menu items từ Firebase hoặc mock storage
 */
export const getMenuItems = async (): Promise<MenuItem[]> => {
  // Use mock storage if Firebase is not configured
  if (!db) {
    console.info('Using mock storage (Firebase not configured)');
    return mockStorage.mockGetMenuItems();
  }
  
  try {
    const querySnapshot = await getDocs(collection(db, MENU_COLLECTION));
    const items: MenuItem[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as MenuItem);
    });
    return items;
  } catch (error) {
    console.error('Error getting menu items from Firebase, falling back to mock storage:', error);
    return mockStorage.mockGetMenuItems();
  }
};

/**
 * Lấy menu item theo ID
 */
export const getMenuItem = async (id: string): Promise<MenuItem | null> => {
  if (!db) {
    return mockStorage.mockGetMenuItem(id);
  }
  
  try {
    const docRef = doc(db, MENU_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as MenuItem;
    }
    return null;
  } catch (error) {
    console.error('Error getting menu item from Firebase, falling back to mock storage:', error);
    return mockStorage.mockGetMenuItem(id);
  }
};

/**
 * Thêm menu item mới
 */
export const addMenuItem = async (item: Omit<MenuItem, 'id'>): Promise<string | null> => {
  if (!db) {
    return mockStorage.mockAddMenuItem(item);
  }
  
  try {
    const docRef = await addDoc(collection(db, MENU_COLLECTION), item);
    return docRef.id;
  } catch (error) {
    console.error('Error adding menu item to Firebase, falling back to mock storage:', error);
    return mockStorage.mockAddMenuItem(item);
  }
};

/**
 * Cập nhật menu item
 */
export const updateMenuItem = async (id: string, data: Partial<MenuItem>): Promise<boolean> => {
  if (!db) {
    return mockStorage.mockUpdateMenuItem(id, data);
  }
  
  try {
    const docRef = doc(db, MENU_COLLECTION, id);
    await updateDoc(docRef, data as DocumentData);
    return true;
  } catch (error) {
    console.error('Error updating menu item in Firebase, falling back to mock storage:', error);
    return mockStorage.mockUpdateMenuItem(id, data);
  }
};

/**
 * Xóa menu item
 */
export const deleteMenuItem = async (id: string): Promise<boolean> => {
  if (!db) {
    return mockStorage.mockDeleteMenuItem(id);
  }
  
  try {
    await deleteDoc(doc(db, MENU_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting menu item from Firebase, falling back to mock storage:', error);
    return mockStorage.mockDeleteMenuItem(id);
  }
};

/**
 * Lắng nghe thay đổi menu items real-time
 */
export const subscribeToMenuItems = (
  callback: (items: MenuItem[]) => void
): (() => void) => {
  if (!db) {
    return mockStorage.mockSubscribeToMenuItems(callback);
  }
  
  try {
    const q = query(collection(db, MENU_COLLECTION), orderBy('category'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: MenuItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MenuItem);
      });
      callback(items);
    }, (error) => {
      console.error('Error subscribing to menu items in Firebase, falling back to mock storage:', error);
      return mockStorage.mockSubscribeToMenuItems(callback);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up subscription, using mock storage:', error);
    return mockStorage.mockSubscribeToMenuItems(callback);
  }
};

/**
 * Lấy menu items theo category
 */
export const getMenuItemsByCategory = async (category: string): Promise<MenuItem[]> => {
  if (!db) {
    return mockStorage.mockGetMenuItemsByCategory(category);
  }
  
  try {
    const q = query(
      collection(db, MENU_COLLECTION), 
      where('category', '==', category),
      where('available', '==', true)
    );
    const querySnapshot = await getDocs(q);
    const items: MenuItem[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as MenuItem);
    });
    return items;
  } catch (error) {
    console.error('Error getting menu items by category from Firebase, falling back to mock storage:', error);
    return mockStorage.mockGetMenuItemsByCategory(category);
  }
};

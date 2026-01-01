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

const MENU_COLLECTION = 'menuItems';

/**
 * Lấy tất cả menu items từ Firebase
 */
export const getMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, MENU_COLLECTION));
    const items: MenuItem[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as MenuItem);
    });
    return items;
  } catch (error) {
    console.error('Error getting menu items:', error);
    return [];
  }
};

/**
 * Lấy menu item theo ID
 */
export const getMenuItem = async (id: string): Promise<MenuItem | null> => {
  try {
    const docRef = doc(db, MENU_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as MenuItem;
    }
    return null;
  } catch (error) {
    console.error('Error getting menu item:', error);
    return null;
  }
};

/**
 * Thêm menu item mới
 */
export const addMenuItem = async (item: Omit<MenuItem, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, MENU_COLLECTION), item);
    return docRef.id;
  } catch (error) {
    console.error('Error adding menu item:', error);
    return null;
  }
};

/**
 * Cập nhật menu item
 */
export const updateMenuItem = async (id: string, data: Partial<MenuItem>): Promise<boolean> => {
  try {
    const docRef = doc(db, MENU_COLLECTION, id);
    await updateDoc(docRef, data as DocumentData);
    return true;
  } catch (error) {
    console.error('Error updating menu item:', error);
    return false;
  }
};

/**
 * Xóa menu item
 */
export const deleteMenuItem = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, MENU_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return false;
  }
};

/**
 * Lắng nghe thay đổi menu items real-time
 */
export const subscribeToMenuItems = (
  callback: (items: MenuItem[]) => void
): (() => void) => {
  const q = query(collection(db, MENU_COLLECTION), orderBy('category'));
  
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const items: MenuItem[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as MenuItem);
    });
    callback(items);
  });

  return unsubscribe;
};

/**
 * Lấy menu items theo category
 */
export const getMenuItemsByCategory = async (category: string): Promise<MenuItem[]> => {
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
    console.error('Error getting menu items by category:', error);
    return [];
  }
};

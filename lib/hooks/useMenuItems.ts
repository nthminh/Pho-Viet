'use client';

import { useEffect, useState } from 'react';
import { MenuItem } from '../types';
import { 
  getMenuItems as getMenuItemsFirebase, 
  subscribeToMenuItems,
  addMenuItem as addMenuItemFirebase,
  updateMenuItem as updateMenuItemFirebase,
  deleteMenuItem as deleteMenuItemFirebase
} from '../firebase-menu';
import { menuItems as mockMenuItems } from '../menu-data';
import { hasFirebaseConfig, generateItemId } from '../utils';

/**
 * Custom hook để quản lý menu items
 * Tự động sử dụng Firebase nếu được cấu hình, fallback sang mock data
 */
export function useMenuItems() {
  const [items, setItems] = useState<MenuItem[]>(mockMenuItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const useFirebase = hasFirebaseConfig();

  useEffect(() => {
    if (useFirebase) {
      // Sử dụng Firebase real-time
      const unsubscribe = subscribeToMenuItems((firebaseItems) => {
        if (firebaseItems.length > 0) {
          setItems(firebaseItems);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // Sử dụng mock data
      setItems(mockMenuItems);
      setLoading(false);
    }
  }, [useFirebase]);

  const addItem = async (item: Omit<MenuItem, 'id'>) => {
    if (useFirebase) {
      const id = await addMenuItemFirebase(item);
      return id;
    } else {
      // Mock: thêm vào local state
      const newItem = { ...item, id: generateItemId() };
      setItems([...items, newItem]);
      return newItem.id;
    }
  };

  const updateItem = async (id: string, data: Partial<MenuItem>) => {
    if (useFirebase) {
      return await updateMenuItemFirebase(id, data);
    } else {
      // Mock: cập nhật local state
      setItems(items.map(item => item.id === id ? { ...item, ...data } : item));
      return true;
    }
  };

  const deleteItem = async (id: string) => {
    if (useFirebase) {
      return await deleteMenuItemFirebase(id);
    } else {
      // Mock: xóa khỏi local state
      setItems(items.filter(item => item.id !== id));
      return true;
    }
  };

  return {
    items,
    loading,
    error,
    useFirebase,
    addItem,
    updateItem,
    deleteItem,
  };
}

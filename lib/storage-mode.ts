/**
 * Storage Mode Detection
 * Provides information about which storage mode is being used
 */

import { db } from './firebase';

export type StorageMode = 'firebase' | 'mock';

/**
 * Get the current storage mode
 */
export const getStorageMode = (): StorageMode => {
  return db ? 'firebase' : 'mock';
};

/**
 * Check if Firebase is configured
 */
export const isFirebaseConfigured = (): boolean => {
  return db !== undefined;
};

/**
 * Get storage mode display name
 */
export const getStorageModeDisplayName = (): string => {
  return isFirebaseConfigured() 
    ? 'Firebase (Cloud Storage)' 
    : 'Mock Storage (In-Memory)';
};

/**
 * Get storage mode description
 */
export const getStorageModeDescription = (): string => {
  return isFirebaseConfigured()
    ? 'Dữ liệu được lưu trên Firebase Cloud và đồng bộ giữa các thiết bị'
    : 'Dữ liệu chỉ lưu trên bộ nhớ tạm và sẽ mất khi tải lại trang. Để sử dụng cloud storage, hãy cấu hình Firebase.';
};

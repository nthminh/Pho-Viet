/**
 * Kiểm tra xem Firebase đã được cấu hình đúng chưa
 */
export function hasFirebaseConfig(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'your-api-key' &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== 'your-project-id'
  );
}

/**
 * Generate unique ID cho orders
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `DH${timestamp}${random}`.toUpperCase();
}

/**
 * Generate unique ID cho items
 */
export function generateItemId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${timestamp}${random}`;
}

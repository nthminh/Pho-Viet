import { menuItems } from './menu-data';
import { addMenuItem } from './firebase-menu';

/**
 * Script để import dữ liệu menu mẫu vào Firebase
 * Chạy script này một lần để khởi tạo dữ liệu menu trong Firebase
 */
export async function initializeMenuData() {
  console.log('Bắt đầu import dữ liệu menu vào Firebase...');
  
  try {
    for (const item of menuItems) {
      const { id, ...itemData } = item;
      const newId = await addMenuItem(itemData);
      if (newId) {
        console.log(`✓ Đã thêm: ${item.name} (ID: ${newId})`);
      } else {
        console.log(`✗ Lỗi khi thêm: ${item.name}`);
      }
    }
    console.log('Hoàn thành import dữ liệu menu!');
  } catch (error) {
    console.error('Lỗi khi import dữ liệu:', error);
  }
}

// Uncomment dòng dưới và chạy để import dữ liệu
// initializeMenuData();

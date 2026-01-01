# 🔥 Hướng Dẫn Cấu Hình Firebase

Tài liệu này hướng dẫn cách thiết lập Firebase để đồng bộ dữ liệu lên cloud.

## 📋 Mục Lục

1. [Tạo Firebase Project](#1-tạo-firebase-project)
2. [Cấu Hình Firebase trong Ứng Dụng](#2-cấu-hình-firebase-trong-ứng-dụng)
3. [Thiết Lập Firestore Database](#3-thiết-lập-firestore-database)
4. [Import Dữ Liệu Mẫu](#4-import-dữ-liệu-mẫu)
5. [Sử Dụng Firebase trong Code](#5-sử-dụng-firebase-trong-code)

## 1. Tạo Firebase Project

### Bước 1: Truy cập Firebase Console
1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Đăng nhập bằng tài khoản Google
3. Click **"Add project"** (Thêm dự án)

### Bước 2: Tạo Project Mới
1. Nhập tên project: `pho-viet` (hoặc tên tùy chọn)
2. Click **Continue** (Tiếp tục)
3. Tắt Google Analytics nếu không cần (hoặc để bật)
4. Click **Create project** (Tạo dự án)
5. Chờ vài giây để Firebase tạo project

### Bước 3: Thêm Web App
1. Trong Firebase Console, click vào biểu tượng **Web** `</>`
2. Đặt tên app: `Pho Viet Web`
3. **Không** chọn Firebase Hosting (chưa cần)
4. Click **Register app** (Đăng ký ứng dụng)
5. Copy thông tin cấu hình Firebase config

## 2. Cấu Hình Firebase trong Ứng Dụng

### Bước 1: Tạo File Environment Variables

Tạo file `.env.local` trong thư mục gốc của project:

```bash
cp .env.local.example .env.local
```

### Bước 2: Điền Thông Tin Firebase

Mở file `.env.local` và điền thông tin từ Firebase Console:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=pho-viet-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=pho-viet-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=pho-viet-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**Lưu ý:** 
- File `.env.local` đã được thêm vào `.gitignore` để bảo mật
- Không commit file này lên Git
- Mỗi môi trường (dev, staging, production) nên có file riêng

## 3. Thiết Lập Firestore Database

### Bước 1: Tạo Firestore Database
1. Trong Firebase Console, chọn **Firestore Database** từ menu bên trái
2. Click **Create database** (Tạo cơ sở dữ liệu)
3. Chọn **Start in production mode** (khuyến nghị) hoặc **test mode**
4. Chọn location gần nhất (ví dụ: `asia-southeast1` cho Việt Nam)
5. Click **Enable** (Kích hoạt)

### Bước 2: Cấu Hình Security Rules

Trong tab **Rules**, thêm rules sau:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Menu items - Cho phép đọc công khai, chỉ admin mới được ghi
    match /menuItems/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Orders - Cho phép tạo mới công khai, chỉ admin và chủ đơn được đọc/cập nhật
    match /orders/{document} {
      allow create: if true;
      allow read: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }
  }
}
```

**Lưu ý:** Đây là rules cơ bản. Trong production, nên thêm xác thực và phân quyền chi tiết hơn.

### Bước 3: Tạo Collections và Indexes

Firebase sẽ tự động tạo collections khi bạn thêm dữ liệu lần đầu. Tuy nhiên, bạn có thể tạo sẵn:

1. Click **Start collection**
2. Collection ID: `menuItems`
3. Thêm document đầu tiên hoặc skip
4. Lặp lại cho collection `orders`

**Tạo Composite Indexes (Quan trọng!):**

Truy cập tab **Indexes** và tạo các index sau:

1. **Index cho Orders theo Status và Time:**
   - Collection: `orders`
   - Fields: `status` (Ascending), `createdAt` (Descending)
   
2. **Index cho Orders theo Table và Time:**
   - Collection: `orders`
   - Fields: `tableNumber` (Ascending), `createdAt` (Descending)

## 4. Import Dữ Liệu Mẫu

### Cách 1: Sử Dụng Script Import (Khuyến nghị)

Tạo file `scripts/import-data.ts`:

```typescript
import { initializeMenuData } from '../lib/init-firebase-data';

async function main() {
  await initializeMenuData();
  console.log('Done!');
  process.exit(0);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
```

Chạy script:

```bash
npx ts-node scripts/import-data.ts
```

### Cách 2: Import Thủ Công qua Console

1. Truy cập Firestore Console
2. Chọn collection `menuItems`
3. Click **Add document**
4. Điền dữ liệu từ file `lib/menu-data.ts`

### Cách 3: Sử Dụng Admin Panel

1. Chạy ứng dụng: `npm run dev`
2. Truy cập `/admin`
3. Thêm từng món ăn qua giao diện

## 5. Sử Dụng Firebase trong Code

### Import Functions

```typescript
// Menu operations
import { 
  getMenuItems, 
  addMenuItem, 
  updateMenuItem, 
  deleteMenuItem,
  subscribeToMenuItems 
} from '@/lib/firebase-menu';

// Order operations
import { 
  createOrder, 
  getOrders, 
  updateOrderStatus,
  subscribeToOrders 
} from '@/lib/firebase-orders';
```

### Ví Dụ: Lấy Menu Items

```typescript
// Lấy một lần
const items = await getMenuItems();

// Lắng nghe real-time
const unsubscribe = subscribeToMenuItems((items) => {
  setMenuItems(items);
});

// Cleanup
return () => unsubscribe();
```

### Ví Dụ: Tạo Order

```typescript
const order = {
  tableNumber: 1,
  items: cartItems,
  totalAmount: 150000,
  status: 'pending' as const,
  createdAt: new Date(),
  customerName: 'Nguyen Van A'
};

const orderId = await createOrder(order);
```

### Ví Dụ: Lắng Nghe Orders Real-time

```typescript
useEffect(() => {
  const unsubscribe = subscribeToOrders((orders) => {
    setOrders(orders);
  });

  return () => unsubscribe();
}, []);
```

## 📊 Cấu Trúc Dữ Liệu Firebase

### Collection: `menuItems`

```typescript
{
  id: string,                  // Auto-generated by Firebase
  name: string,                // "Phở Bò Tái"
  nameEn: string,              // "Rare Beef Pho"
  description: string,         // Mô tả món
  price: number,               // 65000
  category: string,            // "Phở", "Bún", "Khai Vị", "Đồ Uống"
  imageUrl: string,            // URL ảnh món
  available: boolean           // true/false
}
```

### Collection: `orders`

```typescript
{
  id: string,                  // Auto-generated by Firebase
  tableNumber: number,         // Số bàn
  items: OrderItem[],          // Danh sách món
  totalAmount: number,         // Tổng tiền
  status: string,              // 'pending' | 'preparing' | 'ready' | 'completed'
  createdAt: Timestamp,        // Thời gian tạo
  customerName?: string        // Tên khách (optional)
}
```

## 🔒 Bảo Mật

### Best Practices

1. **Không bao giờ commit `.env.local`**
2. **Sử dụng Security Rules nghiêm ngặt**
3. **Enable App Check** để chống bot
4. **Thiết lập Authentication** cho admin
5. **Giới hạn API calls** để tránh lạm dụng
6. **Sử dụng Environment Variables** cho production

### Thiết Lập Authentication (Optional)

```typescript
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
await signInWithEmailAndPassword(auth, email, password);
```

## 🚀 Deploy và Production

### Environment Variables trên Vercel

1. Truy cập Vercel Dashboard
2. Chọn project
3. Settings → Environment Variables
4. Thêm từng biến từ `.env.local`

### Optimize Firestore

1. **Sử dụng Indexes** cho queries phức tạp
2. **Limit queries** với pagination
3. **Cache data** ở client khi có thể
4. **Sử dụng offline persistence** cho mobile

## 📚 Tài Liệu Tham Khảo

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Next.js with Firebase](https://firebase.google.com/docs/web/setup#next.js)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)

## ❓ Troubleshooting

### Lỗi: "Firebase App named '[DEFAULT]' already exists"
**Giải pháp:** Đảm bảo chỉ initialize Firebase một lần. Code hiện tại đã xử lý case này.

### Lỗi: "Missing or insufficient permissions"
**Giải pháp:** Kiểm tra Security Rules trong Firestore Console.

### Lỗi: "Index not found"
**Giải pháp:** Tạo composite indexes theo hướng dẫn ở Bước 3.

### Data không realtime
**Giải pháp:** Đảm bảo sử dụng `subscribeToX()` functions thay vì `getX()`.

## 💡 Tips

1. **Development:** Sử dụng Firebase Emulator để test local
2. **Testing:** Tạo separate project cho testing
3. **Monitoring:** Enable Firebase Analytics để theo dõi usage
4. **Backup:** Set up automated backups cho Firestore
5. **Cost:** Monitor usage để tránh vượt quá free tier

---

**Chúc bạn triển khai thành công! 🎉**

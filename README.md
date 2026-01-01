# 🍜 Phở Việt - Hệ Thống Quản Lý Quán Phở

App quản lý quán phở hiện đại với đặt món bằng QR code, POS, và màn hình bếp.

## ✨ Tính Năng

### 📱 Menu Khách Hàng (Customer Menu)
- **Đặt món qua QR Code**: Khách hàng quét mã QR tại bàn để truy cập menu
- **Giao diện thân thiện**: Thiết kế hiện đại, dễ sử dụng cho mọi lứa tuổi
- **Danh mục món ăn**: Phân loại theo Phở, Bún, Khai Vị, Đồ Uống
- **Giỏ hàng thông minh**: Quản lý đơn hàng, điều chỉnh số lượng dễ dàng
- **Hóa đơn điện tử**: Tự động tạo và tải xuống hình ảnh hóa đơn sau khi đặt món
- **Hiển thị song ngữ**: Tiếng Việt và Tiếng Anh

### 💰 POS - Hệ Thống Điểm Bán
- **Quản lý đơn hàng**: Theo dõi trạng thái đơn hàng theo thời gian thực
- **Thống kê nhanh**: Hiển thị số đơn đang chờ, đang nấu, sẵn sàng
- **Tổng doanh thu**: Tính toán tự động tổng doanh thu
- **In hóa đơn**: Chức năng in đơn hàng cho bếp và khách
- **Cập nhật trạng thái**: Chuyển đổi trạng thái đơn hàng dễ dàng

### 👨‍🍳 Màn Hình Bếp (Kitchen Display)
- **Hiển thị đơn hàng**: 3 cột theo trạng thái (Chờ xử lý, Đang nấu, Sẵn sàng)
- **Thông tin đầy đủ**: Số bàn, số đơn, thời gian chờ
- **Cảnh báo thời gian**: Mã màu theo thời gian (xanh < 5 phút, vàng < 10 phút, đỏ > 10 phút)
- **Giao diện tối**: Dễ nhìn trong môi trường bếp
- **Cập nhật tự động**: Đếm thời gian tự động

### ⚙️ Quản Lý Menu (Admin)
- **Thêm/Sửa/Xóa món**: Quản lý menu dễ dàng
- **Tạo QR Code**: Tự động tạo mã QR cho từng bàn
- **Tải xuống QR Code**: Lưu mã QR để in và dán tại bàn
- **Bật/Tắt món**: Đánh dấu món hết/còn một cách nhanh chóng
- **Tích hợp AI**: Hướng dẫn tích hợp AI xóa nền và tối ưu ảnh món ăn

## 🚀 Cài Đặt

### Yêu Cầu
- Node.js 18+ 
- npm hoặc yarn

### Các Bước Cài Đặt

1. Clone repository:
```bash
git clone https://github.com/nthminh/Pho-Viet.git
cd Pho-Viet
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy development server:
```bash
npm run dev
```

4. Mở trình duyệt và truy cập:
- Trang chủ: http://localhost:3000
- Menu khách (bàn 1): http://localhost:3000/menu/1
- POS: http://localhost:3000/pos
- Bếp: http://localhost:3000/kitchen
- Quản lý: http://localhost:3000/admin

## 📦 Build Production

```bash
npm run build
npm start
```

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **UI Components**: Lucide React Icons
- **QR Code**: qrcode.react
- **Screenshot**: html2canvas

## 📖 Hướng Dẫn Sử Dụng

### Cho Khách Hàng
1. Quét mã QR tại bàn ăn
2. Chọn món từ menu
3. Thêm vào giỏ hàng và điều chỉnh số lượng
4. Nhập tên (tùy chọn) và gửi đơn hàng
5. Nhận hóa đơn điện tử (có thể tải xuống)

### Cho Nhân Viên POS
1. Xem danh sách đơn hàng theo thời gian thực
2. Cập nhật trạng thái đơn (Chờ → Đang nấu → Sẵn sàng → Hoàn thành)
3. In đơn hàng khi cần
4. Theo dõi doanh thu

### Cho Bếp
1. Xem đơn hàng mới trong cột "Chờ xử lý"
2. Click "Bắt đầu nấu" khi bắt đầu làm món
3. Click "Hoàn thành" khi món đã sẵn sàng
4. Theo dõi thời gian chờ của từng đơn

### Cho Quản Lý
1. Thêm món mới với thông tin đầy đủ
2. Tải ảnh món ăn (có thể tích hợp AI xóa nền)
3. Tạo mã QR cho các bàn
4. Bật/tắt món theo tình trạng nguyên liệu

## 🎨 Tính Năng AI Xử Lý Ảnh

Hệ thống hỗ trợ tích hợp AI để xử lý ảnh món ăn:
- **Xóa nền tự động**: Sử dụng API như remove.bg
- **Điều chỉnh màu sắc**: Tối ưu độ sáng, độ tương phản
- **Cắt và căn chỉnh**: Tự động khung hình chuẩn
- **Tối ưu kích thước**: Giảm dung lượng file

## 📱 Screenshots

### Trang Chủ
![Home Page](https://github.com/user-attachments/assets/20b493f5-b691-4b64-b9cf-31d9fdbf03f7)

### Menu Khách Hàng
![Menu Page](https://github.com/user-attachments/assets/7b217470-3a2a-49f8-8b9d-b43cde904f56)

### Giỏ Hàng
![Cart Modal](https://github.com/user-attachments/assets/a4ca3230-f80a-4fd5-b7fd-3442e04c21b8)

### Hóa Đơn
![Receipt](https://github.com/user-attachments/assets/764709f0-317f-496a-a83e-4454d5f46233)

### POS
![POS System](https://github.com/user-attachments/assets/4b9c372d-de56-47ef-8411-25ccdacc7127)

### Màn Hình Bếp
![Kitchen Display](https://github.com/user-attachments/assets/be62405b-9dbc-43f8-9bff-8b370909dcb3)

### Quản Lý Menu
![Admin Panel](https://github.com/user-attachments/assets/657c6d9e-f154-4579-960f-8fa079f0a716)

## 🔮 Tính Năng Tương Lai

- [ ] Backend API với database thực
- [ ] Xác thực người dùng
- [ ] Báo cáo thống kê chi tiết
- [ ] Tích hợp thanh toán online
- [ ] Quản lý nhân viên và ca làm việc
- [ ] Đánh giá và phản hồi khách hàng
- [ ] Tích hợp in hóa đơn nhiệt
- [ ] Mobile app (iOS/Android)

## 📄 License

MIT License

## 👨‍💻 Tác Giả

Phở Việt Restaurant Management System 

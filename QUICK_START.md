# 🎯 Quick Start Guide - Deploy Phở Việt

**Mục đích:** Đưa app Phở Việt lên web để mọi người có thể truy cập và test

---

## 🚀 Cách Nhanh Nhất (5 phút)

### Bước 1: Chuẩn bị Firebase

1. Tạo Firebase project: https://console.firebase.google.com
2. Thêm Web app vào project
3. Copy 6 thông số Firebase config

### Bước 2: Deploy lên Vercel

1. Click: [![Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nthminh/Pho-Viet)
2. Login bằng GitHub
3. Paste 6 thông số Firebase vào Environment Variables:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
4. Click "Deploy"

### Bước 3: Test App

Sau 2-3 phút, bạn sẽ có URL: `https://pho-viet-xxxxx.vercel.app`

Test các trang:
- ✅ `/` - Trang chủ
- ✅ `/menu/1` - Menu khách (bàn 1)
- ✅ `/pos` - POS
- ✅ `/kitchen` - Bếp
- ✅ `/admin` - Quản lý

---

## 🎨 Các Tùy Chọn Deploy

```
┌─────────────────────────────────────────────────────────────┐
│                   CHỌN PLATFORM DEPLOY                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. VERCEL (Khuyến Nghị) ⭐                                 │
│     • Miễn phí, không cần thẻ                               │
│     • Dễ nhất - chỉ cần click và paste config              │
│     • Auto deploy mỗi khi push code                         │
│     • Performance tốt nhất cho Next.js                      │
│     → Phù hợp: Ai cũng nên dùng                            │
│                                                             │
│  2. NETLIFY                                                 │
│     • Miễn phí, tương tự Vercel                            │
│     • Giao diện đơn giản, dễ dùng                          │
│     • Tốt cho người mới                                     │
│     → Phù hợp: Thay thế nếu không thích Vercel             │
│                                                             │
│  3. FIREBASE HOSTING                                        │
│     • Miễn phí (có giới hạn)                               │
│     • Tất cả ở một nơi (DB + Hosting)                      │
│     • Cần setup phức tạp hơn                               │
│     → Phù hợp: Đã quen với Firebase                        │
│                                                             │
│  4. VPS/SERVER                                              │
│     • Tốn phí (~$5-50/tháng)                               │
│     • Phức tạp, cần kiến thức Linux                        │
│     • Kiểm soát tối đa                                      │
│     → Phù hợp: Doanh nghiệp, cần customize                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Checklist Trước Khi Deploy

```
Chuẩn bị:
☐ Code đã push lên GitHub
☐ Đã tạo Firebase project
☐ Đã có 6 giá trị Firebase config
☐ Test build local OK: npm run build

Deploy:
☐ Chọn platform (Vercel/Netlify/Firebase/VPS)
☐ Connect với GitHub repository
☐ Thêm Environment Variables
☐ Click Deploy

Sau Deploy:
☐ Test trang chủ
☐ Test menu khách
☐ Test POS
☐ Test kitchen display
☐ Test admin panel
☐ Check Firebase connection
☐ Check real-time sync
```

---

## 🆘 Cần Trợ Giúp?

### Đọc Tài Liệu:
- **Hướng dẫn chi tiết:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Checklist đầy đủ:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Sửa lỗi:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Cấu hình Firebase:** [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

### Lỗi Thường Gặp:

**1. `npm install` lỗi peer dependency**
```bash
npm install --legacy-peer-deps
```

**2. Build lỗi "Module not found"**
```bash
npm install --legacy-peer-deps
npm run build
```

**3. Deploy OK nhưng app không chạy**
→ Kiểm tra Environment Variables đã thêm chưa

**4. Data không load**
→ Kiểm tra Firebase Security Rules

---

## 🎓 Workflow Đầy Đủ

```
1. LOCAL DEVELOPMENT
   ↓
   • Clone repo
   • npm install --legacy-peer-deps
   • Copy .env.local.example → .env.local
   • Điền Firebase config
   • npm run dev
   • Test tại localhost:3000

2. SETUP FIREBASE
   ↓
   • Tạo project
   • Enable Firestore
   • Setup Security Rules
   • Import dữ liệu mẫu
   • Copy config values

3. DEPLOY TO WEB
   ↓
   • Push code lên GitHub
   • Connect với hosting platform
   • Add Environment Variables
   • Deploy
   • Nhận public URL

4. TESTING & SHARING
   ↓
   • Test tất cả features
   • Share URL với team
   • Thu thập feedback
   • Fix bugs nếu có
```

---

## ⏱️ Timeline Dự Kiến

| Task | Thời Gian |
|------|-----------|
| Setup Firebase | 10 phút |
| Test local | 5 phút |
| Deploy lên Vercel | 5 phút |
| Testing sau deploy | 5 phút |
| **TỔNG** | **~25 phút** |

---

## 💡 Tips Pro

1. **Luôn test local trước khi deploy**
   ```bash
   npm run build && npm start
   ```

2. **Dùng staging environment**
   - Deploy branch `develop` → Preview URL
   - Deploy branch `main` → Production URL

3. **Enable auto-deploy**
   - Push code → Tự động deploy
   - Không cần deploy thủ công

4. **Backup Firebase data**
   ```bash
   # Export data trước khi thay đổi lớn
   ```

5. **Monitor logs**
   - Xem logs thường xuyên sau deploy
   - Fix lỗi ngay khi phát hiện

---

## 🎉 Sau Khi Deploy Thành Công

### Share với Team:
- 📱 Menu khách: `https://your-app.vercel.app/menu/1`
- 💰 POS: `https://your-app.vercel.app/pos`
- 👨‍🍳 Bếp: `https://your-app.vercel.app/kitchen`
- ⚙️ Admin: `https://your-app.vercel.app/admin`

### Tạo QR Code:
1. Vào admin panel: `https://your-app.vercel.app/admin`
2. Scroll xuống phần "Tạo QR Code cho bàn"
3. Tạo và download QR code cho từng bàn
4. In và dán QR code tại mỗi bàn ăn

### Next Steps:
- [ ] Setup custom domain (optional)
- [ ] Enable monitoring/analytics
- [ ] Add more features
- [ ] Scale based on usage

---

## 📞 Support

- **GitHub Issues:** https://github.com/nthminh/Pho-Viet/issues
- **Documentation:** Xem các file .md trong repo
- **Firebase Support:** https://firebase.google.com/support
- **Vercel Support:** https://vercel.com/support

---

**Happy Deploying! 🚀**

*Made with ❤️ for Phở Việt Restaurant Management System*

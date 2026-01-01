# ✅ Deployment Checklist

Sử dụng checklist này để đảm bảo deployment thành công.

## Pre-Deployment

### Code & Repository
- [ ] Code đã được test đầy đủ trên local
- [ ] Chạy `npm run build` thành công
- [ ] Chạy `npm start` và test các trang chính
- [ ] Không có lỗi trong console
- [ ] Code đã được push lên Git repository

### Firebase Configuration
- [ ] Đã tạo Firebase project
- [ ] Đã enable Firestore Database
- [ ] Đã cấu hình Security Rules
- [ ] Đã import dữ liệu menu mẫu (chạy `npx ts-node scripts/import-data.ts`)
- [ ] Đã test Firebase connection trên local

### Environment Variables
- [ ] File `.env.local` đã được tạo và cấu hình đúng
- [ ] Đã có đầy đủ 6 biến Firebase:
  - [ ] NEXT_PUBLIC_FIREBASE_API_KEY
  - [ ] NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  - [ ] NEXT_PUBLIC_FIREBASE_PROJECT_ID
  - [ ] NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  - [ ] NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  - [ ] NEXT_PUBLIC_FIREBASE_APP_ID
- [ ] Đã verify các giá trị từ Firebase Console

## Deployment Process

### Vercel Deployment
- [ ] Đã tạo tài khoản Vercel
- [ ] Đã connect GitHub repository với Vercel
- [ ] Đã import project vào Vercel
- [ ] Build đầu tiên đã thành công (có thể bỏ qua lỗi thiếu env vars)
- [ ] Đã thêm tất cả Environment Variables vào Vercel
- [ ] Đã chọn "All" cho environments (Production, Preview, Development)
- [ ] Đã redeploy sau khi thêm environment variables
- [ ] Deployment thành công (status: Ready)

### Netlify Deployment (Alternative)
- [ ] Đã tạo tài khoản Netlify
- [ ] Đã connect GitHub repository với Netlify
- [ ] Đã cấu hình Build settings (build command, publish directory)
- [ ] Đã thêm Environment Variables
- [ ] Deployment thành công

### Firebase Hosting (Alternative)
- [ ] Đã cài Firebase CLI (`npm i -g firebase-tools`)
- [ ] Đã login (`firebase login`)
- [ ] Đã init hosting (`firebase init hosting`)
- [ ] Đã cấu hình `next.config.js` cho static export
- [ ] Build thành công (`npm run build`)
- [ ] Deploy thành công (`firebase deploy --only hosting`)

### VPS/Server (Alternative)
- [ ] Đã cài Node.js 18+
- [ ] Đã cài PM2
- [ ] Đã clone repository
- [ ] Đã cài dependencies (`npm install`)
- [ ] Đã tạo file `.env.local` trên server
- [ ] Build thành công (`npm run build`)
- [ ] App đang chạy với PM2
- [ ] Đã cấu hình Nginx reverse proxy
- [ ] Đã cài SSL certificate (nếu có domain)

## Post-Deployment Testing

### Basic Functionality
- [ ] Trang chủ load thành công
- [ ] Menu khách hàng hiển thị đúng (test với `/menu/1`)
- [ ] Có thể thêm món vào giỏ hàng
- [ ] Có thể đặt món thành công
- [ ] POS hiển thị đơn hàng mới
- [ ] Kitchen display hiển thị đơn hàng
- [ ] Admin panel load thành công

### Firebase Integration
- [ ] Dữ liệu menu load từ Firebase
- [ ] Tạo order mới lưu vào Firebase
- [ ] Real-time sync hoạt động (đặt món ở menu, thấy ngay ở POS/Kitchen)
- [ ] Cập nhật status order hoạt động
- [ ] Không có lỗi Firebase trong console

### Performance & Security
- [ ] Page load time < 3 giây
- [ ] Images load đúng
- [ ] SSL certificate hoạt động (HTTPS)
- [ ] Mobile responsive
- [ ] Không có security warnings trong browser

### URLs to Test
Replace `your-app-url` with your actual deployment URL:
- [ ] `https://your-app-url` - Trang chủ
- [ ] `https://your-app-url/menu/1` - Menu bàn 1
- [ ] `https://your-app-url/menu/5` - Menu bàn 5
- [ ] `https://your-app-url/pos` - POS system
- [ ] `https://your-app-url/kitchen` - Kitchen display
- [ ] `https://your-app-url/admin` - Admin panel

## Configuration & Optimization

### Domain Setup (Optional)
- [ ] Đã mua domain
- [ ] Đã cấu hình DNS records
- [ ] Domain đã trỏ đúng về hosting
- [ ] SSL certificate cho custom domain hoạt động
- [ ] Test domain hoạt động

### Monitoring & Analytics
- [ ] Đã setup error tracking (Sentry, etc.)
- [ ] Đã enable Firebase Analytics
- [ ] Đã setup monitoring/alerting
- [ ] Đã document deployment URL cho team

### Documentation
- [ ] Đã update README với production URL
- [ ] Đã document environment variables
- [ ] Đã document deployment process cho team
- [ ] Đã backup Firebase config

## Common Issues Checklist

### Build Failures
- [ ] Check Node.js version (cần 18+)
- [ ] Run `npm install` để update dependencies
- [ ] Check for TypeScript errors
- [ ] Verify `next.config.js` syntax

### Firebase Connection Issues
- [ ] Verify tất cả environment variables đã đúng
- [ ] Check Firebase Security Rules
- [ ] Verify Firebase API keys active
- [ ] Check Firestore indexes created

### Deployment Issues
- [ ] Clear build cache và rebuild
- [ ] Check hosting platform status
- [ ] Verify billing/quota limits
- [ ] Check logs for specific errors

## Success Criteria

✅ **Deployment thành công khi:**
- [ ] App accessible qua public URL
- [ ] Tất cả trang chính hoạt động
- [ ] Firebase integration hoạt động
- [ ] Real-time sync hoạt động
- [ ] Không có critical errors trong logs
- [ ] Performance chấp nhận được (load < 3s)

## Next Steps After Successful Deployment

### Short Term
- [ ] Share URL với team/khách hàng để test
- [ ] Thu thập feedback
- [ ] Monitor logs và errors
- [ ] Fix các issues phát hiện

### Long Term
- [ ] Setup staging environment
- [ ] Implement CI/CD pipeline
- [ ] Add monitoring & alerting
- [ ] Setup automated backups
- [ ] Plan for scaling

## Emergency Rollback

Nếu deployment có vấn đề nghiêm trọng:

### Vercel/Netlify
- [ ] Vào Deployments tab
- [ ] Chọn deployment trước đó working
- [ ] Click "Promote to Production"

### Firebase Hosting
- [ ] Run `firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live`

### VPS/Server
- [ ] `pm2 stop pho-viet`
- [ ] `git checkout <previous-working-commit>`
- [ ] `npm install`
- [ ] `npm run build`
- [ ] `pm2 restart pho-viet`

---

**Note:** Checklist này nên được review và update sau mỗi lần deployment để phản ánh đúng process hiện tại.

**Last Updated:** 2026-01-01

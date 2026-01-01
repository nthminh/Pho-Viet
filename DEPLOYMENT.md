# 🚀 Hướng Dẫn Deploy Ứng Dụng Phở Việt

Tài liệu này hướng dẫn chi tiết cách deploy ứng dụng Phở Việt lên các nền tảng hosting để chạy thử nghiệm hoặc production.

## 📋 Mục Lục

1. [Deploy lên Vercel (Khuyến Nghị)](#1-deploy-lên-vercel-khuyến-nghị)
2. [Deploy lên Netlify](#2-deploy-lên-netlify)
3. [Deploy lên Firebase Hosting](#3-deploy-lên-firebase-hosting)
4. [Deploy trên VPS/Server Tự Quản](#4-deploy-trên-vpsserver-tự-quản)
5. [Cấu Hình Environment Variables](#5-cấu-hình-environment-variables)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Deploy lên Vercel (Khuyến Nghị) ⭐

Vercel là nền tảng tốt nhất cho Next.js app với zero-config deployment và miễn phí cho personal projects.

### Ưu Điểm:
- ✅ **Miễn phí** cho personal projects
- ✅ **Zero-config** - Tự động nhận diện Next.js
- ✅ **Deploy tự động** từ Git
- ✅ **SSL certificate** miễn phí
- ✅ **Global CDN** - Load nhanh toàn cầu
- ✅ **Preview deployments** cho mỗi PR
- ✅ **Serverless Functions** built-in

### Bước 1: Chuẩn Bị

1. Đảm bảo code đã được push lên GitHub repository
2. Có tài khoản Vercel (đăng ký miễn phí tại [vercel.com](https://vercel.com))
3. Đã cấu hình Firebase theo [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

### Bước 2: Import Project vào Vercel

#### Cách 1: Qua Vercel Dashboard (Dễ nhất)

1. Truy cập [vercel.com](https://vercel.com) và đăng nhập
2. Click **"Add New..."** → **"Project"**
3. Chọn **"Import Git Repository"**
4. Chọn repository `nthminh/Pho-Viet` (hoặc fork của bạn)
5. Click **"Import"**

#### Cách 2: Qua Vercel CLI (Nâng Cao)

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login vào Vercel
vercel login

# Deploy project
cd /path/to/Pho-Viet
vercel
```

### Bước 3: Cấu Hình Project

Vercel sẽ tự động nhận diện Next.js. Giữ nguyên các setting mặc định:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

Click **"Deploy"** (chưa cần thêm Environment Variables - làm ở bước tiếp)

### Bước 4: Thêm Environment Variables

1. Sau khi deploy xong, vào **Project Settings** → **Environment Variables**
2. Thêm các biến sau (lấy từ Firebase Console):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

3. Chọn **Environment:** All (Production, Preview, Development)
4. Click **"Save"**

### Bước 5: Redeploy với Environment Variables

1. Vào tab **"Deployments"**
2. Click vào deployment mới nhất
3. Click menu **"..."** → **"Redeploy"**
4. Chọn **"Use existing Build Cache"** → **"Redeploy"**

### Bước 6: Truy Cập App

Sau khi deploy xong, bạn sẽ có URL dạng: `https://pho-viet.vercel.app`

Các trang chính:
- Trang chủ: `https://pho-viet.vercel.app`
- Menu khách (bàn 1): `https://pho-viet.vercel.app/menu/1`
- POS: `https://pho-viet.vercel.app/pos`
- Bếp: `https://pho-viet.vercel.app/kitchen`
- Quản lý: `https://pho-viet.vercel.app/admin`

### Bước 7: Custom Domain (Tùy Chọn)

1. Vào **Project Settings** → **Domains**
2. Thêm domain của bạn (ví dụ: `pho-viet.com`)
3. Cấu hình DNS theo hướng dẫn của Vercel
4. Vercel tự động cấp SSL certificate

### Auto Deploy từ Git

Vercel tự động deploy mỗi khi bạn push code:
- **Push to main branch** → Deploy to Production
- **Push to other branches** → Deploy to Preview URL
- **Open Pull Request** → Tạo Preview deployment

---

## 2. Deploy lên Netlify

Netlify là lựa chọn thay thế tốt cho Vercel, cũng miễn phí và dễ dùng.

### Bước 1: Chuẩn Bị

1. Tạo tài khoản tại [netlify.com](https://netlify.com)
2. Push code lên GitHub

### Bước 2: Import Site

1. Click **"Add new site"** → **"Import an existing project"**
2. Chọn **GitHub** và authorize
3. Chọn repository `Pho-Viet`

### Bước 3: Cấu Hình Build

```
Build command: npm run build
Publish directory: .next
```

### Bước 4: Thêm Environment Variables

Trong **Site settings** → **Environment variables**, thêm các biến Firebase giống Vercel.

### Bước 5: Deploy

Click **"Deploy site"** và chờ vài phút.

### Bước 6: Cấu Hình Next.js cho Netlify

Tạo file `netlify.toml` trong thư mục gốc:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Cài đặt plugin:

```bash
npm install -D @netlify/plugin-nextjs
```

Push lên Git, Netlify sẽ tự động redeploy.

---

## 3. Deploy lên Firebase Hosting

Phù hợp nếu bạn đã dùng Firebase cho database và muốn host mọi thứ ở một nơi.

### Bước 1: Cài Đặt Firebase CLI

```bash
npm install -g firebase-tools
```

### Bước 2: Login vào Firebase

```bash
firebase login
```

### Bước 3: Khởi Tạo Firebase Hosting

```bash
cd /path/to/Pho-Viet
firebase init hosting
```

Chọn các options:
- Select Firebase project của bạn
- Public directory: `out`
- Configure as single-page app: **No**
- Set up automatic builds with GitHub: **Yes** (optional)

### Bước 4: Cấu Hình Next.js cho Static Export

Thêm vào `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

**Lưu ý:** Static export có một số hạn chế:
- Không dùng được API Routes
- Không dùng được Image Optimization
- Không dùng được ISR (Incremental Static Regeneration)

### Bước 5: Build và Deploy

```bash
# Build app
npm run build

# Deploy lên Firebase
firebase deploy --only hosting
```

### Bước 6: Truy Cập App

URL sẽ có dạng: `https://your-project-id.web.app`

### Tự Động Deploy với GitHub Actions

Tạo file `.github/workflows/firebase-deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
          NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
          NEXT_PUBLIC_FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}
          
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

---

## 4. Deploy trên VPS/Server Tự Quản

Phù hợp nếu bạn muốn kiểm soát hoàn toàn server hoặc có nhu cầu custom đặc biệt.

### Yêu Cầu:
- VPS/Server chạy Ubuntu 20.04+ hoặc Debian 11+
- Có quyền root hoặc sudo
- Domain name (tùy chọn)

### Bước 1: Cài Đặt Node.js

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Cài Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version
npm --version
```

### Bước 2: Cài Đặt PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### Bước 3: Clone Repository

```bash
# Clone code
git clone https://github.com/nthminh/Pho-Viet.git
cd Pho-Viet

# Install dependencies
npm install
```

### Bước 4: Cấu Hình Environment Variables

```bash
# Tạo file .env.local
nano .env.local
```

Thêm các biến Firebase (như ở trên).

### Bước 5: Build và Start App

```bash
# Build production
npm run build

# Start với PM2
pm2 start npm --name "pho-viet" -- start

# Auto start on reboot
pm2 startup
pm2 save
```

### Bước 6: Cài Đặt Nginx (Reverse Proxy)

```bash
# Cài Nginx
sudo apt install -y nginx

# Tạo config
sudo nano /etc/nginx/sites-available/pho-viet
```

Thêm config:

```nginx
server {
    listen 80;
    server_name your-domain.com;  # Thay bằng domain hoặc IP của bạn

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/pho-viet /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Bước 7: Cài SSL với Let's Encrypt (Tùy Chọn)

```bash
# Cài Certbot
sudo apt install -y certbot python3-certbot-nginx

# Lấy SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto renew
sudo certbot renew --dry-run
```

### Bước 8: Truy Cập App

- HTTP: `http://your-domain.com` hoặc `http://your-ip`
- HTTPS: `https://your-domain.com` (sau khi cài SSL)

### Quản Lý PM2

```bash
# Xem status
pm2 status

# Xem logs
pm2 logs pho-viet

# Restart app
pm2 restart pho-viet

# Stop app
pm2 stop pho-viet

# Monitor
pm2 monit
```

---

## 5. Cấu Hình Environment Variables

### Lấy Firebase Config

1. Truy cập [Firebase Console](https://console.firebase.google.com)
2. Chọn project của bạn
3. Click biểu tượng ⚙️ → **Project settings**
4. Scroll xuống phần **"Your apps"**
5. Chọn Web app (hoặc tạo mới nếu chưa có)
6. Copy các giá trị từ `firebaseConfig`

### Format Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=pho-viet-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=pho-viet-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=pho-viet-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### Thêm Variables trên Các Platform

#### Vercel:
Project Settings → Environment Variables → Add

#### Netlify:
Site settings → Environment variables → Add variable

#### GitHub Actions:
Repository → Settings → Secrets and variables → Actions → New repository secret

---

## 6. Troubleshooting

### Lỗi: "Firebase is not defined"

**Nguyên nhân:** Chưa cấu hình Environment Variables

**Giải pháp:**
1. Kiểm tra file `.env.local` (local)
2. Kiểm tra Environment Variables trên hosting platform
3. Đảm bảo tên biến có prefix `NEXT_PUBLIC_`
4. Redeploy sau khi thêm variables

### Lỗi: "Build failed" trên Vercel/Netlify

**Nguyên nhân:** Dependencies hoặc build errors

**Giải pháp:**
```bash
# Test build locally
npm run build

# Fix dependencies
npm install
npm audit fix
```

### App Chậm sau khi Deploy

**Giải pháp:**
1. Enable caching ở Nginx
2. Optimize images
3. Use CDN cho static assets
4. Enable compression (gzip/brotli)

### Firebase Connection Issues

**Giải pháp:**
1. Kiểm tra Firebase Security Rules
2. Kiểm tra Firebase quota/billing
3. Verify API keys đúng
4. Check Firestore indexes

### SSL Certificate Issues (VPS)

**Giải pháp:**
```bash
# Renew certificate
sudo certbot renew

# Check certificate
sudo certbot certificates

# Restart Nginx
sudo systemctl restart nginx
```

---

## 📊 So Sánh Các Phương Án Deploy

| Tiêu Chí | Vercel | Netlify | Firebase Hosting | VPS |
|----------|--------|---------|------------------|-----|
| **Độ Khó** | ⭐ Dễ nhất | ⭐ Dễ | ⭐⭐ Trung bình | ⭐⭐⭐ Khó |
| **Giá** | Miễn phí | Miễn phí | Miễn phí (limit) | $5-50+/tháng |
| **Performance** | Rất tốt | Rất tốt | Tốt | Tùy VPS |
| **Auto Deploy** | ✅ Yes | ✅ Yes | ⚠️ Cần setup | ❌ Manual |
| **SSL** | ✅ Free | ✅ Free | ✅ Free | ⚠️ Setup |
| **Serverless** | ✅ Yes | ✅ Yes | ⚠️ Limited | ❌ No |
| **Customize** | ⚠️ Limited | ⚠️ Limited | ⚠️ Limited | ✅ Full |
| **Scaling** | ✅ Auto | ✅ Auto | ✅ Auto | ⚠️ Manual |

## 🎯 Khuyến Nghị

### Cho Người Mới:
→ **Dùng Vercel** - Dễ nhất, tốt nhất cho Next.js

### Cho Người Đã Dùng Firebase:
→ **Dùng Vercel + Firebase** - Tách riêng hosting và database

### Cho Doanh Nghiệp:
→ **VPS** - Kiểm soát tối đa, customize cao

### Cho Testing Nhanh:
→ **Vercel** - Deploy trong 5 phút

---

## 🔗 Tài Nguyên Hữu Ích

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io)

---

## 💡 Tips để Deploy Thành Công

1. **Test local trước**: Chạy `npm run build` và `npm start` local trước khi deploy
2. **Backup dữ liệu**: Backup Firebase data trước khi thay đổi
3. **Monitor logs**: Xem logs thường xuyên sau deploy
4. **Use staging**: Tạo staging environment để test trước production
5. **Document changes**: Ghi chú mọi thay đổi configuration

---

## ✅ Checklist Deploy

- [ ] Code đã push lên Git
- [ ] Firebase đã cấu hình
- [ ] Environment variables đã chuẩn bị
- [ ] Test build local thành công
- [ ] Chọn platform deploy
- [ ] Deploy lần đầu
- [ ] Thêm environment variables
- [ ] Redeploy với variables
- [ ] Test tất cả trang chính
- [ ] Setup custom domain (nếu có)
- [ ] Enable SSL
- [ ] Setup monitoring
- [ ] Document URL cho team

---

**Chúc bạn deploy thành công! 🎉**

Nếu gặp vấn đề, hãy check phần Troubleshooting hoặc tạo issue trên GitHub.

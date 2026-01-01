# 🛠️ Troubleshooting Guide - Phở Việt App

Common issues and solutions when deploying or running the Phở Việt application.

## Installation Issues

### Issue: `npm install` fails with peer dependency conflicts

**Error message:**
```
Could not resolve dependency:
peer eslint@">=9.0.0" from eslint-config-next
Conflicting peer dependency: eslint@9.39.2
```

**Solution:**
Use the `--legacy-peer-deps` flag:
```bash
npm install --legacy-peer-deps
```

**Why:** There's a peer dependency conflict between eslint versions. This is a known issue with Next.js 14 and eslint-config-next.

---

## Build Issues

### Issue: Build fails with "Module not found" errors

**Error messages:**
```
Module not found: Can't resolve 'lucide-react'
Module not found: Can't resolve 'qrcode.react'
Module not found: Can't resolve 'html2canvas'
Module not found: Can't resolve 'autoprefixer'
```

**Solution:**
Install all required dependencies:
```bash
npm install --legacy-peer-deps
```

The required dependencies should already be in `package.json`, but if they're missing, install them manually:
```bash
npm install lucide-react qrcode.react html2canvas autoprefixer @types/qrcode.react --legacy-peer-deps
```

---

### Issue: Build succeeds but app doesn't work on deployed site

**Symptoms:**
- Blank page
- "Firebase is not defined" error in console
- Data not loading

**Solution:**
Add Firebase environment variables to your hosting platform:
1. Go to your hosting platform's dashboard (Vercel/Netlify/etc.)
2. Navigate to Environment Variables settings
3. Add all required variables (see [DEPLOYMENT.md](./DEPLOYMENT.md#5-cấu-hình-environment-variables))
4. Redeploy the application

---

## Firebase Issues

### Issue: "Firebase App named '[DEFAULT]' already exists"

**Solution:**
This is already handled in the code. If you still see this error:
1. Clear your browser cache
2. Restart the dev server
3. Check if Firebase is initialized multiple times in your code

---

### Issue: "Missing or insufficient permissions"

**Error in console:**
```
FirebaseError: Missing or insufficient permissions
```

**Solution:**
Update Firebase Security Rules:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Firestore Database → Rules
4. Update rules (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md#bước-2-cấu-hình-security-rules))
5. Click "Publish"

**Basic rules for testing (NOT for production):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Warning:** The above rules allow all access. Use proper security rules for production!

---

### Issue: "Index not found" or slow queries

**Error in console:**
```
The query requires an index
```

**Solution:**
1. Click on the error link in console - it will take you to Firebase Console
2. Firebase will show a "Create Index" button
3. Click it and wait for index to be created (1-5 minutes)
4. Refresh your app

---

## Deployment Issues

### Issue: Vercel deployment succeeds but site shows errors

**Solution 1: Check Environment Variables**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify all Firebase variables are added
3. Make sure they're set for "All" environments (Production, Preview, Development)
4. Redeploy

**Solution 2: Check Build Logs**
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the failed/problematic deployment
3. Check the build logs for specific errors
4. Fix the error and push code again

---

### Issue: "This page could not be found" on deployed site

**Symptoms:**
- Home page works
- Other pages show 404

**Solution:**
This shouldn't happen with Next.js App Router, but if it does:
1. Check if pages exist in the `app` directory
2. Clear Vercel cache: Settings → Clear Cache → Redeploy
3. Check `next.config.js` - make sure `output: 'export'` is NOT set (unless intentional)

---

### Issue: Images not loading on deployed site

**Solution 1: Use external image hosting**
Upload images to Firebase Storage or other CDN and use the URLs.

**Solution 2: Configure Next.js image domains**
Add to `next.config.js`:
```javascript
module.exports = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}
```

---

## Performance Issues

### Issue: App loads slowly

**Solutions:**

1. **Enable caching:**
   - Images should be optimized
   - Use Next.js Image component
   - Enable CDN on your hosting platform

2. **Optimize Firebase queries:**
   - Limit query results
   - Use pagination
   - Add proper indexes

3. **Check Firebase quota:**
   - Go to Firebase Console → Usage
   - Make sure you haven't exceeded free tier limits

---

## Development Issues

### Issue: Hot reload not working in development

**Solution:**
```bash
# Stop the dev server (Ctrl+C)
# Clear .next directory
rm -rf .next
# Restart dev server
npm run dev
```

---

### Issue: TypeScript errors

**Error messages:**
```
Type 'X' is not assignable to type 'Y'
```

**Solution:**
Most TypeScript errors in this project are related to Firebase types. If you see errors:
1. Make sure Firebase is properly initialized
2. Check if you're using the correct types
3. You can use `// @ts-ignore` as a temporary fix (not recommended for production)

---

## SSL/HTTPS Issues (VPS/Server)

### Issue: SSL certificate not working

**Solution:**
```bash
# Renew certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates

# Restart Nginx
sudo systemctl restart nginx
```

---

### Issue: Mixed content warnings (HTTP resources on HTTPS site)

**Solution:**
Make sure all resources (images, scripts, etc.) use HTTPS URLs, not HTTP.

---

## Environment Variable Issues

### Issue: Environment variables not working

**Checklist:**
- [ ] Variable names start with `NEXT_PUBLIC_` (for client-side access)
- [ ] Variables are added in hosting platform (not just `.env.local`)
- [ ] Redeployed after adding variables
- [ ] Variables have no quotes around values
- [ ] No spaces before/after `=` sign

**Example of correct format:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXX
```

**Example of incorrect format:**
```
NEXT_PUBLIC_FIREBASE_API_KEY = "AIzaSyXXXXXX"  ❌
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyXXXXXX"    ❌
```

---

## Testing Issues

### Issue: Cannot test app locally

**Solution:**
```bash
# Make sure dependencies are installed
npm install --legacy-peer-deps

# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local with your Firebase credentials
nano .env.local  # or use any text editor

# Run dev server
npm run dev

# Open browser
open http://localhost:3000
```

---

## Database Issues

### Issue: Data not syncing in real-time

**Solution:**
1. Check if you're using `subscribeToX()` functions, not `getX()`
2. Verify Firebase connection
3. Check browser console for errors
4. Make sure Firebase listeners are properly set up

---

### Issue: Old data still showing after update

**Solution:**
```bash
# Clear browser cache
# Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

# Or in browser console:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

---

## Need More Help?

1. **Check the logs:**
   - Browser console (F12)
   - Vercel/Netlify deployment logs
   - Firebase Console → Usage and logs

2. **Search for the error:**
   - Copy the exact error message
   - Search on Google/Stack Overflow
   - Check [Next.js documentation](https://nextjs.org/docs)
   - Check [Firebase documentation](https://firebase.google.com/docs)

3. **Create an issue:**
   - Go to [GitHub repository](https://github.com/nthminh/Pho-Viet/issues)
   - Create a new issue with:
     - Error message
     - Steps to reproduce
     - Screenshots if applicable
     - Environment (OS, browser, Node version)

---

## Quick Commands Reference

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run dev server
npm run dev

# Build production
npm run build

# Run production build locally
npm start

# Check for issues
npm run lint

# Import Firebase data
npx ts-node scripts/import-data.ts

# Update dependencies
npm update

# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

---

**Last Updated:** 2026-01-01

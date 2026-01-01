# Scripts Directory

This directory contains utility scripts for the Phở Việt application.

## Available Scripts

### `import-data.ts`

Import initial menu data into Firebase Firestore.

**Usage:**
```bash
npx ts-node scripts/import-data.ts
```

**Prerequisites:**
- Firebase project must be created
- `.env.local` file must be configured with Firebase credentials
- See [FIREBASE_SETUP.md](../FIREBASE_SETUP.md) for setup instructions

**What it does:**
- Initializes menu items in Firestore
- Creates initial categories (Phở, Bún, Khai Vị, Đồ Uống)
- Adds sample dishes with prices and images

## Notes

- All scripts require TypeScript to be installed
- Make sure to configure environment variables before running scripts
- Scripts are designed to be run from the project root directory

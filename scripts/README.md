# Scripts

## seed-products.js

This script seeds sample products to your Firestore database.

### Setup

1. Download your Firebase service account key:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save it as `serviceAccountKey.json` in the project root

2. Install dependencies (if not already installed):
   ```bash
   npm install firebase-admin
   ```

3. Run the script:
   ```bash
   node scripts/seed-products.js
   ```

**Note:** Make sure `serviceAccountKey.json` is in your `.gitignore` file to avoid committing sensitive credentials.


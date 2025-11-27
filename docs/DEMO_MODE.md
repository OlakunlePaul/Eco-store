# Demo Mode Guide

The Eco Store app is designed to run immediately without any backend configuration. This makes it perfect for:
- Quick demos
- Frontend development
- Testing UI components
- Learning React patterns

## How Demo Mode Works

### 🔥 Firebase Not Configured
When Firebase credentials are missing or invalid:
- **Products**: Uses mock product data from `src/mockData.js`
- **Authentication**: Simulates login with a demo user
- **User State**: Stored in React context (session only)

### 🛒 Cart Management
- Cart data stored in browser's `localStorage`
- Persists between page refreshes
- Clears when browser data is cleared

### 👤 Authentication
- Login/Register buttons work but use demo credentials
- Creates a mock user: `demo@example.com`
- All protected routes accessible
- Google OAuth shows alert (not functional in demo mode)

### 💳 Checkout
- Checkout page loads but payment won't process
- Backend server required for Stripe integration
- Shows UI and validation logic

## Demo Mode Indicators

When running in demo mode, you'll see:

1. **Console Messages**:
   ```
   ⚠️ Firebase not configured. Running in demo mode.
   Using mock products (demo mode)
   ```

2. **Blue Banner** on Home page:
   ```
   Demo Mode: You're viewing sample products. 
   Configure Firebase in .env.local to use real data.
   ```

3. **Login Alerts**:
   ```
   Demo mode: Logging you in as a demo user. 
   Set up Firebase for real authentication.
   ```

## Mock Data

### Products (8 sample products)
- Organic Cotton T-Shirt - $29.99
- Bamboo Water Bottle - $24.99
- Reusable Shopping Bag - $12.99
- Solar-Powered Phone Charger - $49.99
- Hemp Backpack - $79.99
- Organic Coffee Beans - $18.99
- Beeswax Food Wraps - $19.99
- Wooden Phone Case - $34.99

### Demo User
```javascript
{
  uid: 'demo-user',
  email: 'demo@example.com',
  displayName: 'Demo User',
  photoURL: null
}
```

## Switching to Production Mode

### 1. Set Up Firebase

Create a Firebase project and add credentials to `.env.local`:

```env
VITE_FIREBASE_API_KEY=your_actual_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 2. Add Products to Firestore

Run the seed script:
```bash
node scripts/seed-products.js
```

Or manually add products in Firebase Console.

### 3. Enable Authentication

In Firebase Console:
1. Go to Authentication → Sign-in method
2. Enable Email/Password
3. Enable Google

### 4. Set Up Stripe (Optional)

Add to `.env.local`:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
VITE_STRIPE_API_URL=http://localhost:5001/create-checkout-session
```

Start backend server:
```bash
cd server
npm run dev
```

## Development Tips

### Testing Features Without Backend

✅ **Can test without backend:**
- Product listing and filtering
- Product detail pages
- Adding/removing from cart
- Cart page and quantity updates
- Navigation and routing
- Responsive design
- UI components

❌ **Requires backend:**
- Real user registration
- Google OAuth
- Stripe payments
- Order history (from Firestore)
- Cart sync across devices

### Adding More Mock Products

Edit `src/mockData.js` and add products to the `mockProducts` array:

```javascript
{
  id: 'mock-9',
  name: 'Your Product',
  description: 'Product description',
  price: 29.99,
  image: 'https://images.unsplash.com/...',
  category: 'your-category',
  stock: 50
}
```

## Troubleshooting Demo Mode

### Products Not Showing
- Check browser console for errors
- Verify `src/mockData.js` exists
- Clear browser cache

### Cart Not Persisting
- Check localStorage in browser DevTools
- Ensure localStorage is not disabled
- Look for key: `demo-cart`

### Login Not Working
- In demo mode, login is instant (no backend validation)
- Check if user state updates in React DevTools
- Look for demo user in console

## Limitations of Demo Mode

- No real database (data doesn't persist)
- No real authentication (anyone can "login")
- No payment processing
- No email notifications
- No order history
- Cart only stored locally
- No multi-device sync

For production features, configure Firebase and Stripe!


# 🌱 Eco Store - E-Commerce Platform

A complete, production-ready e-commerce store built with React, Firebase, and Stripe. Features user authentication, product management, shopping cart, and secure payment processing.

## 🚀 Features

- **Authentication**: Email/password and Google OAuth login
- **Product Management**: Browse, search, and filter products
- **Shopping Cart**: Add, remove, and update cart items with Firestore persistence
- **Checkout**: Secure payment processing with Stripe Checkout
- **Order History**: View past orders
- **Responsive Design**: Mobile-first design with TailwindCSS

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Stripe account

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Eco-store
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

**Option A: Firebase Functions (Recommended)**

```bash
cd functions
npm install
cd ..
```

**Option B: Express Server**

```bash
cd server
npm install
cd ..
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Fill in your Firebase and Stripe credentials:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
VITE_STRIPE_API_URL=http://localhost:5001/your-project-id/us-central1/createCheckoutSession
```

### 5. Configure Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password and Google)
3. Create a Firestore database
4. Deploy Firestore security rules:

```bash
firebase deploy --only firestore:rules
```

### 6. Configure Stripe

1. Create a Stripe account at [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys (Test mode for development)
3. Set up webhook endpoint (for production)

**For Firebase Functions:**

```bash
firebase functions:config:set stripe.secret_key="sk_test_your_secret_key"
firebase functions:config:set stripe.webhook_secret="whsec_your_webhook_secret"
```

**For Express Server:**

Add to your server environment:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## 🗄️ Firestore Database Structure

### Collections

**products**
```
{
  name: string,
  description: string,
  price: number,
  originalPrice?: number,
  image: string,
  category: string,
  stock?: number
}
```

**users**
```
{
  email: string,
  displayName: string,
  createdAt: timestamp,
  photoURL: string
}
```

**carts**
```
{
  items: array,
  updatedAt: timestamp
}
```

**orders**
```
{
  userId: string,
  email: string,
  items: array,
  total: number,
  status: string,
  stripeSessionId: string,
  createdAt: timestamp
}
```

## 🚀 Running the Application

### Development Mode

**Frontend:**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

**Backend (Firebase Functions):**
```bash
cd functions
npm run serve
```

**Backend (Express Server):**
```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## 🧪 Testing

Run tests with:

```bash
npm test
```

## 📝 Adding Sample Products

You can add sample products to Firestore manually or use the Firebase Console. Here's an example product structure:

```javascript
{
  name: "Organic Cotton T-Shirt",
  description: "100% organic cotton, sustainably sourced",
  price: 29.99,
  originalPrice: 39.99,
  image: "https://example.com/image.jpg",
  category: "clothing",
  stock: 50
}
```

## 🔒 Security Rules

The Firestore security rules are configured in `firestore.rules`:

- Products: Read-only for authenticated users
- Users: Users can only access their own document
- Carts: Users can only access their own cart
- Orders: Users can only read their own orders

Deploy rules with:
```bash
firebase deploy --only firestore:rules
```

## 🎨 Customization

- **Styling**: Modify `src/index.css` and Tailwind classes in components
- **Theme**: Update colors in `tailwind.config.js`
- **Components**: All components are in `src/components/`
- **Pages**: All pages are in `src/pages/`

## 📦 Project Structure

```
Eco-store/
├── src/
│   ├── components/       # Reusable components
│   ├── context/          # React Context providers
│   ├── pages/           # Page components
│   ├── api/             # API utilities
│   ├── firebase.js      # Firebase configuration
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── functions/           # Firebase Cloud Functions
├── server/              # Express server (alternative)
├── public/              # Static assets
└── package.json         # Dependencies
```

## 🐛 Troubleshooting

### Firebase Authentication Issues
- Ensure Authentication is enabled in Firebase Console
- Check that Email/Password and Google providers are enabled
- Verify environment variables are correct

### Stripe Checkout Issues
- Verify Stripe API keys are correct
- Check CORS settings on backend
- Ensure webhook endpoint is configured (for production)

### Firestore Permission Errors
- Deploy security rules: `firebase deploy --only firestore:rules`
- Check user authentication status
- Verify rules match your data structure

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.


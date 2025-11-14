# Project Structure

Complete file structure of the Eco Store e-commerce application.

## Root Files

```
Eco-store/
├── package.json                 # Frontend dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # TailwindCSS configuration
├── postcss.config.js           # PostCSS configuration
├── vitest.config.js            # Vitest test configuration
├── firebase.json               # Firebase project configuration
├── firestore.rules             # Firestore security rules
├── firestore.indexes.json      # Firestore indexes
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML entry point
├── README.md                   # Main documentation
├── WEBHOOK_SETUP.md            # Stripe webhook setup guide
└── PROJECT_STRUCTURE.md         # This file
```

## Source Files (src/)

```
src/
├── main.jsx                     # React entry point
├── App.jsx                      # Main app component with routing
├── index.css                    # Global styles with Tailwind
├── firebase.js                  # Firebase initialization
├── api/
│   └── stripe.js                # Stripe API utilities
├── context/
│   ├── AuthContext.jsx          # Authentication context
│   └── CartContext.jsx          # Shopping cart context
├── components/
│   ├── Navbar.jsx               # Navigation bar component
│   ├── ProductCard.jsx          # Product card component
│   └── ProtectedRoute.jsx       # Route protection component
├── pages/
│   ├── Home.jsx                 # Product listing page
│   ├── Product.jsx              # Product detail page
│   ├── Cart.jsx                 # Shopping cart page
│   ├── Checkout.jsx             # Checkout page
│   ├── Login.jsx                # Login page
│   ├── Register.jsx             # Registration page
│   └── Orders.jsx               # Order history page
└── __tests__/
    ├── setup.js                 # Test setup configuration
    ├── ProductCard.test.jsx     # ProductCard tests
    └── Navbar.test.jsx          # Navbar tests
```

## Backend Files

### Firebase Functions

```
functions/
├── package.json                 # Functions dependencies
└── index.js                    # Cloud Functions (Stripe checkout & webhook)
```

### Express Server (Alternative)

```
server/
├── package.json                # Server dependencies
└── index.js                   # Express server (Stripe checkout & webhook)
```

## Scripts

```
scripts/
├── seed-products.js            # Script to seed sample products
└── README.md                   # Scripts documentation
```

## Public Assets

```
public/
└── vite.svg                    # Vite logo
```

## Environment Files

```
.env.local.example              # Environment variables template
```

## Key Features by File

### Authentication
- `src/context/AuthContext.jsx` - Handles login, signup, Google OAuth
- `src/pages/Login.jsx` - Login page
- `src/pages/Register.jsx` - Registration page

### Product Management
- `src/pages/Home.jsx` - Product listing with search/filter
- `src/pages/Product.jsx` - Product detail page
- `src/components/ProductCard.jsx` - Reusable product card

### Shopping Cart
- `src/context/CartContext.jsx` - Global cart state with Firestore sync
- `src/pages/Cart.jsx` - Cart management page

### Checkout & Payments
- `src/pages/Checkout.jsx` - Checkout page
- `src/api/stripe.js` - Stripe API client
- `functions/index.js` or `server/index.js` - Backend checkout handler

### Orders
- `src/pages/Orders.jsx` - Order history page
- Webhook handlers in backend create orders automatically

### Styling
- `src/index.css` - Global styles with TailwindCSS
- Tailwind utility classes used throughout components

## Configuration Files Explained

- **firebase.json**: Firebase project configuration
- **firestore.rules**: Security rules for Firestore collections
- **vite.config.js**: Vite build tool configuration
- **tailwind.config.js**: TailwindCSS customization
- **vitest.config.js**: Test runner configuration


# Quick Start Guide

Get the Eco Store running in minutes without any configuration!

## Option 1: Run Locally (No Configuration Required)

The app will run with mock data and without authentication.

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000` with sample products!

## Option 2: With Docker Backend

Run the backend in Docker for API testing (Stripe/Firebase still optional).

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Start Backend with Docker

```bash
docker-compose up -d
```

### 3. Start Frontend

```bash
npm run dev
```

## What Works Without Configuration

✅ **Browse Products** - View sample products  
✅ **Product Details** - See individual product pages  
✅ **Search & Filter** - Test filtering functionality  
✅ **Cart UI** - Add items to cart (stored in memory)  
✅ **Responsive Design** - All pages are fully responsive

## What Requires Configuration

❌ **User Authentication** - Requires Firebase setup  
❌ **Cart Persistence** - Requires Firebase + login  
❌ **Orders** - Requires Firebase + login  
❌ **Payments** - Requires Stripe + Firebase setup

## Configure Later (Optional)

When you're ready to enable full features:

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password + Google)
4. Create Firestore database
5. Copy your config to `.env` file

### 2. Add Stripe Keys

1. Create account at [Stripe](https://stripe.com)
2. Get test API keys
3. Add to `.env` file

### 3. Configure Environment

Copy `.env` to create your configuration:

```bash
# The .env file already exists with empty values
# Just fill in your keys when ready
```

See `README.md` for detailed configuration instructions.

## Docker Commands

```bash
# Start backend
docker-compose up -d

# Stop backend
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after code changes
docker-compose up -d --build
```

## Troubleshooting

### Port Already in Use

Frontend (3000) or backend (5001) port occupied:

```bash
# Change frontend port in vite.config.js
# Change backend port in docker-compose.yml
```

### Mock Data Not Showing

Clear browser cache and refresh the page.

### Docker Issues

```bash
# Remove containers and restart
docker-compose down -v
docker-compose up -d --build
```

## Next Steps

- Browse the mock products
- Test the UI and navigation
- When ready, configure Firebase for real data
- Add Stripe for payment processing
- Deploy to production

Enjoy exploring the Eco Store! 🌱

# 🏡 Cozy Corner - E-Commerce Platform

A modern, production-ready e-commerce store with a warm, inviting design. Built with React, Firebase, and Stripe.

![Status](https://img.shields.io/badge/status-ready-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-10.7.1-orange)
![Stripe](https://img.shields.io/badge/Stripe-integrated-blueviolet)

---

## ✨ Features

- 🏠 **Warm, Cozy Design** - Feels like shopping from home
- 🔐 **Authentication** - Email/password + Google OAuth
- 🛒 **Smart Cart** - Persistent shopping cart with real-time updates
- 💳 **Secure Payments** - Stripe Checkout integration
- 📦 **Order Tracking** - Complete order history
- 📱 **Responsive** - Beautiful on all devices
- 🚀 **Demo Mode** - Works without any configuration!

---

## 🚀 Quick Start (30 seconds)

```bash
# 1. Install dependencies
npm install

# 2. Start the app
npm run dev
```

**That's it!** Open http://localhost:3000 and start shopping! 🎉

The app runs in demo mode with sample products. No configuration needed!

---

## 📚 Table of Contents

- [Quick Start](#-quick-start-30-seconds)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration-optional)
- [Development](#-development)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **TailwindCSS** - Styling
- **Context API** - State management

### Backend
- **Firebase Auth** - User authentication
- **Firestore** - Database
- **Stripe** - Payment processing
- **Express** - API server (optional)
- **Docker** - Containerization

### Design
- **Playfair Display** - Elegant serif font
- **Inter** - Clean sans-serif
- **Custom Color Palette** - Warm, earthy tones

---

## 📁 Project Structure

```
Cozy-Corner/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── context/         # React Context providers
│   ├── api/             # API utilities
│   ├── mockData.js      # Demo mode data
│   └── firebase.js      # Firebase configuration
├── server/              # Express backend
├── functions/           # Firebase Cloud Functions
├── docs/                # Documentation
├── scripts/             # Utility scripts
└── public/              # Static assets
```

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for detailed structure.

---

## ⚙️ Configuration (Optional)

The app works out-of-the-box in demo mode. Configure for production features:

### 1. Firebase Setup

Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)

```bash
# Create .env file
cp .env.example .env

# Add your Firebase config
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase values
```

### 2. Stripe Setup

Get API keys from [dashboard.stripe.com](https://dashboard.stripe.com/)

```bash
# Add to .env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
```

### 3. Start Backend

**Option A: Docker (Recommended)**
```bash
docker-compose up -d
```

**Option B: Node.js**
```bash
cd server
npm install
npm start
```

**Option C: Firebase Functions**
```bash
cd functions
npm install
firebase deploy --only functions
```

See [docs/QUICK_START.md](docs/QUICK_START.md) for detailed setup.

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm test                 # Run tests
npm run build            # Production build
npm run preview          # Preview build

# Docker
docker-compose up -d     # Start backend
docker-compose down      # Stop backend
docker-compose logs -f   # View logs

# Firebase
firebase deploy          # Deploy all
firebase serve           # Local emulator
```

### Adding Products

**Demo Mode:**
Products are loaded from `src/mockData.js`

**Production:**
```bash
# Seed sample products
node scripts/seed-products.js
```

Or add manually via Firebase Console.

---

## 🌐 Deployment

### Frontend (Vercel/Netlify)

```bash
npm run build
# Deploy the 'dist' folder
```

### Backend

**Docker:**
```bash
docker build -t cozy-corner-backend .
docker push your-registry/cozy-corner-backend
```

**Firebase:**
```bash
firebase deploy --only functions
```

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [Quick Start](docs/QUICK_START.md) | Detailed setup guide |
| [Installation](docs/INSTALLATION_COMPLETE.md) | What's included |
| [Project Structure](docs/PROJECT_STRUCTURE.md) | File organization |
| [Deployment](docs/DEPLOYMENT_SUMMARY.md) | Deploy to production |
| [Webhooks](docs/WEBHOOK_SETUP.md) | Stripe webhook config |
| [Demo Mode](docs/DEMO_MODE.md) | How demo mode works |

---

## 🎨 Design System

### Color Palette

```css
/* Warm Tones */
--warm-500: #FFB784
--warm-600: #FF9F5C

/* Earth Tones */
--earth-500: #B9AA91
--earth-600: #9A8B73

/* Sage Greens */
--sage-500: #9BB99B
--sage-600: #7FA37F
```

### Typography

- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test
npm test ProductCard
```

Tests use Vitest + React Testing Library.

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000
```

### Tailwind Colors Not Working

```bash
# Restart dev server
# Press Ctrl+C, then:
npm run dev
```

### Firebase Not Connecting

- Check `.env` file exists
- Verify API keys are correct
- Restart dev server

See [docs/QUICK_START.md](docs/QUICK_START.md) for more troubleshooting.

---

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

Created with ❤️ for sustainable, cozy shopping experiences.

---

## 🙏 Acknowledgments

- React Team for the amazing framework
- Firebase for backend infrastructure
- Stripe for secure payments
- TailwindCSS for beautiful styling
- Unsplash for product images

---

## 📞 Support

- 📖 [Documentation](docs/)
- 🐛 [Issue Tracker](../../issues)
- 💬 [Discussions](../../discussions)

---

**Built with React • Firebase • Stripe • TailwindCSS**

*Making e-commerce feel like home* 🏡✨

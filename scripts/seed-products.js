/**
 * Script to seed sample products to Firestore
 * Run with: node scripts/seed-products.js
 * Make sure to set up Firebase Admin SDK credentials
 */

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const sampleProducts = [
  {
    name: 'Organic Cotton T-Shirt',
    description: '100% organic cotton t-shirt, sustainably sourced and ethically made. Comfortable fit for everyday wear.',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'clothing',
    stock: 50
  },
  {
    name: 'Bamboo Water Bottle',
    description: 'Eco-friendly bamboo water bottle with stainless steel interior. Keeps drinks cold for 24 hours.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'accessories',
    stock: 30
  },
  {
    name: 'Reusable Shopping Bag',
    description: 'Durable, washable shopping bag made from recycled materials. Holds up to 20kg.',
    price: 12.99,
    originalPrice: 15.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
    category: 'accessories',
    stock: 100
  },
  {
    name: 'Solar-Powered Phone Charger',
    description: 'Portable solar charger for your devices. Charges in direct sunlight or via USB.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500',
    category: 'electronics',
    stock: 25
  },
  {
    name: 'Hemp Backpack',
    description: 'Stylish backpack made from sustainable hemp fiber. Water-resistant and durable.',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'accessories',
    stock: 40
  },
  {
    name: 'Organic Coffee Beans',
    description: 'Fair-trade organic coffee beans. Rich, smooth flavor with notes of chocolate and caramel.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500',
    category: 'food',
    stock: 60
  },
  {
    name: 'Beeswax Food Wraps',
    description: 'Reusable food wraps made from organic cotton and beeswax. Natural alternative to plastic wrap.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1606787619248-f301830a5a57?w=500',
    category: 'food',
    stock: 75
  },
  {
    name: 'Wooden Phone Case',
    description: 'Eco-friendly phone case made from sustainably sourced wood. Protective and stylish.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    category: 'electronics',
    stock: 35
  }
];

async function seedProducts() {
  try {
    console.log('Starting to seed products...');
    
    for (const product of sampleProducts) {
      await db.collection('products').add({
        ...product,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`Added product: ${product.name}`);
    }
    
    console.log('✅ Successfully seeded all products!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();


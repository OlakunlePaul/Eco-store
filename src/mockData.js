// Mock data for development without Firebase

export const mockUser = {
  uid: 'demo-user-123',
  email: 'demo@example.com',
  displayName: 'Demo User',
  photoURL: null
};

export const mockProducts = [
  {
    id: '1',
    name: 'Organic Cotton T-Shirt',
    description: '100% organic cotton t-shirt, sustainably sourced and ethically made. Comfortable fit for everyday wear.',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'clothing',
    stock: 50
  },
  {
    id: '2',
    name: 'Bamboo Water Bottle',
    description: 'Eco-friendly bamboo water bottle with stainless steel interior. Keeps drinks cold for 24 hours.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'accessories',
    stock: 30
  },
  {
    id: '3',
    name: 'Reusable Shopping Bag',
    description: 'Durable, washable shopping bag made from recycled materials. Holds up to 20kg.',
    price: 12.99,
    originalPrice: 15.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
    category: 'accessories',
    stock: 100
  },
  {
    id: '4',
    name: 'Solar-Powered Phone Charger',
    description: 'Portable solar charger for your devices. Charges in direct sunlight or via USB.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500',
    category: 'electronics',
    stock: 25
  },
  {
    id: '5',
    name: 'Hemp Backpack',
    description: 'Stylish backpack made from sustainable hemp fiber. Water-resistant and durable.',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'accessories',
    stock: 40
  },
  {
    id: '6',
    name: 'Organic Coffee Beans',
    description: 'Fair-trade organic coffee beans. Rich, smooth flavor with notes of chocolate and caramel.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500',
    category: 'food',
    stock: 60
  },
  {
    id: '7',
    name: 'Beeswax Food Wraps',
    description: 'Reusable food wraps made from organic cotton and beeswax. Natural alternative to plastic wrap.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1606787619248-f301830a5a57?w=500',
    category: 'food',
    stock: 75
  },
  {
    id: '8',
    name: 'Wooden Phone Case',
    description: 'Eco-friendly phone case made from sustainably sourced wood. Protective and stylish.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    category: 'electronics',
    stock: 35
  }
];

export const mockOrders = [
  {
    id: 'demo-order-1',
    userId: 'demo-user-123',
    email: 'demo@example.com',
    items: [
      {
        id: '1',
        name: 'Organic Cotton T-Shirt',
        price: 29.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
      }
    ],
    total: 59.98,
    status: 'completed',
    createdAt: new Date('2024-01-15')
  }
];

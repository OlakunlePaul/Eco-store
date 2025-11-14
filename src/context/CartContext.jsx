import { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load cart from Firestore when user logs in
  useEffect(() => {
    if (user) {
      loadCartFromFirestore();
    } else {
      setCart([]);
      setLoading(false);
    }
  }, [user]);

  const loadCartFromFirestore = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const cartRef = doc(db, 'carts', user.uid);
      const cartSnap = await getDoc(cartRef);
      
      if (cartSnap.exists()) {
        setCart(cartSnap.data().items || []);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCartToFirestore = async (cartItems) => {
    if (!user) return;
    
    try {
      const cartRef = doc(db, 'carts', user.uid);
      await setDoc(cartRef, {
        items: cartItems,
        updatedAt: new Date()
      }, { merge: true });
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = (product) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let newCart;

      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }

      saveCartToFirestore(newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter(item => item.id !== productId);
      if (user) {
        saveCartToFirestore(newCart);
      }
      return newCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const newCart = prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
      if (user) {
        saveCartToFirestore(newCart);
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    if (user) {
      saveCartToFirestore([]);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


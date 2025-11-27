import { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
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
  const { user, demoMode } = useAuth();

  // Load cart from Firestore when user logs in
  useEffect(() => {
    if (user) {
      if (demoMode || !isFirebaseConfigured || !db) {
        // Demo mode - use localStorage
        loadCartFromLocalStorage();
      } else {
        loadCartFromFirestore();
      }
    } else {
      setCart([]);
      setLoading(false);
    }
  }, [user, demoMode]);

  const loadCartFromLocalStorage = () => {
    try {
      setLoading(true);
      const savedCart = localStorage.getItem('demo-cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCartFromFirestore = async () => {
    if (!user || !db) return;
    
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
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const saveCartToLocalStorage = (cartItems) => {
    try {
      localStorage.setItem('demo-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  const saveCartToFirestore = async (cartItems) => {
    if (!user || !db) return;
    
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
    if (!isFirebaseConfigured) {
      alert('Firebase is not configured. Cart data will not be saved.');
    }
    
    if (!user && isFirebaseConfigured) {
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

      if (demoMode || !isFirebaseConfigured) {
        saveCartToLocalStorage(newCart);
      } else {
        saveCartToFirestore(newCart);
      }
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter(item => item.id !== productId);
      if (user) {
        if (demoMode || !isFirebaseConfigured) {
          saveCartToLocalStorage(newCart);
        } else {
          saveCartToFirestore(newCart);
        }
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
        if (demoMode || !isFirebaseConfigured) {
          saveCartToLocalStorage(newCart);
        } else {
          saveCartToFirestore(newCart);
        }
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    if (user) {
      if (demoMode || !isFirebaseConfigured) {
        saveCartToLocalStorage([]);
      } else {
        saveCartToFirestore([]);
      }
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



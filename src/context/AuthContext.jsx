import { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from '../firebase';
import { mockUser } from '../mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      // Demo mode - no real authentication
      setLoading(false);
      setDemoMode(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && db) {
        // Create or update user document in Firestore
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              email: user.email,
              displayName: user.displayName || '',
              createdAt: new Date(),
              photoURL: user.photoURL || ''
            });
          }
        } catch (error) {
          console.error('Error creating user document:', error);
        }
      }
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    if (!auth || demoMode) {
      alert('Firebase not configured. Running in demo mode. Please set up Firebase to enable authentication.');
      throw new Error('Firebase not configured');
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    if (!auth || demoMode) {
      // Demo mode login
      alert('Demo mode: Logging you in as a demo user. Set up Firebase for real authentication.');
      setUser(mockUser);
      return;
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    if (!auth || !googleProvider || demoMode) {
      alert('Firebase not configured. Running in demo mode. Please set up Firebase to enable Google authentication.');
      setUser(mockUser);
      return;
    }
    return signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    if (demoMode) {
      setUser(null);
      return;
    }
    if (!auth) return;
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    demoMode
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


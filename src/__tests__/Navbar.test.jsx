import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';

// Mock Firebase
vi.mock('../firebase', () => ({
  auth: {},
  db: {},
  googleProvider: {}
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {component}
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  it('renders navigation links', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText('🌱 Eco Store')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('shows login and register links when user is not authenticated', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});


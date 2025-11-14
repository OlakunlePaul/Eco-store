import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
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

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 29.99,
    image: 'https://example.com/image.jpg',
    category: 'test'
  };

  it('renders product information', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('displays discount badge when discount exists', () => {
    const productWithDiscount = {
      ...mockProduct,
      discount: 20
    };
    
    renderWithProviders(<ProductCard product={productWithDiscount} />);
    
    expect(screen.getByText('-20%')).toBeInTheDocument();
  });
});


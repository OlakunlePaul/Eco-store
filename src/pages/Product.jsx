import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const productRef = doc(db, 'products', id);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        setProduct({ id: productSnap.id, ...productSnap.data() });
      } else {
        console.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`${quantity} item(s) added to cart!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.image || 'https://via.placeholder.com/600x600?text=Product'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              
              <div className="mb-4">
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-lg mr-2">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-3xl font-bold text-green-600">
                  ${product.price}
                </span>
              </div>

              {product.category && (
                <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-4">
                  {product.category}
                </span>
              )}

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description || 'No description available.'}
              </p>

              {product.stock !== undefined && (
                <p className="text-sm text-gray-600 mb-4">
                  Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </p>
              )}

              <div className="flex items-center space-x-4 mb-6">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border border-gray-300 rounded py-1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!user || (product.stock !== undefined && product.stock === 0)}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {!user
                  ? 'Login to Add to Cart'
                  : product.stock === 0
                  ? 'Out of Stock'
                  : `Add ${quantity} to Cart - $${(product.price * quantity).toFixed(2)}`
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;


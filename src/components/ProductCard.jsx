import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="card block">
      <div className="relative">
        <img
          src={product.image || 'https://via.placeholder.com/300x300?text=Product'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            -{product.discount}%
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm mr-2">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-xl font-bold text-green-600">
              ${product.price}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            disabled={!user}
          >
            {user ? 'Add to Cart' : 'Login to Buy'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;


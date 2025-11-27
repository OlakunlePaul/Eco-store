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
    <Link to={`/product/${product.id}`} className="card block group card-hover">
      <div className="relative overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/300x300?text=Product'}
          alt={product.name}
          className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        {product.discount && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-warm-500 to-warm-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-warm">
            -{product.discount}% OFF
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-display font-semibold text-earth-900 mb-2 line-clamp-2 group-hover:text-warm-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-earth-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-earth-400 line-through text-xs">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold bg-gradient-to-r from-warm-600 to-warm-500 bg-clip-text text-transparent">
              ${product.price}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-soft hover:shadow-warm transform hover:scale-105"
            disabled={!user}
          >
            {user ? '🛒 Add' : 'Login'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;


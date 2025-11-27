import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-soft sticky top-0 z-50 border-b-2 border-warm-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <span className="text-4xl transform group-hover:scale-110 transition-transform">🏡</span>
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-warm-600 to-sage-600 bg-clip-text text-transparent font-display">
              Cozy Corner
            </span>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              to="/"
              className="text-earth-700 hover:text-warm-600 px-3 py-2 rounded-xl text-sm font-medium transition-all hover:bg-warm-50"
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/orders"
                  className="text-earth-700 hover:text-warm-600 px-3 py-2 rounded-xl text-sm font-medium transition-all hover:bg-warm-50"
                >
                  Orders
                </Link>
                <Link
                  to="/cart"
                  className="relative text-earth-700 hover:text-warm-600 px-3 py-2 rounded-xl text-sm font-medium transition-all hover:bg-warm-50"
                >
                  🛒 Cart
                  {getCartItemsCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-warm-500 to-warm-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-warm animate-pulse">
                      {getCartItemsCount()}
                    </span>
                  )}
                </Link>
                <div className="flex items-center space-x-2 bg-earth-50 rounded-2xl px-4 py-2">
                  <span className="text-sm text-earth-700 hidden md:inline">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm bg-earth-200 hover:bg-earth-300 text-earth-800 px-4 py-2 rounded-xl transition-all"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-earth-700 hover:text-warm-600 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-warm-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


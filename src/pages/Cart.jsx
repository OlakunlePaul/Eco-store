import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, loading } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen pattern-bg py-8 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl shadow-cozy p-12">
          <span className="text-6xl mb-4 block">🛒</span>
          <p className="text-xl text-earth-700 mb-6 font-display">Please login to view your cart</p>
          <Link to="/login" className="btn-primary">
            Sign In to Continue
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pattern-bg">
        <div className="text-center">
          <span className="text-5xl mb-4 block animate-bounce">🛒</span>
          <div className="text-xl text-earth-700">Loading your cart...</div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pattern-bg py-8">
        <div className="section-container">
          <h1 className="page-title text-center">Your Shopping Cart 🛒</h1>
          <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-cozy p-12 text-center">
            <span className="text-7xl mb-4 block">🌿</span>
            <p className="text-2xl text-earth-700 mb-2 font-display">Your cart is empty</p>
            <p className="text-earth-600 mb-6">Time to discover some cozy treasures!</p>
            <Link to="/" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pattern-bg py-8">
      <div className="section-container">
        <h1 className="page-title text-center mb-12">Your Shopping Cart 🛒</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft hover:shadow-cozy transition-shadow p-6 flex flex-col md:flex-row gap-6">
                <img
                  src={item.image || 'https://via.placeholder.com/150?text=Product'}
                  alt={item.name}
                  className="w-full md:w-32 h-32 object-cover rounded-2xl shadow-soft"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-display font-semibold text-earth-900 mb-2">{item.name}</h3>
                  <p className="text-warm-600 font-bold text-lg mb-4">${item.price}</p>
                  
                  <div className="flex items-center space-x-4">
                    <label className="text-earth-700 font-medium">Quantity:</label>
                    <div className="flex items-center space-x-2 bg-earth-50 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-white hover:bg-warm-50 text-earth-700 px-3 py-1 rounded-lg transition-colors shadow-sm"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold text-earth-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-white hover:bg-warm-50 text-earth-700 px-3 py-1 rounded-lg transition-colors shadow-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-warm-600 hover:text-warm-700 font-medium ml-4 transition-colors"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold bg-gradient-to-r from-warm-600 to-warm-500 bg-clip-text text-transparent">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-cozy p-8 sticky top-24">
              <h2 className="text-2xl font-display font-bold text-earth-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-earth-600">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-earth-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-sage-600">Free 🎁</span>
                </div>
                <div className="border-t-2 border-earth-200 pt-4 mt-4">
                  <div className="flex justify-between text-2xl font-bold text-earth-900">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-warm-600 to-warm-500 bg-clip-text text-transparent">
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full btn-primary text-center mb-4"
              >
                Proceed to Checkout 🔒
              </Link>

              <Link
                to="/"
                className="block w-full text-center text-earth-600 hover:text-warm-600 font-medium transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


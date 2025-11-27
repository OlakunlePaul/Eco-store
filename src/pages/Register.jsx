import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to sign up with Google.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pattern-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-cozy p-8 md:p-10">
          <div className="text-center mb-8">
            <span className="text-5xl mb-4 block">🌟</span>
            <h2 className="text-3xl font-display font-bold text-earth-900 mb-2">
              Create Your Cozy Corner
            </h2>
            <p className="text-earth-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-warm-600 hover:text-warm-700 transition-colors">
                Welcome back home
              </Link>
            </p>
          </div>

          {!isFirebaseConfigured && (
            <div className="bg-gradient-to-r from-warm-50 to-sage-50 border-2 border-warm-200 text-earth-700 px-4 py-3 rounded-2xl mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-xl">✨</span>
                <div>
                  <strong className="text-warm-700">Demo Mode:</strong>
                  <span className="text-sm ml-2">Start exploring instantly!</span>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-warm-50 border-2 border-warm-300 text-warm-800 px-4 py-3 rounded-2xl">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-earth-700 mb-2">
                  📧 Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-earth-700 mb-2">
                  🔒 Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="At least 6 characters"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-earth-700 mb-2">
                  ✅ Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating your corner...' : 'Create My Cozy Corner'}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-earth-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-earth-500 font-medium">Or continue with</span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-3 border-2 border-earth-200 rounded-2xl shadow-soft bg-white text-sm font-medium text-earth-700 hover:bg-earth-50 hover:border-warm-300 transition-all disabled:opacity-50"
              >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
                Sign up with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;


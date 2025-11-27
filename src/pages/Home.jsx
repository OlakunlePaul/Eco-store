import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
import { mockProducts } from '../mockData';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, categoryFilter, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      if (!isFirebaseConfigured || !db) {
        // Demo mode - use mock data
        console.log('Using mock products (demo mode)');
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setDemoMode(true);
        setLoading(false);
        return;
      }

      const productsRef = collection(db, 'products');
      const q = query(productsRef);
      const querySnapshot = await getDocs(q);
      
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // If no products in Firebase, use mock data as fallback
      if (productsData.length === 0) {
        console.log('No products in Firebase, using mock data');
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setDemoMode(true);
      } else {
        setProducts(productsData);
        setFilteredProducts(productsData);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to mock data on error
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setDemoMode(true);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  };

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pattern-bg py-12">
      <div className="section-container">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="page-title">
            Welcome to Your Cozy Corner 🏡
          </h1>
          <p className="text-earth-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Discover eco-friendly treasures that make your home feel warm and welcoming
          </p>
        </div>

        {demoMode && (
          <div className="bg-gradient-to-r from-warm-50 to-sage-50 border-2 border-warm-200 text-earth-700 px-6 py-4 rounded-3xl mb-8 shadow-soft">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✨</span>
              <div>
                <strong className="text-warm-700">Demo Mode:</strong>
                <span className="ml-2">You're exploring our sample collection. Configure Firebase to add your own products!</span>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-soft">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
            <input
              type="text"
              placeholder="Search for cozy products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <div className="relative md:w-56">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">📂</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-field pl-12 appearance-none bg-white cursor-pointer"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-earth-600 text-xl mb-2">No products found</p>
            <p className="text-earth-500">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;


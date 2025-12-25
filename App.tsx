
import React, { useState, useMemo } from 'react';
import { Product, Category } from './types';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import SellModal from './components/SellModal';
import ProductDetailsModal from './components/ProductDetailsModal';
import Login from './components/Login';
import Signup from './components/Signup';

const MOCK_DATA: Product[] = [
  {
    id: '1',
    name: 'Arduino Uno R3 - Barely Used',
    price: 1200,
    category: 'Microcontrollers',
    condition: 'Like New',
    description: 'Original Arduino Uno. Used for one semester intro class. Includes USB cable and a sturdy plastic case.',
    image: 'https://picsum.photos/seed/arduino/400/400',
    seller: 'Alex J.',
    postedDate: '2023-10-01',
    whatsapp: '+919876543210',
    linkedin: 'alex-j-maker'
  },
  {
    id: '2',
    name: 'Pack of 65 Jumper Wires',
    price: 250,
    category: 'Components',
    condition: 'New',
    description: 'Assorted lengths, male-to-male. High quality silicone insulation. Never opened.',
    image: 'https://picsum.photos/seed/jumper/400/400',
    seller: 'Sarah W.',
    postedDate: '2023-10-02',
    whatsapp: '+919876543211',
    linkedin: 'sarah-w-engineering'
  },
  {
    id: '3',
    name: 'Ultrasonic Distance Sensor HC-SR04',
    price: 150,
    category: 'Sensors',
    condition: 'Used - Good',
    description: 'Working perfectly. Great for obstacle avoidance robots or automated distance measurement.',
    image: 'https://picsum.photos/seed/sensor/400/400',
    seller: 'Mike T.',
    postedDate: '2023-10-03',
    linkedin: 'mike-tech-student'
  },
  {
    id: '4',
    name: 'Portable Soldering Iron Kit',
    price: 1800,
    category: 'Tools',
    condition: 'Used - Good',
    description: 'Adjustable temperature soldering iron with stand, solder wire, and several replacement tips.',
    image: 'https://picsum.photos/seed/solder/400/400',
    seller: 'Emily R.',
    postedDate: '2023-10-04',
    whatsapp: '+919876543212'
  },
  {
    id: '5',
    name: 'ESP32 Development Board',
    price: 650,
    category: 'Microcontrollers',
    condition: 'Like New',
    description: 'WiFi + Bluetooth enabled. Perfect for IoT projects and web servers. Pins are pre-soldered.',
    image: 'https://picsum.photos/seed/esp32/400/400',
    seller: 'Jason K.',
    postedDate: '2023-10-05',
    whatsapp: '+919876543213',
    linkedin: 'jason-k-iot'
  },
  {
    id: '6',
    name: 'Raspberry Pi 4 (4GB RAM)',
    price: 4500,
    category: 'Microcontrollers',
    condition: 'Used - Good',
    description: 'Includes official power adapter and 32GB SD card. Slightly scratched case but hardware is 100%.',
    image: 'https://picsum.photos/seed/pi4/400/400',
    seller: 'Lisa M.',
    postedDate: '2023-10-06',
    whatsapp: '+919876543214',
    linkedin: 'lisa-m-developer'
  }
];

const CATEGORIES: Category[] = ['All', 'Microcontrollers', 'Sensors', 'Components', 'Tools', 'Kits'];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'signup'>('home');
  const [user, setUser] = useState<any | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleSignup = (userData: any) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={user}
        onSearch={setSearchQuery} 
        onOpenSell={() => {
          if (!user) setCurrentPage('login');
          else setIsSellModalOpen(true);
        }} 
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />

      <main className="flex-grow">
        {currentPage === 'home' && (
          <div className="max-w-7xl mx-auto w-full px-4 py-8">
            {/* Hero Section */}
            <section className="mb-12 bg-indigo-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                  The Campus <br/><span className="text-indigo-400">Maker Market</span>
                </h1>
                <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                  Turn your spare microcontrollers and sensors into cash. Buy affordable components for your next project directly from fellow students in Rupees.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => {
                      if (!user) setCurrentPage('login');
                      else setIsSellModalOpen(true);
                    }}
                    className="bg-white text-indigo-900 font-bold px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors shadow-lg"
                  >
                    Start Selling
                  </button>
                  <button className="bg-indigo-800/50 text-white font-bold px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors border border-indigo-700/50 backdrop-blur-sm">
                    Browse Parts
                  </button>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
              <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[100px] opacity-10"></div>
              <i className="fas fa-microchip absolute right-12 bottom-12 text-[200px] text-white/5 rotate-12 pointer-events-none hidden md:block"></i>
            </section>

            {/* Categories Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border
                    ${selectedCategory === cat 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 shadow-sm'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={setSelectedProduct}
                  />
                ))
              ) : (
                <div className="col-span-full py-24 text-center">
                  <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-search text-slate-400 text-3xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">No components found</h3>
                  <p className="text-slate-500 max-w-xs mx-auto mt-2">Try different keywords or check another category.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentPage === 'login' && (
          <Login onLogin={handleLogin} onNavigate={setCurrentPage} />
        )}

        {currentPage === 'signup' && (
          <Signup onSignup={handleSignup} onNavigate={setCurrentPage} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 text-white p-2 rounded-lg shadow-lg shadow-indigo-100">
                <i className="fas fa-microchip"></i>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">EduSwap Electronics</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
              Sustainable electronics for campus life. Save money on projects and help reduce e-waste by trading within your university community.
            </p>
            <div className="flex gap-5">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><i className="fab fa-twitter"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><i className="fab fa-instagram"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><i className="fab fa-discord"></i></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Marketplace</h4>
            <ul className="space-y-3 text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Browse Components</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Sell an Item</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Safety Rules</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Campus Hubs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Support</h4>
            <ul className="space-y-3 text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Code of Conduct</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Verification</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
          <p>© 2023 EduSwap Electronics. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Accessibility</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SellModal 
        user={user}
        isOpen={isSellModalOpen} 
        onClose={() => setIsSellModalOpen(false)} 
        onAdd={handleAddProduct}
      />

      <ProductDetailsModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default App;

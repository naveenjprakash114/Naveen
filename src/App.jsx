import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import LoginDrawer from './components/LoginDrawer';
import LocationModal from './components/LocationModal';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetails from './pages/ProductDetails';
import DeliveryZonesPage from './pages/DeliveryZonesPage';
import OffersPage from './pages/OffersPage';
import BrandsPage from './pages/BrandsPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import About from './pages/About';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <LocationProvider>
            <ScrollToTop />
            <div className="min-h-screen bg-[#160D22] text-[#B99AD8] flex flex-col font-sans selection:bg-[#D4AF61] selection:text-[#160D22]">
              {/* Global Navbar */}
              <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

              {/* Main Page Viewport */}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/product/:slug" element={<ProductDetails />} />
                  <Route path="/delivery-zones" element={<DeliveryZonesPage />} />
                  <Route path="/offers" element={<OffersPage />} />
                  <Route path="/brands" element={<BrandsPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/track-order" element={<OrderTracking />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>

              {/* Global Overlay Modals & Drawers */}
              <CartDrawer />
              <LoginDrawer />
              <LocationModal />
              <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

              {/* Global Footer */}
              <Footer />
            </div>
          </LocationProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}


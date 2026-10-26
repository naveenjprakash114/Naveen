import React, { useState, useEffect } from 'react';
import { Link, useLocation as useRouteLocation } from 'react-router-dom';
import { MapPin, ShoppingBag, Search, User, Menu, X, Sparkles, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { userLocation, setIsLocationModalOpen, serviceability } = useLocation();
  const { setIsLoginOpen, user } = useAuth();
  const location = useRouteLocation();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Delivery Zones', path: '/delivery-zones' },
    { name: 'Offers', path: '/offers' },
    { name: 'Brands', path: '/brands' },
    { name: 'About', path: '/about' },
  ];

  const isLinkActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-xl py-3 border-b border-[#D4AF61]/30'
            : 'bg-gradient-to-b from-[#160D22]/95 to-transparent py-4'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#271332] to-[#4A2673] border border-[#D4AF61]/40 flex items-center justify-center text-white font-serif text-xl shadow-md group-hover:scale-105 transition-transform">
                🍦
              </div>
              <div className="flex flex-col">
                <span className="font-serif-title font-bold text-xl sm:text-2xl tracking-tight text-[#FFF8F0] group-hover:text-[#D4AF61] transition-colors">
                  VÉLVET SCOOP
                </span>
                <span className="text-[10px] tracking-widest text-[#D4AF61] uppercase font-bold">
                  Salem • Cold Express
                </span>
              </div>
            </Link>

            {/* CENTER: Location Selector Badge (Salem Hub) & Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Location Badge */}
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="glass-card hover:border-[#D4AF61] px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium text-[#B99AD8] transition-all hover:shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D4AF61] animate-bounce" />
                <div className="text-left">
                  <div className="text-[10px] text-[#B99AD8]/70 uppercase tracking-wider font-semibold">
                    Delivering to
                  </div>
                  <div className="font-bold truncate max-w-[130px] text-[#FFF8F0]">
                    {userLocation.locality || userLocation.name}
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-1 ${
                    serviceability?.isServiceable
                      ? 'bg-[#4A2673] text-[#D4AF61] border border-[#D4AF61]/50'
                      : 'bg-[#271332] text-[#B99AD8] border border-[#B99AD8]/40'
                  }`}
                >
                  {serviceability?.isServiceable ? '8–10 Min' : 'Checking'}
                </span>
              </button>

              {/* Nav Links */}
              <nav className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-[#D4AF61] relative py-1 ${
                      isLinkActive(link.path)
                        ? 'text-[#FFF8F0] font-bold'
                        : 'text-[#B99AD8]'
                    }`}
                  >
                    {link.name}
                    {isLinkActive(link.path) && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF61] rounded-full" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* RIGHT: Search, Account, Cart */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Search Flavors"
                className="p-2 rounded-full text-[#B99AD8] hover:text-[#FFF8F0] hover:bg-[#271332] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Account / Customer Login Button */}
              <button
                onClick={() => setIsLoginOpen(true)}
                aria-label="Customer Login"
                className="glass-card hover:bg-[#4A2673]/60 text-[#FFF8F0] hover:text-[#D4AF61] px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 border border-[#D4AF61]/40 transition-all shadow-sm active:scale-95"
                title={user ? `Logged in: ${user.name}` : 'Customer Login'}
              >
                <User className="w-4 h-4 text-[#D4AF61]" />
                <span>{user ? user.name.split(' ')[0] : 'Login'}</span>
                {user && (
                  <span className="w-2 h-2 rounded-full bg-[#D4AF61] animate-pulse ml-0.5" />
                )}
              </button>



              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-gradient-to-r from-[#D4AF61] to-[#b89346] hover:brightness-110 text-[#160D22] px-4 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all transform active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-[#160D22]" />
                <span className="hidden sm:inline">Cart</span>
                {totalItemsCount > 0 && (
                  <span className="bg-[#271332] text-[#D4AF61] text-[11px] font-extrabold px-2 py-0.5 rounded-full min-w-[20px] text-center border border-[#D4AF61]/40">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#B99AD8] hover:bg-[#271332]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-panel border-t border-[#D4AF61]/30 px-4 pt-3 pb-6 mt-3 space-y-3 animate-in slide-in-from-top-2">
            <button
              onClick={() => {
                setIsLocationModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#271332] border border-[#D4AF61]/30 p-3 rounded-xl flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FFF8F0]">
                <MapPin className="w-4 h-4 text-[#D4AF61]" />
                <span>Deliver to: {userLocation.name}</span>
              </div>
              <span className="text-[10px] bg-[#D4AF61] text-[#160D22] px-2 py-0.5 rounded-full font-bold">
                Change
              </span>
            </button>

            <nav className="flex flex-col gap-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isLinkActive(link.path)
                      ? 'bg-[#D4AF61] text-[#160D22] font-bold'
                      : 'text-[#B99AD8] hover:bg-[#271332]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginOpen(true);
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#B99AD8] hover:bg-[#271332] flex items-center gap-2"
              >
                <User className="w-4 h-4 text-[#D4AF61]" />
                <span>{user ? `Account: ${user.name}` : 'Customer Login & Profile'}</span>
              </button>

            </nav>
          </div>
        )}
      </header>
    </>
  );
}

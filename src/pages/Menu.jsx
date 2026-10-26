import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryTabs from '../components/CategoryTabs';
import { products } from '../data/products';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

export default function Menu() {
  const [searchParams] = useSearchParams();
  const initialBrand = searchParams.get('brand') || '';

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (activeCategory !== 'All' && p.category !== activeCategory) return false;
        if (selectedBrand && p.brand !== selectedBrand) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.flavor.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewsCount - a.reviewsCount; // popular
      });
  }, [activeCategory, selectedBrand, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#160D22] text-[#B99AD8] pt-28 pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF61] bg-[#271332] px-3.5 py-1.5 rounded-full border border-[#D4AF61]/30 inline-block mb-3">
            SUB-ZERO SALEM CATALOG
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#FFF8F0]">
            OUR ICE CREAM MENU
          </h1>
          <p className="mt-3 text-[#B99AD8] text-sm sm:text-base">
            Explore 100% cold-chain guaranteed scoops, artisanal sundaes, and tubs.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-[#D4AF61]/30 bg-[#271332]/80 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Bar */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF61]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flavors e.g., Truffle, Vanilla, Mango, Sundae..."
                className="w-full bg-[#160D22] border border-[#4A2673] text-[#FFF8F0] placeholder-[#B99AD8]/40 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#D4AF61]"
              />
            </div>

            {/* Brand Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#160D22] border border-[#4A2673] rounded-xl px-3 py-2.5 text-xs text-[#FFF8F0] font-semibold focus:outline-none focus:border-[#D4AF61]"
              >
                <option value="">All Brands & Kitchens</option>
                <option value="Velvet Artisanal">Velvet Artisanal</option>
                <option value="Baskin Robbins">Baskin Robbins</option>
                <option value="Arun Ice Cream">Arun Ice Cream</option>
                <option value="Ibaco">Ibaco</option>
                <option value="Boomerang">Boomerang</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#160D22] border border-[#4A2673] rounded-xl px-3 py-2.5 text-xs text-[#FFF8F0] font-semibold focus:outline-none focus:border-[#D4AF61]"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

          </div>

          {/* Category Tabs */}
          <CategoryTabs activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#271332]/50 rounded-3xl p-8 border border-dashed border-[#D4AF61]/40 text-[#B99AD8]">
            <span className="text-4xl">🍨</span>
            <h3 className="font-serif-title font-bold text-xl text-[#FFF8F0] mt-3">
              No ice cream flavors match your search.
            </h3>
            <p className="text-xs text-[#B99AD8] mt-1">
              Try clearing filters or search for another delicious term.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSelectedBrand('');
                setSearchQuery('');
              }}
              className="mt-4 bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] px-6 py-2.5 rounded-full font-bold text-xs hover:brightness-110 tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

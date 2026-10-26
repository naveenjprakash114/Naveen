import React, { useState } from 'react';
import ProductCard from './ProductCard';
import CategoryTabs from './CategoryTabs';
import { products } from '../data/products';
import { Sparkles, X, Plus, Minus, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/pricing';

export default function ProductGrid({ title = "EXPLORE MENU", showCategories = true, limit = null }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const { addToCart } = useCart();

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  return (
    <section className="py-16 bg-[#160D22]" id="product-menu">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF61] bg-[#271332] px-3.5 py-1.5 rounded-full border border-[#D4AF61]/30 inline-block mb-2">
              SUB-ZERO SALEM MENU
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FFF8F0]">
              {title}
            </h2>
          </div>
          <div className="text-xs text-[#B99AD8] font-medium">
            Showing <strong className="text-[#D4AF61]">{displayedProducts.length}</strong> items • 100% Insulated Guarantee
          </div>
        </div>

        {/* Category Pills */}
        {showCategories && (
          <div className="mb-8">
            <CategoryTabs
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

          {displayedProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickView={(p) => {
                setQuickViewProduct(p);
                setSelectedQty(1);
              }}
            />
          ))}
        </div>

        {/* Quick View Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="glass-panel max-w-2xl w-full rounded-3xl p-6 sm:p-8 bg-[#271332] border border-[#D4AF61]/40 shadow-2xl relative text-[#FFF8F0]">
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#B99AD8] hover:text-white hover:bg-[#4A2673]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="h-64 rounded-2xl overflow-hidden bg-[#160D22] border border-[#4A2673]">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-[#D4AF61]">
                      {quickViewProduct.brand}
                    </span>
                    <span className="text-[#B99AD8]/40">•</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#D4AF61]">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF61] text-[#D4AF61]" />
                      <span>{quickViewProduct.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif-title font-bold text-2xl text-[#FFF8F0]">
                    {quickViewProduct.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#B99AD8] leading-relaxed">
                    {quickViewProduct.description}
                  </p>

                  <div className="flex items-baseline gap-3">
                    <span className="font-serif-title font-extrabold text-2xl text-[#FFF8F0]">
                      {formatINR(quickViewProduct.price)}
                    </span>
                    {quickViewProduct.originalPrice > quickViewProduct.price && (
                      <span className="text-xs text-[#B99AD8]/40 line-through">
                        {formatINR(quickViewProduct.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center border border-[#4A2673] rounded-full px-3 py-1.5 bg-[#160D22]">
                      <button
                        onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                        className="p-1 hover:text-[#D4AF61]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 font-bold text-sm text-[#FFF8F0]">
                        {selectedQty}
                      </span>
                      <button
                        onClick={() => setSelectedQty(selectedQty + 1)}
                        className="p-1 hover:text-[#D4AF61]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(quickViewProduct, selectedQty);
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] py-3 px-6 rounded-full font-bold text-xs hover:brightness-110 shadow-lg tracking-wider"
                    >
                      ADD TO CART • {formatINR(quickViewProduct.price * selectedQty)}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

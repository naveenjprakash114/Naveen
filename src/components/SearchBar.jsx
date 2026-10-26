import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Star, ArrowRight, Tag } from 'lucide-react';
import { products } from '../data/products';
import { formatINR } from '../utils/pricing';

export default function SearchBar({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const results = products.filter((p) => {
    if (!searchTerm.trim()) return false;
    const q = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.flavor.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  });

  const popularTags = ['Belgian Truffle', 'Vanilla', 'Mango', 'Pistachio', 'Sundae', 'Combo'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel max-w-2xl w-full rounded-3xl p-6 bg-[#271332] border border-[#D4AF61]/40 shadow-2xl space-y-4 text-[#FFF8F0]">
        
        {/* Input header */}
        <div className="flex items-center gap-3 border-b border-[#4A2673] pb-3">
          <Search className="w-5 h-5 text-[#D4AF61]" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by flavor, brand, cone, sundae..."
            className="w-full bg-transparent text-base font-medium text-[#FFF8F0] focus:outline-none placeholder:text-[#B99AD8]/40"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#B99AD8] hover:text-white hover:bg-[#4A2673]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Pills */}
        {!searchTerm && (
          <div className="space-y-2 py-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF61] flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-3.5 py-1.5 rounded-full bg-[#160D22] text-xs font-bold text-[#FFF8F0] border border-[#D4AF61]/30 hover:bg-[#D4AF61] hover:text-[#160D22] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        {searchTerm && (
          <div className="max-h-80 overflow-y-auto space-y-3 pt-2">
            {results.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <p className="text-sm font-bold text-[#FFF8F0]">
                  Looks like this scoop has melted away.
                </p>
                <p className="text-xs text-[#B99AD8]">
                  Try searching for "Chocolate", "Vanilla", "Mango", or "Cone".
                </p>
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    navigate(`/product/${product.slug}`);
                  }}
                  className="p-3 rounded-2xl border border-[#4A2673] hover:border-[#D4AF61] hover:bg-[#160D22] cursor-pointer flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover bg-[#160D22]"
                    />
                    <div>
                      <h5 className="font-serif-title font-bold text-sm text-[#FFF8F0]">
                        {product.name}
                      </h5>
                      <span className="text-[11px] text-[#D4AF61] font-semibold">
                        {product.brand} • {product.flavor}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-[#FFF8F0]">
                      {formatINR(product.price)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF61]" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

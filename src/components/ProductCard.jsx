import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Check, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/pricing';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);

  const cartItem = cart.find((i) => i.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="glass-card rounded-3xl p-4 sm:p-5 border border-[#4A2673]/60 hover:border-[#D4AF61] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden bg-[#271332]/90">
      
      {/* Top Badges */}
      <div className="flex items-center justify-between z-10 mb-2">
        {/* Veg Badge */}
        {product.isVeg && (
          <div className="flex items-center gap-1 bg-[#4A2673]/80 text-[#D4AF61] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#D4AF61]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF61]" />
            <span>100% VEG</span>
          </div>
        )}

        {/* Tag / Bestseller Badge */}
        {product.tags && product.tags[0] && (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#4A2673] text-[#D4AF61] px-2.5 py-0.5 rounded-full border border-[#D4AF61]/30">
            {product.tags[0]}
          </span>
        )}
      </div>

      {/* Product Image Container */}
      <div className="relative w-full h-48 sm:h-52 my-2 rounded-2xl overflow-hidden bg-[#160D22] flex items-center justify-center group-hover:scale-102 transition-transform duration-500 border border-[#4A2673]/40">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />

        {/* Quick View Hover Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onQuickView) onQuickView(product);
          }}
          className="absolute inset-0 bg-[#160D22]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs backdrop-blur-xs"
        >
          <div className="bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 font-bold hover:brightness-110 transition-all">
            <Eye className="w-4 h-4 text-[#160D22]" />
            <span>Quick View</span>
          </div>
        </button>
      </div>

      {/* Product Details */}
      <div className="space-y-2 mt-2">
        {/* Brand & Rating */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#D4AF61] font-bold uppercase tracking-wider text-[11px]">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 bg-[#4A2673]/60 px-2 py-0.5 rounded-full text-[#D4AF61] font-bold text-[11px] border border-[#D4AF61]/20">
            <Star className="w-3 h-3 fill-[#D4AF61] text-[#D4AF61]" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.slug}`}
          className="block font-serif-title font-bold text-base sm:text-lg text-[#FFF8F0] hover:text-[#D4AF61] transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Flavor / Description snippet */}
        <p className="text-xs text-[#B99AD8]/80 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Price & Add to Cart Action */}
      <div className="mt-4 pt-3 border-t border-[#4A2673]/80 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif-title font-extrabold text-xl text-[#FFF8F0]">
              {formatINR(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-[#B99AD8]/40 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#D4AF61] font-semibold block">
            Cold-Chain Sealed
          </span>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className={`px-4 py-2.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
            added
              ? 'bg-[#4A2673] text-[#D4AF61] border border-[#D4AF61]'
              : quantityInCart > 0
              ? 'bg-[#4A2673] text-[#D4AF61] border border-[#D4AF61]/40'
              : 'bg-gradient-to-r from-[#D4AF61] to-[#b89346] hover:brightness-110 text-[#160D22]'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 text-[#D4AF61]" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 text-current" />
              <span>{quantityInCart > 0 ? `ADD (${quantityInCart})` : 'ADD'}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}

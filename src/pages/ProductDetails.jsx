import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Star, Plus, Minus, ShoppingBag, ShieldCheck, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/pricing';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.slug === slug || p.id === slug) || products[0];

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#160D22] text-[#B99AD8] pt-28 pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF61] hover:text-[#FFF8F0] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </button>

        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#D4AF61]/30 bg-[#271332]/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-[#FFF8F0]">
          
          {/* LEFT: Product Image */}
          <div className="lg:col-span-6 h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#160D22] relative border border-[#4A2673]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isVeg && (
              <div className="absolute top-4 left-4 bg-[#4A2673] text-[#D4AF61] text-xs font-bold px-3 py-1 rounded-full border border-[#D4AF61]/50 flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#D4AF61]" />
                <span>100% VEGETARIAN</span>
              </div>
            )}
            <div className="absolute bottom-4 right-4 bg-[#271332] text-[#D4AF61] border border-[#D4AF61]/40 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {product.volume}
            </div>
          </div>

          {/* RIGHT: Product Details & Add Action */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF61]">
                  {product.brand} • {product.category}
                </span>
                <div className="flex items-center gap-1 bg-[#160D22] border border-[#D4AF61]/30 px-2.5 py-1 rounded-full text-[#D4AF61] font-bold text-xs">
                  <Star className="w-4 h-4 fill-[#D4AF61] text-[#D4AF61]" />
                  <span>{product.rating} ({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif-title font-bold text-3xl sm:text-4xl text-[#FFF8F0] mt-2">
                {product.name}
              </h1>
              <span className="text-xs font-semibold text-[#B99AD8] block mt-1">
                Flavor profile: <strong className="text-[#D4AF61]">{product.flavor}</strong>
              </span>
            </div>

            <p className="text-sm text-[#B99AD8] leading-relaxed">
              {product.description}
            </p>

            {/* Price section */}
            <div className="flex items-baseline gap-4 pt-2">
              <span className="font-serif-title font-extrabold text-3xl text-[#FFF8F0]">
                {formatINR(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-[#B99AD8]/40 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              <span className="text-xs text-[#D4AF61] font-bold bg-[#4A2673] px-2.5 py-1 rounded-full border border-[#D4AF61]/50">
                Save {formatINR(product.originalPrice - product.price)}
              </span>
            </div>

            {/* Nutrition & Specs */}
            <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#4A2673] text-xs">
              <div>
                <span className="text-[#B99AD8] font-medium block">Energy Value</span>
                <strong className="text-[#FFF8F0]">{product.calories}</strong>
              </div>
              <div>
                <span className="text-[#B99AD8] font-medium block">Cold-Chain Guarantee</span>
                <strong className="text-[#D4AF61]">-22°C Insulated</strong>
              </div>
            </div>

            {/* Quantity Selector & Add Button */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-[#4A2673] rounded-full px-4 py-2 bg-[#160D22] shadow-xs text-[#FFF8F0]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-[#D4AF61]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 font-bold text-base text-[#FFF8F0]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:text-[#D4AF61]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-4 rounded-full font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 tracking-wider ${
                  added ? 'bg-[#4A2673] text-[#D4AF61] border border-[#D4AF61]' : 'bg-gradient-to-r from-[#D4AF61] to-[#b89346] hover:brightness-110 text-[#160D22]'
                }`}
              >
                {added ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-[#D4AF61]" />
                    <span>ADDED TO CART!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-[#160D22]" />
                    <span>ADD TO CART • {formatINR(product.price * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-[#B99AD8] flex items-center gap-2 pt-2">
              <Clock className="w-4 h-4 text-[#D4AF61]" />
              <span>Delivered in 8–10 minutes within Salem 5 km service hubs.</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

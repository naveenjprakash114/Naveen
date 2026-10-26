import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, Tag, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { formatINR, calculateOrderSummary } from '../utils/pricing';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, appliedCoupon, setAppliedCoupon } = useCart();
  const { userLocation, serviceability } = useLocation();
  const navigate = useNavigate();

  const summary = calculateOrderSummary(cart, appliedCoupon);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#160D22] text-[#B99AD8] pt-28 pb-20 flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 rounded-full bg-[#271332] border border-[#D4AF61]/30 flex items-center justify-center text-5xl mb-4 shadow-inner">
          🍦
        </div>
        <h2 className="font-serif-title font-bold text-3xl text-[#FFF8F0]">
          YOUR CONE IS WAITING.
        </h2>
        <p className="text-[#B99AD8] text-sm mt-2 max-w-sm">
          Your cart is currently empty. Explore our Belgian dark chocolate truffle cones and signature sundaes!
        </p>
        <button
          onClick={() => navigate('/menu')}
          className="mt-6 bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] px-8 py-3.5 rounded-full font-bold text-sm shadow-lg hover:brightness-110 transition-all tracking-wider"
        >
          EXPLORE ICE CREAM
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#160D22] text-[#B99AD8] pt-28 pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-serif-title font-bold text-[#FFF8F0] mb-6 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-[#D4AF61]" />
          <span>Shopping Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Cart items */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="glass-card p-4 rounded-2xl border border-[#4A2673] bg-[#271332]/80 flex items-center gap-4 text-[#FFF8F0]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover bg-[#160D22] border border-[#4A2673] shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-title font-bold text-base text-[#FFF8F0] truncate">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#B99AD8]/40 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xs text-[#D4AF61] font-semibold block mt-0.5">
                    {item.flavor}
                  </span>

                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-base text-[#FFF8F0]">
                      {formatINR(item.price * item.quantity)}
                    </span>

                    <div className="flex items-center border border-[#4A2673] rounded-full bg-[#160D22] px-3 py-1 text-xs font-bold text-[#FFF8F0]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-1 text-[#B99AD8] hover:text-[#D4AF61]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-1 text-[#B99AD8] hover:text-[#D4AF61]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 rounded-3xl border border-[#D4AF61]/30 bg-[#271332] shadow-xl space-y-4 text-[#FFF8F0]">
              <h3 className="font-serif-title font-bold text-xl text-[#FFF8F0]">
                Order Summary
              </h3>

              {/* Delivery Zone pill */}
              <div className="bg-[#160D22] p-3 rounded-xl border border-[#D4AF61]/30 text-xs font-semibold flex items-center justify-between text-[#FFF8F0]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF61]" />
                  <span className="truncate max-w-[180px]">{userLocation.name}</span>
                </div>
                <span className="bg-[#D4AF61] text-[#160D22] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  8–10 MINS
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-[#B99AD8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#FFF8F0]">{formatINR(summary.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>5 km Cold Express Delivery</span>
                  <span className="font-semibold text-[#D4AF61]">
                    {summary.deliveryFee === 0 ? 'FREE' : formatINR(summary.deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Insulated Freeze Box Packaging</span>
                  <span className="font-semibold text-[#FFF8F0]">{formatINR(summary.freezeBoxFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coupon Discount ({appliedCoupon})</span>
                  <span className="font-semibold text-[#D4AF61]">- {formatINR(summary.discount)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#FFF8F0] pt-3 border-t border-[#4A2673]">
                  <span>Grand Total</span>
                  <span className="text-[#D4AF61]">{formatINR(summary.grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-gradient-to-r from-[#D4AF61] to-[#b89346] hover:brightness-110 text-[#160D22] py-4 rounded-full font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 tracking-wider"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 text-[#160D22]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, MapPin, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { formatINR, calculateOrderSummary } from '../utils/pricing';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    appliedCoupon,
    setAppliedCoupon
  } = useCart();
  const { userLocation, serviceability } = useLocation();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const summary = calculateOrderSummary(cart, appliedCoupon);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md bg-[#271332] text-[#B99AD8] h-full shadow-2xl flex flex-col justify-between border-l border-[#D4AF61]/30 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#4A2673] flex items-center justify-between glass-panel">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#160D22] text-[#D4AF61] border border-[#D4AF61]/30 flex items-center justify-center font-bold text-sm">
              <ShoppingBag className="w-4 h-4 text-[#D4AF61]" />
            </div>
            <div>
              <h3 className="font-serif-title font-bold text-lg text-[#FFF8F0]">
                Your Ice Cream Box
              </h3>
              <span className="text-[11px] text-[#B99AD8] font-medium">
                {cart.length} unique item{cart.length !== 1 && 's'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full text-[#B99AD8] hover:text-white hover:bg-[#4A2673]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Salem Delivery Zone Status Bar */}
        <div className="bg-[#160D22] px-5 py-2.5 border-b border-[#4A2673] flex items-center justify-between text-xs font-semibold text-[#FFF8F0]">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF61]" />
            <span className="truncate max-w-[200px]">{userLocation.name}</span>
          </div>
          <span className="bg-[#D4AF61] text-[#160D22] text-[10px] font-bold px-2 py-0.5 rounded-full">
            {serviceability?.isServiceable ? '8–10 MINS' : '5KM HUB'}
          </span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-20 h-20 rounded-full bg-[#160D22] border border-[#D4AF61]/30 flex items-center justify-center text-4xl shadow-inner">
                🍦
              </div>
              <h4 className="font-serif-title font-bold text-xl text-[#FFF8F0]">
                YOUR CONE IS WAITING.
              </h4>
              <p className="text-xs text-[#B99AD8] max-w-xs">
                Your ice cream box is currently empty. Explore our Belgian truffle cones and sundaes!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/menu');
                }}
                className="bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] px-6 py-3 rounded-full font-bold text-xs shadow-md hover:brightness-110 transition-all tracking-wider"
              >
                EXPLORE ICE CREAM
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="glass-card p-3.5 rounded-2xl border border-[#4A2673] bg-[#160D22]/80 flex items-center gap-3 relative group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover bg-[#160D22] shrink-0 border border-[#4A2673]"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif-title font-bold text-sm text-[#FFF8F0] truncate pr-2">
                      {item.name}
                    </h5>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#B99AD8]/40 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[11px] text-[#D4AF61] font-semibold block">
                    {item.flavor}
                  </span>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-sm text-[#FFF8F0]">
                      {formatINR(item.price * item.quantity)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#4A2673] rounded-full bg-[#271332] px-2 py-0.5 text-xs font-bold text-[#FFF8F0]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-1 text-[#B99AD8] hover:text-[#D4AF61]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-1 text-[#B99AD8] hover:text-[#D4AF61]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#4A2673] glass-panel space-y-3 bg-[#271332]">
            {/* Coupon selector */}
            <div className="flex items-center justify-between text-xs bg-[#160D22] p-2.5 rounded-xl border border-[#D4AF61]/30">
              <div className="flex items-center gap-1.5 text-[#FFF8F0] font-bold">
                <Tag className="w-4 h-4 text-[#D4AF61]" />
                <span>Coupon Applied:</span>
                <span className="bg-[#4A2673] text-[#D4AF61] px-2 py-0.5 rounded text-[10px] font-bold">
                  {appliedCoupon}
                </span>
              </div>
              <span className="font-bold text-[#D4AF61]">
                - {formatINR(summary.discount)}
              </span>
            </div>

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-[#B99AD8]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#FFF8F0]">{formatINR(summary.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>5 km Express Delivery</span>
                <span className="font-semibold text-[#D4AF61]">
                  {summary.deliveryFee === 0 ? 'FREE' : formatINR(summary.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sub-Zero Freeze Box Lock Fee</span>
                <span className="font-semibold text-[#FFF8F0]">{formatINR(summary.freezeBoxFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#FFF8F0] pt-2 border-t border-[#4A2673]">
                <span>Grand Total</span>
                <span className="text-[#D4AF61]">{formatINR(summary.grandTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-[#D4AF61] to-[#b89346] hover:brightness-110 text-[#160D22] py-3.5 rounded-full font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-98 tracking-wider"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 text-[#160D22]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

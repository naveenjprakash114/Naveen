import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MapPin, CreditCard, Smartphone, Banknote, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { formatINR, calculateOrderSummary } from '../utils/pricing';

export default function Checkout() {
  const { cart, placeOrder, appliedCoupon } = useCart();
  const { userLocation, serviceability } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: 'Kavitha Ramachandran',
    phone: '+91 98765 43210',
    address: 'Flat 402, Green Park Apartments, Alagapuram',
    landmark: 'Near Salem New Bus Stand',
    instructions: 'Leave at door if not answered. Pack cold.',
    paymentMethod: 'UPI'
  });

  const summary = calculateOrderSummary(cart, appliedCoupon);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const order = placeOrder({
      customer: formData,
      deliveryHub: serviceability?.nearestHub?.name || 'Alagapuram Central Hub',
      estimatedDeliveryMinutes: '8–10',
      totalAmount: summary.grandTotal
    });

    navigate('/track-order');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#160D22] text-[#B99AD8] pt-28 pb-20 text-center px-4">
        <h2 className="text-2xl font-serif-title font-bold text-[#FFF8F0]">
          No items in cart for checkout.
        </h2>
        <button
          onClick={() => navigate('/menu')}
          className="mt-4 bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] px-6 py-2.5 rounded-full font-bold text-xs hover:brightness-110 tracking-wider"
        >
          Return to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#160D22] text-[#B99AD8] pt-28 pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-serif-title font-bold text-[#FFF8F0] mb-8">
          Checkout & Cold Express Dispatch
        </h1>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Address & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Salem Delivery Address Card */}
            <div className="glass-panel p-6 rounded-3xl border border-[#D4AF61]/30 bg-[#271332] shadow-md space-y-4 text-[#FFF8F0]">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-title font-bold text-xl text-[#FFF8F0] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#D4AF61]" />
                  <span>1. Delivery Address</span>
                </h3>
                <span className="text-xs font-bold text-[#D4AF61] bg-[#4A2673] px-2.5 py-1 rounded-full border border-[#D4AF61]/40">
                  {serviceability?.isServiceable ? '5 KM ZONE VERIFIED' : 'SALEM HUB'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#D4AF61] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#160D22] border border-[#4A2673] text-[#FFF8F0] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D4AF61]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#D4AF61] block mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#160D22] border border-[#4A2673] text-[#FFF8F0] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D4AF61]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#D4AF61] block mb-1">Street Address / Flat / Door No.</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#160D22] border border-[#4A2673] text-[#FFF8F0] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D4AF61]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#D4AF61] block mb-1">Landmark / Delivery Instructions</label>
                <input
                  type="text"
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full bg-[#160D22] border border-[#4A2673] text-[#FFF8F0] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D4AF61]"
                />
              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="glass-panel p-6 rounded-3xl border border-[#D4AF61]/30 bg-[#271332] shadow-md space-y-4 text-[#FFF8F0]">
              <h3 className="font-serif-title font-bold text-xl text-[#FFF8F0]">
                2. Select Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* UPI */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'UPI' })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.paymentMethod === 'UPI'
                      ? 'bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] border-[#D4AF61] shadow-lg font-bold'
                      : 'bg-[#160D22] border-[#4A2673] text-[#FFF8F0] hover:border-[#D4AF61]'
                  }`}
                >
                  <Smartphone className="w-6 h-6 mb-2 text-current" />
                  <div className="font-bold text-xs">Instant UPI</div>
                  <div className="text-[10px] opacity-80">GPay, PhonePe, Paytm</div>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'Card' })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.paymentMethod === 'Card'
                      ? 'bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] border-[#D4AF61] shadow-lg font-bold'
                      : 'bg-[#160D22] border-[#4A2673] text-[#FFF8F0] hover:border-[#D4AF61]'
                  }`}
                >
                  <CreditCard className="w-6 h-6 mb-2 text-current" />
                  <div className="font-bold text-xs">Credit / Debit Card</div>
                  <div className="text-[10px] opacity-80">Visa, Mastercard, RuPay</div>
                </button>

                {/* COD */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'COD' })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.paymentMethod === 'COD'
                      ? 'bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] border-[#D4AF61] shadow-lg font-bold'
                      : 'bg-[#160D22] border-[#4A2673] text-[#FFF8F0] hover:border-[#D4AF61]'
                  }`}
                >
                  <Banknote className="w-6 h-6 mb-2 text-current" />
                  <div className="font-bold text-xs">Cash on Delivery</div>
                  <div className="text-[10px] opacity-80">Pay when freeze box arrives</div>
                </button>

              </div>
            </div>

          </div>

          {/* RIGHT: Order Confirmation Summary */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 rounded-3xl border border-[#D4AF61]/30 bg-[#271332] shadow-xl space-y-4 sticky top-28 text-[#FFF8F0]">
              <h3 className="font-serif-title font-bold text-xl text-[#FFF8F0]">
                Order Summary
              </h3>

              {/* Items List */}
              <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1 text-xs border-b border-[#4A2673] pb-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="truncate max-w-[200px]">
                      <span className="font-bold text-[#FFF8F0]">{item.name}</span>
                      <span className="text-[10px] text-[#B99AD8] block">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-[#FFF8F0]">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-1.5 text-xs text-[#B99AD8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#FFF8F0]">{formatINR(summary.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>5 km Express Delivery Fee</span>
                  <span className="font-semibold text-[#D4AF61]">
                    {summary.deliveryFee === 0 ? 'FREE' : formatINR(summary.deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sub-Zero Lock Box Fee</span>
                  <span className="font-semibold text-[#FFF8F0]">{formatINR(summary.freezeBoxFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coupon Discount ({appliedCoupon})</span>
                  <span className="font-semibold text-[#D4AF61]">- {formatINR(summary.discount)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#FFF8F0] pt-3 border-t border-[#4A2673]">
                  <span>Total Amount</span>
                  <span className="text-[#D4AF61]">{formatINR(summary.grandTotal)}</span>
                </div>
              </div>

              {/* Est delivery time badge */}
              <div className="bg-[#160D22] p-3 rounded-xl border border-[#D4AF61]/30 flex items-center justify-between text-xs font-bold text-[#FFF8F0]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D4AF61]" />
                  <span>Estimated Arrival:</span>
                </div>
                <span className="text-[#D4AF61] font-extrabold">8–10 Minutes</span>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4AF61] to-[#b89346] hover:brightness-110 text-[#160D22] py-4 rounded-full font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 tracking-wider"
              >
                <span>PLACE ORDER & DISPATCH</span>
                <ArrowRight className="w-4 h-4 text-[#160D22]" />
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}

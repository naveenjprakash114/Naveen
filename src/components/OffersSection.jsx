import React, { useState } from 'react';
import { offers } from '../data/offers';
import { Tag, Copy, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OffersSection() {
  const [copiedCode, setCopiedCode] = useState(null);
  const { setAppliedCoupon } = useCart();

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setAppliedCoupon(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-20 bg-[#160D22] text-[#B99AD8] relative border-t border-[#4A2673]/60" id="offers">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF61] bg-[#271332] px-3.5 py-1.5 rounded-full border border-[#D4AF61]/30 inline-block mb-3">
            EXCLUSIVE SAVINGS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FFF8F0]">
            LUXURY TASTE. HONEST PRICES.
          </h2>
          <p className="mt-3 text-[#B99AD8] text-sm sm:text-base">
            Apply instant Salem promotional codes at checkout for extra savings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {offers.map((offer) => (
            <div
              key={offer.id}
              className="glass-card p-6 rounded-3xl border border-[#4A2673] hover:border-[#D4AF61] bg-[#271332]/80 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between text-[#FFF8F0]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-[#4A2673] text-[#D4AF61] border border-[#D4AF61]/30">
                    {offer.discount}
                  </span>
                  <Tag className="w-4 h-4 text-[#D4AF61]" />
                </div>

                <h3 className="font-serif-title font-bold text-xl text-[#FFF8F0] mt-2">
                  {offer.title}
                </h3>
                <p className="text-xs text-[#B99AD8] leading-relaxed">
                  {offer.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#4A2673] flex items-center justify-between">
                <div className="font-mono text-sm font-extrabold text-[#D4AF61] bg-[#160D22] px-3 py-1.5 rounded-xl border border-[#D4AF61]/30">
                  {offer.code}
                </div>

                <button
                  onClick={() => handleCopy(offer.code)}
                  className="bg-gradient-to-r from-[#D4AF61] to-[#b89346] hover:brightness-110 text-[#160D22] px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 tracking-wider"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#160D22] font-bold" />
                      <span>APPLIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#160D22]" />
                      <span>APPLY</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

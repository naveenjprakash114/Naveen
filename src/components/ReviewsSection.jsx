import React from 'react';
import { reviews } from '../data/reviews';
import { Star, ShieldCheck, Clock, Award, MapPin } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-[#160D22] text-[#B99AD8] relative border-t border-[#4A2673]/60">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Customer Trust Stats Header */}
        <div className="bg-[#271332] text-[#FFF8F0] border border-[#D4AF61]/30 rounded-3xl p-8 sm:p-12 mb-20 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#D4AF61]/20">
            <div className="space-y-1">
              <div className="font-serif-title font-extrabold text-3xl sm:text-4xl text-[#D4AF61]">
                8–10 MIN
              </div>
              <p className="text-xs text-[#B99AD8] font-medium">Target Delivery Speed</p>
            </div>
            <div className="space-y-1">
              <div className="font-serif-title font-extrabold text-3xl sm:text-4xl text-[#D4AF61]">
                5 KM
              </div>
              <p className="text-xs text-[#B99AD8] font-medium">Service Radius Per Hub</p>
            </div>
            <div className="space-y-1">
              <div className="font-serif-title font-extrabold text-3xl sm:text-4xl text-[#D4AF61]">
                -22°C
              </div>
              <p className="text-xs text-[#B99AD8] font-medium">Freeze Box Temperature</p>
            </div>
            <div className="space-y-1">
              <div className="font-serif-title font-extrabold text-3xl sm:text-4xl text-[#FFF8F0]">
                100%
              </div>
              <p className="text-xs text-[#B99AD8] font-medium">Cold-Chain Guarantee</p>
            </div>
          </div>
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF61] bg-[#271332] px-3.5 py-1.5 rounded-full border border-[#D4AF61]/30 inline-block mb-3">
            VERIFIED SALEM FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FFF8F0]">
            WHY CUSTOMERS COME BACK
          </h2>
          <p className="mt-3 text-[#B99AD8] text-sm sm:text-base">
            Real experiences from residents across Alagapuram, Fairlands & Hasthampatti.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card p-6 rounded-3xl border border-[#4A2673] hover:border-[#D4AF61] bg-[#271332]/80 hover:shadow-2xl transition-all duration-300 space-y-4 text-[#FFF8F0]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#D4AF61]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF61] text-[#D4AF61]" />
                  ))}
                </div>
                <span className="text-xs text-[#B99AD8]/60 font-medium">{rev.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#FFF8F0]/90 italic leading-relaxed">
                "{rev.comment}"
              </p>

              <div className="pt-4 border-t border-[#4A2673] flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-[#FFF8F0]">{rev.author}</h5>
                  <span className="text-[#B99AD8] text-[11px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D4AF61]" /> {rev.locality}
                  </span>
                </div>
                <span className="text-[10px] bg-[#160D22] text-[#D4AF61] font-bold px-2.5 py-1 rounded-full border border-[#D4AF61]/30">
                  Ordered: {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

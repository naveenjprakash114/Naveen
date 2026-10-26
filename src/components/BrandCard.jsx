import React from 'react';
import { partnerBrands } from '../data/brands';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BrandCard() {
  return (
    <section className="py-20 bg-[#160D22] text-[#B99AD8] relative border-t border-[#4A2673]/60">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF61] bg-[#271332] px-3.5 py-1.5 rounded-full border border-[#D4AF61]/30 inline-block mb-3">
            CURATED CREMERIES & PARTNERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FFF8F0]">
            THE BRANDS YOU LOVE
          </h2>
          <p className="mt-3 text-[#B99AD8] text-sm sm:text-base">
            Delivering iconic global brands alongside our local Salem artisanal master creations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {partnerBrands.map((brand) => (
            <div
              key={brand.id}
              className="glass-card p-6 rounded-3xl border border-[#4A2673] hover:border-[#D4AF61] bg-[#271332]/80 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group text-[#FFF8F0]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#4A2673] text-[#D4AF61] border border-[#D4AF61]/30">
                    {brand.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#B99AD8]/70">
                    {brand.origin}
                  </span>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-[#160D22] text-[#D4AF61] border border-[#D4AF61]/30 flex items-center justify-center font-serif-title font-bold text-xl mb-4 group-hover:scale-105 transition-transform shadow-md">
                  {brand.logoText[0]}
                </div>

                <h3 className="font-serif-title font-bold text-xl text-[#FFF8F0]">
                  {brand.name}
                </h3>
                <p className="text-xs font-bold text-[#D4AF61] mt-1">
                  {brand.tagline}
                </p>
                <p className="text-xs text-[#B99AD8] mt-2 leading-relaxed">
                  {brand.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#4A2673] flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#D4AF61] bg-[#4A2673] px-2.5 py-1 rounded-full border border-[#D4AF61]/40">
                  8–10 Min Freeze Delivery
                </span>
                <Link
                  to={`/menu?brand=${encodeURIComponent(brand.name)}`}
                  className="text-xs font-bold text-[#FFF8F0] hover:text-[#D4AF61] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore Tubs</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF61]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

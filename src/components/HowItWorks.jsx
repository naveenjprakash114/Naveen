import React from 'react';
import { MapPin, IceCream, PackageCheck, Zap } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Choose your location',
      description: 'Verify whether your address is inside an active 5 km Salem service hub zone.',
      icon: MapPin,
    },
    {
      step: '02',
      title: 'Choose your favourite scoop',
      description: 'Explore artisanal tubs, signature sundaes, cones, and global partner brands.',
      icon: IceCream,
    },
    {
      step: '03',
      title: 'We pack it cold',
      description: 'Your order is sealed in our sub-zero insulated freeze box kept solid at -22°C.',
      icon: PackageCheck,
    },
    {
      step: '04',
      title: 'Fast delivery',
      description: 'Rider arrives at your doorstep in approximately 8–10 minutes guaranteed.',
      icon: Zap,
    }
  ];

  return (
    <section className="py-20 bg-[#160D22] text-[#B99AD8] relative border-t border-[#4A2673]/60">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF61] bg-[#271332] px-3.5 py-1.5 rounded-full border border-[#D4AF61]/30 inline-block mb-3">
            SEAMLESS COLD EXPRESS PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FFF8F0]">
            HOW IT WORKS
          </h2>
          <p className="mt-3 text-[#B99AD8] text-sm sm:text-base">
            From Salem craft hub to your dessert table in 4 effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.step}
                className="glass-card p-6 rounded-3xl border border-[#4A2673] hover:border-[#D4AF61] bg-[#271332]/80 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative group text-[#FFF8F0]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif-title font-extrabold text-2xl text-[#D4AF61]">
                    STEP {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#160D22] text-[#D4AF61] border border-[#D4AF61]/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    <IconComponent className="w-6 h-6 text-[#D4AF61]" />
                  </div>
                </div>

                <h3 className="font-serif-title font-bold text-lg text-[#FFF8F0]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#B99AD8] mt-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#4A2673] flex items-center gap-1.5 text-[11px] font-bold text-[#D4AF61]">
                  <span>Cold Guarantee</span>
                  <span>•</span>
                  <span>Salem Express</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import DeliveryZone from '../components/DeliveryZone';
import { serviceHubs } from '../data/serviceZones';
import { Compass, ShieldCheck, Clock, MapPin } from 'lucide-react';

export default function DeliveryZonesPage() {
  return (
    <div className="min-h-screen bg-[#160D22] pt-28 pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF61] bg-[#271332] px-3.5 py-1.5 rounded-full border border-[#D4AF61]/30 inline-block mb-3">
            HYPERLOCAL SALEM EXPANSION
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#FFF8F0]">
            OUR 5 KM NETWORK
          </h1>
          <p className="mt-4 text-[#B99AD8]/80 text-base sm:text-lg">
            Instead of standard central warehouses, Velvet Scoop operates distributed 5 km micro-freezer hubs across Salem for sub-10 minute arrivals.
          </p>
        </div>

        {/* 5 KM Calculator Section */}
        <DeliveryZone />

        {/* Hub Architecture Details */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#271332] p-6 rounded-3xl border border-[#4A2673]/60 space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#160D22] text-[#D4AF61] flex items-center justify-center font-bold border border-[#D4AF61]/20">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title font-bold text-lg text-[#FFF8F0]">5 km Strict Boundary</h3>
            <p className="text-xs text-[#B99AD8]/80 leading-relaxed">
              By locking each hub's delivery radius to 5 km, our riders reach any customer within 600 seconds.
            </p>
          </div>

          <div className="bg-[#271332] p-6 rounded-3xl border border-[#4A2673]/60 space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#160D22] text-[#D4AF61] flex items-center justify-center font-bold border border-[#D4AF61]/20">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title font-bold text-lg text-[#FFF8F0]">8–10 Min Target</h3>
            <p className="text-xs text-[#B99AD8]/80 leading-relaxed">
              Real-time rider dispatch directly from sub-zero dark kitchens minimizes ambient exposure.
            </p>
          </div>

          <div className="bg-[#271332] p-6 rounded-3xl border border-[#4A2673]/60 space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#160D22] text-[#D4AF61] flex items-center justify-center font-bold border border-[#D4AF61]/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title font-bold text-lg text-[#FFF8F0]">Phase 2 Salem Hubs</h3>
            <p className="text-xs text-[#B99AD8]/80 leading-relaxed">
              Expanding next into Ammapet, Kondalampatti, and Omalur corridors to cover 100% of Salem city.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

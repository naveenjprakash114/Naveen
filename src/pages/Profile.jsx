import React from 'react';
import { User, MapPin, Phone, ShieldCheck, Heart, LogOut } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

export default function Profile() {
  const { userLocation } = useLocation();

  return (
    <div className="min-h-screen bg-[#160D22] pt-28 pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-8 max-w-4xl mx-auto">
        
        <div className="bg-[#271332] p-8 rounded-3xl border border-[#4A2673]/60 shadow-2xl flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF61] to-[#b89346] text-[#160D22] flex items-center justify-center font-serif-title font-bold text-3xl shadow-lg border border-[#D4AF61]">
            K
          </div>
          <div>
            <h1 className="font-serif-title font-bold text-2xl text-[#FFF8F0]">
              Kavitha Ramachandran
            </h1>
            <p className="text-xs text-[#B99AD8]/80 font-medium">
              Salem Velvet Member • 14 Orders Completed
            </p>
            <span className="text-[10px] bg-[#160D22] text-[#D4AF61] border border-[#D4AF61]/30 font-bold px-2.5 py-0.5 rounded-full mt-2 inline-block">
              Alagapuram 5 km Delivery Zone
            </span>
          </div>
        </div>

        <div className="bg-[#271332] p-6 rounded-3xl border border-[#4A2673]/60 shadow-xl space-y-4">
          <h3 className="font-serif-title font-bold text-lg text-[#FFF8F0]">
            Default Delivery Location
          </h3>
          <div className="flex items-center gap-3 bg-[#160D22] p-4 rounded-2xl border border-[#D4AF61]/20">
            <MapPin className="w-5 h-5 text-[#D4AF61]" />
            <div>
              <span className="font-bold text-xs text-[#FFF8F0] block">
                {userLocation.name}
              </span>
              <span className="text-[11px] text-[#B99AD8]/70">
                {userLocation.locality}, Salem, Tamil Nadu
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { MapPin, Navigation, CheckCircle2, AlertTriangle, Shield, Clock, Compass } from 'lucide-react';
import { serviceHubs } from '../data/serviceZones';
import { useLocation } from '../context/LocationContext';
import { findLocationByQuery } from '../utils/deliveryZone';

export default function DeliveryZone() {
  const { userLocation, updateLocation, serviceability } = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [searchedResult, setSearchedResult] = useState(null);

  const handleSearchAddress = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const loc = findLocationByQuery(searchInput);
    if (loc) {
      updateLocation(loc);
      setSearchedResult(loc);
    }
  };

  return (
    <section className="py-20 bg-[#160D22] text-[#B99AD8] relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full border border-[#D4AF61]/10 animate-zone-pulse pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] rounded-full border border-[#4A2673]/20 pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF61] bg-[#271332] px-3.5 py-1.5 rounded-full border border-[#D4AF61]/30 inline-block mb-3">
            HYPERLOCAL COLD-CHAIN NETWORK
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#FFF8F0]">
            WE'RE CLOSER THAN YOU THINK.
          </h2>
          <p className="mt-4 text-[#B99AD8] text-base sm:text-lg">
            Each Velvet Scoop hub operates on a strict <strong className="text-[#D4AF61]">5 km radius boundary</strong> to guarantee your ice cream arrives frozen solid in <strong className="text-[#D4AF61]">8–10 minutes</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Salem Interactive Service Hubs Grid */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-serif-title font-bold text-[#FFF8F0] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#D4AF61]" />
              <span>Active Salem Service Hubs</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceHubs.map((hub) => (
                <div
                  key={hub.id}
                  onClick={() =>
                    updateLocation({
                      name: hub.locality,
                      locality: hub.locality,
                      city: 'Salem',
                      lat: hub.lat,
                      lng: hub.lng
                    })
                  }
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                    userLocation.locality === hub.locality
                      ? 'bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] shadow-xl scale-[1.02] font-bold'
                      : hub.active
                      ? 'glass-card hover:bg-[#271332] text-[#FFF8F0] hover:border-[#D4AF61]'
                      : 'bg-[#271332]/40 text-[#B99AD8]/40 opacity-60 cursor-not-allowed border border-[#4A2673]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                      {hub.radiusKm} KM RADIUS
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        hub.active
                          ? 'bg-[#4A2673] text-[#D4AF61] border border-[#D4AF61]/50'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {hub.active ? 'ACTIVE' : 'UPCOMING'}
                    </span>
                  </div>

                  <h4 className="font-serif-title font-bold text-lg mt-2">{hub.locality}</h4>
                  <p className="text-xs opacity-80 mt-1 line-clamp-2">{hub.description}</p>

                  <div className="mt-3 pt-3 border-t border-current/10 flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{hub.estimatedTime}</span>
                    </div>
                    <span>{hub.freezerTemp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Address Location Verification & Map Graphic */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#D4AF61]/30 bg-[#271332]/90 shadow-xl space-y-6 text-[#FFF8F0]">
              <div>
                <h3 className="text-2xl font-serif-title font-bold text-[#FFF8F0]">
                  Check Delivery Availability
                </h3>
                <p className="text-sm text-[#B99AD8] mt-1">
                  Type your Salem locality or select a hub to calculate exact distance & delivery speed.
                </p>
              </div>

              {/* Location Input Form */}
              <form onSubmit={handleSearchAddress} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF61]" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter locality e.g., Alagapuram, Fairlands, Meyyanur..."
                    className="w-full bg-[#160D22] border border-[#4A2673] text-[#FFF8F0] placeholder-[#B99AD8]/40 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#D4AF61]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] px-5 py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all tracking-wider"
                >
                  Verify
                </button>
              </form>

              {/* Status Result Card */}
              {serviceability && (
                <div
                  className={`p-5 rounded-2xl border ${
                    serviceability.isServiceable
                      ? 'bg-[#4A2673]/60 border-[#D4AF61]/50 text-[#FFF8F0]'
                      : 'bg-[#271332] border-amber-700/50 text-amber-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {serviceability.isServiceable ? (
                      <CheckCircle2 className="w-6 h-6 text-[#D4AF61] shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-bold text-base text-[#FFF8F0]">
                        {serviceability.isServiceable
                          ? "YOU'RE IN OUR 5 KM DELIVERY ZONE!"
                          : "WE'RE NOT IN YOUR AREA YET"}
                      </h4>
                      <p className="text-xs mt-1 text-[#B99AD8]">
                        {serviceability.message}
                      </p>
                      {serviceability.isServiceable ? (
                        <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-[#D4AF61] bg-[#160D22] px-3 py-1.5 rounded-lg w-fit border border-[#D4AF61]/30">
                          <span>⏱ Estimated Delivery: 8–10 Minutes</span>
                          <span>❄️ Temp: -22°C Insulated</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => alert('Thank you! We will notify you when Salem Phase 2 launches.')}
                          className="mt-3 bg-[#D4AF61] text-[#160D22] text-xs font-bold px-3.5 py-1.5 rounded-lg hover:brightness-110 transition-all"
                        >
                          Notify Me When Available
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Stylized 5 KM Circle Visualizer */}
              <div className="bg-[#160D22] text-[#FFF8F0] p-6 rounded-2xl border border-[#4A2673] relative overflow-hidden text-center space-y-4">
                <div className="relative w-40 h-40 mx-auto rounded-full border-2 border-dashed border-[#D4AF61]/60 flex items-center justify-center animate-zone-pulse">
                  <div className="w-24 h-24 rounded-full bg-[#D4AF61]/20 flex items-center justify-center border border-[#D4AF61]">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF61] flex items-center justify-center font-bold text-[#160D22] text-xs shadow-lg">
                      HUB
                    </div>
                  </div>
                  <span className="absolute top-2 right-2 text-[10px] font-bold text-[#D4AF61]">
                    5 KM RADIUS
                  </span>
                </div>
                <div>
                  <div className="text-xs text-[#B99AD8] font-medium">Current Hub Selected</div>
                  <div className="font-serif-title font-bold text-lg text-[#D4AF61]">
                    {serviceability?.nearestHub?.name || 'Alagapuram Hub'}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

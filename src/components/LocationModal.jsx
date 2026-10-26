import React, { useState } from 'react';
import { X, MapPin, Navigation, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { sampleSalemLocations, serviceHubs } from '../data/serviceZones';
import { findLocationByQuery } from '../utils/deliveryZone';

export default function LocationModal() {
  const { isLocationModalOpen, setIsLocationModalOpen, updateLocation, serviceability } = useLocation();
  const [query, setQuery] = useState('');
  const [loadingGps, setLoadingGps] = useState(false);

  if (!isLocationModalOpen) return null;

  const handleSelectPreset = (loc) => {
    updateLocation({
      name: loc.name,
      locality: loc.locality,
      city: 'Salem',
      lat: loc.lat,
      lng: loc.lng
    });
  };

  const handleUseCurrentGPS = () => {
    setLoadingGps(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLoadingGps(false);
          updateLocation({
            name: 'Your Current GPS Location',
            locality: 'Salem GPS',
            city: 'Salem',
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        () => {
          setLoadingGps(false);
          // Fallback to Alagapuram Salem
          updateLocation({
            name: 'Alagapuram Main Road',
            locality: 'Alagapuram',
            city: 'Salem',
            lat: 11.6643,
            lng: 78.1460
          });
        }
      );
    } else {
      setLoadingGps(false);
      updateLocation({
        name: 'Alagapuram Main Road',
        locality: 'Alagapuram',
        city: 'Salem',
        lat: 11.6643,
        lng: 78.1460
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = findLocationByQuery(query);
    if (res) updateLocation(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel max-w-lg w-full rounded-3xl p-6 bg-[#271332] border border-[#D4AF61]/40 shadow-2xl relative space-y-5 text-[#FFF8F0]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#4A2673] pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#4A2673] flex items-center justify-center text-[#D4AF61]">
              <MapPin className="w-4 h-4 text-[#D4AF61]" />
            </div>
            <h3 className="font-serif-title font-bold text-xl text-[#FFF8F0]">
              Select Delivery Address
            </h3>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-2 rounded-full text-[#B99AD8] hover:text-white hover:bg-[#4A2673]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Location Button */}
        <button
          onClick={handleUseCurrentGPS}
          disabled={loadingGps}
          className="w-full bg-[#160D22] hover:bg-[#4A2673]/60 border border-[#D4AF61]/40 p-3.5 rounded-2xl flex items-center gap-3 text-left transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] flex items-center justify-center shrink-0 font-bold">
            <Navigation className={`w-5 h-5 ${loadingGps ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <span className="font-bold text-sm text-[#FFF8F0]">
              {loadingGps ? 'Locating GPS Coordinates...' : 'Use Current Device Location'}
            </span>
            <span className="text-xs text-[#B99AD8] block">
              Auto-detect distance to nearest Salem service hub
            </span>
          </div>
        </button>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF61]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Salem locality (e.g. Fairlands, Hasthampatti, Meyyanur)..."
            className="w-full bg-[#160D22] border border-[#4A2673] text-[#FFF8F0] placeholder-[#B99AD8]/40 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#D4AF61]"
          />
        </form>

        {/* Preset Salem Popular Localities */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF61]">
            POPULAR SALEM SERVICE LOCALITIES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {sampleSalemLocations.map((loc, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(loc)}
                className="p-2.5 rounded-xl border border-[#4A2673] hover:border-[#D4AF61] hover:bg-[#160D22] text-left transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-xs text-[#FFF8F0] block truncate">
                    {loc.name}
                  </span>
                  <span className="text-[10px] text-[#B99AD8]">{loc.locality}</span>
                </div>
                <span className="text-[10px] bg-[#4A2673] text-[#D4AF61] font-bold px-1.5 py-0.5 rounded border border-[#D4AF61]/40">
                  Active
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Zone Rules Reminder */}
        <div className="text-[11px] text-[#B99AD8] bg-[#160D22] p-3 rounded-xl flex items-center gap-2 border border-[#4A2673]">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF61] shrink-0" />
          <span>
            Orders within 5 km of an active hub arrive in 8–10 minutes in insulated freeze boxes.
          </span>
        </div>

      </div>
    </div>
  );
}

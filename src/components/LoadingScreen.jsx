import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-[#160D22] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF61] to-[#b89346] text-[#160D22] flex items-center justify-center text-3xl shadow-xl animate-bounce border border-[#D4AF61]">
        🍦
      </div>
      <div className="text-center">
        <h3 className="font-serif-title font-bold text-xl text-[#FFF8F0] tracking-wide">
          VÉLVET SCOOP
        </h3>
        <p className="text-xs text-[#D4AF61] font-semibold mt-1">
          Chilling scoops & checking Salem 5 km hubs...
        </p>
      </div>
    </div>
  );
}

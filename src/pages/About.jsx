import React from 'react';
import { Snowflake, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#160D22] pt-28 pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF61] bg-[#271332] px-3.5 py-1.5 rounded-full border border-[#D4AF61]/30">
            OUR COLD-CHAIN MANIFESTO
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#FFF8F0]">
            WE BELIEVE ICE CREAM SHOULD ARRIVE PERFECTLY.
          </h1>
          <p className="text-base sm:text-lg text-[#B99AD8]/80 leading-relaxed max-w-2xl mx-auto">
            Traditional food delivery treats ice cream like warm biryani—letting it sit in soft bags until it melts into liquid soup. We changed the rules in Salem.
          </p>
        </div>

        <div className="bg-[#271332] p-8 sm:p-12 rounded-3xl border border-[#4A2673]/60 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="font-serif-title font-bold text-2xl text-[#FFF8F0]">
                The Salem 5 km Micro-Hub Strategy
              </h3>
              <p className="text-xs text-[#B99AD8]/80 leading-relaxed">
                By setting up dedicated sub-zero freezer hubs in Alagapuram, Fairlands, Hasthampatti, Meyyanur, and Junction, every customer in Salem lives within a strict 5 km radius.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF61]">
                <Clock className="w-4 h-4 text-[#D4AF61]" />
                <span>8–10 Mins Average Dispatch Speed</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg h-64 bg-[#160D22] text-[#FFF8F0] p-6 flex flex-col justify-between border border-[#4A2673]/60">
              <div className="flex items-center gap-2">
                <Snowflake className="w-6 h-6 text-[#D4AF61]" />
                <span className="font-serif-title font-bold text-lg text-[#D4AF61]">Sub-Zero Packaging</span>
              </div>
              <p className="text-xs text-[#B99AD8]/80">
                Double-walled vacuum insulated lock containers maintain -22°C even under 38°C outdoor Salem sun.
              </p>
              <span className="text-[11px] font-mono text-[#D4AF61]">
                100% FROZEN GUARANTEE
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

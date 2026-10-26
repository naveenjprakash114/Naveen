import React, { useState } from 'react';
import { Shield, Sparkles, Snowflake, Lock, PackageCheck, Flame } from 'lucide-react';

export default function FreezeBoxExperience() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 bg-[#160D22] text-[#B99AD8] relative overflow-hidden border-t border-[#4A2673]/60">
      {/* Background Cold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF61]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Text Description */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF61] bg-[#271332] px-3.5 py-1.5 rounded-full border border-[#D4AF61]/30 inline-block">
              SUB-ZERO COLD LOCK SYSTEM
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold leading-tight text-[#FFF8F0]">
              FROM OUR FREEZER <br />
              <span className="gold-gradient-text">TO YOUR DOOR.</span>
            </h2>

            <p className="text-[#B99AD8] text-base sm:text-lg leading-relaxed">
              Standard ice cream delivery melts in transit. Velvet Scoop utilizes custom-engineered 
              <strong className="text-[#D4AF61]"> double-wall insulated freeze boxes</strong> packed with dry cold-cell technology maintained at <strong className="text-[#D4AF61]">-22°C</strong>.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 text-left">
              <div className="glass-panel-dark p-4 rounded-2xl border border-[#D4AF61]/20 bg-[#271332]/80">
                <Snowflake className="w-6 h-6 text-[#D4AF61] mb-2" />
                <h4 className="font-bold text-sm text-[#D4AF61]">Sub-Zero Insulation</h4>
                <p className="text-xs text-[#B99AD8]/70 mt-1">Keeps scoops solid for up to 45 mins in peak Salem heat.</p>
              </div>

              <div className="glass-panel-dark p-4 rounded-2xl border border-[#D4AF61]/20 bg-[#271332]/80">
                <Lock className="w-6 h-6 text-[#D4AF61] mb-2" />
                <h4 className="font-bold text-sm text-[#D4AF61]">Tamper-Proof Lock</h4>
                <p className="text-xs text-[#B99AD8]/70 mt-1">Sealed at hub and opened only by you at delivery.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gradient-to-r from-[#D4AF61] to-[#b89346] hover:brightness-110 text-[#160D22] px-8 py-4 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mx-auto lg:mx-0 tracking-wider"
              >
                <span>{isOpen ? 'CLOSE FREEZE BOX' : 'OPEN INSULATED FREEZE BOX'}</span>
                <PackageCheck className="w-5 h-5 text-[#160D22]" />
              </button>
            </div>
          </div>

          {/* RIGHT: Interactive 3D/CSS Insulated Freeze Box Visual */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-full max-w-md h-80 sm:h-96 glass-panel-dark rounded-3xl p-8 border border-[#D4AF61]/30 bg-[#271332]/90 shadow-2xl flex flex-col items-center justify-center cursor-pointer group transition-all duration-500 hover:border-[#D4AF61]"
            >
              {/* Cold Mist Layer */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-[#D4AF61]/20 via-white/10 to-transparent rounded-3xl transition-opacity duration-700 pointer-events-none ${
                  isOpen ? 'opacity-100 animate-mist' : 'opacity-0'
                }`}
              />

              {/* Freeze Box Lid Lid Visual */}
              <div
                className={`w-64 h-24 rounded-2xl bg-gradient-to-r from-[#271332] via-[#4A2673] to-[#271332] border-2 border-[#D4AF61] shadow-xl flex items-center justify-center transition-transform duration-700 ${
                  isOpen ? '-translate-y-16 rotate-[-12deg]' : 'translate-y-0'
                }`}
              >
                <div className="flex items-center gap-2 font-serif-title font-bold text-sm tracking-widest text-[#FFF8F0]">
                  <Snowflake className="w-4 h-4 text-[#D4AF61]" />
                  <span>VELVET FREEZE LOCK</span>
                </div>
              </div>

              {/* Inside Chamber revealing frozen tubs when open */}
              <div
                className={`w-72 h-44 rounded-2xl bg-[#160D22] border border-[#D4AF61]/40 mt-4 flex items-center justify-around p-4 transition-all duration-700 ${
                  isOpen ? 'opacity-100 scale-100' : 'opacity-80 scale-95'
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#271332] to-[#4A2673] mx-auto flex items-center justify-center text-xl shadow-md border border-[#D4AF61]/50">
                    🍫
                  </div>
                  <span className="text-[10px] font-bold text-[#D4AF61] mt-1 block">Belgian Truffle</span>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#4A2673] to-[#271332] mx-auto flex items-center justify-center text-xl shadow-md border border-[#D4AF61]/50">
                    🍓
                  </div>
                  <span className="text-[10px] font-bold text-[#D4AF61] mt-1 block">Wild Strawberry</span>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#271332] to-[#160D22] mx-auto flex items-center justify-center text-xl shadow-md border border-[#D4AF61]/50">
                    🍦
                  </div>
                  <span className="text-[10px] font-bold text-[#FFF8F0] mt-1 block">Vanilla Bean</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-4 bg-[#271332] text-[#D4AF61] px-4 py-1.5 rounded-full text-xs font-bold border border-[#D4AF61]/40 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#D4AF61] animate-pulse" />
                <span>KEPT COLD AT -22°C</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

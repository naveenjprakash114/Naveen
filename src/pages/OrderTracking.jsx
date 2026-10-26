import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Clock, MapPin, Phone, ShieldCheck, Snowflake, PackageCheck, Bike } from 'lucide-react';
import { formatINR } from '../utils/pricing';

export default function OrderTracking() {
  const { activeOrder } = useCart();
  const [secondsRemaining, setSecondsRemaining] = useState(540); // 9 minutes = 540s
  const [currentStep, setCurrentStep] = useState(2); // 0 to 4

  // Simulated live delivery progress timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Step advancement simulation
  useEffect(() => {
    if (secondsRemaining > 400) setCurrentStep(1); // Prepared
    else if (secondsRemaining > 250) setCurrentStep(2); // Packed
    else if (secondsRemaining > 30) setCurrentStep(3); // Out for delivery
    else setCurrentStep(4); // Delivered
  }, [secondsRemaining]);

  const formatTimer = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const trackingSteps = [
    { title: 'ORDER CONFIRMED', desc: 'Received at Alagapuram Salem Hub', icon: CheckCircle2 },
    { title: 'COLD ROOM PREPARATION', desc: 'Scooped at -24°C in clean room', icon: Snowflake },
    { title: 'FREEZE BOX SEALED', desc: 'Locked inside sub-zero container', icon: PackageCheck },
    { title: 'OUT FOR EXPRESS DELIVERY', desc: 'Rider Vignesh S. en route (5 km)', icon: Bike },
    { title: 'DELIVERED', desc: 'Arrived frost-intact at doorstep', icon: ShieldCheck }
  ];

  const orderId = activeOrder?.id || 'VS-SALEM-892410';
  const customerName = activeOrder?.customer?.fullName || 'Kavitha Ramachandran';
  const address = activeOrder?.customer?.address || 'Alagapuram Main Road, Salem';

  return (
    <div className="min-h-screen bg-[#160D22] text-[#B99AD8] pt-28 pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header Order ID & Live Timer */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#D4AF61]/30 bg-[#271332] shadow-xl text-center space-y-4 mb-8 text-[#FFF8F0]">
          <div className="inline-flex items-center gap-2 bg-[#160D22] text-[#D4AF61] border border-[#D4AF61]/30 text-xs font-bold px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#D4AF61] animate-ping" />
            <span>LIVE ORDER TRACKER • {orderId}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FFF8F0]">
            {currentStep === 4 ? 'ORDER DELIVERED!' : 'ICE CREAM EN ROUTE'}
          </h1>

          <div className="inline-flex flex-col items-center justify-center bg-[#160D22] px-8 py-4 rounded-2xl border border-[#D4AF61]/40 shadow-inner">
            <span className="text-xs text-[#D4AF61] font-bold uppercase tracking-wider">
              ESTIMATED ARRIVAL TIME
            </span>
            <span className="font-mono font-extrabold text-4xl sm:text-5xl text-[#FFF8F0] tracking-widest mt-1">
              {formatTimer(secondsRemaining)}
            </span>
            <span className="text-[11px] text-[#D4AF61] font-semibold mt-1">
              Target: 8–10 Minutes • Sub-Zero Guarantee
            </span>
          </div>
        </div>

        {/* Live Delivery Progress Tracker Timeline */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#D4AF61]/30 bg-[#271332] shadow-lg space-y-6 mb-8 text-[#FFF8F0]">
          <h3 className="font-serif-title font-bold text-xl text-[#FFF8F0]">
            Delivery Progress
          </h3>

          <div className="space-y-6 relative before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#4A2673]">
            {trackingSteps.map((step, idx) => {
              const IconComp = step.icon;
              const isDone = idx <= currentStep;

              return (
                <div key={idx} className="flex items-start gap-4 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isDone
                        ? 'bg-[#D4AF61] text-[#160D22] font-bold shadow-md scale-105'
                        : 'bg-[#160D22] text-[#B99AD8]/30 border border-[#4A2673]'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div className="pt-1">
                    <h4
                      className={`font-serif-title font-bold text-base ${
                        isDone ? 'text-[#FFF8F0]' : 'text-[#B99AD8]/40'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#B99AD8]">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rider & Delivery Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-[#4A2673] bg-[#271332]/80 space-y-3 text-[#FFF8F0]">
            <h4 className="font-serif-title font-bold text-lg text-[#FFF8F0]">
              Delivery Rider Details
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#160D22] text-[#D4AF61] border border-[#D4AF61]/30 font-bold text-lg flex items-center justify-center shadow-md">
                🛵
              </div>
              <div>
                <span className="font-bold text-sm text-[#FFF8F0] block">Vignesh S.</span>
                <span className="text-xs text-[#B99AD8]">Salem Cold-Express Rider • Hub 01</span>
              </div>
            </div>
            <div className="text-xs text-[#B99AD8] space-y-1 pt-2 border-t border-[#4A2673]">
              <p>📦 Package: Heavy-Duty Stainless Freeze Box</p>
              <p>❄️ Chamber Temp: -22°C Locked</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-[#4A2673] bg-[#271332]/80 space-y-3 text-[#FFF8F0]">
            <h4 className="font-serif-title font-bold text-lg text-[#FFF8F0]">
              Delivering To
            </h4>
            <div className="text-xs text-[#B99AD8] space-y-1">
              <p className="font-bold text-[#FFF8F0]">{customerName}</p>
              <p className="flex items-center gap-1.5 text-[#B99AD8]">
                <MapPin className="w-4 h-4 text-[#D4AF61]" /> {address}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

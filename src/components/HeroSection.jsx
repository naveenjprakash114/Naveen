import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ShieldCheck, Clock, Snowflake } from 'lucide-react';
import IceCream3D from './IceCream3D';
import { useLocation } from '../context/LocationContext';

export default function HeroSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { setIsLocationModalOpen } = useLocation();

  // Scroll Progress calculation for 3D assembly sequence
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - windowHeight;

      if (totalScrollableHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[450vh] sm:h-[500vh] bg-gradient-to-b from-[#160D22] via-[#271332] to-[#160D22]"
    >
      {/* Sticky Container for Pinning Viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-between pt-16 sm:pt-20 pb-4 sm:pb-6">
        {/* Ambient Radial Glows in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#D4AF61]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#4A2673]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-10 h-full flex flex-col items-center justify-between relative z-10">
          
          {/* CENTER TOP: Hero Header Copy */}
          <div className="max-w-3xl mx-auto text-center space-y-2 pt-1 shrink-0 z-20">
            {/* Salem Hub Badge */}
            <div className="inline-flex items-center gap-2 glass-panel px-3.5 py-1 rounded-full border border-[#D4AF61]/30 text-[11px] sm:text-xs font-bold text-[#FFF8F0]">
              <Snowflake className="w-3.5 h-3.5 text-[#D4AF61] animate-spin" style={{ animationDuration: '8s' }} />
              <span>SALEM LOCAL DELIVERY • 5 KM HUB NETWORK</span>
              <span className="bg-[#D4AF61] text-[#160D22] text-[10px] px-2 py-0.5 rounded-full font-bold">
                8–10 MINS
              </span>
            </div>

            {/* Main Center Heading */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif-title font-extrabold tracking-tight text-[#FFF8F0] leading-tight">
              ICE CREAM. <span className="gold-gradient-text">DELIVERED BEFORE</span> THE MELT.
            </h1>
          </div>

          {/* CENTER MIDDLE: Grand Centered 3D Canvas Showcase */}
          <div className="w-full max-w-3xl flex-1 min-h-0 relative flex items-center justify-center my-auto py-1 sm:py-2">
            <IceCream3D scrollProgress={scrollProgress} />
          </div>

          {/* CENTER BOTTOM: CTAs, Scrubber & Delivery Badges */}
          <div className="w-full max-w-2xl mx-auto text-center space-y-3 pb-1 shrink-0 z-20">
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/menu"
                className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF61] to-[#b89346] hover:brightness-110 text-[#160D22] px-8 py-3 rounded-full font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2.5 group active:scale-95 tracking-wider"
              >
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4 text-[#160D22] group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="w-full sm:w-auto glass-card hover:bg-[#271332] text-[#FFF8F0] px-7 py-3 rounded-full font-semibold text-sm border border-[#D4AF61]/40 hover:border-[#D4AF61] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MapPin className="w-4 h-4 text-[#D4AF61]" />
                <span>CHECK MY LOCATION</span>
              </button>
            </div>

            {/* Guarantees */}
            <div className="flex items-center justify-center gap-6 pt-1 text-xs text-[#B99AD8]">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#D4AF61]" />
                <span>Avg 8.4 Mins Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF61]" />
                <span>Freeze Box</span>
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
}


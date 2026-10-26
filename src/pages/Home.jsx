import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import DeliveryZone from '../components/DeliveryZone';
import ProductGrid from '../components/ProductGrid';
import HowItWorks from '../components/HowItWorks';
import BrandCard from '../components/BrandCard';
import FreezeBoxExperience from '../components/FreezeBoxExperience';
import OffersSection from '../components/OffersSection';
import ReviewsSection from '../components/ReviewsSection';
import { ArrowRight, MapPin, Sparkles, Clock, Snowflake } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

export default function Home() {
  const { setIsLocationModalOpen } = useLocation();
  const pageRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Global Home Page Scroll Progress Calculation (0.0 to 1.0)
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
        setScrollProgress(progress);
      }

      // Check if user has scrolled past Hero section
      const heroThreshold = window.innerHeight * 2.5;
      setIsHeroVisible(scrolled < heroThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#160D22] text-[#B99AD8] relative">
      
      {/* 1. CINEMATIC HERO SECTION WITH 3D CONE SCROLL ASSEMBLY */}
      <HeroSection />

      {/* 2. 5 KM DELIVERY ZONE CHECKER & SALEM HUB NETWORK */}
      <DeliveryZone />


      {/* 3. FEATURED ICE CREAM PRODUCT MENU GRID */}
      <ProductGrid title="FEATURED SCOOPS & CONES" limit={10} showCategories={true} />

      {/* 4. FAST DELIVERY PROMISE (8-10 MINUTES) */}
      <section className="py-20 bg-[#271332] text-[#FFF8F0] border-t border-[#4A2673]/60 relative overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF61] bg-[#160D22] px-4 py-1.5 rounded-full border border-[#D4AF61]/30">
            SPEED PROMISE
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-extrabold tracking-tight">
            8–10 MINUTES. <br />
            <span className="text-[#D4AF61]">THAT'S THE PROMISE.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#B99AD8] max-w-xl mx-auto leading-relaxed">
            Operating specialized micro-hubs across Salem means your delivery rider is never more than 5 km away.
          </p>
          <div className="pt-4 flex items-center justify-center gap-4 text-3xl sm:text-5xl font-mono font-extrabold text-[#D4AF61]">
            <Clock className="w-10 h-10 text-[#D4AF61] animate-pulse" />
            <span>08:42</span>
            <span className="text-sm font-sans font-medium text-[#B99AD8]">Avg. Salem Arrival</span>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <HowItWorks />

      {/* 6. PARTNER BRANDS SECTION */}
      <BrandCard />

      {/* 7. FREEZE BOX EXPERIENCE */}
      <FreezeBoxExperience />

      {/* 8. EXCLUSIVE OFFERS */}
      <OffersSection />

      {/* 9. CUSTOMER REVIEWS & TRUST */}
      <ReviewsSection />

      {/* 10. FINAL CINEMATIC CTA SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#160D22] to-[#271332] text-[#FFF8F0] relative overflow-hidden border-t border-[#4A2673]/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF61]/15 via-transparent to-transparent pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="w-16 h-16 rounded-full bg-[#271332] text-[#D4AF61] border border-[#D4AF61]/40 flex items-center justify-center text-3xl mx-auto shadow-2xl">
            🍦
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-extrabold tracking-tight leading-tight">
            YOUR NEXT SCOOP <br />
            <span className="gold-gradient-text">IS ONLY MINUTES AWAY.</span>
          </h2>

          <p className="text-[#B99AD8] text-base sm:text-lg max-w-xl mx-auto">
            Check your delivery zone and discover your favourite ice cream delivered frost-intact across Salem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF61] to-[#b89346] hover:brightness-110 text-[#160D22] px-8 py-4 rounded-full font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 tracking-wider"
            >
              <MapPin className="w-4 h-4 text-[#160D22]" />
              <span>CHECK MY LOCATION</span>
            </button>

            <Link
              to="/menu"
              className="w-full sm:w-auto glass-panel-dark text-[#FFF8F0] hover:bg-[#4A2673]/40 border border-[#D4AF61]/40 px-8 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>ORDER NOW</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF61]" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Shield, Clock, Snowflake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#160D22] text-[#B99AD8] pt-16 pb-12 border-t border-[#D4AF61]/30 relative overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#4A2673]/40">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#271332] to-[#4A2673] border border-[#D4AF61]/40 flex items-center justify-center text-white text-xl">
                🍦
              </div>
              <span className="font-serif-title font-bold text-2xl tracking-tight text-[#FFF8F0]">
                VÉLVET SCOOP
              </span>
            </div>
            <p className="text-xs text-[#B99AD8]/80 max-w-sm leading-relaxed">
              Salem's first sub-zero hyperlocal ice cream delivery platform operating active 5 km delivery hubs. Premium scoops delivered cold and fresh in 8–10 minutes inside custom insulated freeze boxes.
            </p>
            <div className="flex items-center gap-3 text-xs font-bold text-[#D4AF61]">
              <span className="flex items-center gap-1">
                <Snowflake className="w-3.5 h-3.5 text-[#D4AF61]" /> Sub-Zero Lock
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#D4AF61]" /> 8–10 Mins Salem
              </span>
            </div>
          </div>

          {/* EXPLORE */}
          <div className="space-y-3">
            <h4 className="font-serif-title font-bold text-sm tracking-wider uppercase text-[#D4AF61]">
              EXPLORE
            </h4>
            <ul className="space-y-2 text-xs text-[#B99AD8]">
              <li><Link to="/" className="hover:text-[#FFF8F0] transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-[#FFF8F0] transition-colors">Full Ice Cream Menu</Link></li>
              <li><Link to="/offers" className="hover:text-[#FFF8F0] transition-colors">Special Offers</Link></li>
              <li><Link to="/brands" className="hover:text-[#FFF8F0] transition-colors">Partner Brands</Link></li>
              <li><Link to="/about" className="hover:text-[#FFF8F0] transition-colors">Our Cold-Chain Story</Link></li>
            </ul>
          </div>

          {/* SERVICE ZONES */}
          <div className="space-y-3">
            <h4 className="font-serif-title font-bold text-sm tracking-wider uppercase text-[#D4AF61]">
              SERVICE HUBS
            </h4>
            <ul className="space-y-2 text-xs text-[#B99AD8]">
              <li><Link to="/delivery-zones" className="hover:text-[#FFF8F0] transition-colors">Alagapuram Hub (5 km)</Link></li>
              <li><Link to="/delivery-zones" className="hover:text-[#FFF8F0] transition-colors">Fairlands Hub (5 km)</Link></li>
              <li><Link to="/delivery-zones" className="hover:text-[#FFF8F0] transition-colors">Hasthampatti Hub (5 km)</Link></li>
              <li><Link to="/delivery-zones" className="hover:text-[#FFF8F0] transition-colors">Suramangalam Hub (5 km)</Link></li>
              <li><Link to="/delivery-zones" className="hover:text-[#FFF8F0] transition-colors">Meyyanur Hub (5 km)</Link></li>
            </ul>
          </div>

          {/* CONTACT & SALEM HQ */}
          <div className="space-y-3">
            <h4 className="font-serif-title font-bold text-sm tracking-wider uppercase text-[#D4AF61]">
              SALEM HQ
            </h4>
            <div className="space-y-2 text-xs text-[#B99AD8]">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF61]" />
                <span>Alagapuram Main Rd, Salem, Tamil Nadu</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF61]" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF61]" />
                <span>support@velvetscoop.in</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#B99AD8]/60 gap-4">
          <p>© {new Date().getFullYear()} Velvet Scoop Express Salem. All Rights Reserved.</p>
          <p className="font-semibold text-[#D4AF61]">
            "Your Scoop. Delivered Before The Melt."
          </p>
        </div>

      </div>
    </footer>
  );
}

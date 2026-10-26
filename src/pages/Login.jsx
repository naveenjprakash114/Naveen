import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Phone } from 'lucide-react';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#160D22] pt-28 pb-20 flex items-center justify-center px-4">
      <div className="bg-[#271332] max-w-md w-full rounded-3xl p-8 border border-[#4A2673]/60 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#160D22] text-[#FFF8F0] border border-[#D4AF61]/30 flex items-center justify-center text-2xl mx-auto shadow-md">
            🍦
          </div>
          <h2 className="font-serif-title font-bold text-2xl text-[#FFF8F0]">
            Welcome to Velvet Scoop
          </h2>
          <p className="text-xs text-[#B99AD8]/80">
            Sign in to track orders and save your Salem delivery address.
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#FFF8F0] block mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF61]" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#160D22] border border-[#4A2673] rounded-xl pl-10 pr-4 py-3 text-xs text-[#FFF8F0] placeholder-[#B99AD8]/40 focus:outline-none focus:border-[#D4AF61]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] py-3.5 rounded-full font-bold text-xs hover:brightness-110 shadow-lg flex items-center justify-center gap-2 tracking-wider"
            >
              <span>SEND OTP</span>
              <ArrowRight className="w-4 h-4 text-[#160D22]" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#FFF8F0] block mb-1">Enter 4-Digit OTP</label>
              <input
                type="text"
                required
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="1 2 3 4"
                className="w-full bg-[#160D22] border border-[#4A2673] rounded-xl px-4 py-3 text-center tracking-widest text-lg font-bold text-[#D4AF61] focus:outline-none focus:border-[#D4AF61]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] py-3.5 rounded-full font-bold text-xs hover:brightness-110 shadow-lg tracking-wider"
            >
              VERIFY & LOGIN
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

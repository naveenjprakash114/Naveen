import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Phone, ArrowRight, ShieldCheck, User, LogOut, Package, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';

export default function LoginDrawer() {
  const { isLoginOpen, setIsLoginOpen, user, loginWithPhone, logout } = useAuth();
  const { userLocation } = useLocation();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  if (!isLoginOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      loginWithPhone(phone);
      setIsVerifying(false);
      setStep('phone');
      setPhone('');
      setOtp('');
    }, 600);
  };

  const handleClose = () => {
    setIsLoginOpen(false);
    setStep('phone');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md bg-[#271332] text-[#B99AD8] h-full shadow-2xl flex flex-col justify-between border-l border-[#D4AF61]/30 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#4A2673] flex items-center justify-between glass-panel">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#160D22] text-[#D4AF61] border border-[#D4AF61]/40 flex items-center justify-center font-bold text-lg shadow-md">
              🍦
            </div>
            <div>
              <h3 className="font-serif-title font-bold text-lg text-[#FFF8F0]">
                {user ? 'Customer Account' : 'Salem Customer Login'}
              </h3>
              <span className="text-[11px] text-[#B99AD8] font-medium">
                {user ? `Logged in: ${user.phone}` : 'Instant 8-10 Min Express Ordering'}
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full text-[#B99AD8] hover:text-white hover:bg-[#4A2673] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {user ? (
            /* LOGGED IN PROFILE VIEW */
            <div className="space-y-6 animate-in fade-in">
              <div className="glass-card p-5 rounded-3xl border border-[#D4AF61]/40 bg-[#160D22]/80 space-y-4 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF61] to-[#b89346] text-[#160D22] flex items-center justify-center font-serif-title font-extrabold text-2xl shadow-lg">
                    {user.name[0]}
                  </div>
                  <div>
                    <h4 className="font-serif-title font-bold text-lg text-[#FFF8F0]">
                      {user.name}
                    </h4>
                    <span className="text-xs text-[#D4AF61] font-mono font-semibold">
                      {user.phone}
                    </span>
                    <span className="text-[10px] text-[#B99AD8]/60 block mt-0.5">
                      Member since {user.joinedAt}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#4A2673] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#FFF8F0]">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF61]" />
                    <span className="truncate max-w-[200px]">{userLocation.name}</span>
                  </div>
                  <span className="text-[10px] bg-[#4A2673] text-[#D4AF61] px-2 py-0.5 rounded-full font-bold">
                    Primary Hub
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#D4AF61]">
                  ACCOUNT NAVIGATION
                </h5>

                <button
                  onClick={() => {
                    handleClose();
                    navigate('/orders');
                  }}
                  className="w-full glass-card hover:bg-[#4A2673]/40 p-4 rounded-2xl border border-[#4A2673] flex items-center justify-between text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-[#D4AF61]" />
                    <div>
                      <h6 className="font-bold text-sm text-[#FFF8F0]">My Orders & History</h6>
                      <p className="text-[11px] text-[#B99AD8]">Track active Salem 8-10 min deliveries</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#D4AF61] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    navigate('/delivery-zones');
                  }}
                  className="w-full glass-card hover:bg-[#4A2673]/40 p-4 rounded-2xl border border-[#4A2673] flex items-center justify-between text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#D4AF61]" />
                    <div>
                      <h6 className="font-bold text-sm text-[#FFF8F0]">Salem Delivery Zones</h6>
                      <p className="text-[11px] text-[#B99AD8]">Check 5 km sub-zero service hubs</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#D4AF61] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Logout Option */}
              <div className="pt-4 border-t border-[#4A2673]">
                <button
                  onClick={logout}
                  className="w-full glass-panel hover:bg-red-500/10 text-red-400 hover:text-red-300 py-3 rounded-full font-bold text-xs border border-red-500/30 flex items-center justify-center gap-2 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>LOG OUT ACCOUNT</span>
                </button>
              </div>
            </div>
          ) : (
            /* NOT LOGGED IN - OTP LOGIN FORM */
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF61] bg-[#160D22] px-3 py-1 rounded-full border border-[#D4AF61]/30 inline-block">
                  INSTANT OTP LOGIN
                </span>
                <h4 className="font-serif-title font-bold text-2xl text-[#FFF8F0]">
                  Welcome Back!
                </h4>
                <p className="text-xs text-[#B99AD8] max-w-xs mx-auto">
                  Enter your mobile number to sign in, track your order, and get sub-zero ice cream delivered in 8–10 minutes across Salem.
                </p>
              </div>

              {step === 'phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#FFF8F0] block">Mobile Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4AF61]" />
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        className="w-full bg-[#160D22] border border-[#4A2673] focus:border-[#D4AF61] rounded-2xl pl-10 pr-4 py-3.5 text-sm text-[#FFF8F0] placeholder-[#B99AD8]/40 focus:outline-none transition-colors"
                      />
                    </div>
                    <span className="text-[10px] text-[#B99AD8]/60 block">
                      We will send a 4-digit verification code to your phone.
                    </span>
                  </div>

                  {/* Demo Quick Numbers */}
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-[#D4AF61] block mb-1.5">
                      Quick Demo Numbers:
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPhone('9876543210')}
                        className="text-[10px] bg-[#160D22] hover:bg-[#4A2673] text-[#B99AD8] border border-[#4A2673] px-2.5 py-1 rounded-lg"
                      >
                        98765 43210
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhone('9443212345')}
                        className="text-[10px] bg-[#160D22] hover:bg-[#4A2673] text-[#B99AD8] border border-[#4A2673] px-2.5 py-1 rounded-lg"
                      >
                        94432 12345
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={phone.length < 10}
                    className="w-full bg-gradient-to-r from-[#D4AF61] to-[#b89346] hover:brightness-110 disabled:opacity-50 text-[#160D22] py-3.5 rounded-full font-bold text-xs shadow-xl flex items-center justify-center gap-2 transition-all active:scale-98 tracking-wider mt-4"
                  >
                    <span>GET VERIFICATION CODE</span>
                    <ArrowRight className="w-4 h-4 text-[#160D22]" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-1.5 text-center">
                    <label className="text-xs font-bold text-[#FFF8F0] block">Enter 4-Digit OTP Code</label>
                    <span className="text-xs text-[#D4AF61] font-mono">
                      Sent to +91 {phone}
                    </span>

                    <div className="pt-2 flex justify-center">
                      <input
                        type="text"
                        required
                        maxLength={4}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="1 2 3 4"
                        className="w-48 bg-[#160D22] border-2 border-[#D4AF61] rounded-2xl px-4 py-3 text-center tracking-[0.5em] text-2xl font-bold text-[#FFF8F0] focus:outline-none shadow-lg"
                      />
                    </div>
                    <span className="text-[10px] text-[#B99AD8]/60 block pt-1">
                      Demo OTP: Enter any 4 digits (e.g. 1234)
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full bg-gradient-to-r from-[#D4AF61] to-[#b89346] hover:brightness-110 text-[#160D22] py-3.5 rounded-full font-bold text-xs shadow-xl flex items-center justify-center gap-2 transition-all active:scale-98 tracking-wider mt-4"
                  >
                    {isVerifying ? (
                      <span>VERIFYING...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#160D22]" />
                        <span>VERIFY & LOG IN</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="w-full text-center text-xs text-[#B99AD8] hover:text-[#D4AF61] pt-2"
                  >
                    Change Mobile Number
                  </button>
                </form>
              )}

              {/* Guarantees Badge */}
              <div className="pt-6 border-t border-[#4A2673] space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#B99AD8]">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF61] shrink-0" />
                  <span>100% Insulated Freeze-Box Lock Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#B99AD8]">
                  <Sparkles className="w-4 h-4 text-[#D4AF61] shrink-0" />
                  <span>Instant Coupon Discounts & Order Tracking</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

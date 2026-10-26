import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#160D22] pt-28 pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF61] bg-[#271332] px-3.5 py-1.5 rounded-full border border-[#D4AF61]/30">
            SALEM HEADQUARTERS
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-[#FFF8F0]">
            GET IN TOUCH
          </h1>
          <p className="text-xs sm:text-sm text-[#B99AD8]/80">
            Have a question about our 5 km delivery hubs or partner onboarding? Reach out to our Salem team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Info */}
          <div className="md:col-span-5 space-y-6 bg-[#271332] p-6 rounded-3xl border border-[#4A2673]/60 shadow-xl">
            <h3 className="font-serif-title font-bold text-xl text-[#FFF8F0]">
              Salem Express Office
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF61] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#FFF8F0] block font-semibold">Address</strong>
                  <span className="text-[#B99AD8]/80">Alagapuram Main Road, Salem - 636016, Tamil Nadu</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D4AF61] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#FFF8F0] block font-semibold">Phone Support</strong>
                  <span className="text-[#B99AD8]/80">+91 98765 43210</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D4AF61] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#FFF8F0] block font-semibold">Email</strong>
                  <span className="text-[#B99AD8]/80">hello@velvetscoop.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-7 bg-[#271332] p-6 sm:p-8 rounded-3xl border border-[#4A2673]/60 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#D4AF61] mx-auto" />
                <h4 className="font-serif-title font-bold text-xl text-[#FFF8F0]">
                  Message Sent!
                </h4>
                <p className="text-xs text-[#B99AD8]/80">
                  Our Salem customer care team will respond within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#FFF8F0] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-[#160D22] border border-[#4A2673] rounded-xl px-3.5 py-2.5 text-xs text-[#FFF8F0] placeholder-[#B99AD8]/40 focus:outline-none focus:border-[#D4AF61]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#FFF8F0] block mb-1">Email / Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ramesh@gmail.com"
                    className="w-full bg-[#160D22] border border-[#4A2673] rounded-xl px-3.5 py-2.5 text-xs text-[#FFF8F0] placeholder-[#B99AD8]/40 focus:outline-none focus:border-[#D4AF61]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#FFF8F0] block mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help you?"
                    className="w-full bg-[#160D22] border border-[#4A2673] rounded-xl px-3.5 py-2.5 text-xs text-[#FFF8F0] placeholder-[#B99AD8]/40 focus:outline-none focus:border-[#D4AF61]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] py-3.5 rounded-full font-bold text-xs hover:brightness-110 shadow-lg flex items-center justify-center gap-2 tracking-wider"
                >
                  <span>SEND MESSAGE</span>
                  <Send className="w-4 h-4 text-[#160D22]" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronRight } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 am');

  const timeSlots = ['10:00 am', '10:30 am', '11:00 am'];

  const scrollToBookingForm = () => {
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    } else {
      onBookClick();
    }
  };

  return (
    <section id="home" className="relative bg-[#121212] text-white overflow-hidden py-16 md:py-24 border-b border-white/10">
      {/* Abstract Background SVG Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
        <svg className="w-full h-full object-cover" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 200 C300 50, 700 400, 1500 100 L1500 700 L-100 700 Z" fill="url(#hero-gradient)" />
          <path d="M-50 100 C400 350, 900 50, 1600 300" stroke="#9ce2c7" strokeWidth="1" opacity="0.3" />
          <path d="M-50 150 C400 400, 900 100, 1600 350" stroke="#ffffff" strokeWidth="0.5" opacity="0.2" />
          <defs>
            <linearGradient id="hero-gradient" x1="0" y1="0" x2="1440" y2="600" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1a1a1a" />
              <stop offset="1" stopColor="#000000" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left CTA Banner Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#9ce2c7]/10 border border-[#9ce2c7]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#9ce2c7]">
              <span className="w-2 h-2 rounded-full bg-[#9ce2c7] animate-pulse"></span>
              <span>Accepting New PPC & Growth Clients</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Data-Driven PPC & Digital Marketing That <span className="text-[#9ce2c7]">Scale Revenue</span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl font-sans">
              Translate your business goals into high-impact Google, Meta, and website campaigns that deliver measurable ROI and predictable growth.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                id="hero-book-now-left-btn"
                onClick={onBookClick}
                className="bg-black hover:bg-gray-900 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 shadow-lg flex items-center space-x-2 cursor-pointer border border-white/20 transform hover:-translate-y-0.5"
              >
                <span>Book Free Strategy Call</span>
                <ChevronRight className="w-4 h-4 text-[#9ce2c7]" />
              </button>

              <a
                href="#services"
                id="hero-explore-services-btn"
                className="text-white hover:text-[#9ce2c7] border border-white/20 hover:border-[#9ce2c7] px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* Right Floating Booking Card Widget */}
          <div className="lg:col-span-6 lg:pl-8">
            <div className="bg-[#9ce2c7] text-[#131d17] p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md mx-auto lg:ml-auto border border-white/40">
              
              <div className="text-center pb-5 border-b border-[#131d17]/15">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#131d17]">
                  Free Strategy Call
                </h2>
                <div className="mt-2 flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider text-black">
                  <Clock className="w-4 h-4 text-black" />
                  <span>1 hr • Free Strategy Session</span>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <p className="text-center text-xs font-bold uppercase tracking-widest text-[#1a2e24]">
                  Select your strategy slot
                </p>

                {/* Date Display Pill */}
                <div className="flex items-center justify-center space-x-2 bg-white/80 border border-white/90 py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-widest text-[#131d17]">
                  <CalendarIcon className="w-4 h-4 text-black" />
                  <span>August 6, 2026</span>
                </div>

                {/* Time Slots Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        id={`hero-time-slot-${slot.replace(/[:\s]/g, '-')}`}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-1 text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer text-center rounded-xl ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md'
                            : 'bg-white/80 hover:bg-white text-[#131d17] border-white/60'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>

                {/* Timezone label */}
                <p className="text-center text-[11px] font-semibold text-[#1a2e24] uppercase tracking-wider">
                  Eastern Daylight Time (EDT)
                </p>

                {/* Action Link & CTA */}
                <div className="pt-2 text-center space-y-3">
                  <button
                    id="hero-see-more-dates-btn"
                    onClick={scrollToBookingForm}
                    className="text-xs font-bold uppercase tracking-widest underline hover:text-black transition-colors cursor-pointer block w-full text-[#131d17]"
                  >
                    See more dates and times
                  </button>

                  <button
                    id="hero-confirm-slot-btn"
                    onClick={onBookClick}
                    className="w-full bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest py-3.5 transition-colors text-xs cursor-pointer rounded-full shadow-md"
                  >
                    Reserve Slot ({selectedSlot})
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

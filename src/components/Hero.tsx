import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronRight, Sparkles, Phone } from 'lucide-react';
import { getUpcomingBookingDays, getCurrentWeekRangeLabel, getTodayFormatted } from '../utils/dateUtils';
import { PHONE_NUMBER, PHONE_TEL } from '../data/contentData';
import { handlePhoneCall } from '../utils/phone';

interface HeroProps {
  onBookClick: (initialDate?: string, initialSlot?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const upcomingDays = getUpcomingBookingDays(5);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const activeDay = upcomingDays[selectedDayIndex] || upcomingDays[0];
  const timeSlots = activeDay?.timeSlots || ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'];
  const [selectedSlot, setSelectedSlot] = useState<string>(timeSlots[0] || '10:00 AM');

  const handleOpenBookingModal = (chosenSlot?: string) => {
    const slotToUse = chosenSlot || selectedSlot;
    const dateToUse = activeDay?.formatted || getTodayFormatted();
    
    try {
      const current = sessionStorage.getItem('pendingLeadData');
      const obj = current ? JSON.parse(current) : {};
      obj.selectedDate = dateToUse;
      obj.selectedTimeSlot = slotToUse;
      sessionStorage.setItem('pendingLeadData', JSON.stringify(obj));
    } catch (e) {
      console.warn('Session storage write error:', e);
    }

    onBookClick(dateToUse, slotToUse);
  };

  const handleSelectDay = (index: number) => {
    setSelectedDayIndex(index);
    const newDay = upcomingDays[index];
    if (newDay && newDay.timeSlots.length > 0) {
      setSelectedSlot(newDay.timeSlots[0]);
    }
  };

  const handleSelectSlot = (slot: string) => {
    setSelectedSlot(slot);
    handleOpenBookingModal(slot);
  };

  return (
    <section id="home" className="relative bg-[#121212] text-white overflow-hidden py-16 md:py-24 border-b border-white/10 w-full">
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
              <span>AI-Powered Marketing Automation Systems</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Marketing Automation Systems That <span className="text-[#9ce2c7]">Save Time & Scale Sales</span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl font-sans">
              I build custom marketing automation systems powered by AI—engineered to eliminate manual busywork, connect your customer journey, and deliver predictable results, whether that's winning more customers or multiplying sales at scale.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                id="hero-book-now-left-btn"
                onClick={() => handleOpenBookingModal()}
                className="bg-black hover:bg-gray-900 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 shadow-lg flex items-center space-x-2 cursor-pointer border border-white/20 transform hover:-translate-y-0.5"
              >
                <span>Book Free Automation Strategy Call</span>
                <ChevronRight className="w-4 h-4 text-[#9ce2c7]" />
              </button>

              <a
                href="#services"
                id="hero-explore-services-btn"
                className="text-white hover:text-[#9ce2c7] border border-white/20 hover:border-[#9ce2c7] px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Explore Systems
              </a>
            </div>
          </div>

          {/* Right Floating Booking Card Widget */}
          <div className="lg:col-span-6 lg:pl-8">
            <div className="bg-[#9ce2c7] text-[#131d17] p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md mx-auto lg:ml-auto border border-white/40">
              
              <div className="text-center pb-4 border-b border-[#131d17]/15">
                <div className="inline-flex items-center space-x-1.5 bg-black/10 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#131d17] mb-2">
                  <Sparkles className="w-3 h-3 text-black" />
                  <span>{getCurrentWeekRangeLabel()}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#131d17]">
                  Free Automation Call
                </h2>
                <div className="mt-1 flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider text-black">
                  <Clock className="w-4 h-4 text-black" />
                  <span>1 hr • Custom AI & Automation Blueprint</span>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1a2e24]">
                    1. Select This Week's Day
                  </p>
                  <span className="text-[10px] font-mono font-semibold bg-white/60 px-2 py-0.5 rounded-full text-gray-800">
                    Live Openings
                  </span>
                </div>

                {/* Week Day Pills */}
                <div className="grid grid-cols-5 gap-1.5">
                  {upcomingDays.map((day, idx) => {
                    const isSelected = selectedDayIndex === idx;
                    return (
                      <button
                        key={day.formatted}
                        type="button"
                        onClick={() => handleSelectDay(idx)}
                        className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all cursor-pointer border text-center ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md transform -translate-y-0.5'
                            : 'bg-white/80 hover:bg-white text-gray-900 border-white/60'
                        }`}
                      >
                        <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">
                          {day.relativeLabel || day.dayName}
                        </span>
                        <span className="text-xs font-extrabold mt-0.5">
                          {day.shortFormatted}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Date Header */}
                <div className="flex items-center justify-center space-x-2 bg-white/90 border border-white py-2 px-4 rounded-xl text-xs font-bold text-[#131d17] shadow-sm">
                  <CalendarIcon className="w-4 h-4 text-black" />
                  <span>{activeDay?.formatted || 'This Week'}</span>
                </div>

                <p className="text-xs font-bold uppercase tracking-widest text-[#1a2e24] pt-1">
                  2. Choose Available Time
                </p>

                {/* Time Slots Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        id={`hero-time-slot-${slot.replace(/[:\s]/g, '-')}`}
                        onClick={() => handleSelectSlot(slot)}
                        className={`py-2 px-1 text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer text-center rounded-xl ${
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
                <p className="text-center text-[10px] font-semibold text-[#1a2e24] uppercase tracking-wider">
                  Eastern Daylight Time (EDT) • 100% Instant Confirmation
                </p>

                {/* Action Link & CTA */}
                <div className="pt-1 text-center space-y-2.5">
                  <button
                    id="hero-confirm-slot-btn"
                    onClick={() => handleOpenBookingModal()}
                    className="w-full bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest py-3.5 transition-colors text-xs cursor-pointer rounded-full shadow-md flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                  >
                    <span>Reserve {activeDay?.dayName} ({selectedSlot})</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#9ce2c7]" />
                  </button>

                  <div className="flex items-center justify-between pt-1 px-1 text-[11px] font-bold">
                    <button
                      id="hero-see-more-dates-btn"
                      onClick={() => handleOpenBookingModal()}
                      className="uppercase tracking-wider underline hover:text-black transition-colors cursor-pointer text-[#131d17]"
                    >
                      Full Scheduler
                    </button>

                    <a
                      href={PHONE_TEL}
                      id="hero-direct-phone-btn"
                      onClick={handlePhoneCall}
                      title={`Call ${PHONE_NUMBER}`}
                      className="inline-flex items-center space-x-1.5 uppercase tracking-wider text-[#131d17] hover:text-black font-bold text-[11px] bg-black/5 hover:bg-black/10 px-2.5 py-1 rounded-full transition-all active:scale-95 cursor-pointer"
                    >
                      <Phone className="w-3 h-3 text-black" />
                      <span>Call {PHONE_NUMBER}</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

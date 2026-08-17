import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Check } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (details: { date: string; time: string; name: string; email: string }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDay, setSelectedDay] = useState(6);
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM - 11:00 AM');

  if (!isOpen) return null;

  const timeSlots = [
    '10:00 AM - 11:00 AM',
    '10:30 AM - 11:30 AM',
    '11:00 AM - 12:00 PM',
    '11:30 AM - 12:30 PM',
    '02:00 PM - 03:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      date: `August ${selectedDay}, 2026`,
      time: selectedSlot,
      name,
      email
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          id="booking-modal-close-btn"
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex p-3 bg-black/10 text-black rounded-2xl mb-1 border border-black/10">
            <CalendarIcon className="w-5 h-5 text-black" />
          </div>
          <h3 className="text-2xl font-bold text-[#131d17]">
            Schedule Free Automation Strategy Call
          </h3>
          <p className="text-xs font-bold uppercase tracking-widest text-black flex items-center justify-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-black" />
            <span>1 Hour • Custom AI & Automation Blueprint</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#131d17] mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-black rounded-xl py-2.5 px-3 text-xs font-bold text-gray-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#131d17] mb-1">
              Business Email *
            </label>
            <input
              type="email"
              required
              placeholder="john@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-black rounded-xl py-2.5 px-3 text-xs font-bold text-gray-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#131d17] mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              placeholder="(708) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-black rounded-xl py-2.5 px-3 text-xs font-bold text-gray-900 outline-none"
            />
          </div>

          {/* Date Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#131d17] mb-2">
              Select Date (August 2026)
            </label>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {[5, 6, 7, 8].map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`py-2 rounded-xl font-bold uppercase transition-all border ${
                    selectedDay === day
                      ? 'bg-black text-white border-black'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Aug {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#131d17] mb-2">
              Select Available Slot (EDT)
            </label>
            <div className="space-y-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>{slot}</span>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-full shadow-lg transition-all mt-4 cursor-pointer border border-white/20 transform hover:-translate-y-0.5"
          >
            Confirm & Book Session
          </button>
        </form>

      </div>
    </div>
  );
};

import React from 'react';
import { CheckCircle2, Calendar, Clock, X } from 'lucide-react';
import { ContactFormData } from '../types';

interface SuccessModalProps {
  data: ContactFormData | null;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-white text-gray-900 rounded-3xl max-w-md w-full p-8 relative shadow-2xl text-center space-y-6 border border-gray-100">
        <button
          onClick={onClose}
          id="success-modal-close-btn"
          className="absolute top-4 right-4 text-gray-400 hover:text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto w-14 h-14 rounded-2xl bg-black/10 text-black flex items-center justify-center border border-black/10">
          <CheckCircle2 className="w-8 h-8 text-black" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[#131d17]">
            Strategy Call Requested
          </h3>
          <p className="text-xs text-gray-600 font-sans">
            Thank you, <span className="font-bold text-gray-900">{data.firstName}</span>. Deon will review your business goals and reach out shortly.
          </p>
        </div>

        <div className="bg-[#d6f5e8]/50 p-4 rounded-2xl border border-black/15 text-left space-y-2 text-xs text-gray-700 font-sans">
          <div className="flex items-center space-x-2 font-bold uppercase tracking-wider text-black text-xs pb-2 border-b border-black/15">
            <Calendar className="w-4 h-4 text-black" />
            <span>Appointment Details</span>
          </div>
          <p><span className="font-bold text-gray-900">Date:</span> {data.selectedDate || 'August 6, 2026'}</p>
          <p><span className="font-bold text-gray-900">Time Slot:</span> {data.selectedTimeSlot || '10:00 AM - 11:00 AM (EDT)'}</p>
          <p><span className="font-bold text-gray-900">Service:</span> {data.service}</p>
          <p><span className="font-bold text-gray-900">Contact Email:</span> {data.email}</p>
        </div>

        <button
          onClick={onClose}
          id="success-modal-done-btn"
          className="w-full bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-full shadow-lg transition-all cursor-pointer border border-white/20 transform hover:-translate-y-0.5"
        >
          Done
        </button>
      </div>
    </div>
  );
};

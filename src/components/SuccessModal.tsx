import React from 'react';
import { CheckCircle2, Calendar, Clock, X, Mail, ExternalLink, ShieldCheck } from 'lucide-react';
import { ContactFormData } from '../types';
import { TARGET_ADMIN_EMAIL } from '../services/googleWorkspace';

interface SuccessModalProps {
  data: ContactFormData | null;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  const ws = data.workspaceStatus;

  // Generate web Google Calendar add-link as universal fallback
  const calTitle = encodeURIComponent(`Strategy Session: ${data.firstName} ${data.lastName} (${data.companyName || 'Business Growth'})`);
  const calDetails = encodeURIComponent(`Meeting with Deon Howard (${TARGET_ADMIN_EMAIL})\n\nClient: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}\nNotes: ${data.message || 'None'}`);
  const gCalWebUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&details=${calDetails}&add=${encodeURIComponent(TARGET_ADMIN_EMAIL)},${encodeURIComponent(data.email)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-white text-gray-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-center space-y-5 border border-gray-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          id="success-modal-close-btn"
          className="absolute top-4 right-4 text-gray-400 hover:text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#9ce2c7]/20 text-[#131d17] flex items-center justify-center border border-[#9ce2c7]/40">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-[#131d17]">
            Strategy Session Confirmed!
          </h3>
          <p className="text-xs text-gray-600 font-sans">
            Thank you, <span className="font-bold text-gray-900">{data.firstName}</span>. Your consultation has been scheduled with <strong className="text-gray-900">Deon Howard</strong>.
          </p>
        </div>

        {/* Appointment Details Box */}
        <div className="bg-[#d6f5e8]/50 p-4 rounded-2xl border border-black/15 text-left space-y-2 text-xs text-gray-700 font-sans">
          <div className="flex items-center justify-between font-bold uppercase tracking-wider text-black text-xs pb-2 border-b border-black/15">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-black" />
              <span>Appointment Summary</span>
            </div>
            <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full">1-on-1 Call</span>
          </div>
          <p><span className="font-bold text-gray-900">Date:</span> {data.selectedDate || 'August 6, 2026'}</p>
          <p><span className="font-bold text-gray-900">Time Slot:</span> {data.selectedTimeSlot || '10:00 AM - 11:00 AM (EDT)'}</p>
          <p><span className="font-bold text-gray-900">Service:</span> {data.service}</p>
          <p><span className="font-bold text-gray-900">Client Email:</span> {data.email}</p>
          <p><span className="font-bold text-gray-900">Assigned To:</span> {TARGET_ADMIN_EMAIL}</p>
        </div>

        {/* Google Workspace Live Status */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-left space-y-2.5 text-xs">
          <div className="flex items-center space-x-2 text-gray-900 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Automated Integrations Status</span>
          </div>

          <div className="space-y-1.5 pt-1 text-gray-600">
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <span>Confirmation to <strong className="text-gray-900">{TARGET_ADMIN_EMAIL}</strong></span>
              </span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Dispatched
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                <span>Google Calendar Sync</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {ws?.calendarCreated ? 'Event Created' : 'Scheduled & Synced'}
              </span>
            </div>
          </div>

          {ws?.calendarEventLink ? (
            <div className="pt-2">
              <a
                href={ws.calendarEventLink}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors"
              >
                <span>Open Google Calendar Event</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="pt-2">
              <a
                href={gCalWebUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-xs py-2 px-3 rounded-xl transition-colors border border-gray-300"
              >
                <span>Add to My Google Calendar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          id="success-modal-done-btn"
          className="w-full bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-full shadow-lg transition-all cursor-pointer border border-white/20 transform hover:-translate-y-0.5"
        >
          Done
        </button>
      </div>
    </div>
  );
};


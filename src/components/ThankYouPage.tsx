import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ExternalLink, 
  Download, 
  ArrowLeft, 
  FileText, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ContactFormData } from '../types';
import { TARGET_ADMIN_EMAIL } from '../services/googleWorkspace';
import { PHONE_NUMBER } from '../data/contentData';

interface ThankYouPageProps {
  data: ContactFormData | null;
  onBackToMain: () => void;
  onBrowseCaseStudies?: () => void;
}

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  data,
  onBackToMain,
  onBrowseCaseStudies
}) => {
  // Fire Google Ads & Google Analytics conversion tags on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // 1. Data Layer Push for GTM / Google Analytics 4
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_form_submitted',
        event_category: 'Consultation Booking',
        event_label: data?.service || 'Marketing Strategy Session',
        value: 1.0,
        currency: 'USD',
        lead_name: data ? `${data.firstName} ${data.lastName}`.trim() : 'Prospective Client',
        lead_email: data?.email || '',
        lead_service: data?.service || 'Marketing Automation',
        lead_date: data?.selectedDate || '',
        lead_time: data?.selectedTimeSlot || ''
      });

      // 2. Direct gtag call if Google Tag is present
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          value: 1.0,
          currency: 'USD',
          event_label: data?.service || 'Strategy Session'
        });
      }

      // 3. Meta / Facebook Pixel Lead event if present
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: data?.service || 'Strategy Session',
          currency: 'USD',
          value: 1.0
        });
      }
    } catch (e) {
      console.warn('Analytics conversion tracking notification:', e);
    }
  }, [data]);

  const clientName = data?.firstName ? `${data.firstName} ${data.lastName}`.trim() : 'Valued Client';
  const displayDate = data?.selectedDate || 'August 6, 2026';
  const displayTime = data?.selectedTimeSlot || '10:00 AM - 11:00 AM (EDT)';
  const displayService = data?.service || 'Custom Marketing Automation & PPC Growth System';
  const displayEmail = data?.email || 'Your provided email';

  // Google Calendar Universal Web URL
  const calTitle = encodeURIComponent(`1-on-1 Marketing Strategy Session: ${clientName}`);
  const calDetails = encodeURIComponent(
    `Marketing Automation Strategy Call with Deon Howard (${TARGET_ADMIN_EMAIL})\n\n` +
    `Client: ${clientName}\n` +
    `Email: ${displayEmail}\n` +
    `Phone: ${data?.phone || PHONE_NUMBER}\n` +
    `Service: ${displayService}\n` +
    `Target Monthly Budget: ${data?.budget || 'Custom'}\n\n` +
    `Meeting Host: Deon Howard PPC (${TARGET_ADMIN_EMAIL})`
  );
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&details=${calDetails}&add=${encodeURIComponent(TARGET_ADMIN_EMAIL)},${encodeURIComponent(displayEmail)}`;

  // Download .ics file helper
  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Deon Howard PPC//Strategy Session//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Strategy Session: ${clientName} & Deon Howard`,
      `DESCRIPTION:1-on-1 Strategy Consultation with Deon Howard (${TARGET_ADMIN_EMAIL}) for ${displayService}.`,
      `STATUS:CONFIRMED`,
      `ORGANIZER;CN=Deon Howard:MAILTO:${TARGET_ADMIN_EMAIL}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Deon_Howard_Strategy_Session.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white selection:bg-[#9ce2c7] selection:text-black">
      
      {/* Top Navigation Header */}
      <header className="border-b border-white/10 bg-[#121212]/95 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button
            onClick={onBackToMain}
            id="thankyou-back-header-btn"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white hover:text-[#9ce2c7] transition-colors flex items-center space-x-1"
          >
            <span>DEON HOWARD</span>
            <span className="text-[#9ce2c7] font-normal mx-1">/</span>
            <span className="font-bold text-lg text-gray-400">PPC</span>
          </button>

          <button
            onClick={onBackToMain}
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#9ce2c7] transition-colors py-2 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Main Site</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Success Icon & Headline */}
        <div className="text-center space-y-4 mb-12">
          <div className="mx-auto w-20 h-20 rounded-3xl bg-[#9ce2c7]/20 border border-[#9ce2c7]/40 flex items-center justify-center text-[#9ce2c7] shadow-xl">
            <CheckCircle2 className="w-10 h-10 text-[#9ce2c7]" />
          </div>

          <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
            Booking Confirmed • Route: /thank-you
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Thank You, <span className="text-[#9ce2c7]">{clientName}</span>!
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto font-sans leading-relaxed">
            Your 1-on-1 Strategy Consultation has been scheduled and recorded. Deon Howard will personally review your business model prior to the call.
          </p>
        </div>

        {/* Confirmed Booking Summary Card */}
        <div className="bg-[#1b2620] border border-[#9ce2c7]/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 mb-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#9ce2c7] bg-[#9ce2c7]/10 px-2.5 py-1 rounded-md border border-[#9ce2c7]/20">
                Confirmed Appointment Details
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
                1-on-1 Marketing Automation Consultation
              </h2>
            </div>

            <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Calendar Event Synced</span>
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-1">
              <div className="flex items-center space-x-2 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <Calendar className="w-3.5 h-3.5 text-[#9ce2c7]" />
                <span>Scheduled Date</span>
              </div>
              <p className="text-base font-bold text-white">{displayDate}</p>
            </div>

            <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-1">
              <div className="flex items-center space-x-2 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <Clock className="w-3.5 h-3.5 text-[#9ce2c7]" />
                <span>Time Slot (EDT)</span>
              </div>
              <p className="text-base font-bold text-white">{displayTime}</p>
            </div>

            <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-1">
              <div className="flex items-center space-x-2 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <Mail className="w-3.5 h-3.5 text-[#9ce2c7]" />
                <span>Confirmation Sent To</span>
              </div>
              <p className="text-sm font-bold text-white truncate">{displayEmail}</p>
            </div>

            <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-1">
              <div className="flex items-center space-x-2 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9ce2c7]" />
                <span>Meeting Host & Direct Route</span>
              </div>
              <p className="text-sm font-bold text-white truncate">{TARGET_ADMIN_EMAIL}</p>
            </div>
          </div>

          {/* Selected Service & Company */}
          <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-1 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Focus Area / Service:
            </span>
            <p className="text-sm font-semibold text-[#9ce2c7]">
              {displayService} {data?.companyName ? `• ${data.companyName}` : ''}
            </p>
          </div>

          {/* Add to Calendar Actions */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-300">
              Add to Your Personal Calendar:
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noreferrer"
                id="thankyou-add-google-cal-btn"
                className="inline-flex items-center justify-center space-x-2 bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md"
              >
                <span>Add to Google Calendar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleDownloadICS}
                id="thankyou-download-ics-btn"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all border border-white/15"
              >
                <Download className="w-3.5 h-3.5 text-[#9ce2c7]" />
                <span>Download iCal / Outlook (.ics)</span>
              </button>
            </div>
          </div>

        </div>

        {/* What Happens Next Steps */}
        <div className="bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#9ce2c7]" />
            <span>What to Expect Next</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-300">
            <div className="space-y-1">
              <span className="font-bold text-[#9ce2c7]">1. Email Notification</span>
              <p>A confirmation email and Google Meet link have been sent to your inbox.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#9ce2c7]">2. Audit Preparation</span>
              <p>Deon will audit your ad account or website structure prior to the call.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#9ce2c7]">3. Strategy Blueprint</span>
              <p>During the session, you'll walk away with an actionable growth blueprint.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBackToMain}
            id="thankyou-back-main-btn"
            className="w-full sm:w-auto bg-[#9ce2c7] hover:bg-[#8bd6ba] text-black font-black uppercase tracking-widest text-xs py-4 px-8 rounded-full transition-all shadow-xl cursor-pointer"
          >
            Return to Homepage
          </button>

          <a
            href={`tel:${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-full transition-all border border-white/15 text-center flex items-center justify-center space-x-2"
          >
            <Phone className="w-3.5 h-3.5 text-[#9ce2c7]" />
            <span>Call Urgent Questions: {PHONE_NUMBER}</span>
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-gray-500">
        <p>© 2026 Deon Howard PPC • Automated Marketing Systems</p>
      </footer>

    </div>
  );
};

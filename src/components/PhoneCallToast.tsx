import React, { useState, useEffect } from 'react';
import { Phone, Check, Copy, X, ExternalLink } from 'lucide-react';
import { PHONE_NUMBER, PHONE_TEL } from '../data/contentData';
import { handlePhoneCall } from '../utils/phone';
import { trackPhoneAction } from '../utils/analytics';

export const PhoneCallToast: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handlePhoneEvent = () => {
      setIsOpen(true);
      setCopied(true);
      const timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('phone-call-triggered', handlePhoneEvent);
    return () => window.removeEventListener('phone-call-triggered', handlePhoneEvent);
  }, []);

  if (!isOpen) return null;

  const handleCopy = () => {
    trackPhoneAction('number_copied', 'toast');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(PHONE_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const googleVoiceUrl = "https://voice.google.com/u/0/calls?a=nc,%2B17863614886";

  return (
    <div
      id="phone-call-toast"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 transition-all duration-300 transform animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-full bg-[#131d17] flex items-center justify-center text-[#9ce2c7] shrink-0">
          <Phone className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-gray-900">{PHONE_NUMBER}</h4>
            {copied && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <Check className="w-3 h-3" /> Copied
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-0.5">
            Direct line to Deon Howard. Number copied to clipboard.
          </p>
          
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <button
              type="button"
              id="phone-toast-dial-btn"
              onClick={(e) => {
                trackPhoneAction('dialer_launched', 'toast');
                handlePhoneCall(e, 'toast');
              }}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#131d17] hover:bg-black text-white text-xs font-bold rounded-lg transition-colors shadow-sm active:scale-95 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#9ce2c7]" />
              <span>Launch Dialer</span>
            </button>

            <button
              type="button"
              id="phone-toast-copy-btn"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-colors active:scale-95 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-gray-500" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <a
              href={googleVoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="phone-toast-gvoice-btn"
              onClick={() => trackPhoneAction('google_voice_opened', 'toast')}
              title="Open Google Voice in new tab"
              className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              <span>Google Voice</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>
          </div>
        </div>

        <button
          type="button"
          id="phone-toast-close-btn"
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};


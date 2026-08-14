import React from 'react';
import { CALLOUT_PHONE_IMG, PHONE_NUMBER } from '../data/contentData';
import { Phone } from 'lucide-react';

export const CalloutBanner: React.FC = () => {
  return (
    <section className="bg-[#121212] text-white py-16 md:py-24 border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Centered Circular Image */}
        <div className="flex justify-center">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#9ce2c7]/40 shadow-2xl p-1 bg-[#9ce2c7]/10">
            <img
              src={CALLOUT_PHONE_IMG}
              alt="Consultant on growth strategy call"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
            Immediate Action
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Get Your Custom <span className="text-[#9ce2c7]">Growth Strategy</span>
          </h2>
          <p className="text-xl sm:text-2xl font-semibold text-gray-300">
            Secure Your Free Strategy Consultation Today
          </p>
        </div>

        {/* Phone Button */}
        <div>
          <a
            href={`tel:${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
            id="callout-phone-btn"
            className="inline-flex items-center space-x-3 bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer border border-white/20 transform hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4 fill-current text-[#9ce2c7]" />
            <span>Call {PHONE_NUMBER}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { CALLOUT_PHONE_IMG, PHONE_NUMBER, PHONE_TEL } from '../data/contentData';
import { handlePhoneCall } from '../utils/phone';
import { Phone } from 'lucide-react';
import { AnimatedImage } from './AnimatedImage';
import { motion } from 'motion/react';

export const CalloutBanner: React.FC = () => {
  return (
    <section className="bg-[#121212] text-white py-16 md:py-24 border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Centered Circular Image */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#9ce2c7]/40 shadow-2xl p-1 bg-[#9ce2c7]/10"
          >
            <AnimatedImage
              src={CALLOUT_PHONE_IMG}
              alt="Professional on a strategy phone call"
              className="w-full h-full object-cover rounded-full"
              wrapperClassName="w-full h-full rounded-full"
              scale={false}
            />
          </motion.div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
            Immediate Action
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Get Your Custom <span className="text-[#9ce2c7]">Automation System Roadmap</span>
          </h2>
          <p className="text-xl sm:text-2xl font-semibold text-gray-300">
            Discover How Marketing Automation Systems Can Save Time & Multiply Customers
          </p>
        </div>

        {/* Phone Button */}
        <div>
          <a
            href={PHONE_TEL}
            id="callout-phone-btn"
            onClick={handlePhoneCall}
            title={`Call ${PHONE_NUMBER}`}
            className="inline-flex items-center space-x-3 bg-[#9ce2c7] hover:bg-[#8ee0c1] text-black font-extrabold uppercase tracking-widest text-xs px-8 py-4 rounded-full shadow-xl transition-all cursor-pointer border border-[#7ed4b4] transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Phone className="w-4 h-4 fill-current text-black" />
            <span>Call {PHONE_NUMBER}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { STRATEGY_CALL_IMG } from '../data/contentData';
import { Clock } from 'lucide-react';
import { AnimatedImage } from './AnimatedImage';
import { motion } from 'motion/react';

interface CuriousCalloutProps {
  onBookClick: () => void;
}

export const CuriousCallout: React.FC<CuriousCalloutProps> = ({ onBookClick }) => {
  return (
    <section className="bg-[#9ce2c7] py-16 md:py-24 border-b border-[#8bd6ba]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-white/60"
        >
          
          {/* Left Column Image */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[440px]">
            <AnimatedImage
              src={STRATEGY_CALL_IMG}
              alt="Hands taking notes in strategy planning session"
              className="w-full h-full object-cover"
              wrapperClassName="w-full h-full absolute inset-0"
              scale={false}
            />
            <div className="absolute inset-0 bg-[#131d17]/30 pointer-events-none"></div>
          </div>

          {/* Right Column Dark Card Content */}
          <div className="lg:col-span-6 bg-[#121212] text-white p-8 md:p-14 flex flex-col justify-center items-center text-center space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9ce2c7]">
                Ready to Automate Your Marketing?
              </p>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Book Your <span className="text-[#9ce2c7]">Free Automation Call</span>
              </h3>
            </div>

            <div className="bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl w-full max-w-sm space-y-4">
              <h4 className="text-xl font-bold text-white">
                Free AI & Growth Strategy Call
              </h4>

              <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#9ce2c7]">
                <Clock className="w-4 h-4 text-[#9ce2c7]" />
                <span>1 Hour • Custom Automation Blueprint</span>
              </div>

              <button
                id="curious-callout-book-now-btn"
                onClick={onBookClick}
                className="w-full bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-full transition-all shadow-lg cursor-pointer border border-white/20"
              >
                Book Now
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

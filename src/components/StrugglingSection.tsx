import React from 'react';
import { MARKETING_LAPTOP_IMG } from '../data/contentData';
import { Search, BarChart2, Share2, FileText, MousePointerClick } from 'lucide-react';
import { AnimatedImage } from './AnimatedImage';
import { motion } from 'motion/react';

export const StrugglingSection: React.FC = () => {
  return (
    <section id="struggling" className="bg-[#9ce2c7] text-[#131d17] py-20 md:py-28 border-b border-[#8bd6ba]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">
              01 / The Challenge
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131d17] leading-tight">
              Is Your Business Struggling to <span className="text-black">Grow Online?</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#1a2e24] font-sans">
              <p>
                You're ready to grow your business online, but don't know where to start. Maybe you're new in the space and trying to get your foot in the door, or you and your team are trying to figure out how to scale your existing campaigns efficiently.
              </p>

              <p>
                You know online advertising is the answer, but navigating online marketing is challenging. Managing your own ads, integrating them into your greater marketing strategy, and iterating on results feels like a full-time job on its own—taking away from what's really important: running your business.
              </p>
            </div>

            {/* Accent Highlight Banner */}
            <div className="pt-4 pb-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                That's where Deon Howard PPC comes in.
              </h3>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-[#1a2e24] font-sans">
              My specialty is simple: I translate your business goals into high-impact campaigns that drive real results. With my end-to-end digital marketing services, I eliminate the guesswork and attract the online customers you want—so you can focus on running your business.
            </p>
          </div>

          {/* Right Image Column with Overlay Tags */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/80 bg-white p-2"
            >
              <AnimatedImage
                src={MARKETING_LAPTOP_IMG}
                alt="Digital Marketer evaluating online growth challenge"
                className="w-full h-[400px] sm:h-[480px] object-cover rounded-2xl"
                wrapperClassName="w-full h-[400px] sm:h-[480px] rounded-2xl"
                scale={false}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes('Confused%20Marketer')) {
                    target.src = '/images/confused-marketer.png';
                  }
                }}
              />

              {/* SEM Floating Overlay Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-8 left-6 bg-white/95 backdrop-blur-sm text-[#131d17] px-4 py-2 rounded-full border border-gray-100 flex items-center space-x-2 font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <MousePointerClick className="w-4 h-4 text-black" />
                <span>SEM</span>
              </motion.div>

              {/* SEO Overlay Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute top-28 left-10 bg-white/95 backdrop-blur-sm text-[#131d17] px-4 py-2 rounded-full border border-gray-100 flex items-center space-x-2 font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <Search className="w-4 h-4 text-black" />
                <span>SEO</span>
              </motion.div>

              {/* Analytics Overlay Tag */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="absolute top-12 right-6 bg-white/95 backdrop-blur-sm text-[#131d17] px-4 py-2 rounded-full border border-gray-100 flex items-center space-x-2 font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <BarChart2 className="w-4 h-4 text-black" />
                <span>Analytics</span>
              </motion.div>

              {/* Social Media Tag */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-20 left-8 bg-white/95 backdrop-blur-sm text-[#131d17] px-4 py-2 rounded-full border border-gray-100 flex items-center space-x-2 font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <Share2 className="w-4 h-4 text-black" />
                <span>Social Media</span>
              </motion.div>

              {/* Content Marketing Tag */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="absolute bottom-10 right-6 bg-white/95 backdrop-blur-sm text-[#131d17] px-4 py-2 rounded-full border border-gray-100 flex items-center space-x-2 font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <FileText className="w-4 h-4 text-black" />
                <span>Content Marketing</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

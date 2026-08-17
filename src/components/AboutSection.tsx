import React from 'react';
import { DEON_PORTRAIT } from '../data/contentData';
import { AnimatedImage } from './AnimatedImage';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative bg-[#121212] text-white py-20 md:py-28 border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
              02 / Specialist Profile
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              About <span className="text-[#9ce2c7]">Deon Howard PPC</span>
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-sans">
              I specialize in architecting custom marketing automation systems powered by AI for growth-minded businesses. By combining machine learning advertising engines on Google and Meta with connected lead nurture workflows and conversion funnels, I help companies generate more customers and sales while saving founders and marketing teams hours of manual effort.
            </p>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-sans">
              With over 8+ years of experience managing more than $200M in ad spend, I partner directly with business owners to replace disconnected, time-consuming manual tactics with systematic, high-ROI marketing automation systems that deliver consistent, predictable business results on autopilot.
            </p>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#9ce2c7]">8+ Years</p>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Growth & Ad Expertise</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#9ce2c7]">$200M+</p>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Ad Spend Managed</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#9ce2c7]">20+ Hrs</p>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Saved / Wk with AI</p>
              </div>
            </div>
          </div>

          {/* Right Column: Circular Portrait Image */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full p-2.5 border-2 border-[#9ce2c7] bg-[#9ce2c7]/20 shadow-2xl"
            >
              <div className="w-full h-full rounded-full overflow-hidden border border-[#9ce2c7]/50 bg-[#121212]">
                <AnimatedImage
                  src={DEON_PORTRAIT}
                  alt="Deon Howard - Digital Marketing Specialist"
                  className="w-full h-full object-cover object-[center_30%] scale-120 transform hover:scale-130 transition-transform duration-500"
                  wrapperClassName="w-full h-full rounded-full"
                  scale={false}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('DH%20PPC.png')) {
                      target.src = '/images/dh-ppc.png';
                    } else if (target.src.includes('dh-ppc.png')) {
                      target.src = '/images/deon-howard.png';
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

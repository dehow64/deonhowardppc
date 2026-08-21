import React from 'react';
import { MARKETING_LAPTOP_IMG } from '../data/contentData';
import { Bot, Zap, BarChart2, Share2, ArrowRight, Layers, Shuffle, CheckCircle2 } from 'lucide-react';
import { AnimatedImage } from './AnimatedImage';
import { motion } from 'motion/react';

export const StrugglingSection: React.FC = () => {
  return (
    <section id="struggling" className="bg-[#9ce2c7] text-[#131d17] py-20 md:py-28 border-b border-[#8bd6ba] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">
              01 / The Growth Dilemma
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131d17] leading-tight">
              Ready to Scale Your Business, But <span className="text-black">Not Sure Where to Start?</span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-[#1a2e24] font-sans">
              Scaling a business requires a steady, dependable flow of qualified leads and customers. Yet most businesses hit a frustrating growth plateau because they find themselves in one of two situations:
            </p>

            {/* Two Groups Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Group 1 Card */}
              <div className="bg-white/85 backdrop-blur-sm border border-white p-5 rounded-2xl shadow-sm space-y-2.5">
                <div className="flex items-center space-x-2 text-black font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-[#9ce2c7] text-black flex items-center justify-center text-xs font-black">1</span>
                  <span>Stuck in Manual & Organic Channels</span>
                </div>
                <p className="text-xs sm:text-sm text-[#1a2e24] leading-relaxed font-sans">
                  Relying solely on word-of-mouth, referrals, standard website traffic, or sporadic organic social media posts. You know organic alone cannot scale predictably, and you need a structured way to start acquiring customers proactively.
                </p>
              </div>

              {/* Group 2 Card */}
              <div className="bg-white/85 backdrop-blur-sm border border-white p-5 rounded-2xl shadow-sm space-y-2.5">
                <div className="flex items-center space-x-2 text-black font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-[#9ce2c7] text-black flex items-center justify-center text-xs font-black">2</span>
                  <span>Running Disconnected Campaigns</span>
                </div>
                <p className="text-xs sm:text-sm text-[#1a2e24] leading-relaxed font-sans">
                  You already have digital ads running, but your campaigns, CRM, and follow-ups operate in silos. You're losing qualified leads, wasting ad budget, and missing the operational efficiency needed to scale smoothly.
                </p>
              </div>
            </div>

            {/* The Common Missing Piece */}
            <div className="bg-black/90 text-white p-5 rounded-2xl border border-black shadow-md space-y-2">
              <div className="flex items-center space-x-2 text-[#9ce2c7] text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#9ce2c7]" />
                <span>The Core Missing Link</span>
              </div>
              <p className="text-sm sm:text-base font-semibold leading-relaxed text-gray-200">
                Either way, both groups need the exact same thing: <span className="text-[#9ce2c7] font-bold">a predictable, reliable marketing automation system</span> to capture leads, close sales, and scale revenue consistently.
              </p>
            </div>

            {/* Solution Introduction */}
            <div className="pt-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                That's where Deon Howard PPC comes in.
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-[#1a2e24] font-sans mt-3">
                I engineer intelligent, AI-powered marketing automation systems designed to eliminate manual busywork, connect your entire acquisition funnel, and deliver predictable results—whether that's more customer appointments or surging sales at scale.
              </p>
            </div>
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
                alt="Business scaling with Marketing Automation Systems"
                className="w-full h-[450px] sm:h-[520px] object-cover rounded-2xl"
                wrapperClassName="w-full h-[450px] sm:h-[520px] rounded-2xl"
                scale={false}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes('Confused%20Marketer')) {
                    target.src = '/images/confused-marketer.png';
                  }
                }}
              />

              {/* AI Systems Floating Overlay Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-8 left-6 bg-white/95 backdrop-blur-sm text-[#131d17] px-4 py-2 rounded-full border border-gray-100 flex items-center space-x-2 font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <Bot className="w-4 h-4 text-black" />
                <span>AI Automation Systems</span>
              </motion.div>

              {/* Connected Funnels Overlay Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute top-28 left-10 bg-white/95 backdrop-blur-sm text-[#131d17] px-4 py-2 rounded-full border border-gray-100 flex items-center space-x-2 font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <Zap className="w-4 h-4 text-black" />
                <span>Connected Funnels</span>
              </motion.div>

              {/* Predictable Scaling Overlay Tag */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="absolute top-12 right-6 bg-white/95 backdrop-blur-sm text-[#131d17] px-4 py-2 rounded-full border border-gray-100 flex items-center space-x-2 font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <BarChart2 className="w-4 h-4 text-black" />
                <span>Predictable Scaling</span>
              </motion.div>

              {/* Zero Busywork Tag */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-20 left-8 bg-white/95 backdrop-blur-sm text-[#131d17] px-4 py-2 rounded-full border border-gray-100 flex items-center space-x-2 font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <Layers className="w-4 h-4 text-black" />
                <span>Zero Busywork</span>
              </motion.div>

              {/* Leads & Sales at Scale Tag */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="absolute bottom-10 right-6 bg-white/95 backdrop-blur-sm text-[#131d17] px-4 py-2 rounded-full border border-gray-100 flex items-center space-x-2 font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <ArrowRight className="w-4 h-4 text-black" />
                <span>Leads & Sales at Scale</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};


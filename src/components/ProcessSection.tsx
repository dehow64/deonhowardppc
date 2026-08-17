import React from 'react';
import { PROCESS_STEPS } from '../data/contentData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="bg-[#9ce2c7] text-[#131d17] py-20 md:py-28 border-b border-[#8bd6ba] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title & Intro */}
        <div className="text-center max-w-4xl mx-auto space-y-3 mb-16">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">
            07 / Execution Framework
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131d17]">
            A Proven Framework for <span className="text-black">Automated Growth</span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-[#1a2e24] max-w-2xl mx-auto font-sans">
            I don't just launch campaigns; I engineer automated AI marketing systems designed to save you time and drive sustainable results, whether that's booked customer appointments or accelerated online sales.
          </p>
        </div>

        {/* Sequential Step Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="relative flex flex-col justify-between items-start text-left space-y-4 p-8 bg-white/95 border border-white rounded-3xl shadow-lg hover:border-black transition-all duration-300 transform hover:-translate-y-1 group"
            >
              {/* Header Badge & Step Numbering */}
              <div className="w-full flex items-center justify-between border-b border-black/15 pb-4">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black text-[#9ce2c7] text-[11px] font-black uppercase tracking-widest">
                  <span>Step 0{step.number}</span>
                </span>

                <div className="text-3xl font-black text-black/15 group-hover:text-black/30 transition-colors">
                  0{step.number}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2.5 flex-1 pt-2">
                <h3 className="text-xl font-extrabold text-[#131d17] group-hover:text-black transition-colors leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#23382c] leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>

              {/* Footer indicator showing progression */}
              <div className="w-full pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500">
                <span className="flex items-center space-x-1 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px] uppercase tracking-wider">Phase 0{step.number}</span>
                </span>

                {idx < PROCESS_STEPS.length - 1 && (
                  <span className="text-black group-hover:translate-x-1 transition-transform flex items-center space-x-1 text-[11px] font-black uppercase tracking-widest">
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

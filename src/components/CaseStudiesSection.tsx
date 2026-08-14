import React from 'react';
import { CASE_STUDIES } from '../data/contentData';
import { CaseStudy } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onSelectCaseStudy }) => {
  return (
    <section id="case-studies" className="bg-[#121212] text-white py-20 md:py-28 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
            08 / Verified Results
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Case <span className="text-[#9ce2c7]">Studies</span>
          </h2>
          <p className="text-base sm:text-lg font-semibold text-gray-300">
            Proven Results, Real-World Growth.
          </p>
        </div>

        {/* 3 Case Study Banner Cards Grid */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              id={`case-study-card-${study.id}`}
              onClick={() => onSelectCaseStudy(study)}
              className="group relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-[#9ce2c7] transition-all duration-300 cursor-pointer bg-[#1a1a1a]"
            >
              {/* Background Cover Image with Gradient */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent"></div>
              </div>

              {/* Foreground Card Content */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="bg-black text-white text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-white/20">
                    {study.category}
                  </span>

                  <span className="bg-white/10 backdrop-blur-sm p-2 rounded-full text-white group-hover:bg-[#9ce2c7] group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-[#9ce2c7] transition-colors leading-tight">
                    {study.title}
                  </h3>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/10">
                    {study.metrics.map((m, idx) => (
                      <div key={idx}>
                        <p className="text-xl sm:text-3xl font-extrabold text-[#9ce2c7]">{m.value}</p>
                        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-300 mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

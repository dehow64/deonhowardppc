import React from 'react';
import { BENEFITS_DATA } from '../data/contentData';
import { Clock, UserCheck, TrendingUp, Sparkles } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-8 h-8 text-black" />;
      case 'UserCheck':
        return <UserCheck className="w-8 h-8 text-black" />;
      case 'TrendingUp':
        return <TrendingUp className="w-8 h-8 text-black" />;
      default:
        return <Sparkles className="w-8 h-8 text-black" />;
    }
  };

  return (
    <section id="benefits" className="relative bg-[#9ce2c7] text-[#131d17] py-20 md:py-28 border-b border-[#8bd6ba]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">
            03 / Key Advantages
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131d17]">
            Benefits of <span className="text-black">Marketing Automation Systems</span>
          </h2>
          <p className="text-sm sm:text-base text-[#1a2e24] max-w-2xl mx-auto font-sans">
            How intelligent, connected systems powered by AI help you save time, capture more customers, and scale revenue predictably.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BENEFITS_DATA.map((benefit, index) => (
            <div
              key={benefit.id}
              className="bg-white/95 p-8 border border-white rounded-3xl shadow-lg space-y-5 flex flex-col justify-between hover:border-black transition-all transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-black/10 rounded-2xl border border-black/10 flex items-center justify-center">
                    {getIcon(benefit.icon)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-black">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#131d17] mb-3">
                  {benefit.title}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-[#23382c] font-sans">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

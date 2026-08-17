import React from 'react';
import { OBJECTIVES_DATA } from '../data/contentData';
import { Users, CreditCard, Globe, Repeat, Sparkles } from 'lucide-react';

export const ObjectivesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-7 h-7 text-[#9ce2c7]" />;
      case 'CreditCard':
        return <CreditCard className="w-7 h-7 text-[#9ce2c7]" />;
      case 'Globe':
        return <Globe className="w-7 h-7 text-[#9ce2c7]" />;
      case 'Repeat':
        return <Repeat className="w-7 h-7 text-[#9ce2c7]" />;
      default:
        return <Sparkles className="w-7 h-7 text-[#9ce2c7]" />;
    }
  };

  return (
    <section id="objectives" className="bg-[#121212] text-white py-20 md:py-28 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
            04 / Core Objectives
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Business Objectives <span className="text-[#9ce2c7]">Supported</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            How AI-powered websites, intelligent ad campaigns, and automated workflows drive tangible growth across every stage of your business.
          </p>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OBJECTIVES_DATA.map((obj) => (
            <div
              key={obj.id}
              className="flex flex-col items-start text-left space-y-4 p-7 bg-[#1a1a1a] border border-white/10 rounded-2xl hover:border-[#9ce2c7] transition-all duration-200"
            >
              <div className="p-3 bg-black border border-[#9ce2c7]/20 rounded-xl">
                {getIcon(obj.icon)}
              </div>

              <h3 className="text-xl font-bold text-white">
                {obj.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                {obj.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

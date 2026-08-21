import React from 'react';
import { SERVICES_DATA } from '../data/contentData';
import { Layout, Sparkles, TrendingUp, BarChart3, CheckCircle2, Bot, Zap, Clock } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-8 h-8 text-black" />;
      case 'TrendingUp':
        return <TrendingUp className="w-8 h-8 text-black" />;
      case 'Layout':
        return <Layout className="w-8 h-8 text-black" />;
      case 'BarChart3':
        return <BarChart3 className="w-8 h-8 text-black" />;
      case 'Bot':
        return <Bot className="w-8 h-8 text-black" />;
      default:
        return <Sparkles className="w-8 h-8 text-black" />;
    }
  };

  return (
    <section id="services" className="bg-[#9ce2c7] text-[#131d17] py-20 md:py-28 border-b border-[#8bd6ba] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3 mb-16">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">
            06 / AI Automation Systems & Capabilities
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131d17]">
            Marketing Automation Systems <span className="text-black">Powered by AI</span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-[#1a2e24] max-w-3xl mx-auto font-sans">
            Eliminate manual marketing busywork and scale with confidence. I build custom, AI-powered marketing automation systems engineered to save your business valuable time and deliver predictable results—whether that's an influx of high-value customers or accelerated e-commerce sales.
          </p>
        </div>

        {/* 4 Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="bg-white/95 rounded-3xl p-8 shadow-lg border border-white flex flex-col justify-between space-y-6 hover:border-black transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-black/10 rounded-2xl border border-black/10">
                    {getIcon(service.iconName)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#131d17]">
                      {service.title}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-black mt-1">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {service.platforms && (
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1a2e24]">Tech Stack & Flows:</span>
                    {service.platforms.map((p) => (
                      <span
                        key={p}
                        className="bg-black text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-black/20"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-sm sm:text-base text-[#23382c] leading-relaxed font-sans">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/15 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-black">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Custom AI Architecture</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-black" />
                  <span>Saves 20+ Hrs / Week</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Automation Ecosystem Summary Bar */}
        <div className="bg-white/95 border border-white p-6 sm:p-8 rounded-3xl shadow-lg max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            
            {/* High-Converting Sites & Funnels */}
            <div className="flex flex-col justify-center items-center text-center space-y-2 py-4 md:py-2 px-4 sm:px-6">
              <div className="flex items-center space-x-1.5 text-black">
                <Layout className="w-4 h-4" />
                <h4 className="text-base font-bold text-[#131d17]">
                  AI Sites & Funnels
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#23382c] font-sans">
                Professional, on-brand, mobile-ready pages fully integrated with your channels
              </p>
            </div>

            {/* AI Ad Engines Column */}
            <div className="flex flex-col justify-center items-center text-center space-y-2 py-4 md:py-2 px-4 sm:px-6">
              <div className="flex items-center space-x-1.5 text-black">
                <Zap className="w-4 h-4" />
                <h4 className="text-base font-bold text-[#131d17]">
                  AI Customer Acquisition
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#23382c] font-sans">
                Google AI (Search/PMAX) & Meta Advantage+ automated targeting & smart bidding
              </p>
            </div>

            {/* Automation Tools & Reporting Column */}
            <div className="flex flex-col justify-center items-center text-center space-y-2 py-4 md:py-2 px-4 sm:px-6">
              <div className="flex items-center space-x-1.5 text-black">
                <BarChart3 className="w-4 h-4" />
                <h4 className="text-base font-bold text-[#131d17]">
                  Tools & Closed-Loop Reporting
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#23382c] font-sans">
                Instant AI lead workflows, CRM sync & predictive attribution analytics
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

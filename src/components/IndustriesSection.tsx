import React, { useState } from 'react';
import { INDUSTRIES_DATA } from '../data/contentData';
import { ChevronRight } from 'lucide-react';
import { AnimatedImage } from './AnimatedImage';
import { motion } from 'motion/react';
import { getPathForIndustry } from '../utils/routes';

interface IndustriesSectionProps {
  onBookClick: () => void;
  onSelectIndustry?: (industryId: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onBookClick, onSelectIndustry }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const handleIndustryClick = (id: string) => {
    setSelectedIndustry(id);
    if (onSelectIndustry) {
      onSelectIndustry(id);
    }
  };

  return (
    <section id="industries" className="bg-[#9ce2c7] text-[#131d17] py-20 md:py-28 border-b border-[#8bd6ba] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3 mb-16">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">
            05 / Vertical Expertise
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131d17]">
            Industries <span className="text-black">Supported</span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-[#1a2e24] max-w-3xl mx-auto font-sans">
            No matter your industry—be it home services like roofing, specialized professional services, or a vast e-commerce brand—your digital marketing campaigns are designed with your unique goals in mind. We go beyond simple ads to craft tailored digital marketing strategies that attract qualified leads, increase sales, and deliver maximum ROI.
          </p>
        </div>

        {/* 10 Industry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {INDUSTRIES_DATA.map((ind, index) => (
            <motion.a
              key={ind.id}
              id={`industry-card-${ind.id}`}
              href={getPathForIndustry(ind.id)}
              onClick={(e) => {
                // If standard click without modifier keys (cmd/ctrl), use client-side navigation
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  handleIndustryClick(ind.id);
                }
              }}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.55,
                delay: (index % 4) * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group bg-white/95 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-white hover:border-black flex flex-col cursor-pointer transform hover:-translate-y-1 text-left no-underline"
            >
              {/* Image thumbnail */}
              <div className="relative h-44 overflow-hidden bg-gray-100 border-b border-gray-100">
                <AnimatedImage
                  src={ind.image}
                  alt={ind.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  wrapperClassName="w-full h-full"
                  scale={false}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (ind.id === 'financial' && target.src.includes('Financial%20services')) {
                      target.src = '/images/Financial_services.png';
                    } else if (ind.id === 'financial' && target.src.includes('Financial_services')) {
                      target.src = '/images/financial-services.png';
                    } else {
                      const fallbacks: Record<string, string> = {
                        'medical': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
                        'financial': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
                        'fitness': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
                        'education': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
                        'travel': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
                      };
                      if (fallbacks[ind.id] && target.src !== fallbacks[ind.id]) {
                        target.src = fallbacks[ind.id];
                      }
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9ce2c7] flex items-center space-x-1">
                    <span>View Growth Strategy</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#9ce2c7]" />
                  </span>
                </div>
              </div>

              {/* Title & Subtext */}
              <div className="p-5 flex-1 flex flex-col justify-between text-center bg-white">
                <div>
                  <h3 className="text-lg font-bold text-[#131d17] group-hover:text-black transition-colors">
                    {ind.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#23382c] leading-relaxed font-sans">
                    {ind.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1a2e24]">
            Don't see your specific niche listed above?
          </p>
          <button
            id="industries-custom-strategy-btn"
            onClick={onBookClick}
            className="inline-flex items-center space-x-2 bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full transition-all shadow-lg cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Discuss Your Custom Industry Strategy</span>
            <ChevronRight className="w-4 h-4 text-[#9ce2c7]" />
          </button>
        </div>

      </div>
    </section>
  );
};

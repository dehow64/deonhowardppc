import React, { useState } from 'react';
import { INDUSTRY_ROUTES, getPathForIndustry } from '../utils/routes';
import { ChevronLeft, Copy, Check, ExternalLink, Globe } from 'lucide-react';

interface IndustrySubNavProps {
  currentIndustryId: string;
  onBackToMain: () => void;
  onSelectIndustry?: (industryId: string) => void;
}

export const IndustrySubNav: React.FC<IndustrySubNavProps> = ({
  currentIndustryId,
  onBackToMain,
  onSelectIndustry
}) => {
  const [copied, setCopied] = useState(false);
  const currentRoute = INDUSTRY_ROUTES.find(r => r.id === currentIndustryId);
  const currentPath = currentRoute ? `/${currentRoute.slug}` : `/${currentIndustryId}`;

  const handleCopyLink = () => {
    const fullUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}${currentPath}`
      : `https://deonhowardppc.com${currentPath}`;
    
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-[#181818] border-b border-white/10 py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Breadcrumbs & Direct URL Badge */}
        <div className="flex items-center space-x-2 text-xs text-gray-400 shrink-0 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center space-x-1.5 font-mono">
            <Globe className="w-3.5 h-3.5 text-[#9ce2c7]" />
            <span className="text-gray-400">deonhowardppc.com</span>
            <span className="text-[#9ce2c7] font-bold">{currentPath}</span>
          </div>

          <button
            onClick={handleCopyLink}
            id="copy-industry-url-btn"
            className="inline-flex items-center space-x-1 text-[11px] font-bold uppercase tracking-wider text-gray-300 hover:text-[#9ce2c7] bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md border border-white/10 transition-colors cursor-pointer"
            title="Copy Direct URL"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#9ce2c7]" />
                <span className="text-[#9ce2c7]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Share URL</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Quick Switcher for all 10 Industries */}
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full py-1 text-xs no-scrollbar">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-1.5 shrink-0 hidden lg:inline">
            Industries:
          </span>
          {INDUSTRY_ROUTES.map((route) => {
            const isActive = route.id === currentIndustryId;
            return (
              <a
                key={route.id}
                href={getPathForIndustry(route.id)}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0 && onSelectIndustry) {
                    e.preventDefault();
                    onSelectIndustry(route.id);
                  }
                }}
                className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#9ce2c7] text-black font-bold shadow-sm'
                    : 'bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/5'
                }`}
              >
                {route.name}
              </a>
            );
          })}
        </div>

      </div>
    </div>
  );
};

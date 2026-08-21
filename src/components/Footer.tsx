import React from 'react';
import { PHONE_NUMBER, PHONE_TEL, EMAIL_ADDRESS, INDUSTRIES_DATA } from '../data/contentData';
import { handlePhoneCall } from '../utils/phone';
import { Phone, Mail, ArrowUp, ChevronRight } from 'lucide-react';
import { getPathForIndustry } from '../utils/routes';

interface FooterProps {
  onSelectIndustry?: (industryId: string) => void;
  onSelectPrivacy?: () => void;
  onSelectAccessibility?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectIndustry,
  onSelectPrivacy,
  onSelectAccessibility
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#case-studies' },
    { label: 'Contact', href: '#contact' },
  ];

  const legalLinks = [
    { 
      label: 'Privacy Policy', 
      href: '/privacy-policy',
      onClick: onSelectPrivacy 
    },
    { 
      label: 'Accessibility Statement', 
      href: '/accessibility-statement',
      onClick: onSelectAccessibility 
    },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-black text-white pt-16 pb-12 border-t border-white/10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Left Column: Brand & Direct Contacts */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7] mb-1">
                Digital Growth Advisory
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Deon Howard <span className="text-[#9ce2c7]">PPC</span>
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <a
                  href={PHONE_TEL}
                  id="footer-phone-link"
                  onClick={handlePhoneCall}
                  title={`Call ${PHONE_NUMBER}`}
                  className="inline-flex items-center space-x-2.5 text-lg font-bold text-[#9ce2c7] hover:text-[#8bd6ba] hover:underline transition-colors active:scale-95 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#9ce2c7]/20 flex items-center justify-center border border-[#9ce2c7]/30">
                    <Phone className="w-4 h-4 text-[#9ce2c7]" />
                  </div>
                  <span>{PHONE_NUMBER}</span>
                </a>
              </div>

              <div>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  id="footer-email-link"
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white underline transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#9ce2c7]" />
                  <span>{EMAIL_ADDRESS}</span>
                </a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="pt-2 flex flex-col space-y-2">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  id={`footer-legal-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      if (link.onClick) {
                        link.onClick();
                      } else {
                        window.history.pushState(null, '', link.href);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }
                    }
                  }}
                  className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#9ce2c7] underline transition-colors w-max cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Middle Column: Industries Served */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#9ce2c7]">
              Specialized Industries
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {INDUSTRIES_DATA.slice(0, 8).map((ind) => (
                <a
                  key={ind.id}
                  href={getPathForIndustry(ind.id)}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0 && onSelectIndustry) {
                      e.preventDefault();
                      onSelectIndustry(ind.id);
                    }
                  }}
                  className="text-xs text-gray-400 hover:text-[#9ce2c7] transition-colors py-1 flex items-center space-x-1"
                >
                  <span className="truncate">{ind.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Main Navigation Links */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <nav className="flex flex-col space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#9ce2c7]">
                Quick Links
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  id={`footer-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#9ce2c7] transition-colors w-max"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-6">
              <button
                onClick={scrollToTop}
                id="footer-scroll-top-btn"
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#9ce2c7] transition-colors cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUp className="w-4 h-4 text-[#9ce2c7]" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-sans">
          <p>© {new Date().getFullYear()} Deon Howard PPC. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-bold uppercase tracking-wider text-[10px]">Conversion-Focused Digital Marketing & Ads Management</p>
        </div>

      </div>
    </footer>
  );
};

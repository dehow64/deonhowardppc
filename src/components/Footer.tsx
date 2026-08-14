import React from 'react';
import { PHONE_NUMBER, EMAIL_ADDRESS } from '../data/contentData';
import { Phone, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
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
    { label: 'Privacy Policy', href: '#' },
    { label: 'Accessibility Statement', href: '#' },
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
    <footer className="bg-black text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Left Column: Brand & Direct Contacts */}
          <div className="md:col-span-7 space-y-6">
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
                  href={`tel:${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
                  id="footer-phone-link"
                  className="inline-flex items-center space-x-2 text-lg font-bold text-[#9ce2c7] hover:underline"
                >
                  <Phone className="w-4 h-4 text-[#9ce2c7]" />
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
            <div className="pt-4 flex flex-col space-y-2">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  id={`footer-legal-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white underline transition-colors w-max"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Main Navigation Links */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <nav className="flex flex-col space-y-3">
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

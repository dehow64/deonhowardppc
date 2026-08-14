import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Calendar, ChevronUp, ChevronDown, ArrowUp, ArrowDown, Compass } from 'lucide-react';
import { PHONE_NUMBER } from '../data/contentData';

interface HeaderProps {
  onBookClick: () => void;
  onRealEstateClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick, onRealEstateClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', num: '01' },
    { label: 'The Challenge', href: '#struggling', num: '02' },
    { label: 'About Deon', href: '#about', num: '03' },
    { label: 'Key Benefits', href: '#benefits', num: '04' },
    { label: 'Business Objectives', href: '#objectives', num: '05' },
    { label: 'Industries Supported', href: '#industries', num: '06' },
    { label: 'Real Estate Focus', href: '#real-estate', num: '07', isSpecial: true },
    { label: 'Services & Platforms', href: '#services', num: '08' },
    { label: '6-Step Process', href: '#process', num: '09' },
    { label: 'Case Studies', href: '#case-studies', num: '10' },
    { label: 'Contact & Booking', href: '#contact', num: '11' },
  ];

  // Scrollspy active section detector and scroll threshold
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link: { label: string; href: string; isSpecial?: boolean }) => {
    setMenuOpen(false);
    if (link.isSpecial && onRealEstateClick) {
      onRealEstateClick();
      return;
    }
    const targetId = link.href.substring(1);
    const element = document.getElementById(targetId) || document.querySelector(link.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollUp = () => {
    const sections = navLinks.map(link => link.href.substring(1));
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex > 0) {
      const prevSection = document.getElementById(sections[currentIndex - 1]);
      if (prevSection) {
        prevSection.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    const sections = navLinks.map(link => link.href.substring(1));
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex >= 0 && currentIndex < sections.length - 1) {
      const nextSection = document.getElementById(sections[currentIndex + 1]);
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Header Bar without inline menu links */}
      <header className="sticky top-0 z-40 bg-[#9ce2c7]/95 backdrop-blur-md border-b border-black/15 text-[#131d17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a 
            href="#home" 
            id="header-brand-logo"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick({ label: 'Home', href: '#home' });
            }}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#131d17] hover:text-black transition-colors flex items-center space-x-1 shrink-0"
          >
            <span>DEON HOWARD</span>
            <span className="text-black font-normal mx-1">/</span>
            <span className="font-bold text-lg tracking-normal text-[#1a2e24]">PPC</span>
          </a>

          {/* Header Right Actions */}
          <div className="flex items-center space-x-3">
            <a
              href={`tel:${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
              id="header-phone-link"
              className="hidden sm:flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#131d17] hover:text-black transition-colors px-3 py-2 rounded-full hover:bg-black/10"
            >
              <Phone className="w-3.5 h-3.5 text-black" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <button
              id="header-book-now-btn"
              onClick={onBookClick}
              className="bg-black hover:bg-gray-900 text-white font-bold text-xs uppercase tracking-widest px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 shadow-md flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </button>

            {/* Burger Trigger Button in Header */}
            <button
              id="header-burger-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-black text-[#9ce2c7] hover:bg-gray-900 px-3.5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md cursor-pointer transition-all border border-black"
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? <X className="w-4 h-4 text-[#9ce2c7]" /> : <Menu className="w-4 h-4 text-[#9ce2c7]" />}
              <span className="inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Burger & Scroll Controller that follows the user down the page */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        {/* Quick Scroll Up/Down Buttons */}
        <div className="flex flex-col space-y-1 bg-black/90 p-1.5 rounded-2xl shadow-2xl backdrop-blur-md border border-[#9ce2c7]/40">
          <button
            onClick={handleScrollUp}
            id="floating-scroll-up-btn"
            title="Scroll Up / Previous Section"
            className="p-2 text-[#9ce2c7] hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer flex items-center justify-center"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          <button
            onClick={handleScrollDown}
            id="floating-scroll-down-btn"
            title="Scroll Down / Next Section"
            className="p-2 text-[#9ce2c7] hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer flex items-center justify-center"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Burger Menu Button */}
        <button
          id="floating-burger-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex items-center space-x-2.5 px-4 sm:px-5 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl transition-all duration-300 border-2 cursor-pointer ${
            menuOpen
              ? 'bg-[#9ce2c7] text-black border-black scale-105'
              : 'bg-black text-[#9ce2c7] border-[#9ce2c7] hover:bg-gray-900 hover:scale-105'
          }`}
        >
          {menuOpen ? (
            <>
              <X className="w-5 h-5 text-black" />
              <span>Close</span>
            </>
          ) : (
            <>
              <Menu className="w-5 h-5 text-[#9ce2c7]" />
              <span>Menu</span>
              {scrolled && (
                <span className="w-2 h-2 rounded-full bg-[#9ce2c7] animate-pulse ml-0.5" />
              )}
            </>
          )}
        </button>
      </div>

      {/* Slide-over Burger Menu Navigation Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#121212] text-white border-l border-white/15 shadow-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto no-scrollbar">
              
              {/* Drawer Top Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/15">
                  <div className="flex items-center space-x-2">
                    <Compass className="w-5 h-5 text-[#9ce2c7]" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-[#9ce2c7]">
                      Page Navigation
                    </span>
                  </div>

                  <button
                    id="drawer-close-btn"
                    onClick={() => setMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Quick Scroll Up/Down Action Banner */}
                <div className="my-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="text-xs font-bold text-gray-300">
                    <span className="block text-[10px] text-[#9ce2c7] font-mono uppercase">Quick Scroll</span>
                    Navigate page sections
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleScrollUp}
                      className="p-2.5 bg-black hover:bg-[#9ce2c7] hover:text-black text-[#9ce2c7] rounded-xl transition-all border border-white/20 flex items-center space-x-1 text-xs font-bold cursor-pointer"
                      title="Scroll Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                      <span className="hidden sm:inline">Up</span>
                    </button>

                    <button
                      onClick={handleScrollDown}
                      className="p-2.5 bg-black hover:bg-[#9ce2c7] hover:text-black text-[#9ce2c7] rounded-xl transition-all border border-white/20 flex items-center space-x-1 text-xs font-bold cursor-pointer"
                      title="Scroll Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                      <span className="hidden sm:inline">Down</span>
                    </button>
                  </div>
                </div>

                {/* Section Items List */}
                <nav className="space-y-1">
                  {navLinks.map((link) => {
                    const sectionId = link.href.substring(1);
                    const isActive = activeSection === sectionId;

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        id={`menu-item-${sectionId}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link);
                        }}
                        className={`group flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                          isActive
                            ? 'bg-[#9ce2c7] text-[#121212] font-black shadow-lg pl-5'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white hover:pl-5'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                            isActive ? 'bg-black text-[#9ce2c7]' : 'bg-white/10 text-gray-400 group-hover:text-white'
                          }`}>
                            {link.num}
                          </span>
                          <span className="text-sm font-bold uppercase tracking-wider">
                            {link.label}
                          </span>
                        </div>

                        {isActive && (
                          <span className="text-[10px] font-black uppercase tracking-widest bg-black text-[#9ce2c7] px-2.5 py-1 rounded-full">
                            Current
                          </span>
                        )}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-6 border-t border-white/15 space-y-3">
                <a
                  href={`tel:${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
                  className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#9ce2c7] py-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#9ce2c7]" />
                  <span>Call {PHONE_NUMBER}</span>
                </a>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onBookClick();
                  }}
                  className="w-full bg-[#9ce2c7] hover:bg-[#8bd6ba] text-[#121212] font-black text-xs uppercase tracking-widest py-3.5 rounded-full transition-all shadow-xl cursor-pointer"
                >
                  Book Strategy Session
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

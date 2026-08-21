import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Calendar, ChevronUp, ChevronDown, ArrowUp, ArrowDown, Compass, Check } from 'lucide-react';
import { PHONE_NUMBER, PHONE_TEL, WHATSAPP_NUMBER, WHATSAPP_URL } from '../data/contentData';
import { handlePhoneCall } from '../utils/phone';
import { WhatsAppIcon } from './WhatsAppIcon';
import { openWhatsAppChat } from '../utils/whatsapp';

interface HeaderProps {
  onBookClick: () => void;
  onRealEstateClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick, onRealEstateClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [phoneClicked, setPhoneClicked] = useState(false);

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setPhoneClicked(true);
    handlePhoneCall(e);
    setTimeout(() => {
      setPhoneClicked(false);
    }, 4500);
  };

  const navLinks = [
    { label: 'Home', href: '#home', num: '01' },
    { label: 'The Growth Dilemma', href: '#struggling', num: '02' },
    { label: 'About Deon', href: '#about', num: '03' },
    { label: 'Key Benefits', href: '#benefits', num: '04' },
    { label: 'Business Objectives', href: '#objectives', num: '05' },
    { label: 'Industries Supported', href: '#industries', num: '06' },
    { label: 'Real Estate Focus', href: '/real-estate', num: '07', isSpecial: true },
    { label: 'Services & Systems', href: '#services', num: '08' },
    { label: '6-Step Framework', href: '#process', num: '09' },
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
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Phone Link (Desktop/Tablet) */}
            <a
              href={PHONE_TEL}
              id="header-phone-link"
              onClick={handlePhoneClick}
              title={`Call ${PHONE_NUMBER}`}
              className={`hidden md:inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer ${
                phoneClicked
                  ? 'bg-white text-black px-3.5 py-1.5 rounded-full shadow-md border border-[#9ce2c7] ring-2 ring-[#9ce2c7]/40'
                  : 'text-[#131d17] hover:text-black px-2.5 py-2 hover:bg-black/5 rounded-full'
              }`}
            >
              {phoneClicked ? (
                <Check className="w-3.5 h-3.5 text-[#0d4f36] animate-in zoom-in-75" />
              ) : (
                <Phone className="w-3.5 h-3.5 text-[#131d17]" />
              )}
              <span>{PHONE_NUMBER}</span>
              {phoneClicked && (
                <span className="ml-1 text-[10px] font-extrabold bg-[#9ce2c7] text-[#0d4f36] px-1.5 py-0.5 rounded-full">
                  Dialing
                </span>
              )}
            </a>

            {/* Book Now (Desktop/Tablet) */}
            <button
              id="header-book-now-btn"
              onClick={onBookClick}
              className="hidden sm:inline-flex bg-black hover:bg-gray-900 text-white font-bold text-xs uppercase tracking-widest px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 shadow-md items-center space-x-1.5 sm:space-x-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </button>

            {/* WhatsApp Top Menu Button (Desktop/Tablet) */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-btn"
              onClick={(e) => openWhatsAppChat("Hi Deon, I'm reaching out from your website header regarding Marketing Automation Systems.", e)}
              title="Chat on WhatsApp"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] border border-[#25D366] px-3.5 py-2.5 rounded-full transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current text-white" />
              <span>WhatsApp</span>
            </a>

            {/* Burger Trigger Button in Header (Always visible on mobile & desktop) */}
            <button
              id="header-burger-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-black text-[#9ce2c7] hover:bg-gray-900 px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md cursor-pointer transition-all border border-black"
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? <X className="w-4 h-4 text-[#9ce2c7]" /> : <Menu className="w-4 h-4 text-[#9ce2c7]" />}
              <span className="inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Burger & Scroll Controller - Present on both Mobile & Desktop */}
      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end space-y-2">
        {/* Quick Scroll Up/Down Buttons */}
        <div className="flex flex-col space-y-1 bg-black/90 p-1 sm:p-1.5 rounded-2xl shadow-2xl backdrop-blur-md border border-[#9ce2c7]/40">
          <button
            onClick={handleScrollUp}
            id="floating-scroll-up-btn"
            title="Scroll Up / Previous Section"
            className="p-1.5 sm:p-2 text-[#9ce2c7] hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer flex items-center justify-center active:scale-95"
          >
            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={handleScrollDown}
            id="floating-scroll-down-btn"
            title="Scroll Down / Next Section"
            className="p-1.5 sm:p-2 text-[#9ce2c7] hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer flex items-center justify-center active:scale-95"
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Floating Burger Menu Button */}
        <button
          id="floating-burger-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex items-center space-x-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl transition-all duration-300 border-2 cursor-pointer active:scale-95 ${
            menuOpen
              ? 'bg-[#9ce2c7] text-black border-black scale-105'
              : 'bg-black text-[#9ce2c7] border-[#9ce2c7] hover:bg-gray-900 hover:scale-105'
          }`}
        >
          {menuOpen ? (
            <>
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              <span>Close</span>
            </>
          ) : (
            <>
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-[#9ce2c7]" />
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

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className="w-screen max-w-md bg-[#121212] text-white border-l border-white/15 shadow-2xl flex flex-col justify-between p-5 sm:p-8 overflow-y-auto no-scrollbar">
              
              {/* Drawer Content */}
              <div className="space-y-6">
                {/* Drawer Top Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/15">
                  <div className="flex items-center space-x-2">
                    <Compass className="w-5 h-5 text-[#9ce2c7]" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-[#9ce2c7]">
                      Navigation & Quick Actions
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

                {/* Primary Action Buttons AT THE TOP (Above Quick Scroll Menu) */}
                <div className="space-y-2.5 pb-2">
                  <button
                    id="drawer-book-session-btn"
                    onClick={() => {
                      setMenuOpen(false);
                      onBookClick();
                    }}
                    className="w-full bg-white hover:bg-gray-100 text-[#121212] font-black text-xs uppercase tracking-widest py-3.5 px-4 rounded-full transition-all shadow-xl cursor-pointer flex items-center justify-center space-x-2 active:scale-95"
                  >
                    <Calendar className="w-4 h-4 text-[#121212]" />
                    <span>Book Strategy Session</span>
                  </button>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="mobile-drawer-whatsapp-btn"
                    onClick={(e) => {
                      openWhatsAppChat("Hi Deon, I'm reaching out from your navigation menu regarding Marketing Automation Systems.", e);
                      setMenuOpen(false);
                    }}
                    title="Chat on WhatsApp"
                    className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20ba59] py-3 px-4 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Strategy WhatsApp Chat</span>
                  </a>

                  <a
                    href={PHONE_TEL}
                    id="mobile-drawer-phone-btn"
                    onClick={(e) => {
                      handlePhoneCall(e);
                      setMenuOpen(false);
                    }}
                    title={`Call ${PHONE_NUMBER}`}
                    className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider text-black bg-[#9ce2c7] hover:bg-[#8bd6ba] py-3 px-4 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-black fill-current" />
                    <span>Call {PHONE_NUMBER}</span>
                  </a>
                </div>

                {/* Quick Scroll Up/Down Action Banner */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="text-xs font-bold text-gray-300">
                    <span className="block text-[10px] text-[#9ce2c7] font-mono uppercase">Quick Scroll Menu</span>
                    Navigate page sections
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleScrollUp}
                      className="p-2.5 bg-black hover:bg-[#9ce2c7] hover:text-black text-[#9ce2c7] rounded-xl transition-all border border-white/20 flex items-center space-x-1 text-xs font-bold cursor-pointer"
                      title="Scroll Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                      <span className="text-xs font-bold">Up</span>
                    </button>

                    <button
                      onClick={handleScrollDown}
                      className="p-2.5 bg-black hover:bg-[#9ce2c7] hover:text-black text-[#9ce2c7] rounded-xl transition-all border border-white/20 flex items-center space-x-1 text-xs font-bold cursor-pointer"
                      title="Scroll Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                      <span className="text-xs font-bold">Down</span>
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
                        className={`group flex items-center justify-between p-3 rounded-2xl transition-all ${
                          isActive
                            ? 'bg-[#9ce2c7] text-[#121212] font-black shadow-lg pl-4'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white hover:pl-4'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                            isActive ? 'bg-black text-[#9ce2c7]' : 'bg-white/10 text-gray-400 group-hover:text-white'
                          }`}>
                            {link.num}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider">
                            {link.label}
                          </span>
                        </div>

                        {isActive && (
                          <span className="text-[9px] font-black uppercase tracking-widest bg-black text-[#9ce2c7] px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom Info */}
              <div className="pt-6 mt-6 border-t border-white/10 text-center text-[11px] text-gray-500">
                <span>Deon Howard PPC • Marketing Automation Systems</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

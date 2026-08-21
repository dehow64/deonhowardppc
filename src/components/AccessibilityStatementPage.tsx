import React, { useEffect, useState } from 'react';
import { Eye, ArrowLeft, CheckCircle2, Accessibility, ShieldCheck, Mail, Phone, ExternalLink, HelpCircle, Check } from 'lucide-react';
import { PHONE_NUMBER, PHONE_TEL, EMAIL_ADDRESS, WHATSAPP_NUMBER, WHATSAPP_URL } from '../data/contentData';
import { handlePhoneCall } from '../utils/phone';
import { WhatsAppIcon } from './WhatsAppIcon';
import { openWhatsAppChat } from '../utils/whatsapp';

interface AccessibilityStatementPageProps {
  onBackToMain: () => void;
  onBookClick?: () => void;
}

export const AccessibilityStatementPage: React.FC<AccessibilityStatementPageProps> = ({
  onBackToMain,
  onBookClick
}) => {
  const [phoneClicked, setPhoneClicked] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Accessibility Statement | Deon Howard PPC';
  }, []);

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setPhoneClicked(true);
    handlePhoneCall(e);
    setTimeout(() => {
      setPhoneClicked(false);
    }, 4500);
  };

  const lastReviewed = 'January 15, 2026';

  const sections = [
    { id: 'commitment', title: '1. Our Commitment to Accessibility' },
    { id: 'standards', title: '2. Conformance Standards (WCAG 2.1 AA)' },
    { id: 'measures', title: '3. Technical Measures Implemented' },
    { id: 'assistive-tech', title: '4. Assistive Technology Compatibility' },
    { id: 'specifications', title: '5. Technical Specifications' },
    { id: 'assessment', title: '6. Assessment & Quality Testing' },
    { id: 'limitations', title: '7. Known Limitations & Alternatives' },
    { id: 'feedback', title: '8. Feedback & Contact Information' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121212] font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button
            type="button"
            id="accessibility-back-btn"
            onClick={onBackToMain}
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* WhatsApp Top Button */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="accessibility-header-whatsapp"
              onClick={(e) => openWhatsAppChat("Hi Deon, I'm reviewing your Accessibility Statement and would like to chat regarding Marketing Automation.", e)}
              title="Chat on WhatsApp"
              className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#0e5c3e] bg-[#25D366]/20 hover:bg-[#25D366] hover:text-white border border-[#25D366]/40 px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>

            <a
              href={PHONE_TEL}
              onClick={handlePhoneClick}
              id="accessibility-header-phone"
              title={`Call ${PHONE_NUMBER}`}
              className={`hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer ${
                phoneClicked
                  ? 'bg-white text-black px-3.5 py-1.5 rounded-full shadow-md border border-[#9ce2c7] ring-2 ring-[#9ce2c7]/40'
                  : 'text-gray-800 hover:text-black px-2.5 py-1.5 hover:bg-black/5 rounded-full'
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

            {onBookClick && (
              <button
                type="button"
                id="accessibility-header-book-btn"
                onClick={onBookClick}
                className="inline-flex items-center space-x-2 bg-[#131d17] hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <span>Book Consultation</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Title Header */}
        <div className="mb-10 pb-8 border-b border-gray-200">
          <div className="inline-flex items-center space-x-2 bg-[#9ce2c7]/20 border border-[#9ce2c7]/50 text-[#0d4f36] px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest mb-4">
            <Accessibility className="w-3.5 h-3.5" />
            <span>ADA Title III &amp; WCAG 2.1 AA Compliance</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Accessibility Statement
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Last Reviewed &amp; Audited: <span className="font-semibold text-gray-900">{lastReviewed}</span>
          </p>
          <p className="mt-4 text-base text-gray-700 leading-relaxed">
            Deon Howard PPC is committed to facilitating digital accessibility and inclusion for all individuals, including people with visual, auditory, motor, or cognitive disabilities. We are continuously optimizing our user experience and applying relevant accessibility standards across our digital presence.
          </p>
        </div>

        {/* Quick Navigation Box */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-12 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#131d17]" />
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="text-left py-1 text-gray-600 hover:text-black hover:underline transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#9ce2c7]"></span>
                <span className="truncate">{sec.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Statement Content */}
        <div className="space-y-12 text-sm sm:text-base text-gray-700 leading-relaxed">

          {/* Section 1 */}
          <section id="commitment" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              1. Our Commitment to Accessibility
            </h2>
            <p className="mb-3">
              At Deon Howard PPC, we believe the internet should be accessible and usable by everyone. We strive to provide a seamless browsing experience where every visitor can learn about our growth advisory services, review case studies, and book consultations without encountering accessibility barriers.
            </p>
            <p>
              We dedicate engineering resources to follow the World Wide Web Consortium&apos;s (W3C) Web Content Accessibility Guidelines (WCAG) and ensure compliance with Title III of the Americans with Disabilities Act (ADA) and Section 508 requirements.
            </p>
          </section>

          {/* Section 2 */}
          <section id="standards" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              2. Conformance Standards (WCAG 2.1 Level AA)
            </h2>
            <p className="mb-3">
              Our target conformance standard is <strong>WCAG 2.1 Level AA</strong>. The Web Content Accessibility Guidelines outline requirements for designers and developers to improve accessibility across four foundational principles:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-1">Perceivable</h4>
                <p className="text-xs text-gray-600">Information and user interface components must be presentable to users in ways they can perceive (e.g. text alternatives, high color contrast, clear visual hierarchy).</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-1">Operable</h4>
                <p className="text-xs text-gray-600">User interface components and navigation must be operable (e.g. full keyboard access, clear focus indicators, no unexpected pop-up traps).</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-1">Understandable</h4>
                <p className="text-xs text-gray-600">Information and the operation of the user interface must be understandable (e.g. readable typography, clear form labels, descriptive error states).</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm mb-1">Robust</h4>
                <p className="text-xs text-gray-600">Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including modern assistive technologies.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="measures" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              3. Technical Measures Implemented
            </h2>
            <p className="mb-4">
              We have implemented the following accessibility features across the Deon Howard PPC website:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Full Keyboard Navigation</h4>
                  <p className="text-xs text-gray-600 mt-0.5">All interactive controls, forms, modals, menus, and consultation schedulers are fully operable via Tab, Enter, Space, and Escape keys.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Contrast &amp; Legibility Standards</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Color pairings meet or exceed the WCAG 4.5:1 minimum contrast ratio for normal text and 3:1 for large display headers and active UI components.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Semantic HTML5 &amp; ARIA Landmarks</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Pages utilize semantic tags (<code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;footer&gt;</code>) and explicit ARIA labels for assistive screen readers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Alternative Text for Visual Media</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Images, illustrations, case study badges, and company diagrams include informative, descriptive <code>alt</code> text attributes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Accessible Form Controls</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Every form field includes visible label tags, descriptive placeholders, autocomplete attributes, and inline validation warnings.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Responsive Scalability &amp; Zoom</h4>
                  <p className="text-xs text-gray-600 mt-0.5">The site supports browser magnification up to 200% without loss of content, clipped text, or broken layout structure.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="assistive-tech" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              4. Assistive Technology Compatibility
            </h2>
            <p className="mb-3">
              The Deon Howard PPC website is designed to be compatible with:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm text-gray-600">
              <li>Modern screen reader software, including <strong>NVDA</strong> (Windows), <strong>JAWS</strong> (Windows), <strong>VoiceOver</strong> (macOS &amp; iOS), and <strong>TalkBack</strong> (Android).</li>
              <li>Native operating system speech recognition and voice navigation tools.</li>
              <li>Standard keyboard-only navigation hardware.</li>
              <li>Modern standards-compliant web browsers (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge).</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="specifications" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              5. Technical Specifications
            </h2>
            <p className="mb-3">
              Accessibility of the Deon Howard PPC website relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-gray-600">
              <li>HTML5</li>
              <li>WAI-ARIA (Accessible Rich Internet Applications)</li>
              <li>CSS3 &amp; Responsive Flexbox/Grid systems</li>
              <li>JavaScript (ES6+)</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="assessment" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              6. Assessment &amp; Quality Testing
            </h2>
            <p className="mb-3">
              We continually evaluate the accessibility of our site through:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-gray-600">
              <li>Automated accessibility testing using Lighthouse, axe-core, and WAVE accessibility evaluation tools.</li>
              <li>Manual keyboard-only walkthroughs of all critical conversion funnels, menus, and form submissions.</li>
              <li>Screen reader verification tests on modern desktop and mobile platforms.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="limitations" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              7. Known Limitations &amp; Alternatives
            </h2>
            <p className="mb-3">
              While we strive to ensure all pages are universally accessible, some third-party embeds (such as embedded Google Calendar widgets or external scheduling iframes) may have limitations outside our direct code control.
            </p>
            <p>
              If you experience any difficulty scheduling an appointment or reading content through third-party widgets, please contact us directly via telephone at <a href={PHONE_TEL} onClick={handlePhoneCall} className="font-bold underline text-gray-900">{PHONE_NUMBER}</a> or email at <a href={`mailto:${EMAIL_ADDRESS}`} className="font-bold underline text-gray-900">{EMAIL_ADDRESS}</a> and our team will gladly assist you and book your session manually.
            </p>
          </section>

          {/* Section 8 */}
          <section id="feedback" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#131d17]" />
              8. Feedback &amp; Contact Information
            </h2>
            <p className="mb-4">
              We welcome your feedback on the accessibility of Deon Howard PPC. If you encounter accessibility barriers, have difficulty accessing any feature, or require content in an alternative accessible format, please let us know:
            </p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-28">Accessibility Team:</span>
                <span>Deon Howard PPC Accessibility Coordinator</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-28">Email Address:</span>
                <a href={`mailto:${EMAIL_ADDRESS}?subject=Accessibility%20Inquiry`} className="text-emerald-700 hover:underline font-medium">
                  {EMAIL_ADDRESS}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-28">Phone Number:</span>
                <a href={PHONE_TEL} onClick={handlePhoneCall} className="text-emerald-700 hover:underline font-medium">
                  {PHONE_NUMBER}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-28">Response Time:</span>
                <span>We strive to respond to accessibility inquiries within 1 to 2 business days.</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={onBackToMain}
                className="inline-flex items-center space-x-2 bg-[#131d17] hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full transition-all cursor-pointer shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Homepage</span>
              </button>
            </div>
          </section>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-white/10 py-8 text-center text-xs text-gray-400 mt-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Deon Howard PPC • All Rights Reserved</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToMain}
              className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
            >
              Home
            </button>
            <span className="text-gray-600">•</span>
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '/privacy-policy');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
            >
              Privacy Policy
            </a>
            <span className="text-gray-600">•</span>
            <span className="text-gray-300 font-semibold">Accessibility Statement</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

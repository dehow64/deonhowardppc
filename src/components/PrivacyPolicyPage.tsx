import React, { useEffect, useState } from 'react';
import { Shield, ArrowLeft, Lock, FileText, CheckCircle, Mail, Phone, ExternalLink, Check } from 'lucide-react';
import { PHONE_NUMBER, PHONE_TEL, EMAIL_ADDRESS } from '../data/contentData';
import { handlePhoneCall } from '../utils/phone';

interface PrivacyPolicyPageProps {
  onBackToMain: () => void;
  onBookClick?: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBackToMain, onBookClick }) => {
  const [phoneClicked, setPhoneClicked] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Privacy Policy | Deon Howard PPC';
  }, []);

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setPhoneClicked(true);
    handlePhoneCall(e);
    setTimeout(() => {
      setPhoneClicked(false);
    }, 4500);
  };

  const lastUpdated = 'January 15, 2026';

  const sections = [
    { id: 'introduction', title: '1. Introduction & Scope' },
    { id: 'information-collected', title: '2. Information We Collect' },
    { id: 'how-we-use', title: '3. How We Use Your Information' },
    { id: 'third-parties', title: '4. Third-Party Services & Tracking' },
    { id: 'data-sharing', title: '5. Information Sharing & Disclosures' },
    { id: 'data-security', title: '6. Data Security & Retention' },
    { id: 'california-rights', title: '7. California Privacy Rights (CCPA/CPRA)' },
    { id: 'european-rights', title: '8. European Privacy Rights (GDPR)' },
    { id: 'communications', title: '9. Marketing & Communications Preferences' },
    { id: 'children', title: "10. Children's Privacy (COPPA)" },
    { id: 'changes', title: '11. Changes to This Policy' },
    { id: 'contact', title: '12. Contact Information & Privacy Requests' },
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
            id="privacy-back-btn"
            onClick={onBackToMain}
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-black bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center space-x-4">
            <a
              href={PHONE_TEL}
              onClick={handlePhoneClick}
              id="privacy-header-phone"
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
                id="privacy-header-book-btn"
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
        
        {/* Header Title Section */}
        <div className="mb-10 pb-8 border-b border-gray-200">
          <div className="inline-flex items-center space-x-2 bg-[#9ce2c7]/20 border border-[#9ce2c7]/50 text-[#0d4f36] px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Legal & Privacy Compliance</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Last Updated: <span className="font-semibold text-gray-900">{lastUpdated}</span> • Effective Date: January 1, 2026
          </p>
          <p className="mt-4 text-base text-gray-700 leading-relaxed">
            Deon Howard PPC (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to respecting and protecting the privacy of our website visitors, prospective clients, and business partners. This Privacy Policy details how we collect, store, utilize, disclose, and safeguard your personal information when you visit <strong className="text-gray-900">deonhowardppc.com</strong> or engage with our digital growth advisory services.
          </p>
        </div>

        {/* Quick Navigation Box */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-12 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#131d17]" />
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

        {/* Policy Content Sections */}
        <div className="space-y-12 text-sm sm:text-base text-gray-700 leading-relaxed">

          {/* Section 1 */}
          <section id="introduction" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              1. Introduction &amp; Scope
            </h2>
            <p className="mb-3">
              This Privacy Policy applies to all personal information and data collected through our website, appointment scheduling flows, contact inquiry forms, phone conversations, email correspondence, and related digital marketing automation consultations provided by Deon Howard PPC.
            </p>
            <p>
              By accessing or utilizing our website, submitting an inquiry, or booking a consultation, you acknowledge that you have read, understood, and agreed to the data practices described in this policy.
            </p>
          </section>

          {/* Section 2 */}
          <section id="information-collected" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-4">
              We collect information to provide high-quality marketing advisory and conversion rate optimization consultations. We collect information in the following categories:
            </p>
            
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  A. Information You Voluntarily Provide to Us
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-2">
                  <li><strong>Contact Information:</strong> First name, last name, business email address, telephone number, and company name.</li>
                  <li><strong>Business &amp; Marketing Objectives:</strong> Website URL, current business vertical or industry, approximate monthly advertising budget, current revenue tier, 90-day growth targets, and custom project descriptions.</li>
                  <li><strong>Appointment Details:</strong> Preferred meeting date, time slot, timezone, and calendar notes.</li>
                  <li><strong>Inquiry Messages:</strong> Any specific marketing pain points or questions entered in our strategy session forms.</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  B. Information Collected Automatically
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-2">
                  <li><strong>Device &amp; Browser Information:</strong> IP address, operating system, browser type and version, language preferences, and referring website URLs.</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent per page, click paths, conversion events, and scroll depth across the website.</li>
                  <li><strong>Cookies and Tracking Identifiers:</strong> Standard web analytics cookies, Google Tag Manager event identifiers, and Meta Pixel conversion tokens.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="how-we-use" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-3">
              We process your personal data for legitimate business interests, contract fulfillment, and explicit consent, specifically to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Prepare and deliver customized 1-on-1 marketing strategy and paid advertising consultation sessions.</li>
              <li>Schedule, confirm, and synchronize Google Calendar video appointments and send calendar notifications.</li>
              <li>Respond directly to your inquiries, phone calls, or quote requests.</li>
              <li>Measure website performance, user engagement, conversion funnels, and advertising ROI.</li>
              <li>Maintain digital security, prevent fraudulent submissions, and verify lead authenticity.</li>
              <li>Comply with applicable legal, fiscal, and regulatory obligations.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="third-parties" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              4. Third-Party Services &amp; Tracking
            </h2>
            <p className="mb-4">
              We leverage vetted, industry-standard third-party enterprise tools to power our scheduling and analytics infrastructure. These include:
            </p>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm">Google Workspace &amp; Google Calendar</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Used to schedule and host appointments. When you schedule a consultation, calendar events and invite notifications are generated through Google Workspace under strict enterprise security protocols.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm">Google Analytics 4 &amp; Google Tag Manager</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Used to aggregate anonymous statistical traffic, user behavior, and campaign effectiveness without selling individual identifiable records.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-sm">Meta Pixel (Facebook Ads)</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Used to measure advertising performance and deliver relevant ad experiences to business owners interested in growth systems.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="data-sharing" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              5. Information Sharing &amp; Disclosures
            </h2>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-4 text-emerald-900 font-semibold text-sm">
              We do NOT sell, rent, monetize, or trade your personal information to data brokers or unrelated third parties under any circumstances.
            </div>
            <p className="mb-3">
              We may only disclose information under the following limited conditions:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Authorized Service Providers:</strong> Technical service partners (such as hosting providers, email delivery platforms, calendar software) bound by contractual confidentiality agreements.</li>
              <li><strong>Legal Compliance:</strong> When required by lawful court orders, subpoenas, or to defend the rights and safety of Deon Howard PPC or the public.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset reorganization, where customer records are transferred under equivalent privacy safeguards.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="data-security" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              6. Data Security &amp; Retention
            </h2>
            <p className="mb-3">
              We implement comprehensive administrative, technical, and organizational security measures to protect your personal information against unauthorized access, loss, misuse, or alteration. These measures include TLS/SSL encrypted data transmission, restricted access controls, and sanitized form validation.
            </p>
            <p>
              We retain personal data only for as long as necessary to fulfill the business purposes outlined in this policy or to satisfy statutory record-keeping and audit requirements.
            </p>
          </section>

          {/* Section 7 */}
          <section id="california-rights" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              7. California Privacy Rights (CCPA / CPRA)
            </h2>
            <p className="mb-3">
              Under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), California residents have specific statutory rights:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 mb-4">
              <li><strong>Right to Know:</strong> You may request the categories and specific pieces of personal information we have collected about you over the past 12 months.</li>
              <li><strong>Right to Delete:</strong> You may request the deletion of your personal data held by us, subject to legal exceptions.</li>
              <li><strong>Right to Correct:</strong> You may request correction of inaccurate personal records.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will never discriminate against you, alter service pricing, or degrade quality for exercising your privacy rights.</li>
              <li><strong>Do Not Sell or Share My Personal Information:</strong> We do not sell or share your personal data for monetary or other valuable consideration.</li>
            </ul>
            <p>
              To exercise any of these California privacy rights, please contact us at <a href={`mailto:${EMAIL_ADDRESS}`} className="font-bold underline text-gray-900">{EMAIL_ADDRESS}</a>.
            </p>
          </section>

          {/* Section 8 */}
          <section id="european-rights" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              8. European Privacy Rights (GDPR)
            </h2>
            <p className="mb-3">
              If you reside in the European Economic Area (EEA) or United Kingdom (UK), you possess rights under the General Data Protection Regulation (GDPR), including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>The right to access, rectify, or erase your personal data.</li>
              <li>The right to restrict or object to the processing of your personal data.</li>
              <li>The right to data portability (requesting your data in a structured, machine-readable format).</li>
              <li>The right to withdraw consent at any time without affecting prior lawful processing.</li>
              <li>The right to lodge a complaint with your local Data Protection Supervisory Authority.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section id="communications" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              9. Marketing &amp; Communications Preferences
            </h2>
            <p className="mb-3">
              You may opt out of receiving promotional emails or advisory updates from us at any time by clicking the &ldquo;unsubscribe&rdquo; link in any email communication or by sending an opt-out request to <a href={`mailto:${EMAIL_ADDRESS}`} className="font-bold underline">{EMAIL_ADDRESS}</a>.
            </p>
            <p>
              Please note that transactional or administrative messages regarding scheduled appointments or active client engagements will continue to be sent.
            </p>
          </section>

          {/* Section 10 */}
          <section id="children" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              10. Children&apos;s Privacy (COPPA)
            </h2>
            <p>
              Our website and business growth consulting services are strictly designed and intended for commercial business operators and adults aged 18 and older. We do not knowingly solicit or collect personal data from children under the age of 16. If we discover that personal data of a minor has been collected, we will take immediate steps to delete the record.
            </p>
          </section>

          {/* Section 11 */}
          <section id="changes" className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <p>
              We reserve the right to update or modify this Privacy Policy periodically to reflect technological updates, legal developments, or adjustments to our service workflows. Any revisions will be posted on this page with an updated &ldquo;Last Updated&rdquo; date. We encourage regular review of this policy.
            </p>
          </section>

          {/* Section 12 */}
          <section id="contact" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#131d17]" />
              12. Contact Information &amp; Privacy Requests
            </h2>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or wish to exercise your privacy rights, please contact our Privacy Compliance Officer:
            </p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-28">Entity Name:</span>
                <span>Deon Howard PPC</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-28">Email Address:</span>
                <a href={`mailto:${EMAIL_ADDRESS}`} className="text-emerald-700 hover:underline font-medium">
                  {EMAIL_ADDRESS}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-28">Phone:</span>
                <a href={PHONE_TEL} onClick={handlePhoneCall} className="text-emerald-700 hover:underline font-medium">
                  {PHONE_NUMBER}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 w-28">Practice Area:</span>
                <span>PPC Advertising &amp; Digital Growth Consulting</span>
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
            <span className="text-gray-300 font-semibold">Privacy Policy</span>
            <span className="text-gray-600">•</span>
            <a
              href="/accessibility-statement"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '/accessibility-statement');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
            >
              Accessibility Statement
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

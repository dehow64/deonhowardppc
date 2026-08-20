/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StrugglingSection } from './components/StrugglingSection';
import { AboutSection } from './components/AboutSection';
import { BenefitsSection } from './components/BenefitsSection';
import { ObjectivesSection } from './components/ObjectivesSection';
import { CuriousCallout } from './components/CuriousCallout';
import { IndustriesSection } from './components/IndustriesSection';
import { ServicesSection } from './components/ServicesSection';
import { CalloutBanner } from './components/CalloutBanner';
import { ProcessSection } from './components/ProcessSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ContactFormSection } from './components/ContactFormSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ThankYouPage } from './components/ThankYouPage';
import { RealEstateLandingPage } from './components/RealEstateLandingPage';
import { IndustryLandingPage } from './components/IndustryLandingPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { AccessibilityStatementPage } from './components/AccessibilityStatementPage';
import { PhoneCallToast } from './components/PhoneCallToast';
import { CaseStudy, ContactFormData } from './types';
import { getIndustryFromPath, getPathForIndustry, getPageTitle, isThankYouPage, isPrivacyPolicyPage, isAccessibilityPage } from './utils/routes';

export default function App() {
  const [activeIndustryView, setActiveIndustryView] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return getIndustryFromPath(window.location.pathname, window.location.hash);
    }
    return null;
  });
  const [isThankYouView, setIsThankYouView] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return isThankYouPage(window.location.pathname, window.location.hash);
    }
    return false;
  });
  const [isPrivacyView, setIsPrivacyView] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return isPrivacyPolicyPage(window.location.pathname, window.location.hash);
    }
    return false;
  });
  const [isAccessibilityView, setIsAccessibilityView] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return isAccessibilityPage(window.location.pathname, window.location.hash);
    }
    return false;
  });
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [modalInitialDate, setModalInitialDate] = useState<string | undefined>(undefined);
  const [modalInitialSlot, setModalInitialSlot] = useState<string | undefined>(undefined);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [submissionSuccessData, setSubmissionSuccessData] = useState<ContactFormData | null>(null);

  // Sync state with browser URL on load and on back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const isThanks = isThankYouPage(window.location.pathname, window.location.hash);
      const isPrivacy = isPrivacyPolicyPage(window.location.pathname, window.location.hash);
      const isAccess = isAccessibilityPage(window.location.pathname, window.location.hash);
      const matched = getIndustryFromPath(window.location.pathname, window.location.hash);

      setIsThankYouView(isThanks);
      setIsPrivacyView(isPrivacy);
      setIsAccessibilityView(isAccess);
      setActiveIndustryView(matched);
      document.title = getPageTitle(matched, isThanks, isPrivacy, isAccess);
    };

    // Set initial title and route if needed
    const initialIsThanks = isThankYouPage(window.location.pathname, window.location.hash);
    const initialIsPrivacy = isPrivacyPolicyPage(window.location.pathname, window.location.hash);
    const initialIsAccess = isAccessibilityPage(window.location.pathname, window.location.hash);
    const initialMatched = getIndustryFromPath(window.location.pathname, window.location.hash);
    
    if (initialIsThanks !== isThankYouView) setIsThankYouView(initialIsThanks);
    if (initialIsPrivacy !== isPrivacyView) setIsPrivacyView(initialIsPrivacy);
    if (initialIsAccess !== isAccessibilityView) setIsAccessibilityView(initialIsAccess);
    if (initialMatched !== activeIndustryView) setActiveIndustryView(initialMatched);
    
    document.title = getPageTitle(initialMatched, initialIsThanks, initialIsPrivacy, initialIsAccess);

    window.addEventListener('popstate', handlePopState);

    // Global listener for Google Calendar Appointment scheduling iframe events
    const handleCalendarMessage = (e: MessageEvent) => {
      if (e.origin && (e.origin.includes('calendar.google.com') || e.origin.includes('calendar.app.google'))) {
        console.log('📅 Google Calendar appointment scheduled event received:', e.data);
        setIsThankYouView(true);
        try {
          window.history.pushState({ page: 'thank-you' }, '', '/thank-you');
        } catch {
          window.location.href = '/thank-you';
        }
        document.title = getPageTitle(null, true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('message', handleCalendarMessage);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('message', handleCalendarMessage);
    };
  }, []);

  const handleBookClick = (initialDate?: string, initialSlot?: string) => {
    if (initialDate) setModalInitialDate(initialDate);
    if (initialSlot) setModalInitialSlot(initialSlot);
    setBookingModalOpen(true);
  };

  const handleNavToPrivacy = () => {
    setIsThankYouView(false);
    setIsAccessibilityView(false);
    setIsPrivacyView(true);
    setActiveIndustryView(null);
    window.history.pushState({ page: 'privacy-policy' }, '', '/privacy-policy');
    document.title = getPageTitle(null, false, true, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavToAccessibility = () => {
    setIsThankYouView(false);
    setIsPrivacyView(false);
    setIsAccessibilityView(true);
    setActiveIndustryView(null);
    window.history.pushState({ page: 'accessibility-statement' }, '', '/accessibility-statement');
    document.title = getPageTitle(null, false, false, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectIndustry = (industryId: string) => {
    setIsThankYouView(false);
    setIsPrivacyView(false);
    setIsAccessibilityView(false);
    setActiveIndustryView(industryId);
    const targetUrl = getPathForIndustry(industryId);
    window.history.pushState({ industryId }, '', targetUrl);
    document.title = getPageTitle(industryId, false, false, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavToMain = () => {
    setIsThankYouView(false);
    setIsPrivacyView(false);
    setIsAccessibilityView(false);
    setActiveIndustryView(null);
    window.history.pushState(null, '', '/');
    document.title = getPageTitle(null, false, false, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmitted = (data: ContactFormData) => {
    setSubmissionSuccessData(data);
    setBookingModalOpen(false);
    setIsPrivacyView(false);
    setIsAccessibilityView(false);
    setIsThankYouView(true);
    try {
      window.history.pushState({ page: 'thank-you' }, '', '/thank-you');
    } catch (e) {
      // fallback
    }
    document.title = getPageTitle(null, true, false, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickBookSuccess = (data: ContactFormData) => {
    handleFormSubmitted(data);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121212] font-sans selection:bg-blue-600 selection:text-white">
      {isThankYouView ? (
        <ThankYouPage
          data={submissionSuccessData}
          onBackToMain={handleNavToMain}
          onBrowseCaseStudies={() => {
            handleNavToMain();
            setTimeout(() => {
              const el = document.getElementById('case-studies');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />
      ) : isPrivacyView ? (
        <PrivacyPolicyPage
          onBackToMain={handleNavToMain}
          onBookClick={() => handleBookClick()}
        />
      ) : isAccessibilityView ? (
        <AccessibilityStatementPage
          onBackToMain={handleNavToMain}
          onBookClick={() => handleBookClick()}
        />
      ) : activeIndustryView === 'real-estate' ? (
        <RealEstateLandingPage
          onBackToMain={handleNavToMain}
          onBookClick={handleBookClick}
          onFormSubmitted={handleFormSubmitted}
          onSelectIndustry={handleSelectIndustry}
        />
      ) : activeIndustryView ? (
        <IndustryLandingPage
          industryId={activeIndustryView}
          onBackToMain={handleNavToMain}
          onBookClick={handleBookClick}
          onFormSubmitted={handleFormSubmitted}
          onSelectIndustry={handleSelectIndustry}
        />
      ) : (
        <>
          {/* Header Bar */}
          <Header 
            onBookClick={handleBookClick} 
            onRealEstateClick={() => handleSelectIndustry('real-estate')} 
          />

          {/* Main Content Sections matching Wix layout and video walkthrough */}
          <main>
            {/* Hero Section & Booking Widget */}
            <Hero onBookClick={handleBookClick} />

            {/* Is Your Business Struggling to Grow Online? */}
            <StrugglingSection />

            {/* About Deon Howard PPC */}
            <AboutSection />

            {/* Benefits of Digital Marketing */}
            <BenefitsSection />

            {/* Business Objectives Supported */}
            <ObjectivesSection />

            {/* Curious to Learn More? */}
            <CuriousCallout onBookClick={handleBookClick} />

            {/* Industries Supported */}
            <IndustriesSection 
              onBookClick={handleBookClick} 
              onSelectIndustry={handleSelectIndustry} 
            />

            {/* Services & Platforms */}
            <ServicesSection />

            {/* Get Your Custom Growth Strategy Phone CTA */}
            <CalloutBanner />

            {/* A Proven Process for Predictable Growth */}
            <ProcessSection />

            {/* Case Studies */}
            <CaseStudiesSection onSelectCaseStudy={(study) => setSelectedCaseStudy(study)} />

            {/* Ready to Grow Your Business... Contact & Calendar Booking */}
            <ContactFormSection onFormSubmitted={handleFormSubmitted} />
          </main>

          {/* Footer */}
          <Footer
            onSelectIndustry={handleSelectIndustry}
            onSelectPrivacy={handleNavToPrivacy}
            onSelectAccessibility={handleNavToAccessibility}
          />
        </>
      )}

      {/* Interactive Popup Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        initialDate={modalInitialDate}
        initialTimeSlot={modalInitialSlot}
        onClose={() => setBookingModalOpen(false)}
        onSuccess={handleQuickBookSuccess}
      />

      <CaseStudyModal
        study={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onBookClick={handleBookClick}
      />

      <PhoneCallToast />
    </div>
  );
}

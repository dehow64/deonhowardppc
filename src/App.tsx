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
import { SuccessModal } from './components/SuccessModal';
import { RealEstateLandingPage } from './components/RealEstateLandingPage';
import { IndustryLandingPage } from './components/IndustryLandingPage';
import { CaseStudy, ContactFormData } from './types';

export default function App() {
  const [activeIndustryView, setActiveIndustryView] = useState<string | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [submissionSuccessData, setSubmissionSuccessData] = useState<ContactFormData | null>(null);

  const handleBookClick = () => {
    setBookingModalOpen(true);
  };

  const handleSelectIndustry = (industryId: string) => {
    setActiveIndustryView(industryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavToMain = () => {
    setActiveIndustryView(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmitted = (data: ContactFormData) => {
    setSubmissionSuccessData(data);
  };

  const handleQuickBookSuccess = (details: { date: string; time: string; name: string; email: string }) => {
    setSubmissionSuccessData({
      firstName: details.name.split(' ')[0] || details.name,
      lastName: details.name.split(' ').slice(1).join(' ') || '',
      email: details.email,
      phone: '(708) 669-6410',
      companyName: 'Growth Client',
      service: 'Paid Search & Meta Ads Strategy',
      budget: '$5,000 - $10,000/mo',
      message: 'Strategy Call booked via quick popup.',
      selectedDate: details.date,
      selectedTimeSlot: details.time
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121212] font-sans selection:bg-blue-600 selection:text-white">
      {activeIndustryView === 'real-estate' ? (
        <RealEstateLandingPage
          onBackToMain={handleNavToMain}
          onBookClick={handleBookClick}
          onFormSubmitted={handleFormSubmitted}
        />
      ) : activeIndustryView ? (
        <IndustryLandingPage
          industryId={activeIndustryView}
          onBackToMain={handleNavToMain}
          onBookClick={handleBookClick}
          onFormSubmitted={handleFormSubmitted}
        />
      ) : (
        <>
          {/* Header Bar */}
          <Header 
            onBookClick={handleBookClick} 
            onRealEstateClick={() => {
              setActiveIndustryView('real-estate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
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
          <Footer />
        </>
      )}

      {/* Interactive Popup Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onSuccess={handleQuickBookSuccess}
      />

      <CaseStudyModal
        study={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onBookClick={handleBookClick}
      />

      <SuccessModal
        data={submissionSuccessData}
        onClose={() => setSubmissionSuccessData(null)}
      />
    </div>
  );
}

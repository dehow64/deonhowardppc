import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Calendar as CalendarIcon, 
  Loader2, 
  ArrowRight, 
  ChevronLeft, 
  CheckSquare, 
  Square, 
  User, 
  Mail, 
  Phone,
  Globe,
  DollarSign, 
  TrendingUp, 
  Target, 
  Layers,
  MessageSquare,
  ExternalLink,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { ContactFormData } from '../types';
import { scheduleGoogleWorkspaceAppointment, TARGET_ADMIN_EMAIL } from '../services/googleWorkspace';
import { PHONE_NUMBER, PHONE_TEL, GOOGLE_CALENDAR_APPOINTMENT_URL, GOOGLE_CALENDAR_EMBED_URL } from '../data/contentData';
import { getUpcomingBookingDays, getTodayFormatted } from '../utils/dateUtils';

interface ContactFormSectionProps {
  onFormSubmitted?: (data: ContactFormData) => void;
}

export const SERVICE_OPTIONS = [
  { id: 'automated-funnels', label: 'Automated Conversion Funnels (AI Websites & Landing Pages)' },
  { id: 'ai-customer-acquisition', label: 'AI Customer Acquisition Systems (Google & Meta Paid Ads)' },
  { id: 'marketing-automation', label: 'AI Marketing Automation Tools (Agents, Workflows & Chatbots)' },
  { id: 'predictive-analytics', label: 'Predictive Attribution Systems (Server-Side CAPI & ROI Analytics)' }
];

export const INDUSTRY_OPTIONS = [
  'Home Services (Plumbing, HVAC, Roofing, Electricians)',
  'Legal & Professional Services (Lawyers, Consultants, Coaches)',
  'Medical Healthcare (Doctors, Dentists, Clinics, Med Spas)',
  'Financial Services (Banking, Accounting, Finance, Taxes)',
  'Real Estate (Agents, Wholesalers, Residential, Commercial)',
  'Fashion, Apparel & Beauty (Clothing, Shoes, Makeup)',
  'Sports, Fitness & Wellness (Gyms, Coaches, Supplements)',
  'Retail & E-Commerce (Online Stores, Consumer Products)',
  'Education (Institutions, Online, EdTech)',
  'Travel & Tourism (Agencies, Hotels, Hospitality)',
  'Other'
];

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({ onFormSubmitted }) => {
  // Step State: 1 = Form Qualification, 2 = Calendar Scheduler
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isFinalizing, setIsFinalizing] = useState<boolean>(false);

  // General Form State
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
    industry: 'Home Services (Plumbing, HVAC, Roofing, Electricians)',
    otherIndustry: '',
    currentRevenue: '$10k - $25k / mo',
    revenueGoal: '$25k - $50k',
    adBudget: '$1.5k - $5k',
    services: [
      'Automated Conversion Funnels (AI Websites & Landing Pages)',
      'AI Customer Acquisition Systems (Google & Meta Paid Ads)'
    ] as string[],
    projectDescription: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadData, setSubmittedLeadData] = useState<ContactFormData | null>(null);

  // Calendar Slot State for Step 2
  const upcomingBookingDays = getUpcomingBookingDays(5);
  const defaultBookingDay = upcomingBookingDays[0]?.formatted || getTodayFormatted();
  const [selectedBookingDate, setSelectedBookingDate] = useState<string>(defaultBookingDay);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM - 11:00 AM (EDT)');

  // Window message listener for Google Calendar appointment iframe completions
  useEffect(() => {
    const handleCalendarMessage = (e: MessageEvent) => {
      try {
        if (e.origin && e.origin.includes('calendar.google.com')) {
          console.log('📅 Google Calendar appointment scheduled event received:', e.data);
          if (onFormSubmitted && submittedLeadData) {
            onFormSubmitted(submittedLeadData);
          } else {
            window.location.href = '/thank-you';
          }
        }
      } catch (err) {
        console.warn('Error evaluating calendar event message:', err);
      }
    };

    window.addEventListener('message', handleCalendarMessage);
    return () => window.removeEventListener('message', handleCalendarMessage);
  }, [onFormSubmitted, submittedLeadData]);

  // Handle Service Checkbox toggling
  const handleToggleService = (serviceLabel: string) => {
    setFormState((prev) => {
      const exists = prev.services.includes(serviceLabel);
      if (exists) {
        return { ...prev, services: prev.services.filter(s => s !== serviceLabel) };
      } else {
        return { ...prev, services: [...prev.services, serviceLabel] };
      }
    });
  };

  const allSelected = SERVICE_OPTIONS.every(s => formState.services.includes(s.label));

  const handleToggleAllServices = () => {
    const allLabels = SERVICE_OPTIONS.map(s => s.label);
    setFormState((prev) => ({
      ...prev,
      services: allSelected ? [] : allLabels
    }));
  };

  // STEP 1: FORM SUBMISSION HANDLER
  const handleSubmitStep1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = (e.target as HTMLElement).closest('form') || (e.currentTarget as HTMLFormElement);
    const formData = new FormData(formElement);
    const dataObj = Object.fromEntries(formData.entries());

    const firstNameValue = formState.firstName.trim();
    const lastNameValue = formState.lastName.trim();
    const fullName = `${firstNameValue} ${lastNameValue}`.trim();
    const emailValue = formState.email.trim();

    if (!firstNameValue || !emailValue) {
      return;
    }

    const resolvedIndustry = formState.industry === 'Other'
      ? (formState.otherIndustry.trim() ? `Other (${formState.otherIndustry.trim()})` : 'Other')
      : formState.industry;

    const compiledMessage = [
      `Website: ${formState.website || 'Not provided'}`,
      `Industry: ${resolvedIndustry || 'Not specified'}`,
      `Current Revenue: ${formState.currentRevenue}`,
      `90-Day Goal: ${formState.revenueGoal}`,
      `Ad Budget: ${formState.adBudget}`,
      `Services: ${formState.services.join(', ') || 'None specified'}`,
      formState.projectDescription ? `Project Details: ${formState.projectDescription}` : ''
    ].filter(Boolean).join('\n');

    // Automatically store all field key-value pairs into pendingLeadData in sessionStorage
    dataObj.name = fullName;
    dataObj.first_name = firstNameValue;
    dataObj.last_name = lastNameValue;
    dataObj.email = emailValue;
    dataObj.phone = formState.phone || PHONE_NUMBER;
    dataObj.website = formState.website || 'None provided';
    dataObj.industry = resolvedIndustry;
    dataObj.current_revenue = formState.currentRevenue;
    dataObj.revenue_goal_90day = formState.revenueGoal;
    dataObj.monthly_ad_budget = formState.adBudget;
    dataObj.services_interested = formState.services.join(', ') || 'All Services';
    dataObj.project_description = formState.projectDescription || 'No details provided';
    dataObj.message = compiledMessage;
    dataObj.submitted_at = new Date().toISOString();

    sessionStorage.setItem('pendingLeadData', JSON.stringify(dataObj));

    const leadPayload: ContactFormData = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      phone: formState.phone || PHONE_NUMBER,
      website: formState.website,
      industry: resolvedIndustry,
      companyName: resolvedIndustry || 'Growth Partner',
      service: formState.services.join(', ') || 'Custom Growth & Automation System',
      budget: formState.adBudget,
      message: compiledMessage,
      selectedDate: selectedBookingDate,
      selectedTimeSlot: selectedSlot
    };

    setSubmittedLeadData(leadPayload);

    // Smoothly transition to STEP 2 (Embedded Calendar) without making any network requests yet
    setCurrentStep(2);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // STEP 2: LISTEN FOR GOOGLE CALENDAR APPOINTMENT COMPLETION
  useEffect(() => {
    const handleCalendarMessage = (e: MessageEvent) => {
      if (e.origin && (e.origin.includes('calendar.google.com') || e.origin.includes('calendar.app.google'))) {
        window.location.href = '/thank-you';
      }
    };

    window.addEventListener('message', handleCalendarMessage);
    return () => {
      window.removeEventListener('message', handleCalendarMessage);
    };
  }, []);

  // STEP 2: FINALIZE & REDIRECT TO THANK YOU PAGE
  const handleFinalizeBooking = () => {
    setIsFinalizing(true);
    window.location.href = '/thank-you';
  };

  return (
    <section id="contact" className="bg-[#9ce2c7] text-[#131d17] py-20 md:py-28 border-b border-[#8bd6ba]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">
            09 / Strategy & Consultation Booking
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131d17] leading-tight">
            Ready to Build Your <span className="text-black">Marketing Automation System?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#1a2e24] max-w-2xl mx-auto leading-relaxed font-sans">
            Stop wasting hours on manual marketing busywork or disconnected campaigns. Complete the brief questionnaire below to schedule your 1-on-1 growth strategy session.
          </p>
        </div>

        {/* 2-Step Progress Indicator */}
        <div className="max-w-md mx-auto mb-8 bg-black/10 p-1.5 rounded-full border border-black/10 flex items-center justify-between">
          <div 
            className={`flex-1 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
              currentStep === 1 
                ? 'bg-black text-white shadow-md' 
                : 'text-black/70 hover:text-black cursor-pointer'
            }`}
            onClick={() => setCurrentStep(1)}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 1 ? 'bg-[#9ce2c7] text-black' : 'bg-black/20 text-black'}`}>
              1
            </span>
            <span>1. Qualification</span>
          </div>

          <div className={`flex-1 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
            currentStep === 2 
              ? 'bg-black text-white shadow-md' 
              : 'text-black/70'
          }`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 2 ? 'bg-[#9ce2c7] text-black' : 'bg-black/20 text-black'}`}>
              2
            </span>
            <span>2. Schedule Time</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 1: GENERAL QUALIFICATION FORM                      */}
        {/* ======================================================== */}
        {currentStep === 1 && (
          <div className="bg-white/95 rounded-3xl p-6 sm:p-10 shadow-2xl border border-white space-y-6 animate-fade-in">
            <form onSubmit={handleSubmitStep1} className="space-y-6">
              
              {/* First Name & Last Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span>First Name *</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="John"
                    value={formState.firstName}
                    onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span>Last Name *</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Smith"
                    value={formState.lastName}
                    onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-gray-500" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(555) 000-0000"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Website Row */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 flex items-center space-x-1">
                  <Globe className="w-3.5 h-3.5 text-gray-500" />
                  <span>Website URL</span>
                </label>
                <input
                  type="text"
                  name="website"
                  placeholder="www.yourcompany.com"
                  value={formState.website}
                  onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none transition-all"
                />
              </div>

              {/* Industry Dropdown with Other slot */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 flex items-center space-x-1">
                  <Layers className="w-3.5 h-3.5 text-gray-500" />
                  <span>Industry *</span>
                </label>
                <select
                  name="industry"
                  value={formState.industry}
                  onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none transition-all"
                >
                  {INDUSTRY_OPTIONS.map((indOpt) => (
                    <option key={indOpt} value={indOpt}>
                      {indOpt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom input if Other is chosen */}
              {formState.industry === 'Other' && (
                <div className="animate-fade-in">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                    Please Specify Your Industry *
                  </label>
                  <input
                    type="text"
                    name="otherIndustry"
                    required
                    placeholder="e.g. Manufacturing, Solar, Automotive, SaaS..."
                    value={formState.otherIndustry}
                    onChange={(e) => setFormState({ ...formState, otherIndustry: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none transition-all"
                  />
                </div>
              )}

              {/* Current Monthly Revenue & 90-Day Revenue Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 flex items-center space-x-1">
                    <DollarSign className="w-3.5 h-3.5 text-gray-500" />
                    <span>Average Current Monthly Revenue</span>
                  </label>
                  <select
                    name="currentRevenue"
                    value={formState.currentRevenue}
                    onChange={(e) => setFormState({ ...formState, currentRevenue: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none transition-all"
                  >
                    <option value="Under $10k / mo">Under $10k / mo</option>
                    <option value="$10k - $25k / mo">$10k - $25k / mo</option>
                    <option value="$25k - $50k / mo">$25k - $50k / mo</option>
                    <option value="$50k - $100k / mo">$50k - $100k / mo</option>
                    <option value="$100k+ / mo">$100k+ / mo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 flex items-center space-x-1">
                    <TrendingUp className="w-3.5 h-3.5 text-gray-500" />
                    <span>90-Day Revenue Goal</span>
                  </label>
                  <select
                    name="revenueGoal"
                    value={formState.revenueGoal}
                    onChange={(e) => setFormState({ ...formState, revenueGoal: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none transition-all"
                  >
                    <option value="Under $10k">Under $10k</option>
                    <option value="$10k - $25k">$10k - $25k</option>
                    <option value="$25k - $50k">$25k - $50k</option>
                    <option value="$50k - $100k">$50k - $100k</option>
                    <option value="$100k+">$100k+</option>
                  </select>
                </div>
              </div>

              {/* Projected Monthly Ad Budget */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 flex items-center space-x-1">
                  <Target className="w-3.5 h-3.5 text-gray-500" />
                  <span>Projected Monthly Ad Budget</span>
                </label>
                <select
                  name="adBudget"
                  value={formState.adBudget}
                  onChange={(e) => setFormState({ ...formState, adBudget: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none transition-all"
                >
                  <option value="Under $1.5k">Under $1.5k</option>
                  <option value="$1.5k - $5k">$1.5k - $5k</option>
                  <option value="$5k - $10k">$5k - $10k</option>
                  <option value="$10k+">$10k+</option>
                </select>
              </div>

              {/* Services Interested In Checkboxes with All of the Above */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800">
                    Services Interested In:
                  </label>

                  {/* All of the Above Toggle */}
                  <button
                    type="button"
                    onClick={handleToggleAllServices}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-black hover:text-[#1b2620] transition-colors py-1 px-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                  >
                    {allSelected ? (
                      <CheckSquare className="w-3.5 h-3.5 text-black" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-gray-400" />
                    )}
                    <span>All of the Above</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICE_OPTIONS.map((srv) => {
                    const isChecked = formState.services.includes(srv.label);
                    return (
                      <label
                        key={srv.id}
                        onClick={() => handleToggleService(srv.label)}
                        className={`flex items-center space-x-3 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-[#9ce2c7] border-[#9ce2c7] text-black' : 'border-gray-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 text-black stroke-[3]" />}
                        </div>
                        <span className="select-none">{srv.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Space to describe project */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 flex items-center space-x-1">
                  <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
                  <span>Space to Describe Project & Specific Goals</span>
                </label>
                <textarea
                  rows={3}
                  name="projectDescription"
                  placeholder="Tell us about your current campaigns, target audience, hurdles, and what success looks like in the next 90 days..."
                  value={formState.projectDescription}
                  onChange={(e) => setFormState({ ...formState, projectDescription: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-medium text-gray-900 outline-none transition-all resize-none"
                />
              </div>

              {/* Step 1 Submit CTA */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  id="submit-general-qual-btn"
                  className="w-full bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest text-xs py-4 px-10 rounded-full transition-all shadow-xl cursor-pointer border border-white/20 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <span>Next: Select Date & Time</span>
                  <ArrowRight className="w-4 h-4 text-[#9ce2c7]" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 2: EMBEDDED CALENDAR SCHEDULER                     */}
        {/* ======================================================== */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#a3e6cd]/60 space-y-6 animate-fade-in">
            
            {/* Step 2 Header & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0e6245] bg-[#a3e6cd]/30 px-3 py-1 rounded-full border border-[#a3e6cd]">
                  Step 2 of 2 • Calendar Booking
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
                  Select Your Consultation Time
                </h3>
                <p className="text-xs font-medium text-gray-600 mt-1">
                  1. Pick a date & time in the calendar below. 2. Once confirmed, click <strong>"I've Completed My Booking"</strong>.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
                <button
                  type="button"
                  id="top-finalize-booking-btn"
                  onClick={handleFinalizeBooking}
                  disabled={isFinalizing}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-950 hover:text-black py-2.5 px-4 rounded-full bg-[#a3e6cd] hover:bg-[#8ee0c1] border border-[#7ed4b4] cursor-pointer transition-all shadow-sm disabled:opacity-75"
                >
                  {isFinalizing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Redirecting...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-[#0e6245]" />
                      <span>I've Booked My Slot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <a
                  href={GOOGLE_CALENDAR_APPOINTMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-700 hover:text-gray-900 py-2.5 px-4 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 cursor-pointer transition-all shadow-sm"
                >
                  <span>New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={PHONE_TEL}
                  id="contact-step2-call-btn"
                  title={`Call ${PHONE_NUMBER}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0e6245] hover:text-black py-2.5 px-4 rounded-full bg-[#f0fbf6] hover:bg-[#a3e6cd]/40 border border-[#a3e6cd] cursor-pointer transition-all shadow-sm active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0e6245]" />
                  <span>Call {PHONE_NUMBER}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 py-2.5 px-3 rounded-full bg-transparent hover:bg-gray-100 border border-gray-200 cursor-pointer transition-all"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Edit Info</span>
                </button>
              </div>
            </div>

            {/* Call Expectations Banner */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-900">
                <Sparkles className="w-4 h-4 text-[#0e6245]" />
                <span>What to Expect From Your Call:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-700">
                <div className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-xs">
                  <span className="font-bold text-[#0e6245] block mb-0.5">1. Growth Audit</span>
                  <span className="text-gray-600">Review your current acquisition channels and conversion bottlenecks.</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-xs">
                  <span className="font-bold text-[#0e6245] block mb-0.5">2. Custom Automation Blueprint</span>
                  <span className="text-gray-600">Identify high-ROI PPC campaigns and AI workflow opportunities.</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-xs">
                  <span className="font-bold text-[#0e6245] block mb-0.5">3. Clear Strategy & Action Steps</span>
                  <span className="text-gray-600">They will leave the call with a clear strategy and action steps.</span>
                </div>
              </div>
            </div>

            {/* Instruction Notice Banner */}
            <div className="bg-[#f0fbf6] border border-[#a3e6cd] rounded-xl p-3.5 flex items-center justify-between text-xs text-[#0e6245] font-medium">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#0e6245] shrink-0" />
                <span>Choose your preferred 30-min strategy session directly in the scheduler below:</span>
              </div>
              <button
                type="button"
                onClick={handleFinalizeBooking}
                className="hidden sm:inline-flex items-center space-x-1 text-[11px] font-bold uppercase tracking-wider text-black underline hover:text-[#0e6245] cursor-pointer"
              >
                <span>Finished? Click here to redirect</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Google Calendar Appointment Scheduler Container (100% width, min 720px height, 12px border-radius) */}
            <div 
              className="w-full min-h-[720px] bg-white border border-gray-200 overflow-hidden relative shadow-sm"
              style={{ width: '100%', minHeight: '720px', borderRadius: '12px' }}
            >
              <iframe
                src={GOOGLE_CALENDAR_EMBED_URL}
                style={{ border: 0, width: '100%', minHeight: '720px', borderRadius: '12px' }}
                width="100%"
                height="720px"
                frameBorder="0"
                title="Schedule Strategy Session with Deon Howard"
                className="w-full min-h-[720px] h-[720px] border-0 bg-white"
              />
            </div>

            {/* Prominent Bottom Confirmation Bar */}
            <div className="bg-[#121212] text-white p-6 sm:p-8 rounded-2xl border-2 border-[#a3e6cd] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-[#9ce2c7] text-xs font-bold uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 text-[#9ce2c7]" />
                  <span>Step 2 of 2 Completion</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  Done Choosing Your Time on the Calendar?
                </h4>
                <p className="text-xs text-gray-300">
                  Click below to confirm your appointment and proceed to the Thank You & next steps page.
                </p>
              </div>

              <button
                type="button"
                id="bottom-finalize-booking-btn"
                onClick={handleFinalizeBooking}
                disabled={isFinalizing}
                className="w-full sm:w-auto shrink-0 bg-[#a3e6cd] hover:bg-[#8ee0c1] text-gray-950 font-black uppercase tracking-widest text-xs py-4 px-8 rounded-full shadow-2xl transition-all cursor-pointer border border-[#7ed4b4] transform hover:-translate-y-0.5 disabled:opacity-75 flex items-center justify-center space-x-2"
              >
                {isFinalizing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Redirecting to Confirmation...</span>
                  </>
                ) : (
                  <>
                    <span>I've Completed My Booking → Continue</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

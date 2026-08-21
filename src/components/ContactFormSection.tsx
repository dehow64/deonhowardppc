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
  Building2,
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
import { PHONE_NUMBER, PHONE_TEL, WHATSAPP_NUMBER, WHATSAPP_URL, GOOGLE_CALENDAR_APPOINTMENT_URL, GOOGLE_CALENDAR_EMBED_URL } from '../data/contentData';
import { getUpcomingBookingDays, getTodayFormatted } from '../utils/dateUtils';
import { WhatsAppIcon } from './WhatsAppIcon';
import { openWhatsAppChat, formatLeadToWhatsAppMessage } from '../utils/whatsapp';

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
    companyName: '',
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
    const dataObj: Record<string, any> = {};

    // 1. FIX CHECKBOXES ("services"):
    // Collect all checked checkboxes as a comma-separated list
    const checkedServices = Array.from(
      formElement.querySelectorAll('input[name="services"]:checked, input[type="checkbox"]:checked')
    ).map((cb: any) => cb.value).filter((val: string) => val && val !== 'on');

    // 2. Extract standard fields
    for (const [key, value] of formData.entries()) {
      if (key !== 'services') {
        dataObj[key] = value;
      }
    }

    // Attach all checked services as a combined string
    dataObj['services'] = checkedServices.length > 0 
      ? checkedServices.join(', ') 
      : (formData.get('services') || (formState.services.length > 0 ? formState.services.join(', ') : 'None selected'));

    const firstNameValue = formState.firstName.trim();
    const lastNameValue = formState.lastName.trim();
    const companyNameValue = formState.companyName.trim();
    const fullName = `${firstNameValue} ${lastNameValue}`.trim();
    const emailValue = formState.email.trim();

    if (!firstNameValue || !emailValue) {
      return;
    }

    const resolvedIndustry = formState.industry === 'Other'
      ? (formState.otherIndustry.trim() ? `Other (${formState.otherIndustry.trim()})` : 'Other')
      : formState.industry;

    const projectDesc = (formState.projectDescription || (formData.get('projectDescription') as string) || (formData.get('message') as string) || '').trim();

    const compiledMessage = [
      companyNameValue ? `Company: ${companyNameValue}` : '',
      `Website: ${formState.website || 'Not provided'}`,
      `Industry: ${resolvedIndustry || 'Not specified'}`,
      `Current Revenue: ${formState.currentRevenue}`,
      `90-Day Goal: ${formState.revenueGoal}`,
      `Ad Budget: ${formState.adBudget}`,
      `Services: ${dataObj['services']}`,
      projectDesc ? `Project Details / Description:\n${projectDesc}` : ''
    ].filter(Boolean).join('\n\n');

    // Package the complete form payload reliably
    const formPayload = {
      formType: 'General Business Consultation',
      name: (formData.get('name') as string) || fullName,
      companyName: (formData.get('companyName') as string) || companyNameValue || '',
      email: (formData.get('email') as string) || emailValue,
      phone: (formData.get('phone') as string) || formState.phone || PHONE_NUMBER,
      website: (formData.get('website') as string) || formState.website || '',
      industry: (formData.get('industry') as string) || resolvedIndustry || 'General Business',
      currentRevenue: formState.currentRevenue || (formData.get('currentRevenue') as string),
      revenueGoal90Day: formState.revenueGoal || (formData.get('revenueGoal90Day') as string) || (formData.get('revenueGoal') as string),
      adBudget: formState.adBudget || (formData.get('adBudget') as string),
      services: dataObj['services'] || (formState.services.length > 0 ? formState.services.join(', ') : 'None selected'),
      projectDescription: projectDesc || 'No additional details provided',
      description: projectDesc || 'No additional details provided',
      project_description: projectDesc || 'No details provided',
      projectDetails: projectDesc,
      project_details: projectDesc,
      details: projectDesc,
      comments: projectDesc,
      notes: projectDesc,
      'Project Description': projectDesc,
      'Description': projectDesc,
      // backward-compatible & webhook mapping keys
      ...dataObj,
      first_name: firstNameValue,
      last_name: lastNameValue,
      company: (formData.get('companyName') as string) || companyNameValue || '',
      current_revenue: formState.currentRevenue || (formData.get('currentRevenue') as string),
      revenue_goal_90day: formState.revenueGoal || (formData.get('revenueGoal90Day') as string) || (formData.get('revenueGoal') as string),
      monthly_ad_budget: formState.adBudget || (formData.get('adBudget') as string),
      services_interested: dataObj['services'],
      message: compiledMessage,
      submitted_at: new Date().toISOString()
    };

    sessionStorage.setItem('pendingLeadData', JSON.stringify(formPayload));

    // Also populate window.storedLeadData for iframe postMessage listeners
    const searchParams = new URLSearchParams();
    for (const [k, v] of Object.entries(formPayload)) {
      if (v !== undefined && v !== null) {
        searchParams.append(k, String(v));
      }
    }
    window.storedLeadData = searchParams;

    const leadPayload: ContactFormData = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      phone: formState.phone || PHONE_NUMBER,
      website: formState.website,
      industry: resolvedIndustry,
      companyName: companyNameValue || resolvedIndustry || 'Growth Partner',
      service: typeof dataObj['services'] === 'string' ? dataObj['services'] : 'Custom Growth & Automation System',
      budget: formState.adBudget,
      projectDescription: projectDesc,
      description: projectDesc,
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
  const handleFinalizeBooking = (dateOverride?: string, slotOverride?: string) => {
    setIsFinalizing(true);
    const chosenDate = dateOverride || selectedBookingDate;
    const chosenSlot = slotOverride || selectedSlot;

    try {
      const existing = sessionStorage.getItem('pendingLeadData');
      const obj = existing ? JSON.parse(existing) : {};
      obj.selectedDate = chosenDate;
      obj.selectedTimeSlot = chosenSlot;
      sessionStorage.setItem('pendingLeadData', JSON.stringify(obj));
    } catch (e) {
      console.warn('Session write notice:', e);
    }

    if (onFormSubmitted && submittedLeadData) {
      onFormSubmitted({
        ...submittedLeadData,
        selectedDate: chosenDate,
        selectedTimeSlot: chosenSlot
      });
    } else {
      window.location.href = '/thank-you';
    }
  };

  return (
    <section id="contact" className="bg-[#9ce2c7] text-[#131d17] py-20 md:py-28 border-b border-[#8bd6ba] w-full">
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

              {/* Company Name & Website Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 flex items-center space-x-1">
                    <Building2 className="w-3.5 h-3.5 text-gray-500" />
                    <span>Company Name</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Acme Growth Inc."
                    value={formState.companyName}
                    onChange={(e) => setFormState({ ...formState, companyName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none transition-all"
                  />
                </div>
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
                    name="revenueGoal90Day"
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
                        className={`flex items-center space-x-3 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all select-none ${
                          isChecked
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="services"
                          value={srv.label}
                          checked={isChecked}
                          onChange={() => handleToggleService(srv.label)}
                          className="sr-only"
                        />
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

              {/* Highlighted Green Standout Project Description */}
              <div className="bg-[#f0fbf6] border-2 border-[#10b981] rounded-2xl p-4 sm:p-5 shadow-md space-y-2.5 transition-all focus-within:ring-2 focus-within:ring-[#10b981]/40">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#065f46] flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-[#059669]" />
                  <span>Tell us more about your project, your company, goals, etc.</span>
                </label>
                <textarea
                  rows={3}
                  name="projectDescription"
                  placeholder="Tell us more about your project, your company, goals, current challenges, 90-day targets, etc..."
                  value={formState.projectDescription}
                  onChange={(e) => setFormState({ ...formState, projectDescription: e.target.value })}
                  className="w-full bg-white border-2 border-[#a3e6cd] focus:border-[#059669] focus:ring-2 focus:ring-[#10b981]/30 rounded-xl py-3 px-3.5 text-xs font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all resize-none shadow-inner"
                />
              </div>

              {/* Step 1 Submit CTA */}
              <div className="pt-2 text-center space-y-3">
                <button
                  type="submit"
                  id="submit-general-qual-btn"
                  className="w-full bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest text-xs py-4 px-10 rounded-full transition-all shadow-xl cursor-pointer border border-white/20 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <span>Next: Select Date & Time</span>
                  <ArrowRight className="w-4 h-4 text-[#9ce2c7]" />
                </button>

                {/* WhatsApp Alternative Direct Submit Button */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    id="submit-whatsapp-direct-btn"
                    onClick={(e) => {
                      const msg = formatLeadToWhatsAppMessage({
                        firstName: formState.firstName,
                        lastName: formState.lastName,
                        companyName: formState.companyName,
                        email: formState.email,
                        phone: formState.phone,
                        website: formState.website,
                        industry: formState.industry,
                        services: formState.services,
                        adBudget: formState.adBudget,
                        currentRevenue: formState.currentRevenue,
                        projectDescription: formState.projectDescription
                      });
                      openWhatsAppChat(msg, e);
                    }}
                    title="Send details via WhatsApp"
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold uppercase tracking-wider text-xs py-3.5 px-8 rounded-full transition-all shadow-md active:scale-95 cursor-pointer border border-white/40"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Or Submit Details via WhatsApp</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 2: EMBEDDED CALENDAR SCHEDULER                     */}
        {/* ======================================================== */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#a3e6cd]/60 space-y-6 animate-fade-in">
            
            {/* Step 2 Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0e6245] bg-[#a3e6cd]/30 px-3 py-1 rounded-full border border-[#a3e6cd]">
                  Step 2 of 2 • Calendar Booking
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
                  Select a Time Slot on the Calendar
                </h3>
                <p className="text-xs font-medium text-gray-600 mt-1">
                  Please choose your preferred date and time on the calendar below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-700 hover:text-gray-900 py-2.5 px-4 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 cursor-pointer transition-all self-start sm:self-auto"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Edit Info</span>
              </button>
            </div>

            {/* Google Calendar Iframe */}
            <div 
              className="w-full min-h-[720px] bg-white border border-gray-200 overflow-hidden relative shadow-sm rounded-2xl"
              style={{ width: '100%', minHeight: '720px', borderRadius: '16px' }}
            >
              <iframe
                src={GOOGLE_CALENDAR_EMBED_URL}
                style={{ border: 0, width: '100%', minHeight: '720px', borderRadius: '16px' }}
                width="100%"
                height="720px"
                frameBorder="0"
                title="Schedule Strategy Session with Deon Howard"
                className="w-full min-h-[720px] h-[720px] border-0 bg-white"
              />
            </div>

            {/* Bottom Confirmation Bar */}
            <div className="bg-[#121212] text-white p-6 sm:p-8 rounded-2xl border-2 border-[#a3e6cd] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-[#9ce2c7] text-xs font-bold uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 text-[#9ce2c7]" />
                  <span>Session Scheduling</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  Done Choosing Your Time on the Calendar?
                </h4>
                <p className="text-xs text-gray-300">
                  Click below to confirm your appointment and proceed to the Thank You briefing page.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    const msg = `Hi Deon, I'm currently on the calendar scheduler and would like to confirm my consultation booking with you via WhatsApp.`;
                    openWhatsAppChat(msg, e);
                  }}
                  title="Confirm on WhatsApp"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold uppercase tracking-wider text-xs py-4 px-6 rounded-full transition-all shadow-xl active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Chat via WhatsApp</span>
                </a>

                <button
                  type="button"
                  id="bottom-finalize-booking-btn"
                  onClick={() => handleFinalizeBooking()}
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

          </div>
        )}

      </div>
    </section>
  );
};

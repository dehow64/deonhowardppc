import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  Loader2, 
  ArrowRight, 
  ChevronLeft, 
  ExternalLink, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Building2,
  Layers, 
  DollarSign, 
  TrendingUp, 
  Target, 
  MessageSquare, 
  CheckSquare, 
  Square, 
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { submitToGoogleScript } from '../services/googleScript';
import { scheduleGoogleWorkspaceAppointment, TARGET_ADMIN_EMAIL } from '../services/googleWorkspace';
import { PHONE_NUMBER, PHONE_TEL, WHATSAPP_NUMBER, WHATSAPP_URL, GOOGLE_CALENDAR_APPOINTMENT_URL, GOOGLE_CALENDAR_EMBED_URL } from '../data/contentData';
import { ContactFormData } from '../types';
import { INDUSTRY_OPTIONS, SERVICE_OPTIONS } from './ContactFormSection';
import { getUpcomingBookingDays, getTodayFormatted } from '../utils/dateUtils';
import { WhatsAppIcon } from './WhatsAppIcon';
import { openWhatsAppChat, formatLeadToWhatsAppMessage } from '../utils/whatsapp';
import { trackFormStepCompleted } from '../utils/analytics';

interface BookingModalProps {
  isOpen: boolean;
  initialDate?: string;
  initialTimeSlot?: string;
  onClose: () => void;
  onSuccess: (data: ContactFormData) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  initialDate, 
  initialTimeSlot, 
  onClose, 
  onSuccess 
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('Home Services (Plumbing, HVAC, Roofing, Electricians)');
  const [otherIndustry, setOtherIndustry] = useState('');
  const [currentRevenue, setCurrentRevenue] = useState('$10k - $25k / mo');
  const [revenueGoal, setRevenueGoal] = useState('$25k - $50k');
  const [adBudget, setAdBudget] = useState('$1.5k - $5k');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Automated Conversion Funnels (AI Websites & Landing Pages)',
    'AI Customer Acquisition Systems (Google & Meta Paid Ads)'
  ]);
  const [projectDescription, setProjectDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedLeadData, setSavedLeadData] = useState<ContactFormData | null>(null);

  const upcomingBookingDays = getUpcomingBookingDays(5);
  const [selectedBookingDate, setSelectedBookingDate] = useState<string>(initialDate || upcomingBookingDays[0]?.formatted || getTodayFormatted());
  const [selectedSlot, setSelectedSlot] = useState<string>(initialTimeSlot || upcomingBookingDays[0]?.timeSlots[0] || '10:00 AM');

  // Synchronize initial date and slot when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialDate) {
        setSelectedBookingDate(initialDate);
      }
      if (initialTimeSlot) {
        setSelectedSlot(initialTimeSlot);
      }
      setCurrentStep(1);
      setIsFinalizing(false);
    }
  }, [isOpen, initialDate, initialTimeSlot]);

  // Listen for Google Calendar postMessage completion inside modal
  useEffect(() => {
    const handleCalendarMessage = (e: MessageEvent) => {
      try {
        if (e.origin && (e.origin.includes('calendar.google.com') || e.origin.includes('calendar.app.google'))) {
          console.log('📅 Modal Google Calendar appointment scheduled event received:', e.data);
          handleFinalizeModalBooking();
        }
      } catch (err) {
        console.warn('Error evaluating calendar event message in modal:', err);
      }
    };

    window.addEventListener('message', handleCalendarMessage);
    return () => window.removeEventListener('message', handleCalendarMessage);
  }, [onSuccess, savedLeadData, onClose, selectedBookingDate, selectedSlot]);

  const handleFinalizeModalBooking = (dateOverride?: string, slotOverride?: string) => {
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
      console.warn('Modal session write notice:', e);
    }

    const desc = (projectDescription || '').trim();
    const finalLeadData: ContactFormData = savedLeadData || {
      firstName: firstName || 'Client',
      lastName: lastName || '',
      email: email || '',
      phone: phone || PHONE_NUMBER,
      website: website || '',
      industry: industry || 'General Business',
      companyName: 'Growth Partner',
      service: selectedServices.join(', ') || 'Custom Marketing Automation System',
      budget: adBudget,
      projectDescription: desc,
      description: desc,
      message: desc ? `Project Details:\n${desc}\n\nSelected Slot: ${chosenDate} at ${chosenSlot}` : `Selected Slot: ${chosenDate} at ${chosenSlot}`,
      selectedDate: chosenDate,
      selectedTimeSlot: chosenSlot
    };

    onSuccess({
      ...finalLeadData,
      selectedDate: chosenDate,
      selectedTimeSlot: chosenSlot
    });
  };

  if (!isOpen) return null;

  const handleToggleService = (label: string) => {
    if (selectedServices.includes(label)) {
      setSelectedServices(selectedServices.filter(s => s !== label));
    } else {
      setSelectedServices([...selectedServices, label]);
    }
  };

  const allSelected = SERVICE_OPTIONS.every(s => selectedServices.includes(s.label));

  const handleToggleAllServices = () => {
    if (allSelected) {
      setSelectedServices([]);
    } else {
      setSelectedServices(SERVICE_OPTIONS.map(s => s.label));
    }
  };

  const handleProceedToCalendar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = ((e.target as HTMLElement).closest('form') || (e.currentTarget as HTMLFormElement)) as HTMLFormElement;
    const formData = new FormData(formElement);

    // Gather checked services
    const checkedServices = Array.from(
      formElement.querySelectorAll('input[type="checkbox"]:checked')
    ).map((cb: any) => cb.value).filter((val: string) => val && val !== 'on').join(', ');

    const firstNameVal = firstName || (formData.get('firstName') as string) || '';
    const lastNameVal = lastName || (formData.get('lastName') as string) || '';
    const emailVal = email || (formData.get('email') as string) || '';
    const phoneVal = phone || (formData.get('phone') as string) || '';
    const websiteVal = website || (formData.get('website') as string) || '';
    const industryVal = (industry === 'Other' && otherIndustry.trim() ? `Other (${otherIndustry.trim()})` : industry) || (formData.get('industry') as string) || '';
    const currentRevenueVal = currentRevenue || (formData.get('currentRevenue') as string) || '';
    const revenueGoalVal = revenueGoal || (formData.get('revenueGoal90Day') as string) || (formData.get('revenueGoal') as string) || '';
    const adBudgetVal = adBudget || (formData.get('adBudget') as string) || '';
    const servicesVal = checkedServices || selectedServices.join(', ') || 'None selected';
    const projectDescVal = projectDescription || (formData.get('projectDescription') as string) || (formData.get('message') as string) || 'None provided';

    const formPayload = {
      formType: 'Strategy Session Form',
      firstName: firstNameVal,
      lastName: lastNameVal,
      name: `${firstNameVal} ${lastNameVal}`.trim(),
      email: emailVal,
      phone: phoneVal,
      website: websiteVal,
      industry: industryVal,
      currentRevenue: currentRevenueVal,
      revenueGoal90Day: revenueGoalVal,
      adBudget: adBudgetVal,
      services: servicesVal,
      projectDescription: projectDescVal
    };

    // Store in sessionStorage
    sessionStorage.setItem('pendingLeadData', JSON.stringify(formPayload));

    // Also populate window.storedLeadData for iframe postMessage listeners
    const searchParams = new URLSearchParams();
    for (const [k, v] of Object.entries(formPayload)) {
      if (v !== undefined && v !== null) {
        searchParams.append(k, String(v));
      }
    }
    window.storedLeadData = searchParams;

    const fullMessage = [
      `Website: ${websiteVal || 'None provided'}`,
      `Industry: ${industryVal || 'General Business'}`,
      `Current Revenue: ${currentRevenueVal}`,
      `90-Day Goal: ${revenueGoalVal}`,
      `Ad Budget: ${adBudgetVal}`,
      `Services: ${servicesVal}`,
      projectDescVal !== 'None provided' ? `Project Details / Description:\n${projectDescVal}` : ''
    ].filter(Boolean).join('\n\n');

    const submissionData: ContactFormData = {
      firstName: firstNameVal,
      lastName: lastNameVal,
      email: emailVal,
      phone: phoneVal || PHONE_NUMBER,
      website: websiteVal,
      industry: industryVal,
      companyName: industryVal || 'Growth Partner',
      service: servicesVal,
      budget: adBudgetVal,
      projectDescription: projectDescVal,
      description: projectDescVal,
      message: fullMessage
    };

    setSavedLeadData(submissionData);

    // Track Step 1 completion in GA4
    trackFormStepCompleted(1, 'Lead Intake Form', 'Booking Modal Funnel');

    // Smoothly transition to STEP 2 (Embedded Calendar) without making any network requests yet
    setCurrentStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white text-gray-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl border-2 border-[#a3e6cd]/60 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100 cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {currentStep === 1 ? (
          <div>
            <div className="mb-6">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0e6245] bg-[#a3e6cd]/30 px-3 py-1 rounded-full inline-block mb-2 border border-[#a3e6cd]">
                Step 1 of 2 • Strategy Qualification
              </div>
              <h3 className="text-2xl font-black text-gray-900">
                Book 1-on-1 Strategy Session
              </h3>
              <p className="text-xs font-medium text-gray-600 mt-1">
                Tell us about your business and goals below. In the next step, you can lock in your exact consultation slot on Google Calendar.
              </p>

              {selectedSlot && selectedBookingDate && (
                <div className="mt-3 bg-[#f0fbf6] border border-[#a3e6cd] rounded-xl p-3 flex items-center justify-between text-xs text-[#0e6245]">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#0e6245] shrink-0" />
                    <span>
                      Selected Slot: <strong>{selectedBookingDate} at {selectedSlot}</strong> (EDT)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-white text-[#0e6245] px-2 py-0.5 rounded-full border border-[#a3e6cd] font-bold shrink-0">
                    Holding Spot
                  </span>
                </div>
              )}
            </div>

            <form onSubmit={handleProceedToCalendar} className="space-y-4">
              
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center space-x-1">
                    <User className="w-3 h-3 text-gray-500" />
                    <span>First Name *</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-2.5 px-3.5 text-xs font-bold text-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center space-x-1">
                    <User className="w-3 h-3 text-gray-500" />
                    <span>Last Name *</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Smith"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-2.5 px-3.5 text-xs font-bold text-gray-900 outline-none"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center space-x-1">
                    <Mail className="w-3 h-3 text-gray-500" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-2.5 px-3.5 text-xs font-bold text-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center space-x-1">
                    <Phone className="w-3 h-3 text-gray-500" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-2.5 px-3.5 text-xs font-bold text-gray-900 outline-none"
                  />
                </div>
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center space-x-1">
                  <Globe className="w-3 h-3 text-gray-500" />
                  <span>Website URL</span>
                </label>
                <input
                  type="text"
                  name="website"
                  placeholder="www.yourcompany.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-2.5 px-3.5 text-xs font-bold text-gray-900 outline-none"
                />
              </div>

              {/* Industry Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center space-x-1">
                  <Layers className="w-3 h-3 text-gray-500" />
                  <span>Industry *</span>
                </label>
                <select
                  name="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-2.5 px-3.5 text-xs font-bold text-gray-900 outline-none"
                >
                  {INDUSTRY_OPTIONS.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              {/* Other Industry Input */}
              {industry === 'Other' && (
                <div className="animate-fade-in">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Please Specify Your Industry *
                  </label>
                  <input
                    type="text"
                    name="otherIndustry"
                    required
                    placeholder="e.g. Manufacturing, Solar, Automotive, SaaS..."
                    value={otherIndustry}
                    onChange={(e) => setOtherIndustry(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-2.5 px-3.5 text-xs font-bold text-gray-900 outline-none"
                  />
                </div>
              )}

              {/* Current Revenue & 90-Day Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center space-x-1">
                    <DollarSign className="w-3 h-3 text-gray-500" />
                    <span>Average Monthly Revenue</span>
                  </label>
                  <select
                    name="currentRevenue"
                    value={currentRevenue}
                    onChange={(e) => setCurrentRevenue(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-2.5 px-3.5 text-xs font-bold text-gray-900 outline-none"
                  >
                    <option value="Under $10k / mo">Under $10k / mo</option>
                    <option value="$10k - $25k / mo">$10k - $25k / mo</option>
                    <option value="$25k - $50k / mo">$25k - $50k / mo</option>
                    <option value="$50k - $100k / mo">$50k - $100k / mo</option>
                    <option value="$100k+ / mo">$100k+ / mo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-gray-500" />
                    <span>90-Day Revenue Goal</span>
                  </label>
                  <select
                    name="revenueGoal90Day"
                    value={revenueGoal}
                    onChange={(e) => setRevenueGoal(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-2.5 px-3.5 text-xs font-bold text-gray-900 outline-none"
                  >
                    <option value="Under $10k">Under $10k</option>
                    <option value="$10k - $25k">$10k - $25k</option>
                    <option value="$25k - $50k">$25k - $50k</option>
                    <option value="$50k - $100k">$50k - $100k</option>
                    <option value="$100k+">$100k+</option>
                  </select>
                </div>
              </div>

              {/* Ad Budget */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center space-x-1">
                  <Target className="w-3 h-3 text-gray-500" />
                  <span>Projected Monthly Ad Budget</span>
                </label>
                <select
                  name="adBudget"
                  value={adBudget}
                  onChange={(e) => setAdBudget(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-2.5 px-3.5 text-xs font-bold text-gray-900 outline-none"
                >
                  <option value="Under $1.5k">Under $1.5k</option>
                  <option value="$1.5k - $5k">$1.5k - $5k</option>
                  <option value="$5k - $10k">$5k - $10k</option>
                  <option value="$10k+">$10k+</option>
                </select>
              </div>

              {/* Services Checkboxes */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Services Interested In:
                  </label>
                  <button
                    type="button"
                    onClick={handleToggleAllServices}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-gray-900 py-0.5 px-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer transition-colors"
                  >
                    {allSelected ? <CheckSquare className="w-3 h-3" /> : <Square className="w-3 h-3 text-gray-400" />}
                    <span>Select All</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICE_OPTIONS.map((srv) => {
                    const isChecked = selectedServices.includes(srv.label);
                    return (
                      <label
                        key={srv.id}
                        className={`flex items-center space-x-2 p-2 rounded-xl border text-xs font-medium cursor-pointer transition-all select-none ${
                          isChecked
                            ? 'bg-black text-white border-black'
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
                        <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-[#a3e6cd] border-[#a3e6cd] text-black' : 'border-gray-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-2.5 h-2.5 text-black stroke-[3]" />}
                        </div>
                        <span className="truncate">{srv.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Highlighted Green Standout Project Description */}
              <div className="bg-[#f0fbf6] border-2 border-[#10b981] rounded-2xl p-4 shadow-md space-y-2.5 transition-all focus-within:ring-2 focus-within:ring-[#10b981]/40">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#065f46] flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-[#059669]" />
                  <span>Tell us more about your project, your company, goals, etc.</span>
                </label>
                <textarea
                  rows={3}
                  name="projectDescription"
                  placeholder="Tell us more about your project, your company, goals, current challenges, 90-day targets, etc..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full bg-white border-2 border-[#a3e6cd] focus:border-[#059669] focus:ring-2 focus:ring-[#10b981]/30 rounded-xl py-3 px-3.5 text-xs font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all resize-none shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#a3e6cd] hover:bg-[#8ee0c1] text-gray-900 font-black uppercase tracking-widest text-xs py-4 rounded-full shadow-lg transition-all mt-4 cursor-pointer border border-[#7ed4b4] transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <span>Next: Select Date & Time</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              {/* WhatsApp Quick Inquiry Button */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={(e) => {
                    const msg = formatLeadToWhatsAppMessage({
                      firstName,
                      lastName,
                      companyName,
                      email,
                      phone,
                      website,
                      industry: industry === 'Other' ? otherIndustry : industry,
                      services: selectedServices,
                      adBudget,
                      currentRevenue,
                      projectDescription
                    });
                    openWhatsAppChat(msg, e);
                  }}
                  title="Inquire via WhatsApp"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold uppercase tracking-wider text-xs py-3 px-6 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Or Inquire via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* STEP 2: EMBEDDED GOOGLE CALENDAR APPOINTMENT SCHEDULER */
          <div className="space-y-5 animate-fade-in">
            {/* Step 2 Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-3">
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
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-700 hover:text-gray-900 py-2 px-3.5 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 cursor-pointer transition-all self-start sm:self-auto"
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

            {/* Prominent Bottom Confirmation Bar */}
            <div className="bg-[#121212] text-white p-5 sm:p-6 rounded-2xl border-2 border-[#a3e6cd] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-[#9ce2c7] text-xs font-bold uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 text-[#9ce2c7]" />
                  <span>Session Scheduling</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Done Choosing Your Time Slot on the Calendar?
                </h4>
                <p className="text-xs text-gray-300">
                  Click below to confirm your session and view your Thank You briefing page.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    const msg = `Hi Deon, I'm booking a session on your calendar modal and want to connect via WhatsApp.`;
                    openWhatsAppChat(msg, e, 'booking_modal');
                  }}
                  title="Chat on WhatsApp"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold uppercase tracking-wider text-xs py-3.5 px-5 rounded-full transition-all shadow-xl active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>WhatsApp</span>
                </a>

                <button
                  type="button"
                  id="modal-bottom-finalize-booking-btn"
                  onClick={() => handleFinalizeModalBooking()}
                  disabled={isFinalizing}
                  className="w-full sm:w-auto shrink-0 bg-[#a3e6cd] hover:bg-[#8ee0c1] text-gray-950 font-black uppercase tracking-widest text-xs py-3.5 px-6 rounded-full shadow-2xl transition-all cursor-pointer border border-[#7ed4b4] transform hover:-translate-y-0.5 disabled:opacity-75 flex items-center justify-center space-x-2"
                >
                  {isFinalizing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Redirecting...</span>
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
    </div>
  );
};

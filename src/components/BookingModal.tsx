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
import { PHONE_NUMBER, PHONE_TEL, GOOGLE_CALENDAR_APPOINTMENT_URL, GOOGLE_CALENDAR_EMBED_URL } from '../data/contentData';
import { ContactFormData } from '../types';
import { INDUSTRY_OPTIONS, SERVICE_OPTIONS } from './ContactFormSection';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: ContactFormData) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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

  // Listen for Google Calendar postMessage completion inside modal
  useEffect(() => {
    const handleCalendarMessage = (e: MessageEvent) => {
      try {
        if (e.origin && (e.origin.includes('calendar.google.com') || e.origin.includes('calendar.app.google'))) {
          console.log('📅 Modal Google Calendar appointment scheduled event received:', e.data);
          if (savedLeadData) {
            onSuccess(savedLeadData);
          } else {
            window.location.href = '/thank-you';
          }
          onClose();
        }
      } catch (err) {
        console.warn('Error evaluating calendar event message in modal:', err);
      }
    };

    window.addEventListener('message', handleCalendarMessage);
    return () => window.removeEventListener('message', handleCalendarMessage);
  }, [onSuccess, savedLeadData, onClose]);

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

  const handleProceedToCalendar = (e: React.FormEvent) => {
    e.preventDefault();

    const firstNameTrim = firstName.trim();
    const lastNameTrim = lastName.trim();
    const fullName = `${firstNameTrim} ${lastNameTrim}`.trim() || 'Client';

    if (!firstNameTrim || !email.trim()) {
      return;
    }

    const resolvedIndustry = industry === 'Other'
      ? (otherIndustry.trim() ? `Other (${otherIndustry.trim()})` : 'Other')
      : industry;

    const fullMessage = [
      `Website: ${website || 'None provided'}`,
      `Industry: ${resolvedIndustry || 'General Business'}`,
      `Current Revenue: ${currentRevenue}`,
      `90-Day Goal: ${revenueGoal}`,
      `Ad Budget: ${adBudget}`,
      `Services: ${selectedServices.join(', ') || 'All Services'}`,
      projectDescription ? `Project Details: ${projectDescription}` : ''
    ].filter(Boolean).join('\n');

    const submissionData: ContactFormData = {
      firstName: firstNameTrim,
      lastName: lastNameTrim,
      email,
      phone: phone || PHONE_NUMBER,
      website,
      industry: resolvedIndustry,
      companyName: resolvedIndustry || 'Growth Partner',
      service: selectedServices.join(', ') || 'Custom Marketing Automation System',
      budget: adBudget,
      message: fullMessage
    };

    setSavedLeadData(submissionData);

    // 1. Store form values in memory (window.storedLeadData = new URLSearchParams(...))
    const formParams = new URLSearchParams();
    formParams.append('name', fullName);
    formParams.append('first_name', firstNameTrim);
    formParams.append('last_name', lastNameTrim);
    formParams.append('email', email);
    formParams.append('phone', phone || PHONE_NUMBER);
    formParams.append('website', website || 'None provided');
    formParams.append('industry', resolvedIndustry);
    formParams.append('current_revenue', currentRevenue);
    formParams.append('revenue_goal_90day', revenueGoal);
    formParams.append('monthly_ad_budget', adBudget);
    formParams.append('services_interested', selectedServices.join(', ') || 'All Services');
    formParams.append('project_description', projectDescription || 'None provided');
    formParams.append('message', fullMessage);
    formParams.append('submitted_at', new Date().toISOString());

    window.storedLeadData = formParams;

    // Send immediately to Google Apps Script Webhook in background so lead is always saved
    try {
      fetch('https://script.google.com/macros/s/AKfycbzGtFLUzlrzd7ovTIleSE2wxCiRsWFq0pxQx7Ss_GxhrFObaZA_X5hxqJ4k-ukdqBNL-w/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formParams.toString()
      }).catch((err) => console.warn('Modal background lead capture note:', err));
    } catch (err) {
      console.warn('Modal background dispatch warning:', err);
    }

    // 2. Smoothly transition the view to Step 2 without reloading
    setCurrentStep(2);
  };

  const handleFinalizeModalBooking = async () => {
    setIsFinalizing(true);

    if (window.storedLeadData) {
      try {
        await fetch('https://script.google.com/macros/s/AKfycbzGtFLUzlrzd7ovTIleSE2wxCiRsWFq0pxQx7Ss_GxhrFObaZA_X5hxqJ4k-ukdqBNL-w/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: window.storedLeadData.toString()
        });
      } catch (err) {
        console.warn('Sync notice:', err);
      }
    }

    if (savedLeadData) {
      try {
        await scheduleGoogleWorkspaceAppointment(savedLeadData);
      } catch (e) {
        console.warn('Calendar sync notice:', e);
      }
      onSuccess(savedLeadData);
    } else {
      window.location.href = '/thank-you';
    }
    onClose();
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
                Tell us about your marketing goals. In the next step, you'll choose an exact strategy time on Google Calendar.
              </p>
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
                  type="url"
                  placeholder="https://yourcompany.com"
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
                        onClick={() => handleToggleService(srv.label)}
                        className={`flex items-center space-x-2 p-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-black text-white border-black'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
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

              {/* Describe Project */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3 text-gray-500" />
                  <span>Space to Describe Project</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your target market, past campaigns, and goals..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black rounded-xl py-2 px-3 text-xs font-medium text-gray-900 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#a3e6cd] hover:bg-[#8ee0c1] text-gray-900 font-black uppercase tracking-widest text-xs py-4 rounded-full shadow-lg transition-all mt-4 cursor-pointer border border-[#7ed4b4] transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <span>Next: Select Date & Time</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          </div>
        ) : (
          /* STEP 2: EMBEDDED GOOGLE CALENDAR APPOINTMENT SCHEDULER */
          <div className="space-y-5 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0e6245] bg-[#a3e6cd]/30 px-3 py-1 rounded-full border border-[#a3e6cd]">
                  Step 2 of 2 • Calendar Booking
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
                  Select Your Consultation Time
                </h3>
                <p className="text-xs font-medium text-gray-600">
                  1. Pick a slot in the scheduler. 2. Click <strong>"I've Completed My Booking"</strong>.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
                <button
                  type="button"
                  id="modal-top-finalize-booking-btn"
                  onClick={handleFinalizeModalBooking}
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
                  id="modal-step2-call-btn"
                  title={`Call ${PHONE_NUMBER}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0e6245] hover:text-black py-2.5 px-3.5 rounded-full bg-[#f0fbf6] hover:bg-[#a3e6cd]/40 border border-[#a3e6cd] cursor-pointer transition-all shadow-sm active:scale-95"
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
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-900">
                <Sparkles className="w-4 h-4 text-[#0e6245]" />
                <span>What to Expect From Your Call:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs text-gray-700">
                <div className="bg-white p-2.5 rounded-xl border border-gray-200/80 shadow-xs">
                  <span className="font-bold text-[#0e6245] block text-[11px] mb-0.5">1. Growth Audit</span>
                  <span className="text-gray-600 text-[11px] leading-snug block">Review your current acquisition channels and conversion bottlenecks.</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-gray-200/80 shadow-xs">
                  <span className="font-bold text-[#0e6245] block text-[11px] mb-0.5">2. Custom Automation Blueprint</span>
                  <span className="text-gray-600 text-[11px] leading-snug block">Identify high-ROI PPC campaigns and AI workflow opportunities.</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-gray-200/80 shadow-xs">
                  <span className="font-bold text-[#0e6245] block text-[11px] mb-0.5">3. Clear Strategy & Action Steps</span>
                  <span className="text-gray-600 text-[11px] leading-snug block">They will leave the call with a clear strategy and action steps.</span>
                </div>
              </div>
            </div>

            {/* Instruction Notice Banner */}
            <div className="bg-[#f0fbf6] border border-[#a3e6cd] rounded-xl p-3.5 flex items-center justify-between text-xs text-[#0e6245] font-medium">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#0e6245] shrink-0" />
                <span>Select your 30-minute growth strategy consultation slot below:</span>
              </div>
              <button
                type="button"
                onClick={handleFinalizeModalBooking}
                className="hidden sm:inline-flex items-center space-x-1 text-[11px] font-bold uppercase tracking-wider text-black underline hover:text-[#0e6245] cursor-pointer"
              >
                <span>Finished? Click to redirect</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Google Calendar Appointment Scheduler Embed Container (100% width, min 720px height, 12px border-radius) */}
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

              <button
                type="button"
                id="modal-bottom-finalize-booking-btn"
                onClick={handleFinalizeModalBooking}
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
        )}

      </div>
    </div>
  );
};

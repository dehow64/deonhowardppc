import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Calendar as CalendarIcon, Loader2, Send } from 'lucide-react';
import { ContactFormData } from '../types';
import { submitToGoogleScript } from '../services/googleScript';
import { scheduleGoogleWorkspaceAppointment, TARGET_ADMIN_EMAIL } from '../services/googleWorkspace';

interface ContactFormSectionProps {
  onFormSubmitted: (data: ContactFormData) => void;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({ onFormSubmitted }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    service: 'Automated Conversion Funnels & Websites',
    budget: '$5,000 - $10,000/mo',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calendar State
  const [selectedDay, setSelectedDay] = useState<number>(6);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM - 11:00 AM');
  const [showMoreSlots, setShowMoreSlots] = useState<boolean>(false);
  const [currentMonth] = useState<string>('August 2026');

  const defaultSlots = [
    '10:00 AM - 11:00 AM',
    '10:30 AM - 11:30 AM',
    '11:00 AM - 12:00 PM',
    '11:30 AM - 12:30 PM'
  ];

  const extraSlots = [
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:30 PM - 04:30 PM'
  ];

  const availableSlots = showMoreSlots ? [...defaultSlots, ...extraSlots] : defaultSlots;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // 1. Prevent default form submission behavior
    e.preventDefault();
    // 2. Disable submit button to prevent duplicate clicks
    setIsSubmitting(true);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'Prospective Client';
    const selectedDateStr = `${currentMonth.split(' ')[0]} ${selectedDay}, ${currentMonth.split(' ')[1]}`;

    // Construct enriched message with consultation details
    const fullMessage = [
      formData.message ? `Notes: ${formData.message}` : '',
      `Phone: ${formData.phone || 'Not provided'}`,
      `Company: ${formData.companyName || 'Not provided'}`,
      `Service: ${formData.service}`,
      `Budget: ${formData.budget}`,
      `Scheduled Appointment: ${selectedDateStr} at ${selectedSlot}`
    ].filter(Boolean).join('\n');

    const submissionPayload: ContactFormData = {
      ...formData,
      selectedDate: selectedDateStr,
      selectedTimeSlot: selectedSlot
    };

    try {
      // 3. Send POST request using fetch() with mode: 'no-cors' and JSON stringified body
      await submitToGoogleScript({
        name: fullName,
        email: formData.email,
        message: fullMessage,
        phone: formData.phone,
        company: formData.companyName,
        service: formData.service,
        budget: formData.budget,
        date: selectedDateStr,
        timeSlot: selectedSlot
      });

      // 4. Also perform server appointment logging and workspace calendar integration
      const workspaceResult = await scheduleGoogleWorkspaceAppointment(submissionPayload);
      submissionPayload.workspaceStatus = workspaceResult;
    } catch (err) {
      console.error('Error during form submission processing:', err);
    } finally {
      setIsSubmitting(false);
      // 5. Automatically redirect the user to the existing thank you page
      onFormSubmitted(submissionPayload);
    }
  };

  return (
    <section id="contact" className="bg-[#9ce2c7] text-[#131d17] py-20 md:py-28 border-b border-[#8bd6ba]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading & Subtitle */}
        <div className="text-center space-y-3 mb-10">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">
            09 / Schedule Consultation
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#131d17] leading-tight">
            Ready to Build Your <span className="text-black">Marketing Automation System?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#1a2e24] max-w-2xl mx-auto leading-relaxed font-sans">
            Stop wasting hours on manual marketing busywork or disconnected campaigns. Book a free 1-on-1 strategy call today to discover how a custom marketing automation system can scale your leads and sales predictably.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-10 shadow-xl border border-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#131d17] mb-2">
                  First name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="Deon"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 placeholder-gray-400 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#131d17] mb-2">
                  Last name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Howard"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 placeholder-gray-400 transition-all outline-none"
                />
              </div>
            </div>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#131d17] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 placeholder-gray-400 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#131d17] mb-2">
                  Phone *
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-gray-600 flex items-center space-x-1">
                    <span>🇺🇸</span>
                    <span>+1</span>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 pl-14 pr-4 text-xs font-bold text-gray-900 placeholder-gray-400 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#131d17] mb-2">
                Company name
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Acme Growth Inc."
                value={formData.companyName}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 placeholder-gray-400 transition-all outline-none"
              />
            </div>

            {/* Dropdowns Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#131d17] mb-2">
                  What Solutions Are You Interested In?
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 transition-all cursor-pointer outline-none"
                >
                  <option value="Automated Conversion Funnels & Websites">Automated Conversion Funnels & Websites</option>
                  <option value="AI Customer Acquisition Systems">AI Customer Acquisition Systems</option>
                  <option value="AI Marketing Automation Tools">AI Marketing Automation Tools</option>
                  <option value="Predictive Attribution Systems">Predictive Attribution Systems</option>
                  <option value="Full End-to-End Marketing Automation System">Full End-to-End Marketing Automation System</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#131d17] mb-2">
                  What Is Your Monthly Growth Budget?
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 transition-all cursor-pointer outline-none"
                >
                  <option value="Under $2,500/mo">Under $2,500/mo</option>
                  <option value="$2,500 - $5,000/mo">$2,500 - $5,000/mo</option>
                  <option value="$5,000 - $10,000/mo">$5,000 - $10,000/mo</option>
                  <option value="$10,000+/mo">$10,000+/mo</option>
                </select>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#131d17] mb-2">
                Please describe your goals & current bottlenecks
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your current customer acquisition flow, manual time bottlenecks, and target revenue growth..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 placeholder-gray-400 transition-all resize-none font-sans outline-none"
              ></textarea>
            </div>

            {/* EMBEDDED CALENDAR SCHEDULER WIDGET */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-[#131d17] mb-4 flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-black" />
                <span>Book Your Strategy Call</span>
              </h3>

              <div className="bg-[#d6f5e8]/60 rounded-2xl p-6 border border-black/15 space-y-6">
                
                {/* Month Navigator Header */}
                <div className="flex items-center justify-between text-[#131d17]">
                  <button
                    type="button"
                    className="p-1 hover:bg-black/10 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-black" />
                  </button>
                  <span className="font-bold text-base">{currentMonth}</span>
                  <button
                    type="button"
                    className="p-1 hover:bg-black/10 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-black" />
                  </button>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 text-center text-xs font-bold uppercase tracking-wider text-black">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* Calendar Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold">
                  {/* Empty offsets */}
                  <span className="text-gray-400 py-2">2</span>
                  <span className="text-gray-400 py-2">3</span>
                  <span className="text-gray-400 py-2">4</span>
                  
                  {/* Days 5, 6, 7, 8... */}
                  {[5, 6, 7, 8].map((day) => {
                    const isSelected = selectedDay === day;
                    return (
                      <button
                        key={day}
                        type="button"
                        id={`calendar-day-${day}`}
                        onClick={() => setSelectedDay(day)}
                        className={`py-2 rounded-xl font-bold transition-all text-center cursor-pointer ${
                          isSelected
                            ? 'bg-black text-white shadow-md'
                            : 'hover:bg-black/10 text-[#131d17]'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Timezone and Online Meeting Notice */}
                <div className="text-xs text-gray-600 space-y-1 pt-2 border-t border-black/15">
                  <p className="font-bold uppercase tracking-wider text-[11px] text-black">Time zone: Eastern Daylight Time (EDT)</p>
                  <p className="text-gray-600 text-xs">Online meeting</p>
                </div>

                {/* Day Subheading */}
                <p className="text-xs font-bold uppercase tracking-widest text-[#131d17]">
                  Thursday, Aug {selectedDay}
                </p>

                {/* Available Time Slots Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        id={`form-slot-${slot.replace(/[:\s]/g, '-')}`}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md'
                            : 'bg-white text-gray-800 border-gray-200 hover:border-black'
                        }`}
                      >
                        <span>{slot}</span>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>

                {/* Show More Slots Toggle */}
                <div className="pt-1 text-left">
                  <button
                    type="button"
                    onClick={() => setShowMoreSlots(!showMoreSlots)}
                    className="text-xs font-bold uppercase tracking-widest text-black underline hover:text-gray-800 transition-colors"
                  >
                    {showMoreSlots ? 'Show fewer slots' : 'Show more slots'}
                  </button>
                </div>

              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                id="contact-form-submit-btn"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest text-xs py-4 px-10 rounded-full transition-all shadow-lg cursor-pointer border border-white/20 transform hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#9ce2c7]" />
                    <span>Booking Appointment & Syncing Calendar...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#9ce2c7]" />
                    <span>Confirm & Book Strategy Session</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

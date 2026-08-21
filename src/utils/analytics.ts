/**
 * Google Analytics 4 (GA4) & GTM DataLayer Event Tracking Utility
 * Measurement ID: G-F4HP53BG2Z
 */

import { PHONE_NUMBER, WHATSAPP_NUMBER } from '../data/contentData';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Safely dispatches a GA4 event through both window.gtag and window.dataLayer
 */
export const trackEvent = (
  eventName: string,
  eventParams: Record<string, any> = {}
): void => {
  if (typeof window === 'undefined') return;

  const payload = {
    ...eventParams,
    timestamp: new Date().toISOString(),
    page_location: window.location.href,
    page_path: window.location.pathname
  };

  // 1. Google Analytics 4 gtag() API
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, payload);
    } catch (err) {
      console.warn('GA4 gtag tracking warning:', err);
    }
  }

  // 2. Google Tag Manager / GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...payload
  });

  // 3. Helpful console logging for verification
  if (process.env.NODE_ENV !== 'production' || window.location.hostname === 'localhost') {
    console.log(`📊 [GA4 Track Event]: "${eventName}"`, payload);
  }
};

/**
 * =========================================================================
 * 1. CONTACT FORMS & LEAD GENERATION (Thank You Page & Funnel Submissions)
 * =========================================================================
 */
export interface LeadAnalyticsData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  website?: string;
  industry?: string;
  service?: string;
  budget?: string;
  currentRevenue?: string;
  revenueGoal90Day?: string;
  selectedDate?: string;
  selectedTimeSlot?: string;
  formName?: string;
}

/**
 * Tracks a completed lead submission from the Thank You page or direct booking confirmation.
 */
export const trackLeadSubmission = (data: LeadAnalyticsData): void => {
  const serviceName = data.service || 'Marketing Automation Consultation';
  const industryName = data.industry || 'General Business';
  const formName = data.formName || 'Strategy Session Booking Funnel';

  // Primary GA4 Conversion Event: generate_lead
  trackEvent('generate_lead', {
    currency: 'USD',
    value: 1.0,
    event_category: 'Lead Generation',
    event_label: serviceName,
    form_name: formName,
    service_type: serviceName,
    industry: industryName,
    budget_range: data.budget || 'Not specified',
    has_date_booked: Boolean(data.selectedDate),
    preferred_date: data.selectedDate || 'Pending',
    preferred_time: data.selectedTimeSlot || 'Pending'
  });

  // Custom Granular Event: contact_form_submission
  trackEvent('contact_form_submission', {
    form_id: 'lead_qualification_form',
    form_name: formName,
    lead_name: `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Anonymous Lead',
    has_email: Boolean(data.email),
    has_phone: Boolean(data.phone),
    has_website: Boolean(data.website),
    company: data.companyName || '',
    service_interested: serviceName,
    target_industry: industryName,
    ad_budget: data.budget || '',
    revenue_bracket: data.currentRevenue || ''
  });

  // Custom Event: strategy_session_booked
  if (data.selectedDate || data.selectedTimeSlot) {
    trackEvent('strategy_session_booked', {
      event_category: 'Appointments',
      booking_date: data.selectedDate,
      booking_time: data.selectedTimeSlot,
      service: serviceName
    });
  }

  // Optional Meta / Facebook Pixel sync if available
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', 'Lead', {
        content_name: serviceName,
        content_category: industryName,
        currency: 'USD',
        value: 1.0
      });
    } catch (e) {
      // safe fallback
    }
  }
};

/**
 * Tracks starting the multi-step qualification form (Step 1 completion)
 */
export const trackFormStepCompleted = (
  stepNumber: number,
  stepName: string,
  formName: string = 'Strategy Session Form'
): void => {
  trackEvent('form_step_completed', {
    step_number: stepNumber,
    step_name: stepName,
    form_name: formName
  });
};

/**
 * =========================================================================
 * 2. PHONE CALLS & DIALER INTERACTIONS
 * =========================================================================
 */
export type PhonePlacement = 
  | 'header'
  | 'mobile_drawer'
  | 'floating_control'
  | 'toast'
  | 'callout_banner'
  | 'contact_section'
  | 'booking_modal'
  | 'industry_page'
  | 'real_estate_page'
  | 'footer'
  | 'hero'
  | 'thank_you_page'
  | 'unknown';

/**
 * Tracks clicking the phone number to initiate a call or copy
 */
export const trackPhoneCall = (
  placement: PhonePlacement = 'unknown',
  customNumber: string = PHONE_NUMBER
): void => {
  // GA4 Recommended Contact Event
  trackEvent('contact', {
    method: 'phone',
    contact_type: 'phone_call',
    phone_number: customNumber,
    placement: placement
  });

  // Custom Event for Conversion Action Tracking
  trackEvent('click_phone_call', {
    event_category: 'Phone Interaction',
    event_label: `${placement} - ${customNumber}`,
    placement: placement,
    phone_number: customNumber
  });
};

/**
 * Tracks secondary phone actions (e.g. copying number, opening Google Voice, launching native dialer)
 */
export const trackPhoneAction = (
  action: 'dialer_launched' | 'number_copied' | 'google_voice_opened',
  placement: PhonePlacement = 'toast'
): void => {
  trackEvent('phone_action', {
    event_category: 'Phone Action',
    action_type: action,
    placement: placement,
    phone_number: PHONE_NUMBER
  });
};

/**
 * =========================================================================
 * 3. WHATSAPP MESSAGES & CHAT INITIATIONS
 * =========================================================================
 */
export type WhatsAppPlacement = 
  | 'header'
  | 'mobile_drawer'
  | 'floating_widget'
  | 'widget_quick_prompt'
  | 'widget_custom_input'
  | 'hero'
  | 'booking_modal'
  | 'contact_form_fallback'
  | 'industry_page'
  | 'real_estate_page'
  | 'thank_you_page'
  | 'footer'
  | 'unknown';

/**
 * Tracks opening WhatsApp chat
 */
export const trackWhatsAppChat = (
  placement: WhatsAppPlacement = 'unknown',
  message?: string,
  recipientNumber: string = WHATSAPP_NUMBER
): void => {
  const preview = (message || '').trim().substring(0, 100);

  // GA4 Recommended Contact Event
  trackEvent('contact', {
    method: 'whatsapp',
    contact_type: 'whatsapp_message',
    recipient_number: recipientNumber,
    placement: placement,
    message_preview: preview || 'Default Greeting'
  });

  // Custom Event for Direct Chat Conversion Action
  trackEvent('click_whatsapp_chat', {
    event_category: 'WhatsApp Interaction',
    event_label: `${placement}: ${preview || 'Chat'}`,
    placement: placement,
    recipient: recipientNumber,
    message_length: (message || '').length
  });
};

/**
 * Tracks selecting a pre-set Quick Prompt in the WhatsApp Widget
 */
export const trackWhatsAppPromptSelected = (
  promptId: string,
  promptLabel: string
): void => {
  trackEvent('whatsapp_prompt_selected', {
    prompt_id: promptId,
    prompt_label: promptLabel,
    placement: 'widget_quick_prompt'
  });
};

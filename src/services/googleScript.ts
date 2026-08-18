/**
 * Google Apps Script Webhook Submission Service
 * Sends contact form submissions and appointment bookings to the configured Google Apps Script Webhook.
 */

export const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzGtFLUzlrzd7ovTIleSE2wxCiRsWFq0pxQx7Ss_GxhrFObaZA_X5hxqJ4k-ukdqBNL-w/exec';

export interface FormSubmissionPayload {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  date?: string;
  timeSlot?: string;
  [key: string]: any;
}

/**
 * Sends a POST request to Google Apps Script endpoint using fetch with mode: 'no-cors'
 * and a JSON stringified body.
 */
export async function submitToGoogleScript(payload: FormSubmissionPayload): Promise<boolean> {
  const formattedBody = {
    name: payload.name || '',
    email: payload.email || '',
    message: payload.message || '',
    phone: payload.phone || '',
    company: payload.company || '',
    service: payload.service || '',
    budget: payload.budget || '',
    date: payload.date || '',
    timeSlot: payload.timeSlot || '',
    submittedAt: new Date().toISOString()
  };

  try {
    console.log('🚀 Sending lead to Google Apps Script Webhook:', formattedBody);
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedBody)
    });
    console.log('✅ Successfully dispatched payload to Google Apps Script');
    return true;
  } catch (error) {
    console.error('⚠️ Error dispatching to Google Apps Script:', error);
    // In no-cors mode, errors rarely throw unless network fails completely,
    // but we capture and gracefully allow workflow to proceed
    return false;
  }
}

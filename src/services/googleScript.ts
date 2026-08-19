/**
 * Google Apps Script Webhook Submission Service
 * Sends contact form submissions and appointment bookings to the configured Google Apps Script Webhook.
 */

export const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzGtFLUzlrzd7ovTIleSE2wxCiRsWFq0pxQx7Ss_GxhrFObaZA_X5hxqJ4k-ukdqBNL-w/exec';

export interface FormSubmissionPayload {
  name: string;
  firstName?: string;
  lastName?: string;
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
 * and application/x-www-form-urlencoded body with URLSearchParams.
 */
export async function submitToGoogleScript(payload: FormSubmissionPayload): Promise<boolean> {
  const formData = new URLSearchParams();
  formData.append('name', payload.name || '');
  if (payload.firstName) formData.append('first_name', payload.firstName);
  if (payload.lastName) formData.append('last_name', payload.lastName);
  formData.append('email', payload.email || '');
  formData.append('message', payload.message || '');
  
  if (payload.phone) formData.append('phone', payload.phone);
  if (payload.company) formData.append('company', payload.company);
  if (payload.service) formData.append('service', payload.service);
  if (payload.budget) formData.append('budget', payload.budget);
  if (payload.date) formData.append('date', payload.date);
  if (payload.timeSlot) formData.append('timeSlot', payload.timeSlot);
  formData.append('submittedAt', new Date().toISOString());

  try {
    console.log('🚀 Sending lead to Google Apps Script via URLSearchParams:', formData.toString());
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });
    console.log('✅ Successfully dispatched URLSearchParams payload to Google Apps Script');
    return true;
  } catch (error) {
    console.error('⚠️ Error dispatching to Google Apps Script:', error);
    return false;
  }
}


/**
 * Google Apps Script Webhook Submission Service
 * Sends contact form submissions and appointment bookings to the configured Google Apps Script Webhook.
 */

export const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyF7IRgvGgz5iZCGvPFwuD_gcos8BdAZFK6aI4Bfo99ZYM1AsKNLWVb37J_aijUthmYJQ/exec';

export interface FormSubmissionPayload {
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  message: string;
  projectDescription?: string;
  description?: string;
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
  const desc = payload.projectDescription || payload.description || payload.project_description || payload.projectDetails || payload.details || '';

  const formData = new URLSearchParams();
  formData.append('name', payload.name || '');
  if (payload.firstName) formData.append('first_name', payload.firstName);
  if (payload.lastName) formData.append('last_name', payload.lastName);
  formData.append('email', payload.email || '');
  
  // Ensure description is sent under all common key names that Google Apps Script might read
  if (desc) {
    formData.append('description', desc);
    formData.append('projectDescription', desc);
    formData.append('project_description', desc);
    formData.append('project_details', desc);
    formData.append('details', desc);
    formData.append('comments', desc);
    formData.append('notes', desc);
    formData.append('Project Description', desc);
    formData.append('Description', desc);
  }

  // Ensure message includes description text as well
  let messageText = payload.message || '';
  if (desc && !messageText.includes(desc)) {
    messageText = messageText ? `${messageText}\n\nProject Description & Goals:\n${desc}` : desc;
  }
  formData.append('message', messageText);
  
  if (payload.phone) formData.append('phone', payload.phone);
  if (payload.company) formData.append('company', payload.company);
  if (payload.service) formData.append('service', payload.service);
  if (payload.budget) formData.append('budget', payload.budget);
  if (payload.currentRevenue) formData.append('currentRevenue', payload.currentRevenue);
  if (payload.revenueGoal90Day) formData.append('revenueGoal90Day', payload.revenueGoal90Day);
  if (payload.date) formData.append('date', payload.date);
  if (payload.timeSlot) formData.append('timeSlot', payload.timeSlot);
  formData.append('submittedAt', new Date().toISOString());

  // Append any additional keys from payload
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== null && !formData.has(key)) {
      formData.append(key, String(value));
    }
  }

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


import { getAccessToken, getCurrentUser } from './auth';
import { ContactFormData } from '../types';

export const TARGET_ADMIN_EMAIL = 'deonhowardppc@gmail.com';

// Utility to encode unicode strings into base64url for Gmail API
function encodeBase64Url(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Convert human date & time slot into RFC3339 start and end Date strings
export function parseAppointmentDateTime(dateStr?: string, timeSlotStr?: string): { startISO: string; endISO: string; startFormatted: string } {
  const now = new Date();
  let targetYear = now.getFullYear();
  let targetMonth = now.getMonth(); // 0-indexed
  let targetDay = now.getDate() + 1;

  if (dateStr) {
    const parts = dateStr.replace(/,/g, '').split(' ');
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    if (parts.length >= 2) {
      const mIdx = months.findIndex(m => parts[0].toLowerCase().startsWith(m.slice(0, 3)));
      if (mIdx !== -1) targetMonth = mIdx;
      const dNum = parseInt(parts[1], 10);
      if (!isNaN(dNum)) targetDay = dNum;
      if (parts.length >= 3) {
        const yNum = parseInt(parts[2], 10);
        if (!isNaN(yNum)) targetYear = yNum;
      }
    }
  }

  // Parse start hour/minute from time slot e.g. "10:00 AM - 11:00 AM" or "10:00 AM"
  let startHour = 10;
  let startMinute = 0;
  let durationHours = 1;

  if (timeSlotStr) {
    const timeMatch = timeSlotStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (timeMatch) {
      let h = parseInt(timeMatch[1], 10);
      const m = parseInt(timeMatch[2], 10);
      const ampm = timeMatch[3].toUpperCase();
      if (ampm === 'PM' && h < 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      startHour = h;
      startMinute = m;
    }
  }

  const startDate = new Date(targetYear, targetMonth, targetDay, startHour, startMinute, 0);
  const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

  return {
    startISO: startDate.toISOString(),
    endISO: endDate.toISOString(),
    startFormatted: `${startDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at ${startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}`
  };
}

export interface WorkspaceScheduleResult {
  calendarCreated: boolean;
  calendarEventLink?: string;
  calendarEventId?: string;
  adminEmailSent: boolean;
  clientEmailSent: boolean;
  serverSaved: boolean;
  errorDetails?: string;
}

/**
 * Creates a Google Calendar Event and sends confirmation emails to deonhowardppc@gmail.com and client.
 */
export async function scheduleGoogleWorkspaceAppointment(
  data: ContactFormData
): Promise<WorkspaceScheduleResult> {
  const result: WorkspaceScheduleResult = {
    calendarCreated: false,
    adminEmailSent: false,
    clientEmailSent: false,
    serverSaved: false
  };

  const clientName = `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Prospective Client';
  const { startISO, endISO, startFormatted } = parseAppointmentDateTime(data.selectedDate, data.selectedTimeSlot);

  // 1. Submit lead details to our backend Express API for persistent logging & notifications
  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        clientName,
        targetAdminEmail: TARGET_ADMIN_EMAIL,
        startISO,
        endISO,
        startFormatted,
        submittedAt: new Date().toISOString()
      })
    });
    if (response.ok) {
      result.serverSaved = true;
    }
  } catch (err) {
    console.warn('Backend API notification status:', err);
  }

  const token = getAccessToken();

  // If token is available, interact with Google Calendar and Gmail APIs
  if (token) {
    // 2. Create Event on Google Calendar
    try {
      const calendarEventBody = {
        summary: `Strategy Session: ${clientName} (${data.companyName || data.industry || 'Business Growth'})`,
        description: `Strategy Consultation Details:\n\n` +
          `• Client Name: ${clientName}\n` +
          `• Email: ${data.email}\n` +
          `• Phone: ${data.phone}\n` +
          `• Website: ${data.website || 'N/A'}\n` +
          `• Industry / Market: ${data.industry || data.companyName || 'N/A'}\n` +
          (data.realEstateRole ? `• Real Estate Role: ${data.realEstateRole}\n` : '') +
          `• Current Revenue: ${data.currentRevenue || 'Not specified'}\n` +
          `• 90-Day Revenue Goal: ${data.revenueGoal90Day || 'Not specified'}\n` +
          `• Monthly Ad Budget: ${data.budget || 'Not specified'}\n` +
          `• Services Requested: ${data.service || 'Marketing Automation System'}\n` +
          `• Project Description / Strategic Goals:\n${data.projectDescription || data.description || (data as any).project_description || (data as any).details || data.message || 'No additional notes provided'}\n\n` +
          `Assigned Specialist: Deon Howard (${TARGET_ADMIN_EMAIL})\n` +
          `Meeting Format: Google Meet / Online Strategy Call`,
        start: {
          dateTime: startISO,
          timeZone: 'America/New_York'
        },
        end: {
          dateTime: endISO,
          timeZone: 'America/New_York'
        },
        attendees: [
          { email: TARGET_ADMIN_EMAIL, displayName: 'Deon Howard PPC', responseStatus: 'accepted' },
          { email: data.email, displayName: clientName }
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 }
          ]
        },
        conferenceData: {
          createRequest: {
            requestId: `meeting-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        }
      };

      const calRes = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(calendarEventBody)
      });

      if (calRes.ok) {
        const eventData = await calRes.json();
        result.calendarCreated = true;
        result.calendarEventId = eventData.id;
        result.calendarEventLink = eventData.htmlLink;
      } else {
        const calErr = await calRes.json();
        console.error('Google Calendar API Error:', calErr);
        result.errorDetails = calErr?.error?.message || 'Calendar creation failed';
      }
    } catch (err: any) {
      console.error('Failed to create Google Calendar event:', err);
      result.errorDetails = err?.message || 'Calendar request error';
    }

    // 3. Send Email to Admin (deonhowardppc@gmail.com) via Gmail API
    try {
      const adminEmailSubject = `🎯 New Strategy Call Booked: ${clientName} - ${data.companyName || data.industry || data.service}`;
      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #121212; padding: 24px; text-align: center;">
            <h1 style="color: #9ce2c7; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">Deon Howard PPC</h1>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">New Marketing Automation Consultation Request</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 18px;">Strategy Session Confirmed</h2>
            <p>A new consultation has been booked on your calendar with the following details:</p>
            
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 6px 0; font-weight: bold; width: 160px; color: #475569;">Client:</td><td style="color: #0f172a;">${clientName}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">Email:</td><td><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">Phone:</td><td style="color: #0f172a;">${data.phone}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">Website:</td><td style="color: #0f172a;">${data.website || 'Not provided'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">Industry / Market:</td><td style="color: #0f172a;">${data.industry || data.companyName || 'Not specified'}</td></tr>
                ${data.realEstateRole ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">Real Estate Role:</td><td style="color: #0f172a;">${data.realEstateRole}</td></tr>` : ''}
                <tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">Current Revenue:</td><td style="color: #0f172a; font-weight: bold;">${data.currentRevenue || 'Not specified'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">90-Day Revenue Goal:</td><td style="color: #0f172a; font-weight: bold;">${data.revenueGoal90Day || 'Not specified'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">Monthly Ad Budget:</td><td style="color: #0f172a; font-weight: bold;">${data.budget || 'Not specified'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">Services Requested:</td><td style="color: #0f172a; font-weight: bold;">${data.service || 'Automation Consultation'}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">Date & Time:</td><td style="color: #0f172a; font-weight: bold;">${startFormatted} (${data.selectedTimeSlot || '10:00 AM'})</td></tr>
              </table>
            </div>

            <div style="margin-top: 16px;">
              <h4 style="margin: 0 0 6px 0; color: #065f46; font-size: 13px; text-transform: uppercase; font-weight: bold;">Project Description & Strategic Goals:</h4>
              <div style="background-color: #f0fbf6; border: 1.5px solid #10b981; padding: 14px; border-radius: 8px; font-size: 14px; margin: 0; color: #1e293b; white-space: pre-wrap; font-weight: 500;">
                ${data.projectDescription || data.description || (data as any).project_description || (data as any).details || data.message || 'No additional project description provided.'}
              </div>
            </div>

            ${result.calendarEventLink ? `
              <div style="margin-top: 24px; text-align: center;">
                <a href="${result.calendarEventLink}" style="background-color: #121212; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 14px;">
                  Open Event in Google Calendar
                </a>
              </div>
            ` : ''}
          </div>
          <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
            Sent automatically by Deon Howard PPC Marketing Automation System.
          </div>
        </div>
      `;

      const rawEmailAdmin = [
        `To: ${TARGET_ADMIN_EMAIL}`,
        `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(adminEmailSubject)))}?=`,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        '',
        adminEmailHtml
      ].join('\r\n');

      const gmailAdminRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          raw: encodeBase64Url(rawEmailAdmin)
        })
      });

      if (gmailAdminRes.ok) {
        result.adminEmailSent = true;
      } else {
        const gmailErr = await gmailAdminRes.json();
        console.error('Gmail API Error (Admin Send):', gmailErr);
      }
    } catch (err) {
      console.error('Failed to send admin confirmation email:', err);
    }

    // 4. Send Confirmation Email to the Client (if different from admin)
    if (data.email && data.email.toLowerCase() !== TARGET_ADMIN_EMAIL.toLowerCase()) {
      try {
        const clientEmailSubject = `Your Marketing Automation Strategy Session with Deon Howard PPC`;
        const clientEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #121212; padding: 24px; text-align: center;">
              <h1 style="color: #9ce2c7; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">Deon Howard PPC</h1>
              <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">AI & Marketing Automation Advisory</p>
            </div>
            <div style="padding: 24px; background-color: #ffffff;">
              <h2 style="color: #0f172a; margin-top: 0; font-size: 18px;">Hi ${data.firstName || clientName},</h2>
              <p>Your strategy consultation has been reserved. Here is your meeting confirmation:</p>
              
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <p style="margin: 0 0 8px 0; font-size: 15px; font-weight: bold; color: #166534;">
                  📅 ${startFormatted}
                </p>
                <p style="margin: 0; font-size: 13px; color: #166534;">
                  <strong>Solution Focus:</strong> ${data.service || 'Marketing Automation System'}<br/>
                  <strong>Location:</strong> Online Video Call (Google Meet invitation has been added to your calendar)
                </p>
              </div>

              <p style="font-size: 14px; color: #475569;">
                During this session, we will review your current customer acquisition flow, diagnose bottlenecks, and map out a step-by-step roadmap to scale your business predictably.
              </p>

              <p style="font-size: 14px; color: #475569;">
                If you need to reschedule or have urgent questions beforehand, feel free to reply directly to this email or reach us at <a href="mailto:${TARGET_ADMIN_EMAIL}" style="color: #2563eb;">${TARGET_ADMIN_EMAIL}</a>.
              </p>

              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
                <p style="margin: 0; font-weight: bold; color: #0f172a;">Deon Howard</p>
                <p style="margin: 2px 0 0 0; font-size: 13px; color: #64748b;">Founder & Growth Architect • Deon Howard PPC</p>
              </div>
            </div>
          </div>
        `;

        const rawEmailClient = [
          `To: ${data.email}`,
          `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(clientEmailSubject)))}?=`,
          'MIME-Version: 1.0',
          'Content-Type: text/html; charset=UTF-8',
          '',
          clientEmailHtml
        ].join('\r\n');

        const gmailClientRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            raw: encodeBase64Url(rawEmailClient)
          })
        });

        if (gmailClientRes.ok) {
          result.clientEmailSent = true;
        }
      } catch (err) {
        console.error('Failed to send client confirmation email:', err);
      }
    }
  }

  return result;
}

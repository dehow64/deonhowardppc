import React from 'react';
import { WHATSAPP_RAW, WHATSAPP_NUMBER } from '../data/contentData';

/**
 * Builds a direct WhatsApp chat URL with an encoded message.
 */
export const buildWhatsAppUrl = (customMessage?: string): string => {
  const base = `https://wa.me/${WHATSAPP_RAW}`;
  if (!customMessage || !customMessage.trim()) {
    return base;
  }
  return `${base}?text=${encodeURIComponent(customMessage.trim())}`;
};

/**
 * Opens WhatsApp in a new tab or triggers the WhatsApp client.
 */
export const openWhatsAppChat = (message?: string, event?: React.MouseEvent): void => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const url = buildWhatsAppUrl(message || "Hi Deon, I'm interested in building a custom Marketing Automation System. Can we chat?");
  
  if (typeof window !== 'undefined') {
    // Open in a new tab safely
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Formats user form details into a structured, readable WhatsApp message.
 */
export const formatLeadToWhatsAppMessage = (data: {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  website?: string;
  industry?: string;
  services?: string[] | string;
  adBudget?: string;
  currentRevenue?: string;
  projectDescription?: string;
  selectedDate?: string;
  selectedTimeSlot?: string;
}): string => {
  const parts: string[] = [];

  parts.push("👋 *New Automation System Inquiry from Website*");
  parts.push("");

  const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
  if (fullName) parts.push(`👤 *Name:* ${fullName}`);
  if (data.companyName) parts.push(`🏢 *Company:* ${data.companyName}`);
  if (data.email) parts.push(`✉️ *Email:* ${data.email}`);
  if (data.phone) parts.push(`📞 *Phone:* ${data.phone}`);
  if (data.website) parts.push(`🌐 *Website:* ${data.website}`);
  if (data.industry) parts.push(`🏭 *Industry:* ${data.industry}`);

  if (data.services) {
    const srvText = Array.isArray(data.services) ? data.services.join(", ") : data.services;
    if (srvText) parts.push(`🛠️ *Services of Interest:* ${srvText}`);
  }

  if (data.adBudget) parts.push(`💰 *Monthly Ad Budget:* ${data.adBudget}`);
  if (data.currentRevenue) parts.push(`📈 *Current Revenue:* ${data.currentRevenue}`);

  if (data.selectedDate || data.selectedTimeSlot) {
    const dateStr = [data.selectedDate, data.selectedTimeSlot].filter(Boolean).join(" at ");
    parts.push(`📅 *Requested Call Slot:* ${dateStr}`);
  }

  if (data.projectDescription && data.projectDescription.trim()) {
    parts.push("");
    parts.push(`💬 *Project Details / Goals:*`);
    parts.push(data.projectDescription.trim());
  }

  parts.push("");
  parts.push("Please let me know your availability for a quick walkthrough. Thanks!");

  return parts.join("\n");
};

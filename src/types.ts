export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  platforms?: string[];
  description: string;
  iconName: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  image?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  result: string;
  summary?: string;
  image: string;
  pdfUrl?: string;
}

export interface BookingSlot {
  time: string;
  display: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website?: string;
  industry?: string;
  companyName: string;
  service: string;
  budget: string;
  currentRevenue?: string;
  revenueGoal90Day?: string;
  projectDescription?: string;
  description?: string;
  realEstateRole?: string;
  message: string;
  selectedDate?: string;
  selectedTimeSlot?: string;
  propertyType?: string;
  workspaceStatus?: {
    calendarCreated: boolean;
    calendarEventLink?: string;
    calendarEventId?: string;
    adminEmailSent: boolean;
    clientEmailSent: boolean;
    serverSaved: boolean;
    errorDetails?: string;
  };
}

declare global {
  interface Window {
    storedLeadData?: URLSearchParams;
  }
}

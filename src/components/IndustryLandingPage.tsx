import React, { useState, useEffect } from 'react';
import { AnimatedImage } from './AnimatedImage';
import { 
  Building, 
  Home, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Phone, 
  Calendar as CalendarIcon, 
  Search, 
  Video, 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  ArrowUpRight, 
  FileText, 
  CheckCircle, 
  Target, 
  AlertCircle, 
  Briefcase,
  DollarSign,
  ChevronLeft,
  Sparkles,
  ShoppingBag,
  Wrench,
  Scale,
  Stethoscope,
  GraduationCap,
  Plane,
  Dumbbell,
  Tag,
  Loader2,
  Send,
  Square,
  CheckSquare,
  Check,
  User,
  Mail,
  ExternalLink
} from 'lucide-react';
import { PHONE_NUMBER, PHONE_TEL, GOOGLE_CALENDAR_APPOINTMENT_URL, GOOGLE_CALENDAR_EMBED_URL, AI_SERVICE_OPTIONS } from '../data/contentData';
import { getUpcomingBookingDays, getTodayFormatted } from '../utils/dateUtils';
const TARGET_ADMIN_EMAIL = 'deonhowardppc@gmail.com';
import { IndustrySubNav } from './IndustrySubNav';
import { submitToGoogleScript } from '../services/googleScript';
import { scheduleGoogleWorkspaceAppointment } from '../services/googleWorkspace';
import { ContactFormData } from '../types';

interface IndustryConfig {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  heroImage: string;
  heroHeadline: string;
  heroSubheadline: string;
  painPointsTitle: string;
  painPoints: {
    title: string;
    description: string;
  }[];
  solutionTitle: string;
  solutionDescription: string;
  targetAudiencesTitle: string;
  targetAudiences: string[];
  reachesDetails: {
    title: string;
    subtitle: string;
    description: string;
    bullets: string[];
    icon: any;
  }[];
  digitalSolutions: {
    title: string;
    description: string;
    icon: any;
    tag?: string;
  }[];
  isEcommerce?: boolean;
  caseStudy: {
    title: string;
    subtitle: string;
    metrics: { label: string; value: string }[];
    problem: string;
    solution: string;
    result: string;
    image: string;
    pdfUrl?: string;
  };
}

const INDUSTRY_CONFIGS: Record<string, IndustryConfig> = {
  'retail': {
    id: 'retail',
    title: 'Retail & E-Commerce',
    subtitle: 'High-Converting Online Storefronts & Shopping Campaigns',
    badge: 'Specialized E-Commerce Client & Order Acquisition',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    heroHeadline: 'Stop Burning Ad Spend. Attract High-Intent Shoppers & Scale Your E-Commerce Store.',
    heroSubheadline: 'Scale your online store with an automated shopping acquisition system custom-engineered with Google Performance Max, Merchant Center feed optimization, and Meta Advantage+ Shopping.',
    painPointsTitle: 'Tired of High Marketplace Fees & Low Return on Ad Spend?',
    painPoints: [
      {
        title: 'Exorbitant Marketplace Fees',
        description: 'Giving up 15-30% of revenue to Amazon, Etsy, or third-party marketplaces on every sale.'
      },
      {
        title: 'High Cart Abandonment',
        description: 'Driving traffic to product pages that drop off without completing checkout.'
      },
      {
        title: 'iOS Tracking & Attribution Loss',
        description: 'Struggling to figure out which ad creatives and keywords are actually generating revenue.'
      },
      {
        title: 'Cutting Margins with Discounts',
        description: 'Relying constantly on price slashes and discount codes just to drive temporary order spikes.'
      }
    ],
    solutionTitle: 'Own Your Storefront Traffic & Maximize ROAS',
    solutionDescription: 'Deon Howard PPC builds an automated e-commerce growth engine with Google Merchant Center integration, Performance Max campaigns, Meta Advantage+ shopping ads, and high-speed checkout funnels to scale your order volume on autopilot.',
    targetAudiencesTitle: 'Who Your E-Commerce System Reaches',
    targetAudiences: ['D2C Online Shoppers', 'Repeat Brand Buyers', 'High-LTV Subscribers'],
    reachesDetails: [
      {
        title: 'Direct-to-Consumer (D2C) Retail',
        subtitle: 'Apparel, Beauty, Home Goods, Electronics & Accessories',
        description: 'Drive high-volume product sales directly on your branded website with optimized product feed syncs, Google Shopping, and automated Meta catalog ads.',
        bullets: [
          'Google Merchant Center feed setup & title optimization',
          'Meta Advantage+ Shopping Campaigns (ASC) with dynamic product retargeting',
          'High-speed mobile checkout optimization & 1-click buy triggers'
        ],
        icon: ShoppingBag
      },
      {
        title: 'E-Commerce Subscriptions & Repeat Orders',
        subtitle: 'Consumables, Subscriptions & Recurring Products',
        description: 'Turn one-time shoppers into repeat monthly subscribers with targeted subscription funnels and high-converting post-purchase email/SMS triggers.',
        bullets: [
          'Subscriber acquisition campaigns on Meta, TikTok & YouTube',
          'Custom landed cost & LTV modeling for ad profitability',
          'Dynamic cart recovery & subscription sign-up funnels'
        ],
        icon: Sparkles
      }
    ],
    isEcommerce: true,
    digitalSolutions: [
      {
        title: 'Google Performance Max (PMAX)',
        description: 'Find ready-to-buy shoppers across Google Search, Shopping, YouTube, Display & Gmail all in one AI-driven campaign.',
        icon: TrendingUp,
        tag: 'PMAX Core Engine'
      },
      {
        title: 'Google Merchant Center Feed Integration',
        description: 'Seamlessly sync and optimize your product XML feed, custom labels, and product titles for top placement in Google Shopping.',
        icon: Tag,
        tag: 'Merchant Center'
      },
      {
        title: 'Meta Advantage+ Shopping Campaigns',
        description: 'Leverage AI catalog retargeting and broad prospecting on Instagram & Facebook to convert browsers into buyers.',
        icon: Users,
        tag: 'Advantage+ Social'
      },
      {
        title: 'YouTube & TikTok Video Shopping Ads',
        description: 'Showcase authentic product unboxings and UGC video demos to engaged shoppers on YouTube and TikTok.',
        icon: Video,
        tag: 'Video Shopping'
      }
    ],
    caseStudy: {
      title: '340% Revenue Surge & 5.2x ROAS in Q4 Scale',
      subtitle: '+340% Revenue Growth on Google Merchant Center & Meta Advantage+ Shopping',
      metrics: [
        { label: 'Revenue Growth', value: '+340%' },
        { label: 'Return on Ad Spend', value: '5.2x ROAS' },
        { label: 'Acquisition Cost', value: '-42% CPA' }
      ],
      problem: 'The retailer was spending heavily on generic search terms and third-party marketplace listings, suffering from low profit margins, abandoned carts, and unoptimized product feeds.',
      solution: 'We cleaned up their Google Merchant Center XML feed, deployed Google Performance Max campaigns with negative keyword filters, and built Meta Advantage+ automated catalog ads with 1-click checkout pages.',
      result: 'Surged Q4 online sales by +340%, achieving a 5.2x ROAS while slashing customer acquisition costs by 42%.',
      pdfUrl: 'https://drive.google.com/file/d/1AcnsMX68yqDccZ66AUnKVggclR_FE5aA/view?usp=drive_link',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'fashion': {
    id: 'fashion',
    title: 'Fashion, Apparel & Beauty',
    subtitle: 'Visual Shopping Campaigns & High-Fashion E-Commerce Scale',
    badge: 'Specialized Fashion & Beauty Acquisition Engine',
    heroImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
    heroHeadline: 'Stop Wasting Ad Dollars on Low-Intent Clicks. Scale Your Fashion & Beauty Brand.',
    heroSubheadline: 'Attract trend-conscious buyers and repeat customers to your apparel and cosmetics line with automated visual ads, Advantage+ Shopping, and Google Merchant Center integration.',
    painPointsTitle: 'Struggling with Sky-High Ad Costs & Unprofitable Returns?',
    painPoints: [
      {
        title: 'High Product Return Rates',
        description: 'Shoppers buying without clear size/fit guidance leading to costly refunds.'
      },
      {
        title: 'iOS Tracking Disruption',
        description: 'Losing visibility into which creative drops generate profitable sales.'
      },
      {
        title: 'Relying on Price Slashes',
        description: 'Eroding brand prestige by constantly running heavy sales.'
      },
      {
        title: 'High Cost Per Acquisition',
        description: 'Paying more to acquire a fashion customer than their initial order value.'
      }
    ],
    solutionTitle: 'Build an Automated Apparel & Cosmetics Sales Machine',
    solutionDescription: 'Deon Howard PPC deploys high-impact visual creative testing, Google Merchant Center feed optimization, Advantage+ social ads, and instant 1-click store checkout to double your average order value and ROAS.',
    targetAudiencesTitle: 'Who Your Fashion System Reaches',
    targetAudiences: ['Apparel Shoppers', 'Beauty Enthusiasts', 'Boutique Buyers'],
    reachesDetails: [
      {
        title: 'Clothing, Shoes & Accessories',
        subtitle: 'Boutique Brands & Designer Wear',
        description: 'Drive direct order volume with high-resolution visual carousels, lookbooks, and Google Shopping feed optimization.',
        bullets: ['Google Merchant Center XML sync', 'Meta Advantage+ lookbook ads', 'UGC try-on video retargeting'],
        icon: Tag
      },
      {
        title: 'Cosmetics & Skincare Products',
        subtitle: 'Beauty, Haircare & Wellness',
        description: 'Turn first-time buyers into loyal repeat subscribers with video tutorials and targeted social shopping campaigns.',
        bullets: ['TikTok & Instagram UGC video ads', 'Custom product landing page UX', 'Automated restock retargeting'],
        icon: Sparkles
      }
    ],
    isEcommerce: true,
    digitalSolutions: [
      {
        title: 'Google Performance Max (PMAX)',
        description: 'Showcase your seasonal collections across Google Search, Shopping, and YouTube Video Shopping.',
        icon: TrendingUp,
        tag: 'Google PMAX'
      },
      {
        title: 'Google Merchant Center Integration',
        description: 'Optimize apparel attributes (color, size, material, gender) for top Google Shopping placement.',
        icon: Tag,
        tag: 'Merchant Feed'
      },
      {
        title: 'Meta Advantage+ Shopping (ASC)',
        description: 'Deploy AI-driven catalog carousels and lookbooks to convert high-fashion prospective buyers.',
        icon: Users,
        tag: 'Advantage+ Social'
      },
      {
        title: 'High-Speed Storefront UX',
        description: 'Custom mobile product page layouts engineered for instant 1-click checkout conversion.',
        icon: Layers,
        tag: 'Store UX'
      }
    ],
    caseStudy: {
      title: 'Apparel Brand Scales to 4.8x ROAS with Advantage+ & PMAX',
      subtitle: '$1.2M+ In Generated E-Commerce Sales with Meta Catalog & Google Shopping',
      metrics: [
        { label: 'Sales Generated', value: '$1.2M+' },
        { label: 'Ad Spend ROAS', value: '4.8x' },
        { label: 'Order Volume', value: '+280%' }
      ],
      problem: 'The boutique brand struggled with rising social media ad costs and iOS attribution loss, preventing them from scaling paid ads beyond $10,000 per month.',
      solution: 'We introduced user-generated video review ads on Meta Advantage+, dynamic product carousels, and optimized Google Shopping feeds to target ready-to-buy fashion shoppers.',
      result: 'Scaled total online store sales past $1.2M at a 4.8x ROAS, boosting overall order volume by 280%.',
      pdfUrl: 'https://drive.google.com/file/d/1AcnsMX68yqDccZ66AUnKVggclR_FE5aA/view?usp=drive_link',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'home-services': {
    id: 'home-services',
    title: 'Home Services',
    subtitle: 'Plumbing, HVAC, Electrical, Roofing & Remodeling',
    badge: 'Specialized Home Services Client Acquisition',
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
    heroHeadline: 'Fill Your Service Calendar. Land More High-Margin Home Jobs on Autopilot.',
    heroSubheadline: 'Stop buying shared leads from third-party platforms. Build an automated client acquisition system that puts local homeowners directly on your schedule.',
    painPointsTitle: 'Tired of Shared Leads & Low-Margin Jobs?',
    painPoints: [
      {
        title: 'Paying Lead Aggregators',
        description: 'Paying Angi, Thumbtack, or HomeAdvisor for recycled leads sent to 5 competitors.'
      },
      {
        title: 'Unserious Price-Shoppers',
        description: 'Spending hours on the phone giving free estimates to tire-kickers who ghost.'
      },
      {
        title: 'Seasonal Schedule Dips',
        description: 'Unpredictable booking volume with empty dispatch calendars during slow months.'
      },
      {
        title: 'High Cost Per Call',
        description: 'Wasting money on broad Google ads without local call tracking or negative keywords.'
      }
    ],
    solutionTitle: 'Own Your Local Market & Book High-Paying Jobs Directly',
    solutionDescription: 'Deon Howard PPC engineers targeted Google Search & Local Services Ads (LSA), high-converting landing pages, and automated instant call/SMS booking to fill your technicians\' calendars with exclusive jobs.',
    targetAudiencesTitle: 'Who Your Home Services System Reaches',
    targetAudiences: ['Homeowners', 'Property Managers', 'Commercial Facility Managers'],
    reachesDetails: [
      {
        title: 'Emergency Service Calls',
        subtitle: 'Plumbing, HVAC, Electrical & Roofing',
        description: 'Capture homeowners in immediate need with top-of-search emergency ads and 1-tap phone call triggers.',
        bullets: ['Google Local Services Ads (Google Guaranteed)', 'Call-Only Search Campaigns', 'Instant dispatch SMS automation'],
        icon: Wrench
      },
      {
        title: 'High-Ticket Renovations & Installs',
        subtitle: 'Roofing, Solar, Remodeling & Landscaping',
        description: 'Target high-income homeowners seeking major home upgrades with visual portfolio funnels and estimate schedulers.',
        bullets: ['High-intent local Google Search PPC', 'Before-and-after Meta video ads', 'Interactive estimate booking landing pages'],
        icon: Home
      }
    ],
    digitalSolutions: [
      {
        title: 'Google Local Services Ads (LSA)',
        description: 'Get the Google Guaranteed badge and appear at the absolute top of search results for local job requests.',
        icon: ShieldCheck,
        tag: 'Google Guaranteed'
      },
      {
        title: 'High-Intent Emergency PPC',
        description: 'Target urgent keywords (e.g., "emergency AC repair near me") to generate direct phone calls.',
        icon: Search,
        tag: 'High-Intent Search'
      },
      {
        title: 'Google Maps & Local Pack Ads',
        description: 'Dominate map results when local homeowners search for reliable home contractors.',
        icon: Target,
        tag: 'Maps Optimization'
      },
      {
        title: '24/7 Call & SMS Automation',
        description: 'Instantly follow up with online inquiries so no lead is lost to a faster competitor.',
        icon: Clock,
        tag: 'Instant Booking'
      }
    ],
    caseStudy: {
      title: 'Regional HVAC & Plumbing Company Scales 220% in Job Revenue',
      subtitle: '$38 Cost Per Qualified Job Lead with Google Guaranteed & High-Intent Search',
      metrics: [
        { label: 'Revenue Growth', value: '+220%' },
        { label: 'Cost Per Lead', value: '$38 CPL' },
        { label: 'Monthly Bookings', value: '240+' }
      ],
      problem: 'The contractor relied heavily on expensive lead brokers who sold the exact same customer inquiries to 5 competing companies simultaneously.',
      solution: 'We launched Google Local Services Ads (Google Guaranteed), high-intent emergency Search PPC campaigns, and automated 24/7 SMS callback booking.',
      result: 'Drove 240+ exclusive homeowner service bookings per month at $38 per lead, scaling total service revenue by 220%.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'legal-prof': {
    id: 'legal-prof',
    title: 'Legal & Professional Services',
    subtitle: 'High-Value Case Acquisition & Corporate Client Sourcing',
    badge: 'Specialized Legal & Professional Client Sourcing',
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
    heroHeadline: 'Stop Chasing Unqualified Leads. Attract High-Value Clients to Your Firm.',
    heroSubheadline: 'Attract premium corporate and private clients with an automated acquisition system custom-engineered for attorneys, consultants, accountants, and executive coaches.',
    painPointsTitle: 'Tired of Sky-High Legal CPCs & Wasted Intake Time?',
    painPoints: [
      {
        title: 'Sky-High Cost Per Click',
        description: 'Paying $150+ per click on broad legal keywords without converting callers.'
      },
      {
        title: 'Unqualified Consultation Requests',
        description: 'Intake staff wasting hours on individuals who cannot afford your retainer fees.'
      },
      {
        title: 'Unpredictable Referral Pipelines',
        description: 'Relying solely on word-of-mouth with no predictable month-over-month growth.'
      },
      {
        title: 'Outdated Firm Website',
        description: 'A slow or rigid website that fails to build immediate trust or capture leads.'
      }
    ],
    solutionTitle: 'Dominate High-Intent Client Inquiries in Your Region',
    solutionDescription: 'Deon Howard PPC engineers exact-match Google Search campaigns, confidential intake landing pages, and automated consultation scheduling to secure top-tier cases for your firm.',
    targetAudiencesTitle: 'Who Your Professional Services System Reaches',
    targetAudiences: ['Corporate Executives', 'High-Net-Worth Individuals', 'Business Owners'],
    reachesDetails: [
      {
        title: 'High-Value Legal Practice Areas',
        subtitle: 'Corporate Law, Personal Injury, Family & Commercial Law',
        description: 'Position your firm at the top of search when prospective clients urgently need elite legal representation.',
        bullets: ['Exact-match high-intent Google Search', 'Confidential intake forms with qualification filters', 'Direct 24/7 call tracking'],
        icon: Scale
      },
      {
        title: 'Consulting & Executive Coaching',
        subtitle: 'Management Consultants & B2B Advisors',
        description: 'Attract decision-makers seeking strategic growth or financial guidance with premium content funnels.',
        bullets: ['LinkedIn & Meta executive targeting', 'Case study & whitepaper landing pages', 'Confidential strategy call booking'],
        icon: Briefcase
      }
    ],
    digitalSolutions: [
      {
        title: 'Google Search High-Intent PPC',
        description: 'Target highly specific practice area keywords with negative filters to eliminate low-value clicks.',
        icon: Search,
        tag: 'Targeted Search'
      },
      {
        title: 'Confidential Intake Landing Pages',
        description: 'Clean, secure landing pages engineered to convert mobile and desktop visitors into scheduled intake calls.',
        icon: ShieldCheck,
        tag: 'Case Intake UX'
      },
      {
        title: 'LinkedIn Executive Prospecting',
        description: 'Target C-suite executives and business owners with targeted message and carousel ads.',
        icon: Users,
        tag: 'B2B LinkedIn'
      },
      {
        title: 'Call Tracking & Intake Analytics',
        description: 'Track every incoming consultation call to continuously optimize keyword bidding.',
        icon: Phone,
        tag: 'Intake Analytics'
      }
    ],
    caseStudy: {
      title: '310% ROI Boost & 185+ Monthly Leads for Corporate Legal Firm',
      subtitle: '$64 Cost Per Lead with 14.8% Intake Conversion Rate',
      metrics: [
        { label: 'Monthly Leads', value: '185+' },
        { label: 'Cost Per Lead', value: '$64 CPL' },
        { label: 'Conversion Rate', value: '14.8%' }
      ],
      problem: 'The law firm was burning thousands monthly on generic legal search ads, receiving calls from individuals seeking free advice or outside their practice area.',
      solution: 'We rebuilt their campaigns around high-intent exact-match search terms, added negative keyword filters, and launched localized confidential intake forms.',
      result: 'Generated 185+ qualified consultation requests per month at $64 per lead, driving a 310% boost in firm acquisition return.',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'medical': {
    id: 'medical',
    title: 'Medical Healthcare & Wellness',
    subtitle: 'Patient Acquisition & Clinic Appointment Growth',
    badge: 'Specialized Healthcare Patient Acquisition',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    heroHeadline: 'Fill Your Clinic Calendar. Attract Patients Seeking Specialized Medical Care.',
    heroSubheadline: 'Build a compliant, automated patient acquisition system that drives qualified appointment requests for your medical practice, dental clinic, or health specialty.',
    painPointsTitle: 'Tired of High Patient No-Shows & Directory Fees?',
    painPoints: [
      {
        title: 'High Appointment No-Show Rates',
        description: 'Patients booking without automated reminders or pre-appointment confirmation.'
      },
      {
        title: 'Insurance Directory Dependency',
        description: 'Relying solely on low-margin insurance portal listings for patient volume.'
      },
      {
        title: 'Strict HIPAA Compliance Worries',
        description: 'Uncertainty around advertising compliance and patient privacy regulations.'
      },
      {
        title: 'Low Online Practice Visibility',
        description: 'Losing elective procedure patients to competing clinics with better online presence.'
      }
    ],
    solutionTitle: 'Attract Elective & Specialized Care Patients Direct to Your Clinic',
    solutionDescription: 'Deon Howard PPC builds HIPAA-compliant Google Search campaigns, medical procedure landing pages, and seamless online appointment scheduling to keep your practice running at full capacity.',
    targetAudiencesTitle: 'Who Your Healthcare System Reaches',
    targetAudiences: ['Local Patients', 'Elective Surgery Seekers', 'Specialized Care Applicants'],
    reachesDetails: [
      {
        title: 'Elective & Cosmetic Procedures',
        subtitle: 'Dental Implants, Orthodontics, Aesthetics & Vision',
        description: 'Attract patients actively seeking high-margin elective procedures with visual treatment landing pages and consultation booking.',
        bullets: ['High-intent procedure Search campaigns', 'Patient transformation gallery pages', 'Confidential consultation scheduling'],
        icon: Stethoscope
      },
      {
        title: 'Specialty & Urgent Care Clinics',
        subtitle: 'Physicians, Physical Therapy & Mental Health',
        description: 'Drive immediate appointment bookings from local patients searching for specialized medical care in your community.',
        bullets: ['Google Local Pack & Maps PPC', 'HIPAA-compliant intake forms', 'Automated SMS appointment confirmations'],
        icon: HeartIcon
      }
    ],
    digitalSolutions: [
      {
        title: 'Google Search Procedure Ads',
        description: 'Target intent-driven searches for specific medical treatments and specialist procedures.',
        icon: Search,
        tag: 'Procedure Search'
      },
      {
        title: 'HIPAA-Compliant Patient Landing Pages',
        description: 'Patient-friendly mobile landing pages with transparent procedure guides and scheduling.',
        icon: ShieldCheck,
        tag: 'Compliant UX'
      },
      {
        title: 'Local Google Maps & Clinic Pack',
        description: 'Ensure your clinic appears prominently when nearby patients search for doctors.',
        icon: Target,
        tag: 'Local Clinic Pack'
      },
      {
        title: 'Automated SMS Appointment Reminders',
        description: 'Dramatically reduce no-shows with automated confirmation texts and directions.',
        icon: Clock,
        tag: 'No-Show Prevention'
      }
    ],
    caseStudy: {
      title: 'Specialty Medical Clinic Attracts 120+ New Patient Bookings/Mo',
      subtitle: '3.8x ROI on Elective Care & Specialist Consultations',
      metrics: [
        { label: 'New Patient Bookings', value: '120+/mo' },
        { label: 'Campaign ROI', value: '3.8x' },
        { label: 'No-Show Reduction', value: '-65%' }
      ],
      problem: 'The multi-physician clinic suffered from high appointment no-show rates and lost high-margin elective procedure patients to aggressive local competitors.',
      solution: 'We built HIPAA-compliant Google Search procedure campaigns, clear patient treatment landing pages, and automated SMS appointment reminder notifications.',
      result: 'Secured 120+ new patient consultations monthly, slashed no-show rates by 65%, and achieved a 3.8x overall campaign ROI.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'financial': {
    id: 'financial',
    title: 'Financial Services & Accounting',
    subtitle: 'Wealth Management, Business Tax & Corporate Sourcing',
    badge: 'Specialized Financial Client Acquisition',
    heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
    heroHeadline: 'Attract High-Net-Worth Clients & Business Accounts on Autopilot.',
    heroSubheadline: 'Build a compliant, high-converting digital acquisition system for accounting firms, wealth advisors, tax strategists, and business lenders.',
    painPointsTitle: 'Tired of Long Sales Cycles & Low Trust Online?',
    painPoints: [
      {
        title: 'Strict Ad Policy Compliance',
        description: 'Getting ad accounts flagged due to improper financial copy structure.'
      },
      {
        title: 'Long, Unpredictable Sales Cycles',
        description: 'Prospects taking months to decide on financial advisors or CPA services.'
      },
      {
        title: 'High Competition for Wealth Keywords',
        description: 'Paying high CPCs without capturing qualified financial assets.'
      },
      {
        title: 'Outdated Web Presence',
        description: 'Lack of interactive calculators or downloadable financial planning guides.'
      }
    ],
    solutionTitle: 'Acquire High-AUM & Corporate Financial Accounts',
    solutionDescription: 'Deon Howard PPC builds compliant Google Search and LinkedIn campaigns, lead magnet funnels (wealth guides, tax checklists), and automated consultation booking to fuel your firm\'s growth.',
    targetAudiencesTitle: 'Who Your Financial System Reaches',
    targetAudiences: ['High-Net-Worth Individuals', 'Business Owners', 'Tax Planning Applicants'],
    reachesDetails: [
      {
        title: 'Wealth Management & Financial Planning',
        subtitle: 'AUM Growth & Retirement Planning',
        description: 'Attract affluent individuals seeking wealth preservation, estate planning, and portfolio management.',
        bullets: ['Targeted Google Search for wealth keywords', 'Downloadable wealth guide lead funnels', 'Confidential consultation scheduling'],
        icon: DollarSign
      },
      {
        title: 'Accounting, CPA & Corporate Tax',
        subtitle: 'B2B Accounting & Business Financing',
        description: 'Source mid-market business clients needing annual audit, corporate tax, or CFO advisory services.',
        bullets: ['LinkedIn B2B decision-maker targeting', 'Tax strategy assessment landing pages', 'Automated meeting calendar sync'],
        icon: Briefcase
      }
    ],
    digitalSolutions: [
      {
        title: 'Google High-Intent Search',
        description: 'Capture active searches for financial advisory, CPA, and business financing solutions.',
        icon: Search,
        tag: 'Financial Search'
      },
      {
        title: 'LinkedIn B2B Executive Ads',
        description: 'Target CFOs, business owners, and corporate executives in your key target markets.',
        icon: Users,
        tag: 'LinkedIn B2B'
      },
      {
        title: 'Wealth Guide Lead Magnets',
        description: 'High-converting downloadable guides that pre-qualify high-net-worth prospects.',
        icon: FileText,
        tag: 'Lead Funnels'
      },
      {
        title: 'Confidential Call Booking UX',
        description: 'Seamless calendar scheduling that integrates directly with your CRM and advisors.',
        icon: CalendarIcon,
        tag: 'Meeting Sync'
      }
    ],
    caseStudy: {
      title: 'Wealth Management Firm Sourcing $14M+ In New AUM Pipeline',
      subtitle: '$92 Cost Per Consult with 6.1x ROAS on Advisory Services',
      metrics: [
        { label: 'New AUM Pipeline', value: '$14M+' },
        { label: 'Cost Per Consult', value: '$92' },
        { label: 'Campaign ROAS', value: '6.1x' }
      ],
      problem: 'The advisory practice faced long sales cycles and struggled to pre-qualify high-net-worth clients online while adhering to strict financial advertising policies.',
      solution: 'We deployed compliant Google Search campaigns targeting wealth planning keywords, combined with downloadable wealth guide lead magnets and direct CRM consultation booking.',
      result: 'Generated a $14M+ new AUM client pipeline at $92 per consultation with a 6.1x return on total marketing spend.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'education': {
    id: 'education',
    title: 'Education & Online Courses',
    subtitle: 'Student Enrollment & Course Sales Acquisition',
    badge: 'Specialized Student Enrollment Engine',
    heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    heroHeadline: 'Drive Student Enrollments & Scale Your Course Sales on Autopilot.',
    heroSubheadline: 'Attract qualified students, certification candidates, and course buyers with YouTube prospecting, Google Search enrollment ads, and high-converting syllabus funnels.',
    painPointsTitle: 'Tired of High Lead Drop-off & Expensive Inquiries?',
    painPoints: [
      {
        title: 'High Lead Form Abandonment',
        description: 'Prospects filling initial forms but dropping off before completing enrollment.'
      },
      {
        title: 'High Cost Per Student Acquisition',
        description: 'Ad costs eating into course margins without predictable student volume.'
      },
      {
        title: 'Competition from Big Institutions',
        description: 'Difficulty standing out against massive university marketing budgets.'
      },
      {
        title: 'Low Webinar/Trial Conversions',
        description: 'Free trial attendees failing to upgrade into paid certification programs.'
      }
    ],
    solutionTitle: 'Scale Student Intake & Course Revenue',
    solutionDescription: 'Deon Howard PPC creates targeted YouTube video campaigns, Google Search enrollment ads, syllabus preview landing pages, and automated email/SMS nurtures to maximize student enrollments.',
    targetAudiencesTitle: 'Who Your Education System Reaches',
    targetAudiences: ['Prospective Students', 'Career Changers', 'Corporate Skill Trainees'],
    reachesDetails: [
      {
        title: 'Certification & Professional Training',
        subtitle: 'Bootcamps, Tech, Trades & Business Courses',
        description: 'Attract ambitious career changers seeking recognized industry certifications and high-income skills.',
        bullets: ['YouTube video prospecting ads', 'Syllabus download & career outcome funnels', 'Automated enrollment advisor scheduling'],
        icon: GraduationCap
      },
      {
        title: 'Higher Education & Online Academies',
        subtitle: 'Degree Programs & Specialty Online Schools',
        description: 'Fill semester seats and online cohorts with targeted search and social campaigns.',
        bullets: ['Google Search course keywords', 'Meta visual campus/course previews', 'Instant application landing pages'],
        icon: Users
      }
    ],
    digitalSolutions: [
      {
        title: 'YouTube Video Prospecting Ads',
        description: 'Showcase student success stories and course previews to prospective learners on YouTube.',
        icon: Video,
        tag: 'YouTube Prospecting'
      },
      {
        title: 'Google Search Enrollment Ads',
        description: 'Capture active queries for specific courses, bootcamps, and degree programs.',
        icon: Search,
        tag: 'Enrollment Search'
      },
      {
        title: 'Syllabus & Career Guide Funnels',
        description: 'High-converting landing pages that offer free syllabus downloads in exchange for qualified lead info.',
        icon: FileText,
        tag: 'Syllabus Funnel'
      },
      {
        title: 'Automated SMS Nurture Cycles',
        description: 'Keep prospective students engaged with automated reminders and advisor call triggers.',
        icon: MessageSquare,
        tag: 'Enrollment Nurture'
      }
    ],
    caseStudy: {
      title: 'EdTech Academy Achieves 420% Student Enrollment Scale',
      subtitle: '$28 Cost Per Enrolled Student & 5.8x Campaign ROAS',
      metrics: [
        { label: 'Enrollment Increase', value: '+420%' },
        { label: 'Cost Per Enrolled', value: '$28' },
        { label: 'Campaign ROAS', value: '5.8x' }
      ],
      problem: 'High lead form drop-off rates and rising ad costs left course cohorts half-empty, making paid campaigns unprofitable.',
      solution: 'We launched YouTube video story ads showing student outcomes, Google Search course enrollment campaigns, and instant syllabus preview download pages.',
      result: 'Boosted total student enrollments by 420% at a low $28 acquisition cost per student and a 5.8x campaign ROAS.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'travel': {
    id: 'travel',
    title: 'Travel & Tourism',
    subtitle: 'Resorts, Tour Operators, Airlines & Local Experiences',
    badge: 'Specialized Travel & Hospitality Direct Bookings',
    heroImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80',
    heroHeadline: 'Book More Travelers & Guests Directly to Your Resort & Experience.',
    heroSubheadline: 'Eliminate 20-30% OTA commission fees. Build an automated direct booking system with Google Travel Ads, Meta visual destination campaigns, and instant booking funnels.',
    painPointsTitle: 'Tired of Paying Massive 3rd-Party OTA Commissions?',
    painPoints: [
      {
        title: 'Paying 20-30% OTA Commissions',
        description: 'Giving up huge profits to Expedia, Booking.com, or TripAdvisor on every reservation.'
      },
      {
        title: 'Unpredictable Seasonal Dips',
        description: 'Vacancy rates spiking during off-peak travel months without direct marketing control.'
      },
      {
        title: 'Low Website Conversion Rates',
        description: 'Travelers browsing your site but booking through third-party agents instead.'
      },
      {
        title: 'Wasted Ad Spend on Window Shoppers',
        description: 'Paying for clicks from users who aren\'t ready to travel or book.'
      }
    ],
    solutionTitle: 'Own Your Direct Reservations & Maximise Occupancy',
    solutionDescription: 'Deon Howard PPC creates high-impact Meta video destination campaigns, Google Hotel & Travel Search ads, and streamlined direct booking engines to fill your rooms and tours year-round.',
    targetAudiencesTitle: 'Who Your Travel System Reaches',
    targetAudiences: ['Vacationing Families', 'Luxury Travelers', 'Corporate Event Planners'],
    reachesDetails: [
      {
        title: 'Hotels, Resorts & Luxury Stays',
        subtitle: 'Boutique Hotels, Resorts & Villa Rentals',
        description: 'Drive direct reservations on your branded site and keep 100% of room revenue.',
        bullets: ['Google Hotel & Travel Search PPC', 'Meta visual luxury stay carousels', 'Direct booking engine UX'],
        icon: Plane
      },
      {
        title: 'Tours, Excursions & Local Tourism',
        subtitle: 'Guided Tours, Adventure Sports & Activities',
        description: 'Capture travelers actively planning activities in your destination with high-converting booking funnels.',
        bullets: ['YouTube destination video ads', 'Geofenced mobile tourist ads', 'Instant mobile ticket purchase'],
        icon: Target
      }
    ],
    digitalSolutions: [
      {
        title: 'Google Travel & Hotel Search Ads',
        description: 'Appear at the top of search when travelers search for lodging and tours in your region.',
        icon: Search,
        tag: 'Google Travel'
      },
      {
        title: 'Meta Destination Video Campaigns',
        description: 'Inspire travelers on Instagram and Facebook with stunning video carousels of your resort or tours.',
        icon: Video,
        tag: 'Visual Meta'
      },
      {
        title: 'Direct Booking Engine Landing UX',
        description: 'Custom mobile landing pages integrated directly with your reservation PMS software.',
        icon: ShieldCheck,
        tag: 'Direct Booking'
      },
      {
        title: 'Automated Guest Nurture & Upsells',
        description: 'Automated email and SMS sequences offering package upgrades, spa sessions, and dining extensions.',
        icon: Clock,
        tag: 'Guest Upsells'
      }
    ],
    caseStudy: {
      title: 'Luxury Resort & Tour Operator Drives 280% Direct Booking Growth',
      subtitle: '6.4x Direct ROAS with $0 Paid in OTA Commissions',
      metrics: [
        { label: 'Direct Bookings', value: '+280%' },
        { label: 'Direct Booking ROAS', value: '6.4x' },
        { label: 'OTA Commission Saved', value: '100%' }
      ],
      problem: 'The resort was losing 25% of room margins to third-party booking sites (OTAs) and struggling with low occupancy during shoulder seasons.',
      solution: 'We deployed Google Travel Search ads, Meta visual destination video carousels, and a direct booking funnel on their branded website.',
      result: 'Increased direct reservations by 280% at a 6.4x direct ROAS, saving over $100K+ in third-party OTA commission fees.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'
    }
  },
  'fitness': {
    id: 'fitness',
    title: 'Sports, Fitness & Wellness',
    subtitle: 'Gym Memberships, Personal Training & Wellness Coaching',
    badge: 'Specialized Fitness & Wellness Acquisition Engine',
    heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    heroHeadline: 'Pack Your Gym & Personal Training Programs with Dedicated Members.',
    heroSubheadline: 'Attract local fitness enthusiasts and high-ticket coaching clients with automated Meta video ads, Google Local Search, and free trial claim funnels.',
    painPointsTitle: 'Tired of High Churn & Empty Class Slots?',
    painPoints: [
      {
        title: 'High Monthly Member Churn',
        description: 'Losing members faster than you can replace them without a consistent acquisition pipeline.'
      },
      {
        title: 'Low Trial-to-Paid Conversions',
        description: 'People claiming free day passes but failing to sign up for long-term memberships.'
      },
      {
        title: 'Unpredictable Off-Peak Seasons',
        description: 'Relying only on January resolutions and struggling during summer months.'
      },
      {
        title: 'Wasted Ad Dollars on Broad Social Clicks',
        description: 'Generating cheap social likes that never result in actual gym foot traffic.'
      }
    ],
    solutionTitle: 'Build a High-Retention Fitness Acquisition Engine',
    solutionDescription: 'Deon Howard PPC engineers local geofenced Meta ads, Google Local Search campaigns, 1-click free pass landing pages, and instant SMS follow-ups to fill your facility with long-term members.',
    targetAudiencesTitle: 'Who Your Fitness System Reaches',
    targetAudiences: ['Local Gym Goers', 'Personal Training Clients', 'Wellness Enthusiasts'],
    reachesDetails: [
      {
        title: 'Boutique Gyms & Fitness Centers',
        subtitle: 'CrossFit, Pilates, Martial Arts & Boxing',
        description: 'Fill class rosters with local fitness enthusiasts seeking high-energy community workouts.',
        bullets: ['Local geofenced Meta video ads', '1-click free trial pass landing pages', 'Automated SMS class reminders'],
        icon: Dumbbell
      },
      {
        title: 'Personal Trainers & Wellness Coaches',
        subtitle: 'High-Ticket Transformation Programs',
        description: 'Attract committed clients willing to invest in 1-on-1 personal training and nutrition packages.',
        bullets: ['Transformation case study carousels', 'Client qualification application forms', 'Direct strategy call calendar booking'],
        icon: Sparkles
      }
    ],
    digitalSolutions: [
      {
        title: 'Local Geofenced Meta Ads',
        description: 'Target active adults within a 5-mile radius of your gym with high-impact video ads.',
        icon: Target,
        tag: 'Local Geofencing'
      },
      {
        title: 'Google Search Fitness PPC',
        description: 'Dominate searches for "gym near me", "personal trainer", or specialized fitness classes.',
        icon: Search,
        tag: 'Local Search'
      },
      {
        title: '1-Click Free Pass Claim Pages',
        description: 'High-speed landing pages engineered to convert mobile visitors into scheduled pass holders.',
        icon: Layers,
        tag: 'Pass Claim UX'
      },
      {
        title: 'Automated SMS Follow-Up System',
        description: 'Instantly text trial claimants to schedule their first workout before they lose motivation.',
        icon: Clock,
        tag: 'SMS Follow-Up'
      }
    ],
    caseStudy: {
      title: 'Boutique Fitness Studio Signs 350+ New Memberships',
      subtitle: '4.9x Ad Spend ROAS with 68% Trial Conversion Rate',
      metrics: [
        { label: 'New Memberships', value: '350+' },
        { label: 'Campaign ROAS', value: '4.9x' },
        { label: 'Trial Conversion', value: '68%' }
      ],
      problem: 'High monthly member turnover and low pass-claim conversion rates left group fitness classes half-empty.',
      solution: 'We ran localized geofenced Meta video ads, 1-click trial pass claim landing pages, and instant automated SMS follow-up triggers.',
      result: 'Signed 350+ new long-term memberships with a 68% trial conversion rate and a 4.9x campaign return on ad spend.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80'
    }
  }
};

// Simple Fallback Icon Component for Heart
function HeartIcon(props: any) {
  return <Sparkles {...props} />;
}

interface IndustryLandingPageProps {
  industryId: string;
  onBackToMain: () => void;
  onBookClick: () => void;
  onFormSubmitted: (data: any) => void;
  onSelectIndustry?: (industryId: string) => void;
}

export const IndustryLandingPage: React.FC<IndustryLandingPageProps> = ({
  industryId,
  onBackToMain,
  onBookClick,
  onFormSubmitted,
  onSelectIndustry
}) => {
  // Select config or fallback to retail
  const config = INDUSTRY_CONFIGS[industryId] || INDUSTRY_CONFIGS['retail'];

  // 2-Step Form & Calendar State
  const [indStep, setIndStep] = useState<1 | 2>(1);
  const [indForm, setIndForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    industry: config.title,
    currentRevenue: '$10k - $25k / mo',
    revenueGoal: '$25k - $50k',
    adBudget: '$1.5k - $5k',
    services: [
      'Automated Conversion Funnels (AI Websites & Landing Pages)',
      'AI Customer Acquisition Systems (Google & Meta Paid Ads)'
    ] as string[],
    projectDescription: ''
  });

  const upcomingBookingDays = getUpcomingBookingDays(5);
  const defaultBookingDay = upcomingBookingDays[0]?.formatted || getTodayFormatted();
  const [selectedBookingDate, setSelectedBookingDate] = useState<string>(defaultBookingDay);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM - 11:00 AM (EDT)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedLeadData, setSavedLeadData] = useState<ContactFormData | null>(null);

  // Listen for Google Calendar appointment completions
  useEffect(() => {
    const handleCalendarMessage = (e: MessageEvent) => {
      try {
        if (e.origin && (e.origin.includes('calendar.google.com') || e.origin.includes('calendar.app.google'))) {
          console.log('📅 Industry Google Calendar appointment scheduled event received:', e.data);
          if (onFormSubmitted && savedLeadData) {
            onFormSubmitted(savedLeadData);
          } else {
            window.location.href = '/thank-you';
          }
        }
      } catch (err) {
        console.warn('Error evaluating calendar event message:', err);
      }
    };

    window.addEventListener('message', handleCalendarMessage);
    return () => window.removeEventListener('message', handleCalendarMessage);
  }, [onFormSubmitted, savedLeadData]);

  const indServiceOptions = AI_SERVICE_OPTIONS;

  const handleToggleIndService = (label: string) => {
    if (indForm.services.includes(label)) {
      setIndForm({ ...indForm, services: indForm.services.filter(s => s !== label) });
    } else {
      setIndForm({ ...indForm, services: [...indForm.services, label] });
    }
  };

  const allIndServicesSelected = indServiceOptions.every(s => indForm.services.includes(s.label));

  const handleToggleAllIndServices = () => {
    if (allIndServicesSelected) {
      setIndForm({ ...indForm, services: [] });
    } else {
      setIndForm({ ...indForm, services: indServiceOptions.map(s => s.label) });
    }
  };

  const handleSubmitStep1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = (e.target as HTMLElement).closest('form') || (e.currentTarget as HTMLFormElement);
    const formData = new FormData(formElement);
    const dataObj: Record<string, any> = {};

    // 1. FIX CHECKBOXES ("services"):
    // Collect all checked checkboxes as a comma-separated list
    const checkedServices = Array.from(
      formElement.querySelectorAll('input[name="services"]:checked, input[type="checkbox"]:checked')
    ).map((cb: any) => cb.value).filter((val: string) => val && val !== 'on');

    // 2. Extract standard fields
    for (const [key, value] of formData.entries()) {
      if (key !== 'services') {
        dataObj[key] = value;
      }
    }

    // Attach all checked services as a combined string
    dataObj['services'] = checkedServices.length > 0 
      ? checkedServices.join(', ') 
      : (formData.get('services') || (indForm.services.length > 0 ? indForm.services.join(', ') : 'None selected'));

    const firstNameTrim = indForm.firstName.trim();
    const lastNameTrim = indForm.lastName.trim();
    const fullName = `${firstNameTrim} ${lastNameTrim}`.trim() || `${config.title} Client`;

    if (!firstNameTrim || !indForm.email.trim()) {
      return;
    }

    const serviceName = `Industry Acquisition (${indForm.industry || config.title})`;

    const projectDesc = (indForm.projectDescription || (formData.get('projectDescription') as string) || (formData.get('message') as string) || '').trim();

    const fullMessage = [
      `Industry: ${indForm.industry || config.title}`,
      `Current Revenue: ${indForm.currentRevenue}`,
      `90-Day Goal: ${indForm.revenueGoal}`,
      `Ad Budget: ${indForm.adBudget}`,
      `Services: ${dataObj['services']}`,
      projectDesc ? `Project Details / Description:\n${projectDesc}` : ''
    ].filter(Boolean).join('\n\n');

    // Package the complete form payload reliably
    const formPayload = {
      formType: config.title || 'Industry Consultation',
      name: (formData.get('name') as string) || fullName,
      email: (formData.get('email') as string) || indForm.email.trim(),
      phone: (formData.get('phone') as string) || indForm.phone.trim() || PHONE_NUMBER,
      website: (formData.get('website') as string) || '',
      industry: (formData.get('industry') as string) || indForm.industry || config.title,
      currentRevenue: indForm.currentRevenue || (formData.get('currentRevenue') as string),
      revenueGoal90Day: indForm.revenueGoal || (formData.get('revenueGoal90Day') as string) || (formData.get('revenueGoal') as string),
      adBudget: indForm.adBudget || (formData.get('adBudget') as string),
      services: dataObj['services'] || (indForm.services.length > 0 ? indForm.services.join(', ') : 'None selected'),
      projectDescription: projectDesc || 'No additional details provided',
      description: projectDesc || 'No additional details provided',
      project_description: projectDesc || 'No details provided',
      projectDetails: projectDesc,
      project_details: projectDesc,
      details: projectDesc,
      comments: projectDesc,
      notes: projectDesc,
      'Project Description': projectDesc,
      'Description': projectDesc,
      // backward-compatible & webhook mapping keys
      ...dataObj,
      first_name: firstNameTrim,
      last_name: lastNameTrim,
      current_revenue: indForm.currentRevenue || (formData.get('currentRevenue') as string),
      revenue_goal_90day: indForm.revenueGoal || (formData.get('revenueGoal90Day') as string) || (formData.get('revenueGoal') as string),
      monthly_ad_budget: indForm.adBudget || (formData.get('adBudget') as string),
      services_interested: dataObj['services'],
      message: fullMessage,
      submitted_at: new Date().toISOString()
    };

    sessionStorage.setItem('pendingLeadData', JSON.stringify(formPayload));

    const submissionPayload: ContactFormData = {
      firstName: firstNameTrim,
      lastName: lastNameTrim,
      email: indForm.email,
      phone: indForm.phone || PHONE_NUMBER,
      companyName: indForm.industry || config.title,
      service: typeof dataObj['services'] === 'string' ? dataObj['services'] : serviceName,
      budget: indForm.adBudget,
      projectDescription: projectDesc,
      description: projectDesc,
      message: fullMessage,
      selectedDate: selectedBookingDate,
      selectedTimeSlot: selectedSlot
    };

    setSavedLeadData(submissionPayload);

    // Smoothly transition to STEP 2 (Embedded Calendar) without making any network requests yet
    setIndStep(2);
    const ctaEl = document.getElementById('ind-cta');
    if (ctaEl) {
      ctaEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // STEP 2: LISTEN FOR GOOGLE CALENDAR APPOINTMENT COMPLETION
  useEffect(() => {
    const handleCalendarMessage = (e: MessageEvent) => {
      if (e.origin && (e.origin.includes('calendar.google.com') || e.origin.includes('calendar.app.google'))) {
        window.location.href = '/thank-you';
      }
    };

    window.addEventListener('message', handleCalendarMessage);
    return () => {
      window.removeEventListener('message', handleCalendarMessage);
    };
  }, []);

  const handleFinalizeIndBooking = (dateOverride?: string, slotOverride?: string) => {
    setIsSubmitting(true);
    const chosenDate = dateOverride || selectedBookingDate;
    const chosenSlot = slotOverride || selectedSlot;

    try {
      const existing = sessionStorage.getItem('pendingLeadData');
      const obj = existing ? JSON.parse(existing) : {};
      obj.selectedDate = chosenDate;
      obj.selectedTimeSlot = chosenSlot;
      sessionStorage.setItem('pendingLeadData', JSON.stringify(obj));
    } catch (e) {
      console.warn('Industry session write note:', e);
    }

    if (onFormSubmitted && savedLeadData) {
      onFormSubmitted({
        ...savedLeadData,
        selectedDate: chosenDate,
        selectedTimeSlot: chosenSlot
      });
    } else {
      window.location.href = '/thank-you';
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-[#9ce2c7] selection:text-black">
      
      {/* Top sticky header bar */}
      <header className="sticky top-0 z-40 bg-[#121212]/90 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToMain}
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#9ce2c7] transition-colors py-2 px-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10"
              id="ind-back-to-main-btn"
            >
              <ChevronLeft className="w-4 h-4 text-[#9ce2c7]" />
              <span>Main Site</span>
            </button>

            <a 
              href="#ind-hero" 
              className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center space-x-1"
            >
              <span>DEON HOWARD</span>
              <span className="text-[#9ce2c7] font-normal mx-1">/</span>
              <span className="font-bold text-base tracking-normal text-[#9ce2c7] uppercase">{config.title} PPC</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={PHONE_TEL}
              id="ind-header-phone-link"
              title={`Call ${PHONE_NUMBER}`}
              className="hidden md:flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#9ce2c7] transition-colors px-3 py-2 rounded-full hover:bg-white/5 active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-[#9ce2c7]" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <button
              onClick={onBookClick}
              id="ind-header-book-btn"
              className="bg-[#9ce2c7] hover:bg-[#8bd6ba] text-black font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-200 shadow-md flex items-center space-x-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Book Strategy Call</span>
            </button>
          </div>
        </div>
      </header>

      {/* Industry SubNav & URL Path Bar */}
      <IndustrySubNav
        currentIndustryId={industryId}
        onBackToMain={onBackToMain}
        onSelectIndustry={onSelectIndustry}
      />

      {/* SECTION 1: HERO SECTION */}
      <section id="ind-hero" className="relative py-20 lg:py-28 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#9ce2c7]/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9ce2c7]/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 text-[#9ce2c7] border border-[#9ce2c7]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-[#9ce2c7]" />
                <span>{config.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                {config.heroHeadline}
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 font-sans leading-relaxed max-w-2xl">
                {config.heroSubheadline}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <button
                  onClick={onBookClick}
                  id="ind-hero-book-call-btn"
                  className="bg-[#9ce2c7] hover:bg-[#8bd6ba] text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Book Free Strategy Call</span>
                </button>

                <a
                  href="#ind-solutions"
                  className="bg-white/10 hover:bg-white/15 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full border border-white/20 transition-all text-center"
                >
                  Explore Solutions
                </a>
              </div>

              {/* Verified Trust Tags */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-2xl font-extrabold text-[#9ce2c7]">10x+</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Target Pipeline ROI</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">0%</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Shared Lead Waste</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#9ce2c7]">100%</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Direct Exclusive Funnels</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a]">
                <AnimatedImage
                  src={config.heroImage}
                  alt={config.title}
                  className="w-full h-[420px] object-cover opacity-85"
                  wrapperClassName="w-full h-[420px]"
                  scale={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent pointer-events-none"></div>

                <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#121212]/90 backdrop-blur-md rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-300">
                    <span className="flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-[#9ce2c7]" />
                      <span>Automated Acquisition System</span>
                    </span>
                    <span className="bg-[#9ce2c7]/20 text-[#9ce2c7] px-2.5 py-0.5 rounded-full text-[10px] uppercase font-extrabold">Live</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    Direct High-Intent Inquiries & Orders Generated
                  </p>
                  <div className="flex items-center space-x-4 text-xs font-semibold text-gray-300 pt-1 border-t border-white/10">
                    <span className="text-[#9ce2c7] font-bold">✓ Continuous PPC Optimization</span>
                    <span>• No Broker Fees</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: PAIN POINTS & DEON HOWARD SOLUTION */}
      <section className="py-20 bg-[#181818] border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
              {config.title} Reality Check
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {config.painPointsTitle}
            </h2>
            <p className="text-base text-gray-300 font-sans leading-relaxed">
              Whether you are launching your first campaigns or scaling an established business, relying on outdated channels burns ad capital and stalls growth.
            </p>
          </div>

          {/* 4 Major Pain Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {config.painPoints.map((pt, idx) => (
              <div key={idx} className="bg-[#121212] p-6 rounded-2xl border border-rose-500/20 space-y-3 hover:border-rose-500/50 transition-colors">
                <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl w-fit">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{pt.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {pt.description}
                </p>
              </div>
            ))}
          </div>

          {/* Deon Howard Solution Banner */}
          <div className="bg-[#9ce2c7] text-[#121212] p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-black/10 text-black px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>The Deon Howard PPC Solution</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight text-[#121212]">
                {config.solutionTitle}
              </h3>
              <p className="text-sm sm:text-base text-[#1a2e24] font-medium leading-relaxed">
                {config.solutionDescription}
              </p>
            </div>

            <button
              onClick={onBookClick}
              className="bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer shrink-0 border border-white/20 transform hover:-translate-y-0.5"
            >
              Build My Client Engine
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 2-B & 3: WHO IT REACHES & DUAL PILLARS */}
      <section className="py-20 md:py-28 border-b border-white/10 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
              Audience Targeting
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {config.targetAudiencesTitle}
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {config.targetAudiences.map((aud, idx) => (
                <div key={idx} className="bg-[#1a1a1a] border border-[#9ce2c7]/40 px-6 py-3 rounded-2xl flex items-center space-x-3 text-white font-bold text-sm shadow-md">
                  <Users className="w-5 h-5 text-[#9ce2c7]" />
                  <span>{aud}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dual Pillar Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {config.reachesDetails.map((item, idx) => {
              const IconComp = item.icon || Sparkles;
              return (
                <div key={idx} className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 space-y-6 hover:border-[#9ce2c7]/50 transition-all">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-[#9ce2c7]/10 text-[#9ce2c7] rounded-2xl border border-[#9ce2c7]/20">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        <p className="text-xs text-[#9ce2c7] font-semibold">{item.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 font-sans leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="space-y-3 text-xs font-medium text-gray-300">
                    {item.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#9ce2c7] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 4: DIGITAL MARKETING SOLUTIONS AVAILABLE */}
      <section id="ind-solutions" className="py-20 md:py-28 bg-[#181818] border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
              End-to-End Digital Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Digital Marketing Solutions
            </h2>
            <p className="text-base text-gray-300 font-sans">
              We provide digital marketing solutions that help you find your best leads and customers on autopilot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.digitalSolutions.map((sol, idx) => {
              const IconComp = sol.icon || Search;
              return (
                <div key={idx} className="bg-[#121212] p-6 rounded-2xl border border-white/10 space-y-4 hover:border-[#9ce2c7]/50 transition-colors flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="p-3 bg-[#9ce2c7]/10 text-[#9ce2c7] rounded-2xl w-fit">
                      <IconComp className="w-6 h-6" />
                    </div>
                    {sol.tag && (
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9ce2c7] bg-[#9ce2c7]/10 px-2.5 py-0.5 rounded-full inline-block border border-[#9ce2c7]/20">
                        {sol.tag}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-white">{sol.title}</h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {sol.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS (4 STEPS) */}
      <section className="py-20 md:py-28 bg-[#121212] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
              Execution Blueprint
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              How It Works
            </h2>
            <p className="text-base text-gray-300 font-sans">
              A battle-tested 4-step client & customer acquisition blueprint designed for measurable scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#9ce2c7] bg-[#9ce2c7]/10 px-3 py-1 rounded-full w-fit inline-block border border-[#9ce2c7]/20">
                  Step 01
                </span>
                <h3 className="text-xl font-bold text-white">VIP Client Identification</h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  We identify who your ideal customers are—high-value buyers, repeat shoppers, or decision-makers. We isolate top geographic locations and high-intent demographics to eliminate wasted spend.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#9ce2c7] bg-[#9ce2c7]/10 px-3 py-1 rounded-full w-fit inline-block border border-[#9ce2c7]/20">
                  Step 02
                </span>
                <h3 className="text-xl font-bold text-white">Client Attraction</h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  We identify the best digital marketing channels (Search, Shopping, Meta, YouTube) to source them from and drive them directly to your high-speed landing pages or storefront.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#9ce2c7] bg-[#9ce2c7]/10 px-3 py-1 rounded-full w-fit inline-block border border-[#9ce2c7]/20">
                  Step 03
                </span>
                <h3 className="text-xl font-bold text-white">Contact Automation</h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Instantly capture leads and orders so they schedule a consultation, place an order, call directly, or request an estimate without manual friction or delay.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#9ce2c7] bg-[#9ce2c7]/10 px-3 py-1 rounded-full w-fit inline-block border border-[#9ce2c7]/20">
                  Step 04
                </span>
                <h3 className="text-xl font-bold text-white">Closing & Scaling</h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Our digital marketing automations and campaign bidding engines are continuously optimized to complete this process on autopilot so you can scale revenue month after month.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: REDACTED CASE STUDY */}
      <section className="py-20 md:py-28 bg-[#181818] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
              Verified Client Growth
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Redacted {config.title} Case Study
            </h2>
            <p className="text-base text-gray-300 font-sans">
              How Paid Search, Shopping, and Social strategies delivered record-breaking return on investment.
            </p>
          </div>

          <div className="bg-[#121212] rounded-3xl border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Image Column */}
            <div className="lg:col-span-5 relative min-h-[300px]">
              <AnimatedImage
                src={config.caseStudy.image}
                alt={config.caseStudy.title}
                className="w-full h-full object-cover"
                wrapperClassName="w-full h-full absolute inset-0"
                scale={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] lg:bg-gradient-to-r lg:from-transparent lg:to-[#121212] pointer-events-none"></div>
              
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest text-[#9ce2c7]">
                [Redacted Client Account]
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#9ce2c7]">
                  <ShieldCheck className="w-4 h-4 text-[#9ce2c7]" />
                  <span>Verified Campaign Execution</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {config.caseStudy.title}
                </h3>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-b border-white/10 py-4">
                  {config.caseStudy.metrics.map((m, idx) => (
                    <div key={idx}>
                      <p className="text-2xl sm:text-3xl font-black text-[#9ce2c7]">{m.value}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Problem, Solution, Result breakdown */}
                <div className="space-y-4 pt-2">
                  <div className="bg-[#1a1a1a] p-4 rounded-xl border-l-4 border-rose-500">
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">Problem (Challenge)</p>
                    <p className="text-sm text-gray-300 leading-relaxed font-sans">{config.caseStudy.problem}</p>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-xl border-l-4 border-blue-500">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">Solution (Implementation)</p>
                    <p className="text-sm text-gray-300 leading-relaxed font-sans">{config.caseStudy.solution}</p>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-xl border-l-4 border-emerald-500">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Result (Business Impact)</p>
                    <p className="text-sm text-gray-300 leading-relaxed font-sans">{config.caseStudy.result}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onBookClick}
                  className="bg-[#9ce2c7] hover:bg-[#8bd6ba] text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer inline-flex items-center space-x-2 transform hover:-translate-y-0.5"
                >
                  <span>Replicate These Results</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {config.caseStudy.pdfUrl && (
                  <a
                    href={config.caseStudy.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest text-xs px-6 py-4 rounded-full border border-white/20 transition-all cursor-pointer inline-flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4 text-[#9ce2c7]" />
                    <span>View Full Case Study PDF</span>
                  </a>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: CTA & EMBEDDED STRATEGY CALL BOOKING FORM */}
      <section id="ind-cta" className="py-20 md:py-28 bg-[#121212] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ce2c7]">
              Start Scaling Your Business
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Ready to Close More Deals? <br />
              <span className="text-[#9ce2c7]">Book Your {config.title} Strategy Call.</span>
            </h2>
            <p className="text-base text-gray-300 max-w-xl mx-auto font-sans">
              Schedule your confidential strategy session to review your current ad performance and build your custom digital acquisition engine.
            </p>
          </div>

          {/* 2-Step Progress Indicator */}
          <div className="max-w-md mx-auto mb-8 bg-white/5 p-1.5 rounded-full border border-white/10 flex items-center justify-between">
            <div 
              className={`flex-1 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                indStep === 1 
                  ? 'bg-[#9ce2c7] text-black shadow-md' 
                  : 'text-gray-400 hover:text-white cursor-pointer'
              }`}
              onClick={() => setIndStep(1)}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${indStep === 1 ? 'bg-black text-white' : 'bg-white/10 text-white'}`}>
                1
              </span>
              <span>1. Qualification</span>
            </div>

            <div className={`flex-1 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
              indStep === 2 
                ? 'bg-[#9ce2c7] text-black shadow-md' 
                : 'text-gray-400'
            }`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${indStep === 2 ? 'bg-black text-white' : 'bg-white/10 text-white'}`}>
                2
              </span>
              <span>2. Schedule Time</span>
            </div>
          </div>

          {/* STEP 1: QUALIFICATION FORM */}
          {indStep === 1 && (
            <div className="bg-white text-gray-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-100 animate-fade-in">
              <form onSubmit={handleSubmitStep1} className="space-y-6">
                
                {/* First Name & Last Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-gray-500" />
                      <span>First Name *</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="Deon"
                      value={indForm.firstName}
                      onChange={(e) => setIndForm({ ...indForm, firstName: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-gray-500" />
                      <span>Last Name *</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Howard"
                      value={indForm.lastName}
                      onChange={(e) => setIndForm({ ...indForm, lastName: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none"
                    />
                  </div>
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center space-x-1">
                      <Mail className="w-3.5 h-3.5 text-gray-500" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="deon@company.com"
                      value={indForm.email}
                      onChange={(e) => setIndForm({ ...indForm, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center space-x-1">
                      <Phone className="w-3.5 h-3.5 text-gray-500" />
                      <span>Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(555) 000-0000"
                      value={indForm.phone}
                      onChange={(e) => setIndForm({ ...indForm, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none"
                    />
                  </div>
                </div>

                {/* Industry Row */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center space-x-1">
                    <Layers className="w-3.5 h-3.5 text-gray-500" />
                    <span>Industry / Vertical Focus</span>
                  </label>
                  <input
                    type="text"
                    name="industry"
                    placeholder={config.title}
                    value={indForm.industry}
                    onChange={(e) => setIndForm({ ...indForm, industry: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none"
                  />
                </div>

                {/* Average Current Monthly Revenue & 90-Day Goal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center space-x-1">
                      <DollarSign className="w-3.5 h-3.5 text-gray-500" />
                      <span>Average Current Monthly Revenue</span>
                    </label>
                    <select
                      name="currentRevenue"
                      value={indForm.currentRevenue}
                      onChange={(e) => setIndForm({ ...indForm, currentRevenue: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none cursor-pointer"
                    >
                      <option value="Under $10k / mo">Under $10k / mo</option>
                      <option value="$10k - $25k / mo">$10k - $25k / mo</option>
                      <option value="$25k - $50k / mo">$25k - $50k / mo</option>
                      <option value="$50k - $100k / mo">$50k - $100k / mo</option>
                      <option value="$100k+ / mo">$100k+ / mo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center space-x-1">
                      <TrendingUp className="w-3.5 h-3.5 text-gray-500" />
                      <span>90-Day Revenue Goal</span>
                    </label>
                    <select
                      name="revenueGoal"
                      value={indForm.revenueGoal}
                      onChange={(e) => setIndForm({ ...indForm, revenueGoal: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none cursor-pointer"
                    >
                      <option value="Under $10k">Under $10k</option>
                      <option value="$10k - $25k">$10k - $25k</option>
                      <option value="$25k - $50k">$25k - $50k</option>
                      <option value="$50k - $100k">$50k - $100k</option>
                      <option value="$100k+">$100k+</option>
                    </select>
                  </div>
                </div>

                {/* Projected Monthly Ad Budget */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center space-x-1">
                    <Target className="w-3.5 h-3.5 text-gray-500" />
                    <span>Projected Monthly Ad Budget</span>
                  </label>
                  <select
                    name="adBudget"
                    value={indForm.adBudget}
                    onChange={(e) => setIndForm({ ...indForm, adBudget: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black rounded-xl py-3 px-4 text-xs font-bold text-gray-900 outline-none cursor-pointer"
                  >
                    <option value="Under $1.5k">Under $1.5k</option>
                    <option value="$1.5k - $5k">$1.5k - $5k</option>
                    <option value="$5k - $10k">$5k - $10k</option>
                    <option value="$10k+">$10k+</option>
                  </select>
                </div>

                {/* Services Interested In Checkboxes with All of the Above */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Services Interested In:
                    </label>
                    <button
                      type="button"
                      onClick={handleToggleAllIndServices}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-black py-0.5 px-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
                    >
                      {allIndServicesSelected ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5 text-gray-400" />}
                      <span>All of the Above</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {indServiceOptions.map((srv) => {
                      const isChecked = indForm.services.includes(srv.label);
                      return (
                        <label
                          key={srv.id}
                          className={`flex items-center space-x-2.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all select-none ${
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
                            onChange={() => handleToggleIndService(srv.label)}
                            className="sr-only"
                          />
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                            isChecked ? 'bg-[#9ce2c7] border-[#9ce2c7] text-black' : 'border-gray-300 bg-white'
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
                <div className="bg-[#f0fbf6] border-2 border-[#10b981] rounded-2xl p-4 sm:p-5 shadow-md space-y-2.5 transition-all focus-within:ring-2 focus-within:ring-[#10b981]/40">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#065f46] flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-[#059669]" />
                    <span>Tell us more about your project, your company, goals, etc.</span>
                  </label>
                  <textarea
                    rows={3}
                    name="projectDescription"
                    placeholder="Tell us about your project, company, target audiences, current ad channels, 90-day targets, etc..."
                    value={indForm.projectDescription}
                    onChange={(e) => setIndForm({ ...indForm, projectDescription: e.target.value })}
                    className="w-full bg-white border-2 border-[#a3e6cd] focus:border-[#059669] focus:ring-2 focus:ring-[#10b981]/30 rounded-xl py-3 px-3.5 text-xs font-medium text-gray-900 placeholder:text-gray-400 outline-none resize-none shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  id="ind-cta-submit-btn"
                  className="w-full bg-black hover:bg-gray-900 text-white font-bold uppercase tracking-widest text-xs py-4 px-8 rounded-full shadow-lg transition-all cursor-pointer border border-white/20 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <span>Next: Select Date & Time</span>
                  <ArrowRight className="w-4 h-4 text-[#9ce2c7]" />
                </button>

              </form>
            </div>
          )}

          {/* STEP 2: EMBEDDED CALENDAR SCHEDULER */}
          {indStep === 2 && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#a3e6cd]/60 space-y-6 animate-fade-in text-gray-900">
              
              {/* Step 2 Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
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
                  onClick={() => setIndStep(1)}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-700 hover:text-gray-900 py-2.5 px-4 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 cursor-pointer transition-all self-start sm:self-auto"
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
              <div className="bg-[#121212] text-white p-6 sm:p-8 rounded-2xl border-2 border-[#a3e6cd] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                <div className="space-y-1">
                  <div className="flex items-center justify-center sm:justify-start space-x-2 text-[#9ce2c7] text-xs font-bold uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4 text-[#9ce2c7]" />
                    <span>Session Scheduling</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    Done Choosing Your Time Slot on the Calendar?
                  </h4>
                  <p className="text-xs text-gray-300">
                    Click below to confirm your session and continue directly to the confirmation briefing page.
                  </p>
                </div>

                <button
                  type="button"
                  id="ind-bottom-finalize-booking-btn"
                  onClick={() => handleFinalizeIndBooking()}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto shrink-0 bg-[#a3e6cd] hover:bg-[#8ee0c1] text-gray-950 font-black uppercase tracking-widest text-xs py-4 px-8 rounded-full shadow-2xl transition-all cursor-pointer border border-[#7ed4b4] transform hover:-translate-y-0.5 disabled:opacity-75 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin text-black" />
                      <span>Redirecting to Confirmation...</span>
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
      </section>

      {/* Page Footer */}
      <footer className="py-8 bg-black border-t border-white/10 text-center text-xs text-gray-400">
        <p>© 2026 Deon Howard PPC • Specialized Digital Acquisition Systems</p>
      </footer>

    </div>
  );
};

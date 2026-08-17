import { IndustryItem, ServiceItem, ProcessStep, CaseStudy } from '../types';

export const PHONE_NUMBER = "(708) 669-6410";
export const EMAIL_ADDRESS = "info@deonhowardppc.com";

// Deon Howard Portrait image stored in local /public/images/ directory
export const DEON_PORTRAIT = "/images/DH%20PPC.png";

// Confused Marketer image for "Is Your Business Struggling to Grow Online?" section
export const MARKETING_LAPTOP_IMG = "/images/Confused%20Marketer.jpeg.png";

// Hands holding pen writing strategy notes
export const STRATEGY_CALL_IMG = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80";

// Callout phone photo
export const CALLOUT_PHONE_IMG = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80";

export const BENEFITS_DATA = [
  {
    id: 'time-savings',
    title: 'Hours of Time Saved',
    icon: 'Clock',
    description: 'Eliminate repetitive marketing busywork. Intelligent AI marketing automation systems handle lead capture, follow-ups, and campaign optimization 24/7 so you can focus on running your business.'
  },
  {
    id: 'customer-growth',
    title: 'Predictable Customer Flow',
    icon: 'UserCheck',
    description: 'Turn cold traffic into booked consultations and buying customers with automated nurturing funnels and connected systems that engage prospects at the exact right moment.'
  },
  {
    id: 'scalable-sales',
    title: 'Automated Sales & Revenue',
    icon: 'TrendingUp',
    description: 'Scale ad spend and revenue with self-optimizing AI models. Get more qualified clients and repeat buyers with a system you control with precision.'
  }
];

export const OBJECTIVES_DATA = [
  {
    id: 'lead-gen',
    title: 'Lead Generation',
    icon: 'Users',
    description: 'Capture and qualify high-intent prospects with AI-optimized landing pages, smart ad targeting, and instant automated follow-up sequences that book consultations on your calendar.'
  },
  {
    id: 'ecomm',
    title: 'E-Commerce & Online Sales',
    icon: 'CreditCard',
    description: 'Accelerate checkout volume and average order value with automated Google & Meta shopping ads, predictive retargeting, and dynamic product landing pages.'
  },
  {
    id: 'brand-awareness',
    title: 'Brand Awareness',
    icon: 'Globe',
    description: 'Expand market reach and stay top-of-mind with AI-driven cross-channel ad distribution, automated creative rotations, and hyper-targeted audience modeling.'
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions',
    icon: 'Repeat',
    description: 'Maximize recurring revenue and customer lifetime value using automated trial-to-paid nurture workflows, churn-prevention triggers, and AI win-back sequences.'
  }
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'home-services',
    title: 'Home Services',
    description: 'Plumbers, HVAC, Electricians, Roofers, Home & Garden',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'legal-prof',
    title: 'Legal & Professional Services',
    description: 'Lawyers, Consultants, Coaches',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'medical',
    title: 'Medical Healthcare',
    description: 'Doctors, Dentists, Healthcare Specialists, Hospitals',
    image: '/images/Medical.png'
  },
  {
    id: 'financial',
    title: 'Financial Services',
    description: 'Banking, Accounting, Business & Personal Finance, Taxes',
    image: '/images/Financial%20services.png'
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'Real Estate Agents, Wholesalers, Residential, Commercial',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fashion',
    title: 'Fashion, Apparel & Beauty',
    description: 'Clothing, Shoes, Accessories, Makeup',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fitness',
    title: 'Sports, Fitness & Wellness',
    description: 'Gyms, Fitness Coaches, Nutritionists, Equipment & Supplements',
    image: '/images/fitness.png'
  },
  {
    id: 'retail',
    title: 'Retail & E-Commerce',
    description: 'Home Goods, Furniture, Specialty Food, Clothing & Accessories, Hobbies & Entertainment',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Institutions, Online, Specialized Instruction, Education Technology',
    image: '/images/education.png'
  },
  {
    id: 'travel',
    title: 'Travel & Tourism',
    description: 'Travel Agencies & Tours, Airlines, Local Tourism, Hotels & Hospitality',
    image: '/images/travel.png'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'automated-funnels',
    title: 'Automated Conversion Funnels',
    tagline: 'AI-Powered Websites & High-Converting Landing Pages',
    platforms: ['AI-Powered Websites', 'High-Converting Landing Pages', 'Mobile-Ready & On-Brand', 'Full Tech Stack Integration'],
    iconName: 'Layout',
    description: 'Receive custom, AI-powered websites and high-converting landing pages engineered to be sleek, professional, on-brand, and fully mobile-friendly. Every page is built for maximum speed and conversion, seamlessly integrated with your CRM, calendar booking, and other marketing channels.'
  },
  {
    id: 'ai-customer-acquisition',
    title: 'AI Customer Acquisition Systems',
    tagline: 'High-ROI Paid Ads Across Google & Meta',
    platforms: ['Google AI (Search & PMAX)', 'Meta Advantage+ (FB/IG)', 'AI Audience Modeling', 'Smart Bidding'],
    iconName: 'TrendingUp',
    description: 'Deploy intelligent ad campaigns powered by machine learning across Google, Meta, and beyond. We build targeted search, shopping, and social ads that pinpoint your ideal customers, optimize bids autonomously, and scale acquisition volume at the lowest cost per lead.'
  },
  {
    id: 'marketing-automation',
    title: 'AI Marketing Automation Tools',
    tagline: 'Intelligent Workflows, Agents & Multi-Channel Nurture',
    platforms: ['AI Agents & Chatbots', 'CRM & Lead Workflows', 'Smart SMS & Email Nurture', 'Instant Qualification'],
    iconName: 'Sparkles',
    description: 'Automate manual follow-up and lead qualification with smart AI tools and connected workflows. From instantaneous SMS/email responses to 24/7 intelligent scheduling and CRM synchronization, your business engages prospects instantly without lifting a finger.'
  },
  {
    id: 'predictive-analytics',
    title: 'Predictive Attribution Systems',
    tagline: 'Advanced Analytics, Closed-Loop Tracking & Actionable Reporting',
    platforms: ['Server-Side CAPI Tracking', 'Real-Time ROI Dashboards', 'Closed-Loop Revenue Attribution', 'Predictive Insights'],
    iconName: 'BarChart3',
    description: 'Gain absolute clarity on your marketing performance with advanced reporting and predictive revenue attribution. We implement privacy-compliant server-side tracking and custom dashboards that connect every dollar spent directly to booked appointments, closed sales, and true bottom-line ROI.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: '1. Growth & Automation Audit',
    description: 'We analyze your current customer acquisition flow, manual marketing bottlenecks, and revenue targets to design a bespoke AI automation blueprint.'
  },
  {
    number: 2,
    title: '2. Customer Journey & AI Model Mapping',
    description: 'We define your ideal high-value customer profile, qualification criteria, and automated nurture sequences to eliminate repetitive manual outreach.'
  },
  {
    number: 3,
    title: '3. Multichannel AI Engine Architecture',
    description: 'Strategic deployment of self-optimizing campaign infrastructure across Google, Meta, and automated channels engineered for maximum ROI.'
  },
  {
    number: 4,
    title: '4. Automation & Conversion Tracking Integration',
    description: 'Implementation of server-side conversion tracking, CRM synchronization, and instant lead alerting workflows for seamless operational execution.'
  },
  {
    number: 5,
    title: '5. Autonomous Campaign Launch & Optimization',
    description: 'Deploying dynamic AI-assisted creative testing, algorithmic bidding, and automated budget reallocation to scale customer acquisition on autopilot.'
  },
  {
    number: 6,
    title: '6. AI Revenue Intelligence & Scaling',
    description: 'Delivering real-time revenue analytics dashboards and automated performance insights to continuously multiply sales while preserving your time.'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: "From Slow Sales to Holiday Boom: A Retailer's Q4 Transformation",
    category: 'E-Commerce & Retail',
    metrics: [
      { label: 'Revenue Growth', value: '+340%' },
      { label: 'Return on Ad Spend', value: '5.2x ROAS' },
      { label: 'Cost Per Sale', value: '-42% CPA' }
    ],
    summary: 'Turned around an online retail brand by fixing catalog feeds, removing ad waste, and launching automated shopping campaigns on Google & Meta.',
    problem: 'The online store was spending heavily on ads during the holiday season but losing money due to low website sales, poor Google product listings, and high advertising costs.',
    solution: 'We cleaned up their Google product catalog, launched automated Google Performance Max & Meta Shopping ads, and created fast mobile product checkout pages.',
    result: 'Sales jumped by +340% in 90 days, generating $5.20 in store revenue for every $1 spent on ads, while cutting customer acquisition cost by 42%.',
    pdfUrl: 'https://drive.google.com/file/d/1AcnsMX68yqDccZ66AUnKVggclR_FE5aA/view?usp=drive_link',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'case-2',
    title: 'High-Value Clients On Demand: 310% Growth for Regional Law Firm',
    category: 'Legal & Professional Services',
    metrics: [
      { label: 'Monthly Leads', value: '185+' },
      { label: 'Cost Per Lead', value: '$64 CPL' },
      { label: 'Intake Conversion', value: '14.8%' }
    ],
    summary: 'Replaced expensive, wasteful keyword ads with high-intent Google Search campaigns and instant consultation booking.',
    problem: 'The law firm was burning thousands on generic Google ads that attracted free advice seekers instead of paying business clients.',
    solution: 'We blocked wasteful search terms, targeted only motivated local clients needing legal help, and built an online intake form that schedules consultations immediately.',
    result: 'The firm locked in 185+ qualified consultation requests per month at $64 per lead, generating over 3.1x return on total marketing spend.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'case-3',
    title: 'Scaling Online Orders: $1.2M+ Revenue Expansion for Consumer Brand',
    category: 'Consumer Goods & E-Commerce',
    metrics: [
      { label: 'Total Sales Generated', value: '$1.2M+' },
      { label: 'Ad Spend ROAS', value: '4.8x ROAS' },
      { label: 'Order Volume Increase', value: '+280%' }
    ],
    summary: 'Built an automated online shopping machine using Meta catalog ads and Google Shopping to scale past plateaued social posts.',
    problem: 'The brand relied almost entirely on organic social posts and could not figure out how to run profitable paid ads to grow beyond $10,000 in monthly sales.',
    solution: 'We launched automated Meta Advantage+ shopping carousels, customer review video ads, and Google Shopping feed optimization to target active online shoppers.',
    result: 'Generated $1.2M+ in total store sales at a 4.8x return on ad spend, establishing a consistent daily pipeline of new and repeat orders.',
    pdfUrl: 'https://drive.google.com/file/d/1AcnsMX68yqDccZ66AUnKVggclR_FE5aA/view?usp=drive_link',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'
  }
];

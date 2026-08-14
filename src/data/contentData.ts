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
    id: 'scalability',
    title: 'Unmatched Scalability',
    icon: 'Maximize2',
    description: 'Tap into new markets and promote new services instantly. Grow your business on your terms, whenever you\'re ready'
  },
  {
    id: 'control',
    title: 'Complete Control',
    icon: 'RotateCw',
    description: 'You have the power to turn on more business when you need it. Generate more customers on-demand, all with a budget you control.'
  },
  {
    id: 'attraction',
    title: 'VIP Client Attraction',
    icon: 'UserCheck',
    description: 'Stop chasing and start attracting. My campaigns are designed to put your business in front of the exact customers you want to work with.'
  }
];

export const OBJECTIVES_DATA = [
  {
    id: 'lead-gen',
    title: 'Lead Generation',
    icon: 'Users',
    description: 'Book more clients through form fills and phone calls'
  },
  {
    id: 'ecomm',
    title: 'E-Commerce + Sales',
    icon: 'CreditCard',
    description: 'Drive sales and revenue through your online store'
  },
  {
    id: 'awareness',
    title: 'Brand Awareness',
    icon: 'Globe',
    description: 'Increase your SOV online to stand out from your competition'
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions',
    icon: 'Repeat',
    description: 'Attract new subscribers and drive up sales for your best services'
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
    id: 'website-design',
    title: 'Website Design',
    tagline: 'Crafting User-Centric Websites & Landing Pages',
    iconName: 'Layout',
    description: 'Turn your website into a conversion magnet. Get a website that\'s focused on creating user-centric experience that drives meaningful interactions while maintaining your unique identity, while fully integrating with your advertising campaigns.'
  },
  {
    id: 'paid-search',
    title: 'Paid Search',
    tagline: 'Maximizing Ad Performance',
    platforms: ['Google Ads', 'Microsoft Ads'],
    iconName: 'Search',
    description: 'Get paid search campaigns that leverage the best of Google\'s capabilities, leveraging the best practice set up and up to date AI capabilities to maximize results. Our data-driven approach ensures that your ad spend generates maximum ROI and leads to increased conversions.'
  },
  {
    id: 'paid-social',
    title: 'Paid Social',
    tagline: 'Drive Results on Social Media',
    platforms: ['META (Facebook, Instagram)', 'TikTok'],
    iconName: 'Share2',
    description: 'Forget Boosted Posts- get social campaigns that drive results. Get campaigns that resonates with your VIP clients across the top social platforms and meet all your business objectives, from brand awareness and remarketing to conversions, and sales.'
  },
  {
    id: 'conversion-analytics',
    title: 'Conversion Tracking + Analytics',
    tagline: 'Driving Consistent Results',
    iconName: 'BarChart3',
    description: 'Ensure your site is set up for success with conversion tracking. With advanced pixel integration, you\'ll ensure your tracking your most important business actions, and integrate seamlessly into your Google and Meta Ads platforms to drive tangible results.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: '1. Strategy Session',
    description: 'Every partnership starts with a deep-dive conversation about your core business objectives, growth targets, and revenue goals.'
  },
  {
    number: 2,
    title: '2. Market Audit & VIP Client Identification',
    description: 'A deep dive into your current market positioning, competitor analysis, geo-targeting options, and defining your ideal high-value VIP client profile.'
  },
  {
    number: 3,
    title: '3. Channel Selection',
    description: 'Strategic selection of the precise advertising platforms—Google, Meta, LinkedIn, or programmatic—best suited to reach your target audience and hit ROI goals.'
  },
  {
    number: 4,
    title: '4. Conversion Tracking Setup',
    description: 'Implementation and validation of advanced tracking pixels, server-side conversion APIs, and event analytics to measure every key business action.'
  },
  {
    number: 5,
    title: '5. Campaign Launch & Optimization',
    description: 'Deploying high-converting ad creatives and landing pages, paired with active daily bidding, audience testing, and budget optimization.'
  },
  {
    number: 6,
    title: '6. Analytics & Reporting',
    description: 'Delivering transparent, executive-level performance dashboards with actionable insights, ROI tracking, and continuous scaling recommendations.'
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

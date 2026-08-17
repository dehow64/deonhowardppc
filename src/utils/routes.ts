export interface IndustryRoute {
  id: string;
  slug: string;
  aliases: string[];
  name: string;
}

export const INDUSTRY_ROUTES: IndustryRoute[] = [
  {
    id: 'real-estate',
    slug: 'real-estate',
    aliases: ['real-estate', 'realestate', 'real_estate', 'realtor', 'real-estate-marketing'],
    name: 'Real Estate'
  },
  {
    id: 'home-services',
    slug: 'home-services',
    aliases: ['home-services', 'homeservices', 'home_services', 'hvac', 'contractors'],
    name: 'Home Services'
  },
  {
    id: 'legal-prof',
    slug: 'legal-services',
    aliases: ['legal-services', 'legal', 'legal-prof', 'lawyers', 'attorneys', 'professional-services'],
    name: 'Legal & Professional Services'
  },
  {
    id: 'medical',
    slug: 'medical',
    aliases: ['medical', 'medical-healthcare', 'healthcare', 'doctors', 'dentists', 'clinics'],
    name: 'Medical Healthcare'
  },
  {
    id: 'financial',
    slug: 'financial-services',
    aliases: ['financial-services', 'financial', 'finance', 'wealth-management', 'accounting', 'cpa'],
    name: 'Financial Services'
  },
  {
    id: 'retail',
    slug: 'retail-ecommerce',
    aliases: ['retail-ecommerce', 'retail', 'ecommerce', 'e-commerce', 'online-store', 'shopping'],
    name: 'Retail & E-Commerce'
  },
  {
    id: 'fashion',
    slug: 'fashion-beauty',
    aliases: ['fashion-beauty', 'fashion', 'beauty', 'apparel', 'cosmetics'],
    name: 'Fashion, Apparel & Beauty'
  },
  {
    id: 'fitness',
    slug: 'fitness-wellness',
    aliases: ['fitness-wellness', 'fitness', 'sports-fitness', 'wellness', 'gyms'],
    name: 'Sports, Fitness & Wellness'
  },
  {
    id: 'education',
    slug: 'education',
    aliases: ['education', 'edtech', 'courses', 'schools', 'institutions'],
    name: 'Education'
  },
  {
    id: 'travel',
    slug: 'travel-tourism',
    aliases: ['travel-tourism', 'travel', 'tourism', 'hospitality', 'hotels'],
    name: 'Travel & Tourism'
  }
];

export const getIndustryFromPath = (pathname: string = window.location.pathname, hash: string = window.location.hash): string | null => {
  // Check pathname first
  const cleanPath = pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  
  // Also check if path has /industries/...
  const segments = cleanPath.split('/');
  const targetSegment = segments[segments.length - 1];

  if (targetSegment) {
    for (const route of INDUSTRY_ROUTES) {
      if (route.aliases.includes(targetSegment) || route.slug === targetSegment || route.id === targetSegment) {
        return route.id;
      }
    }
  }

  // Check URL search params as fallback (e.g. ?industry=real-estate)
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);
    const indParam = searchParams.get('industry') || searchParams.get('vertical');
    if (indParam) {
      const match = INDUSTRY_ROUTES.find(r => r.aliases.includes(indParam.toLowerCase()) || r.id === indParam || r.slug === indParam);
      if (match) return match.id;
    }
  }

  // Check hash fallback (e.g. #real-estate or #/real-estate)
  if (hash) {
    const cleanHash = hash.replace(/^#\/?/, '').toLowerCase();
    for (const route of INDUSTRY_ROUTES) {
      if (route.aliases.includes(cleanHash) || route.slug === cleanHash || route.id === cleanHash) {
        return route.id;
      }
    }
  }

  return null;
};

export const getPathForIndustry = (industryId: string): string => {
  const route = INDUSTRY_ROUTES.find(r => r.id === industryId);
  return route ? `/${route.slug}` : `/${industryId}`;
};

export const getPageTitle = (industryId: string | null): string => {
  if (!industryId) {
    return 'Deon Howard PPC - Digital Marketing & Growth Agency';
  }
  const route = INDUSTRY_ROUTES.find(r => r.id === industryId);
  const name = route ? route.name : 'Industry';
  return `${name} Marketing Automation Systems | Deon Howard PPC`;
};

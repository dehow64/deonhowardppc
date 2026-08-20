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
  if (typeof window === 'undefined') return null;

  // 1. Check URL search params (e.g. ?p=/real-estate from 404 redirect, or ?page=real-estate, or ?industry=real-estate)
  const searchParams = new URLSearchParams(window.location.search);
  const pParam = searchParams.get('p') || searchParams.get('path') || searchParams.get('page') || searchParams.get('industry') || searchParams.get('vertical');
  
  if (pParam) {
    const cleanParam = pParam.toLowerCase().replace(/^\/+|\/+$/g, '');
    const segments = cleanParam.split('/');
    const target = segments[segments.length - 1];

    for (const route of INDUSTRY_ROUTES) {
      if (route.aliases.includes(target) || route.slug === target || route.id === target) {
        // Clean up the URL to clean path without the query parameter
        try {
          const cleanUrl = `/${route.slug}${window.location.hash}`;
          window.history.replaceState({ industryId: route.id }, '', cleanUrl);
        } catch (e) {
          // ignore in environments with restricted history
        }
        return route.id;
      }
    }
  }

  // 2. Check standard pathname
  const cleanPath = pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  const segments = cleanPath.split('/');
  const targetSegment = segments[segments.length - 1];

  if (targetSegment) {
    for (const route of INDUSTRY_ROUTES) {
      if (route.aliases.includes(targetSegment) || route.slug === targetSegment || route.id === targetSegment) {
        return route.id;
      }
    }
  }

  // 3. Check hash fallback (e.g. #/real-estate or #real-estate)
  if (hash) {
    const cleanHash = hash.replace(/^#\/?/, '').toLowerCase().replace(/^\/+|\/+$/g, '');
    const hashSegments = cleanHash.split('/');
    const hashTarget = hashSegments[hashSegments.length - 1];

    for (const route of INDUSTRY_ROUTES) {
      if (route.aliases.includes(hashTarget) || route.slug === hashTarget || route.id === hashTarget) {
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

export const isThankYouPage = (pathname: string = window.location.pathname, hash: string = window.location.hash): boolean => {
  if (typeof window === 'undefined') return false;

  const searchParams = new URLSearchParams(window.location.search);
  const pParam = searchParams.get('p') || searchParams.get('path') || searchParams.get('page');
  if (pParam) {
    const clean = pParam.toLowerCase().replace(/^\/+|\/+$/g, '');
    if (['thank-you', 'thankyou', 'thanks', 'confirmation'].includes(clean)) {
      return true;
    }
  }

  const cleanPath = pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  if (['thank-you', 'thankyou', 'thanks', 'confirmation'].includes(cleanPath)) {
    return true;
  }

  if (hash) {
    const cleanHash = hash.replace(/^#\/?/, '').toLowerCase().replace(/^\/+|\/+$/g, '');
    if (['thank-you', 'thankyou', 'thanks', 'confirmation'].includes(cleanHash)) {
      return true;
    }
  }

  return false;
};

export const isPrivacyPolicyPage = (pathname: string = window.location.pathname, hash: string = window.location.hash): boolean => {
  if (typeof window === 'undefined') return false;

  const searchParams = new URLSearchParams(window.location.search);
  const pParam = searchParams.get('p') || searchParams.get('path') || searchParams.get('page');
  if (pParam) {
    const clean = pParam.toLowerCase().replace(/^\/+|\/+$/g, '');
    if (['privacy-policy', 'privacy', 'privacypolicy', 'privacy-policy.html'].includes(clean)) {
      return true;
    }
  }

  const cleanPath = pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  if (['privacy-policy', 'privacy', 'privacypolicy', 'privacy-policy.html'].includes(cleanPath)) {
    return true;
  }

  if (hash) {
    const cleanHash = hash.replace(/^#\/?/, '').toLowerCase().replace(/^\/+|\/+$/g, '');
    if (['privacy-policy', 'privacy', 'privacypolicy', 'privacy-policy.html'].includes(cleanHash)) {
      return true;
    }
  }

  return false;
};

export const isAccessibilityPage = (pathname: string = window.location.pathname, hash: string = window.location.hash): boolean => {
  if (typeof window === 'undefined') return false;

  const searchParams = new URLSearchParams(window.location.search);
  const pParam = searchParams.get('p') || searchParams.get('path') || searchParams.get('page');
  if (pParam) {
    const clean = pParam.toLowerCase().replace(/^\/+|\/+$/g, '');
    if (['accessibility-statement', 'accessibility', 'accessibilitystatement', 'accessibility-statement.html'].includes(clean)) {
      return true;
    }
  }

  const cleanPath = pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  if (['accessibility-statement', 'accessibility', 'accessibilitystatement', 'accessibility-statement.html'].includes(cleanPath)) {
    return true;
  }

  if (hash) {
    const cleanHash = hash.replace(/^#\/?/, '').toLowerCase().replace(/^\/+|\/+$/g, '');
    if (['accessibility-statement', 'accessibility', 'accessibilitystatement', 'accessibility-statement.html'].includes(cleanHash)) {
      return true;
    }
  }

  return false;
};

export const getPageTitle = (
  industryId: string | null, 
  isThanks: boolean = false, 
  isPrivacy: boolean = false, 
  isAccessibility: boolean = false
): string => {
  if (isThanks) {
    return 'Thank You - Strategy Session Confirmed | Deon Howard PPC';
  }
  if (isPrivacy) {
    return 'Privacy Policy | Deon Howard PPC';
  }
  if (isAccessibility) {
    return 'Accessibility Statement | Deon Howard PPC';
  }
  if (!industryId) {
    return 'Deon Howard PPC - Digital Marketing & Growth Agency';
  }
  const route = INDUSTRY_ROUTES.find(r => r.id === industryId);
  const name = route ? route.name : 'Industry';
  return `${name} Marketing Automation Systems | Deon Howard PPC`;
};

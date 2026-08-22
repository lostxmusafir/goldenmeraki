import { useEffect } from 'react';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogType?: 'website' | 'product' | 'article';
  ogImage?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>> | null;
}

const DEFAULT_TITLE = 'Golden Meraki Gems | Natural Crystals, Gemstones & Healing Products';
const DEFAULT_DESCRIPTION =
  'Discover certified natural healing crystals, 7 chakra gemstone bracelets, raw quartz clusters, feng shui trees & custom intention jewelry at Golden Meraki Gems.';
const DEFAULT_DOMAIN = 'https://goldenmerakigems.com';
const DEFAULT_OG_IMAGE = `${DEFAULT_DOMAIN}/favicon.svg`;

export function SEOHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonicalUrl = DEFAULT_DOMAIN,
  noIndex = false,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title.includes('Golden Meraki') ? title : `${title} | Golden Meraki Gems`;
    document.title = formattedTitle;

    // Helper to update or set meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or set link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Primary Meta Tags & Google Verification Tag
    setMetaTag('meta[name="google-site-verification"]', 'name', 'google-site-verification', 'QU_Cd7OuZf23_fTZU_GW1Re0TwPVwNDNNcNLjmPracI');
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // 3. Robots Meta Tag
    const robotsContent = noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    setMetaTag('meta[name="robots"]', 'name', 'robots', robotsContent);

    // 4. Canonical URL
    const fullCanonical = canonicalUrl.startsWith('http') ? canonicalUrl : `${DEFAULT_DOMAIN}${canonicalUrl}`;
    setLinkTag('canonical', fullCanonical);

    // 5. Open Graph Meta Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', formattedTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', fullCanonical);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Golden Meraki Gems');

    // 6. Twitter Card Meta Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', formattedTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 7. JSON-LD Structured Data Script
    const scriptId = 'json-ld-seo';
    let scriptElem = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (scriptElem) {
      scriptElem.remove();
    }

    if (jsonLd) {
      scriptElem = document.createElement('script');
      scriptElem.id = scriptId;
      scriptElem.type = 'application/ld+json';
      scriptElem.text = JSON.stringify(jsonLd);
      document.head.appendChild(scriptElem);
    }

    return () => {
      // Cleanup script tag on unmount if needed
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [title, description, keywords, canonicalUrl, noIndex, ogType, ogImage, jsonLd]);

  return null;
}

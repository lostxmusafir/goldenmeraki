import type { Product } from '../types/product';
import { getImageUrl } from './image';

export const SITE_DOMAIN = 'https://goldenmerakigems.com';
export const BRAND_NAME = 'Golden Meraki Gems';
export const DEFAULT_OG_IMAGE = 'https://goldenmerakigems.com/favicon.svg';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_DOMAIN}/#organization`,
    name: BRAND_NAME,
    url: `${SITE_DOMAIN}/`,
    logo: {
      '@type': 'ImageObject',
      url: DEFAULT_OG_IMAGE,
      width: '512',
      height: '512',
    },
    description:
      'Certified natural healing crystals, 7 chakra gemstone bracelets, raw quartz clusters, feng shui trees & custom intention jewelry.',
    sameAs: [
      'https://www.instagram.com/goldenmeraki',
      'https://www.facebook.com/goldenmerakigems',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: '+919667290056',
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_DOMAIN}/#website`,
    url: `${SITE_DOMAIN}/`,
    name: BRAND_NAME,
    description: 'Natural Crystals, Sacred Gemstones & Healing Products',
    publisher: {
      '@id': `${SITE_DOMAIN}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_DOMAIN}/category/all?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_DOMAIN}${item.url}`,
    })),
  };
}

export function getProductSchema(product: Product, canonicalUrl: string) {
  const primaryImage = product.images && product.images.length > 0 ? getImageUrl(product.images[0]) : DEFAULT_OG_IMAGE;
  const allImages = (product.images || []).map((img) => getImageUrl(img));

  const hasVariants = Boolean(product.sizes && product.sizes.length > 0);
  const activeSizes = hasVariants && product.sizes ? product.sizes.filter((s) => s.isActive !== false) : [];

  let offersSchema: any;

  if (activeSizes.length > 1) {
    const prices = activeSizes.map((s) => Number(s.price || product.price)).filter((p) => p > 0);
    const lowPrice = prices.length > 0 ? Math.min(...prices) : product.price;
    const highPrice = prices.length > 0 ? Math.max(...prices) : product.price;
    const totalStock = activeSizes.reduce((sum, s) => sum + Number(s.stock || 0), 0);

    offersSchema = {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: lowPrice,
      highPrice: highPrice,
      offerCount: activeSizes.length,
      availability: totalStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: canonicalUrl,
      offers: activeSizes.map((s) => ({
        '@type': 'Offer',
        name: `${product.name} - ${s.size}`,
        price: Number(s.price || product.price),
        priceCurrency: 'INR',
        availability: s.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: canonicalUrl,
        seller: {
          '@type': 'Organization',
          name: BRAND_NAME,
        },
      })),
    };
  } else {
    offersSchema = {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: canonicalUrl,
      seller: {
        '@type': 'Organization',
        name: BRAND_NAME,
      },
    };
  }

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${canonicalUrl}#product`,
    name: product.name,
    description: product.description || `Certified natural ${product.name} gemstone at Golden Meraki Gems.`,
    image: allImages.length > 0 ? allImages : [primaryImage],
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME,
    },
    category: typeof product.category === 'string' ? product.category : (product.category as any)?.name || 'Crystals',
    offers: offersSchema,
  };

  const reviewCount = product.reviewsCount ?? (product as any).ratings?.count ?? 0;
  const ratingValue = product.rating ?? (product as any).ratings?.average ?? 5;

  if (reviewCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: ratingValue,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

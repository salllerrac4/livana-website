import { brandAlternateNames, brandProfiles, supportEmail, supportPhoneIntl } from '../data/brand';
import type { FAQ } from '../data/faq';
import logoLivana from '../assets/logo-livana.svg';
import type { BlogPost } from '../types/blog';
import type { Product } from '../types/product';
import { getProductPrice } from './pricing';
import { SITE_NAME, SITE_URL, toAbsoluteUrl } from './seo';

export type JsonLd = Record<string, unknown>;

type BreadcrumbItem = {
  name: string;
  path: string;
};

const toAbsoluteImageList = (images: string[]) =>
  [...new Set(images.map((image) => toAbsoluteUrl(image)).filter((image): image is string => Boolean(image)))];

const publisher = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: toAbsoluteUrl(logoLivana),
  },
};

export const createOrganizationSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: brandAlternateNames,
  url: SITE_URL,
  logo: toAbsoluteUrl(logoLivana),
  email: supportEmail,
  telephone: supportPhoneIntl,
  sameAs: brandProfiles.map((profile) => profile.url),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: supportEmail,
      telephone: supportPhoneIntl,
      availableLanguage: ['vi'],
    },
  ],
});

export const createWebsiteSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: brandAlternateNames,
  url: SITE_URL,
  publisher,
});

export const createBreadcrumbSchema = (items: BreadcrumbItem[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: toAbsoluteUrl(item.path),
  })),
});

export const createProductSchema = (product: Product, path: string): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  sku: product.id,
  url: toAbsoluteUrl(path),
  image: toAbsoluteImageList([product.imageUrl, ...(product.galleryImages ?? [])]),
  brand: {
    '@type': 'Brand',
    name: SITE_NAME,
  },
  category: product.category,
  keywords: product.scentNotes.join(', '),
  offers: product.sizeOptions.map((size) => ({
    '@type': 'Offer',
    url: toAbsoluteUrl(path),
    priceCurrency: 'VND',
    price: getProductPrice(product, size),
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    sku: `${product.id}-${size}`,
    name: `${product.name} ${size}`,
  })),
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Dung tich',
      value: product.sizeOptions.join(', '),
    },
    {
      '@type': 'PropertyValue',
      name: 'Not huong',
      value: product.scentNotes.join(', '),
    },
  ],
});

export const createBlogPostingSchema = (post: BlogPost): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  image: post.coverImage ? toAbsoluteImageList([post.coverImage]) : undefined,
  datePublished: post.publishedAt,
  dateModified: post.publishedAt,
  mainEntityOfPage: toAbsoluteUrl(`/blog/${post.slug}`),
  author: publisher,
  publisher,
  keywords: post.tags.join(', '),
});

export const createFAQSchema = (faqs: FAQ[]): JsonLd | undefined => {
  const mainEntity = faqs
    .filter((faq) => faq.question && faq.answer)
    .map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    }));

  if (!mainEntity.length) {
    return undefined;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
};

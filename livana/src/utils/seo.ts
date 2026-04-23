import { brandHandle } from '../data/brand';

export const SITE_NAME = 'LIVANA';
const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim().replace(/\/+$/, '');
export const SITE_URL = configuredSiteUrl || 'https://tinhdaulivana.netlify.app';
export const DEFAULT_TITLE = 'Tinh Dầu LIVANA | Tinh dầu thiên nhiên cho không gian thư giãn';
export const DEFAULT_DESCRIPTION =
  'Tinh Dầu LIVANA cung cấp tinh dầu thiên nhiên, an toàn cho gia đình và không gian thư giãn. Khám phá sản phẩm, bài viết và mẹo sử dụng hữu ích từ LIVANA.';

const normalizeTwitterHandle = (handle: string) => (handle.startsWith('@') ? handle : `@${handle}`);
export const TWITTER_HANDLE = normalizeTwitterHandle(brandHandle);
export const OG_LOCALE = 'vi_VN';

const hasSpecialScheme = (value: string) => /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value);
const hasFileExtension = (value: string) => /\/[^/?#]+\.[^/?#]+(?:[?#].*)?$/i.test(value);

export const normalizeSitePath = (value?: string) => {
  if (!value) return undefined;
  if (hasSpecialScheme(value)) return value;

  const prefixedValue = value.startsWith('/') ? value : `/${value}`;
  const [pathWithSearch, hash = ''] = prefixedValue.split('#');
  const [pathname, search = ''] = pathWithSearch.split('?');

  if (pathname === '/') {
    return `/${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
  }

  const normalizedPath = hasFileExtension(pathname) ? pathname.replace(/\/+$/, '') : `${pathname.replace(/\/+$/, '')}/`;
  return `${normalizedPath}${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
};

export const toAbsoluteUrl = (value?: string) => {
  if (!value) return undefined;
  if (value.startsWith('http') || value.startsWith('data:') || value.startsWith('blob:')) return value;
  const path = normalizeSitePath(value);
  if (!path) return undefined;
  return `${SITE_URL}${path}`;
};

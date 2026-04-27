import { brandHandle } from '../data/brand';

export const SITE_NAME = 'LIVANA';
const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim().replace(/\/+$/, '');
export const SITE_URL = configuredSiteUrl || 'https://tinhdaulivana.netlify.app';
export const DEFAULT_TITLE = 'LIVANA | Tinh Dầu Thiên Nhiên - Khoảng Bình Yên Trong Ngày';
export const DEFAULT_DESCRIPTION =
  'LIVANA sinh ra từ mong muốn giữ lại một khoảng bình yên nhỏ trong ngày. Giúp bạn thở chậm hơn, chậm lại và tìm thấy sự thư thái qua những hương thơm thiên nhiên tinh khiết.';

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

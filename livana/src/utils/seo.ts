export const SITE_NAME = 'LIVANA';
const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim().replace(/\/+$/, '');
export const SITE_URL = configuredSiteUrl || 'https://tinhdaulivana.netlify.app';
export const DEFAULT_TITLE = 'Tinh Dau LIVANA | Tinh dau thien nhien cho khong gian thu gian';
export const DEFAULT_DESCRIPTION =
  'Tinh Dau LIVANA cung cap tinh dau thien nhien, an toan cho gia dinh va khong gian thu gian. Kham pha san pham, bai viet va meo su dung huu ich tu LIVANA.';

export const toAbsoluteUrl = (value?: string) => {
  if (!value) return undefined;
  if (value.startsWith('http') || value.startsWith('data:') || value.startsWith('blob:')) return value;
  const path = value.startsWith('/') ? value : `/${value}`;
  return `${SITE_URL}${path}`;
};

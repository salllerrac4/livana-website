import { Helmet } from 'react-helmet-async';
import heroCover from '../assets/hero-1.png';

type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
};

const DEFAULT_TITLE = 'LIVANA – Tinh dầu thiên nhiên & lối sống thư giãn';
const DEFAULT_DESCRIPTION =
  'Khám phá tinh dầu thiên nhiên LIVANA: hương thơm tinh tế, nguyên liệu sạch và gợi ý khuếch tán giúp bạn thư giãn, ngủ sâu và sống chậm.';

const ensureAbsoluteUrl = (value?: string) => {
  if (!value) return undefined;
  if (value.startsWith('http') || value.startsWith('data:') || value.startsWith('blob:')) return value;
  if (typeof window === 'undefined') return value;
  const path = value.startsWith('/') ? value : `/${value}`;
  return `${window.location.origin}${path}`;
};

const Seo = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = heroCover,
  url,
  type = 'website',
  publishedTime,
  noIndex,
}: SeoProps) => {
  const fullTitle = title ? `${title} | LIVANA` : DEFAULT_TITLE;
  const resolvedImage = ensureAbsoluteUrl(image);
  const resolvedUrl = ensureAbsoluteUrl(url ?? (typeof window !== 'undefined' ? window.location.href : undefined));
  const twitterCard = resolvedImage ? 'summary_large_image' : 'summary';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {resolvedUrl && <meta property="og:url" content={resolvedUrl} />}
      {resolvedImage && <meta property="og:image" content={resolvedImage} />}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {resolvedImage && <meta name="twitter:image" content={resolvedImage} />}

      {resolvedUrl && <link rel="canonical" href={resolvedUrl} />}
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
    </Helmet>
  );
};

export default Seo;
